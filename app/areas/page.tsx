import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "@/components/Reveal";
import { NEIGHBOURHOODS, BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "GTA Cleaning Service Area Checker | SparkClean",
  description:
    "A proof-ready service-area page for Toronto and GTA cleaning companies with quote routing, postal-code guidance, and neighborhood slots.",
};

const AREA_DETAILS = [
  { name: "Downtown Toronto", blurb: "Condo, townhome, and short-access window intake." },
  { name: "North York", blurb: "Suburban route slot for recurring and deep cleans." },
  { name: "Scarborough", blurb: "East-end availability slot with parking/access notes." },
  { name: "Etobicoke", blurb: "West-end household and condo quote routing." },
  { name: "East York", blurb: "Family-home service slot with pet and supply notes." },
  { name: "Mississauga", blurb: "Regional service slot for clients who operate west of Toronto." },
  { name: "Vaughan", blurb: "Northwest route slot for larger homes and recurring plans." },
  { name: "Markham", blurb: "North-end route slot for service-area expansion." },
  { name: "Richmond Hill", blurb: "Route slot for verified client coverage only." },
  { name: "Brampton", blurb: "Availability slot that should be tied to real dispatch rules." },
  { name: "Thornhill", blurb: "Boundary slot for Toronto/York Region operators." },
  { name: "Oakville", blurb: "Optional west-end slot if the client's crew coverage supports it." },
];

export default function AreasPage() {
  return (
    <div className="min-h-screen ambient-bg">
      <PageHero
        eyebrow="SERVICE AREAS"
        title="Service areas should be verified, not guessed."
        intro="This page gives a cleaning client a credible way to publish coverage: neighborhood slots, postal-code intake, route notes, and a clear quote request when a visitor is outside the published area."
      />

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
                className="rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-xs font-semibold text-ink transition-[background-color,border-color] duration-200 hover:bg-surface hover:border-primary/50 shadow-[0_2px_8px_rgba(15,26,23,0.02)]"
              >
                {area}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 text-center">
            <p className="text-sm text-muted">
              Need another area?{" "}
              <a
                href={BOOKING_URL}
                className="font-bold text-primary transition-colors duration-200 hover:text-primary-d"
              >
                Request availability with your postal code
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-surface py-16 sm:py-20 border-t border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block">
              ROUTE SLOTS
            </RevealEyebrow>
            <RevealHeading
              text="Neighborhood pages become stronger when backed by dispatch rules."
              className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl leading-[1.05]"
            />
            <RevealSubtext className="mt-3 text-base text-muted">
              Each area should eventually include service days, minimums, parking constraints, and local proof.
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

      <CTABanner />
    </div>
  );
}
