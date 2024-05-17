import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
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

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);
app.use("/", allRoutes);

app.use(handleErrors);
