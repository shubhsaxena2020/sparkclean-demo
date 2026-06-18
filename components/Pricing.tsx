import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { BOOKING_URL } from "@/lib/site";
import { CheckIcon } from "./icons";

const PLANS = [
  {
    name: "Standard Clean",
    from: 109,
    blurb: "Perfect for regular upkeep. Up to a tidy 1–2 bedroom home.",
    includes: ["Dusting", "Vacuum & mop", "Kitchen", "Bathrooms", "7-day rebook"],
    cta: "Book Standard",
    featured: false,
  },
  {
    name: "Deep Clean",
    from: 179,
    blurb: "The full reset. Ideal for first cleans and seasonal refreshes.",
    includes: [
      "Everything in Standard",
      "Inside oven",
      "Inside fridge",
      "Baseboards",
      "Window sills",
    ],
    cta: "Book Deep Clean",
    featured: true,
  },
  {
    name: "Move-In / Move-Out",
    from: 229,
    blurb: "End-of-tenancy detail. Built to pass inspection.",
    includes: ["Everything in Deep", "Inside cabinets", "Closets", "Appliances"],
    cta: "Book Move-In/Out",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-primary">
          Pricing
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Simple, honest pricing.
        </h2>
        <p className="mt-3 text-lg text-muted">
          No hidden fees. Recurring plans save up to 18%.
        </p>
      </Reveal>

      <RevealGroup className="mt-12 grid items-start gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <RevealItem
            key={plan.name}
            as="article"
            className={`relative flex flex-col rounded-[var(--radius-card)] border bg-bg p-7 transition-all duration-200 hover:-translate-y-1 ${
              plan.featured
                ? "border-primary shadow-[0_12px_40px_rgba(15,182,126,0.18)] lg:-mt-4 lg:mb-4"
                : "border-border shadow-[0_1px_2px_rgba(15,26,23,0.04)] hover:shadow-lg"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm">
                Most Booked
              </span>
            )}
            <h3 className="text-lg font-bold text-ink">{plan.name}</h3>
            <p className="mt-2 flex items-baseline gap-1">
              <span className="text-sm font-medium text-muted">from</span>
              <span className="font-display text-4xl font-extrabold text-primary-d">
                ${plan.from}
              </span>
            </p>
            <p className="mt-3 min-h-[2.5rem] text-sm leading-relaxed text-muted">
              {plan.blurb}
            </p>

            <ul className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink/85">
                  <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-7 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-all active:translate-y-px ${
                plan.featured
                  ? "bg-accent text-ink shadow-sm hover:bg-accent-d hover:shadow-md"
                  : "border-2 border-primary text-primary-d hover:bg-surface"
              }`}
            >
              {plan.cta}
            </a>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mx-auto mt-8 max-w-2xl text-center">
        <p className="text-sm text-muted">
          Final price depends on home size —{" "}
          <a href="#calculator" className="font-semibold text-primary-d underline-offset-2 hover:underline">
            get your exact estimate in the calculator above
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}
