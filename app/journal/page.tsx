import Image from "next/image";
import Link from "next/link";
import { JOURNAL_ENTRIES } from "@/lib/journal-data";

export const metadata = { title: "Journal — Ferrous & Field" };

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function JournalPage() {
  const [featured, ...rest] = JOURNAL_ENTRIES;

  return (
    <div>
      <section className="mx-auto max-w-4xl px-5 sm:px-8 pt-14 pb-10 md:pt-20 text-center">
        <p className="text-xs tracking-[0.28em] uppercase text-clay font-medium mb-3">
          Studio notes
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink text-balance">Journal</h1>
        <p className="mt-5 text-[15px] text-ink-soft max-w-xl mx-auto leading-relaxed">
          Care guides, notes from the workshops we work with, and the occasional thought
          on how to actually live with the things you own.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-8">
        <Link href={`/journal/${featured.slug}`} className="group grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="relative aspect-16/10 rounded-md overflow-hidden">
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-clay mb-3">
              {featured.category} · {formatDate(featured.date)}
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-3 text-balance group-hover:text-clay-dark transition-colors">
              {featured.title}
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft mb-4">{featured.excerpt}</p>
            <span className="text-xs text-ink-soft">{featured.readTime}</span>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-14 md:py-20 border-t border-line mt-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((entry) => (
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
      </section>
    </div>
  );
}