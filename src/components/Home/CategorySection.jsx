import { categories } from "../../data/categories";
import { CategoryCard } from "./CategoryCard";

export function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="mb-10 text-center">
        <span className="mb-2 inline-block text-sm font-semibold text-indigo-600">
          دسته‌بندی‌ها
        </span>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
          محصولات را{" "}
          <span className="bg-gradient-to-l from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            دسته‌بندی‌شده
          </span>{" "}
          ببینید
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}