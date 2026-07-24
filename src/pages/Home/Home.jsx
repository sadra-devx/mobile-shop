// src/pages/Home/Home.jsx
import { BrandStrip } from "../../components/Home/BrandStrip/BrandStrip";
import { CategorySection } from "../../components/Home/CategorySection";
import Hero from "../../components/Home/Hero/Hero";
import { PromoBanner } from "../../components/Home/PromoBanner/PromoBanner";
import { WhyUs } from "../../components/Home/WhyUs/WhyUs";
import { FeaturedProducts } from "../../components/Product/FeaturedProducts";

function Home() {
  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-900">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />
      <WhyUs />
      <BrandStrip />
    </div>
  );
}

export default Home;