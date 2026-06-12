import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distRoot = new URL('../dist/', import.meta.url);
const distPath = fileURLToPath(distRoot);
const canonicalHost = 'https://www.hicancan.top';

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function readDist(relativePath) {
    const path = join(distPath, relativePath);
    assert(existsSync(path), `Missing dist file: ${relativePath}`);
    return readFileSync(path, 'utf8');
}

function headerMap(edgeone, source) {
    const rule = edgeone.headers.find((item) => item.source === source);
    assert(rule, `Missing edgeone header rule: ${source}`);
    assert(Array.isArray(rule.headers), `Invalid edgeone header rule: ${source}`);
    return Object.fromEntries(rule.headers.map((header) => [header.key, header.value]));
}

assert(existsSync(distPath), 'dist directory must exist; run npm run build before npm run test');

const edgeone = JSON.parse(readDist('edgeone.json'));
assert(Array.isArray(edgeone.headers), 'edgeone.json must declare headers');

const baseHeaders = headerMap(edgeone, '/*');
assert(baseHeaders['X-Content-Type-Options'] === 'nosniff', 'Missing nosniff security header');
assert(baseHeaders['X-Frame-Options'] === 'SAMEORIGIN', 'Missing frame policy header');
assert(baseHeaders['Referrer-Policy'] === 'strict-origin-when-cross-origin', 'Missing referrer policy header');
assert(baseHeaders['Cache-Control'] === 'public, max-age=0, must-revalidate', 'HTML fallback cache must stay short');
assert(headerMap(edgeone, '/*.json')['Cache-Control'] === 'public, max-age=0, must-revalidate', 'JSON cache must stay short');
assert(headerMap(edgeone, '/_astro/*')['Cache-Control'] === 'public, max-age=31536000, immutable', 'Astro assets must be immutable');
assert(headerMap(edgeone, '/assets/*')['Cache-Control'] === 'public, max-age=31536000, immutable', 'static assets must be immutable');

const indexHtml = readDist('index.html');
assert(indexHtml.includes(`<link rel="canonical" href="${canonicalHost}/">`), 'home canonical must use www host');

const sitemapIndex = readDist('sitemap-index.xml');
assert(sitemapIndex.includes(canonicalHost), 'sitemap index must use www host');
assert(!sitemapIndex.includes('https://hicancan.top'), 'sitemap index must not use apex host');

console.log('validated site output contract');
