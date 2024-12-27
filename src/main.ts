import { readDay01 } from "./read/day01.js";
import { readDay02 } from "./read/day02.js";
import { readDay03 } from "./read/day03.js";

async function main() {
  await readDay01();
  await readDay02();
  await readDay03();
}

void main();
