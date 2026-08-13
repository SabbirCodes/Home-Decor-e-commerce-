"use client";

import { motion } from "motion/react";
import ProductCard from "@/components/product/product-card";
import type { IProduct } from "@/types";

export default function ProductGrid({ products }: { products: IProduct[] }) {
  if (!products?.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-ink-soft text-sm">No pieces match these filters yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-9 md:gap-x-6 md:gap-y-12">
      {products.map((product, i) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: (i % 8) * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
