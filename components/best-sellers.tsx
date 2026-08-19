import Link from "next/link";
import { serverFetch } from "@/lib/serverFetch";
import ProductGrid from "@/components/product/product-grid";
import type { IProduct } from "@/types";

export default async function BestSellers() {
  const data = await serverFetch<{ items: IProduct[] }>("/api/products?sort=rating&limit=4");
  const products = data?.items || [];

  // Only worth showing once real reviews exist — otherwise "best sellers"
  // would just be an arbitrary slice of unrated products.
  const hasRatings = products.some((p) => p.ratingCount > 0);
  if (!hasRatings) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 border-t border-line">
      <div className="flex items-end justify-between mb-9">
        <div>
          <p className="text-xs tracking-[0.24em] uppercase text-brass font-medium mb-2">
            Loved by customers
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ink">Best sellers</h2>
        </div>
        <Link href="/products?sort=rating" className="hidden sm:block text-sm text-ink-soft hover:text-clay transition-colors">
          View all →
        </Link>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}