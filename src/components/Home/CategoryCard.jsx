// src/components/CategoryCard.jsx
import { Link } from "react-router";
import { Smartphone, Laptop, Tablet, Headphones, Watch, Tag, ArrowLeft } from "lucide-react";
import { useInView } from "../../hooks/useInView";

const icons = { Smartphone, Laptop, Tablet, Headphones, Watch, Tag };

export function CategoryCard({ category, index }) {
  const { ref, isInView } = useInView();
  const Icon = icons[category.icon];

  const fromLeft = index % 2 === 0;

  return (
    <Link
      ref={ref}
      to={category.link}
      style={{
        transitionDelay: isInView ? `${index * 100}ms` : "0ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        filter: isInView ? "blur(0px)" : "blur(6px)",
        transform: isInView
          ? "translateX(0) scale(1)"
          : `translateX(${fromLeft ? "-48px" : "48px"}) scale(0.9)`,
        opacity: isInView ? 1 : 0,
      }}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 shadow-lg shadow-zinc-900/5 transition-all duration-[900ms] hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* پس‌زمینه گرادیانت */}
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${category.gradient}`} />

      {/* افکت نوری تزئینی */}
      <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
      <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-black/10 blur-2xl" />

      <div className="relative flex h-48 flex-col items-center justify-center text-white">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          {Icon && <Icon size={30} strokeWidth={1.8} />}
        </div>

        <p className="text-lg font-bold sm:text-xl">{category.title}</p>
        <span className="mt-1 text-sm text-white/80">{category.count} محصول</span>

        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-white/0 transition-all duration-300 group-hover:text-white/90">
          مشاهده محصولات
          <ArrowLeft className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}