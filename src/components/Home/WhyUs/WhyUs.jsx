// src/components/home/WhyUs.jsx
import { ShieldCheck, Truck, Headset, RotateCcw } from "lucide-react";
import { useInView } from "../../../hooks/useInView";

const features = [
  {
    icon: ShieldCheck,
    title: "گارانتی اصالت کالا",
    desc: "همه‌ی محصولات با ۱۸ ماه ضمانت اصالت و سلامت فیزیکی",
  },
  {
    icon: Truck,
    title: "ارسال سریع و مطمئن",
    desc: "تحویل به سراسر کشور، حداکثر تا ۲۴ ساعت در تهران",
  },
  {
    icon: RotateCcw,
    title: "۷ روز ضمانت بازگشت",
    desc: "در صورت عدم رضایت، بدون هیچ پرسشی وجهتون رو برمی‌گردونیم",
  },
  {
    icon: Headset,
    title: "پشتیبانی ۲۴ ساعته",
    desc: "همیشه در دسترس، حتی روزهای تعطیل و آخر هفته",
  },
];

export function WhyUs() {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div
        className="mb-10 text-center transition-all duration-700 ease-out"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <span className="mb-2 inline-block text-sm font-semibold text-indigo-600">
          تعهد ما به شما
        </span>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
          چرا{" "}
          <span className="bg-gradient-to-l from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            دیجی‌موبایل
          </span>
          ؟
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }, index) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-indigo-800"
            style={{
              transitionDelay: isInView ? `${index * 100}ms` : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDuration: "700ms",
              transitionProperty: "opacity, transform",
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
            }}
          >
            {/* دایره‌ی نوری تزئینی پشت آیکون */}
            <div className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-indigo-50 blur-xl transition-transform duration-500 group-hover:scale-150 dark:bg-indigo-900/30" />

            <div className="relative mb-4 grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 dark:bg-indigo-900/40 dark:text-indigo-400">
              <Icon className="h-6 w-6" strokeWidth={1.8} />
            </div>

            <h3 className="relative text-base font-bold text-zinc-800 dark:text-zinc-100">
              {title}
            </h3>
            <p className="relative mt-1.5 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}