import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { posix } from 'node:path';
import type { Post } from './content';
import { articleHtml } from './article-html.mjs';

// Every image an article may show, made into optimized files by the build.
const media = import.meta.glob<{ default: ImageMetadata }>('/src/content/media/*', { eager: true });

/** An article's body as HTML, its images resolved against where the article sits. */
export async function renderArticle(post: Post): Promise<string> {
  const folder = posix.dirname('/' + (post.filePath ?? `src/content/blog/${post.id}.md`));
  return articleHtml(post.body ?? '', async (src: string) => {
    if (/^[a-z]+:|^\/\//i.test(src)) return undefined;
    const found = media[posix.normalize(posix.join(folder, decodeURI(src)))];
    if (!found) throw new Error(`An article image is missing: ${src} in ${post.id}`);
    const made = await getImage({ src: found.default });
    return { src: made.src, width: made.attributes.width ?? found.default.width, height: made.attributes.height ?? found.default.height };
  });
}
