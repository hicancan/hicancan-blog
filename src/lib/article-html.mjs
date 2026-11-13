// An article drawn by docstream, the document kernel StuDev's web, app and AI share: one reading of Markdown, its
// formulas typeset and Mermaid diagrams laid out as SVG at build time, nothing left for the browser to do. What the
// kernel leaves to the page is finished here: code coloured by Shiki, images given the files the build made of them.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createShikiHighlighter } from '@astrojs/markdown-remark/shiki';
import { html, initialize } from 'docstream';

export const shikiThemes = { light: 'github-light', dark: 'github-dark' };

let ready;
/** The kernel and the highlighter, loaded once for the whole build. */
export function prepare() {
  ready ??= Promise.all([
    initialize(readFileSync(createRequire(import.meta.url).resolve('docstream/docstream_wasm_bg.wasm'))),
    createShikiHighlighter({ themes: shikiThemes }),
  ]).then(([, highlighter]) => highlighter);
  return ready;
}

const unescape = (text) => text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/**
 * Markdown drawn as the article's HTML. `image(src)` gives what an image written as `src` is published as
 * ({ src, width, height }), or nothing to keep it as written.
 */
export async function articleHtml(markdown, image = async () => undefined) {
  const highlighter = await prepare();
  let page = html(markdown);
  const blocks = [...page.matchAll(/<pre data-language="([^"]*)"><code>([\s\S]*?)<\/code><\/pre>/g)];
  const coloured = await Promise.all(blocks.map(async ([, language, code]) => {
    const text = unescape(code);
    try { return await highlighter.codeToHtml(text, language || 'plaintext'); }
    catch { return await highlighter.codeToHtml(text, 'plaintext'); }
  }));
  blocks.forEach(([whole], at) => { page = page.replace(whole, () => coloured[at]); });
  const images = [...new Set([...page.matchAll(/<img src="([^"]+)"/g)].map((match) => match[1]))];
  for (const src of images) {
    const made = await image(unescape(src));
    if (made) page = page.replaceAll(`<img src="${src}"`, `<img src="${made.src}" width="${made.width}" height="${made.height}" decoding="async"`);
  }
  return page;
}
