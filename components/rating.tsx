"use client";

import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface RatingDisplayProps {
  value?: number;
  count?: number;
  size?: number;
}

export function RatingDisplay({ value = 0, count, size = 14 }: RatingDisplayProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            strokeWidth={1.5}
            className={n <= Math.round(value) ? "fill-brass text-brass" : "text-line"}
          />
        ))}
      </div>
      {typeof count === "number" && (
        <span className="text-xs text-ink-soft">({count})</span>
      )}
    </div>
  );
}

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function RatingInput({ value, onChange }: RatingInputProps) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.button
          key={n}
          type="button"
          whileTap={{ scale: 0.85 }}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="p-0.5"
          aria-label={`Rate ${n} stars`}
        >
          <Star
            size={22}
            strokeWidth={1.5}
            className={n <= (hover || value) ? "fill-clay text-clay" : "text-line"}
          />
        </motion.button>
      ))}
    </div>
  );
}
