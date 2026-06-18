import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { NEIGHBOURHOODS } from "@/lib/site";

export default function ServiceAreas() {
  return (
    <section id="areas" className="w-full bg-transparent">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-28 sm:px-6 sm:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Service areas
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-tight sm:leading-none">
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
              className="rounded-full border border-primary/15 bg-white/60 backdrop-blur-md px-4.5 py-2 text-xs font-semibold text-ink/80 transition-all hover:border-primary/45 hover:bg-primary/5 hover:text-primary-d hover:shadow-[0_2px_8px_rgba(15,182,126,0.08)]"
            >
              {area}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
