import Hero from "@/components/hero";
import CategoryGrid from "@/components/category-grid";
import FeaturedProducts from "@/components/product/featured-products";
import ValueStrip from "@/components/value-strip";
import Newsletter from "@/components/newsletter";


export default function Home() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
}
