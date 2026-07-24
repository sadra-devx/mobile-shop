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
    <footer className="mt-10 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto w-full px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
                <Smartphone className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-zinc-900 dark:text-white">
                دیجی‌موبایل
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-500 dark:text-zinc-400">
              فروشگاه اینترنتی دیجی‌موبایل، عرضه‌کننده‌ی رسمی جدیدترین گوشی‌های
              موبایل، لپ‌تاپ و لوازم جانبی با گارانتی اصالت کالا.
            </p>

            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <Phone className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span dir="ltr">{toPersianDigits("021-91234567")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span dir="ltr">support@digimobile.ir</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۰</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-indigo-900/30"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-bold text-zinc-800 dark:text-zinc-100">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-zinc-500 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            دارای نماد اعتماد الکترونیکی
          </div>

          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {year} دیجی‌موبایل. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}