import { Reveal } from "./Reveal";
import { LeafIcon } from "./icons";

export default function FounderStory() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-6 rounded-[var(--radius-card)] border border-border bg-bg p-8 text-center shadow-[0_1px_2px_rgba(15,26,23,0.04)] sm:p-10">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-xl font-extrabold text-white shadow-md">
              SC
            </span>
            <div>
              <p className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-primary">
                <LeafIcon width={16} height={16} />
                Local, and we act like it
              </p>
              <blockquote className="mt-4 text-lg leading-relaxed text-ink sm:text-xl">
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
