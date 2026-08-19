"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Truck, Undo2 } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import { useWishlistStore } from "@/lib/useWishlistStore";
import { RatingDisplay } from "@/components/rating";
import QuantitySelector from "@/components/product/quantity-selector";
import { notify } from "@/components/toaster";
import type { IProduct } from "@/types";

export default function ProductBuyBox({ product }: { product: IProduct }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const wishlistHas = useWishlistStore((s) => s.has(product._id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const { data: session } = useSession();
  const router = useRouter();
  const inStock = product.stock > 0;

  const handleAdd = () => {
    if (!inStock) return;
    addItem(product, qty);
    notify.success(`Added ${qty} × “${product.name}” to your bag`);
  };

  const handleWishlist = async () => {
    if (!session) return router.push("/login");
    try {
      const added = await toggleWishlist(product);
      notify.wishlist(added ? "Saved to wishlist" : "Removed from wishlist");
    } catch {
      notify.error("Something went wrong.");
    }
  };

  return (
    <div>
      <p className="text-xs tracking-[0.2em] uppercase text-clay font-medium mb-2">
        {product.category}
      </p>
      <h1 className="font-display text-3xl md:text-[2.6rem] leading-tight text-ink text-balance">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-3">
        {product.ratingCount > 0 && (
          <RatingDisplay value={product.ratingAverage} count={product.ratingCount} size={14} />
        )}
        <span
          className={`text-xs font-medium ${inStock ? "text-sage-dark" : "text-danger"}`}
        >
          {inStock ? `In stock · ${product.stock} left` : "Out of stock"}
        </span>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-mono text-2xl text-ink">
          ${product.price.toFixed(2)}
        </span>
        {product.compareAtPrice && (
          <span className="font-mono text-base text-ink-soft/60 line-through">
            ${product.compareAtPrice.toFixed(2)}
          </span>
        )}
      </div>

      <p className="mt-6 text-[15px] leading-relaxed text-ink-soft max-w-md">
        {product.shortDescription || product.description}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-y-2.5 text-sm max-w-xs">
        {product.material && (
          <>
            <span className="text-ink-soft">Material</span>
            <span className="text-ink">{product.material}</span>
          </>
        )}
        {product.color && (
          <>
            <span className="text-ink-soft">Color</span>
            <span className="text-ink">{product.color}</span>
          </>
        )}
        {product.dimensions && (
          <>
            <span className="text-ink-soft">Dimensions</span>
            <span className="text-ink">{product.dimensions}</span>
          </>
        )}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <QuantitySelector value={qty} onChange={setQty} max={product.stock || 1} />

        <motion.button
          whileHover={{ scale: inStock ? 1.015 : 1 }}
          whileTap={{ scale: inStock ? 0.97 : 1 }}
          onClick={handleAdd}
          disabled={!inStock}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream py-3.5 text-sm font-medium hover:bg-clay-dark transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <ShoppingBag size={16} strokeWidth={1.75} />
          {inStock ? "Add to bag" : "Out of stock"}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleWishlist}
          className="flex h-13 w-13 items-center justify-center rounded-full border border-line hover:border-clay shrink-0"
          aria-label="Toggle wishlist"
        >
          <Heart size={17} className={wishlistHas ? "fill-clay text-clay" : "text-ink-soft"} />
        </motion.button>
      </div>

      <div className="mt-8 pt-6 border-t border-line space-y-3">
        <div className="flex items-center gap-2.5 text-sm text-ink-soft">
          <Truck size={16} strokeWidth={1.5} className="text-clay" />
          Free shipping on orders over $100
        </div>
        <div className="flex items-center gap-2.5 text-sm text-ink-soft">
          <Undo2 size={16} strokeWidth={1.5} className="text-clay" />
          30-day returns, no questions asked
        </div>
      </div>
    </div>
  );
}
