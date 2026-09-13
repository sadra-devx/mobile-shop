// src/components/layout/Footer.jsx
import { Link } from "react-router";
import { Phone, Mail, MapPin, ShieldCheck, Smartphone } from "lucide-react";
import { FaInstagram, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { toPersianDigits } from "../../utils/formatNumber";

const linkGroups = [
  {
    title: "دسته‌بندی محصولات",
    links: [
      { label: "موبایل", to: "/products/mobile" },
      { label: "تبلت و لپ‌تاپ", to: "/products/laptop" },
      { label: "لوازم جانبی", to: "/products/accessories" },
      { label: "پیشنهادهای ویژه", to: "/products/offers" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { label: "پیگیری سفارش", to: "/orders" },
      { label: "شرایط بازگشت کالا", to: "/returns" },
      { label: "سوالات متداول", to: "/faq" },
      { label: "تماس با ما", to: "/contact" },
    ],
  },
  {
    title: "درباره‌ی ما",
    links: [
      { label: "معرفی دیجی‌موبایل", to: "/about" },
      { label: "فرصت‌های شغلی", to: "/careers" },
      { label: "قوانین و مقررات", to: "/terms" },
      { label: "حریم خصوصی", to: "/privacy" },
    ],
  },
];

const socials = [
  { icon: FaInstagram, href: "https://instagram.com", label: "اینستاگرام" },
  { icon: FaTelegram, href: "https://t.me", label: "تلگرام" },
  { icon: FaXTwitter, href: "https://twitter.com", label: "توییتر" },
];

export function Footer() {
  const year = toPersianDigits(new Date().getFullYear() - 621);

  return (
    <footer className="mt-10 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-14 lg:px-10">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm sm:h-9 sm:w-9">
                <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
                دیجی‌موبایل
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-4 sm:text-sm sm:leading-7">
              فروشگاه اینترنتی دیجی‌موبایل، عرضه‌کننده‌ی رسمی جدیدترین گوشی‌های
              موبایل، لپ‌تاپ و لوازم جانبی با گارانتی اصالت کالا.
            </p>

            <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 sm:text-sm">
                <Phone className="h-3.5 w-3.5 shrink-0 text-indigo-600 dark:text-indigo-400 sm:h-4 sm:w-4" />
                <span dir="ltr">{toPersianDigits("021-91234567")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 sm:text-sm">
                <Mail className="h-3.5 w-3.5 shrink-0 text-indigo-600 dark:text-indigo-400 sm:h-4 sm:w-4" />
                <span dir="ltr">support@digimobile.ir</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 sm:text-sm">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-indigo-600 dark:text-indigo-400 sm:h-4 sm:w-4" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۰</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 sm:mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a 
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-indigo-900/30 sm:h-9 sm:w-9"
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 sm:text-base">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-xs text-zinc-500 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800 sm:mt-12 sm:flex-row sm:gap-6 sm:pt-8">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 sm:h-4 sm:w-4" />
            دارای نماد اعتماد الکترونیکی
          </div>

          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 sm:text-xs">
            © {year} دیجی‌موبایل. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}