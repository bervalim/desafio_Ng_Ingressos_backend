import { z } from "zod";

const SexEnumValues = ["Male", "Female", "Other"] as const;

export const userResponseSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(80),
  email: z.string().email().min(3).max(45),
  password: z.string().max(120).min(8),
  birthDate: z.string().max(30).min(1),
  sex: z.enum(SexEnumValues),
});

export const readOneUserResponseSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(80),
  email: z.string().email().min(3).max(45),
  birthDate: z.string().max(30).min(1),
  sex: z.enum(SexEnumValues),

  posts: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(3).max(120),
      content: z.string().min(3),
      createdAt: z.date(),
      user_id: z.string(),
    })
  ),
});

export const createUserRequestSchema = userResponseSchema.omit({ id: true });

export const updateUserRequestSchema = createUserRequestSchema.partial();

export const userResponseNoPasswordSchema = userResponseSchema.omit({
  password: true,
});

export const usersListResponseSchema = userResponseNoPasswordSchema.array();

export const userLoginRequestSchema = userResponseSchema.pick({
  email: true,
  password: true,
});

export const userLoginResponseSchema = z.object({
  token: z.string(),
  user: userResponseSchema.pick({
    id: true,
    name: true,
    email: true,
    birthDate: true,
    sex: true,
  }),
});
