"use client";

import { Minus, Plus } from "lucide-react";
import { motion } from "motion/react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function QuantitySelector({ value, onChange, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center border border-line rounded-full">
      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-10 w-10 items-center justify-center text-ink-soft hover:text-ink disabled:opacity-30"
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </motion.button>
      <span className="w-8 text-center text-sm font-medium tabular-nums">{value}</span>
      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-10 w-10 items-center justify-center text-ink-soft hover:text-ink disabled:opacity-30"
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </motion.button>
    </div>
  );
}
