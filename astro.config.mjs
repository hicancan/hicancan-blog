import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import edgeOneStaticRouting from './src/integrations/edgeone-static-routing.mjs';

export default defineConfig({
  site: 'https://www.hicancan.top',
  integrations: [sitemap(), edgeOneStaticRouting()],
  redirects: { '/archive': '/articles' },
});
