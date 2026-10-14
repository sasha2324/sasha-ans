// Regole per gli articoli del blog: ogni file .md in src/content/blog/<lingua>/
// deve avere questi campi in testa (frontmatter). Se ne manca uno, la build si ferma
// e dice quale file correggere.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // I file che iniziano con _ vengono ignorati (utile per appunti)
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Le bozze si vedono solo con `npm run dev`, non vengono pubblicate
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
