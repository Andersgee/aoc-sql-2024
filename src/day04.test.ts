import { expect, test } from "vitest";
import { db, typedSql } from "./client.js";

test("day04a", async () => {
  const results = await db.$queryRawTyped(typedSql.day04a());
  const actual = results.at(0)?.answer;
  const expected = process.env.K === "test" ? 18n : 2543n;

  expect(actual).toBe(expected);
});

test("day04b", async () => {
  const results = await db.$queryRawTyped(typedSql.day04b());
  const actual = results.at(0)?.answer;
  const expected = process.env.K === "test" ? 9n : 1930n;

  expect(actual).toBe(expected);
});
