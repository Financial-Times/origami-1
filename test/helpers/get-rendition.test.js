/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import getRendition from './../../src/js/helpers/get-rendition';
const renditions = require('./../fixtures/media-api-1.json').renditions;
import proclaim from 'proclaim';

describe('Get Appropriate Renditions', () => {

	const supportedFormats = ['h264'];

	it('should exist', () => {
		proclaim.ok(getRendition);
	});

	it('should get largest if no width supplied', () => {
		proclaim.equal(
			getRendition(renditions, { supportedFormats: supportedFormats })['url'],
			'https://bcsecure04-a.akamaihd.net/34/47628783001/201704/970/47628783001_5393625770001_5393611350001.mp4?pubId=47628783001&videoId=5393611350001'
		);
	});

	it('should get rendition of at least the width supplied', () => {
		proclaim.equal(
			getRendition(renditions, { supportedFormats: supportedFormats, optimumvideowidth: 600 })['url'],
			'https://bcsecure04-a.akamaihd.net/34/47628783001/201704/970/47628783001_5393625604001_5393611350001.mp4?pubId=47628783001&videoId=5393611350001'
		);
	});

	it('should get smallest rendition if width is small', () => {
		proclaim.equal(
			getRendition(renditions, { supportedFormats: supportedFormats, optimumvideowidth: 390 })['url'],
			'https://bcsecure04-a.akamaihd.net/34/47628783001/201704/970/47628783001_5393625602001_5393611350001.mp4?pubId=47628783001&videoId=5393611350001'
		);
	});


	it('should get largest rendition if width is bigger than any renditions', () => {
		proclaim.equal(
			getRendition(renditions, { supportedFormats: supportedFormats, optimumvideowidth: 2048 })['url'],
			'https://bcsecure04-a.akamaihd.net/34/47628783001/201704/970/47628783001_5393625770001_5393611350001.mp4?pubId=47628783001&videoId=5393611350001'
		);
	});

});
/* eslint-enable no-unused-expressions */
