export interface JournalEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  cover: string;
  body: string[];
}

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    slug: "caring-for-solid-wood-furniture",
    title: "How to care for solid wood furniture, for the next 30 years",
    excerpt:
      "Solid wood ages instead of wearing out — but only if you treat it right. A few habits that make the difference over decades, not months.",
    category: "Care guides",
    date: "2026-06-02",
    readTime: "5 min read",
    cover: "https://images.unsplash.com/photo-1692451438819-24d1ac92c3eb?q=80&w=2046&auto=format&fit=crop",
    body: [
      "Solid wood furniture doesn't wear out the way particleboard does — it ages. Left alone with a bit of light and use, oak and walnut both deepen in color over the first few years, developing a patina that veneer simply can't replicate. But that aging process only goes well if you give the wood a little help along the way.",
      "Keep it out of direct sun where you can. UV light is the single biggest cause of uneven fading — a rug or a plant moved every few months does more for a tabletop's color than any polish. Humidity matters almost as much: wood expands and contracts with moisture in the air, so a consistent indoor climate (whatever it is) will always beat wild seasonal swings for keeping joints tight.",
      "For day-to-day care, a dry or barely-damp cloth is almost always enough. Avoid silicone-based sprays, which build up a film over time and are a nightmare to strip later. Every six months or so, a small amount of food-safe mineral oil rubbed into any exposed end-grain will keep it from drying out and cracking — this matters most on cutting boards and butcher-block surfaces, less on a finished dining table.",
      "Scratches happen, and on solid wood they're almost always fixable. A light scuff can often be buffed out with a matching wood wax; deeper scratches can be sanded and re-oiled by hand without needing to refinish the whole piece — one more reason solid wood tends to outlast everything else in the room.",
    ],
  },
  {
    slug: "small-batch-vs-mass-produced",
    title: "What 'small-batch' actually means (and why it costs more)",
    excerpt:
      "It's not just a marketing word. Here's what actually changes when six people make a hundred lamps instead of a factory making a hundred thousand.",
    category: "Behind the craft",
    date: "2026-05-14",
    readTime: "4 min read",
    cover: "https://images.unsplash.com/photo-1567016546367-c27a0d56712e?q=80&w=2070&auto=format&fit=crop",
    body: [
      "\"Small-batch\" gets used loosely enough in retail that it's worth explaining what it actually means for the pieces we carry. At Barro Studio, for example, a batch of table lamp bases is somewhere between 20 and 40 pieces — thrown, trimmed, and glazed by two people over roughly two weeks, versus a comparable factory run of the same design that might produce that many units in an afternoon.",
      "The practical result is variation. Each base comes off the wheel very slightly differently — a few grams lighter, a curve a touch more pronounced — and the glaze pools differently depending on exactly how it was dipped and where it sat in the kiln. None of this is a flaw; it's the actual signature of a piece made by a hand rather than a mold.",
      "It also means slower restocks, and occasionally a wait. When a piece sells out, we can't just place a bigger purchase order — the maker has to throw, fire, and glaze another batch, which for ceramics alone can take three to four weeks between the wheel and the kiln. We think that trade-off is worth it, and most of what we hear back from customers agrees. But it does mean checking back if something is temporarily out of stock is sometimes the only option.",
    ],
  },
  {
    slug: "building-a-room-slowly",
    title: "The case for furnishing a room slowly",
    excerpt:
      "Buying everything for a room at once almost always means buying the wrong things. A slower approach, piece by piece, usually ends somewhere better.",
    category: "Design notes",
    date: "2026-04-22",
    readTime: "6 min read",
    cover: "https://images.unsplash.com/photo-1632120377007-c2adc3017b1e?q=80&w=2080&auto=format&fit=crop",
    body: [
      "There's a particular kind of room that looks finished the day you move in and never really changes after that — matched sets, a single trip to one store, everything purchased against a deadline. It usually looks fine in photos and a little flat in person, because nothing in it was actually chosen against anything else.",
      "The rooms that tend to hold up over years are almost always built the opposite way: a chair found first, then a rug that works with it, then a lamp picked specifically because the first two pieces left a gap for it. Each choice gets to react to what's already there, which is a much higher bar than matching a catalog photo.",
      "This is slower, and it means living with an unfinished room for longer than feels comfortable at first. But an empty corner is a much better problem than a wrong piece of furniture you're stuck with for the next decade. Buy the pieces you're sure about, and let the rest wait until you find something actually worth the space.",
    ],
  },
];