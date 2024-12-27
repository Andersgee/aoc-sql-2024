import { expect, test } from "vitest";
import { db, typedSql } from "./client.js";

test("day03a", async () => {
  const results = await db.$queryRawTyped(typedSql.day03a());

  const actual = results.at(0)?.answer;
  const expected = process.env.K === "test" ? 161n : 175700056n;

  expect(actual).toBe(expected);
});

test("day03b", async () => {
  const results = await db.$queryRawTyped(typedSql.day03b());

  const actual = results.at(0)?.answer;
  const expected = process.env.K === "test" ? 48n : 71668682n;

  expect(actual).toBe(expected);
});
