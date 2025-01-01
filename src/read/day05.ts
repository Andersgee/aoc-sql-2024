import { db } from "#src/client.js";
import { promises as fs } from "node:fs";
import { z } from "zod";

const PATH =
  process.env.K === "test" ? "input-day05-test.txt" : "input-day05.txt";

export async function readDay05() {
  const { rules, elements } = await parse();

  console.log({ rules, elements });
  await db.day05rule.createMany({ data: rules });
  await db.day05element.createMany({ data: elements });
}

async function parse() {
  const text = await fs.readFile(PATH, { encoding: "utf-8" });

  const [rulesText, elementsText] = z
    .tuple([z.string(), z.string()])
    .parse(text.split("\n\n"));

  const rules = rulesText.split("\n").map((row) => {
    const [a, b] = z
      .tuple([z.coerce.number(), z.coerce.number()])
      .parse(row.split("|"));
    return { a, b };
  });

  const elements = elementsText
    .split("\n")
    .map((row, y) => row.split(",").map((val, x) => ({ y, x, val: +val })))
    .flatMap((x) => x);

  return { rules, elements };
}
