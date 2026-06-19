import type { Metadata } from "next";
import Image from "next/image";
import BeforeAfter from "@/components/BeforeAfter";
import FAQ from "@/components/FAQ";
import PremiumBackground3D from "@/components/PremiumBackground3D";
import QuoteForm from "@/components/QuoteForm";
import Services from "@/components/Services";
import { CheckIcon, ShieldIcon, LeafIcon, BadgeCheckIcon, GuaranteeIcon } from "@/components/icons";
import { BOOKING_URL, PROOF_ITEMS, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "SparkClean Toronto | Quote-Ready Home Cleaning Website",
  description:
    "A conversion-ready cleaning service experience for the GTA: transparent estimates, service-area proof slots, booking intake, policies, and trust-first design.",
};

const HERO_POINTS = [
  "Transparent estimates before the first call",
  "Cleaner vetting, re-clean, and access policies built in",
  "Proof slots for Google reviews, insurance, and service-area evidence",
];

const PROCESS = [
  {
    title: "Estimate the clean",
    body: "Visitors choose service, home size, and frequency before sharing contact details.",
  },
  {
    title: "Confirm the scope",
    body: "The request captures postal code, preferred timing, access notes, pets, parking, and special instructions.",
  },
  {
    title: "Dispatch with proof",
    body: "A real client can connect scheduling, payment, Google reviews, and insurance proof without changing the page structure.",
  },
];

const POLICY_CARDS = [
  {
    icon: ShieldIcon,
    title: "Insurance Proof Slot",
    body: "Show the actual policy provider, coverage summary, and certificate link before visitors trust a claim.",
  },
  {
    icon: BadgeCheckIcon,
    title: "Vetted Cleaner Policy",
    body: "Explain screening, training, repeat teams, and what happens if a cleaner is replaced.",
  },
  {
    icon: GuaranteeIcon,
    title: "24-Hour Re-Clean",
    body: "Define what is covered, how to report an issue, and when the team returns.",
  },
  {
    icon: LeafIcon,
    title: "Product Safety",
    body: "List product standards and pet/kid-safe defaults instead of vague eco-friendly claims.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SparkClean quote-ready cleaning website template",
  serviceType: "Residential cleaning quote intake",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Greater Toronto Area",
  },
  provider: {
    "@type": "Organization",
    name: "SparkClean",
    url: SITE_URL,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning services",
    itemListElement: [
      "Standard recurring cleaning",
      "Deep cleaning",
      "Move-in and move-out cleaning",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
      },
    })),
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen text-[var(--color-ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="relative z-10 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-70">
          <PremiumBackground3D />
        </div>
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[var(--maxw)] items-center gap-12 px-6 pb-12 pt-32 lg:grid-cols-[1.02fr_0.98fr] lg:pt-36">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
            Client-Ready Cleaning Website
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[0.98] text-pretty sm:text-6xl lg:text-7xl">
            A cleaning site that sells trust before it sells sparkle.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            SparkClean is being rebuilt as a launch-ready Toronto cleaning experience:
            real intake, transparent pricing, policy clarity, proof slots, and premium motion that supports conversion.
          </p>
          <ul className="mt-8 grid gap-3">
            {HERO_POINTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-semibold text-[var(--color-ink)]">
                <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={BOOKING_URL}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--color-primary)] px-7 text-sm font-bold text-white shadow-[0_18px_40px_-22px_rgba(6,61,46,0.9)] transition-colors duration-200 hover:bg-[var(--color-primary-d)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30"
            >
              Build My Quote
            </a>
            <a
              href="#proof"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white/80 px-7 text-sm font-bold text-[var(--color-primary)] transition-colors duration-200 hover:border-[var(--color-primary)] hover:bg-white focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20"
            >
              Review Trust System
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white p-3 shadow-[0_30px_90px_-45px_rgba(7,15,12,0.45)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
              <Image
                src="/img/hero.jpg"
                alt="Bright professionally cleaned living room prepared for a home cleaning service hero"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-[var(--color-border)] bg-white/92 p-5 shadow-[0_22px_65px_-35px_rgba(7,15,12,0.45)] backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">Conversion Status</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              The page now routes visitors toward a structured quote request instead of a social DM.
            </p>
          </div>
        </div>
        </div>
      </section>

      <section id="proof" className="relative z-10 border-y border-[var(--color-border)] bg-white/88 py-14">
        <div className="mx-auto grid max-w-[var(--maxw)] gap-8 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">Trust System</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-pretty sm:text-4xl">
              No fake metrics. Only proof a real business can attach.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF_ITEMS.map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                <CheckIcon width={18} height={18} className="text-[var(--color-primary)]" />
                <p className="mt-3 text-sm font-bold leading-6 text-[var(--color-ink)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteForm />

      <section className="relative z-10 mx-auto max-w-[var(--maxw)] px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">Visual Proof</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-pretty sm:text-5xl">
              Before/after proof gets the spotlight, not buried in decoration.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Real client launches should replace these images with actual work, add room type,
              service performed, date, and neighborhood. The layout is ready for that proof.
            </p>
          </div>
          <BeforeAfter />
        </div>
      </section>

      <Services showLink />

      <section className="relative z-10 mx-auto max-w-[var(--maxw)] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">Booking Flow</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-pretty sm:text-5xl">
            The path to booking is finally concrete.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PROCESS.map((item, index) => (
            <article key={item.title} className="rounded-[24px] border border-[var(--color-border)] bg-white p-7 shadow-[0_18px_50px_-35px_rgba(7,15,12,0.35)]">
              <span className="font-display text-5xl font-extrabold text-[var(--color-primary)]/20">0{index + 1}</span>
              <h3 className="mt-5 text-xl font-bold text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 border-y border-[var(--color-border)] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[var(--maxw)] px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">Policies</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-pretty sm:text-5xl">
              Trust claims need operational receipts.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {POLICY_CARDS.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-[var(--color-primary)]">
                    <Icon width={24} height={24} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[var(--color-ink)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
