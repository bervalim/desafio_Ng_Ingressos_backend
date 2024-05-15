import { Request, Response } from "express";
import { createUserService, readUsersService } from "../services/user.service";
import {
  TUserResponseNoPassword,
  TUsersListResponse,
} from "../interfaces/user.interface";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newClient: TUserResponseNoPassword = await createUserService(req.body);
  return res.status(201).json(newClient);
};

export const readUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clients: TUsersListResponse = await readUsersService();
  return res.status(200).json(clients);
};
