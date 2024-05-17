import { Request, Response } from "express";
import { TUserLoginResponse } from "../interfaces/user.interface";
import { userLoginService } from "../services/session.service";

export const userLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: TUserLoginResponse = await userLoginService(req.body);
  return res.status(200).json(token);
};
