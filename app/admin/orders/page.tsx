"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { notify } from "@/components/toaster";
import type { IOrder } from "@/types";

const STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-brass/15 text-brass",
  processing: "bg-clay/15 text-clay-dark",
  shipped: "bg-sage/15 text-sage-dark",
  delivered: "bg-sage-dark/15 text-sage-dark",
  cancelled: "bg-danger/15 text-danger",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/orders?all=true")
      .then(({ data }) => setOrders(data.orders))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const prev = orders;
    setOrders((o) =>
      o.map((ord) =>
        ord._id === id ? { ...ord, status: status as any } : ord,
      ),
    );
    try {
      await axios.put(`/api/orders/${id}`, { status });
      notify.success("Order status updated.");
    } catch {
      setOrders(prev);
      notify.error("Failed to update order.");
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">Orders</h1>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 rounded-lg bg-surface-2 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, i) => {
            const customer =
              order.user && typeof order.user === "object"
                ? order.user.name || "Customer"
                : "Customer";
            return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                className="rounded-xl border border-line bg-surface p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{customer}</p>
                    <p className="text-xs text-ink-soft">
                      #{order._id.slice(-8).toUpperCase()} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-ink">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`text-xs font-medium capitalize rounded-full px-3 py-1.5 outline-none cursor-pointer border-0 ${STATUS_STYLES[order.status]}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {!orders.length && (
            <p className="text-sm text-ink-soft">No orders placed yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
