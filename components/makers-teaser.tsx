import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const FEATURED_MAKERS = [
  {
    name: "Alder & Finch Joinery",
    location: "Vermont",
    image: "https://images.unsplash.com/photo-1565791380713-1756b9a05343?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Barro Studio",
    location: "Portugal",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Fen Loom House",
    location: "New Zealand",
    image: "https://images.unsplash.com/photo-1562869929-bda0650edb1f?q=80&w=2084&auto=format&fit=crop",
  },
];

export default function MakersTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-16 md:py-24 border-t border-line">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-4">
          <p className="text-xs tracking-[0.24em] uppercase text-clay font-medium mb-2">
            The people behind it
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-4 text-balance">
            Every piece has a maker&apos;s name behind it
          </h2>
          <p className="text-[15px] text-ink-soft leading-relaxed mb-6">
            We work with a small group of studios we&apos;ve visited in person —
            joiners, weavers, and ceramicists who build in small batches, not
            factory runs.
          </p>
          <Link
            href="/makers"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-clay transition-colors"
          >
            Meet the makers
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 md:gap-5">
          {FEATURED_MAKERS.map((maker, i) => (
            <Link
              key={maker.name}
              href="/makers"
              className={`group relative overflow-hidden rounded-md aspect-16/10 sm:aspect-3/4 ${
                i === 1 ? "sm:aspect-[3/4.4] md:-translate-y-6" : ""
              }`}
            >
              <Image
                src={maker.image}
                alt={maker.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-dusk/75 via-dusk/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-cream text-sm font-medium leading-tight">{maker.name}</p>
                <p className="text-cream/60 text-[11px] mt-0.5">{maker.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}