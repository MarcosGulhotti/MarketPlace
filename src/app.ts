import "reflect-metadata";
import express, { Express } from "express";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import router from "./router";
import { connectDatabase } from "./database";

connectDatabase();

const app: Express = express();

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use(express.json());
app.use(router);

export default app;
