import Link from "next/link";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
import { StarIcon } from "./icons";

const REVIEW_SLOTS = [
  {
    title: "Google Review Slot",
    body: "Connect a real Google Business Profile and show source, date, rating, and profile link.",
  },
  {
    title: "Service Story Slot",
    body: "Use one real client-approved before/after story with room type, neighborhood, and service scope.",
  },
  {
    title: "Referral Proof Slot",
    body: "Show a verified repeat-client or referral metric only after the client can prove it.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#FFC53D]" aria-label="Review proof placeholder">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} width={18} height={18} />
      ))}
    </div>
  );
}

export default function Reviews({ showLink = false }: { showLink?: boolean }) {
  return (
    <section id="reviews" className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <div className="relative mx-auto max-w-2xl text-center">
          <RevealEyebrow className="relative z-10 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Review System
          </RevealEyebrow>
          <RevealHeading
            text="Reviews belong here after they are real."
            className="relative z-10 mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05]"
          />
          <RevealSubtext className="relative z-10 mt-5 text-base leading-7 text-muted">
            This section is structured for proof, not invented testimonials. Add source links,
            dates, and customer permission before using live reviews.
          </RevealSubtext>
        </div>

        <RevealGroup className="mt-12 grid gap-8 md:grid-cols-3">
          {REVIEW_SLOTS.map((slot) => (
            <RevealItem
              key={slot.title}
              as="article"
              className="flex flex-col rounded-[var(--radius)] border-l-[3px] border-l-primary border-y border-r border-[var(--color-border)] bg-white p-8 premium-shadow premium-shadow-hover"
            >
              <Stars />
              <h3 className="mt-5 text-lg font-bold text-ink">{slot.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-[1.7] text-muted">
                {slot.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {showLink && (
          <Reveal className="mt-8 text-center">
            <Link
              href="/about#reviews"
              className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors duration-200 hover:text-primary-d"
            >
              View proof slots
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
