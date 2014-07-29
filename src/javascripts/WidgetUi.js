var logger = require('js-logger'),
    commentsUi = require('comments-ui'),
    sizzle = require('sizzle');

/**
 * FT specific UI customizing of the Livefyre widget.
 * @param {DOMElement} widgetContainer Container of the widget instance.
 */
function WidgetUi (widgetContainer) {
    "use strict";

    commentsUi.WidgetUi.apply(this, arguments);

    /**
     * Makes the Livefyre comments widget read-only by hiding the editors and action buttons.
     * @return {[type]} [description]
     */
    this.makeReadOnly = function () {
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');

        style.type = 'text/css';

        var css = '<style>'+
                '#' + widgetContainer.attr('id') + ' .fyre-editor, '+
                '#' + widgetContainer.attr('id') + ' .fyre-comment-like, '+
                '#' + widgetContainer.attr('id') + ' .fyre-comment-action-button {'+
                    'display: none;'+
                '}'+
            '</style>';

        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    };

    /**
     * Hide the sign in link (used when the user is signed in in FT, but doesn't have a pseudonym yet
     * so can't be signed in into Livefyre).
     */
    this.hideSignInLink = function () {
        var signInLinkContainer = sizzle('a.fyre-user-loggedout', widgetContainer);

        if (signInLinkContainer.length) {
            signInLinkContainer[0].style.display = 'none';
        }
    };

    /**
     * Inserts message when SUDS reports as authentication is not available.
     */
    this.addAuthNotAvailableMessage = function () {
        var authContainer = sizzle('.fyre-auth', widgetContainer);

        if (authContainer.length) {
            authContainer[0].appendChild(commentsUi.utils.toDOM(commentsUi.templates.unavailableTemplate.render({
                message: commentsUi.i18n.texts.unavailable
            })));
        }
    };

    

    /**
     * Inserts the terms and guidelines text into the widget.
     */
    this.addTermsAndGuidelineMessage = function () {
        var editorContainers = sizzle('.fyre-widget > .fyre-editor', widgetContainer);

        if (editorContainers.length) {
            for (var i = 0; i < editorContainers.length; i++) {
                editorContainers[i]
                    .parentNode
                    .insertBefore(
                        commentsUi.utils.toDOM(commentsUi.templates.termsAndGuidelinesTemplate.render()),
                        editorContainers[i].nextSibling
                    );
            }
        }
    };

    /**
     * Inserts settings link and attaches the necessary click handler.
     * It also waits until the current pseudonym is loaded after the log in.
     * @param {Object} options Object which can have the following fields:
     *                             onClick (callback function, required),
     *                             onAdded (callback function)
     */
    this.addSettingsLink = function (options) {
        logger.log("Commenting settings link adding triggered.");

        var noOfTrial = 0,
            interval = setInterval(function () {
                var pseudonymContainer = sizzle('.fyre-auth .fyre-login-bar .fyre-box-wrapper .fyre-user-loggedin', widgetContainer);
                if (pseudonymContainer.length || noOfTrial === 120) {
                    clearInterval(interval);

                    if (noOfTrial === 120) {
                        // give up
                        return;
                    }

                    var loginBarContainer = sizzle('.fyre-auth .fyre-login-bar', widgetContainer);
                    if (loginBarContainer.length) {
                        loginBarContainer[0].appendChild(commentsUi.utils.toDOM(commentsUi.templates.commentingSettingsLink.render()));
                    }

                    var settingsLink = sizzle('.fyre-auth .fyre-login-bar .comments-settings-text', widgetContainer);
                    if (settingsLink.length) {
                        commentsUi.utils.addEventListener('click', settingsLink[0], function () {
                            if (options && typeof options.onClick === 'function') {
                                options.onClick();
                            }
                        });

                        if (options && typeof options.onAdded === 'function') {
                            options.onAdded();
                        }
                    }
                } else {
                    noOfTrial++;
                }
            }, 500);
    };

    /**
     * Removes the settings link from the widget.
     */
    this.removeSettingsLink = function () {
        var el = sizzle('.comments-settings', widgetContainer);
        if (el.length) {
            el[0].parentNode.removeChild(el[0]);
        }
    };

    /**
     * Comment counter is part of the Livefyre widget, but on FT.com this
     * element is moved out into the header.
     */
    this.moveCommentCountOut = function () {
        var fyreEl = sizzle('.fyre', widgetContainer);
        var fyreStreamStatsEl = sizzle('.fyre-stream-stats', widgetContainer);

        if (fyreEl.length && fyreStreamStatsEl.length) {
            var counterEl = sizzle('.fyre-comment-count', fyreStreamStatsEl[0]);
            
            if (counterEl.length) {
                fyreEl = fyreEl[0];
                fyreStreamStatsEl = fyreStreamStatsEl[0];
                counterEl = counterEl[0];

                fyreEl.style.paddingTop = '30px';
                fyreEl.style.position = 'relative';

                fyreStreamStatsEl.style.position = 'absolute';
                fyreStreamStatsEl.style.top = '-10px';
                fyreStreamStatsEl.style.float = 'none';
                fyreStreamStatsEl.style.width = '100%';
                fyreStreamStatsEl.className = 'ft-header-medium';

                counterEl.className = 'ft-header-medium-title';
            }
        }
    };
}
WidgetUi.__extend = function(child) {
    "use strict";

    if (typeof Object.create === 'function') {
        child.prototype = Object.create(WidgetUi.prototype);
        child.prototype = Object.create(WidgetUi.prototype);
    } else {
        var Tmp = function () {};
        Tmp.prototype = WidgetUi.prototype;
        child.prototype = new Tmp();
        child.prototype.constructor = child;
    }
};

commentsUi.WidgetUi.__extend(WidgetUi);

module.exports = WidgetUi;