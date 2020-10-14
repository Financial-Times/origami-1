/* eslint-env mocha */
/* global proclaim sinon */

import '../setup.js';

import {Queue} from '../../src/javascript/core/queue.js';
import {destroy, set} from '../../src/javascript/core/settings.js';
import {init as initSend} from '../../src/javascript/core/send.js';
import core from '../../src/javascript/core.js';
import {init as initClick} from '../../src/javascript/events/click.js';
import {init as initSession} from '../../src/javascript/core/session.js';

describe('click', function () {

	before(function () {
		initSession();
		initSend();

		const config = {
			context: {
				product: 'desktop'
			},
			user: {
				user_id: '123456'
			}
		};

		set("config",config);
	});

	after(function () {
		new Queue('requests').replace([]); // Empty the queue
		destroy('config'); // Empty settings.
	});

	it('should track an event for a click', function (done) {

		sinon.spy(core, 'track');

		initClick("blah", '#anchorA');

		const aLinkToGoogle = document.createElement('a');

		aLinkToGoogle.href = "http://www.google.com";
		aLinkToGoogle.text = "A link to Google's website";
		aLinkToGoogle.id = "anchorA";

		aLinkToGoogle.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToGoogle);
		aLinkToGoogle.dispatchEvent(event, true);

		setTimeout(() => {
			try {
				proclaim.equal(core.track.calledOnce, true, "click event tracked");

				core.track.restore();
				done();
			} catch (error) {
				done(error);
			}

		}, 10);

	});

	it('should track custom event properties and send through in the context', (done) => {

		sinon.spy(core, 'track');

		initClick("blah", '#anchorB');

		const aLinkToGoogle = document.createElement('a');

		aLinkToGoogle.href = "http://www.google.com";
		aLinkToGoogle.text = "A link to Google's website";
		aLinkToGoogle.id = "anchorB";
		aLinkToGoogle.setAttribute('data-trackable-context-foo', 'bar');

		aLinkToGoogle.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToGoogle);
		aLinkToGoogle.dispatchEvent(event, true);

		setTimeout(() => {
			try {
				proclaim.equal(core.track.getCall(0).args[0].context.foo, 'bar');

				core.track.restore();
				done();
			} catch (error) {
				done(error);
			}
		}, 10);

	});

	it('should not track an event for a securedrop click', function (done) {

		sinon.spy(core, 'track');

		initClick("blah", '#anchorC');

		const aLinkToSecuredrop = document.createElement('a');

		aLinkToSecuredrop.href = "https://www.ft.com/securedrop";
		aLinkToSecuredrop.text = "A link to securedrop";
		aLinkToSecuredrop.id = "anchorC";
		aLinkToSecuredrop.setAttribute("data-o-tracking-do-not-track", "true");

		aLinkToSecuredrop.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToSecuredrop);
		aLinkToSecuredrop.dispatchEvent(event, true);

		setTimeout(() => {

			try {
				proclaim.equal(core.track.notCalled, true, "click event not tracked");

				core.track.restore();
				done();
			} catch (error) {
				done(error);
			}

		}, 10);

	});

	it('should not track straight away when the link points to the same domain we are currently on', function (done) {
		sinon.spy(core, 'track');

		initClick("blah", '#anchorD');

		core.track.resetHistory(); // initClick() makes a call to track() so clearing the history here to avoid false positives

		const aLinkToPageOnSameDomain = document.createElement('a');
		const currentHost = window.document.location.hostname;

		aLinkToPageOnSameDomain.href = "https://" + currentHost + "/a-page-on-the-same-domain";
		aLinkToPageOnSameDomain.text = "A link to another page on the same domain";
		aLinkToPageOnSameDomain.id = "anchorD";

		aLinkToPageOnSameDomain.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToPageOnSameDomain);
		aLinkToPageOnSameDomain.dispatchEvent(event, true);

		setTimeout(() => {
			try {
				proclaim.equal(core.track.notCalled, true, "click event not tracked");

				core.track.restore();
				done();
			} catch (error) {
				done(error);
			}

		}, 10);

	});

	it('should skip the queue when data-o-tracking-skip-queue is "true" on the link', function (done) {
		sinon.spy(core, 'track');

		initClick("blah", '#anchorE');

		core.track.resetHistory(); // initClick() makes a call to track() so clearing the history here to avoid false positives

		const aLinkToPageOnSameDomain = document.createElement('a');
		const currentHost = window.document.location.hostname;

		aLinkToPageOnSameDomain.href = "https://" + currentHost + "/a-page-on-the-same-domain";
		aLinkToPageOnSameDomain.text = "A link to another page on the same domain";
		aLinkToPageOnSameDomain.id = "anchorE";
		aLinkToPageOnSameDomain.setAttribute("data-o-tracking-skip-queue", "true");

		aLinkToPageOnSameDomain.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToPageOnSameDomain);
		aLinkToPageOnSameDomain.dispatchEvent(event, true);

		setTimeout(() => {
			try {
				proclaim.equal(core.track.calledOnce, true, "click event not tracked");

				core.track.restore();
				done();
			} catch (error) {
				done(error);
			}

		}, 10);

	});
});
