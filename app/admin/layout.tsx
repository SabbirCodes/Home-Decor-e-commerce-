import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/");

  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 min-w-0 p-5 sm:p-8">{children}</div>
    </div>
  );
}
