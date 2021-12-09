#!/usr/bin/env node

import path from 'node:path'
import {globby as glob} from "globby"
import AxeBuilderPlaywright from '@axe-core/playwright'
import playwright from 'playwright'
import { pathToFileURL } from 'url';
import { prettyPrintAxeReport } from 'axe-result-pretty-print';
const AxeBuilder = AxeBuilderPlaywright.default;

const cwd = process.cwd()

const builtDemoHtmlFiles = await glob(path.join(cwd, '/demos/local/*.html'), {onlyFiles: true})

const axeRulesToIgnore = [
// ignoring the href="#" error
// pa11y demos are for pa11y only and may include multiple versions
// of a landmark component like o-footer
'landmark-one-main',
'landmark-no-duplicate-contentinfo',
'landmark-unique',
// disable https://dequeuniversity.com/rules/axe/3.5/region?application=axeAPI
'region',
// // disable https://dequeuniversity.com/rules/axe/3.5/bypass?application=axeAPI
'bypass',
// // pa11y demos are for pa11y only and do not have a heading
'page-has-heading-one',
// FIXME audio caption - the newspaper doesn't provide these, so either can
//                       we. but in the future it would be good to remove this,
//                       and provide captions.
'audio-caption',
];

const errors = [];

const browser = await playwright.chromium.launch();
for (const file of builtDemoHtmlFiles) {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto(pathToFileURL(file).toString());

	const results = await new AxeBuilder({ page }).disableRules(axeRulesToIgnore).analyze();
	prettyPrintAxeReport({
        violations: results.violations,
        passes: results.passes,
        url: file,
    });
	errors.push(...results.violations);
}
await browser.close();

if (errors.length) {
	console.error(`${errors.length} accessibility errors were detected.`)
	process.exit(1)
}
