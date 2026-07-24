<<<<<<< Updated upstream
import Hero from "../../components/Hero/Hero"
=======
import { CategorySection } from "../../components/Home/CategorySection"
import Hero from "../../components/Home/Hero/Hero"
import { WhyUs } from "../../components/Home/WhyUs/WhyUs"
import { FeaturedProducts } from "../../components/Product/FeaturedProducts"
>>>>>>> Stashed changes

function Home() {
  return (
    <div className="w-full">
      <Hero />
<<<<<<< Updated upstream
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
=======
      <CategorySection />
      <FeaturedProducts />
      <WhyUs />
>>>>>>> Stashed changes
    </div>
  )
}

export default Home
