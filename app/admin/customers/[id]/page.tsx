import { notFound } from "next/navigation";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { serverFetch } from "@/lib/serverFetch";
import { auth } from "@/lib/auth";
import RoleToggle from "@/components/admin/role-toggle";
import type { IUser, IOrder } from "@/types";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-brass/15 text-brass",
  processing: "bg-clay/15 text-clay-dark",
  shipped: "bg-sage/15 text-sage-dark",
  delivered: "bg-sage-dark/15 text-sage-dark",
  cancelled: "bg-danger/15 text-danger",
};

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [data, session] = await Promise.all([
    serverFetch<{ customer: IUser; orders: IOrder[] } | null>(`/api/admin/customers/${id}`),
    auth(),
  ]);

  if (!data?.customer) notFound();
  const { customer, orders } = data;

  const initials = customer.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const totalSpent = orders.reduce(
    (sum, o) => sum + (o.status !== "cancelled" ? o.totalPrice : 0),
    0
  );

  return (
    <div>
      <Link href="/admin/customers" className="text-xs text-ink-soft hover:text-clay transition-colors">
        ← Back to customers
      </Link>

      <div className="flex flex-wrap items-center gap-4 mt-6 mb-8">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-clay text-cream font-display text-lg">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl text-ink">{customer.name}</h1>
          <p className="text-sm text-ink-soft">{customer.email}</p>
        </div>
        <RoleToggle
          customerId={customer._id}
          currentRole={customer.role}
          isSelf={customer._id === session?.user.id}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard label="Orders" value={orders.length.toString()} />
        <StatCard label="Total spent" value={`$${totalSpent.toFixed(2)}`} />
        <StatCard
          label="Joined"
          value={
            customer.createdAt
              ? new Date(customer.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "—"
          }
        />
        <StatCard label="Role" value={customer.role === "admin" ? "Admin" : "Customer"} />
      </div>

      {(customer.address?.line1 || customer.address?.phone) && (
        <div className="rounded-xl border border-line bg-surface p-5 mb-10">
          <h2 className="text-xs uppercase tracking-wide text-ink-soft mb-3">Address on file</h2>
          <div className="space-y-1.5 text-sm text-ink">
            {customer.address?.line1 && (
              <p className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-clay shrink-0" />
                {customer.address.line1}, {customer.address.city} {customer.address.state}{" "}
                {customer.address.zip}, {customer.address.country}
              </p>
            )}
            {customer.address?.phone && (
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-clay shrink-0" />
                {customer.address.phone}
              </p>
            )}
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-clay shrink-0" />
              {customer.email}
            </p>
          </div>
        </div>
      )}

      <h2 className="font-display text-xl text-ink mb-4">Order history</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-ink-soft">This customer hasn&apos;t placed any orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/admin/orders/${order._id}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface p-5 hover:bg-surface-2 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-ink">
                  #{order._id.slice(-8).toUpperCase()}
                </p>
                <p className="text-xs text-ink-soft">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-sm text-ink">${order.totalPrice.toFixed(2)}</span>
                <span
                  className={`text-[11px] font-medium capitalize rounded-full px-2.5 py-1 ${STATUS_STYLES[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="font-mono text-lg text-ink">{value}</p>
      <p className="text-xs text-ink-soft mt-0.5">{label}</p>
    </div>
  );
}