import { expect, test } from "vitest";
import { db, typedSql } from "./client.js";

test("day02a", async () => {
  const results = await db.$queryRawTyped(typedSql.day02a());
  //console.log("results:", results);
  //console.log("results.length:", results.length);

  const actual = results.at(0)?.answer;

  const expected = process.env.K === "test" ? 2n : 442n;

  expect(actual).toBe(expected);
});

test("day02b", async () => {
  const results = await db.$queryRawTyped(typedSql.day02b());
  console.log("results:", results);
  console.log("results.length:", results.length);

  const actual = results.at(0)?.answer;
  //const actual = 1n;

  console.log("day02TEST, process.env.NODE_ENV:", process.env.NODE_ENV);
  const expected = process.env.K === "test" ? 4n : 493n;
  expect(actual).toBe(expected);
});
