import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { serverFetch } from "@/lib/serverFetch";
import type { IUser } from "@/types";

export const dynamic = "force-dynamic";

interface CustomerRow extends IUser {
  orderCount: number;
  totalSpent: number;
  lastOrderAt: string | null;
}

export default async function AdminCustomersPage() {
  const data = await serverFetch<{ customers: CustomerRow[] }>("/api/admin/customers");
  const customers = data?.customers || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-ink">Customers</h1>
        <p className="text-sm text-ink-soft">{customers.length} total</p>
      </div>

      <div className="rounded-xl border border-line bg-surface overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1.5fr_1fr_0.7fr_0.8fr_0.8fr] gap-4 px-5 py-3 text-[11px] uppercase tracking-wide text-ink-soft border-b border-line">
          <span>Customer</span>
          <span>Joined</span>
          <span className="text-right">Orders</span>
          <span className="text-right">Spent</span>
          <span className="text-right">Role</span>
        </div>

        {customers.map((c) => (
          <Link
            key={c._id}
            href={`/admin/customers/${c._id}`}
            className="grid sm:grid-cols-[1.5fr_1fr_0.7fr_0.8fr_0.8fr] gap-1 sm:gap-4 px-5 py-4 border-b border-line last:border-0 hover:bg-surface-2 transition-colors"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink truncate">{c.name}</p>
              <p className="text-xs text-ink-soft truncate">{c.email}</p>
            </div>
            <span className="text-xs text-ink-soft sm:self-center">
              {c.createdAt
                ? new Date(c.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "—"}
            </span>
            <span className="text-sm text-ink sm:text-right sm:self-center">{c.orderCount}</span>
            <span className="font-mono text-sm text-ink sm:text-right sm:self-center">
              ${c.totalSpent.toFixed(2)}
            </span>
            <span className="sm:text-right sm:self-center">
              {c.role === "admin" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-clay/10 text-clay text-[11px] font-medium px-2.5 py-1">
                  <ShieldCheck size={11} /> Admin
                </span>
              ) : (
                <span className="text-[11px] text-ink-soft">Customer</span>
              )}
            </span>
          </Link>
        ))}

        {!customers.length && (
          <p className="text-sm text-ink-soft p-6 text-center">No customers yet.</p>
        )}
      </div>
    </div>
  );
}