import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { Application } from "express";
import { handleErrors } from "./middlewares/HandleErrors.middleware";
import { allRoutes } from "./routers";
import { PrismaClient } from "@prisma/client";

export const app: Application = express();

export const prisma = new PrismaClient();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:4200"],
  })
);

app.use("/", allRoutes);

app.use(handleErrors);
