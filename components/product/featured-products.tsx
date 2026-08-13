import Link from "next/link";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductGrid from "@/components/product/product-grid";


export default async function FeaturedProducts() {
  await connectDB();
  const products = await Product.find({ featured: true }).limit(8).lean();

  if (!products.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 border-t border-line">
      <div className="flex items-end justify-between mb-9">
        <div>
          <p className="text-xs tracking-[0.24em] uppercase text-clay font-medium mb-2">
            Editor&apos;s picks
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ink">Featured pieces</h2>
        </div>
        <Link href="/products" className="hidden sm:block text-sm text-ink-soft hover:text-clay transition-colors">
          View all →
        </Link>
      </div>

      <ProductGrid products={JSON.parse(JSON.stringify(products))} />
    </section>
  );
}
