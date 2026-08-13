import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export const metadata = { title: "Makers — Ferrous & Field" };

const MAKERS = [
  {
    name: "Alder & Finch Joinery",
    location: "Burlington, Vermont",
    craft: "Solid-wood furniture",
    since: "2011",
    image: "https://images.unsplash.com/photo-1565791380713-1756b9a05343?q=80&w=900&auto=format&fit=crop",
    blurb:
      "A four-person workshop building furniture the old way — hand-cut joinery, no particleboard, no veneer. Every piece is signed and dated on the underside.",
    category: "Furniture",
  },
  {
    name: "Barro Studio",
    location: "Sintra, Portugal",
    craft: "Hand-thrown ceramics",
    since: "2016",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=900&auto=format&fit=crop",
    blurb:
      "Run by two sisters out of a family kiln, Barro Studio throws every lamp base and vessel by hand, which means no two pieces we carry are exactly alike.",
    category: "Decor & Lighting",
  },
  {
    name: "Fen Loom House",
    location: "Otago, New Zealand",
    craft: "Handwoven textiles",
    since: "2014",
    image: "https://images.unsplash.com/photo-1562869929-bda0650edb1f?q=80&w=2084&auto=format&fit=crop",
    blurb:
      "Working from a floor loom passed down three generations, Fen Loom House weaves undyed New Zealand wool into throws and wall hangings on a made-to-order basis.",
    category: "Textiles",
  },
  {
    name: "Ember Glass Co.",
    location: "Asheville, North Carolina",
    craft: "Blown glass lighting",
    since: "2018",
    image: "https://images.unsplash.com/photo-1782292932564-5f95d97c3cb6?q=80&w=1984&auto=format&fit=crop",
    blurb:
      "A husband-and-wife glassblowing duo whose pendant lights start as molten glass gathered by hand — no two amber tones ever come out quite the same.",
    category: "Lighting",
  },
  {
    name: "Marsh & Oak Upholstery",
    location: "Leeds, England",
    craft: "Upholstered seating",
    since: "2009",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop",
    blurb:
      "A third-generation upholstery house building sofas and chairs on kiln-dried hardwood frames, deliberately designed to be re-covered rather than replaced.",
    category: "Furniture",
  },
  {
    name: "Coastal Stoneware",
    location: "Big Sur, California",
    craft: "Stoneware ceramics",
    since: "2013",
    image: "https://images.unsplash.com/photo-1740760540616-a3dd85e51352?q=80&w=1945&auto=format&fit=crop",
    blurb:
      "Small-batch stoneware fired in a wood kiln overlooking the Pacific — the ash from the fire gives each vessel a slightly different glaze finish.",
    category: "Decor",
  },
];

export default function MakersPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-5 sm:px-8 pt-14 pb-10 md:pt-20 text-center">
        <p className="text-xs tracking-[0.28em] uppercase text-clay font-medium mb-3">
          The studios behind the collection
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink text-balance">
          Meet the makers
        </h1>
        <p className="mt-5 text-[15px] text-ink-soft max-w-xl mx-auto leading-relaxed">
          Every piece in the collection comes from a small workshop we&apos;ve visited in
          person. Here are a few of the people whose hands actually made what you&apos;re
          about to bring home.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20 md:pb-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MAKERS.map((maker) => (
            <article
              key={maker.name}
              className="group rounded-md overflow-hidden border border-line bg-surface"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={maker.image}
                  alt={maker.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-cream/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium tracking-wide text-ink">
                  {maker.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-[11px] text-ink-soft mb-2">
                  <MapPin size={11} strokeWidth={1.75} />
                  {maker.location} · Since {maker.since}
                </div>
                <h2 className="font-display text-xl text-ink mb-1">{maker.name}</h2>
                <p className="text-xs uppercase tracking-wide text-clay mb-3">{maker.craft}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{maker.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-dusk text-cream">
        <div className="mx-auto max-w-2xl px-5 sm:px-8 py-16 text-center">
          <h2 className="font-display italic text-3xl mb-4">Know a studio we should carry?</h2>
          <p className="text-sm text-cream/60 mb-7">
            We&apos;re always looking for small workshops doing exceptional work.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-clay text-cream px-7 py-3 text-sm font-medium hover:bg-clay-dark transition-colors"
          >
            Read our story
          </Link>
        </div>
      </section>
    </div>
  );
}