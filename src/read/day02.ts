import { db } from "#src/client.js";
import { promises as fs } from "node:fs";
import { z } from "zod";

const zRow = z.array(z.coerce.number());

const PATH =
  process.env.K === "test" ? "input-day02-test.txt" : "input-day02.txt";

export async function readDay02() {
  const data = await parse();

  await db.day02element.createMany({ data: data.flatMap((x) => x.elements) });
}

async function parse() {
  const rows = (await fs.readFile(PATH, { encoding: "utf-8" }))
    .trim()
    .split("\n")
    .map((row, id) => {
      const elements = zRow.parse(splitWhiteSpace(row));
      return {
        id,
        elements: elements.map((value, index) => ({
          day02Id: id,
          index,
          value,
        })),
      };
    });

  return rows;
}

function splitWhiteSpace(s: string) {
  return s.trim().split(/\s+/);
}
