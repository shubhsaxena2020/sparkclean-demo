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
  title: "About SparkClean - Trust-Ready Cleaning Website Template",
  description:
    "See how SparkClean structures trust, policies, cleaner safety, and proof slots for a client-ready cleaning service website.",
};

const WHY_US = [
  {
    icon: ShieldIcon,
    title: "Insurance Proof Slot",
    blurb: "Add the client's actual insurer, certificate summary, and coverage limits before publishing this claim.",
  },
  {
    icon: LeafIcon,
    title: "Product Safety Policy",
    blurb: "List product standards, supply defaults, allergy notes, and pet-safe handling in plain language.",
  },
  {
    icon: BadgeCheckIcon,
    title: "Cleaner Vetting Slot",
    blurb: "Explain screening, training, supervision, access handling, and replacement policy with real client operations.",
  },
  {
    icon: GuaranteeIcon,
    title: "Re-Clean Policy",
    blurb: "Define the service window, eligible issues, photo/request process, and response time for missed areas.",
  },
  {
    icon: TagIcon,
    title: "Transparent Estimate",
    blurb: "Show a credible estimate first, then explain what can change the final confirmed quote.",
  },
  {
    icon: BriefcaseIcon,
    title: "Local Identity Slot",
    blurb: "Add the real founder, business address, service base, hours, and response-time expectations.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen ambient-bg">
      <PageHero
        eyebrow="ABOUT US"
        title="Trust infrastructure before trust claims."
        intro="This page is shaped for a real cleaning client to add verified business identity, proof of coverage, product safety, staff policies, and a clear re-clean process before launch."
      />

      <FounderStory showLink={false} />

      <section className="w-full bg-surface py-16 sm:py-20 border-t border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block">
              TRUST MODULES
            </RevealEyebrow>
            <RevealHeading
              text="What a real client must verify."
              className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl leading-[1.05]"
            />
            <RevealSubtext className="mt-3 text-base text-muted">
              These modules prevent the website from pretending. Each slot should be filled with real operating proof before production.
            </RevealSubtext>
          </div>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => {
              const Icon = item.icon;
              return (
                <RevealItem
                  key={item.title}
                  className="flex flex-col p-8 rounded-[var(--radius)] border border-[var(--color-border)] bg-white shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)] hover:shadow-[0_18px_44px_-14px_rgba(15,26,23,0.18)] hover:-translate-y-1 transition-[box-shadow,transform] duration-300"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface text-primary">
                    <Icon width={24} height={24} />
                  </span>
                  <h3 className="mt-4 font-bold text-ink text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{item.blurb}</p>
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
