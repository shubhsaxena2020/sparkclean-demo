import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "@/components/Reveal";
import { NEIGHBOURHOODS, BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas Across the Greater Toronto Area | SparkClean",
  description:
    "We offer professional home cleaning services across Toronto and the surrounding municipalities. See all the GTA areas we cover.",
};

const AREA_DETAILS = [
  { name: "Downtown Toronto", blurb: "Dedicated condo and townhome care in the core." },
  { name: "North York", blurb: "Detail-oriented residential cleaning for quiet suburban streets." },
  { name: "Scarborough", blurb: "Trusted house cleaning services across the east end." },
  { name: "Etobicoke", blurb: "Reliable, eco-friendly cleaning for lakeside and residential properties." },
  { name: "East York", blurb: "Family-centric home maintenance with safe, green products." },
  { name: "Mississauga", blurb: "Professional cleaning services for active households." },
  { name: "Vaughan", blurb: "High-standard cleans for modern homes and estates." },
  { name: "Markham", blurb: "Meticulous attention to detail for north-end residences." },
  { name: "Richmond Hill", blurb: "Premium housekeeping customized to your family's schedule." },
  { name: "Brampton", blurb: "Efficient, dependable house care services." },
  { name: "Thornhill", blurb: "Custom cleaning solutions to keep your home healthy." },
  { name: "Oakville", blurb: "High-end house cleaning for peaceful waterfront properties." },
];

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. PageHero */}
      <PageHero
        eyebrow="SERVICE AREAS"
        title="Proudly serving the Greater Toronto Area."
        intro="We bring our eco-friendly, premium cleaning standards to homes throughout the region. From the bustling core to the surrounding suburbs, our dedicated teams are ready to serve you."
      />

      {/* 2. Neighbourhood pills */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
          <RevealGroup
            as="ul"
            className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4"
          >
            {NEIGHBOURHOODS.map((area) => (
              <RevealItem
                as="li"
                key={area}
                className="rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-xs font-semibold text-ink transition-all hover:bg-surface hover:border-primary/50 shadow-[0_2px_8px_rgba(15,26,23,0.02)]"
              >
                {area}
              </RevealItem>
            ))}
          </RevealGroup>

          {/* 3. Don't see your area link */}
          <Reveal className="mt-10 text-center">
            <p className="text-sm text-muted">
              Don&apos;t see your area?{" "}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary hover:text-primary-d transition-colors"
              >
                Send us a DM →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. Tidy 2-column list of areas */}
      <section className="w-full bg-surface py-16 sm:py-20 border-t border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block">
              LOCATIONS
            </RevealEyebrow>
            <RevealHeading
              text="Neighborhoods We Cover"
              className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl leading-[1.05]"
            />
            <RevealSubtext className="mt-3 text-base text-muted">
              Discover how we care for homes in your specific part of the GTA.
            </RevealSubtext>
          </div>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {AREA_DETAILS.map((item) => (
              <RevealItem
                key={item.name}
                className="flex flex-col p-6 rounded-[var(--radius)] border border-[var(--color-border)] bg-white hover:border-primary/45 transition-colors duration-200"
              >
                <h3 className="font-bold text-ink text-base">{item.name}</h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">{item.blurb}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 5. CTABanner */}
      <CTABanner />
    </div>
  );
}
