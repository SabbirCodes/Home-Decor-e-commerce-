import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Please sign in to place an order." }, { status: 401 });

    const body = await req.json();
    const { items, shippingAddress } = body;

    if (!items?.length) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    await connectDB();

    const itemsPrice = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 12;
    const totalPrice = itemsPrice + shippingPrice;

    const order = await Order.create({
      user: session.user.id,
      items,
      shippingAddress,
      paymentMethod: "cod",
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    // decrement stock, best-effort
    await Promise.all(
      items.map((i: any) =>
        Product.findByIdAndUpdate(i.product, { $inc: { stock: -i.quantity } })
      )
    );

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to place order." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");

    let filter: Record<string, any> = { user: session.user.id };
    if (all === "true" && session.user.role === "admin") {
      filter = {};
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 }).populate("user", "name email");
    return NextResponse.json({ orders });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load orders." }, { status: 500 });
  }
}
