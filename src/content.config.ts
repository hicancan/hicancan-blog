import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    link: z.url(),
    featured: z.boolean().optional(),
    priority: z.number().optional(),
  }),
});

const friends = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/friends' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    url: z.url(),
    avatar: z.url(),
    description: z.string(),
  }),
});

export const collections = { blog, projects, friends };
