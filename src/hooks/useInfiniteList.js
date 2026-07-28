// src/hooks/useInfiniteList.js
import { useEffect, useState } from "react";

export function useInfiniteList(items, pageSize = 12) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  // هر بار که آرایه‌ی ورودی عوض بشه (فیلتر جدید اعمال شده)، شمارش رو ریست کن
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const loadMoreRef = (node) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + pageSize);
        }
      },
      { threshold: 0 }
    );
    observer.observe(node);
  };

  return { visibleItems, hasMore, loadMoreRef };
}