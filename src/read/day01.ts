import { db } from "#src/client.js";
import { promises as fs } from "node:fs";
import { z } from "zod";

const zRow = z.tuple([z.coerce.number(), z.coerce.number()]);

export async function readDay01() {
  await readInputTest();
  await readInput();
}

async function readInput() {
  //await db.day01.deleteMany();
  const data = await read("input-day01.txt");
  await db.day01.createMany({ data });
}
async function readInputTest() {
  //await db.day01test.deleteMany();
  const data = await read("input-day01-test.txt");
  await db.day01test.createMany({ data });
}

async function read(path: string) {
  const rows = (await fs.readFile(path, { encoding: "utf-8" }))
    .trim()
    .split("\n")
    .map((row) => {
      const [left, right] = zRow.parse(splitWhiteSpace(row));
      return { left, right };
    });

  return rows;
}

function splitWhiteSpace(s: string) {
  return s.trim().split(/\s+/);
}
