"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "motion/react";
import { Package } from "lucide-react";
import Button from "@/components/button";
import type { IOrder } from "@/types";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-brass/15 text-brass",
  processing: "bg-clay/15 text-clay-dark",
  shipped: "bg-sage/15 text-sage-dark",
  delivered: "bg-sage-dark/15 text-sage-dark",
  cancelled: "bg-danger/15 text-danger",
};

export default function OrderHistoryPage() {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account/orders");
      return;
    }
    if (status === "authenticated") {
      axios
        .get("/api/orders")
        .then(({ data }) => setOrders(data.orders))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-14 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-surface-2 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 mb-6">
          <Package size={24} strokeWidth={1.5} className="text-ink-soft" />
        </div>
        <h1 className="font-display text-3xl text-ink mb-3">No orders yet</h1>
        <p className="text-sm text-ink-soft mb-8">Your placed orders will appear here.</p>
        <Button href="/products" variant="primary">Start shopping</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8 py-10 md:py-14">
      <h1 className="font-display text-4xl text-ink mb-10">Order history</h1>

      <div className="space-y-4">
        {orders.map((order, i) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="rounded-xl border border-line bg-surface p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-ink-soft">
                  Order #{order._id.slice(-8).toUpperCase()} ·{" "}
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span
                className={`text-[11px] font-medium px-3 py-1 rounded-full capitalize ${STATUS_STYLES[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-ink-soft">
                    {item.name} <span className="text-ink-soft/60">× {item.quantity}</span>
                  </span>
                  <span className="font-mono text-ink">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-3 border-t border-line text-sm font-medium">
              <span className="text-ink">Total</span>
              <span className="font-mono text-ink">${order.totalPrice.toFixed(2)}</span>
            </div>

            {order.trackingNumber && (
              <div className="mt-3 pt-3 border-t border-line flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-ink-soft">
                  {order.carrier ? `${order.carrier} · ` : ""}Tracking
                </span>
                <span className="font-mono text-ink">{order.trackingNumber}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}