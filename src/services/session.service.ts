import "dotenv/config";
import { prisma } from "../app";
import AppError from "../errors/AppError.error";
import {
  TUserLoginRequest,
  TUserLoginResponse,
} from "../interfaces/user.interface";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const userLoginService = async (
  data: TUserLoginRequest
): Promise<TUserLoginResponse> => {
  const { email } = data;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!findUser) throw new AppError("Invalid Credentials!", 401);

  const comparePasswords = await compare(data.password, findUser.password);

  if (!comparePasswords) throw new AppError("Invalid Credentials!", 401);

  const token = sign(
    { name: findUser.name, email: findUser.email },
    process.env.SECRET_KEY!,
    { subject: findUser.id, expiresIn: process.env.EXPIRES_IN! }
  );

  const userLoginResponse: TUserLoginResponse = {
    token: token,
    user: {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      birthDate: findUser.birthDate,
      sex: findUser.sex,
    },
  };

  return userLoginResponse;
};
