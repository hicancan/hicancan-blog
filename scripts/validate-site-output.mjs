import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const media = fileURLToPath(new URL('../src/content/media/', import.meta.url));
const page = (route) => join(dist, route, 'index.html');

for (const route of ['', 'articles', 'projects', 'about', 'friends', 'guestbook', 'tags', 'archive']) {
  assert.ok(existsSync(page(route)), 'Missing page: /' + route + '/');
}

const legacyPosts = [
  'welcome',
  'ctf/0xgame',
  '数学/math01',
  '科研/quantumsec-qkd-odmr-qml',
  '科研/science10_25',
  '算法/0x0101',
  '算法/luogu9_1',
  '算法/luogu9_2',
  '算法/luogu9_3',
  '算法/luogu9_4',
  '英语/english-share',
];

for (const slug of legacyPosts) {
  const htmlFile = page('blog/' + slug);
  assert.ok(existsSync(htmlFile), 'Missing legacy article: ' + slug);
  const html = readFileSync(htmlFile, 'utf8');
  assert.match(html, /<article\b/, 'Article not rendered: ' + slug);
  assert.match(html, /<link rel="canonical"/, 'Missing canonical URL: ' + slug);
}

const home = readFileSync(page(''), 'utf8');
assert.match(home, /<html lang="zh-CN"/);
assert.ok(!home.includes('数字花园'));
assert.ok(!home.includes('glass-card'));
assert.ok(!home.includes('学生 / 开发者'));
assert.match(home, /avatar\.[^" ]+\.webp/);
assert.match(home, /href="\/friends\/">友链<\/a>/);
assert.match(readFileSync(page('friends'), 'utf8'), /<h1 class="page-title">友链<\/h1>/);
assert.ok(!existsSync(page('render-check')), 'Temporary render check page must not ship');
assert.ok(existsSync(join(dist, 'sitemap-index.xml')));
for (const icon of ['favicon.png', 'apple-touch-icon.png', 'social-avatar.png']) {
  assert.ok(existsSync(join(dist, icon)), 'Missing avatar icon: ' + icon);
}
assert.equal(readdirSync(media).length, 89, 'Owned article images are missing');

function* htmlFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    const src = match[1];
    if (src.startsWith('/')) assert.ok(existsSync(join(dist, decodeURIComponent(src.slice(1)))), 'Missing built image: ' + src);
  }
}

console.log('Verified 11 legacy articles, core pages, metadata, sitemap, and local article images.');
