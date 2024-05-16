import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";
import { verify } from "jsonwebtoken";

export const verifyIfTokenExists = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError("Missing Bearer Token", 401);

  const getToken = authorization.split(" ")[1];

  const decodedToken = verify(getToken, process.env.SECRET_KEY!);

  res.locals = { ...res.locals, decodedToken };

  return next();
};

export const verifyPermission = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sub } = res.locals.decodedToken;

  const { id } = req.params;

  if (id !== sub) throw new AppError("Insufficient Permissions", 403);

  return next();
};
