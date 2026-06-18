import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import CTABanner from "@/components/CTABanner";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "@/components/Reveal";
import { CheckIcon } from "@/components/icons";
import Image from "next/image";

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
      <section className="w-full bg-surface border-t border-b border-[var(--color-border)] py-24 sm:py-32 lg:py-36">
        <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 items-start">
            
            {/* Left Column: Heading, Subtext, and large image */}
            <div className="lg:col-span-5 flex flex-col justify-start relative">
              <span className="absolute -top-16 -left-4 font-display text-[9rem] font-black text-primary/[0.04] leading-none pointer-events-none select-none">
                03
              </span>
              <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block relative z-10">
                WHAT&apos;S INCLUDED
              </RevealEyebrow>
              <RevealHeading
                text="Detailed checklists for every clean."
                className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05] relative z-10"
                as="h2"
              />
              <RevealSubtext className="mt-4 text-base text-muted leading-relaxed relative z-10">
                We follow a rigorous protocol to ensure every corner of your home sparkles. Select the plan that best fits your needs.
              </RevealSubtext>

              <RevealSubtext delay={0.15} className="mt-8 relative block">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-[var(--color-border)] shadow-[0_15px_35px_-15px_rgba(15,26,23,0.15)] bg-white p-3">
                  <div className="relative w-full h-full overflow-hidden rounded-[18px]">
                    <Image
                      src="/img/results3.jpg"
                      alt="Spotless minimalist bathroom with fresh rolled towels"
                      fill
                      sizes="(max-width: 1024px) 100vw, 440px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </RevealSubtext>
            </div>

            {/* Right Column: Stacked plans checklists */}
            <div className="lg:col-span-7">
              <RevealGroup className="flex flex-col gap-6 sm:gap-8">
                {PLANS.map((plan, i) => {
                  const isFeatured = plan.name === "Deep Clean";
                  return (
                    <RevealItem
                      key={plan.name}
                      className={`rounded-[24px] border p-6 sm:p-8 shadow-[0_8px_24px_-10px_rgba(15,26,23,0.06)] transition-all duration-300 ${
                        isFeatured
                          ? "border-2 border-primary/25 bg-[#F2FBF7] shadow-[0_12px_30px_-10px_rgba(15,182,126,0.08)]"
                          : "border-[var(--color-border)] bg-white"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
                        {isFeatured && (
                          <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-white">
                            Recommended Starting Clean
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted">{plan.blurb}</p>
                      
                      <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 border-t border-[var(--color-border)] pt-4">
                        {plan.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs font-semibold text-ink">
                            <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Embed Calculator */}
      <Calculator />

      {/* 5. CTABanner */}
      <CTABanner />
    </div>
  );
}
