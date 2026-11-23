import { Elysia, t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    return await db.select().from(users);
  })
  .get(
    "/:id",
    async ({ params: { id }, set }) => {
      const result = await db.select().from(users).where(eq(users.id, id));
      if (result.length === 0) {
        set.status = 404;
        return { message: "User not found" };
      }
      return result[0];
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .post(
    "/",
    async ({ body, set }) => {
      const [result] = await db.insert(users).values(body);
      set.status = 201;
      return {
        message: "User created successfully",
        id: result.insertId,
        ...body,
      };
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ format: "email" }),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params: { id }, body, set }) => {
      const existing = await db.select().from(users).where(eq(users.id, id));
      if (existing.length === 0) {
        set.status = 404;
        return { message: "User not found" };
      }
      await db.update(users).set(body).where(eq(users.id, id));
      return {
        message: "User updated successfully",
        id,
        ...body,
      };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: t.Object({
        name: t.Optional(t.String({ minLength: 1 })),
        email: t.Optional(t.String({ format: "email" })),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params: { id }, set }) => {
      const existing = await db.select().from(users).where(eq(users.id, id));
      if (existing.length === 0) {
        set.status = 404;
        return { message: "User not found" };
      }
      await db.delete(users).where(eq(users.id, id));
      return { message: "User deleted successfully" };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
