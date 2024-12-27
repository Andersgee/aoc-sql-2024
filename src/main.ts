import { readInput, readInputTest } from "./read-input.js";

async function main() {
  await readInput();
  await readInputTest();

  //const r = await db.$queryRawTyped(typedSql.day01a());
  //console.log(r);
}

void main();
