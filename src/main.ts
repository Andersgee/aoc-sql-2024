import { db, typedSql } from "./client.js";
import { readInput } from "./read-input.js";

async function main() {
  const rows = await readInput();

  console.log(rows);
  const r = await db.$queryRawTyped(typedSql.getAllUsers());
  console.log(r);
}

void main();
