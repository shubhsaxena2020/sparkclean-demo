import Link from "next/link";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
import { CheckIcon } from "./icons";

const CONFIDENCE_ITEMS = [
  {
    title: "Clear Scope",
    body: "Your request lists service type, room count, frequency, timing, access notes, and special instructions in one summary.",
  },
  {
    title: "No Surprise Booking",
    body: "SparkClean confirms availability and final scope before treating the request as a scheduled appointment.",
  },
  {
    title: "Issue Window",
    body: "If something is missed, report it within 24 hours with photos so the concern can be reviewed quickly.",
  },
];

export default function Reviews({ showLink = false }: { showLink?: boolean }) {
  return (
    <section id="reviews" className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <div className="relative mx-auto max-w-2xl text-center">
          <RevealEyebrow className="relative z-10 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Booking Confidence
          </RevealEyebrow>
          <RevealHeading
            text="The process is designed to reduce cleaning-day surprises."
            className="relative z-10 mt-2 text-3xl font-black leading-[1.03] tracking-[-0.02em] text-ink text-balance sm:text-5xl"
          />
          <RevealSubtext className="relative z-10 mt-5 text-base leading-7 text-muted">
            No invented reviews or star ratings. The site focuses on the information homeowners need before requesting a clean.
          </RevealSubtext>
        </div>

        <RevealGroup className="mt-12 grid gap-8 md:grid-cols-3">
          {CONFIDENCE_ITEMS.map((item) => (
            <RevealItem
              key={item.title}
              as="article"
              className="premium-shadow premium-shadow-hover flex flex-col rounded-[var(--radius)] border-y border-r border-l-[3px] border-[var(--color-border)] border-l-primary bg-white p-8"
            >
              <CheckIcon width={22} height={22} className="text-primary" />
              <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-[1.7] text-muted">
                {item.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {showLink && (
          <Reveal className="mt-8 text-center">
            <Link
              href="/about#reviews"
              className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors duration-200 hover:text-primary-d focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              View Booking Process
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
