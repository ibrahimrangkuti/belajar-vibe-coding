import { Elysia } from "elysia";
import { routes } from "./routes";

const port = Number(process.env.PORT) || 3000;

export const app = new Elysia()
  .use(routes)
  .listen(port, () => {
    console.log(`🦊 Elysia is running at http://localhost:${port}`);
  });

export type App = typeof app;
