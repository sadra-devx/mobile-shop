import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  ChevronLeft,
} from "lucide-react";

const navLinks = [
  { label: "خانه", to: "/" },
  { label: "موبایل", to: "/products/mobile" },
  { label: "تبلت و لپ‌تاپ", to: "/products/laptop" },
  { label: "لوازم جانبی", to: "/products/accessories" },
  { label: "پیشنهادها", to: "/products/offers" },
];

const suggestions = [
  { title: "آیفون ۱۵ پرو مکس", category: "موبایل", icon: Smartphone },
  { title: "سامسونگ گلکسی S24", category: "موبایل", icon: Smartphone },
  { title: "مک‌بوک ایر M3", category: "لپ‌تاپ", icon: Laptop },
  { title: "ایرپادز پرو ۲", category: "هدفون", icon: Headphones },
  { title: "اپل واچ سری ۹", category: "ساعت هوشمند", icon: Watch },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? suggestions.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suggestions;

  const goToSearch = (term) => {
    if (!term.trim()) return;
    navigate(`/products?search=${encodeURIComponent(term)}`);
    setSearchQuery("");
    setShowSuggestions(false);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-zinc-50/95 backdrop-blur-md">
      <div className="flex h-20 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* لوگو */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Smartphone className="h-5 w-5" />
          </div>
          <span className="hidden text-2xl font-bold tracking-tight text-zinc-900 sm:inline">
            دیجی‌موبایل
          </span>
        </Link>

        {/* ناوبری دسکتاپ - با انیمیشن هاور: رنگ متن + خط زیر */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group relative rounded-lg px-3 py-2 text-base font-medium text-zinc-600 transition-colors hover:text-indigo-600"
            >
              {link.label}
              <span className="absolute bottom-0.5 right-3 left-3 h-[1.5px] w-0 bg-indigo-600 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
            </Link>
          ))}
        </nav>

        {/* جستجو + آیکون‌ها */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          {/* جستجوی دسکتاپ */}
          <div ref={searchRef} className="relative hidden w-full max-w-md md:block">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => e.key === "Enter" && goToSearch(searchQuery)}
                placeholder="جستجو در میان محصولات..."
                className="h-11 w-full rounded-full border border-zinc-200 bg-zinc-50 py-2 pr-10 pl-4 text-base text-zinc-900 shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {showSuggestions && (
              <div className="absolute right-0 top-full mt-2 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
                <p className="px-3 py-1.5 text-xs font-medium text-zinc-400">
                  {searchQuery.trim() ? "نتایج جستجو" : "پیشنهادهای محبوب"}
                </p>
                <ul>
                  {filteredSuggestions.map((item) => (
                    <li key={item.title}>
                      <button
                        type="button"
                        onClick={() => goToSearch(item.title)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-right text-sm text-zinc-800 transition-colors hover:bg-zinc-100"
                      >
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-500">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{item.title}</p>
                          <p className="text-xs text-zinc-400">{item.category}</p>
                        </div>
                        <ChevronLeft className="h-4 w-4 shrink-0 text-zinc-400" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* دکمه جستجو - موبایل */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden"
            aria-label="جستجو"
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          {/* سبد خرید */}
          <Link
            to="/cart"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100"
            aria-label="سبد خرید"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -left-0.5 grid h-5 w-5 place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-zinc-50">
              ۲
            </span>
          </Link>

          {/* کاربر - فقط دسکتاپ */}
          <button
            type="button"
            className="hidden h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 sm:grid"
            aria-label="حساب کاربری"
          >
            <User className="h-5 w-5" />
          </button>

          {/* دکمه منو - موبایل */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 lg:hidden"
            aria-label="منوی موبایل"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* سرچ‌بار موبایل */}
      {isSearchOpen && (
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goToSearch(searchQuery)}
              placeholder="جستجو در میان محصولات..."
              autoFocus
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white py-2 pr-10 pl-4 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          {searchQuery.trim() && (
            <ul className="mt-2 space-y-1">
              {filteredSuggestions.map((item) => (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => goToSearch(item.title)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-right text-sm text-zinc-800 transition-colors hover:bg-zinc-100"
                  >
                    <item.icon className="h-4 w-4 text-zinc-400" />
                    <span>{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* منوی موبایل */}
      {isMenuOpen && (
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 lg:hidden">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-indigo-600"
              >
                {link.label}
                <ChevronLeft className="h-4 w-4 text-zinc-400" />
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-3 border-t border-zinc-200 pt-3">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              <User className="h-4 w-4" />
              ورود / ثبت‌نام
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;