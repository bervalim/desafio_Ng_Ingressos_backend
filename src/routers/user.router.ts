import { Router } from "express";
import { validateUserEmailExists } from "../middlewares/validateUserEmailExists";
import {
  createUserController,
  readUsersController,
} from "../controllers/user.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserRequestSchema } from "../schemas/user.schema";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validateBody(createUserRequestSchema),
  validateUserEmailExists,
  createUserController
);
userRouter.get("/", readUsersController);
