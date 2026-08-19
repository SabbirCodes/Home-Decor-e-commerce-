"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/button";
import { notify } from "@/components/toaster";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;

export default function OrderStatusEditor({
  orderId,
  initialStatus,
  initialTrackingNumber,
  initialCarrier,
}: {
  orderId: string;
  initialStatus: string;
  initialTrackingNumber?: string;
  initialCarrier?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber || "");
  const [carrier, setCarrier] = useState(initialCarrier || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`/api/orders/${orderId}`, { status, trackingNumber, carrier });
      notify.success("Order updated.");
      router.refresh();
    } catch {
      notify.error("Failed to update order.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-line bg-surface p-5 sm:p-6 space-y-4">
      <h2 className="font-display text-xl text-ink">Fulfillment</h2>

      <label className="block">
        <span className="block text-xs text-ink-soft mb-1.5">Status</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-clay capitalize"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-xs text-ink-soft mb-1.5">Carrier</span>
          <input
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            placeholder="e.g. UPS, FedEx"
            className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-clay"
          />
        </label>
        <label className="block">
          <span className="block text-xs text-ink-soft mb-1.5">Tracking number</span>
          <input
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="1Z999AA10123456784"
            className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-clay font-mono"
          />
        </label>
      </div>

      <Button variant="primary" onClick={handleSave} loading={saving} className="w-full sm:w-auto">
        Save changes
      </Button>
    </div>
  );
}