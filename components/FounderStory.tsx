import { Reveal } from "./Reveal";
import { LeafIcon } from "./icons";

export default function FounderStory() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <Reveal className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-6 rounded-[var(--radius)] border border-[var(--color-border)] bg-surface p-10 text-center shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)] sm:p-16">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-xl font-black text-white">
              SC
            </span>
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <LeafIcon width={16} height={16} />
                Local, and we act like it
              </p>
              <blockquote className="mt-4 text-lg leading-[1.75] text-ink sm:text-xl italic">
                &ldquo;SparkClean started with one family, one minivan, and a
                simple promise: show up on time, use products safe for kids and
                pets, and leave every home better than we found it. We&apos;re
                not a franchise — we&apos;re your neighbours, and our name is on
                every clean.&rdquo;
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-muted">
                — The SparkClean family · Family-owned in the GTA
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
