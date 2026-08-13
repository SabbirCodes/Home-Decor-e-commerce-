import Image from "next/image";
import Link from "next/link";
import { Leaf, Hammer, Heart } from "lucide-react";

export const metadata = { title: "Our Story — Ferrous & Field" };

const VALUES = [
  {
    icon: Hammer,
    title: "Made, not manufactured",
    copy: "Every piece passes through the hands of a person, not just a machine. We work with studios small enough that the maker can tell you which batch your piece came from.",
  },
  {
    icon: Leaf,
    title: "Materials with a conscience",
    copy: "FSC-certified wood, undyed wool, reclaimed brass. We'd rather sell fewer things made well than fill a warehouse with things made fast.",
  },
  {
    icon: Heart,
    title: "Built to be lived with",
    copy: "Nothing in the collection is designed for a single season. We choose pieces that soften, patina, and improve with years of actual use.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative">
        <div className="relative h-[52vh] min-h-95 w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1800&auto=format&fit=crop"
            alt="A sunlit workshop with hand tools and raw oak"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-dusk/40" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 pb-12 w-full">
            <p className="text-xs tracking-[0.28em] uppercase text-brass font-medium mb-3">
              Our story
            </p>
            <h1 className="font-display italic text-4xl sm:text-5xl md:text-6xl text-cream text-balance max-w-2xl">
              A quieter way to furnish a home.
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-16 md:py-24">
        <p className="text-lg md:text-xl leading-relaxed text-ink-soft text-balance">
          Ferrous &amp; Field started in a converted garage in 2019, with one loom, one
          kiln, and a running list of furniture we couldn&apos;t find anywhere else —
          pieces with a bit of weight to them, made by people who cared what happened
          after the sale.
        </p>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-soft">
          <p>
            We were tired of watching well-made objects get lost between two extremes:
            mass-produced pieces built to be replaced, and design pieces priced for a
            showroom rather than a living room. So we started working directly with a
            small group of studios — a joiner in Vermont, a ceramicist outside Lisbon, a
            weaver working from her grandmother&apos;s loom — and building a shop around
            what they made, at a price that reflected the work rather than a markup.
          </p>
          <p>
            Six years later, that list has grown into a full collection, but the
            approach hasn&apos;t changed. We still visit every workshop before we carry
            their work. We still turn down pieces that don&apos;t hold up to daily use.
            And we still believe a room furnished slowly, with things you actually chose,
            beats a room furnished all at once.
          </p>
        </div>
      </section>

      <section className="bg-surface border-y border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-10 text-center">
            What we care about
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="text-center md:text-left">
                <div className="mx-auto md:mx-0 flex h-11 w-11 items-center justify-center rounded-full bg-clay/10 mb-4">
                  <Icon size={19} strokeWidth={1.5} className="text-clay" />
                </div>
                <h3 className="text-base font-medium text-ink mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-16 md:py-24 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
          Meet the people behind the pieces
        </h2>
        <p className="text-sm text-ink-soft mb-8 max-w-md mx-auto">
          Every studio we work with has a story worth knowing before it sits in your home.
        </p>
        <Link
          href="/makers"
          className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-3.5 text-sm font-medium hover:bg-clay-dark transition-colors"
        >
          Meet the makers
        </Link>
      </section>
    </div>
  );
}