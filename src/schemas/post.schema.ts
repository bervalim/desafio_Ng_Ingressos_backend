import { z } from "zod";

const SexEnumValues = ["Male", "Female", "Other"] as const;

export const postResponseSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(120),
  content: z.string().min(3),
  author: z.string(),
  createdAt: z.date(),
  user_id: z.string(),
});

export const readPostsResponseSchema = postResponseSchema.array();

export const readOnePostResponseSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(120),
  content: z.string().min(3),
  author: z.string(),
  createdAt: z.date(),
  user_id: z.string(),
  user: z.object({
    name: z.string().min(3).max(80),
    email: z.string().email().min(3).max(45),
    birthDate: z.string().max(30).min(1),
    sex: z.enum(SexEnumValues),
  }),
});

export const createPostRequestSchema = postResponseSchema.omit({
  id: true,
  createdAt: true,
  user_id: true,
  author: true,
});

export const updatePostRequestSchema = createPostRequestSchema.partial();
