import { db } from "#src/client.js";
import { promises as fs } from "node:fs";

const PATH =
  process.env.K === "test" ? "input-day04-test.txt" : "input-day04.txt";

export async function readDay04() {
  const data = await parse();

  await db.day04cell.createMany({ data });
}

async function parse() {
  const rows = (await fs.readFile(PATH, { encoding: "utf-8" }))
    .trim()
    .split("\n")
    .map((row, y) => {
      const chars = row.trim().split("");
      return chars.map((c, x) => ({
        y,
        x,
        c,
      }));
    });

  return rows.flatMap((x) => x);
}
