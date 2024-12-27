import { readDay01 } from "./read/day01.js";
import { readDay02 } from "./read/day02.js";

async function main() {
  await readDay01();
  await readDay02();

  //const r = await db.$queryRawTyped(typedSql.day01a());
  //console.log(r);
}

void main();
