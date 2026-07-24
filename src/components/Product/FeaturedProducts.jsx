// src/components/home/FeaturedProducts.jsx
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useInView } from "../../hooks/useInView";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function FeaturedProducts() {
  const { products, loading, error } = useProducts();
  const trackRef = useRef(null);
  const isHovering = useRef(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });

  const featured = products.filter((p) => p.isPublished).slice(0, 10);

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

  // حرکت خودکار هر ۳ ثانیه
  useEffect(() => {
    if (loading || featured.length === 0) return;
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
  }, [loading, featured.length]);

  return (
    <section ref={sectionRef} className="mx-auto max-w-7xl py-16">
      {/* عنوان */}
      <div
        className="mb-8 flex items-end justify-between px-4 transition-all duration-700 ease-out sm:px-6 lg:px-10"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <div>
          <span className="mb-2 inline-block text-sm font-semibold text-indigo-600">
            پیشنهاد فروشگاه
          </span>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            محصولات
            <span className="bg-gradient-to-l from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {" "}پرفروش
            </span>
          </h2>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300"
            aria-label="قبلی"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300"
            aria-label="بعدی"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>

      {error && (
        <p className="mx-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 sm:mx-6 lg:mx-10">
          مشکلی در دریافت محصولات پیش اومد.
        </p>
      )}

      {/* ردیف کارت‌ها */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-900 sm:w-20" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-zinc-50 to-transparent dark:from-zinc-900 sm:w-20" />

        <div
          ref={trackRef}
          dir="ltr"
          onScroll={checkBounds}
          onMouseEnter={() => (isHovering.current = true)}
          onMouseLeave={() => (isHovering.current = false)}
          className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scroll-snap-type:x_mandatory] sm:px-6 lg:px-10"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[220px] shrink-0 sm:w-[260px]">
                  <ProductCardSkeleton />
                </div>
              ))
            : featured.map((product, index) => (
                <div
                  key={product.id}
                  data-card
                  dir="rtl"
                  className="w-[220px] shrink-0 [scroll-snap-align:start] transition-all duration-700 ease-out sm:w-[260px]"
                  style={{
                    transitionDelay: isInView ? `${Math.min(index, 6) * 80}ms` : "0ms",
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center px-4">
        <Link
          to="/products"
          className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
        >
          مشاهده همه محصولات
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}