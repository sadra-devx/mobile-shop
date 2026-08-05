// src/components/Product/ProductSlider.jsx
import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductSlider({ title, subtitle, products, loading = false }) {
  const trackRef = useRef(null);
  const isHovering = useRef(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const checkBounds = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  };

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-card]")?.offsetWidth + 16 || 280;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  useEffect(() => {
    if (loading || products.length === 0) return;
    const interval = setInterval(() => {
      if (isHovering.current) return;
      const el = trackRef.current;
      if (!el) return;
      const atLastCard = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
      if (atLastCard) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [loading, products.length]);

  if (!loading && products.length === 0) return null;

  return (
    <section className="py-6">
      <div className="mb-5 flex items-end justify-between">
        <div>
          {subtitle && (
            <span className="mb-1.5 inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {subtitle}
            </span>
          )}
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">{title}</h2>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300"
            aria-label="قبلی"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300"
            aria-label="بعدی"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-900 sm:w-16" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-zinc-50 to-transparent dark:from-zinc-900 sm:w-16" />

        <div
          ref={trackRef}
          dir="ltr"
          onScroll={checkBounds}
          onMouseEnter={() => (isHovering.current = true)}
          onMouseLeave={() => (isHovering.current = false)}
          className="scrollbar-hide flex gap-4 justify-start overflow-x-auto scroll-smooth pb-2 [scroll-snap-type:x_mandatory]"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[220px] shrink-0 sm:w-[260px]">
                  <ProductCardSkeleton />
                </div>
              ))
            : products.map((product, index) => (
                <div
                  key={product.id}
                  data-card
                  dir="rtl"
                  className="card-enter w-[220px] shrink-0 [scroll-snap-align:start] sm:w-[260px]"
                  style={{ animationDelay: `${(index % 10) * 40}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}