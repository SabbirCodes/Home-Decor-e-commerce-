import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { serverFetch } from "@/lib/serverFetch";
import ContactForm from "@/components/contact-form";
import type { ISiteSettings } from "@/types";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await serverFetch<{ settings: ISiteSettings }>("/api/settings");
  const siteName = data?.settings?.siteName || "Ferrous & Field";
  return { title: `Contact Us — ${siteName}` };
}

export default async function ContactPage() {
  const data = await serverFetch<{ settings: ISiteSettings }>("/api/settings");
  const settings = data?.settings;

  const CONTACT_DETAILS = [
    {
      icon: Mail,
      label: "Email",
      value: settings?.email || "hello@ferrousfield.com",
      href: settings?.email ? `mailto:${settings.email}` : null,
    },
    {
      icon: Phone,
      label: "Phone",
      value: settings?.phone || "",
      href: settings?.phone ? `tel:${settings.phone.replace(/[^+\d]/g, "")}` : null,
    },
    {
      icon: MapPin,
      label: "Studio",
      value: settings?.location || "",
      href: settings?.locationMapUrl || null,
    },
    {
      icon: Clock,
      label: "Hours",
      value: settings?.hours || "",
      href: null,
    },
  ].filter((d) => d.value);

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 py-14 md:py-20">
      <div className="text-center max-w-xl mx-auto mb-14">
        <p className="text-xs tracking-[0.28em] uppercase text-clay font-medium mb-3">
          We&apos;d love to hear from you
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink text-balance">
          Get in touch
        </h1>
        <p className="mt-5 text-[15px] text-ink-soft leading-relaxed">
          Questions about an order, a piece in the collection, or just want to
          say hello — the form below reaches our small team directly.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-10 md:gap-16">
        <div className="md:col-span-2 space-y-6">
          {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay/10">
                  <Icon size={17} strokeWidth={1.5} className="text-clay" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-soft mb-1">
                    {label}
                  </p>
                  <p className="text-sm text-ink leading-snug">{value}</p>
                </div>
              </div>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="block hover:opacity-70 transition-opacity"
              >
                {content}
              </a>
            ) : (
              <div key={label}>{content}</div>
            );
          })}
        </div>

        <div className="md:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}