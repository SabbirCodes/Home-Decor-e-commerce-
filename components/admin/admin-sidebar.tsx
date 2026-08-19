"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Plus,
  Users,
  Mail,
  Settings,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import ConfirmModal from "@/components/modal";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/products/new", label: "Add Product", icon: Plus },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: Mail, badge: true },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    axios
      .get("/api/admin/messages")
      .then(({ data }) => setUnreadCount(data.unreadCount || 0))
      .catch(() => {});
  }, [pathname]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <aside className="w-full md:w-60 shrink-0 md:min-h-[calc(100vh-72px)] border-b md:border-b-0 md:border-r border-line bg-surface">
      <div className="p-5 md:p-6">
        <p className="text-[10px] tracking-[0.24em] uppercase text-ink-soft mb-4">
          Studio Admin
        </p>
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {LINKS.map(({ href, label, icon: Icon, exact, badge }) => {
            const active = exact
              ? pathname === href
              : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm whitespace-nowrap transition-colors ${
                  active
                    ? "bg-ink text-cream"
                    : "text-ink-soft hover:bg-surface-2"
                }`}
              >
                <Icon size={16} strokeWidth={1.75} />
                {label}
                {badge && unreadCount > 0 && (
                  <span
                    className={`ml-auto flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
                      active ? "bg-cream text-ink" : "bg-clay text-cream"
                    }`}
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 flex md:flex-col gap-1">
          <Link
            href="/"
            className="hidden md:flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-xs text-ink-soft hover:bg-surface-2 hover:text-clay transition-colors"
          >
            <ArrowLeft size={14} />
            Back to store
          </Link>
          <button
            onClick={() => setConfirmOpen(true)}
            className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-xs text-danger hover:bg-danger/10 transition-colors whitespace-nowrap"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Sign out of the admin dashboard?"
        description="You'll need to sign in again to manage products, orders, and customers."
        confirmLabel="Sign out"
        loading={signingOut}
        onConfirm={handleSignOut}
        onCancel={() => setConfirmOpen(false)}
      />
    </aside>
  );
}
