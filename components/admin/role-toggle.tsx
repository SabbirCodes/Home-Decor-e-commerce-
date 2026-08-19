"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ShieldCheck, ShieldOff } from "lucide-react";
import Button from "@/components/button";
import ConfirmModal from "@/components/modal";
import { notify } from "@/components/toaster";

export default function RoleToggle({
  customerId,
  currentRole,
  isSelf,
}: {
  customerId: string;
  currentRole: "customer" | "admin";
  isSelf: boolean;
}) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const targetRole = currentRole === "admin" ? "customer" : "admin";

  const handleConfirm = async () => {
    setSaving(true);
    try {
      await axios.put(`/api/admin/customers/${customerId}`, { role: targetRole });
      notify.success(
        targetRole === "admin" ? "Customer promoted to admin." : "Admin access removed."
      );
      setConfirmOpen(false);
      router.refresh();
    } catch (err: any) {
      notify.error(err.response?.data?.error || "Failed to update role.");
    } finally {
      setSaving(false);
    }
  };

  if (isSelf) return null;

  return (
    <>
      <Button
        variant={currentRole === "admin" ? "outline" : "clay"}
        size="sm"
        onClick={() => setConfirmOpen(true)}
      >
        {currentRole === "admin" ? (
          <>
            <ShieldOff size={14} /> Remove admin access
          </>
        ) : (
          <>
            <ShieldCheck size={14} /> Make admin
          </>
        )}
      </Button>

      <ConfirmModal
        open={confirmOpen}
        title={targetRole === "admin" ? "Grant admin access?" : "Remove admin access?"}
        description={
          targetRole === "admin"
            ? "This customer will be able to manage products, orders, and other customers."
            : "This user will lose access to the admin dashboard immediately."
        }
        confirmLabel={targetRole === "admin" ? "Make admin" : "Remove access"}
        danger={targetRole !== "admin"}
        loading={saving}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}