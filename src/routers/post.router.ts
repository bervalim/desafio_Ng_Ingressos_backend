import { Router } from "express";

export const postRouter: Router = Router();

postRouter.post("/");
postRouter.get("/");
postRouter.get("/:id");
postRouter.delete("/:id");
postRouter.patch("/:id");
