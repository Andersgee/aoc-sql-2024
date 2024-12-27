import { expect, test } from "vitest";
import { db, typedSql } from "./client.js";

test("day02atest", async () => {
  const results = await db.$queryRawTyped(typedSql.day02atest());
  console.log("results:", results);
  console.log("results.length:", results.length);

  //const actual = results.at(0)?.answer;
  const actual = 1n;
  const expected = 2n;
  expect(actual).toBe(expected);
});
