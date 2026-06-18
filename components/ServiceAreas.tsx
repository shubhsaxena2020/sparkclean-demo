import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { NEIGHBOURHOODS } from "@/lib/site";

export default function ServiceAreas() {
  return (
    <section id="areas" className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-primary">
          Service areas
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Proudly serving the Greater Toronto Area.
        </h2>
      </Reveal>

      <RevealGroup
        as="ul"
        className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-2.5"
      >
        {NEIGHBOURHOODS.map((area) => (
          <RevealItem
            as="li"
            key={area}
            className="rounded-full border border-border bg-bg px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-primary hover:bg-surface hover:text-primary-d"
          >
            {area}
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
