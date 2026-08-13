"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Heart } from "lucide-react";
import ProductGrid from "@/components/product/product-grid";
import Button from "@/components/button";
import type { IProduct } from "@/types";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/wishlist");
      return;
    }
    if (status === "authenticated") {
      axios
        .get("/api/wishlist")
        .then(({ data }) => setProducts(data.products))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-4/5 rounded-sm bg-surface-2 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 mb-6">
          <Heart size={24} strokeWidth={1.5} className="text-ink-soft" />
        </div>
        <h1 className="font-display text-3xl text-ink mb-3">Your wishlist is empty</h1>
        <p className="text-sm text-ink-soft mb-8">Save pieces you love to find them here later.</p>
        <Button href="/products" variant="primary">Browse the collection</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 md:py-14">
      <h1 className="font-display text-4xl text-ink mb-10">Your wishlist</h1>
      <ProductGrid products={products} />
    </div>
  );
}
