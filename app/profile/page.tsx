"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "motion/react";
import { Package, Heart, LogOut, ShieldCheck } from "lucide-react";
import Button from "@/components/button";
import { notify } from "@/components/toaster";
import type { IUser } from "@/types";

interface AddressForm {
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

const EMPTY_ADDRESS: AddressForm = { line1: "", city: "", state: "", zip: "", country: "", phone: "" };

export default function ProfilePage() {
  const { status } = useSession();
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState<AddressForm>(EMPTY_ADDRESS);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
      return;
    }
    if (status === "authenticated") {
      axios
        .get("/api/profile")
        .then(({ data }) => {
          setUser(data.user);
          setName(data.user.name || "");
          setAddress({ ...EMPTY_ADDRESS, ...data.user.address });
        })
        .catch(() => notify.error("Failed to load your profile."))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await axios.put("/api/profile", { name, address });
      setUser(data.user);
      notify.success("Profile updated.");
    } catch {
      notify.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14 space-y-4">
        <div className="h-8 w-48 rounded bg-surface-2 animate-pulse" />
        <div className="h-64 rounded-xl bg-surface-2 animate-pulse" />
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-10 md:py-14">
      <div className="flex items-center gap-4 mb-10">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-clay text-cream font-display text-lg">
          {initials}
        </div>
        <div>
          <h1 className="font-display text-2xl text-ink">{user.name}</h1>
          <p className="text-sm text-ink-soft">{user.email}</p>
        </div>
        {user.role === "admin" && (
          <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 rounded-full bg-clay/10 text-clay text-xs font-medium px-3 py-1.5">
            <ShieldCheck size={13} /> Admin
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        <Button href="/account/orders" variant="light" className="justify-start">
          <Package size={15} /> Order history
        </Button>
        <Button href="/wishlist" variant="light" className="justify-start">
          <Heart size={15} /> Wishlist
        </Button>
        {user.role === "admin" && (
          <Button href="/admin" variant="light" className="justify-start">
            <ShieldCheck size={15} /> Admin dashboard
          </Button>
        )}
      </div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSave}
        className="rounded-xl border border-line bg-surface p-6 sm:p-7 space-y-6"
      >
        <div>
          <h2 className="font-display text-xl text-ink mb-4">Account details</h2>
          <label className="block max-w-sm">
            <span className="block text-xs text-ink-soft mb-1.5">Full name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors"
            />
          </label>
        </div>

        <div className="pt-2 border-t border-line">
          <h2 className="font-display text-xl text-ink mb-1 mt-5">Shipping address</h2>
          <p className="text-xs text-ink-soft mb-4">Used to pre-fill checkout next time.</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Address" name="line1" value={address.line1} onChange={handleAddressChange} />
            <Field label="Phone" name="phone" value={address.phone} onChange={handleAddressChange} />
            <Field label="City" name="city" value={address.city} onChange={handleAddressChange} />
            <Field label="State / Province" name="state" value={address.state} onChange={handleAddressChange} />
            <Field label="ZIP / Postal code" name="zip" value={address.zip} onChange={handleAddressChange} />
            <Field label="Country" name="country" value={address.country} onChange={handleAddressChange} />
          </div>
        </div>

        <Button type="submit" variant="primary" loading={saving}>
          Save changes
        </Button>
      </motion.form>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-6 flex items-center gap-2 text-sm text-danger hover:underline"
      >
        <LogOut size={14} /> Sign out
      </button>
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