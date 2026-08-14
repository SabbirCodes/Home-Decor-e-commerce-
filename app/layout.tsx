import type { ReactNode } from "react";
import { Fraunces, Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AppToaster } from "@/components/toaster";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Ferrous & Field — Home Decor Atelier",
  description:
    "Considered furniture, lighting, and objects for a home that feels made, not furnished.",

  openGraph: {
    title: "Ferrous & Field — Home Decor Atelier",
    description: "Considered furniture, lighting, and objects for a home that feels made, not furnished.",
    siteName: "Ferrous & Field",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ferrous & Field — Home Decor Atelier",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${poppins.variable} ${plexMono.variable}`}>
      <body className="antialiased font-sans">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <AppToaster />
        </Providers>
      </body>
    </html>
  );
}
