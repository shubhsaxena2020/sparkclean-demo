import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { TagIcon, ClockIcon, SparkleIcon } from "./icons";

const STEPS = [
  {
    icon: TagIcon,
    title: "Get your price",
    body: "Pick your service and see the cost instantly. No callbacks, no guesswork.",
  },
  {
    icon: ClockIcon,
    title: "Choose a time",
    body: "Same-day and next-day slots across the GTA.",
  },
  {
    icon: SparkleIcon,
    title: "We make it shine",
    body: "Insured, background-checked pros arrive with eco-friendly products.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-primary">
          How it works
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Booked in 60 seconds.
        </h2>
      </Reveal>

      <RevealGroup className="relative mt-12 grid gap-8 md:grid-cols-3">
        {/* connecting line (desktop) */}
        <div
          aria-hidden
          className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-border md:block"
        />
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <RevealItem key={title} className="relative text-center">
            <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white shadow-md">
              <Icon width={26} height={26} />
              <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-accent text-xs font-extrabold text-ink ring-2 ring-bg">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
