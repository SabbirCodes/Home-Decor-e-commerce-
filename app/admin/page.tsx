import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import { serverFetch } from "@/lib/serverFetch";
import type { IOrder } from "@/types";

export const dynamic = "force-dynamic";

interface StatsResponse {
  productCount: number;
  orderCount: number;
  userCount: number;
  revenue: number;
  recentOrders: (IOrder & { user: { name: string } | null })[];
}

export default async function AdminDashboard() {
  const data = await serverFetch<StatsResponse>("/api/admin/stats");

  const stats = [
    { label: "Total revenue", value: `$${(data?.revenue || 0).toFixed(2)}`, icon: DollarSign, href: "/admin/orders" },
    { label: "Orders", value: data?.orderCount || 0, icon: ShoppingCart, href: "/admin/orders" },
    { label: "Products", value: data?.productCount || 0, icon: Package, href: "/admin/products" },
    { label: "Customers", value: data?.userCount || 0, icon: Users, href: "/admin/customers" },
  ];
  const orders = data?.recentOrders || [];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl border border-line bg-surface p-5 hover:bg-surface-2 transition-colors"
          >
            <Icon size={18} strokeWidth={1.5} className="text-clay mb-3" />
            <p className="font-mono text-2xl text-ink">{value}</p>
            <p className="text-xs text-ink-soft mt-1">{label}</p>
          </Link>
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
            {orders.map((order: IOrder & { user: { name: string } | null }) => (
              <Link
                key={order._id}
                href={`/admin/orders/${order._id}`}
                className="flex items-center justify-between py-3 text-sm hover:bg-surface-2 -mx-2 px-2 rounded-md transition-colors"
              >
                <div>
                  <p className="text-ink font-medium">{order.user?.name || "Guest"}</p>
                  <p className="text-xs text-ink-soft">#{order._id.toString().slice(-8).toUpperCase()}</p>
                </div>
                <span className="font-mono text-ink">${order.totalPrice.toFixed(2)}</span>
                <span className="text-xs capitalize text-ink-soft">{order.status}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}