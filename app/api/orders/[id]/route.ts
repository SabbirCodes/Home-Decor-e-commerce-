import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Order from "@/models/Order";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const order = await Order.findById(id).populate("user", "name email");
    if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });

    // Admins can view any order; customers can only view their own.
    const ownerId =
      typeof order.user === "object" && order.user !== null && "_id" in order.user
        ? (order.user as any)._id.toString()
        : String(order.user);
    if (session.user.role !== "admin" && ownerId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    return NextResponse.json({ order });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load order." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const update: Record<string, any> = {};
    if (typeof body.status === "string") update.status = body.status;
    if (typeof body.trackingNumber === "string") update.trackingNumber = body.trackingNumber;
    if (typeof body.carrier === "string") update.carrier = body.carrier;

    const order = await Order.findByIdAndUpdate(id, update, { new: true }).populate(
      "user",
      "name email"
    );
    if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    return NextResponse.json({ order });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update order." }, { status: 500 });
  }
}