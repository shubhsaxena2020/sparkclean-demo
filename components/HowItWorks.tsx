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
    <section className="mx-auto max-w-[var(--maxw)] px-4 py-28 sm:px-6 sm:py-36 bg-transparent">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          How it works
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight sm:leading-none">
          Booked in 60 seconds.
        </h2>
      </Reveal>

      <RevealGroup className="relative mt-16 grid gap-8 md:grid-cols-3">
        {/* connecting line (desktop) */}
        <div
          aria-hidden
          className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-primary/20 md:block"
        />
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <RevealItem key={title} className="relative text-center">
            <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border border-white/8 bg-white/5 text-primary">
              <Icon width={24} height={24} />
              <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-accent text-xs font-extrabold text-bg ring-2 ring-[#040a0e]">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-[1.7] text-muted">
              {body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
