import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { serverFetch } from "@/lib/serverFetch";
import OrderStatusEditor from "@/components/admin/order-status-editor";
import type { IOrder } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await serverFetch<{ order: IOrder } | null>(`/api/orders/${id}`);
  if (!data?.order) notFound();
  const { order } = data;

  const customer = typeof order.user === "object" ? order.user : null;

  return (
    <div>
      <Link href="/admin/orders" className="text-xs text-ink-soft hover:text-clay transition-colors">
        ← Back to orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink">
            Order #{order._id.slice(-8).toUpperCase()}
          </h1>
          <p className="text-sm text-ink-soft mt-1">
            Placed{" "}
            {new Date(order.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {customer && (
          <Link
            href={`/admin/customers/${customer._id}`}
            className="text-sm text-clay hover:underline"
          >
            View customer →
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="font-display text-xl text-ink mb-4">Items</h2>
            <div className="divide-y divide-line">
              {order.items.map((item: any, i: any) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  <div className="relative h-14 w-14 shrink-0 rounded-sm overflow-hidden bg-surface-2">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{item.name}</p>
                    <p className="text-xs text-ink-soft">Qty {item.quantity}</p>
                  </div>
                  <span className="font-mono text-sm text-ink shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-4 pt-4 border-t border-line text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span className="font-mono text-ink">${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Shipping</span>
                <span className="font-mono text-ink">
                  {order.shippingPrice === 0 ? "Free" : `$${order.shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-line font-medium">
                <span className="text-ink">Total</span>
                <span className="font-mono text-ink">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="font-display text-xl text-ink mb-4">Shipping address</h2>
            <div className="text-sm text-ink-soft leading-relaxed">
              <p className="text-ink font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.line1}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="mt-2">{order.shippingAddress.phone}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <OrderStatusEditor
            orderId={order._id}
            initialStatus={order.status}
            initialTrackingNumber={order.trackingNumber}
            initialCarrier={order.carrier}
          />
        </div>
      </div>
    </div>
  );
}