import { useLoaderData, useRevalidator } from "react-router";
import { useBasket } from "../../context/useBasket";
import BasketItem from "../../components/Basket/BasketItem";
import OrderSummary from "../../components/Basket/OrderSummary";
import { ShoppingCart } from "lucide-react";
import { toPersianDigits } from "../../utils/formatNumber";

function Basket() {
  const products = useLoaderData();
  const { removeFromBasket, updateQuantity } = useBasket();
  const revalidator = useRevalidator();

  const handleRemove = (id) => {
    removeFromBasket(id);
    revalidator.revalidate();
  };

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
    revalidator.revalidate();
  };

  if (products.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-20 text-center mt-15">
        <ShoppingCart className="h-12 w-12 text-zinc-300 dark:text-zinc-600" />
<p className="text-zinc-500 dark:text-zinc-400">سبد خرید شما خالیه</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full mt-20 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mb-6 flex items-center gap-2">
        <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
          سبد خرید
        </h1>
          <span  className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {toPersianDigits(products.length)} کالا
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* لیست آیتم‌ها */}
        <div className="rounded-2xl border border-zinc-200 bg-white px-5 dark:border-zinc-700 dark:bg-zinc-900 lg:col-span-2">
          {products.map((product) => (
            <BasketItem
              key={product.id}
              product={product}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        {/* خلاصه‌ی سفارش */}
        <div className=" lg:top-24 lg:self-start">
          <OrderSummary products={products} />
        </div>
      </div>
    </div>
  );
}

export default Basket;