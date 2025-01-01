import { expect, test } from "vitest";
import { db, typedSql } from "./client.js";

test("day05a", async () => {
  const results = await db.$queryRawTyped(typedSql.day05a());
  const actual = results.at(0)?.answer;
  const expected = process.env.K === "test" ? 143n : 4924n;

  expect(actual).toBe(expected);
});

/*
test("day05b", async () => {
  const results = await db.$queryRawTyped(typedSql.day05b());
  console.log(results);
  console.log("length:", results.length);
  //const actual = results.at(0)?.answer;
  const actual = 1n;
  const expected = process.env.K === "test" ? 143n : 4924n;

  expect(actual).toBe(expected);
});
*/
