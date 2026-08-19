"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

/** Builds a compact page list with "…" for gaps, e.g. 1 … 4 5 6 … 12 */
function getPageList(current: number, total: number): (number | "...")[] {
  const delta = 1;
  const pages: number[] = [];

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      pages.push(i);
    }
  }

  const withDots: (number | "...")[] = [];
  let prev: number | undefined;
  for (const p of pages) {
    if (prev !== undefined) {
      if (p - prev === 2) withDots.push(prev + 1);
      else if (p - prev > 2) withDots.push("...");
    }
    withDots.push(p);
    prev = p;
  }
  return withDots;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) params.delete("page");
    else params.set("page", page.toString());
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const pages = getPageList(currentPage, totalPages);
  const atStart = currentPage <= 1;
  const atEnd = currentPage >= totalPages;

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-14" aria-label="Pagination">
      <Link
        href={buildHref(currentPage - 1)}
        aria-disabled={atStart}
        tabIndex={atStart ? -1 : undefined}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors ${
          atStart ? "pointer-events-none opacity-40" : "text-ink-soft hover:border-clay hover:text-clay"
        }`}
      >
        <ChevronLeft size={15} />
      </Link>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-1 text-ink-soft text-sm select-none">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-ink text-cream"
                : "text-ink-soft border border-line hover:border-clay hover:text-clay"
            }`}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={buildHref(currentPage + 1)}
        aria-disabled={atEnd}
        tabIndex={atEnd ? -1 : undefined}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors ${
          atEnd ? "pointer-events-none opacity-40" : "text-ink-soft hover:border-clay hover:text-clay"
        }`}
      >
        <ChevronRight size={15} />
      </Link>
    </nav>
  );
}