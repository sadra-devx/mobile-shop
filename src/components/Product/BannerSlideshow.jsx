// src/components/Product/BannerSlideshow.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  ShieldCheck,
  CreditCard,
  Sparkles,
  BatteryCharging,
} from "lucide-react";

const icons = {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  ShieldCheck,
  CreditCard,
  Sparkles,
  BatteryCharging,
};

export function BannerSlideshow({ slides }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative mb-8 h-[280px] overflow-hidden rounded-3xl sm:h-[320px]">
      {slides.map((slide, index) => {
        const Icon = icons[slide.icon];
        const isActive = index === active;

        return (
          <Link
            key={slide.title}
            to={slide.link}
            className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-br ${slide.gradient} p-6 transition-all duration-700 ease-out sm:p-10 ${
              isActive
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0 pointer-events-none"
            }`}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            
            <img src="/image/macBook 2.png" className="pointer-events-none absolute left-10 bottom-0 h-56 w-56 text-white/10 sm:h-64 sm:w-64" alt="" />

            <div className="relative flex items-start justify-between">
              {slide.badge && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <Sparkles className="h-3 w-3" />
                  {slide.badge}
                </span>
              )}
              {slide.discount && (
                <span className="rounded-2xl bg-white px-4 py-2 text-lg font-extrabold text-zinc-900 shadow-md">
                  {slide.discount}
                  <span className="mr-0.5 text-xs font-medium">تخفیف</span>
                </span>
              )}
            </div>

            <div className="relative">
              <h3 className="text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                {slide.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-white/80 sm:text-base">{slide.subtitle}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-zinc-900">
                مشاهده محصولات
                <ArrowLeft className="h-4 w-4" />
              </div>
            </div>
          </Link>
        );
      })}

      {/* نقطه‌های ناوبری */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`اسلاید ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}