import Link from "next/link";
import { Mail } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dusk text-cream/90 mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <span className="font-display italic text-2xl">Ferrous &amp; Field</span>
            <p className="mt-4 text-sm text-cream/50 max-w-xs leading-relaxed">
              Considered furniture, lighting, and objects — sourced from makers who work
              in small batches, built to outlast trend cycles.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[FaInstagram, FaFacebookF, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 hover:border-clay hover:text-clay transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li><Link href="/products?category=Furniture" className="hover:text-clay transition-colors">Furniture</Link></li>
              <li><Link href="/products?category=Lighting" className="hover:text-clay transition-colors">Lighting</Link></li>
              <li><Link href="/products?category=Decor" className="hover:text-clay transition-colors">Decor</Link></li>
              <li><Link href="/products?category=Textiles" className="hover:text-clay transition-colors">Textiles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-4">Help</h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li><Link href="/account/orders" className="hover:text-clay transition-colors">Track an order</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-clay transition-colors">Shipping &amp; returns</Link></li>
              <li><Link href="/care-guide" className="hover:text-clay transition-colors">Care guide</Link></li>
              <li><Link href="/contact-us" className="hover:text-clay transition-colors">Contact us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-4">Studio</h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li><Link href="/about" className="hover:text-clay transition-colors">Our story</Link></li>
              <li><Link href="/makers" className="hover:text-clay transition-colors">Makers</Link></li>
              <li><Link href="/journal" className="hover:text-clay transition-colors">Journal</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-cream/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-cream/35">
          <span>© {new Date().getFullYear()} Ferrous &amp; Field. All rights reserved.</span>
          <span className="font-mono">Made with care, shipped with patience.</span>
        </div>
      </div>
    </footer>
  );
}