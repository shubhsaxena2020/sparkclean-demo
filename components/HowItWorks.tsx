import Image from "next/image";
import { RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
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
    <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-36 border-b border-[var(--color-border)]">
      {/* Editorial touch: big watermark word "SPARK" in background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-[18vw] font-black tracking-tighter text-primary font-display leading-none">
        SPARK
      </div>

      <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading, Subtext, and large image */}
          <div className="lg:col-span-5 flex flex-col justify-start relative">
            {/* Editorial touch: giant number behind heading */}
            <span className="absolute -top-16 -left-4 font-display text-[9rem] font-black text-primary/[0.04] leading-none pointer-events-none select-none">
              01
            </span>
            
            <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary relative z-10">
              How it works
            </RevealEyebrow>
            <RevealHeading
              text="Booked in 60 seconds."
              className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05] relative z-10"
              as="h2"
            />
            <RevealSubtext className="mt-4 text-base text-muted leading-relaxed relative z-10">
              We have simplified home cleaning. Tell us what you need, pick a date, and let our trusted, background-checked team do the rest.
            </RevealSubtext>

            <RevealSubtext delay={0.15} className="mt-8 relative block">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-[var(--color-border)] shadow-[0_15px_35px_-15px_rgba(15,26,23,0.15)] bg-surface">
                <Image
                  src="/img/results2.jpg"
                  alt="Tidy minimal bedroom with fresh folded sheets"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </RevealSubtext>
          </div>

          {/* Right Column: Vertical list of steps */}
          <div className="lg:col-span-7">
            <RevealGroup className="flex flex-col gap-6 sm:gap-8">
              {STEPS.map(({ icon: Icon, title, body }, i) => (
                <RevealItem 
                  key={title} 
                  className="group flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-[24px] border border-[var(--color-border)] bg-surface shadow-[0_8px_24px_-10px_rgba(15,26,23,0.06)] hover:shadow-[0_16px_36px_-12px_rgba(15,26,23,0.12)] border-l-[4px] border-l-primary/30 hover:border-l-primary transition-all duration-300"
                >
                  <div className="relative shrink-0 grid h-14 w-14 place-items-center rounded-2xl bg-white border border-[var(--color-border)] text-primary shadow-[0_4px_12px_rgba(15,182,126,0.04)] group-hover:scale-105 transition-transform duration-300">
                    <Icon width={24} height={24} />
                    <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-accent text-xs font-extrabold text-ink ring-2 ring-white">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-ink leading-none">{title}</h3>
                    <p className="mt-2 text-sm leading-[1.65] text-muted">
                      {body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

        </div>
      </div>
    </section>
  );
}
