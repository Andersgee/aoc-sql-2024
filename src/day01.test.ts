import { expect, test } from "vitest";
import { db, typedSql } from "./client.js";

test("day01atest", async () => {
  const results = await db.$queryRawTyped(typedSql.day01atest());
  //console.log("results:", results);
  //console.log("results.length:", results.length);

  const actual = results.at(0)?.answer;
  const expected = 11n;
  expect(actual).toBe(expected);
});

test("day01a", async () => {
  const results = await db.$queryRawTyped(typedSql.day01a());
  const actual = results.at(0)?.answer;
  const expected = 1319616n;
  expect(actual).toBe(expected);
});

test("day01btest", async () => {
  const results = await db.$queryRawTyped(typedSql.day01btest());
  console.log("results:", results);
  console.log("results.length:", results.length);

  const actual = results.at(0)?.answer;
  const expected = 31n;
  expect(actual).toBe(expected);
});

test("day01b", async () => {
  const results = await db.$queryRawTyped(typedSql.day01b());
  console.log("results:", results);
  console.log("results.length:", results.length);

  const actual = results.at(0)?.answer;
  const expected = 27267728n;
  expect(actual).toBe(expected);
});
