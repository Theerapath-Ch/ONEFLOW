import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Prisma 7 — ต้องส่ง adapter เข้า PrismaClient (https://pris.ly/d/driver-adapters)
// SQLite file: ใช้ better-sqlite3 adapter — DATABASE_URL = "file:./dev.db"
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  // url: process.env.DATABASE_URL ?? "file:./dev.db",
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    // log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
