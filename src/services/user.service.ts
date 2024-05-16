import { hash } from "bcryptjs";
import {
  TCreateUserRequest,
  TUserResponseNoPassword,
  TUsersListResponse,
} from "../interfaces/user.interface";
import { prisma } from "../app";
import {
  readOneUserResponseSchema,
  userResponseNoPasswordSchema,
  usersListResponseSchema,
} from "../schemas/user.schema";
import { User } from "@prisma/client";
import AppError from "../errors/AppError.error";
import { isValidImageUrl } from "./helpers";

export const createUserService = async (
  data: TCreateUserRequest
): Promise<TUserResponseNoPassword> => {
  const hashedPassword = await hash(data.password, 12);

  const { avatar } = data;

  if (avatar && !isValidImageUrl(avatar)) {
    throw new AppError("Avatar must be a valid image URL");
  }

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      birthDate: data.birthDate,
      sex: data.sex,
      avatar: avatar as string,
    },
  });

  return userResponseNoPasswordSchema.parse(newUser);
};

export const readUsersService = async (): Promise<TUsersListResponse> => {
  const users: TUsersListResponse = await prisma.user.findMany();
  return usersListResponseSchema.parse(users);
};

export const readOneUserService = async (
  user: User
): Promise<TUserResponseNoPassword> => {
  const oneUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      posts: true,
    },
  });
  return readOneUserResponseSchema.parse(oneUser);
};

export const deleteUserService = async (user: User): Promise<void> => {
  await prisma.user.delete({ where: { id: user.id } });
};

export const updateUserService = async (
  user: User,
  data: any
): Promise<TUserResponseNoPassword> => {
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data,
  });

  return userResponseNoPasswordSchema.parse(updatedUser);
};
