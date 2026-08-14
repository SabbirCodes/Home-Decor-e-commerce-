import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JOURNAL_ENTRIES } from "@/lib/journal-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return JOURNAL_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const entry = JOURNAL_ENTRIES.find((e) => e.slug === slug);
  return { title: entry ? `${entry.title} — Journal` : "Journal — Ferrous & Field" };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function JournalEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = JOURNAL_ENTRIES.find((e) => e.slug === slug);
  if (!entry) notFound();

  const more = JOURNAL_ENTRIES.filter((e) => e.slug !== slug).slice(0, 2);

  return (
    <article>
      <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-10 pb-8">
        <Link href="/journal" className="text-xs text-ink-soft hover:text-clay transition-colors">
          ← Back to journal
        </Link>
        <p className="text-xs uppercase tracking-wide text-clay mt-6 mb-3">
          {entry.category} · {formatDate(entry.date)} · {entry.readTime}
        </p>
        <h1 className="font-display text-3xl md:text-5xl text-ink text-balance leading-tight">
          {entry.title}
        </h1>
      </div>

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-md shadow-sm">
          <Image
            src={entry.cover}
            alt={entry.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 sm:px-8 pt-10 pb-12 md:pt-14 md:pb-16 space-y-6">
        {entry.body.map((para, i) => (
          <p key={i} className="text-[16px] leading-[1.8] text-ink-soft">
            {para}
          </p>
        ))}
      </div>

      {more.length > 0 && (
        <section className="border-t border-line bg-surface/50">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 md:py-16">
            <h2 className="font-display text-2xl text-ink mb-8">More from the journal</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {more.map((e) => (
                <Link key={e.slug} href={`/journal/${e.slug}`} className="group block">
                  <div className="relative aspect-16/10 rounded-md overflow-hidden mb-4">
                    <Image
                      src={e.cover}
                      alt={e.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-wide text-clay mb-2">{e.category}</p>
                  <h3 className="text-base font-medium text-ink group-hover:text-clay-dark transition-colors text-balance">
                    {e.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}