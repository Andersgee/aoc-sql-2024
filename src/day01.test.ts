import { expect, test } from "vitest";
import { db, typedSql } from "./client.js";

test("day01test", async () => {
  const results = await db.$queryRawTyped(typedSql.day01atest());
  console.log("results:", results);
  console.log("results.length:", results.length);

  const actual = results.at(0)?.answer;
  const expected = 11n;
  expect(actual).toBe(expected);
});

test("day01", async () => {
  const results = await db.$queryRawTyped(typedSql.day01a());

  const actual = results.at(0)?.answer;
  const expected = 1319616n;
  expect(actual).toBe(expected);
});
