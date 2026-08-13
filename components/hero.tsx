"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-10 md:pb-16 grid md:grid-cols-12 gap-8 md:gap-6 items-center">
        <div className="md:col-span-6 lg:col-span-5 order-2 md:order-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-xs tracking-[0.28em] uppercase text-clay font-medium mb-5"
          >
            The Autumn Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="font-display text-[2.7rem] sm:text-6xl lg:text-[4.4rem] leading-[0.98] text-ink text-balance"
          >
            Rooms that feel
            <br />
            <span className="italic text-clay">made</span>, not furnished.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-soft"
          >
            Furniture, lighting, and objects sourced from small-batch makers —
            chosen for material honesty and built to be lived with for decades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="mt-9 flex items-center gap-6"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-3.5 text-sm font-medium hover:bg-clay-dark transition-colors"
            >
              Shop the collection
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href="/products?category=Lighting"
              className="text-sm text-ink-soft border-b border-transparent hover:border-ink hover:text-ink transition-colors pb-0.5"
            >
              Explore lighting
            </Link>
          </motion.div>
        </div>

        <div className="md:col-span-6 lg:col-span-7 order-1 md:order-2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease }}
            className="relative h-75 overflow-hidden rounded-md sm:h-90 md:h-100 lg:h-120"
          >
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop"
              alt="A sunlit living room with a linen sofa and ceramic vessels"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            className="hidden sm:flex absolute -bottom-6 -left-6 w-44 rounded-sm bg-cream shadow-xl shadow-black/10 p-3 items-center gap-3"
          >
            <div className="relative h-14 w-14 shrink-0 rounded-[3px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=200&auto=format&fit=crop"
                alt="Handwoven ceramic vase"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-soft">New</p>
              <p className="text-[13px] font-medium text-ink leading-tight">Handwoven Vessel</p>
              <p className="font-mono text-[11px] text-clay mt-0.5">$68.00</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
