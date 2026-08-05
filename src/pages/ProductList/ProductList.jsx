// src/pages/ProductList/ProductList.jsx
import { useLoaderData, useParams } from "react-router";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "../../components/Product/ProductCard";
import { ProductFilters } from "../../components/Product/ProductFilters";
import { ProductSlider } from "../../components/Product/ProductSlider";
import { CategoryBanners } from "../../components/Product/CategoryBanners";
import { useProductFilters } from "../../hooks/useProductFilters";
import { useInfiniteList } from "../../hooks/useInfiniteList";
import { useInView } from "../../hooks/useInView";
import { toPersianDigits } from "../../utils/formatNumber";

const PAGE_SIZE = 12;

const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "priciest", label: "گران‌ترین" },
  { value: "popular", label: "پربازدیدترین" },
  { value: "rating", label: "بهترین امتیاز" },
];

function categoryTitle(category) {
  const titles = {
    mobile: "موبایل",
    laptop: "تبلت و لپ‌تاپ",
    accessories: "لوازم جانبی",
    offers: "پیشنهادهای ویژه",
  };
  return titles[category] || "همه محصولات";
}

export default function ProductList() {
  const allProducts = useLoaderData();
  const { category } = useParams();

  const {
    filtered,
    brands,
    selectedBrands,
    toggleBrand,
    priceRange,
    maxPrice,
    setMaxPrice,
    sort,
    setSort,
    resetFilters,
  } = useProductFilters(allProducts, category);

  const { visibleItems, hasMore, loadMoreRef } = useInfiniteList(filtered, PAGE_SIZE);

  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.1 });
  const { ref: bodyRef, isInView: bodyInView } = useInView({ threshold: 0.05 });

  return (
    <div className="mx-auto w-full mt-17 px-4 py-10 sm:px-6 lg:px-10">
     
      <div
        ref={headerRef}
        className="mb-6 transition-all duration-700 ease-out"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(16px)",
        }}
      >
      <CategoryBanners category={category} />
        </div>

      {category && <ProductSlider title={`پیشنهاد ویژه ${categoryTitle(category)}`} products={filtered.slice(0, 10)} />}

      <div
        ref={bodyRef}
        className="transition-all delay-100 duration-700 ease-out"
        style={{
          opacity: bodyInView ? 1 : 0,
          transform: bodyInView ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <SlidersHorizontal className="h-4 w-4" />
            مرتب‌سازی
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  sort === opt.value
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <ProductFilters
            brands={brands}
            selectedBrands={selectedBrands}
            onBrandToggle={toggleBrand}
            priceRange={priceRange}
            maxPrice={maxPrice}
            onPriceChange={setMaxPrice}
            onReset={resetFilters}
          />

          <div>
            {visibleItems.length === 0 ? (
              <div className="grid h-64 place-items-center rounded-2xl border border-dashed border-zinc-300 text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">
                محصولی با این فیلترها پیدا نشد
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {visibleItems.map((product, index) => (
                  <div
                    key={product.id}
                    className="card-enter"
                    style={{ animationDelay: `${(index % PAGE_SIZE) * 40}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {hasMore && <div ref={loadMoreRef} className="h-10 w-full" />}
          </div>
        </div>
      </div>
    </div>
  );
}