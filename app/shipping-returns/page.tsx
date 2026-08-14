import Link from "next/link";
import { Truck, Undo2, RefreshCw, PackageCheck } from "lucide-react";
import Accordion from "@/components/accordion";

export const metadata = { title: "Shipping & Returns — Ferrous & Field" };

const HIGHLIGHTS = [
  { icon: Truck, title: "Free shipping over $100", copy: "Every order under that ships for a flat $12." },
  { icon: PackageCheck, title: "5–10 business days", copy: "Most pieces ship within 2 days and arrive within 10." },
  { icon: Undo2, title: "30-day returns", copy: "Unused pieces in original packaging, no questions asked." },
  { icon: RefreshCw, title: "Free exchanges", copy: "Wrong size or color? We'll swap it at no extra cost." },
];

const SHIPPING_FAQ = [
  {
    question: "How long does shipping take?",
    answer:
      "Small items (lighting, decor, textiles) typically ship within 1–2 business days and arrive within 3–7 days. Furniture is made-to-order in small batches by our partner studios, so it can take 1–3 weeks to leave the workshop, plus 5–10 business days in transit. Exact estimates are shown on each product page.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently we ship within the continental United States and Canada. We're working on expanding — if you're outside this area, reach out through the contact page and we'll let you know as soon as it's available in your region.",
  },
  {
    question: "How is furniture packaged?",
    answer:
      "Larger pieces ship in reinforced cardboard with corner protection and, where needed, wooden crating for extra-fragile items like glass lighting. We ask that you inspect the packaging before signing for delivery — note any visible damage with the carrier so we can resolve it quickly.",
  },
  {
    question: "Can I change my shipping address after ordering?",
    answer:
      "If your order hasn't shipped yet, contact us as soon as possible and we'll do our best to update it. Once a carrier has picked up the package, we're no longer able to redirect it — you'll need to coordinate with the carrier directly or arrange a return once it arrives.",
  },
];

const RETURNS_FAQ = [
  {
    question: "What's your return policy?",
    answer:
      "You have 30 days from delivery to return a piece for a full refund, provided it's unused and in its original packaging. Custom or made-to-order pieces (noted on the product page) aren't eligible for return unless they arrive damaged or defective.",
  },
  {
    question: "How do I start a return?",
    answer:
      "Sign in and visit your order history, or reach out through the contact page with your order number. We'll send a prepaid return label for defective or incorrect items; for change-of-mind returns, return shipping is deducted from the refund unless you're exchanging for store credit.",
  },
  {
    question: "When will I get my refund?",
    answer:
      "Once your return arrives at our warehouse, it's inspected within 2–3 business days and the refund is issued to your original payment method. Depending on your bank, it can take an additional 3–5 business days to appear on your statement.",
  },
  {
    question: "What if my item arrives damaged?",
    answer:
      "Contact us within 48 hours of delivery with a couple of photos of the damage and the packaging. We'll send a replacement or full refund right away — no need to return the damaged item unless we ask for it.",
  },
];

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.28em] uppercase text-clay font-medium mb-3">
          The practical details
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink text-balance">
          Shipping &amp; returns
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {HIGHLIGHTS.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="text-center rounded-md border border-line bg-surface p-4">
            <Icon size={18} strokeWidth={1.5} className="text-clay mx-auto mb-2.5" />
            <p className="text-xs font-medium text-ink leading-snug">{title}</p>
            <p className="text-[11px] text-ink-soft mt-1 leading-snug">{copy}</p>
          </div>
        ))}
      </div>

      <section className="mb-14">
        <h2 className="font-display text-2xl text-ink mb-5">Shipping</h2>
        <Accordion items={SHIPPING_FAQ} />
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-5">Returns &amp; exchanges</h2>
        <Accordion items={RETURNS_FAQ} />
      </section>

      <div className="mt-14 rounded-xl border border-line bg-surface p-7 text-center">
        <p className="text-sm text-ink-soft mb-4">
          Already placed an order and want to check on it?
        </p>
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 text-sm font-medium hover:bg-clay-dark transition-colors"
        >
          Track an order
        </Link>
      </div>
    </div>
  );
}