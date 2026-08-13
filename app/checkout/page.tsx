"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { motion } from "motion/react";
import { CheckCircle2, Truck } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import Button from "@/components/button";
import { notify } from "@/components/toaster";

interface FormState {
  fullName: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    line1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const shipping = totalPrice > 100 ? 0 : 12;
  const total = totalPrice + shipping;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/checkout");
    }
    if (session?.user?.name) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((f) => ({ ...f, fullName: f.fullName || session.user!.name || "" }));
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return notify.error("Your bag is empty.");

    setPlacing(true);
    try {
      await axios.post("/api/orders", {
        items: items.map((i) => ({
          product: i.productId,
          name: i.name,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
        })),
        shippingAddress: form,
      });
      setPlaced(true);
      clearCart();
      notify.success("Order placed successfully!");
    } catch (err: any) {
      notify.error(err.response?.data?.error || "Failed to place order.");
    } finally {
      setPlacing(false);
    }
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-5 py-28 text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 mb-6"
        >
          <CheckCircle2 size={30} strokeWidth={1.5} className="text-sage-dark" />
        </motion.div>
        <h1 className="font-display text-3xl text-ink mb-3">Order confirmed</h1>
        <p className="text-sm text-ink-soft mb-8">
          Thank you — we&apos;ve received your order and will begin preparing it for shipment.
          You can track its progress from your account.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button href="/account/orders" variant="primary">View order history</Button>
          <Button href="/products" variant="outline">Continue shopping</Button>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-lg px-5 py-28 text-center">
        <h1 className="font-display text-3xl text-ink mb-3">Your bag is empty</h1>
        <Button href="/products" variant="primary" className="mt-4">Shop the collection</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 md:py-14">
      <h1 className="font-display text-4xl text-ink mb-10">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-12">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
          <h2 className="text-sm font-medium tracking-wide uppercase text-ink-soft">
            Shipping address
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full name" name="fullName" value={form.fullName} onChange={handleChange} />
            <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <Input label="Address" name="line1" value={form.line1} onChange={handleChange} />

          <div className="grid sm:grid-cols-3 gap-4">
            <Input label="City" name="city" value={form.city} onChange={handleChange} />
            <Input label="State / Province" name="state" value={form.state} onChange={handleChange} />
            <Input label="ZIP / Postal code" name="zip" value={form.zip} onChange={handleChange} />
          </div>

          <Input label="Country" name="country" value={form.country} onChange={handleChange} />

          <div className="mt-8 flex items-center gap-3 rounded-lg border border-line bg-surface p-4">
            <Truck size={18} className="text-clay shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-ink">Cash on delivery</p>
              <p className="text-xs text-ink-soft">Pay when your order arrives at your door.</p>
            </div>
          </div>

          <Button type="submit" variant="primary" loading={placing} className="w-full mt-4">
            Place order — ${total.toFixed(2)}
          </Button>
        </form>

        <div className="md:col-span-1">
          <div className="rounded-xl border border-line bg-surface p-6 sticky top-24">
            <h2 className="font-display text-xl text-ink mb-5">Order summary</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm gap-3">
                  <span className="text-ink-soft">
                    {item.name} <span className="text-ink-soft/60">× {item.quantity}</span>
                  </span>
                  <span className="font-mono text-ink shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2.5 text-sm mt-5 pt-4 border-t border-line">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span className="font-mono text-ink">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Shipping</span>
                <span className="font-mono text-ink">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-line font-medium">
                <span className="text-ink">Total</span>
                <span className="font-mono text-ink">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-ink-soft mb-1.5">{label}</span>
      <input
        required
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-clay transition-colors"
      />
    </label>
  );
}
