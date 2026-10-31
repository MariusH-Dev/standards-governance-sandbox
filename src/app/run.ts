import { totalOf } from "../domain/order";
import { save } from "../infra/db";

export async function run(): Promise<number> {
  await save("x");
  return totalOf({ id: "x", total: 1 });
}
