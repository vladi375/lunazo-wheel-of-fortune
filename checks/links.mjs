import assert from 'node:assert/strict';
import test from 'node:test';
import { withLandingQueryParams } from '../src/config.ts';

test('passes every landing parameter through, including repeated names', () => {
    const destination = 'https://example.com/registration/0?existing=1';
    const search =
        '?utm_source=telegram&utm_campaign=autumn&click_id=123&tag=one&tag=two&note=hola%20mundo';
    const result = new URL(withLandingQueryParams(destination, search));

    assert.equal(result.pathname, '/registration/0');
    assert.deepEqual(
        [...result.searchParams],
        [
            ['existing', '1'],
            ['utm_source', 'telegram'],
            ['utm_campaign', 'autumn'],
            ['click_id', '123'],
            ['tag', 'one'],
            ['tag', 'two'],
            ['note', 'hola mundo'],
        ],
    );
});

test('keeps the original destination when the landing has no parameters', () => {
    const destination = 'https://example.com/registration/1';
    assert.equal(withLandingQueryParams(destination, ''), destination);
});
