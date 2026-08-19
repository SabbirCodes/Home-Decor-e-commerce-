"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import Button from "@/components/button";
import { notify } from "@/components/toaster";
import type { ISiteSettings } from "@/types";

const EMPTY: ISiteSettings = {
  siteName: "",
  email: "",
  phone: "",
  location: "",
  locationMapUrl: "",
  hours: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<ISiteSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get("/api/settings")
      .then(({ data }) => setForm({ ...EMPTY, ...data.settings }))
      .catch(() => notify.error("Failed to load settings."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await axios.put("/api/settings", form);
      setForm({ ...EMPTY, ...data.settings });
      notify.success("Settings updated.");
    } catch (err: any) {
      notify.error(err.response?.data?.error || "Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 rounded bg-surface-2 animate-pulse" />
        <div className="h-96 rounded-xl bg-surface-2 animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-2">Site settings</h1>
      <p className="text-sm text-ink-soft mb-8">
        Changes here update the storefront immediately — including the contact page.
      </p>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="max-w-2xl rounded-xl border border-line bg-surface p-6 sm:p-7 space-y-5"
      >
        <Field label="Site name" name="siteName" value={form.siteName} onChange={handleChange} />

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Contact email" name="email" type="email" value={form.email} onChange={handleChange} />
          <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+880 1700-123456" />
        </div>

        <Field
          label="Studio location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Dhanmondi, Dhaka, Bangladesh"
        />
        <Field
          label="Map link (optional)"
          name="locationMapUrl"
          value={form.locationMapUrl}
          onChange={handleChange}
          placeholder="https://maps.google.com/?q=..."
        />
        <Field
          label="Business hours"
          name="hours"
          value={form.hours}
          onChange={handleChange}
          placeholder="Sat–Thu, 10am–7pm BST"
        />

        <Button type="submit" variant="primary" loading={saving}>
          Save changes
        </Button>
      </motion.form>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-xs text-ink-soft mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors"
      />
    </label>
  );
}