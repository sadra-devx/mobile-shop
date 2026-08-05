// src/components/Home/FeaturedProducts.jsx
import { useProducts } from "../../hooks/useProducts";
import { useInView } from "../../hooks/useInView";
import { ProductSlider } from "../Product/ProductSlider";

export function FeaturedProducts() {
  const { products, loading } = useProducts();
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });

  const featured = products.filter((p) => p.isPublished).slice(0, 10);

  return (
    <div
      ref={sectionRef}
      className="mx-auto max-w-7xl px-4 transition-all duration-700 ease-out sm:px-6 lg:px-10"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <ProductSlider
        title="محصولات پرفروش"
        subtitle="پیشنهاد فروشگاه"
        products={featured}
        loading={loading}
      />
    </div>
  );
}