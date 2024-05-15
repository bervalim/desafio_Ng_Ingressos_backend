import { Router } from "express";
import { validateUserEmailExists } from "../middlewares/validateUserEmailExists";
import {
  createUserController,
  readUsersController,
} from "../controllers/user.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserRequestSchema } from "../schemas/user.schema";
import { upload } from "../middlewares/multer.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  upload.single("avatar"),
  validateBody(createUserRequestSchema),
  validateUserEmailExists,
  createUserController
);
userRouter.get("/", readUsersController);
