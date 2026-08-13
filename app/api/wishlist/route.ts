import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ products: [] });

  await connectDB();
  const wishlist = await Wishlist.findOne({ user: session.user.id }).populate("products");
  return NextResponse.json({ products: wishlist?.products || [] });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Please sign in to save items." }, { status: 401 });

  const { productId } = await req.json();
  if (!productId) return NextResponse.json({ error: "Product id required." }, { status: 400 });

  await connectDB();

  let wishlist = await Wishlist.findOne({ user: session.user.id });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: session.user.id, products: [productId] });
    return NextResponse.json({ added: true, products: wishlist.products });
  }

  const exists = wishlist.products.some((p) => p.toString() === productId);
  if (exists) {
    wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
  } else {
    wishlist.products.push(productId);
  }
  await wishlist.save();

  return NextResponse.json({ added: !exists, products: wishlist.products });
}
