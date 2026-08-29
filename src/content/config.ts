import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    author: z.string().default('FlyAustria Kochi Team'),
    category: z.string(),
    image: z.string().default('/images/hero-vienna.jpg'),
  }),
});

export const collections = {
  blog: blogCollection,
};
