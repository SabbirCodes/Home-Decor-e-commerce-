import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const product = await Product.findOne({ slug }).lean();
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });

    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .limit(4)
      .lean();

    return NextResponse.json({ product, related });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load product." }, { status: 500 });
  }
}
