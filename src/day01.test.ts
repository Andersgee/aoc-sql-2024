import { expect, test } from "vitest";
import { db, typedSql } from "./client.js";

test("day01a", async () => {
  const results = await db.$queryRawTyped(typedSql.day01a());
  //console.log("results:", results);
  //console.log("results.length:", results.length);

  const actual = results.at(0)?.answer;
  const expected = process.env.K === "test" ? 11n : 1319616n;
  expect(actual).toBe(expected);
});

test("day01b", async () => {
  const results = await db.$queryRawTyped(typedSql.day01b());
  const actual = results.at(0)?.answer;
  const expected = process.env.K === "test" ? 31n : 27267728n;

  expect(actual).toBe(expected);
});
