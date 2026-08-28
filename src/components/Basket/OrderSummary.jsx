import { formatPrice, toPersianDigits } from "../../utils/formatNumber";

export default function OrderSummary({ products }) {
  const itemsCount = products.reduce((sum, p) => sum + p.quantity, 0);

  const originalTotal = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const finalTotal = products.reduce((sum, p) => {
    const discount = Number(p.discountPercent) || 0;
    const finalPrice = p.price - (p.price * discount) / 100;
    return sum + finalPrice * p.quantity;
  }, 0);

  const totalSaved = originalTotal - finalTotal;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-4 font-bold text-zinc-800 dark:text-zinc-100">
        جزئیات پرداخت
      </h2>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            قیمت کالاها ({toPersianDigits(itemsCount)} کالا)
          </span>
          <span className="text-zinc-700 dark:text-zinc-300">
            {formatPrice(originalTotal)} تومان
          </span>
        </div>

        {totalSaved > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-500/10">
            <span className="text-emerald-700 dark:text-emerald-400">
              سود شما از خرید
            </span>
            <span className="font-medium text-emerald-700 dark:text-emerald-400">
              {formatPrice(totalSaved)} تومان
            </span>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <span className="font-medium text-zinc-800 dark:text-zinc-100">
            مجموع سبد خرید
          </span>
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {formatPrice(finalTotal)} تومان
          </span>
        </div>
      </div>

      <button className="mt-5 w-full rounded-xl bg-rose-600 py-3.5 font-medium text-white transition-colors hover:bg-rose-700 active:scale-[0.98]">
        ثبت سفارش
      </button>
    </div>
  );
}