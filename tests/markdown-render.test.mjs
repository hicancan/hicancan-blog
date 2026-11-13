import assert from 'node:assert/strict';
import test from 'node:test';
import { articleHtml } from '../src/lib/article-html.mjs';

test('Typora inline extensions leave code untouched', async () => {
  const code = await articleHtml('==重点== H~2~O x^2^ `==原样==`');
  assert.match(code, /<mark>重点<\/mark>/);
  assert.match(code, /H<sub>2<\/sub>O/);
  assert.match(code, /x<sup>2<\/sup>/);
  assert.match(code, /<code>==原样==<\/code>/);
});

test('inline and display math are typeset as SVG at build time', async () => {
  const code = await articleHtml('行内 $\\dfrac{a}{b}$ 与 $\\lim_{x \\to 0} f(x)$。\n\n$$\n\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}\n$$');
  assert.equal((code.match(/<span class="math math-inline"><svg/g) ?? []).length, 2);
  assert.match(code, /<div class="math math-display"><svg/);
});

test('GitHub alerts, task lists and tables render', async () => {
  const code = await articleHtml('> [!NOTE]\n> 说明\n\n- [x] 完成\n\n| A | B |\n| - | - |\n| 1 | 2 |');
  assert.match(code, /markdown-alert-note/);
  assert.match(code, /type="checkbox"/);
  assert.match(code, /<table>/);
});

test('Mermaid diagrams are laid out as SVG; a kind not laid out stays as its code', async () => {
  assert.match(await articleHtml('```mermaid\nflowchart LR\n  A[开始] --> B[结束]\n```'), /<figure class="diagram"><svg/);
  assert.match(await articleHtml('```mermaid\nmindmap\n  root((中心))\n    分支\n```'), /<figure class="diagram"><svg/);
  assert.match(await articleHtml('```mermaid\npie\n  "a": 1\n```'), /data-language="mermaid"/);
});

test('code fences contain both syntax palettes', async () => {
  const code = await articleHtml('```js\nconst answer = 42 < 43;\n```');
  assert.match(code, /astro-code-themes github-light github-dark/);
  assert.match(code, /--shiki-dark/);
  assert.match(code, /&#x3C;|&lt;/);
});

test('images are given what the build made of them', async () => {
  const code = await articleHtml('![图](../media/a.png)', async (src) => (src === '../media/a.png' ? { src: '/_astro/a.webp', width: 10, height: 20 } : undefined));
  assert.match(code, /<img src="\/_astro\/a\.webp" width="10" height="20" decoding="async" alt="图" loading="lazy">/);
});
