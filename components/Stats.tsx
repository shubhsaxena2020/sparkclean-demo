import { Reveal } from "./Reveal";
import { PROOF_ITEMS } from "@/lib/site";

export default function Stats() {
  return (
    <section className="w-full border-b border-[var(--color-border)] bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-ink)]">
                Quote Confidence
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-ink text-balance">
                You get clear next steps before the visit is confirmed.
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {PROOF_ITEMS.map((item) => (
                <li key={item} className="rounded-2xl border border-[var(--color-border)] bg-surface p-5">
                  <span className="text-sm font-bold text-ink">{item}</span>
                  <p className="mt-2 text-xs leading-6 text-muted">
                    The quote request is reviewed against these details before scheduling.
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
