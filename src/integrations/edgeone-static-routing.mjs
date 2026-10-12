import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

async function* outputFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* outputFiles(path);
    else if (entry.isFile()) yield path;
  }
}

export async function writeEdgeOneMiddleware(directory) {
  const routes = new Set(['/']);
  for await (const file of outputFiles(directory)) {
    const path = '/' + relative(directory, file).replaceAll('\\', '/');
    if (path === '/middleware.js') continue;
    routes.add(path);
    if (path.endsWith('/index.html')) {
      const clean = path.slice(0, -'index.html'.length);
      routes.add(clean);
      if (clean !== '/') routes.add(clean.slice(0, -1));
    }
  }

  const notFound = await readFile(join(directory, '404.html'), 'utf8');
  const configuration = JSON.parse(await readFile(new URL('../../edgeone.json', import.meta.url), 'utf8'));
  const headers = Object.fromEntries(configuration.headers
    .filter((rule) => rule.source === '/*')
    .flatMap((rule) => rule.headers.map(({ key, value }) => [key, value])));
  headers['Content-Type'] = 'text/html; charset=utf-8';
  headers['X-Robots-Tag'] = 'noindex, follow';
  const code = `const routes = new Set(${JSON.stringify([...routes].sort())});
const notFound = ${JSON.stringify(notFound)};
const headers = ${JSON.stringify(headers)};

export function middleware(context) {
  let path;
  try { path = decodeURI(new URL(context.request.url).pathname); } catch { path = null; }
  if (routes.has(path) && !['/404.html', '/404', '/404/'].includes(path)) return context.next();
  return new Response(context.request.method === 'HEAD' ? null : notFound, { status: 404, headers });
}
`;
  await writeFile(join(directory, 'middleware.js'), code);
  return routes;
}

export default function edgeOneStaticRouting() {
  return {
    name: 'blog-edgeone-static-routing',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const routes = await writeEdgeOneMiddleware(fileURLToPath(dir));
        logger.info(`EdgeOne routing: ${routes.size} existing paths; unmatched paths return 404.`);
      },
    },
  };
}
