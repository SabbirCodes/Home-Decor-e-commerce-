import { NextResponse } from "next/server";
import Review from "@/models/Review";
import Product from "@/models/Product";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("product");
  if (!productId) return NextResponse.json({ error: "Product id required." }, { status: 400 });

  const reviews = await Review.find({ product: productId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Please sign in to leave a review." }, { status: 401 });

    const { product, rating, comment } = await req.json();
    if (!product || !rating || !comment) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await connectDB();

    const review = await Review.findOneAndUpdate(
      { product, user: session.user.id },
      { rating, comment, userName: session.user.name },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const stats = await Review.aggregate([
      { $match: { product: review.product } },
      { $group: { _id: "$product", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);

    if (stats.length) {
      await Product.findByIdAndUpdate(product, {
        ratingAverage: Math.round(stats[0].avg * 10) / 10,
        ratingCount: stats[0].count,
      });
    }

    return NextResponse.json({ review }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to submit review." }, { status: 500 });
  }
}
