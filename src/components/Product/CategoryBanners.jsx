// src/components/Product/CategoryBanners.jsx
import { categoryBanners } from "../../data/categoryBanners";
import { BannerSlideshow } from "./BannerSlideshow";
import { BannerStacked } from "./BannerStacked";
import { BannerGrid } from "./BannerGrid";

export function CategoryBanners({ category }) {
  const config = categoryBanners[category];

  if (!config) return null;

  if (config.layout === "slideshow") {
    return <BannerSlideshow slides={config.slides} />;
  }

  if (config.layout === "stacked") {
    return <BannerStacked banners={config.banners} />;
  }

  // پیش‌فرض: grid
  return <BannerGrid large={config.large} small={config.small} />;
}