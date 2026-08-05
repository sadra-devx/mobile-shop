// src/data/categoryBanners.js
export const categoryBanners = {
  mobile: {
    layout: "grid",
    large: {
      icon: "Smartphone",
      badge: "پیشنهاد ویژه",
      discount: "۱۵٪",
      title: "جدیدترین گلکسی S24 رسید",
      subtitle: "پیش‌خرید با تخفیف استثنایی، همین امروز",
      gradient: "from-indigo-600 via-indigo-700 to-violet-800",
      link: "/products/mobile",
    },
    small: [
      {
        icon: "ShieldCheck",
        title: "آیفون‌های اورجینال",
        subtitle: "گارانتی ۱۸ ماهه",
        gradient: "from-zinc-800 to-zinc-950",
        link: "/products/mobile",
      },
      {
        icon: "CreditCard",
        title: "اقساط بدون بهره",
        subtitle: "تا ۱۲ ماهه",
        gradient: "from-emerald-600 to-teal-700",
        link: "/products/mobile",
      },
    ],
  },

  laptop: {
    layout: "slideshow",
    slides: [
      {
        icon: "Laptop",
        badge: "پیشنهاد ویژه",
        discount: "۲۰٪",
        title: "لپ‌تاپ‌های گیمینگ ویژه",
        subtitle: "تا ۲۰٪ تخفیف روی مدل‌های منتخب",
        gradient: "from-rose-600 via-red-600 to-orange-600",
        link: "/products/laptop",
      },
      {
        icon: "Sparkles",
        badge: "موجودی محدود",
        title: "مک‌بوک‌های اپل",
        subtitle: "با تراشه M3، عملکردی خیره‌کننده",
        gradient: "from-zinc-800 via-zinc-900 to-black",
        link: "/products/laptop",
      },
      {
        icon: "Tablet",
        badge: "پیشنهاد ویژه",
        discount: "۱۰٪",
        title: "تبلت‌های حرفه‌ای",
        subtitle: "مناسب طراحان و ادیتورها",
        gradient: "from-sky-600 via-cyan-600 to-teal-700",
        link: "/products/laptop",
      },
    ],
  },

  accessories: {
    layout: "stacked",
    banners: [
      {
        icon: "Headphones",
        badge: "پیشنهاد ویژه",
        discount: "۳۰٪",
        title: "هدفون‌های بی‌سیم پرفروش",
        subtitle: "کیفیت صدای استودیویی",
        gradient: "from-fuchsia-600 via-purple-600 to-violet-800",
        link: "/products/accessories",
      },
      {
        icon: "BatteryCharging",
        badge: "جدید",
        title: "پاوربانک و شارژر سریع",
        subtitle: "همیشه شارژ داشته باش",
        gradient: "from-amber-600 to-orange-700",
        link: "/products/accessories",
      },
      {
        icon: "Watch",
        badge: "پرفروش",
        title: "ساعت‌های هوشمند",
        subtitle: "سلامتی در دستان شما",
        gradient: "from-teal-600 to-emerald-700",
        link: "/products/accessories",
      },
    ],
  },
};