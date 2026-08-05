// src/components/Product/BannerGrid.jsx
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

function LargeBanner({ banner }) {
  const Icon = icons[banner.icon];
  return (
    <Link
      to={banner.link}
      className={`group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${banner.gradient} p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8`}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      {Icon && (
        <Icon className="pointer-events-none absolute -left-6 -bottom-6 h-48 w-48 text-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 sm:h-56 sm:w-56" />
      )}

      <div className="relative flex items-start justify-between">
        {banner.badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Sparkles className="h-3 w-3" />
            {banner.badge}
          </span>
        )}
        {banner.discount && (
          <span className="rounded-2xl bg-white px-4 py-2 text-lg font-extrabold text-zinc-900 shadow-md">
            {banner.discount}
            <span className="mr-0.5 text-xs font-medium">تخفیف</span>
          </span>
        )}
      </div>

      <div className="relative">
        <h3 className="text-2xl font-extrabold leading-snug text-white sm:text-3xl">
          {banner.title}
        </h3>
        <p className="mt-2 max-w-xs text-sm text-white/80 sm:text-base">{banner.subtitle}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-zinc-900 transition-transform group-hover:-translate-x-1">
          مشاهده محصولات
          <ArrowLeft className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function SmallBanner({ banner }) {
  const Icon = icons[banner.icon];
  return (
    <Link
      to={banner.link}
      className={`group relative flex min-h-[104px] items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br ${banner.gradient} p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className="pointer-events-none absolute -left-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
      {Icon && (
        <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
        </div>
      )}
      <div className="relative min-w-0">
        <h4 className="truncate text-sm font-bold text-white">{banner.title}</h4>
        <p className="mt-0.5 truncate text-xs text-white/75">{banner.subtitle}</p>
      </div>
      <ArrowLeft className="relative mr-auto h-4 w-4 shrink-0 text-white/60 transition-all group-hover:-translate-x-1 group-hover:text-white" />
    </Link>
  );
}

export function BannerGrid({ large, small }) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="sm:col-span-2">
        <LargeBanner banner={large} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-rows-2">
        {small.map((banner) => (
          <SmallBanner key={banner.title} banner={banner} />
        ))}
      </div>
    </div>
  );
}