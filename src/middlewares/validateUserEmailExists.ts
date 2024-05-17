import { NextFunction, Request, Response } from "express";
import { prisma } from "../app";
import AppError from "../errors/AppError.error";

export const validateUserEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email) return next();

  const findUser = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (findUser) {
    throw new AppError("User Email Already Exists", 409);
  }

  return next();
};
