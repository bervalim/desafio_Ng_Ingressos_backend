import { hash } from "bcryptjs";
import {
  TCreateUserRequest,
  TUserResponseNoPassword,
  TUsersListResponse,
} from "../interfaces/user.interface";
import { prisma } from "../app";
import {
  userResponseNoPasswordSchema,
  usersListResponseSchema,
} from "../schemas/user.schema";

export const createUserService = async (
  data: TCreateUserRequest
): Promise<TUserResponseNoPassword> => {
  data.password = await hash(data.password, 12);
  const newUser: TUserResponseNoPassword = await prisma.user.create({ data });
  return userResponseNoPasswordSchema.parse(newUser);
};

export const readUsersService = async (): Promise<TUsersListResponse> => {
  const users: TUsersListResponse = await prisma.user.findMany();
  return usersListResponseSchema.parse(users);
};
