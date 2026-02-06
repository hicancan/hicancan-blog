import { getCollection, type CollectionEntry } from 'astro:content';

export async function getSortedPosts(): Promise<CollectionEntry<'blog'>[]> {
    const posts = await getCollection('blog');
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getUniqueTags(): Promise<string[]> {
    const posts = await getCollection('blog');
    const tags = new Set<string>();
    posts.forEach(post => {
        post.data.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
}

export async function getPostsByTag(tag: string): Promise<CollectionEntry<'blog'>[]> {
    const posts = await getSortedPosts();
    return posts.filter(post => post.data.tags?.includes(tag));
}

export async function getTagCounts(): Promise<Record<string, number>> {
    const posts = await getCollection('blog');
    const counts: Record<string, number> = {};

    posts.forEach(post => {
        post.data.tags?.forEach(tag => {
            counts[tag] = (counts[tag] || 0) + 1;
        });
    });

    return counts;
}

export function sortTagsByCount(counts: Record<string, number>): string[] {
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}
