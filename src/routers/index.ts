import { Router } from "express";
import { userRouter } from "./user.router";

export const allRoutes: Router = Router();
allRoutes.use("/users", userRouter);
