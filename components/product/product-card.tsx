"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/useCartStore";
import { useWishlistStore } from "@/lib/useWishlistStore";
import { RatingDisplay } from "@/components/rating";
import { notify } from "@/components/toaster";
import type { IProduct } from "@/types";

export default function ProductCard({ product }: { product: IProduct }) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const wishlistHas = useWishlistStore((s) => s.has(product._id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const { data: session } = useSession();
  const router = useRouter();

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
      : null;

  const handleQuickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (product.stock <= 0) {
      notify.error("Currently out of stock.");
      return;
    }
    addItem(product, 1);
    notify.success(`Added “${product.name}” to your bag`);
  };

  const handleWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      const added = await toggleWishlist(product);
      notify.wishlist(added ? "Saved to wishlist" : "Removed from wishlist");
    } catch {
      notify.error("Something went wrong.");
    }
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-surface-2">
        {product.images?.[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        )}

        {discount && (
          <span className="absolute top-3 left-3 rounded-full bg-clay px-2.5 py-1 text-[10px] font-semibold tracking-wide text-cream">
            −{discount}%
          </span>
        )}

        <motion.button
          onClick={handleWishlist}
          whileTap={{ scale: 0.8 }}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 backdrop-blur-sm shadow-sm"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={14}
            strokeWidth={2}
            className={wishlistHas ? "fill-clay text-clay" : "text-ink-soft"}
          />
        </motion.button>

        <motion.div
          initial={false}
          animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute inset-x-3 bottom-3 hidden sm:block"
        >
          <button
            onClick={handleQuickAdd}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-ink/95 backdrop-blur-sm py-2.5 text-xs font-medium tracking-wide text-cream hover:bg-clay-dark transition-colors"
          >
            <Plus size={13} strokeWidth={2.25} />
            Quick add
          </button>
        </motion.div>
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.16em] uppercase text-ink-soft/70">
            {product.category}
          </p>
          <h3 className="mt-1 truncate text-[15px] text-ink font-medium">
            {product.name}
          </h3>
          {product.ratingCount > 0 && (
            <div className="mt-1">
              <RatingDisplay
                value={product.ratingAverage}
                count={product.ratingCount}
                size={11}
              />
            </div>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-[13px] text-ink">
            ${product.price.toFixed(2)}
          </p>
          {product.compareAtPrice && (
            <p className="font-mono text-[11px] text-ink-soft/60 line-through">
              ${product.compareAtPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
