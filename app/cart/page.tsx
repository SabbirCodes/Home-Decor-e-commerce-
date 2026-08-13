"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import QuantitySelector from "@/components/product/quantity-selector";
import Button from "@/components/button";
import { notify } from "@/components/toaster";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());

  const shipping = totalPrice > 100 || totalPrice === 0 ? 0 : 12;
  const total = totalPrice + shipping;

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    notify.success(`Removed “${name}” from your bag`);
  };

  if (!items.length) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 mb-6">
          <ShoppingBag size={24} strokeWidth={1.5} className="text-ink-soft" />
        </div>
        <h1 className="font-display text-3xl text-ink mb-3">Your bag is empty</h1>
        <p className="text-sm text-ink-soft mb-8">
          Browse the collection and find something to bring home.
        </p>
        <Button href="/products" variant="primary">Shop the collection</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 md:py-14">
      <h1 className="font-display text-4xl text-ink mb-10">Your bag</h1>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 divide-y divide-line">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
                className="flex gap-4 py-6"
              >
                <Link href={`/products/${item.slug}`} className="relative h-24 w-24 shrink-0 rounded-sm overflow-hidden bg-surface-2">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                  )}
                </Link>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <Link href={`/products/${item.slug}`} className="text-sm font-medium text-ink hover:text-clay">
                      {item.name}
                    </Link>
                    <p className="font-mono text-sm text-ink-soft mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.productId, q)}
                      max={item.stock || 99}
                    />
                    <button
                      onClick={() => handleRemove(item.productId, item.name)}
                      className="p-2 text-ink-soft hover:text-danger transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="md:col-span-1">
          <div className="rounded-xl border border-line bg-surface p-6 sticky top-24">
            <h2 className="font-display text-xl text-ink mb-5">Order summary</h2>
            <div className="space-y-2.5 text-sm">
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

            <Button href="/checkout" variant="primary" className="w-full mt-6">
              Checkout
              <ArrowRight size={15} />
            </Button>

            {totalPrice < 100 && (
              <p className="text-[11px] text-ink-soft mt-3 text-center">
                Add ${(100 - totalPrice).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
