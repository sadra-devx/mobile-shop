import { Trash2, Plus, Minus } from "lucide-react";
import { formatPrice, toPersianDigits } from "../../utils/formatNumber";

export default function BasketItem({ product, onRemove, onQuantityChange }) {
  const { id, name, brand, price, discountPercent, images, quantity, inStock } = product;

  const discount = Number(discountPercent) || 0;
  const finalPrice = price - (price * discount) / 100;
  const lineTotal = finalPrice * quantity;

  return (
    <div className="flex gap-4 border-b border-zinc-100 py-5 dark:border-zinc-800 last:border-0">
      {/* تصویر */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-800 sm:h-28 sm:w-28">
        <img src={images[0]} alt={name} className="h-full w-full object-contain" />
      </div>

      {/* اطلاعات + کنترل‌ها */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <span className="text-xs text-zinc-400">{brand}</span>
          <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100 sm:text-base">
            {name}
          </h3>
          {!inStock && (
            <span className="mt-1 inline-block text-xs font-medium text-red-500">
              ناموجود
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          {/* کنترل تعداد */}
          <div className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => onRemove(id)}
              className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
              aria-label="حذف"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            <div className="mx-1 flex items-center gap-2 border-x border-zinc-200 px-2 dark:border-zinc-700">
              <button
                onClick={() => onQuantityChange(id, quantity + 1)}
                className="p-1 text-zinc-600 hover:text-indigo-600 dark:text-zinc-300"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[1.5rem] text-center text-sm font-medium">
                {toPersianDigits(quantity)}
              </span>
              <button
                onClick={() => onQuantityChange(id, quantity - 1)}
                disabled={quantity <= 1}
                className="p-1 text-zinc-600 hover:text-indigo-600 disabled:opacity-30 dark:text-zinc-300"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* قیمت */}
          <div className="flex flex-col items-end">
            {discount > 0 && (
              <span className="text-xs text-zinc-400 line-through">
                {formatPrice(price * quantity)}
              </span>
            )}
            <div className="flex items-center gap-1">
              {discount > 0 && (
                <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-600 dark:bg-red-500/10">
                  {toPersianDigits(discount)}%
                </span>
              )}
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {formatPrice(lineTotal)}
              </span>
              <span className="text-xs text-zinc-400">تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}