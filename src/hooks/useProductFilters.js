import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

export function useProductFilters(products, category) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";

  const [selectedBrands, setSelectedBrands] = useState([]);

  const categoryProducts = useMemo(() => {
    if (!category) return products;
    if (category === "offers") return products.filter((p) => Number(p.discountPercent) > 0);
    return products.filter((p) => p.category === category);
  }, [products, category]);

  const priceRange = useMemo(() => {
    const prices = categoryProducts.map((p) => Number(p.price));
    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    };
  }, [categoryProducts]);

  const brands = useMemo(
    () => [...new Set(categoryProducts.map((p) => p.brand))].sort(),
    [categoryProducts]
  );

  const [maxPrice, setMaxPrice] = useState(null);

  const filtered = useMemo(() => {
    let result = categoryProducts;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    const effectiveMax = maxPrice ?? priceRange.max;
    result = result.filter((p) => Number(p.price) <= effectiveMax);

    return [...result].sort((a, b) => {
      if (sort === "cheapest") return Number(a.price) - Number(b.price);
      if (sort === "priciest") return Number(b.price) - Number(a.price);
      if (sort === "rating") return Number(b.rating) - Number(a.rating);
      if (sort === "popular") return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [categoryProducts, search, selectedBrands, maxPrice, priceRange.max, sort]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const setSort = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", value);
      return next;
    });
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setMaxPrice(null);
  };

  return {
    filtered,
    brands,
    selectedBrands,
    toggleBrand,
    priceRange,
    maxPrice: maxPrice ?? priceRange.max,
    setMaxPrice,
    sort,
    setSort,
    resetFilters,
  };
}