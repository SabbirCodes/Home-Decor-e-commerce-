import type { ReactNode } from "react";
import { Fraunces, Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AppToaster } from "@/components/toaster";
import { serverFetch } from "@/lib/serverFetch";
import type { ISiteSettings } from "@/types";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

const FALLBACK_SITE_NAME = "Ferrous & Field";
const DESCRIPTION =
  "Considered furniture, lighting, and objects for a home that feels made, not furnished.";

async function getSiteName() {
  try {
    const data = await serverFetch<{ settings: ISiteSettings }>("/api/settings");
    return data?.settings?.siteName || FALLBACK_SITE_NAME;
  } catch {
    return FALLBACK_SITE_NAME;
  }
}

export async function generateMetadata() {
  const siteName = await getSiteName();
  const title = `${siteName} — Home Decor Atelier`;

  return {
    title,
    description: DESCRIPTION,
    openGraph: {
      title,
      description: DESCRIPTION,
      siteName,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "bn_BD",
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const siteName = await getSiteName();

  return (
    <html lang="en" className={`${fraunces.variable} ${poppins.variable} ${plexMono.variable}`}>
      <body className="antialiased font-sans">
        <Providers>
          <Navbar siteName={siteName} />
          <main className="min-h-screen">{children}</main>
          <Footer siteName={siteName} />
          <AppToaster />
        </Providers>
      </body>
    </html>
  );
}