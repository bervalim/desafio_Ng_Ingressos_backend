import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { createUserService, readUsersService } from "../services/user.service";
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
    admin: req.body.admin,
  };
  const newClient: TUserResponseNoPassword = await createUserService(data);
  return res.status(201).json(newClient);
};

export const readUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clients: TUsersListResponse = await readUsersService();
  return res.status(200).json(clients);
};
