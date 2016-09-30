class CookieMessage {

	constructor (CookieMessageEl) {
		if (!CookieMessageEl) {
			CookieMessageEl = document.querySelector('[data-o-component="o-cookie-message"]');
		} else if (typeof CookieMessageEl === 'string') {
			CookieMessageEl = document.querySelector(CookieMessageEl);
		}

		this.CookieMessageEl = CookieMessageEl;

		this.setup();
	}

	setup () {
		if (!CookieMessage.userHasConsentedToCookies()) {
			this.CookieMessageEl.classList.add('o-cookie-message--active');
			CookieMessage.setupMessage();
			return;
		}
	}

	static cookieHTML () {
		return `
			<div class="o-cookie-message__container">
					<p class="o-cookie-message__description">
						By continuing to use this site you consent to the use of cookies on your device as described in our <a href="http://help.ft.com/tools-services/how-the-ft-manages-cookies-on-its-websites/">cookie policy</a> unless you have disabled them. You can change your <a href="http://help.ft.com/help/legal-privacy/cookies/how-to-manage-cookies/">cookie settings</a> at any time but parts of our site will not function correctly without them.
					</p>
					<div class="o-cookie-message__close-btn-container">
							<button class="o-cookie-message__close-btn" data-o-component="o-cookie-message-close">
									<span class="o-cookie-message__close-btn-label">Close</span>
							</button>
					</div>
			</div>`;
	}

	static setupMessage () {
		document.querySelector('[data-o-component="o-cookie-message-close"]').addEventListener('click', this.flagUserAsConsentingToCookies);
	}

	static hideMessage () {
		const message = document.querySelector('[data-o-component="o-cookie-message"]');
		message.classList.remove('o-cookie-message--active');
	}

	static flagUserAsConsentingToCookies () {
		let now = Date.now();
		localStorage.setItem('COOKIE_CONSENT', now);
		CookieMessage.hideMessage();
	}

	static userHasConsentedToCookies () {
		// Update user to new cookie format, which reappears after three months
		if (localStorage.getItem('COOKIE_CONSENT') === '1') {
			this.flagUserAsConsentingToCookies();
			return true;
		}

		// HACK: Whilst FT.com is still around auto-opt user in if they have accepted over there.
		if (/\bcookieconsent=accepted(?:;|$)/.test(document.cookie)){
			this.flagUserAsConsentingToCookies();
			return true;
		}


		if (localStorage.getItem('COOKIE_CONSENT')) {

			const consentDate = parseInt(localStorage.getItem('COOKIE_CONSENT'));

			if (this.dateIsWithinLastThreeMonths(consentDate)) {
				return true;
			}
		}
		return false;
	}

	static dateIsWithinLastThreeMonths(startTime) {
		const now = Date.now();
		const threeMonthsInSeconds = 1000 * 60 * 60 * 24 * 90;
		return (startTime > (now - threeMonthsInSeconds));
	}

	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		} else if (typeof rootEl === 'string') {
			rootEl = document.querySelector(rootEl);
		}

		const CookieMessageEl = rootEl.querySelector('[data-o-component="o-cookie-message"]');

		/* If the cookie message hasn't already been initialised */
		if (!CookieMessageEl.hasAttribute('data-o-cookie-message--js')) {

			/* If the cookie message hasn't specified that it has custom internal HTML
			 add the legal-approved cookie message */
			if (!CookieMessageEl.hasAttribute('data-o-cookie-message-use-custom-html')) {
				CookieMessageEl.innerHTML = CookieMessage.cookieHTML();
			}
			return new CookieMessage(CookieMessageEl);
		}
	}
}

export default CookieMessage;
