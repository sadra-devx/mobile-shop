import axiosInstance from "../../api/axiosInstance";
import { getProductById } from "../../api/products";

export async function profileLoader() {
  const stored = localStorage.getItem("user");
  if (!stored) return { orders: [] };

  const { phone } = JSON.parse(stored);

  try {
    const [{ data: customers }, { data: orders }] = await Promise.all([
      axiosInstance.get("/customers"),
      axiosInstance.get("/orders"),
    ]);

    const matchedIds = customers
      .filter((c) => c.phone === phone)
      .map((c) => String(c.id));

    const myOrders = orders.filter((o) => matchedIds.includes(String(o.customerId)));

    const enriched = await Promise.all(
      myOrders.map(async (order) => {
        const items = await Promise.all(
          order.items.map(async (item) => {
            const product = await getProductById(item.productId).catch(() => null);
            return { ...item, product };
          })
        );
        return { ...order, items };
      })
    );

    return { orders: enriched };
  } catch {
    return { orders: [] };
  }
}