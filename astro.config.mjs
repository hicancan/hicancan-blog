import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { markdownOptions, shikiConfig } from './src/lib/markdown-options.mjs';

export default defineConfig({
  site: 'https://www.hicancan.top',
  integrations: [sitemap()],
  redirects: { '/archive': '/articles' },
  markdown: {
    shikiConfig,
    processor: unified(markdownOptions),
  },
});
