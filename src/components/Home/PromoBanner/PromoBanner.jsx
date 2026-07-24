// src/components/Home/PromoBanner.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Zap } from "lucide-react";
import { useInView } from "../../../hooks/useInView";
import { toPersianDigits } from "../../../utils/formatNumber";

const PROMO_END = new Date("2026-08-01T00:00:00");

function useCountdown(endDate) {
  const [timeLeft, setTimeLeft] = useState(() => calc());

  function calc() {
    const diff = endDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid h-14 w-14 place-items-center rounded-xl bg-white/15 text-xl font-bold text-white backdrop-blur-sm sm:h-16 sm:w-16 sm:text-2xl">
        {toPersianDigits(String(value).padStart(2, "0"))}
      </div>
      <span className="mt-1.5 text-[11px] text-white/70">{label}</span>
    </div>
  );
}

export function PromoBanner() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { days, hours, minutes, seconds } = useCountdown(PROMO_END);

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 px-6 py-10 transition-all duration-700 ease-out sm:px-10 sm:py-14"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView
            ? "translateY(0) scale(1)"
            : "translateY(30px) scale(0.98)",
        }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />

        <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-right">
          <div className="max-w-md">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5" />
              پیشنهاد محدود
            </span>
            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              تا {toPersianDigits(30)}٪ تخفیف روی گوشی‌های منتخب
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">
              فقط تا پایان این هفته، جدیدترین فلگشیپ‌های بازار با شگفت‌انگیزترین
              قیمت‌ها. فرصت رو از دست نده.
            </p>

            <Link
              to="/products/offers"
              className="group mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-lg shadow-black/10 transition-all hover:bg-zinc-50 active:scale-[0.98]"
            >
              مشاهده پیشنهادها
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <TimeBox value={seconds} label="ثانیه" />
            <span className="pb-5 text-xl font-bold text-white/40">:</span>
            <TimeBox value={minutes} label="دقیقه" />
            <span className="pb-5 text-xl font-bold text-white/40">:</span>
            <TimeBox value={hours} label="ساعت" />
            <span className="pb-5 text-xl font-bold text-white/40">:</span>
            <TimeBox value={days} label="روز" />
          </div>
        </div>
      </div>
    </section>
  );
}
