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
    <section id="pricing" className="w-full bg-transparent">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-28 sm:px-6 sm:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Pricing
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-tight sm:leading-none">
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
              className={`relative flex flex-col rounded-[24px] border p-8 transition-all duration-300 ${
                plan.featured
                  ? "border-2 border-primary bg-white/85 backdrop-blur-md shadow-[0_15px_45px_rgba(15,182,126,0.15)] lg:-mt-4 lg:mb-4"
                  : "border border-white/80 bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgba(15,26,23,0.03)] hover:shadow-[0_12px_36px_rgba(15,182,126,0.1)] hover:border-primary/30 hover:-translate-y-1.5"
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

              <ul className="mt-5 flex flex-col gap-2.5 border-t border-black/5 pt-5">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink/90">
                    <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-bold transition-all active:translate-y-px ${
                  plan.featured
                    ? "bg-accent text-[#0c1b26] shadow-[0_4px_12px_rgba(255,183,3,0.3)] hover:bg-accent-d hover:shadow-[0_6px_20px_rgba(255,183,3,0.45)]"
                    : "border border-primary text-primary hover:bg-primary/10"
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
            <a href="#calculator" className="font-semibold text-primary underline-offset-2 hover:underline">
              get your exact estimate in the calculator above
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
