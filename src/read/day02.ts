import { db } from "#src/client.js";
import { promises as fs } from "node:fs";
import { z } from "zod";

const zRow = z.array(z.coerce.number());

export async function readDay02() {
  await readInputTest();
}

/*
export async function readInput() {
  await db.day02.deleteMany();
  const data = await read("input.txt");
  //await db.day02.createMany({ data });
}
  */
async function readInputTest() {
  await db.day02.deleteMany();

  const data = await read("input-day02-test.txt");

  await db.day02.createMany({
    data: data.map((x) => ({ id: x.id })),
  });

  await db.day02element.createMany({
    data: data.flatMap((x) => x.elements),
  });
}

async function read(path: string) {
  const rows = (await fs.readFile(path, { encoding: "utf-8" }))
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
