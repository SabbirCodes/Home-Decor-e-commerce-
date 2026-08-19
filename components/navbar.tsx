"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/lib/useCartStore";

const NAV_LINKS = [
  { href: "/products", label: "Shop" },
  { href: "/products?category=Furniture", label: "Furniture" },
  { href: "/products?category=Lighting", label: "Lighting" },
  { href: "/products?category=Decor", label: "Decor" },
];

export default function Navbar({ siteName = "Ferrous & Field" }: { siteName?: string }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  const accountHref = session ? (session.user.role === "admin" ? "/admin" : "/profile") : "/login";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-canvas/90 backdrop-blur-md border-b border-line" : "bg-canvas/0 border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-18 items-center justify-between">
          <button
            className="md:hidden -ml-2 p-2 text-ink"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="flex flex-col items-start leading-none">
            <span className="font-display italic text-[1.35rem] tracking-tight text-ink">
              {siteName}
            </span>
            <span className="hidden sm:block text-[9px] tracking-[0.28em] uppercase text-ink-soft mt-0.5">
              Home Atelier
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-[13px] tracking-wide text-ink-soft hover:text-ink transition-colors py-2 group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-clay transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">

            <Link
              href="/wishlist"
              className="p-2 text-ink-soft hover:text-ink transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.75} />
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-ink-soft hover:text-ink transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.75} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[9px] font-semibold text-cream"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {status === "authenticated" ? (
              <Link
                href={accountHref}
                className="p-2 text-ink-soft hover:text-ink transition-colors"
                aria-label={session!.user.role === "admin" ? "Admin dashboard" : "Your profile"}
              >
                <User size={18} strokeWidth={1.75} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="ml-1 rounded-full bg-ink text-cream px-4 py-2 text-xs font-medium hover:bg-clay-dark transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-line bg-canvas"
          >
            <div className="flex flex-col px-5 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-3 text-sm text-ink border-b border-line last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}