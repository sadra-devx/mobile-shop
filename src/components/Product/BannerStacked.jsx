// src/components/Product/BannerStacked.jsx
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

export function BannerStacked({ banners }) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {banners.map((banner) => {
        const Icon = icons[banner.icon];
        return (
          <Link
            key={banner.title}
            to={banner.link}
            className={`group relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${banner.gradient} p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
            {Icon && (
              <Icon className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 text-white/10 transition-transform duration-500 group-hover:scale-110" />
            )}

            <div className="relative flex items-center justify-between">
              {Icon && (
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                </div>
              )}
              {banner.badge && (
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                  {banner.badge}
                </span>
              )}
            </div>

            <div className="relative">
              <h4 className="text-base font-bold text-white">{banner.title}</h4>
              <p className="mt-1 text-xs text-white/75">{banner.subtitle}</p>
              <div className="mt-2 flex items-center gap-1 text-xs font-medium text-white/90">
                مشاهده
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}