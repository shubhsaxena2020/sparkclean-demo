import { Reveal, RevealGroup, RevealItem } from "./Reveal";
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
    icon: HardHatIcon,
    title: "Post-Construction",
    body: "Dust, debris, and reno mess gone. Move-in ready.",
  },
  {
    icon: BriefcaseIcon,
    title: "Office Cleaning",
    body: "After-hours commercial cleaning that keeps your workspace sharp.",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          What we clean
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05]">
          Every kind of clean your home needs.
        </h2>
      </Reveal>

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
    </section>
  );
}
