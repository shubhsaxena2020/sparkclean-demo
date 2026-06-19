import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SparkClean - Toronto Home Cleaning Quotes",
  description:
    "Request a Toronto and GTA home cleaning quote with transparent estimates, clear service scope, and postal-code availability checks.",
  keywords: [
    "Toronto cleaning service website",
    "GTA house cleaning quote",
    "cleaning service booking website",
    "deep clean Toronto",
    "move-out cleaning quote",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SparkClean - Toronto Home Cleaning Quotes",
    description:
      "Transparent estimates, quote intake, service scope, and availability checks for local home cleaning.",
    url: "/",
    siteName: "SparkClean",
    type: "website",
    images: [
      {
        url: "/img/hero.webp",
        width: 1200,
        height: 1200,
        alt: "Professionally cleaned bright home interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SparkClean - Toronto Cleaning Quote Website Template",
    description:
      "Request a Toronto and GTA home cleaning quote with service details and clear next steps.",
    images: ["/img/hero.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#15130D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-[var(--color-ink)]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
