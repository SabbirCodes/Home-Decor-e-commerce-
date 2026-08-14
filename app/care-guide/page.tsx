import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Care Guide — Ferrous & Field" };

const MATERIALS = [
  {
    name: "Solid wood",
    image: "https://images.unsplash.com/photo-1628689813760-0136ccd88e97?q=80&w=2070&auto=format&fit=crop",
    tips: [
      "Keep out of direct sunlight where possible — UV light causes uneven fading over time.",
      "Wipe with a dry or barely-damp cloth. Avoid silicone-based sprays, which build up a film.",
      "Rub a little food-safe mineral oil into exposed end-grain every 6 months to prevent cracking.",
      "Light scratches can usually be buffed out with a matching wood wax rather than refinishing.",
    ],
  },
  {
    name: "Ceramics & stoneware",
    image: "https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?q=80&w=2070&auto=format&fit=crop",
    tips: [
      "Hand wash with warm water and mild soap — most glazes aren't dishwasher-safe long-term.",
      "Avoid sudden temperature changes (e.g. hot water in a cold vessel), which can cause hairline cracks.",
      "Dry fully before storing to prevent moisture from seeping into unglazed bases.",
      "A cracked glaze (crazing) is often intentional character, not a defect — but check with us if unsure.",
    ],
  },
  {
    name: "Linen & natural textiles",
    image: "https://images.unsplash.com/photo-1633655442330-0b44ca0cce9b?q=80&w=1970&auto=format&fit=crop",
    tips: [
      "Machine wash cold on a gentle cycle, or hand wash for anything with fringe or embellishment.",
      "Skip the dryer when you can — line dry or lay flat to preserve shape and reduce wear.",
      "Linen softens and slightly lightens with every wash; this is normal, not damage.",
      "Steam rather than iron directly where possible to avoid flattening woven texture.",
    ],
  },
  {
    name: "Brass & metal fittings",
    image: "https://images.unsplash.com/photo-1706794831038-b583e5b37382?q=80&w=1965&auto=format&fit=crop",
    tips: [
      "Unlacquered brass will patina naturally over time — many people prefer this aged look.",
      "To keep a brighter finish, wipe periodically with a soft cloth and a dab of brass polish.",
      "Avoid abrasive cleaners, which can strip lacquer coatings unevenly.",
      "Keep fittings dry — moisture speeds up tarnishing, especially in bathrooms and kitchens.",
    ],
  },
];

export default function CareGuidePage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pt-14 pb-10 md:pt-20 text-center">
        <p className="text-xs tracking-[0.28em] uppercase text-clay font-medium mb-3">
          Made to last, if you let it
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink text-balance">Care guide</h1>
        <p className="mt-5 text-[15px] text-ink-soft leading-relaxed">
          Every material in the collection ages a little differently. A few honest habits
          go a long way toward keeping each piece looking the way it did the day it arrived
          — or better.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-8 pb-20 md:pb-28">
        <div className="space-y-10 md:space-y-14">
          {MATERIALS.map((material, i) => (
            <div
              key={material.name}
              className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-4/3 rounded-md overflow-hidden">
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">{material.name}</h2>
                <ul className="space-y-3">
                  {material.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-ink-soft leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-clay shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface border-t border-line">
        <div className="mx-auto max-w-2xl px-5 sm:px-8 py-16 text-center">
          <h2 className="font-display text-2xl text-ink mb-3">Want the longer version?</h2>
          <p className="text-sm text-ink-soft mb-6">
            We wrote a full piece on keeping solid wood furniture looking good for decades.
          </p>
          <Link
            href="/journal/caring-for-solid-wood-furniture"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-clay transition-colors"
          >
            Read the journal entry
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}