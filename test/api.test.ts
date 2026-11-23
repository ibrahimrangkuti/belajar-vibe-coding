import { describe, expect, it } from "bun:test";
import { app } from "../src";

describe("Elysia App", () => {
  it("should return welcome message on GET /", async () => {
    const response = await app.handle(new Request("http://localhost:3000/"));
    expect(response.status).toBe(200);
    const data = (await response.json()) as { status: string; message: string };
    expect(data.status).toBe("ok");
    expect(data.message).toBe("REST API with Bun, ElysiaJS, Drizzle, and MySQL");
  });
});
