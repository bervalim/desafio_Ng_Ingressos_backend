import { z } from "zod";
import {
  createUserRequestNoAdminSchema,
  createUserRequestSchema,
  userLoginRequestSchema,
  userLoginResponseSchema,
  userResponseNoPasswordSchema,
  usersListResponseSchema,
} from "../schemas/user.schema";

export type TCreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type TCreateUserRequestNoAdmin = z.infer<
  typeof createUserRequestNoAdminSchema
>;
export type TUpdateUserRequest = Partial<TCreateUserRequestNoAdmin>;
export type TUserResponseNoPassword = z.infer<
  typeof userResponseNoPasswordSchema
>;
export type TUsersListResponse = z.infer<typeof usersListResponseSchema>;
export type TUserLoginRequest = z.infer<typeof userLoginRequestSchema>;
export type TUserLoginResponse = z.infer<typeof userLoginResponseSchema>;
