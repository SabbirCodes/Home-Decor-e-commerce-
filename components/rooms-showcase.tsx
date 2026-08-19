"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const ROOMS = [
  {
    name: "Living Room",
    copy: "Anchor pieces built to hold a room together",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Bedroom",
    copy: "Soft textiles for a slower morning",
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=2158&auto=format&fit=crop",
  },
  {
    name: "Dining Room",
    copy: "Tables and lighting worth gathering around",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1616486886892-ff366aa67ba4?q=80&w=2080&auto=format&fit=crop",
  },
  {
    name: "Entryway",
    copy: "The first and last thing you see each day",
    category: "Decor",
    image: "https://images.unsplash.com/photo-1600494448868-9fbd1ac2d9f5?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function RoomsShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 border-t border-line">
      <div className="mb-9">
        <p className="text-xs tracking-[0.24em] uppercase text-clay font-medium mb-2">
          Not sure where to start?
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-ink">Shop by room</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {ROOMS.map((room, i) => (
          <motion.div
            key={room.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Link
              href={`/products?category=${room.category}`}
              className="group relative block aspect-3/4 overflow-hidden rounded-md bg-surface-2"
            >
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-dusk/80 via-dusk/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display italic text-lg text-cream leading-tight">{room.name}</p>
                <p className="text-cream/60 text-[11px] mt-1 leading-snug">{room.copy}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}