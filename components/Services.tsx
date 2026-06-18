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
    <section id="services" className="mx-auto max-w-[var(--maxw)] px-4 py-28 sm:px-6 sm:py-36">
      <Reveal className="max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          What we clean
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight sm:leading-none">
          Every kind of clean your home needs.
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, body }) => (
          <RevealItem
            key={title}
            as="article"
            className="group relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.02] backdrop-blur-md p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(0,255,135,0.12)] hover:border-primary/30"
          >
            {/* Neon highlight at the card foot on hover */}
            <span className="absolute inset-x-0 bottom-0 h-1 bg-primary/25 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-primary">
              <Icon width={24} height={24} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-[1.7] text-muted">{body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
