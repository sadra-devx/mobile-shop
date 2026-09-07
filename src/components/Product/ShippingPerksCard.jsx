import { Truck, ChevronLeft } from "lucide-react";

export default function ShippingPerksCard({ perks, onSubscribeClick }) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/5">
      <div className="mb-4 flex items-center gap-2">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-600 text-white">
          <Truck className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-400">
          ارسال رایگان این کالا برای اعضای پلاس
        </h3>
      </div>

      <ul className="mb-4 flex flex-col gap-2">
        {perks.map((perk, i) => (
          <li
            key={i}
            className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300"
          >
            <span>{perk}</span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
          </li>
        ))}
      </ul>

      <button
        onClick={onSubscribeClick}
        className="flex items-center gap-1 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400"
      >
        <ChevronLeft className="h-4 w-4" />
        خرید اشتراک
      </button>
    </div>
  );
}