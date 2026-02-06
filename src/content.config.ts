import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: image().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const friends = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/friends" }),
    schema: z.object({
        name: z.string(),
        role: z.string(),
        url: z.string(),
        avatar: z.string(),
        description: z.string(),
    }),
});

const projects = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        link: z.string(),
        featured: z.boolean().default(false),
        priority: z.number().default(0),
    }),
});

const authors = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/authors" }),
    schema: z.object({
        name: z.string(),
        role: z.string().optional(),
        skills: z.array(z.object({
            category: z.string(),
            items: z.array(z.string())
        })),
        timeline: z.array(z.object({
            year: z.string(),
            title: z.string(),
            desc: z.string()
        })),
    }),
});

export const collections = { blog, friends, projects, authors };
