import { ChevronLeft, Headphones, Laptop, Menu, Moon, Search, ShoppingCart, Smartphone, Sun, User, Watch, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";


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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  /* ── تاریک/روشن ── */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  /* ── کلیک بیرون از سرچ ── */
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── فوکوس خودکار روی input وقتی سرچ باز میشه ── */
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  /* ── اسکرول ── */
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery("");
      setShowSuggestions(false);
    } else {
      setIsSearchOpen(true);
      setShowSuggestions(true);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-zinc-200 bg-white/95 shadow-sm shadow-zinc-200/60 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/95 dark:shadow-zinc-900/60"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex h-20 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">

        {/* لوگو */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Smartphone />
          </div>
          <span className="hidden text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:inline">
            دیجی‌موبایل
          </span>
        </Link>

        {/* ناوبری دسکتاپ */}
        <nav className="hidden items-start gap-1  lg:flex">
          {navLinks.map((link) => (
  <NavLink
    key={link.to}
    to={link.to}
    end={link.to === "/"}
    className="group relative rounded-lg px-3 py-2 text-base font-medium transition-colors"
  >
    {({ isActive }) => (
      <>
        <span
          className={
            isActive
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-zinc-600 group-hover:text-indigo-600 dark:text-zinc-300 dark:group-hover:text-indigo-400"
          }
        >
          {link.label}
        </span>
        <span
          className={`absolute bottom-0.5 right-3 left-3 h-[1.5px] bg-indigo-600 transition-all duration-300 dark:bg-indigo-400 ${
            isActive ? "w-[calc(100%-1.5rem)]" : "w-0 group-hover:w-[calc(100%-1.5rem)]"
          }`}
        />
      </>
    )}
  </NavLink>
))}
        </nav>

        {/* آیکون‌ها + سرچ */}
        <div className="flex  items-center justify-end gap-2 sm:gap-3">

          {/* ── سرچ دسکتاپ: دکمه‌ای که expand میشه ── */}
          <div ref={searchRef} className="relative hidden items-center md:flex">
            {/* ورودی متحرک */}
            <div
              className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
                isSearchOpen ? "w-64 opacity-100 ml-1" : "w-0 opacity-0"
              }`}
            >
              <div className="relative w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") goToSearch(searchQuery);
                    if (e.key === "Escape") {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                      setShowSuggestions(false);
                    }
                  }}
                  placeholder="جستجو در محصولات..."
                  className="h-10 w-full rounded-2xl border border-zinc-200 bg-white py-2 pr-4 pl-4 text-sm text-zinc-900 shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
                />
              </div>
            </div>

            {/* دکمه سرچ */}
            <button
              type="button"
              onClick={handleSearchToggle}
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors ${
                isSearchOpen
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                  : "text-zinc-700 hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/10"
              }`}
              aria-label="جستجو"
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>

            {/* dropdown پیشنهادها */}
            {isSearchOpen && showSuggestions && (
              <div className="absolute left-0 top-full mt-2 w-80 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
                <p className="px-3 py-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  {searchQuery.trim() ? "نتایج جستجو" : "پیشنهادهای محبوب"}
                </p>
                {filteredSuggestions.length === 0 ? (
                  <p className="px-3 py-4 text-center text-sm text-zinc-400 dark:text-zinc-500">
                    نتیجه‌ای یافت نشد
                  </p>
                ) : (
                  <ul>
                    {filteredSuggestions.map((item) => (
                      <li key={item.title}>
                        <button
                          type="button"
                          onClick={() => goToSearch(item.title)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-right text-sm text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        >
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{item.title}</p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500">{item.category}</p>
                          </div>
                          <ChevronLeft className="h-4 w-4 shrink-0 text-zinc-400" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* سرچ موبایل */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/10 md:hidden"
            aria-label="جستجو"
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          {/* دکمه dark/light mode */}
          <button
            type="button"
            onClick={toggleDark}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/10"
            aria-label={isDark ? "حالت روشن" : "حالت تاریک"}
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* سبد خرید */}
          <Link
            to="/cart"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/10"
            aria-label="سبد خرید"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -left-0.5 grid h-5 w-5 place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">
              ۲
            </span>
          </Link>

          {/* پروفایل */}
          <Link
            to="/account"
            className="hidden h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/10 sm:grid"
            aria-label="حساب کاربری"
          >
            <User className="h-5 w-5" />
          </Link>

          {/* منو موبایل */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/10 lg:hidden"
            aria-label="منوی موبایل"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── سرچ موبایل باز ── */}
      {isSearchOpen && (
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900 md:hidden">
          <div className="relative bg-none">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goToSearch(searchQuery)}
              placeholder="جستجو در میان محصولات..."
              autoFocus
              className="h-11 w-full rounded-xl border border-zinc-200  py-2 pr-10 pl-4 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>
          {searchQuery.trim() && (
            <ul className="mt-2 space-y-1">
              {filteredSuggestions.map((item) => (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => goToSearch(item.title)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-right text-sm text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
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

      {/* ── منوی موبایل ── */}
      {isMenuOpen && (
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900 lg:hidden">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-indigo-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-indigo-400"
              >
                {link.label}
                <ChevronLeft className="h-4 w-4 text-zinc-400" />
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-3 border-t border-zinc-200 pt-3 dark:border-zinc-700">
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
