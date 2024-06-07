import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		author: z.string().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()),
		categories: z.array(z.string()).optional(),
		})
	 });
		
		

const authors = defineCollection({
	type:'content',
	schema:z.object({

	author: z.string().default('Organization Unbound'),
    tags: z.array(z.string()),
}),
  });

  const contributors = defineCollection ({
	type:'content',
	schema:z.object ({
		contributions: z.array(z.string()),
		url:z.string(),
	})
  })

export const collections = { blog, authors, contributors };