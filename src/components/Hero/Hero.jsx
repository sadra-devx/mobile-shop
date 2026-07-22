import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ShieldCheck, Truck, Smartphone } from "lucide-react";

const words = ["دنیای", "دیجیتال", "دستِ", "شما"];

const stats = [
  { value: "۱۲۰+", label: "برند اورجینال" },
  { value: "۵۰هزار+", label: "مشتری راضی" },
  { value: "۴.۹", label: "امتیاز فروشگاه" },
];

export function Hero() {
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e) => {
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="relative overflow-hidden bg-zinc-50">
      {/* گرادیانت پس‌زمینه - مش رنگی ایندیگو/بنفش/فیروزه‌ای که آروم شناوره */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[680px]">
        <div className="absolute -right-24 -top-24 h-[420px] w-[420px] animate-[drift1_16s_ease-in-out_infinite] rounded-full bg-indigo-300/40 blur-3xl" />
        <div className="absolute right-1/3 top-0 h-[380px] w-[380px] animate-[drift2_20s_ease-in-out_infinite] rounded-full bg-violet-300/35 blur-3xl" />
        <div className="absolute left-0 top-20 h-[340px] w-[340px] animate-[drift3_18s_ease-in-out_infinite] rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-50" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:pb-24 lg:pt-40">
        {/* متن */}
        <div>
          <span
            className={`inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 transition-all duration-700 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            ارسال رایگان بالای ۲ میلیون تومان
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.25] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            {words.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden align-bottom">
                <span
                  className="inline-block transition-all duration-700 ease-out"
                  style={{
                    transitionDelay: `${i * 90}ms`,
                    transform: loaded ? "translateY(0%)" : "translateY(110%)",
                    opacity: loaded ? 1 : 0,
                  }}
                >
                  {word}
                  {i === 3 ? (
                    <span className="text-indigo-600"> است</span>
                  ) : (
                    " "
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            className={`mt-5 max-w-md text-base leading-8 text-zinc-500 transition-all delay-300 duration-700 sm:text-lg ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            جدیدترین گوشی‌های موبایل، لپ‌تاپ و لوازم جانبی، اورجینال و با گارانتی
            معتبر. همین حالا انتخاب کن، فردا درِ خونه‌ته.
          </p>

          <div
            className={`mt-8 flex flex-wrap items-center gap-4 transition-all delay-500 duration-700 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <Link
              to="/products/mobile"
              className="group flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-300 active:scale-[0.98]"
            >
              مشاهده محصولات
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              to="/products/offers"
              className="rounded-2xl border border-zinc-200 bg-white px-6 py-3.5 text-base font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-100 active:scale-[0.98]"
            >
              پیشنهادهای ویژه
            </Link>
          </div>

          <div
            className={`mt-10 grid grid-cols-3 gap-4 border-t border-zinc-200 pt-6 transition-all delay-700 duration-700 sm:max-w-md ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-bold text-zinc-900 sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ویترین محصول - افکت سه‌بعدی با موس */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          className={`relative mx-auto flex h-[380px] w-full max-w-sm items-center justify-center transition-all delay-300 duration-700 sm:h-[440px] ${
            loaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative h-[300px] w-[150px] animate-[float_4s_ease-in-out_infinite] rounded-[2.2rem] border border-zinc-200 bg-zinc-900 shadow-2xl shadow-zinc-400/40 transition-transform duration-150 ease-out sm:h-[360px] sm:w-[180px]"
            style={{
              transform: `rotateY(${tilt.x * 22}deg) rotateX(${-tilt.y * 22}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute right-1/2 top-3 h-1.5 w-10 -translate-x-1/2 rounded-full bg-zinc-700" />
            <div className="absolute inset-2 top-8 overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-indigo-500 to-indigo-700">
              <div className="flex h-full flex-col items-center justify-center gap-2 text-white/90">
                <Smartphone className="h-10 w-10" />
                <p className="text-xs font-medium">دیجی‌موبایل</p>
              </div>
            </div>
          </div>

          {/* نشان شناور اعتماد */}
          <div className="absolute -left-2 bottom-8 flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-sm sm:-left-6">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="text-xs font-semibold text-zinc-800">گارانتی اصالت کالا</p>
              <p className="text-[11px] text-zinc-500">۱۸ ماه ضمانت</p>
            </div>
          </div>
          <div className="absolute -right-2 top-6 flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-sm sm:-right-6">
            <Truck className="h-5 w-5 text-indigo-600" />
            <p className="text-xs font-semibold text-zinc-800">ارسال سریع</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -12px; }
        }
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.08); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 25px) scale(0.95); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, -15px) scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}

export default Hero;