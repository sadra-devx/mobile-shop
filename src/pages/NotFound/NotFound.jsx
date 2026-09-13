import { Link } from "react-router";
import { SearchX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mt-20 flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="grid h-24 w-24 place-items-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        <SearchX className="h-10 w-10" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          404
        </h1>
        <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">
          صفحه‌ای که دنبالش بودی پیدا نشد
        </h2>
        <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          ممکنه آدرس اشتباه باشه یا این صفحه هنوز ساخته نشده باشه. نگران نباش، برگرد به خونه!
        </p>
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        <Home className="h-4 w-4" />
        بازگشت به صفحه‌ی اصلی
      </Link>
    </div>
  );
}