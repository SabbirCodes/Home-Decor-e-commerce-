import { serverFetch } from "@/lib/serverFetch";
import ProductGrid from "@/components/product/product-grid";
import ProductFilters from "@/components/product/product-filters";
import Pagination from "@/components/product/pagination";
import type { IProduct } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Shop — Ferrous & Field" };

const PAGE_SIZE = 12;

interface PageProps {
  searchParams: Promise<{ category?: string; sort?: string; q?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const category = sp?.category;
  const sort = sp?.sort || "newest";
  const q = sp?.q;
  const page = Math.max(1, parseInt(sp?.page || "1", 10) || 1);

  const params = new URLSearchParams({ sort, page: page.toString(), limit: PAGE_SIZE.toString() });
  if (category && category !== "all") params.set("category", category);
  if (q) params.set("q", q);

  const data = await serverFetch<{ items: IProduct[]; total: number; pages: number }>(
    `/api/products?${params.toString()}`
  );
  const products = data?.items || [];
  const totalPages = data?.pages || 1;
  const total = data?.total || 0;

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

      <ProductFilters total={total} />
      <ProductGrid products={products} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}