import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfter from "@/components/BeforeAfter";
import Calculator from "@/components/Calculator";
import CursorFollower from "@/components/CursorFollower";
import MagneticButton from "@/components/MagneticButton";
import { StarIcon, CheckIcon } from "@/components/icons";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "SparkClean Toronto — Luxury Residential Cleaning Services",
  description:
    "Eco-certified residential cleaning services tailored for Toronto's finest homes. Instant quotes & online booking for Rosedale, Forest Hill, Yorkville & The Annex.",
};

const SERVICES_LIST = [
  {
    title: "Deep Clean Detail",
    description:
      "A clinical, bottom-to-top overhaul targeting baseboards, light fixtures, internal windows, and appliance polishing. Designed for seasonal refreshment or onboarding.",
    highlights: ["Hand-washed trim & moldings", "Interior oven & fridge detailing", "Eco-certified sanitization"],
  },
  {
    title: "Elite Regular Maintenance",
    description:
      "Precision upkeep program for luxury estates. Maintains immaculate surfaces, dust-free corners, and hotel-style bed dressing on a recurring schedule.",
    highlights: ["HEPA micro-filtration vacuuming", "Sanitized touchpoints", "Tailored frequency discounts"],
  },
  {
    title: "Move-In / Out Precision",
    description:
      "Completely prepare a residence for handover. Deep scrubbing inside cabinetry, track sanitization, and heavy debris removal for a flawless transition.",
    highlights: ["Cabinet interior sterilization", "Wall dust removal", "Handover guarantee"],
  },
];

const GTA_NEIGHBORHOODS = [
  { name: "Rosedale", desc: "Heritage estate estate-maintenance programs." },
  { name: "Forest Hill", desc: "Meticulous multi-level residential care." },
  { name: "Yorkville", desc: "High-end penthouse detailing and window polishing." },
  { name: "The Annex", desc: "Detailed brick-and-wood restoration cleaning." },
  { name: "Lawrence Park", desc: "Regular luxury family residence servicing." },
  { name: "High Park", desc: "Eco-certified allergy-reduction detailing." },
];

export default function Home() {
  return (
    <div className="relative min-h-screen text-[var(--color-ink)] pb-24">
      {/* Global Interactive Follower */}
      <CursorFollower />

      {/* Luxury Editorial Header / Hero */}
      <header className="relative z-10 mx-auto max-w-[var(--maxw)] px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] block mb-4 animate-fade-in">
          TORONTO&apos;S PREEMINENT HOME MAINTENANCE
        </span>
        <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-6xl lg:text-[4.5rem] max-w-4xl">
          The <span className="italic font-normal text-[var(--color-primary)]">spotless</span> standard for Toronto&apos;s finest residences.
        </h1>
        <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--color-muted)]">
          Eco-certified, fully bonded residential cleaning designed for the architectural demands of heritage and contemporary homes in <span className="text-[var(--color-primary)] font-semibold">Rosedale</span>, <span className="text-[var(--color-primary)] font-semibold">Forest Hill</span>, <span className="text-[var(--color-primary)] font-semibold">Yorkville</span>, and the <span className="text-[var(--color-primary)] font-semibold">GTA</span>.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--color-primary)] px-8 py-4 text-sm font-bold text-white shadow-[0_4px_15px_rgba(6,61,46,0.15)] transition-all duration-300 hover:bg-[var(--color-primary-d)]"
            >
              Secure Elite Booking
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-primary)] px-8 py-4 text-sm font-bold text-[var(--color-primary)] transition-all duration-300 hover:bg-[var(--color-primary)]/5"
            >
              Calculate Bespoke Rate
            </a>
          </MagneticButton>
        </div>
      </header>

      {/* Asymmetrical Bento Grid */}
      <section className="relative z-10 mx-auto max-w-[var(--maxw)] px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Bento Block A: Before/After Slider (spans 2 cols, 2 rows) */}
          <div className="bento-panel md:col-span-2 md:row-span-2 flex flex-col justify-between p-6">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] block mb-1">Visual Evidence</span>
              <h2 className="font-display text-2xl font-bold text-[var(--color-ink)]">Visual Transformation Standard</h2>
              <p className="text-xs text-[var(--color-muted)] mt-1">Drag the slider to preview the result of our Deep Clean system.</p>
            </div>
            <div className="flex-1 w-full h-full min-h-[300px]">
              <BeforeAfter />
            </div>
          </div>

          {/* Bento Block B: Price Estimator (spans 1 col, 2 rows) */}
          <div id="calculator" className="bento-panel md:col-span-1 md:row-span-2 p-1 bg-white/30">
            <Calculator compact={true} />
          </div>

          {/* Bento Block C: Dynamic Trust Stats (spans 1 col, 1 row) */}
          <div className="bento-panel md:col-span-1 p-8 flex flex-col justify-between bg-[var(--color-primary)] text-white">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)] block mb-2">Audit Verified</span>
              <h3 className="font-display text-3xl font-extrabold tracking-tight">Our Trust Metrics</h3>
            </div>
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-display font-extrabold text-[var(--color-accent)]">4.9★</span>
                <span className="text-xs leading-tight text-white/95">Average Google Rating across 500+ booked GTA cleans</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-display font-extrabold text-[var(--color-accent)]">100%</span>
                <span className="text-xs leading-tight text-white/95">Satisfaction guarantee with 24-hour service warranty</span>
              </div>
            </div>
          </div>

          {/* Bento Block D: Testimonial Carousel / Client Reviews (spans 2 cols, 1 row) */}
          <div className="bento-panel md:col-span-2 p-8 flex flex-col justify-between">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] block mb-1">Elite Testimony</span>
              <h3 className="font-display text-2xl font-bold text-[var(--color-ink)]">Words from Toronto Residences</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <blockquote className="border-l-2 border-[var(--color-accent)] pl-4 py-1">
                <p className="text-sm italic text-[var(--color-ink)] leading-relaxed">
                  &ldquo;Booking was seamless, and the rate matched the estimate perfectly. The cleaning crew operated with incredible precision, treating our heritage moldings in Rosedale with great care.&rdquo;
                </p>
                <cite className="block text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-primary)] mt-3">
                  Priya K. &mdash; Rosedale, Toronto
                </cite>
              </blockquote>
              <blockquote className="border-l-2 border-[var(--color-accent)] pl-4 py-1">
                <p className="text-sm italic text-[var(--color-ink)] leading-relaxed">
                  &ldquo;A clean that truly matches the design standard of our home. Using certified organic solutions gives complete peace of mind with the kids around. Absolute recommendation.&rdquo;
                </p>
                <cite className="block text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-primary)] mt-3">
                  James T. &mdash; Forest Hill, Toronto
                </cite>
              </blockquote>
            </div>
          </div>

        </div>
      </section>

      {/* Custom Luxury Service Detail Grid */}
      <section className="relative z-10 mx-auto max-w-[var(--maxw)] px-6 py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] block mb-3 text-center">
          OUR LUXURY CAPABILITIES
        </span>
        <h2 className="font-display text-3xl font-extrabold text-center text-[var(--color-ink)] sm:text-5xl mb-12">
          Tailored Maintenance Systems
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {SERVICES_LIST.map((srv, idx) => (
            <div key={idx} className="bento-panel p-8 bg-white/30 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--color-primary)] mb-4">{srv.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)] mb-6">{srv.description}</p>
              </div>
              <ul className="space-y-2 border-t border-[var(--color-border)] pt-5">
                {srv.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-center gap-2.5 text-xs text-[var(--color-ink)] font-semibold">
                    <CheckIcon width={14} height={14} className="text-[var(--color-primary)] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Neighbourhood Focus */}
      <section className="relative z-10 mx-auto max-w-[var(--maxw)] px-6 py-12">
        <div className="bento-panel p-8 bg-white/20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] block mb-3">
            ESTATE COVERAGE AREA
          </span>
          <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-4xl mb-6">
            Serving Toronto&apos;s Finest Neighborhoods
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {GTA_NEIGHBORHOODS.map((n, idx) => (
              <div key={idx} className="border border-[var(--color-primary)]/10 bg-white/40 p-4 rounded-xl">
                <span className="font-display font-bold text-[var(--color-primary)] text-lg block">{n.name}</span>
                <span className="text-xs text-[var(--color-muted)] mt-1 block">{n.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
