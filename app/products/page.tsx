import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductGrid from "@/components/product/product-grid";
import ProductFilters from "@/components/product/product-filters";

export const dynamic = "force-dynamic";

export const metadata = { title: "Shop — Ferrous & Field" };

interface PageProps {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const category = sp?.category;
  const sort = sp?.sort || "newest";
  const q = sp?.q;

  await connectDB();

  const filter: Record<string, any> = {};
  if (category && category !== "all") filter.category = category;
  if (q) filter.$text = { $search: q };

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    newest: { createdAt: -1 },
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    rating: { ratingAverage: -1 },
  };

  const products = await Product.find(filter).sort(sortMap[sort] || sortMap.newest).lean();

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 md:py-14">
      <div className="mb-8">
        <p className="text-xs tracking-[0.24em] uppercase text-clay font-medium mb-2">
          {category && category !== "all" ? category : "Full collection"}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink">
          {category && category !== "all" ? category : "Shop all pieces"}
        </h1>
      </div>

      <ProductFilters total={products.length} />
      <ProductGrid products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
