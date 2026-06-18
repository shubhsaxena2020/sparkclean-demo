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
    <div className="flex gap-0.5 text-[#e3b33c]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} width={18} height={18} />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="w-full bg-transparent">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-28 sm:px-6 sm:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Reviews
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-tight sm:leading-none">
            GTA homeowners trust SparkClean.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <RevealItem
              key={r.name}
              as="article"
              className="flex flex-col rounded-[24px] border-l-4 border-l-primary border-y border-r border-white/80 bg-white/60 backdrop-blur-md p-8 shadow-[0_8px_30px_rgba(15,26,23,0.03)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(15,182,126,0.1)]"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-[1.7] text-ink/90 italic">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-black/5 pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary-d">
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
