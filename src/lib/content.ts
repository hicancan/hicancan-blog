import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime() || a.id.localeCompare(b.id));
}

const categoryNames: Record<string, string> = {
  ctf: 'CTF',
  数学: '数学',
  科研: '科研',
  算法: '算法',
  英语: '英语',
};

export function categoryOf(post: Post): string {
  return categoryNames[post.id.split('/')[0].toLowerCase()] ?? '随笔';
}

export function postUrl(post: Post): string {
  return '/blog/' + post.id + '/';
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date).replaceAll('/', '.');
}
