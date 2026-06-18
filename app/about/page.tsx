import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FounderStory from "@/components/FounderStory";
import Stats from "@/components/Stats";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "@/components/Reveal";
import {
  ShieldIcon,
  LeafIcon,
  BadgeCheckIcon,
  GuaranteeIcon,
  TagIcon,
  BriefcaseIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About SparkClean — Local, Family-Owned GTA Cleaning",
  description:
    "Learn about the family behind Toronto's trusted local cleaning company. Our mission is to deliver spotless homes using safe, green products.",
};

const WHY_US = [
  {
    icon: ShieldIcon,
    title: "Insured & Bonded",
    blurb: "Full liability coverage for complete peace of mind during every single visit.",
  },
  {
    icon: LeafIcon,
    title: "Eco-Friendly",
    blurb: "We use non-toxic, biodegradable products that are safe for kids and pets.",
  },
  {
    icon: BadgeCheckIcon,
    title: "Background-Checked",
    blurb: "Every member of our cleaning staff is vetted and thoroughly screened.",
  },
  {
    icon: GuaranteeIcon,
    title: "100% Guarantee",
    blurb: "If you are not completely satisfied with our service, we will re-clean it for free.",
  },
  {
    icon: TagIcon,
    title: "Instant Pricing",
    blurb: "No callbacks or waiting times. Get your exact estimate and book online in seconds.",
  },
  {
    icon: BriefcaseIcon,
    title: "Family-Owned",
    blurb: "We operate locally and care deeply about the GTA communities we serve.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. PageHero */}
      <PageHero
        eyebrow="ABOUT US"
        title="Local, and we act like it."
        intro="We are a local, family-owned cleaning company dedicated to providing premium care for households throughout the Greater Toronto Area. Our commitment is simple: safe products, consistent quality, and trusted service."
      />

      {/* 2. FounderStory */}
      <FounderStory showLink={false} />

      {/* 3. Why choose SparkClean trust grid */}
      <section className="w-full bg-surface py-16 sm:py-20 border-t border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block">
              OUR PROMISE
            </RevealEyebrow>
            <RevealHeading
              text="Why GTA families choose us."
              className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl leading-[1.05]"
            />
            <RevealSubtext className="mt-3 text-base text-muted">
              We focus on detail, safety, and reliability to keep your home feeling its best.
            </RevealSubtext>
          </div>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => {
              const Icon = item.icon;
              return (
                <RevealItem
                  key={item.title}
                  className="flex flex-col p-8 rounded-[var(--radius)] border border-[var(--color-border)] bg-white shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)] hover:shadow-[0_18px_44px_-14px_rgba(15,26,23,0.18)] hover:-translate-y-1 transition-all duration-300"
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

      {/* 4. Stats band */}
      <Stats />

      {/* 5. Reviews */}
      <Reviews showLink={false} />

      {/* 6. FAQ accordion */}
      <FAQ />

      {/* 7. CTABanner */}
      <CTABanner />
    </div>
  );
}
