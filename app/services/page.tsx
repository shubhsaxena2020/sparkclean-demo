import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import CTABanner from "@/components/CTABanner";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "@/components/Reveal";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Cleaning Services in the GTA | SparkClean",
  description:
    "Professional, eco-friendly house cleaning services tailored to your needs. Discover our standard, deep, and move-in/move-out options in Toronto.",
};

const PLANS = [
  {
    name: "Standard Clean",
    blurb: "Perfect for regular upkeep. Up to a tidy 1–2 bedroom home.",
    includes: ["Dusting", "Vacuum & mop", "Kitchen", "Bathrooms", "7-day rebook"],
  },
  {
    name: "Deep Clean",
    blurb: "The full reset. Ideal for first cleans and seasonal refreshes.",
    includes: [
      "Everything in Standard",
      "Inside oven",
      "Inside fridge",
      "Baseboards",
      "Window sills",
    ],
  },
  {
    name: "Move-In / Move-Out",
    blurb: "End-of-tenancy detail. Built to pass inspection.",
    includes: ["Everything in Deep", "Inside cabinets", "Closets", "Appliances"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. PageHero */}
      <PageHero
        eyebrow="WHAT WE CLEAN"
        title="Cleaning services for every Toronto home."
        intro="We provide custom cleaning solutions designed to elevate your living environment. Whether you need a standard refresh or a detailed moving clean, our team delivers spotless results."
      />

      {/* 2. Full Services grid */}
      <Services showLink={false} />

      {/* 3. A "What's included" sub-section */}
      <section className="w-full bg-surface border-t border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-2xl text-center">
            <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block">
              WHAT&apos;S INCLUDED
            </RevealEyebrow>
            <RevealHeading
              text="Detailed checklists for every clean."
              className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05]"
            />
            <RevealSubtext className="mt-3 text-lg text-muted">
              We follow a rigorous protocol to ensure every corner of your home sparkles.
            </RevealSubtext>
          </div>

          <RevealGroup className="mt-12 grid gap-8 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <RevealItem
                key={plan.name}
                className="rounded-[var(--radius)] border border-[var(--color-border)] bg-white p-8 shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)]"
              >
                <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted">{plan.blurb}</p>
                <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                      <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 4. Embed Calculator */}
      <Calculator />

      {/* 5. CTABanner */}
      <CTABanner />
    </div>
  );
}
