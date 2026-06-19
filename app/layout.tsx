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
  title: "SparkClean - Toronto Cleaning Quote Website Template",
  description:
    "A premium, conversion-ready cleaning website template with quote intake, transparent estimates, policy modules, and service-area proof slots.",
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
    title: "SparkClean - Toronto Cleaning Quote Website Template",
    description:
      "Transparent estimates, quote intake, policy modules, and proof-ready design for a local cleaning business.",
    url: "/",
    siteName: "SparkClean",
    type: "website",
    images: [
      {
        url: "/img/hero.jpg",
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
      "A client-ready cleaning website experience with quote intake and trust-first conversion design.",
    images: ["/img/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#063D2E",
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
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
