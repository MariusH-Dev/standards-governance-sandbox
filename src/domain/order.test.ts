import { expect, it } from "vitest";
import { totalOf } from "./order";

it("reads the total", () => {
  expect(totalOf({ id: "x", total: 1 })).toBe(1);
});
