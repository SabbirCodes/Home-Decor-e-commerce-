import { Truck, Undo2, Leaf, ShieldCheck } from "lucide-react";

const VALUES = [
  { icon: Truck, title: "Free shipping", copy: "On orders over $100" },
  { icon: Undo2, title: "30-day returns", copy: "No questions asked" },
  { icon: Leaf, title: "Responsibly sourced", copy: "FSC-certified materials" },
  { icon: ShieldCheck, title: "2-year warranty", copy: "On all furniture" },
];

export default function ValueStrip() {
  return (
    <section className="border-b border-line bg-surface/50">
      <div
        className="
          mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4
          [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-line
          [&>*:nth-child(-n+2)]:border-b [&>*:nth-child(-n+2)]:border-line
          md:[&>*:nth-child(odd)]:border-r-0
          md:[&>*:nth-child(-n+2)]:border-b-0
          md:divide-x md:divide-line
        "
      >
        {VALUES.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-center gap-2.5 sm:gap-3 py-5 sm:py-6 px-3 sm:px-4 md:px-6">
            <Icon size={18} strokeWidth={1.5} className="text-clay shrink-0 sm:w-5 sm:h-5" />
            <div className="min-w-0">
              <p className="text-xs sm:text-[13px] font-medium text-ink leading-snug">{title}</p>
              <p className="text-[10px] sm:text-[11px] text-ink-soft leading-snug">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}