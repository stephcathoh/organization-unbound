import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    authorUrl: z.string().optional(),
    authorPic: z.string().optional(),
    deets: z.any().optional(),
    commentStatus: z.string().optional(),
    responses: z.string().optional(),
    responsesNumber: z.string().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
    categories: z.array(z.string()).optional(),
    relatedPosts: z.array(reference("blog")).optional(),
    postComments: z
      .array(
        z.object({
          commenterName: z.string().optional(),
          date: z.string().optional(),
          html: z.string().optional(),
          authorAvatar: z.string().optional(),
          authorAvatarUrls: z.string().optional(),
        }),
      )
      .optional(),
    contributors: z.array(reference("contributors")).optional(),
  }),
});

const commentsCollection = defineCollection({
  type: "data",
  schema: z.object({
    id: z.number().optional(),
    parent: z.string().nullable().optional(),
    commenterName: z.string().optional(),
    authorUrl: z.string().url().optional(),
    date: z.string().optional(),
    html: z.string().optional(),
    authorAvatar: z.string().optional(),
    authorAvatarUrls: z.string().optional(),
  }),
});

const contributors = defineCollection({
  type: "content",
  schema: z.object({
    contributor: z.string().optional(),
    contributorUrl: z.string().optional(),
  }),
});

export const collections = {
  blog: blog,
  comments: commentsCollection,
  contributors: contributors,
};
