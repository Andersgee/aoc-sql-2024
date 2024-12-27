import { db } from "#src/client.js";
import { promises as fs } from "node:fs";
import { z } from "zod";

const zRow = z.tuple([z.coerce.number(), z.coerce.number()]);

const PATH =
  process.env.K === "test" ? "input-day03-test.txt" : "input-day03.txt";
//const PATH = "input-day03-test.txt";

export async function readDay03() {
  const data = await parse();
  await db.day03.createMany({ data });
}

async function parse() {
  const x = await fs.readFile(PATH, { encoding: "utf-8" });

  //const re = RegExp("mul\\(\\d{1,3},\\d{1,3}\\)", "g");
  const re = RegExp("mul\\(\\d{1,3},\\d{1,3}\\)|don't\\(\\)|do\\(\\)", "g");

  const re2 = RegExp("\\d{1,3}", "g");

  const data: { a: number; b: number; do: number }[] = [];
  let d = 1;
  for (const s of x.match(re)!) {
    if (s === "do()") {
      d = 1;
      continue;
    } else if (s === "don't()") {
      d = 0;
      continue;
    } else {
      const [a, b] = zRow.parse(s.match(re2));
      data.push({
        a,
        b,
        do: d,
      });
    }
  }

  return data;
}

function splitWhiteSpace(s: string) {
  return s.trim().split(/\s+/);
}
