import Link from "next/link";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
import { StarIcon } from "./icons";

const REVIEWS = [
  {
    quote:
      "Booking took two minutes and the price was exactly what the site quoted. Team showed up on time and the condo looked better than move-in day.",
    name: "Priya K.",
    area: "Downtown Toronto",
    date: "May 2026",
    initials: "PK",
  },
  {
    quote:
      "Used them for a move-out clean on short notice and got my full deposit back. The eco products were a big plus with two little kids at home.",
    name: "Sarah M.",
    area: "North York",
    date: "Apr 2026",
    initials: "SM",
  },
  {
    quote:
      "Finally a cleaning company that just tells you the price online. No phone tag. Been on their bi-weekly plan for three months now.",
    name: "James T.",
    area: "Mississauga",
    date: "Mar 2026",
    initials: "JT",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#FFC53D]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} width={18} height={18} />
      ))}
    </div>
  );
}

export default function Reviews({ showLink = false }: { showLink?: boolean }) {
  return (
    <section id="reviews" className="w-full bg-white relative overflow-hidden">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-2xl text-center relative">
          <span className="absolute -top-14 left-1/2 -translate-x-1/2 font-display text-[13rem] font-black text-primary/[0.06] leading-none pointer-events-none select-none">
            “
          </span>
          <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary relative z-10">
            Reviews
          </RevealEyebrow>
          <RevealHeading
            text="GTA homeowners trust SparkClean."
            className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05] relative z-10"
          />
          <RevealSubtext className="mt-6 flex flex-wrap justify-center gap-2.5 relative z-10">
            {["Insured ✓", "Bonded ✓", "Eco-Certified ✓", "Background-Checked ✓"].map((label) => (
              <span key={label} className="rounded-full bg-surface border border-[var(--color-border)] px-3.5 py-1 text-xs font-semibold text-primary-d shadow-[0_2px_6px_rgba(15,182,126,0.02)]">
                {label}
              </span>
            ))}
          </RevealSubtext>
        </div>

        <RevealGroup className="mt-12 grid gap-8 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <RevealItem
              key={r.name}
              as="article"
              className="flex flex-col rounded-[var(--radius)] border-l-[3px] border-l-primary border-y border-r border-[var(--color-border)] bg-white p-8 shadow-[0_10px_30px_-12px_rgba(15, 26, 23, 0.12)] transition-all duration-300 hover:shadow-[0_18px_44px_-14px_rgba(15, 26, 23, 0.18)]"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-[1.7] text-ink italic">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-sm font-bold text-primary border border-[var(--color-border)]">
                  {r.initials}
                </span>
                <span className="text-sm">
                  <span className="block font-bold text-ink">{r.name}</span>
                  <span className="block text-muted">
                    {r.area} · {r.date}
                  </span>
                </span>
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>

      {showLink && (
        <Reveal className="mt-8 text-center">
          <Link
            href="/about#reviews"
            className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-d transition-colors"
          >
            Read more reviews →
          </Link>
        </Reveal>
      )}

        <Reveal className="mt-6 text-center">
          <p className="text-xs text-muted/80">
            Reviews shown are illustrative demo content.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
