"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Button from "@/components/button";
import ConfirmModal from "@/components/modal";
import { notify } from "@/components/toaster";
import type { IProduct } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/products?limit=100");
    setProducts(data.items);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await axios.delete(`/api/products/${deleteTarget.id}`);
      setProducts((p) => p.filter((prod) => prod._id !== deleteTarget.id));
      notify.success("Product deleted.");
      setDeleteTarget(null);
    } catch {
      notify.error("Failed to delete product.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-ink">Products</h1>
        <Button href="/admin/products/new" variant="primary" size="sm">
          <Plus size={15} /> Add product
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-surface-2 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-line bg-surface overflow-hidden">
          <AnimatePresence>
            {products.map((p) => (
              <motion.div
                key={p._id}
                layout
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-4 px-5 py-3.5 border-b border-line last:border-0"
              >
                <div className="relative h-12 w-12 shrink-0 rounded-sm overflow-hidden bg-surface-2">
                  {p.images?.[0] && <Image src={p.images[0]} alt={p.name} fill className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                  <p className="text-xs text-ink-soft">{p.category}</p>
                </div>
                <span className="font-mono text-sm text-ink w-20 text-right">
                  ${p.price.toFixed(2)}
                </span>
                <span
                  className={`text-xs w-24 text-right ${p.stock > 0 ? "text-sage-dark" : "text-danger"}`}
                >
                  {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={`/admin/products/${p._id}`}
                    className="p-2 text-ink-soft hover:text-clay transition-colors"
                  >
                    <Pencil size={15} />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget({ id: p._id, name: p.name })}
                    className="p-2 text-ink-soft hover:text-danger transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {!products.length && (
            <p className="text-sm text-ink-soft p-6 text-center">No products yet — add your first piece.</p>
          )}
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title={`Delete "${deleteTarget?.name}"?`}
        description="This can't be undone. The product will be permanently removed from your catalog."
        confirmLabel="Delete product"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}