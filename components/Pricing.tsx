import { RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
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
    <section id="pricing" className="w-full bg-surface">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Pricing
          </RevealEyebrow>
          <RevealHeading
            text="Simple, honest pricing."
            className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05]"
          />
          <RevealSubtext className="mt-3 text-lg text-muted">
            No hidden fees. Recurring plans save up to 18%.
          </RevealSubtext>
        </div>

        <RevealGroup className="mt-12 grid items-start gap-8 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <RevealItem
              key={plan.name}
              as="article"
              className={`relative flex flex-col rounded-[var(--radius)] border p-8 transition-all duration-300 ${
                plan.featured
                  ? "featured-card border-primary bg-white lg:-mt-4 lg:mb-4 lg:-translate-y-1.5 lg:hover:-translate-y-2.5"
                  : "border-[var(--color-border)] bg-white shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)] hover:shadow-[0_18px_44px_-14px_rgba(15,26,23,0.18)] hover:-translate-y-1"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-sm shadow-primary/25">
                  Most Booked
                </span>
              )}
              <h3 className="text-lg font-bold text-ink">{plan.name}</h3>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="text-sm font-medium text-muted">from</span>
                <span className="font-display text-4xl font-extrabold text-primary">
                  ${plan.from}
                </span>
              </p>
              <p className="mt-3 min-h-[2.5rem] text-sm leading-[1.7] text-muted">
                {plan.blurb}
              </p>

              <ul className="mt-5 flex flex-col gap-2.5 border-t border-[var(--color-border)] pt-5">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink">
                    <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-bold transition-all duration-200 ease-out hover:-translate-y-[2px] active:translate-y-0 ${
                  plan.featured
                    ? "bg-accent text-ink shadow-[0_4px_12px_rgba(255,197,61,0.25)] hover:bg-[#F5B625] hover:shadow-[0_6px_20px_rgba(255,197,61,0.4)]"
                    : "border border-primary text-primary hover:bg-primary/5 hover:shadow-[0_4px_12px_rgba(15,182,126,0.1)]"
                }`}
              >
                {plan.cta}
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealSubtext className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm text-muted">
            Final price depends on home size —{" "}
            <a href="#calculator" className="font-semibold text-primary underline-offset-2 hover:underline">
              get your exact estimate in the calculator above
            </a>
            .
          </p>
        </RevealSubtext>
      </div>
    </section>
  );
}
