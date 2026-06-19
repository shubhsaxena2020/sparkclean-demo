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
    "Request a SparkClean home cleaning quote in Toronto and the GTA with transparent estimates, service details, and postal-code availability checks.",
};

const HERO_POINTS = [
  "Transparent estimate before you send the request",
  "Service scope, access notes, pets, and parking captured upfront",
  "Written next steps before any cleaning appointment is confirmed",
];

const PROCESS = [
  {
    title: "Estimate the clean",
    body: "Choose service type, home size, and frequency so the estimate is grounded in the actual job.",
  },
  {
    title: "Confirm the scope",
    body: "Share postal code, preferred timing, access notes, pets, parking, and special instructions.",
  },
  {
    title: "Dispatch with proof",
    body: "SparkClean replies with availability, final scope, and any questions before confirming the visit.",
  },
];

const POLICY_CARDS = [
  {
    icon: ShieldIcon,
    title: "Scope In Writing",
    body: "Every request summarizes the service, room count, access notes, and special instructions before confirmation.",
  },
  {
    icon: BadgeCheckIcon,
    title: "Cleaner Expectations",
    body: "Quote replies can clarify supplies, arrival window, access handling, and whether a recurring team is available.",
  },
  {
    icon: GuaranteeIcon,
    title: "24-Hour Issue Window",
    body: "Report missed details within 24 hours with photos so the team can review the concern quickly.",
  },
  {
    icon: LeafIcon,
    title: "Product Preferences",
    body: "Use the quote notes to flag allergies, pets, fragrance preferences, or client-provided supplies.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SparkClean Toronto home cleaning quotes",
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
            Toronto Home Cleaning Quotes
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[0.98] text-pretty sm:text-6xl lg:text-7xl">
            Clear home cleaning quotes without the back-and-forth.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            Choose your cleaning scope, see a transparent estimate, and send the details SparkClean needs to confirm availability across Toronto and the GTA.
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
              See What Is Included
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white p-3 shadow-[0_30px_90px_-45px_rgba(7,15,12,0.45)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
              <Image
                src="/img/hero.webp"
                alt="Bright professionally cleaned living room prepared for a home cleaning service hero"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-[var(--color-border)] bg-white/92 p-5 shadow-[0_22px_65px_-35px_rgba(7,15,12,0.45)] backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">Quote Flow</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Your request captures service scope, preferred timing, postal code, and access notes in one pass.
            </p>
          </div>
        </div>
        </div>
      </section>

      <section id="proof" className="relative z-10 border-y border-[var(--color-border)] bg-white/88 py-14">
        <div className="mx-auto grid max-w-[var(--maxw)] gap-8 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">Before You Book</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-pretty sm:text-4xl">
              The details are clear before anyone shows up.
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
              Before/after expectations belong in plain view.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Use this comparison to review the level of detail expected from a deeper clean. Final scope is confirmed from your home details and notes.
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
            From estimate to confirmed clean.
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
              Practical policies make the quote easier to trust.
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
