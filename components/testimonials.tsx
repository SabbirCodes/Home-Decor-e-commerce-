"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "The lounge chair arrived exactly as pictured — better, actually. You can tell it was made by someone who cares. Three years in and it still looks brand new.",
    name: "Naomi R.",
    location: "Portland, OR",
    rating: 5,
  },
  {
    quote:
      "I was skeptical about buying furniture online, but the material notes on every product page made the decision easy. Zero regrets on the oak console.",
    name: "Marcus T.",
    location: "Austin, TX",
    rating: 5,
  },
  {
    quote:
      "Customer service actually picked up the phone when a lamp arrived with a hairline crack, and had a replacement out the same day. Rare these days.",
    name: "Priya K.",
    location: "Chicago, IL",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-line bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.24em] uppercase text-sage-dark font-medium mb-2">
            From our customers
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ink">Lived in, not just looked at</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-md border border-line bg-cream p-7"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={14} strokeWidth={1.5} className="fill-brass text-brass" />
                ))}
              </div>
              <blockquote className="text-[15px] leading-relaxed text-ink-soft mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm">
                <span className="font-medium text-ink">{t.name}</span>
                <span className="text-ink-soft"> · {t.location}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}