import { Router } from "express";
import { userLoginController } from "../controllers/session.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userLoginRequestSchema } from "../schemas/user.schema";

export const sessionRouter: Router = Router();

sessionRouter.post(
  "/",
  validateBody(userLoginRequestSchema),
  userLoginController
);
