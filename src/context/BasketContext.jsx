import { createContext, useState, useEffect } from "react";

const STORAGE_KEY = "basket";

export const BasketContext = createContext(null);

export default function BasketProvider({ children }) {
  const [basketItems, setBasketItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(basketItems));
  }, [basketItems]);

  const addToBasket = (productId, quantity = 1) => {
    setBasketItems((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: productId, quantity }];
    });
  };

  const removeFromBasket = (productId) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity == 0) return;
    console.log("quntity has changed");
    
    setBasketItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearBasket = () => {
    setBasketItems([])
    localStorage.removeItem("basket");
  };

  const value = {
    basketItems,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    clearBasket,
  };

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
}