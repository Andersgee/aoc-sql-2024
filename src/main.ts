import { db, typedSql } from "./client.js";
import { readInput } from "./read-input.js";

async function main() {
  //await db.day01.createMany({ data: await readInput() });

  const r = await db.$queryRawTyped(typedSql.day01a());
  console.log(r);
}

void main();
