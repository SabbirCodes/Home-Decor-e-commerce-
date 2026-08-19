import { NextResponse } from "next/server";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const [productCount, orderCount, userCount, recentOrders, revenueAgg] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name"),
      Order.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
    ]);

    return NextResponse.json({
      productCount,
      orderCount,
      userCount,
      revenue: revenueAgg[0]?.total || 0,
      recentOrders,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load dashboard stats." }, { status: 500 });
  }
}