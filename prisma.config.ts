// Prisma 7.10 — https://pris.ly/d/prisma-config
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
  datasource: {
    // ใช้ .env -> DATABASE_URL="file:./dev.db" (ไฟล์อยู่ที่รากโปรเจค)
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  },
});
