import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useBasket } from "../../context/useBasket";

export default function AddToBasketButton({ product, disabled }) {
  const [added, setAdded] = useState(false);
  const{addToBasket} = useBasket()
  const handleAddToCart = () => {
    addToBasket(product.id)
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-medium transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed bg-zinc-200 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500"
          : added
          ? "bg-emerald-500 text-white"
          : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          به سبد اضافه شد
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          {disabled ? "ناموجود" : "افزودن به سبد خرید"}
        </>
      )}
    </button>
  );
}