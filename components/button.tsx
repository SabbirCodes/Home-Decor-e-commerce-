"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "clay" | "outline" | "ghost" | "light" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-clay-dark",
  clay: "bg-clay text-cream hover:bg-clay-dark",
  outline: "bg-transparent text-ink border border-ink/70 hover:border-clay hover:text-clay",
  ghost: "bg-transparent text-ink hover:bg-surface-2",
  light: "bg-surface text-ink hover:bg-surface-2 border border-line",
  danger: "bg-danger text-cream hover:bg-danger/90",
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: any) => void;
  [key: string]: any;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  disabled,
  loading,
  type = "button",
  ...props
}: ButtonProps) {
  const sizes: Record<Size, string> = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-sm px-8 py-4",
  };

  const classes = `relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <motion.span
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      className="inline-flex items-center justify-center gap-2"
    >
      {loading ? (
        <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        children
      )}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}