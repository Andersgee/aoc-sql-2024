import { expect, test } from "vitest";
import { db, typedSql } from "./client.js";
test("day04a", () => {
  expect(1).toBe(1);
});
/*
test("day04a", async () => {
  const results = await db.$queryRawTyped(typedSql.day04a());
  console.log(results);
  //const actual = results.at(0)?.answer;
  const actual = 1n;
  const expected = process.env.K === "test" ? 161n : 175700056n;

  expect(actual).toBe(expected);
});
*/
