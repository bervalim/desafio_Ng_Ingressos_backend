import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { Application } from "express";
import { handleErrors } from "./middlewares/HandleErrors.middleware";
import { allRoutes } from "./routers";

export const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:4200"],
  })
);

app.use("/", allRoutes);

app.use(handleErrors);
