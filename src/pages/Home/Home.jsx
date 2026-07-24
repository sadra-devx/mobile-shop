// src/pages/Home/Home.jsx
import { CategorySection } from "../../components/Home/CategorySection";
import Hero from "../../components/Home/Hero/Hero";
import { WhyUs } from "../../components/Home/WhyUs/WhyUs";
import { FeaturedProducts } from "../../components/Product/FeaturedProducts";

function Home() {
  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-900">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <WhyUs />
    </div>
  );
}

export default Home;