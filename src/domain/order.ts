export type Order = { id: string; total: number };

export function totalOf(order: Order): number {
  return order.total;
}
