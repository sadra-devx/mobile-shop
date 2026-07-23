// src/components/product/ProductCardSkeleton.jsx
export function ProductCardSkeleton() {
  return (
    <div className="w-[220px] shrink-0 animate-pulse overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 sm:w-[260px]">
      <div className="aspect-square bg-zinc-100 dark:bg-zinc-700" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-700" />
        <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-700" />
        <div className="h-4 w-2/3 rounded bg-zinc-100 dark:bg-zinc-700" />
      </div>
    </div>
  );
}