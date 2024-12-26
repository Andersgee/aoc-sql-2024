import { db, typedSql } from "./client.js";

async function main() {
  const r = await db.$queryRawTyped(typedSql.getAllUsers());
  console.log(r);
}

void main();
