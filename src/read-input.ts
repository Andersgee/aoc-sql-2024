import { promises as fs } from "node:fs";
import { z } from "zod";

const zRow = z.tuple([z.coerce.number(), z.coerce.number()]);

export async function readInput() {
  const rows = (await fs.readFile("input.txt", { encoding: "utf-8" }))
    .split("\n")
    .map((row) => zRow.parse(splitWhiteSpace(row)));

  return rows;
}

function splitWhiteSpace(s: string) {
  return s.trim().split(/\s+/);
}
