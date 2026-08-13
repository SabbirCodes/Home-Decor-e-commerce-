import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import { connectDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await connectDB();

  const [productCount, orderCount, userCount, orders] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    User.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name"),
  ]);

  const revenue = await Order.aggregate([
    { $match: { status: { $ne: "cancelled" } } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  const stats = [
    { label: "Total revenue", value: `$${(revenue[0]?.total || 0).toFixed(2)}`, icon: DollarSign },
    { label: "Orders", value: orderCount, icon: ShoppingCart },
    { label: "Products", value: productCount, icon: Package },
    { label: "Customers", value: userCount, icon: Users },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-line bg-surface p-5">
            <Icon size={18} strokeWidth={1.5} className="text-clay mb-3" />
            <p className="font-mono text-2xl text-ink">{value}</p>
            <p className="text-xs text-ink-soft mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl text-ink">Recent orders</h2>
          <Link href="/admin/orders" className="text-xs text-clay hover:underline">
            View all
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-sm text-ink-soft">No orders yet.</p>
        ) : (
          <div className="divide-y divide-line">
            {orders.map((order: any) => (
              <div key={order._id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="text-ink font-medium">{order.user?.name || "Guest"}</p>
                  <p className="text-xs text-ink-soft">#{order._id.toString().slice(-8).toUpperCase()}</p>
                </div>
                <span className="font-mono text-ink">${order.totalPrice.toFixed(2)}</span>
                <span className="text-xs capitalize text-ink-soft">{order.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
