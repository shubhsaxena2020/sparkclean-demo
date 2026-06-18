import Link from "next/link";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
import { StarIcon } from "./icons";
import {
  RepeatIcon,
  SparkleIcon,
  TruckIcon,
  BuildingIcon,
  HardHatIcon,
  BriefcaseIcon,
} from "./icons";

const SERVICES = [
  {
    icon: RepeatIcon,
    title: "Recurring Home Cleaning",
    body: "Weekly, bi-weekly, or monthly. The same trusted team every visit.",
  },
  {
    icon: SparkleIcon,
    title: "Deep Cleaning",
    body: "Top-to-bottom reset. Inside the oven, fridge, baseboards, and the spots regular cleans miss.",
  },
  {
    icon: TruckIcon,
    title: "Move-In / Move-Out",
    body: "End-of-tenancy cleans done right — get your deposit back, guaranteed.",
  },
  {
    icon: BuildingIcon,
    title: "Condo & Apartment",
    body: "Fast, thorough cleans built for downtown condos and rentals.",
  },
  {
    icon: BriefcaseIcon,
    title: "Office Cleaning",
    body: "After-hours commercial cleaning that keeps your workspace sharp.",
  },
  {
    icon: HardHatIcon,
    title: "Post-Construction",
    body: "Dust, debris, and reno mess gone. Move-in ready.",
  },
];

export default function Services({ showLink = false }: { showLink?: boolean }) {
  const featured = SERVICES[0];
  const others = SERVICES.slice(1);
  const FeaturedIcon = featured.icon;

  return (
    <section id="services" className="mx-auto max-w-[var(--maxw)] px-4 py-24 sm:px-6 sm:py-32 lg:py-36 border-b border-[var(--color-border)]">
      <div className="grid gap-12 lg:grid-cols-12 items-start">
        
        {/* Left Column: Eyebrow, Heading, and Large Featured Card */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            What we clean
          </RevealEyebrow>
          <RevealHeading
            text="Every kind of clean your home needs."
            className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05]"
          />
          <p className="mt-4 text-base text-muted leading-relaxed">
            From regular weekly upkeep to deep vacancy handovers, our services are customized to keep your space fresh.
          </p>

          <RevealGroup className="mt-8">
            <RevealItem
              as="article"
              className="relative overflow-hidden rounded-[32px] border-2 border-primary/20 bg-[#F2FBF7] p-8 sm:p-10 shadow-[0_15px_35px_-12px_rgba(15,182,126,0.1)] transition-all duration-300 hover:border-primary/45"
            >
              <div className="absolute right-0 top-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-primary/5 pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white mb-6">
                Most Popular
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-primary border border-primary/10 shadow-[0_4px_12px_rgba(15,182,126,0.06)]">
                <FeaturedIcon width={28} height={28} />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold text-ink leading-tight">{featured.title}</h3>
              <p className="mt-3 text-base leading-[1.65] text-muted">{featured.body}</p>
              
              <ul className="mt-8 flex flex-col gap-3 border-t border-primary/15 pt-6 text-sm font-semibold text-ink/80">
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Save up to 18% on weekly cleans
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Vetted, dedicated local cleaner
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Flexible schedule, easy rebooking
                </li>
              </ul>
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Right Column: 2-column Grid of the other 5 cards */}
        <div className="lg:col-span-7 mt-8 lg:mt-0">
          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {others.map(({ icon: Icon, title, body }) => (
              <RevealItem
                key={title}
                as="article"
                className="group relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white p-6 sm:p-8 shadow-[0_8px_24px_-10px_rgba(15,26,23,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-12px_rgba(15,26,23,0.12)] hover:bg-gradient-to-b hover:from-white hover:to-surface"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface text-primary border border-[var(--color-border)] group-hover:scale-105 transition-transform duration-300">
                  <Icon width={22} height={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink leading-tight">{title}</h3>
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
            className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-d transition-colors"
          >
            View all services →
          </Link>
        </RevealSubtext>
      )}
    </section>
  );
}
