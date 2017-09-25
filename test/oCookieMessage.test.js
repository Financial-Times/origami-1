/* eslint-env mocha */

import sinon from 'sinon/pkg/sinon';
import proclaim from 'proclaim';
import store from 'superstore-sync';

import * as fixtures from './helpers/fixtures';


import oCookieMessage from './../main' ;

describe("CookieMessage", () => {
	beforeEach(() => {
		fixtures.standardCookieMessage();
	});

	afterEach(() => {
		fixtures.reset();
	});

	it("injects the FT legal cookie message into itself", () => {
		const cookiemessage = oCookieMessage.init();

		proclaim.equal(cookiemessage.CookieMessageEl.innerHTML, oCookieMessage.cookieHTML());
	});

	it("does not inject the FT legal cookie message if data-o-cookie-message-use-custom-html is present", () => {
		/* remove the standard fixture and use the customCookieMessage fixture */
		fixtures.reset();
		fixtures.customCookieMessage();

		const cookiemessage = oCookieMessage.init();
		proclaim.notEqual(cookiemessage.CookieMessageEl.innerHTML, oCookieMessage.cookieHTML());
	});

	describe("dateIsWithinLastThreeMonths", () => {
		it("returns true if the date passed in is within the last 3 months", () => {
			const now = Date.now();
			const twoMonthsInSeconds = 1000 * 60 * 60 * 24 * 30 * 2;

			// Stub Date.now
			proclaim.isTrue(oCookieMessage.dateIsWithinLastThreeMonths(now));
			proclaim.isTrue(oCookieMessage.dateIsWithinLastThreeMonths(now - twoMonthsInSeconds));

		});

		it("returns false if the date passed in is longer than the last three months", () => {
			const now = Date.now();
			const threeMonthsInSeconds = 1000 * 60 * 60 * 24 * 30 * 3;

			proclaim.isFalse(oCookieMessage.dateIsWithinLastThreeMonths(now - (threeMonthsInSeconds + 1)));
		});
	});

	describe("userHasConsentedToCookies", () => {
		beforeEach(() => {
			sinon.spy(oCookieMessage, 'flagUserAsConsentingToCookies');
			sinon.stub(oCookieMessage, "dateIsWithinLastThreeMonths").returns(true);
		});

		afterEach(() => {
			oCookieMessage.dateIsWithinLastThreeMonths.restore();
			oCookieMessage.flagUserAsConsentingToCookies.restore();
			store.local.get.restore();
		});


		it("calls flagUserAsConsentingToCookies if they have consented using the old o-cookies way", () => {
			/* 1 is the value of the old cookie consent */
			sinon.stub(store.local, "get").returns("1");

			oCookieMessage.userHasConsentedToCookies();
			proclaim.isTrue(oCookieMessage.flagUserAsConsentingToCookies.calledOnce);

		});

		it("does not call flagUserAsConsentingToCookies the user has never consented", () => {
			/* null means the cookie message consent has never been set */
			sinon.stub(store.local, "get").returns(null);

			oCookieMessage.userHasConsentedToCookies();
			proclaim.isFalse(oCookieMessage.flagUserAsConsentingToCookies.calledOnce);
		});

		it("does not call flagUserAsConsentingToCookies the user has consented recently", () => {
			/* set it to 50 seconds ago */
			sinon.stub(store.local, "get").returns(Date.now()-50);

			oCookieMessage.userHasConsentedToCookies();
			proclaim.isFalse(oCookieMessage.flagUserAsConsentingToCookies.calledOnce);
		});

		it("returns false if there is nothing in COOKIE_CONSENT", () => {
		 	sinon.stub(store.local, "get").returns(null);

		 	proclaim.isFalse(oCookieMessage.userHasConsentedToCookies());
		});

		 it("returns true if dateIsWithinLastThreeMonths(COOKIE_CONSENT) returns true", () => {
			sinon.stub(store.local, "get").returns("123");

			proclaim.isTrue(oCookieMessage.userHasConsentedToCookies());
		});

		it("returns false if dateIsWithinLastThreeMonths(COOKIE_CONSENT) returns false", () => {
			sinon.stub(store.local, "get").returns("123");

			oCookieMessage.dateIsWithinLastThreeMonths.restore();
			sinon.stub(oCookieMessage, "dateIsWithinLastThreeMonths").returns(false);

			proclaim.isFalse(oCookieMessage.userHasConsentedToCookies());
		});

	});

	describe("flagUserAsConsentingToCookies", () => {
		beforeEach(() => {
			sinon.spy(store.local, "set");
		});

		afterEach(() => {
			store.local.set.restore();
		});


		it("sets a value in localStorage called COOKIE_CONSENT to the result of Date.now", () => {
			sinon.stub(Date, "now").returns(12345);
			oCookieMessage.flagUserAsConsentingToCookies();
			proclaim.isTrue(store.local.set.calledWith('COOKIE_CONSENT', 12345));
		});

		it("calls hideMessage", () => {
			sinon.spy(oCookieMessage, "hideMessage");
			oCookieMessage.flagUserAsConsentingToCookies();
			proclaim.isTrue(oCookieMessage.hideMessage.calledOnce);
		});
	});

	describe("hideMessage", () => {
		it("removes the o-cookie-message--active class from the CookieMessageEl", () => {
			const cookiemessage = oCookieMessage.init();

			/* Ensure the cookie message is visible */
			cookiemessage.CookieMessageEl.classList.add('o-cookie-message--active');
			proclaim.isTrue(cookiemessage.CookieMessageEl.classList.contains('o-cookie-message--active'));

			oCookieMessage.hideMessage();

			proclaim.isFalse(cookiemessage.CookieMessageEl.classList.contains('o-cookie-message--active'));
		});
	});
});
