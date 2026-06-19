import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "@/components/Reveal";
import { NEIGHBOURHOODS, BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "GTA Cleaning Service Area Checker | SparkClean",
  description:
    "Check SparkClean quote availability for Toronto and nearby GTA neighborhoods by sending your postal code and cleaning scope.",
};

const AREA_DETAILS = [
  { name: "Downtown Toronto", blurb: "Best for condos, apartments, townhomes, and short-access windows." },
  { name: "North York", blurb: "Recurring, deep, and move-out cleaning requests reviewed by postal code." },
  { name: "Scarborough", blurb: "East-end requests should include parking, pets, access, and preferred timing." },
  { name: "Etobicoke", blurb: "West-end household and condo quote requests are reviewed for route fit." },
  { name: "East York", blurb: "Family-home requests can include supply preferences and pet notes." },
  { name: "Mississauga", blurb: "Availability depends on route capacity and requested cleaning scope." },
  { name: "Vaughan", blurb: "Larger-home and recurring-plan requests are reviewed with timing details." },
  { name: "Markham", blurb: "North-end availability is confirmed after postal-code and schedule review." },
  { name: "Richmond Hill", blurb: "Send the postal code first so SparkClean can confirm availability." },
  { name: "Brampton", blurb: "Quote requests are reviewed for route capacity before confirmation." },
  { name: "Thornhill", blurb: "Boundary-area requests should include access and parking notes." },
  { name: "Oakville", blurb: "West-end requests may depend on minimum scope and crew availability." },
];

export default function AreasPage() {
  return (
    <div className="min-h-screen ambient-bg">
      <PageHero
        eyebrow="SERVICE AREAS"
        title="Check cleaning availability by postal code."
        intro="SparkClean reviews Toronto and nearby GTA quote requests by location, route capacity, service scope, access notes, and preferred timing."
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
                className="rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-xs font-semibold text-ink shadow-[0_2px_8px_rgba(15,26,23,0.02)] transition-[background-color,border-color] duration-200 hover:border-primary/50 hover:bg-surface"
              >
                {area}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 text-center">
            <p className="text-sm text-muted">
              Do not see your neighborhood?{" "}
              <a
                href={BOOKING_URL}
                className="font-bold text-primary transition-colors duration-200 hover:text-primary-d focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                Request availability with your postal code
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="w-full border-b border-t border-[var(--color-border)] bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <RevealEyebrow className="block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Coverage Notes
            </RevealEyebrow>
            <RevealHeading
              text="Final availability depends on your exact request."
              className="mt-2 text-3xl font-black leading-[1.03] tracking-[-0.02em] text-ink text-balance sm:text-4xl"
            />
            <RevealSubtext className="mt-3 text-base text-muted">
              Share your postal code, building access, parking, timing, and service scope so SparkClean can confirm whether the route works.
            </RevealSubtext>
          </div>

          <RevealGroup className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {AREA_DETAILS.map((item) => (
              <RevealItem
                key={item.name}
                className="flex flex-col rounded-[var(--radius)] border border-[var(--color-border)] bg-white p-6 transition-colors duration-200 hover:border-primary/45"
              >
                <h3 className="text-base font-bold text-ink">{item.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.blurb}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
