import { Router } from "express";
import { userLoginController } from "../controllers/session.controller";

export const sessionRouter: Router = Router();

sessionRouter.post("/", userLoginController);
