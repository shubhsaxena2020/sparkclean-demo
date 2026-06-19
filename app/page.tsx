import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import ServiceAreas from "@/components/ServiceAreas";
import Gallery from "@/components/Gallery";
import FounderStory from "@/components/FounderStory";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "SparkClean — Toronto's Trusted Home Cleaning, Booked in 60 Seconds",
  description:
    "Eco-friendly, insured home cleaning trusted across the GTA. Get an instant price and book online in under a minute — no waiting for a callback.",
};

export default function Home() {
  return (
    <div className="ambient-bg min-h-screen">
      {/* Brand Thesis & Hero (Before/After comparison slider integrated inside) */}
      <Hero />
      
      {/* Subtle Trust Line */}
      <TrustBar />

      {/* Luxury Bento Grid Area */}
      <section className="mx-auto max-w-[var(--maxw)] px-4 py-16 sm:px-6 relative z-10">
        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Bento Block 1: Calculator Widget (width: 2 columns) */}
          <div className="bento-panel md:col-span-2 p-1.5 flex flex-col justify-between bg-white/40 backdrop-blur-xl">
            <div className="p-6 pb-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block mb-2">Instant Pricing Builder</span>
              <h2 className="font-display text-3xl font-extrabold text-ink leading-tight">Customize Your Clean</h2>
              <p className="mt-2 text-sm text-muted">Adjust frequency, bedrooms, and bathrooms for your real-time quote.</p>
            </div>
            <Calculator />
          </div>

          {/* Bento Block 2: Trust Card & Stats (width: 1 column) */}
          <div className="bento-panel p-8 flex flex-col justify-between bg-primary/[0.02] border border-primary/10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block mb-2">Why SparkClean</span>
              <h2 className="font-display text-3xl font-extrabold text-ink leading-tight">Toronto&apos;s Elite Choice</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                We design home cleaning programs that match luxury residential standards. Safe eco-certified solutions, meticulous background screening, and local family oversight.
              </p>
            </div>
            <div className="mt-8 border-t border-[var(--color-border)] pt-6 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-display font-extrabold text-primary">4.9★</span>
                <span className="text-xs font-bold text-ink leading-tight">Average Google Rating across 500+ GTA booked cleans</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-display font-extrabold text-primary">100%</span>
                <span className="text-xs font-bold text-ink leading-tight">Satisfaction guarantee with 24-hour service warranty</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Grid Section */}
      <Services showLink={true} />

      {/* Stats Band */}
      <Stats />

      {/* How it Works */}
      <HowItWorks />

      {/* Pricing packages */}
      <Pricing />

      {/* Client Reviews */}
      <Reviews showLink={true} />

      {/* Service Neighborhoods */}
      <ServiceAreas showLink={true} />

      {/* Gallery showing standard results */}
      <Gallery />

      {/* Founder story and brand promise */}
      <FounderStory showLink={true} />

      {/* Bottom Conversion CTA banner */}
      <CTABanner />
    </div>
  );
}
