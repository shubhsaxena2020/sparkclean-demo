import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sparkclean-gta.vercel.app"),
  title: "SparkClean — Toronto's Trusted Home Cleaning, Booked in 60 Seconds",
  description:
    "Eco-friendly, insured home cleaning trusted across the GTA. Get an instant price and book online in under a minute — no waiting for a callback.",
  keywords: [
    "Toronto cleaning service",
    "GTA house cleaning",
    "eco-friendly cleaning",
    "deep clean Toronto",
    "move-out cleaning",
  ],
  openGraph: {
    title: "SparkClean — Toronto's Trusted Home Cleaning",
    description:
      "Instant pricing, eco-friendly, insured. Book your GTA home clean in 60 seconds.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#00ff87",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <CustomCursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
