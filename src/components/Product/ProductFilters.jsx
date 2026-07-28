// src/components/Product/ProductFilters.jsx
import { toPersianDigits, formatPrice } from "../../utils/formatNumber";

export function ProductFilters({
  brands,
  selectedBrands,
  onBrandToggle,
  priceRange,
  minPrice,
  maxPrice,
  onPriceChange,
  onReset,
}) {
  return (
    <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">فیلترها</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          حذف فیلترها
        </button>
      </div>

      {/* برند */}
      {brands.length > 0 && (
        <div className="border-t border-zinc-100 py-4 dark:border-zinc-700">
          <p className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200">برند</p>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
              > 
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onBrandToggle(brand)}
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-600"
                />
                <span className="capitalize">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* محدوده‌ی قیمت */}
      <div className="border-t border-zinc-100 py-4 dark:border-zinc-700">
        <p className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200">محدوده قیمت</p>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
        <div className="mt-2 flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>{formatPrice(priceRange.min)} تومان</span>
          <span>{formatPrice(maxPrice)} تومان</span>
        </div>
      </div>
    </aside>
  );
}