import { CategorySection } from "../../components/Home/CategorySection"
import Hero from "../../components/Home/Hero/Hero"
import { FeaturedProducts } from "../../components/Product/FeaturedProducts"

function Home() {
  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-900">
      <Hero />
      <CategorySection />
      <br /><br /><br />
      <FeaturedProducts />
    </div>
  )
}

export default Home
