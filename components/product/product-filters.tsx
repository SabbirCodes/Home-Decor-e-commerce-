"use client";

import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  "all",
  "Furniture",
  "Lighting",
  "Decor",
  "Textiles",
];

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProductFilters({
  total,
}: {
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);

  const category =
    searchParams.get("category") || "all";

  const sort =
    searchParams.get("sort") || "newest";

  const q = searchParams.get("q") || "";

  const updateParam = (
    key: string,
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    const query = params.toString();

    router.push(
      query
        ? `${pathname}?${query}`
        : pathname,
      { scroll: false }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
        ease,
      }}
      className="mb-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Categories */}
        <div className="overflow-x-auto scrollbar-none -mx-1 px-1">
          <div className="flex w-max items-center gap-1.5">
            {CATEGORIES.map((c) => {
              const active = category === c;

              return (
                <button
                  key={c}
                  type="button"
                  onClick={() =>
                    updateParam("category", c)
                  }
                  className={`relative rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${
                    active
                      ? "text-cream"
                      : "border border-line bg-surface text-ink-soft hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{
                        duration: 0.3,
                        ease,
                      }}
                    />
                  )}

                  <span className="relative z-10">
                    {c === "all"
                      ? "All pieces"
                      : c}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort + results */}
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <motion.span
            key={total}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.25,
            }}
            className="text-xs text-ink-soft"
          >
            {total} {total === 1 ? "result" : "results"}
          </motion.span>

          <div className="relative">
  <motion.button
    type="button"
    onClick={() => setSortOpen((prev) => !prev)}
    whileTap={{ scale: 0.98 }}
    className="flex min-w-37 items-center justify-between gap-3 rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-ink transition-colors duration-300 hover:border-ink/30"
  >
    <span>
      {SORTS.find((item) => item.value === sort)?.label}
    </span>

    <motion.span
      animate={{
        rotate: sortOpen ? 180 : 0,
      }}
      transition={{
        duration: 0.25,
        ease,
      }}
    >
      <ChevronDown size={14} />
    </motion.span>
  </motion.button>

  <AnimatePresence>
    {sortOpen && (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSortOpen(false)}
        />

        {/* Dropdown */}
        <motion.div
          initial={{
            opacity: 0,
            y: -5,
          }}
          animate={{
            opacity: 1,
            y: 4,
          }}
          exit={{
            opacity: 0,
            y: -5,
          }}
          transition={{
            duration: 0.2,
            ease,
          }}
          className="absolute right-0 top-full z-50 mt-1 min-w-45 overflow-hidden rounded-xl border border-line bg-surface p-1.5 shadow-lg shadow-black/5"
        >
          {SORTS.map((item) => {
            const active = sort === item.value;

            return (
              <motion.button
                key={item.value}
                type="button"
                onClick={() => {
                  updateParam("sort", item.value);
                  setSortOpen(false);
                }}
                whileHover={{
                  x: 2,
                }}
                transition={{
                  duration: 0.15,
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors ${
                  active
                    ? "bg-surface-2 text-ink"
                    : "text-ink-soft hover:bg-surface-2 hover:text-ink"
                }`}
              >
                <span>{item.label}</span>

                <AnimatePresence>
                  {active && (
                    <motion.span
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                    >
                      <Check
                        size={14}
                        strokeWidth={1.8}
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>
      </>
    )}
  </AnimatePresence>
</div>
        </div>
      </div>

      {/* Search query */}
      <AnimatePresence>
        {q && (
          <motion.div
            initial={{
              opacity: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -4,
            }}
            transition={{
              duration: 0.25,
              ease,
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface-2 py-1.5 pl-3.5 pr-2 text-xs text-ink-soft"
          >
            <span>
              Results for{" "}
              <span className="text-ink">
                &ldquo;{q}&rdquo;
              </span>
            </span>

            <button
              type="button"
              onClick={() =>
                updateParam("q", "")
              }
              className="flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-200 hover:bg-ink hover:text-cream"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}