import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    weight: z.number().optional(),
    date: z.string().optional(),
    type: z.string().optional(),
  }),
});

export const collections = { docs };
