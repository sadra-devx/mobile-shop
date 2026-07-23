// src/components/product/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router";
import { Star, ShoppingCart, Sparkles, ImageOff } from "lucide-react";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

function isRecentlyAdded(createdAt) {
  if (!createdAt) return false;
  const diffDays =
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 30;
}

export function ProductCard({ product }) {
  if (!product) return null;

  const {
    id,
    name,
    brand,
    price,
    discountPercent,
    images,
    rating,
    inStock,
    createdAt,
  } = product;

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const numericPrice = Number(price);
  const numericDiscount = Number(discountPercent) || 0;
  const finalPrice = numericDiscount
    ? Math.round(numericPrice - (numericPrice * numericDiscount) / 100)
    : numericPrice;

  const thumbnail = images?.[0];
  const isNew = isRecentlyAdded(createdAt);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("افزودن به سبد:", id);
  };

  return (
    <Link
      to={`/products/${id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
    >
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
        {isNew && (
          <span className="flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold text-white">
            <Sparkles className="h-3 w-3" />
            جدید
          </span>
        )}
        {numericDiscount > 0 && (
          <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white">
            {numericDiscount}٪-
          </span>
        )}
      </div>

      {/* تصویر با افکت لود */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-700" />
        )}

        {imgError || !thumbnail ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-zinc-300 dark:text-zinc-600">
            <ImageOff className="h-8 w-8" />
            <span className="text-[11px]">بدون تصویر</span>
          </div>
        ) : (
          <img
            src={thumbnail}
            alt={name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover bg-white p-3  transition-all duration-700 ease-out  ${
              imgLoaded
                ? "scale-100 opacity-100 blur-0"
                : "scale-95 opacity-0 blur-md"
            }`}
          />
        )}

        {!inStock && (
          <div className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-sm dark:bg-zinc-900/70">
            <span className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900">
              ناموجود
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium capitalize text-zinc-400 dark:text-zinc-500">
          {brand}
        </span>
        <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {name}
        </h3>

        <div className="mt-2 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {rating}
          </span>
        </div>

        <div className="mt-3 flex-1">
          <p
            className={`text-xs text-zinc-400 line-through dark:text-zinc-500 ${
              numericDiscount > 0 ? "" : "invisible"
            }`}
          >
            {formatPrice(numericPrice)} تومان
          </p>
          <p className="text-base font-bold text-zinc-900 dark:text-white">
            {formatPrice(finalPrice)}
            <span className="mr-1 text-xs font-normal text-zinc-500">
              تومان
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500"
        >
          <ShoppingCart className="h-4 w-4" />
          افزودن به سبد
        </button>
      </div>
    </Link>
  );
}
