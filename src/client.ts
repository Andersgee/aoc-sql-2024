import { PrismaClient } from "@prisma/client";
export * as typedSql from "@prisma/client/sql";
import { Prisma } from "@prisma/client";

export const Decimal = Prisma.Decimal;

//https://github.com/vercel/turborepo/blob/main/examples/with-prisma/packages/database/src/client.ts

//recommended to put client on global object to avoid re-instantiation in development
interface G {
  db: PrismaClient | undefined;
}

export const db = (global as unknown as G).db ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") (global as unknown as G).db = db;

export * from "@prisma/client";
