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
    <section id="services" className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wider text-primary">
          What we clean
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Every kind of clean your home needs.
        </h2>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, body }) => (
          <RevealItem
            key={title}
            as="article"
            className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg p-6 shadow-[0_1px_2px_rgba(15,26,23,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100" />
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface text-primary-d">
              <Icon width={24} height={24} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
