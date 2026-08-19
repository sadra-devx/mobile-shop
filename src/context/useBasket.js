import { useContext } from "react";
import { BasketContext } from "./BasketContext";

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket باید داخل BasketProvider استفاده بشه");
  }
  return context;
}