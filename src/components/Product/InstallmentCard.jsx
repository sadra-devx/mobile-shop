import { Wallet, ChevronLeft } from "lucide-react";
import { formatPrice, toPersianDigits } from "../../utils/formatNumber";

export default function InstallmentCard() {

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <button className="mb-4 flex w-full items-center justify-between text-right">
        <span className="flex items-center gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-100">
          <Wallet className="h-4 w-4 text-blue-600" />
          خرید این کالا با تسهیلات دیجی‌پی
        </span>
        <ChevronLeft className="h-4 w-4 text-zinc-400" />
      </button>

      <div className="flex flex-col gap-2 text-xs text-zinc-600 dark:text-zinc-300">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
          <span>
            فقط با ماهی {formatPrice(5000000)} تومان ({toPersianDigits(12)} ماه)
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
          <span>اعتبار پیشنهادی برای خرید: {formatPrice(70000000)} تومان</span>
        </div>
      </div>
    </div>
  );
}