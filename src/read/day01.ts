import { db } from "#src/client.js";
import { promises as fs } from "node:fs";
import { z } from "zod";

const zRow = z.tuple([z.coerce.number(), z.coerce.number()]);

const PATH =
  process.env.K === "test" ? "input-day01-test.txt" : "input-day01.txt";

export async function readDay01() {
  const data = await parse();
  await db.day01.createMany({ data });
}

async function parse() {
  console.log("day01 PATH:", PATH);
  const rows = (await fs.readFile(PATH, { encoding: "utf-8" }))
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
