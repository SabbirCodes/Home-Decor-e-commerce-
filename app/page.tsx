import Hero from "@/components/hero";
import CategoryGrid from "@/components/category-grid";
import FeaturedProducts from "@/components/product/featured-products";
import ValueStrip from "@/components/value-strip";
import Newsletter from "@/components/newsletter";
import Testimonials from "@/components/testimonials";
import MakersTeaser from "@/components/makers-teaser";
import JournalTeaser from "@/components/journal-teaser";
import RoomsShowcase from "@/components/rooms-showcase";
import BestSellers from "@/components/best-sellers";


 
export default function Home() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <RoomsShowcase />
      <BestSellers />
      <Testimonials />
      <MakersTeaser />
      <JournalTeaser />
      <Newsletter />
    </>
  );
}
 