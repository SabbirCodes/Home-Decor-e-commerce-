import { notFound } from "next/navigation";
import {connectDB} from "@/lib/db";
import Product from "@/models/Product";
import ProductForm from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">Edit product</h1>
      <ProductForm initialData={JSON.parse(JSON.stringify(product))} productId={id} />
    </div>
  );
}
