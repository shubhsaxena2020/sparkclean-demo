import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { NEIGHBOURHOODS } from "@/lib/site";

export default function ServiceAreas() {
  return (
    <section id="areas" className="w-full bg-surface">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Service areas
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05]">
            Proudly serving the Greater Toronto Area.
          </h2>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-4"
        >
          {NEIGHBOURHOODS.map((area) => (
            <RevealItem
              as="li"
              key={area}
              className="rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-xs font-semibold text-ink transition-all hover:bg-surface-2 hover:border-primary/50 shadow-[0_2px_8px_rgba(15,26,23,0.02)]"
            >
              {area}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
