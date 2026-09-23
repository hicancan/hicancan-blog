import assert from 'node:assert/strict';
import test from 'node:test';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { markdownOptions, shikiConfig } from '../src/lib/markdown-options.mjs';

const markdown = await createMarkdownProcessor({ ...markdownOptions, shikiConfig });

test('Typora inline extensions leave code untouched', async () => {
  const { code } = await markdown.render('==重点== H~2~O x^2^ `==原样==`');
  assert.match(code, /<mark>重点<\/mark>/);
  assert.match(code, /H<sub>2<\/sub>O/);
  assert.match(code, /x<sup>2<\/sup>/);
  assert.match(code, /<code>==原样==<\/code>/);
});

test('dollar, LaTeX and fenced math all render', async () => {
  const { code } = await markdown.render('行内 $x^2$ 与 \\(y^2\\)。\n\n\\[z^2\\]\n\n```math\na^2+b^2=c^2\n```');
  assert.equal((code.match(/<mjx-container/g) ?? []).length, 4);
});

test('MathJax physics notation renders without an error', async () => {
  const { code } = await markdown.render('$\\dv{x}{t}$');
  assert.match(code, /<mjx-container/);
  assert.doesNotMatch(code, /<g data-mml-node="mtext" fill="red"|Undefined control sequence/);
});

test('GitHub alerts, task lists and tables render', async () => {
  const { code } = await markdown.render('> [!NOTE]\n> 说明\n\n- [x] 完成\n\n| A | B |\n| - | - |\n| 1 | 2 |');
  assert.match(code, /markdown-alert-note/);
  assert.match(code, /type="checkbox"/);
  assert.match(code, /<table>/);
});

test('diagram fences remain available for browser rendering', async () => {
  for (const kind of ['mermaid', 'flow', 'sequence']) {
    const { code } = await markdown.render(`\`\`\`${kind}\nA->B\n\`\`\``);
    assert.match(code, new RegExp(`data-language="${kind}"`));
  }
});
