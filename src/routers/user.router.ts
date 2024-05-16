import { Router } from "express";
import { validateUserEmailExists } from "../middlewares/validateUserEmailExists";
import {
  createUserController,
  deleteUserController,
  readOneUserController,
  readUsersController,
  updateUserController,
} from "../controllers/user.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserRequestSchema } from "../schemas/user.schema";
import { verifyUserIdExists } from "../middlewares/verifyUserIdExists.middleware";
import {
  verifyIfTokenExists,
  verifyPermission,
} from "../middlewares/auth.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validateBody(createUserRequestSchema),
  validateUserEmailExists,
  createUserController
);
userRouter.get("/", verifyIfTokenExists, readUsersController);
userRouter.get(
  "/:id",
  verifyUserIdExists,
  verifyIfTokenExists,
  verifyPermission,
  readOneUserController
);
userRouter.delete(
  "/:id",
  verifyUserIdExists,
  verifyIfTokenExists,
  verifyPermission,
  deleteUserController
);
userRouter.patch(
  "/:id",
  verifyUserIdExists,
  verifyIfTokenExists,
  verifyPermission,
  updateUserController
);
