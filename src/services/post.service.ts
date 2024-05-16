import { Post } from "@prisma/client";
import { prisma } from "../app";
import AppError from "../errors/AppError.error";
import {
  TCreatePostRequest,
  TPostResponse,
  TUpdatePostRequest,
} from "../interfaces/post.interface";
import {
  postResponseSchema,
  readOnePostResponseSchema,
  readPostsResponseSchema,
} from "../schemas/post.schema";

export const createPostService = async (
  data: TCreatePostRequest,
  id: string
): Promise<TPostResponse> => {
  const findUser = await prisma.user.findUnique({ where: { id } });
  if (!findUser) throw new AppError("User not found!", 404);

  const newPost: TPostResponse = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      user: {
        connect: {
          id: id,
        },
      },
    },
  });

  return postResponseSchema.parse(newPost);
};

export const readPostsService = async () => {
  const posts = await prisma.post.findMany();
  return readPostsResponseSchema.parse(posts);
};

export const readPostByIdService = async (post: Post) => {
  const onePost = await prisma.post.findUnique({
    where: { id: post.id },
    include: {
      user: true,
    },
  });
  return readOnePostResponseSchema.parse(onePost);
};

export const deletePostService = async (post: Post) => {
  await prisma.post.delete({ where: { id: post.id } });
};

export const updatePostService = async (
  post: Post,
  data: TUpdatePostRequest
): Promise<TPostResponse> => {
  const updatedUser = await prisma.post.update({
    where: {
      id: post.id,
    },
    data,
  });

  return postResponseSchema.parse(updatedUser);
};
