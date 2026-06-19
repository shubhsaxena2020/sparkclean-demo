import Link from "next/link";
import { RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
import {
  BuildingIcon,
  BriefcaseIcon,
  CheckIcon,
  HardHatIcon,
  RepeatIcon,
  SparkleIcon,
  TruckIcon,
} from "./icons";

const SERVICES = [
  {
    icon: RepeatIcon,
    title: "Recurring Home Cleaning",
    body: "Weekly, bi-weekly, or monthly maintenance with scope, timing, and access notes captured before dispatch.",
  },
  {
    icon: SparkleIcon,
    title: "Deep Cleaning",
    body: "A top-to-bottom reset for first cleans, seasonal refreshes, baseboards, appliances, and neglected details.",
  },
  {
    icon: TruckIcon,
    title: "Move-In / Move-Out",
    body: "End-of-tenancy detail cleaning built for inspection readiness.",
  },
  {
    icon: BuildingIcon,
    title: "Condo & Apartment",
    body: "Compact-home cleaning flows that account for elevators, concierge access, parking, and building rules.",
  },
  {
    icon: BriefcaseIcon,
    title: "Office Cleaning",
    body: "After-hours commercial cleaning quote intake with scope notes for desks, kitchens, washrooms, and floors.",
  },
  {
    icon: HardHatIcon,
    title: "Post-Construction",
    body: "Dust and renovation debris cleanup with a clear checklist for surfaces, fixtures, vents, and final polish.",
  },
];

const FEATURE_POINTS = [
  "Recurring estimate discount shown in calculator",
  "Cleaner expectations clarified before booking",
  "Schedule, access, pets, and parking captured upfront",
];

export default function Services({ showLink = false }: { showLink?: boolean }) {
  const featured = SERVICES[0];
  const others = SERVICES.slice(1);
  const FeaturedIcon = featured.icon;

  return (
    <section id="services" className="mx-auto max-w-[var(--maxw)] border-b border-[var(--color-border)] px-4 py-24 sm:px-6 sm:py-32 lg:py-36">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="flex flex-col justify-start lg:col-span-5">
          <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            What We Clean
          </RevealEyebrow>
          <RevealHeading
            text="Every kind of clean your home needs."
            className="mt-2 text-3xl font-extrabold leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl"
          />
          <p className="mt-4 text-base leading-relaxed text-muted">
            Each service points visitors toward a concrete quote request instead of vague package copy.
          </p>

          <RevealGroup className="mt-8">
            <RevealItem
              as="article"
              className="glow-card-hover relative overflow-hidden rounded-[32px] border-2 border-primary/20 bg-[#F2FBF7] p-8 shadow-[0_15px_35px_-12px_rgba(15,182,126,0.1)] sm:p-10"
            >
              <span className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                Most Popular
              </span>
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/10 bg-white text-primary shadow-[0_4px_12px_rgba(15,182,126,0.06)]">
                <FeaturedIcon width={28} height={28} />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold leading-tight text-ink">{featured.title}</h3>
              <p className="mt-3 text-base leading-[1.65] text-muted">{featured.body}</p>

              <ul className="mt-8 flex flex-col gap-3 border-t border-primary/15 pt-6 text-sm font-semibold text-ink/80">
                {FEATURE_POINTS.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          </RevealGroup>
        </div>

        <div className="mt-8 lg:col-span-7 lg:mt-0">
          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {others.map(({ icon: Icon, title, body }) => (
              <RevealItem
                key={title}
                as="article"
                className="glow-card-hover group relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white p-6 shadow-[0_8px_24px_-10px_rgba(15,26,23,0.06)] hover:bg-gradient-to-b hover:from-white hover:to-surface sm:p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-[var(--color-border)] bg-surface text-primary transition-transform duration-300 group-hover:scale-105">
                  <Icon width={22} height={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold leading-tight text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-[1.65] text-muted">{body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      {showLink && (
        <RevealSubtext className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary-d focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            View All Services
          </Link>
        </RevealSubtext>
      )}
    </section>
  );
}
