import { z } from "zod";
import {
  createPostRequestSchema,
  postResponseSchema,
  readOnePostResponseSchema,
  readPostsResponseSchema,
} from "../schemas/post.schema";

export type TPostResponse = z.infer<typeof postResponseSchema>;
export type TReadPostsResponse = z.infer<typeof readPostsResponseSchema>;
export type TReadOnePostResponse = z.infer<typeof readOnePostResponseSchema>;
export type TCreatePostRequest = z.infer<typeof createPostRequestSchema>;
export type TUpdatePostRequest = Partial<TCreatePostRequest>;
