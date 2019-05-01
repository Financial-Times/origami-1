/* eslint-env mocha */
import proclaim from 'proclaim';
import fetchMock from 'fetch-mock';

import {getJsonWebToken} from '../..//src/js/utils/auth';

describe("Auth", () => {
	describe("getJsonWebToken", () => {
		it("is a function", () => {
			proclaim.isFunction(getJsonWebToken);
		});

		describe("when comments auth service returns a valid response", () => {
			before(() => {
				fetchMock.mock('https://comments-auth.ft.com/v1/jwt/', {
					token: '12345'
				});
			});

			after(() => {
				fetchMock.reset();
			});

			it("returns a promise", () => {
				const returnValue = getJsonWebToken();
				proclaim.isInstanceOf(returnValue, Promise);
			});

			it("returns a promise which contains a JSON Web Token as a string", () => {
				return getJsonWebToken()
					.then(token => proclaim.isString(token));
			});
		});
		describe("when the comments auth service response is missing the token", () => {
			before(() => {
				fetchMock.mock('https://comments-auth.ft.com/v1/jwt/', {});
			});

			after(() => {
				fetchMock.reset();
			});

			it("throws an error", () => {
				proclaim.throws(getJsonWebToken());
			});
		});

		describe("when the comments auth service responds with a bad response", () => {
			before(() => {
				fetchMock.mock('https://comments-auth.ft.com/v1/jwt/', 404);
			});

			after(() => {
				fetchMock.reset();
			});

			it("throws an error", () => {
				proclaim.throws(getJsonWebToken());
			});
		});
	});
});
