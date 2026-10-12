import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { middleware } from '../dist/middleware.js';

function request(path, method = 'GET') {
  return middleware({
    request: new Request(new URL(path, 'https://www.hicancan.top'), { method }),
    next: () => new Response('existing file', { status: 200 }),
  });
}

test('existing public pages, Unicode routes, redirects and static files pass through', async () => {
  const files = await readdir(new URL('../dist/_astro/', import.meta.url));
  const asset = files.find((file) => file.endsWith('.css'));
  assert.ok(asset);
  for (const path of ['/', '/articles', '/articles/', '/archive/', '/blog/数学/math01/', '/tags/Machine%20Learning/', '/robots.txt', '/sitemap-index.xml', '/sitemap-0.xml', '/favicon.png', '/_astro/' + asset]) {
    const response = request(path);
    assert.equal(response.status, 200, path);
    assert.equal(await response.text(), 'existing file', path);
  }
});

test('unmatched paths and the explicit error page return 404 with reader-facing content', async () => {
  for (const path of ['/missing-page/', '/missing-file.css', '/blog/not-a-real-article/', '/404.html', '/404/', '/bad%ZZ']) {
    const response = request(path);
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, follow');
    assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal(response.headers.get('X-Frame-Options'), 'SAMEORIGIN');
    assert.match(response.headers.get('Cache-Control'), /max-age=0/);
    const body = await response.text();
    assert.match(body, /这一页找不到了/);
    assert.match(body, /<meta name="robots" content="noindex, follow"/);
    assert.doesNotMatch(body, /rel="canonical"/);
  }
});

test('HEAD errors preserve status and headers without sending HTML', async () => {
  const response = request('/missing-page/', 'HEAD');
  assert.equal(response.status, 404);
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, follow');
  assert.equal(await response.text(), '');
});

test('discovery files revalidate and config does not enable SPA fallback', async () => {
  const config = JSON.parse(await readFile(new URL('../edgeone.json', import.meta.url), 'utf8'));
  assert.deepEqual(config.rewrites, []);
  for (const source of ['/*', '/robots.txt', '/sitemap*.xml']) {
    const rule = config.headers.find((item) => item.source === source);
    assert.ok(rule, source);
    assert.match(rule.headers.find(({ key }) => key === 'Cache-Control').value, /max-age=0/);
  }
});

test('homepage includes the Bing ownership verification token', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.match(html, /<meta name="msvalidate\.01" content="E44C2F6A09F0A678DED98C8374E549A1"/);
});

test('homepage includes the Baidu ownership verification token', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.match(html, /<meta name="baidu-site-verification" content="codeva-KrDQeTcVHk"/);
});

test('official Baidu verification file retains exact bytes and remains publicly routable', async () => {
  const path = '/baidu_verify_codeva-TlJBZmli1p.html';
  const file = await readFile(new URL('../dist' + path, import.meta.url));
  assert.equal(file.length, 32);
  assert.equal(file.toString('utf8'), '4bb9e60ff76035f99099ba18f9d49436');
  assert.equal(createHash('sha256').update(file).digest('hex'), 'bf43403fd34689f8a14ff5890cb8665ba7c6ddd5f04f1009cf394158dfd35803');
  assert.equal(request(path).status, 200);
});
