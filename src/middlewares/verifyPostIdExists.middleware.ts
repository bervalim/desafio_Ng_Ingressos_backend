import { NextFunction, Request, Response } from "express";
import { prisma } from "../app";
import AppError from "../errors/AppError.error";

export const verifyPostIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const findPost = await prisma.post.findUnique({ where: { id: id } });

  if (!findPost) throw new AppError("Post Not Found", 404);

  res.locals = { ...res.locals, findPost };

  return next();
};
