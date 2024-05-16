import { NextFunction, Request, Response } from "express";
import { prisma } from "../app";
import AppError from "../errors/AppError.error";

export const verifyUserIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const findUser = await prisma.user.findUnique({ where: { id: id } });

  if (!findUser) throw new AppError("User Not Found", 404);

  res.locals = { ...res.locals, findUser };

  return next();
};
