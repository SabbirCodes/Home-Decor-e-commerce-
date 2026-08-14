import Image from "next/image";
import Link from "next/link";
import { JOURNAL_ENTRIES } from "@/lib/journal-data";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function JournalTeaser() {
  const entries = JOURNAL_ENTRIES.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 border-t border-line">
      <div className="flex items-end justify-between mb-9">
        <div>
          <p className="text-xs tracking-[0.24em] uppercase text-sage-dark font-medium mb-2">
            Studio notes
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ink">From the journal</h2>
        </div>
        <Link href="/journal" className="hidden sm:block text-sm text-ink-soft hover:text-clay transition-colors">
          Read the journal →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {entries.map((entry) => (
          <Link key={entry.slug} href={`/journal/${entry.slug}`} className="group block">
            <div className="relative aspect-4/3 rounded-md overflow-hidden mb-4">
              <Image
                src={entry.cover}
                alt={entry.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="text-xs uppercase tracking-wide text-clay mb-2">
              {entry.category} · {formatDate(entry.date)}
            </p>
            <h3 className="text-base font-medium text-ink mb-2 group-hover:text-clay-dark transition-colors text-balance">
              {entry.title}
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed line-clamp-2">{entry.excerpt}</p>
          </Link>
        ))}
      </div>

      <Link
        href="/journal"
        className="sm:hidden mt-8 block text-center text-sm text-ink-soft hover:text-clay transition-colors"
      >
        Read the journal →
      </Link>
    </section>
  );
}