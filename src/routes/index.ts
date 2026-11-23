import { Elysia } from "elysia";
import { userRoutes } from "./users";

export const routes = new Elysia()
  .get("/", () => ({
    message: "REST API with Bun, ElysiaJS, Drizzle, and MySQL",
    status: "ok",
  }))
  .use(userRoutes);
