/**
 * @license
 * Copyright 2022 Superflows.dev
 * SPDX-License-Identifier: MIT
 */
import { SfIReporting } from '../sf-i-reporting.js';
// import { stub } from 'sinon';
// import {fixture, assert} from '@open-wc/testing';
import { assert } from '@open-wc/testing';
// import {html} from 'lit/static-html.js';
//const TIMEOUT = 2000;
suite('sf-i-reporting > left menu', () => {
    test('is defined', () => {
        const el = document.createElement('sf-i-reporting');
        assert.instanceOf(el, SfIReporting);
    });
});
//# sourceMappingURL=sf-i-elastic-text_test.js.map