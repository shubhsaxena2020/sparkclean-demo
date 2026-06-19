import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FounderStory from "@/components/FounderStory";
import Stats from "@/components/Stats";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import { RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "@/components/Reveal";
import {
  ShieldIcon,
  LeafIcon,
  BadgeCheckIcon,
  GuaranteeIcon,
  TagIcon,
  BriefcaseIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About SparkClean - Toronto Cleaning Quote Process",
  description:
    "Learn how SparkClean handles Toronto home cleaning quote requests, scope confirmation, product preferences, access notes, and issue reporting.",
};

const WHY_US = [
  {
    icon: ShieldIcon,
    title: "Written Scope",
    blurb: "Your quote summary includes service type, home size, frequency, access notes, and special requests before confirmation.",
  },
  {
    icon: LeafIcon,
    title: "Product Preferences",
    blurb: "Use the quote notes to flag allergies, pets, fragrance sensitivity, or client-provided supplies.",
  },
  {
    icon: BadgeCheckIcon,
    title: "Cleaner Expectations",
    blurb: "Availability replies can clarify arrival windows, supply handling, recurring-team availability, and access rules.",
  },
  {
    icon: GuaranteeIcon,
    title: "24-Hour Issue Window",
    blurb: "Missed details can be reported within 24 hours with photos so the concern can be reviewed quickly.",
  },
  {
    icon: TagIcon,
    title: "Transparent Estimate",
    blurb: "The estimate updates before you send the request, then final pricing is confirmed from the written scope.",
  },
  {
    icon: BriefcaseIcon,
    title: "Local Availability",
    blurb: "Service depends on postal code, route capacity, access requirements, and the requested cleaning scope.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen ambient-bg">
      <PageHero
        eyebrow="ABOUT US"
        title="A quote-first cleaning process for Toronto homes."
        intro="SparkClean keeps the request clear before anyone arrives: estimate, scope, location, access notes, product preferences, and next steps are captured in writing."
      />

      <FounderStory showLink={false} />

      <section className="w-full border-b border-t border-[var(--color-border)] bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <RevealEyebrow className="block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              What You Can Expect
            </RevealEyebrow>
            <RevealHeading
              text="Less guessing before cleaning day."
              className="mt-2 text-3xl font-extrabold leading-[1.05] tracking-tight text-ink text-balance sm:text-4xl"
            />
            <RevealSubtext className="mt-3 text-base text-muted">
              The site avoids invented ratings or broad guarantees. It focuses on clear scope and written confirmation.
            </RevealSubtext>
          </div>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => {
              const Icon = item.icon;
              return (
                <RevealItem
                  key={item.title}
                  className="flex flex-col rounded-[var(--radius)] border border-[var(--color-border)] bg-white p-8 shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-14px_rgba(15,26,23,0.18)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface text-primary">
                    <Icon width={24} height={24} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.blurb}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <Stats />
      <Reviews showLink={false} />
      <FAQ />
      <CTABanner />
    </div>
  );
}
