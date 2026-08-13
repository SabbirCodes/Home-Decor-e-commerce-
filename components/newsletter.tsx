"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  };

  return (
    <section className="bg-dusk text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 text-center">
        <p className="text-xs tracking-[0.24em] uppercase text-brass mb-3">Stay in the loop</p>
        <h2 className="font-display italic text-3xl md:text-[2.6rem] max-w-xl mx-auto text-balance">
          New pieces, restocks, and studio notes — once a month, never more.
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-8 mx-auto max-w-md flex items-center gap-2 border-b border-cream/25 pb-2 focus-within:border-clay transition-colors"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent placeholder:text-cream/35 text-cream text-sm outline-none py-2"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.9 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-clay text-cream shrink-0"
            aria-label="Subscribe"
          >
            {done ? <Check size={15} /> : <ArrowRight size={15} />}
          </motion.button>
        </form>
        {done && <p className="mt-3 text-xs text-sage">You&apos;re on the list.</p>}
      </div>
    </section>
  );
}
