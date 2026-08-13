import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductGallery from "@/components/product/product-gallery";
import ProductBuyBox from "@/components/product/product-buy-box";
import ProductReviews from "@/components/product/product-reviews";
import ProductGrid from "@/components/product/product-grid";
import type { IProduct } from "@/types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  await connectDB();
  const product = await Product.findOne({ slug }).lean<IProduct>();
  return { title: product ? `${product.name} — Ferrous & Field` : "Product — Ferrous & Field" };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  await connectDB();

  const product = await Product.findOne({ slug }).lean<IProduct>();
  if (!product) notFound();

  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(4)
    .lean();

  const plainProduct = JSON.parse(JSON.stringify(product));
  const plainRelated = JSON.parse(JSON.stringify(related));

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 md:py-14">
      <nav className="text-xs text-ink-soft mb-8">
        <Link href="/" className="hover:text-clay">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-clay">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery images={plainProduct.images} name={plainProduct.name} />
        <ProductBuyBox product={plainProduct} />
      </div>

      <div className="mt-20 pt-14 border-t border-line">
        <ProductReviews productId={plainProduct._id} />
      </div>

      {plainRelated.length > 0 && (
        <div className="mt-20 pt-14 border-t border-line">
          <h2 className="font-display text-3xl text-ink mb-9">You may also like</h2>
          <ProductGrid products={plainRelated} />
        </div>
      )}
    </div>
  );
}
