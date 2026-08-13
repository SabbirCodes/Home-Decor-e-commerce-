"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const CATEGORIES = [
  {
    name: "Furniture",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Lighting",
    img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop",
  },
  {
    name: "Decor",
    img: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1932&auto=format&fit=crop",
  },
  {
    name: "Textiles",
    img: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=900&auto=format&fit=crop",
  },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
      <div className="flex items-end justify-between mb-9">
        <div>
          <p className="text-xs tracking-[0.24em] uppercase text-sage-dark font-medium mb-2">
            Browse by room
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ink">Shop by category</h2>
        </div>
        <Link href="/products" className="hidden sm:block text-sm text-ink-soft hover:text-clay transition-colors">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Link
              href={`/products?category=${cat.name}`}
              className="group relative block aspect-3/4 overflow-hidden rounded-sm bg-surface-2"
            >
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-dusk/70 via-dusk/0 to-dusk/0" />
              <span className="absolute bottom-4 left-4 font-display italic text-lg text-cream">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
