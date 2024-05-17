import { Router } from "express";
import {
  createPostController,
  deletePostController,
  readPostByIdController,
  readPostsController,
  updatePostController,
} from "../controllers/post.controller";
import {
  verifyIfTokenExists,
  verifyPostPermission,
} from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createPostRequestSchema } from "../schemas/post.schema";
import { verifyPostIdExists } from "../middlewares/verifyPostIdExists.middleware";

export const postRouter: Router = Router();

postRouter.post(
  "/",
  validateBody(createPostRequestSchema),
  verifyIfTokenExists,
  createPostController
);
postRouter.get("/", verifyIfTokenExists, readPostsController);
postRouter.get(
  "/:id",
  verifyPostIdExists,
  verifyIfTokenExists,
  verifyPostPermission,
  readPostByIdController
);
postRouter.delete(
  "/:id",
  verifyPostIdExists,
  verifyIfTokenExists,
  verifyPostPermission,
  deletePostController
);
postRouter.patch(
  "/:id",
  verifyPostIdExists,
  verifyIfTokenExists,
  verifyPostPermission,
  updatePostController
);
