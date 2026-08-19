import { formatPrice, toPersianDigits } from "../../utils/formatNumber";
import AddToBasketButton from "./AddToBasketButton";

export default function ProductInfo({ product }) {
  const { name, brand, price, description, inStock, stock, warranty } = product;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
          {brand}
        </span>
        <h1 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl">
          {name}
        </h1>
      </div>

      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            inStock ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            inStock
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-500"
          }`}
        >
          {inStock ? `موجود (${toPersianDigits(stock)} عدد)` : "ناموجود"}
        </span>
      </div>

      <div className="border-t border-zinc-200 pt-5 dark:border-zinc-700">
        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {formatPrice(price)}
        </span>
        <span className="mr-1 text-sm text-zinc-500">تومان</span>
      </div>

      <AddToBasketButton product={product} disabled={!inStock} />

      <p className="text-xs text-zinc-400">
        گارانتی: {warranty}
      </p>
    </div>
  );
}