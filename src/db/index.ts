import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionUri = process.env.DATABASE_URL;

const connectionConfig = connectionUri
  ? { uri: connectionUri }
  : {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "belajar_vibe_coding",
    };

const poolConnection = mysql.createPool(connectionConfig);

export const db = drizzle(poolConnection, { schema, mode: "default" });
