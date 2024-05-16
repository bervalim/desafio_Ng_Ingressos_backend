import { Router } from "express";
import { userRouter } from "./user.router";
import { sessionRouter } from "./session.router";
import { postRouter } from "./post.router";

export const allRoutes: Router = Router();
allRoutes.use("/users", userRouter);
allRoutes.use("/login", sessionRouter);
allRoutes.use("/posts", postRouter);
