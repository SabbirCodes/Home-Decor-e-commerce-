import { NextResponse } from "next/server";
import User from "@/models/User";
import Order from "@/models/Order";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const [users, orderStats] = await Promise.all([
      User.find().select("-password").sort({ createdAt: -1 }).lean(),
      Order.aggregate([
        {
          $group: {
            _id: "$user",
            orderCount: { $sum: 1 },
            totalSpent: { $sum: "$totalPrice" },
            lastOrderAt: { $max: "$createdAt" },
          },
        },
      ]),
    ]);

    const statsMap = new Map(orderStats.map((s) => [s._id.toString(), s]));

    const customers = users.map((u: any) => {
      const stats = statsMap.get(u._id.toString());
      return {
        ...u,
        orderCount: stats?.orderCount || 0,
        totalSpent: stats?.totalSpent || 0,
        lastOrderAt: stats?.lastOrderAt || null,
      };
    });

    return NextResponse.json({ customers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load customers." }, { status: 500 });
  }
}