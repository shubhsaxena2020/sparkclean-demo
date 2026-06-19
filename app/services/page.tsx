import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import ServiceScenes from "@/components/ServiceScenes";
import Calculator from "@/components/Calculator";
import CTABanner from "@/components/CTABanner";
import { RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "@/components/Reveal";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Cleaning Services in the GTA | SparkClean",
  description:
    "Cleaning service quote page for Toronto homes with clear scope, transparent estimates, and checklist-based service options.",
};

const PLANS = [
  {
    name: "Standard Clean",
    blurb: "Perfect for regular upkeep. Up to a tidy 1-2 bedroom home.",
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
    blurb: "End-of-tenancy detail. Built to support inspection readiness.",
    includes: ["Everything in Deep", "Inside cabinets", "Closets", "Appliances"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen ambient-bg">
      <PageHero
        eyebrow="WHAT WE CLEAN"
        title="Cleaning services for every Toronto home."
        intro="Choose the scope first, then request a quote with home size, timing, access notes, and service details. SparkClean reviews the request before confirming final availability."
      />

      <Services showLink={false} />
      <ServiceScenes />

      <section className="w-full border-b border-t border-[var(--color-border)] bg-surface py-24 sm:py-32 lg:py-36">
        <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="relative flex flex-col justify-start lg:col-span-5">
              <span className="pointer-events-none absolute -left-4 -top-16 select-none font-display text-[9rem] font-black leading-none text-primary/[0.04]">
                03
              </span>
              <RevealEyebrow className="relative z-10 block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                What Is Included
              </RevealEyebrow>
              <RevealHeading
                text="Detailed checklists for every clean."
                className="relative z-10 mt-2 text-3xl font-black leading-[1.03] tracking-[-0.02em] text-ink text-balance sm:text-5xl"
                as="h2"
              />
              <RevealSubtext className="relative z-10 mt-4 text-base leading-relaxed text-muted">
                Compare the main service tiers and choose the checklist that best matches the level of cleaning you need.
              </RevealSubtext>

              <RevealSubtext delay={0.15} className="relative mt-8 block" as="div">
                <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white p-3 shadow-[0_15px_35px_-15px_rgba(21,19,13,0.15)] transition-[border-color,box-shadow] duration-300 hover:border-primary/45 hover:shadow-[0_25px_50px_-20px_rgba(217,155,0,0.22)] sm:aspect-[4/3]">
                  <div className="relative h-full w-full overflow-hidden rounded-[18px]">
                    <Image
                      src="/img/results3.webp"
                      alt="Spotless minimalist bathroom with fresh rolled towels"
                      fill
                      sizes="(max-width: 1024px) 100vw, 440px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </RevealSubtext>
            </div>

            <div className="lg:col-span-7">
              <RevealGroup className="flex flex-col gap-6 sm:gap-8">
                {PLANS.map((plan) => {
                  const isFeatured = plan.name === "Deep Clean";
                  return (
                    <RevealItem
                      key={plan.name}
                      className={`rounded-[24px] border p-6 shadow-[0_8px_24px_-10px_rgba(15,26,23,0.06)] transition-[border-color,box-shadow,background-color] duration-300 sm:p-8 ${
                        isFeatured
                          ? "border-2 border-primary/30 bg-[var(--color-surface)] shadow-[0_12px_30px_-10px_rgba(217,155,0,0.12)]"
                          : "border-[var(--color-border)] bg-white"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
                        {isFeatured && (
                          <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-[var(--color-ink)]">
                            Recommended Starting Clean
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted">{plan.blurb}</p>

                      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-[var(--color-border)] pt-4 sm:grid-cols-3">
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

      <Calculator />
      <CTABanner />
    </div>
  );
}
