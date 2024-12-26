import { expect, test } from "vitest";
import { db, typedSql } from "./client.js";

test("day01", async () => {
  const results = await db.$queryRawTyped(typedSql.day01a());
  const actual = results.at(0)?.left;
  const expected = 11;
  expect(actual).toBe(expected);
});
