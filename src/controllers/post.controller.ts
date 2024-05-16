import { Request, Response } from "express";
import {
  createPostService,
  deletePostService,
  readPostByIdService,
  readPostsService,
  updatePostService,
} from "../services/post.service";

export const createPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { sub } = res.locals.decodedToken;
  const newPost = await createPostService(req.body, sub);
  return res.status(201).json(newPost);
};

export const readPostsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const posts = await readPostsService();
  return res.status(200).json(posts);
};

export const readPostByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findPost } = res.locals;
  const onePost = await readPostByIdService(findPost);
  return res.status(200).json(onePost);
};

export const deletePostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findPost } = res.locals;
  await deletePostService(findPost);
  return res.status(204).json(findPost);
};

export const updatePostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findPost } = res.locals;
  const updatedPost = await updatePostService(findPost, req.body);
  return res.status(200).json(updatedPost);
};
