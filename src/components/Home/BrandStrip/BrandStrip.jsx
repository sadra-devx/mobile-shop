// src/components/Home/BrandStrip.jsx
import { useInView } from "../../../hooks/useInView";

const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "OnePlus",
  "Google",
  "Huawei",
  "Nokia",
  "Sony",
];

export function BrandStrip() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="mx-auto max-w-7xl px-4 py-10 transition-all duration-700 ease-out sm:px-6 lg:px-10"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <p className="mb-6 text-center font-medium text-zinc-400 dark:text-zinc-500">
        نمایندگی رسمی برترین برندهای دنیا
      </p>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-900 sm:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-zinc-50 to-transparent dark:from-zinc-900 sm:w-24" />

        <div className="brand-marquee flex w-max items-center gap-12 sm:gap-16">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="shrink-0 text-xl font-bold tracking-tight text-zinc-300 transition-colors duration-300 hover:text-indigo-500 dark:text-zinc-600 dark:hover:text-indigo-400 sm:text-2xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .brand-marquee {
          animation: brand-scroll 25s linear infinite;
        }
        .brand-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes brand-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}