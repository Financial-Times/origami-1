'use strict';

var Logger = require('./logger');

/**
 * @class Errors
 */
function Errors() {
	this.ravenClient = null;

	/**
	 * The initialised state of the object.
	 * @type {bool}
	 */
	this.initialised = false;

	this.logger = null;
	this._logEventHandler = this.handleLogEvent.bind(this);

	// While not initialised, any caught errors are buffered.
	this._errorBuffer = [];
}

/**
 * Initialises the Error object with a Raven dependency.
 *
 * All options are optional, if a configuration option is missing, the module
 * will try to initialise using any configuration found in the DOM using the
 * meta and link tags.
 *
 * @example
 * <!-- DOM configuration settings -->
 * <link rel="oErrors:sentryEndpoint" href="//sentry@app.getsentry.com/appid">
 * <meta name="oErrors:siteVersion" content="v1.0.0">
 *
 * @param options {Object}
 * @param options.sentryEndpoint {String} - Optional if configued via the DOM, Required if not, must be a valid {@link https://app.getsentry.com/docs/platforms/|Sentry DSN}.
 * @param options.siteVersion    {String} - Optional, optionally the version of the code the page is running. This tags each error with the code version
 * @param options.logLevel       {String} - Optional, see {@link Logger.level} for valid names
 * @param raven   {Object}   - The Raven JS client object.
 * @returns {Errors}
 */
Errors.prototype.init = function(options, raven) {
	if (this.initialised) {
		return this;
	}

	// Because we can't be sure what Raven tries to do when
	// we include it only at iniy.  To control the initialisation of the third party code
	// we include it only at init time see "http://origami.ft.com/docs/syntax/js/#initialisation"
	//
	// It is optional so that it can be mocked in tests
	if (!raven) {
		raven = require('raven-js');
	}


	this.ravenClient = raven;

	options = options || {};
	options = this._initialiseDeclaratively(options);

	if (!options.sentryEndpoint) {
		throw new Error('Could not initialise o-errors: Sentry endpoint configuration missing.');
	}

	var defaultLogLength = 10;
	this.logger = new Logger(defaultLogLength, options.logLevel);

	var sentryEndpoint = options.sentryEndpoint;
	var shouldSendError = this._shouldSendError.bind(this);
	var updatePayloadBeforeSend = this._updatePayloadBeforeSend.bind(this);

	var ravenOptions = {
		shouldSendCallback: shouldSendError,
		dataCallback: updatePayloadBeforeSend
	};

	if (options.siteVersion) {
		ravenOptions.release = options.siteVersion;
	}


	this.ravenClient.config(sentryEndpoint, ravenOptions);
	this.ravenClient.install();

	document.addEventListener('oErrors.log', this._logEventHandler);

	this.initialised = true;


	this._flushBufferedErrors();
	return this;
};

Errors.prototype._flushBufferedErrors = function() {
	if (!this.initialised) {
		return;
	}

	var errors = this;
	this._errorBuffer.forEach(function(bufferedError) {
		errors.report(bufferedError.error, bufferedError.context);
	});

	// Clear the buffer, deleting references we hold to any buffered errors
	this._errorBuffer = [];
};

/**
 * Report an Error object to the error aggregator.
 *
 * @param {Error}  error    - The error object to report.
 * @param {Object} context  - Optional context to attach to the Error in the
 *                            aggregator
 * @return undefined
 */
Errors.prototype.report = function(error, context) {
	if (!this.initialised) {
		this._errorBuffer.push({ error: error, context: context });
		return;
	}

	this.ravenClient.captureMessage(error, context);
};

/**
 * Report an error to the error aggregator.
 *
 * @example
 * // Reports a caught Error generated by the Promise
 * fetch('example.com').then(doSomething).catch(oErrors.error);
 *
 * @example
 * // Reports and re-throws the caught error
 * try {
 *   doSomething();
 * } catch(e) {
 *   throw oErrors.error(e);
 * }
 *
 * @param {Error}  error     - The error to report
 * @param {Object} context   - Additional contextual information for the error.
 * @returns {Error} Return the original 'error' argument
 */
Errors.prototype.error = function() {
	this.logger.error.apply(this.logger, arguments);
};

/**
 * Log a 'WARN' level log.  Intended to have the same semantics as
 * console.warn.
 * This stores the log in memory and will attach the last `n` log lines to the
 * context of the error. See {@link Errors#log} to log a log message.
 *
 * @param {String} warnMessage  - The message to log.
 * @returns undefined
 */
Errors.prototype.warn = function() {
	this.logger.warn.apply(this.logger, arguments);
};

/**
 * Log a 'LOG' level log.  Intended to have the same semantics as console.log.
 * This stores the log in memory and will attach the last `n` log lines to the
 * context of the error.  See {@link Errors#warn} to log a warn message.
 *
 * @param {String} logMessage - The message to log.
 * @return undefined
 */
Errors.prototype.log = function() {
	this.logger.log.apply(this.logger, arguments);
};


/**
 * Wrap a function so that any uncaught errors are caught and reported to the
 * error aggregator.
 *
 * @example
 * // Wraps function, any errors occurring within the function are caught, logged, and rethrown.
 * var wrappedFunction = oErrors.wrap(function() {
 *   throw new Error("My Error");
 * });
 *
 * If you want to attach additional contextual information to the error, see
 * {@link Errors#wrapWithContext}.
 -
 * @param {Function} fn     - The function to wrap.
 * @return {Function}
 */
Errors.prototype.wrap = function(fn) {
	return this.wrapWithContext({}, fn);
};

/**
 * Wrap a function so that any uncaught errors are caught and reported to the error
 * aggregator.
 * This method allows additional context to be attached to the error if it
 * occurs.
 *
 * @example
 * // Wrap a function with some additional context to be reported in the event
 * // `doSomethingCallback` throws an error.
 * setTimeout(oErrors.wrapWithContext({ "context:url": "example.com" }, doSomethingCallback), 1000);
 *
 * @param {Object}   context     - Additional context to report along with the error
 *                                 if the function `fn` throws an Error.
 * @param {Function} fn          - The function to wrap
 * @return {Function}
 */
Errors.prototype.wrapWithContext = function(context, fn) {
	var errors = this;
	return function() {
		try {
			return fn.apply(undefined, arguments);
		} catch(e) {
			errors.report(e, context);
			throw e;
		}
	};
};

Errors.prototype.destroy = function() {
	if (!this.initialised) { return; }
	document.removeEventListener('oErrors.log', this._logEventHandler);
	this.ravenClient.uninstall();
};

Errors.prototype.handleLogEvent = function(ev) {
	if (!this.initialised) { return; }
	this.report(ev.detail.error, ev.detail.info);
};

Errors.prototype._shouldSendError = function(data) {
	return true;
};

Errors.prototype._updatePayloadBeforeSend = function(data) {
	if (this.logger.enabled) {
		data.extra["context:log"] = this.logger.rollUp();
	}
	return data;
};

Errors.prototype._initialiseDeclaratively = function(options) {
	options.sentryEndpoint = options.sentryEndpoint || this._getOptionDeclaratively("sentryEndpoint");
	options.siteVersion    = options.siteVersion    || this._getOptionDeclaratively("siteVersion");
	options.logLevel       = options.logLevel       || this._getOptionDeclaratively("logLevel");

	return options;
};

Errors.prototype._getOptionDeclaratively = function(optionName) {

	// Special one off case for the sentry endpoint as it's in a link tag
	if (optionName === "sentryEndpoint") {
		var sentryEndpointLink = document.querySelector('link[rel="oErrors:sentryEndpoint"]');
		if (sentryEndpointLink) {
			return sentryEndpointLink.href;
		}

		return undefined;
	}

	var querySelector = 'meta[name="oErrors:' + optionName + '"]';
	var metaElement = document.querySelector(querySelector);

	if (metaElement) {
		return metaElement.content;
	}

	return undefined;
};

module.exports = Errors;
