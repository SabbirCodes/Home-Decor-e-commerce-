import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import User from "@/models/User";
import Order from "@/models/Order";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const [customer, orders] = await Promise.all([
      User.findById(id).select("-password").lean(),
      Order.find({ user: id }).sort({ createdAt: -1 }).lean(),
    ]);

    if (!customer) return NextResponse.json({ error: "Customer not found." }, { status: 404 });

    return NextResponse.json({ customer, orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load customer." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const { role } = await req.json();

    if (!["customer", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    }
    if (id === session.user.id && role !== "admin") {
      return NextResponse.json(
        { error: "You can't remove your own admin access." },
        { status: 400 }
      );
    }

    await connectDB();
    const customer = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    if (!customer) return NextResponse.json({ error: "Customer not found." }, { status: 404 });

    return NextResponse.json({ customer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update customer." }, { status: 500 });
  }
}