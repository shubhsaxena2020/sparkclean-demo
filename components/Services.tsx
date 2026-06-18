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
  return (
    <section id="services" className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="max-w-2xl">
        <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          What we clean
        </RevealEyebrow>
        <RevealHeading
          text="Every kind of clean your home needs."
          className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05]"
        />
      </div>

      <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, body }) => (
          <RevealItem
            key={title}
            as="article"
            className="group relative overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)] bg-white p-8 shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-14px_rgba(15,26,23,0.18)] hover:bg-gradient-to-b hover:from-white hover:to-surface"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface text-primary">
              <Icon width={24} height={24} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-[1.7] text-muted">{body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      {showLink && (
        <RevealSubtext className="mt-10 text-center">
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
