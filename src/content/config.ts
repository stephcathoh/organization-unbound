import { defineCollection, reference,z } from 'astro:content';


const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		author: z.string().optional(),
		authorPic: z.string().optional(),
		deets: z.any().optional(),
		responses:z.string().optional(),
		responsesNumber:z.string().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()),
		categories: z.array(z.string()).optional(),
		relatedPosts: z.array(reference('blog')).optional(),
		relatedComments: z.array(reference('comments')).optional(),
		

		})

	 });
		
		

const authors = defineCollection({
	type:'content',
	schema:z.object({

	author: z.string().default('Organization Unbound'),
    tags: z.array(z.string()),
}),
  });
  const comment = z.object({
	commentMade: z.string(),
	createdBy: z.object({
	commentAuthPic: z.string(),
	fullName: z.string(),
	commentDate: z.coerce.date().optional(),

	}),
  });

  const comments = defineCollection({
	type:'data',
	schema: z.object({
		"id":z.number(),
		"parent":z.string().nullable(),
		"author_name": z.string(),
		"author_url": z.string(),
		"date": z.coerce.date().optional(),
		"html": z.string(),
		 "link": z.string(),
		  "author_avatar_urls": z.string(),

	})
  });

  const contributors = defineCollection ({
	type:'content',
	schema:z.object ({
		contributions: z.array(z.string()),
		url:z.string(),
	})
  })

export const collections = { blog, authors, comments, contributors };