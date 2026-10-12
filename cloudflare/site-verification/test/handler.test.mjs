import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { serveVerification, verificationHostname, verificationPath } from '../src/handler.mjs';

const sourceURL = new URL('../../../public/baidu_verify_codeva-TlJBZmli1p.html', import.meta.url);
const payload = await readFile(sourceURL);
const text = payload.toString('utf8');
const target = `https://${verificationHostname}${verificationPath}`;

test('GET returns the exact existing verification file without an origin request', async (context) => {
  context.mock.method(globalThis, 'fetch', () => assert.fail('verification must not fetch an origin'));
  assert.equal(payload.length, 32);
  assert.equal(createHash('sha256').update(payload).digest('hex').toUpperCase(), 'BF43403FD34689F8A14FF5890CB8665BA7C6DDD5F04F1009CF394158DFD35803');
  for (const url of [target, `${target}?url=https://example.com/`]) {
    const response = serveVerification(new Request(url), text);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Content-Type'), 'text/html; charset=utf-8');
    assert.equal(response.headers.get('Content-Length'), '32');
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), payload);
  }
});

test('HEAD returns verification metadata with no body', async () => {
  const response = serveVerification(new Request(target, { method: 'HEAD' }), text);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Length'), '32');
  assert.equal(await response.text(), '');
});

test('all other hosts, paths and methods are rejected', async (context) => {
  context.mock.method(globalThis, 'fetch', () => assert.fail('rejected requests must not fetch an origin'));
  const urls = [
    'https://hicancan.top/',
    'https://hicancan.top/blog/',
    `https://www.hicancan.top${verificationPath}`,
    `https://example.com${verificationPath}`,
    `${target}/`,
    `${target}.txt`,
  ];
  for (const url of urls) assert.equal(serveVerification(new Request(url), text).status, 404, url);
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
    assert.equal(serveVerification(new Request(target, { method }), text).status, 404, method);
  }
});

test('deployment configuration exposes exactly the one approved zone route', async () => {
  const config = JSON.parse(await readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'));
  assert.equal(config.name, 'hicancan-baidu-verification');
  assert.equal(config.account_id, '54264dda1fcd008c0d4fcf4a411cd582');
  assert.equal(config.compatibility_date, '2026-10-12');
  assert.equal(config.workers_dev, false);
  assert.equal(config.preview_urls, false);
  assert.deepEqual(config.routes, [{ pattern: `${verificationHostname}${verificationPath}`, zone_name: verificationHostname }]);
  assert.deepEqual(config.rules, [{ type: 'Text', globs: ['**/baidu_verify_codeva-TlJBZmli1p.html'], fallthrough: true }]);
  assert.ok(!config.assets && !config.site && !config.bindings, 'verification Worker must not deploy a site or provision bindings');
});
