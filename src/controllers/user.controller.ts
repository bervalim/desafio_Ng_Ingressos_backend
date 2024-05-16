import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
  createUserService,
  deleteUserService,
  readOneUserService,
  readUsersService,
  updateUserService,
} from "../services/user.service";
import {
  TUserResponseNoPassword,
  TUsersListResponse,
} from "../interfaces/user.interface";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const upload = await cloudinary.uploader.upload(
    req.file!.path,
    (error, result) => result
  );
  fs.unlink(req.file!.path, (error) => {
    if (error) {
      console.log(error);
    }
  });

  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    birthDate: req.body.birthDate,
    sex: req.body.sex,
    avatar: upload.secure_url,
  };
  const newUser: TUserResponseNoPassword = await createUserService(data);
  return res.status(201).json(newUser);
};

export const readUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TUsersListResponse = await readUsersService();
  return res.status(200).json(users);
};

export const readOneUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findUser } = res.locals;
  console.log(findUser);
  console.log(findUser.id);
  const oneUser = await readOneUserService(findUser);
  return res.status(200).json(oneUser);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findUser } = res.locals;
  await deleteUserService(findUser);
  return res.status(204).json();
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findUser } = res.locals;
  const updatedUser = await updateUserService(findUser, req.body);
  return res.status(200).json(updatedUser);
};
