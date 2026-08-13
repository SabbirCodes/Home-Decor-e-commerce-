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
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
        {VALUES.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-center gap-3 py-6 px-4 sm:px-6">
            <Icon size={20} strokeWidth={1.5} className="text-clay shrink-0" />
            <div>
              <p className="text-[13px] font-medium text-ink">{title}</p>
              <p className="text-[11px] text-ink-soft">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
