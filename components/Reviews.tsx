import { Reveal, RevealGroup, RevealItem } from "./Reveal";
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
    <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} width={18} height={18} />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-surface">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Reviews
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            GTA homeowners trust SparkClean.
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <RevealItem
              key={r.name}
              as="article"
              className="flex flex-col rounded-[var(--radius-card)] border border-border bg-bg p-6 shadow-[0_1px_2px_rgba(15,26,23,0.04)]"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/85">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/12 text-sm font-bold text-primary-d">
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

        <Reveal className="mt-6 text-center">
          <p className="text-xs text-muted/80">
            Reviews shown are illustrative demo content.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
