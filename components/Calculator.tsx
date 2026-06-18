"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import {
  SERVICES,
  FREQUENCIES,
  calculatePrice,
  getService,
  type ServiceType,
  type Frequency,
} from "@/lib/pricing";
import { BOOKING_URL } from "@/lib/site";
import { Reveal } from "./Reveal";
import { MinusIcon, PlusIcon, ArrowRightIcon, CheckIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_BEDROOMS = 5;
const MAX_BATHROOMS = 4;

const bedroomLabel = (n: number) =>
  n === 0 ? "Studio" : n >= MAX_BEDROOMS ? `${n}+` : `${n}`;
const bathroomLabel = (n: number) => (n >= MAX_BATHROOMS ? `${n}+` : `${n}`);

/** Rolling price number; snaps instantly under prefers-reduced-motion. */
function AnimatedPrice({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      prev.current = value;
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 0.5,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, reduce]);

  return <>{display}</>;
}

/** Accessible segmented radio control (real inputs + labels). */
function Segmented<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  cols = 3,
}: {
  legend: string;
  name: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  cols?: 2 | 3 | 4;
}) {
  const colClass = cols === 2 ? "grid-cols-2" : cols === 4 ? "grid-cols-4" : "grid-cols-3";
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold text-ink">{legend}</legend>
      <div className={`grid ${colClass} gap-2`} role="radiogroup" aria-label={legend}>
        {options.map((opt) => {
          const active = opt.id === value;
          return (
            <label
              key={opt.id}
              className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition-colors ${
                active
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-border bg-bg text-ink hover:border-primary/50 hover:bg-surface"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.id}
                checked={active}
                onChange={() => onChange(opt.id)}
                className="sr-only"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Labelled stepper with −/+ buttons. */
function Stepper({
  label,
  value,
  min,
  max,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <div className="flex items-center justify-between rounded-xl border border-border bg-bg p-1.5">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid h-9 w-9 place-items-center rounded-lg text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30"
        >
          <MinusIcon width={18} height={18} />
        </button>
        <span aria-live="polite" className="min-w-[3.5rem] text-center text-base font-bold text-ink">
          {display}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="grid h-9 w-9 place-items-center rounded-lg text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30"
        >
          <PlusIcon width={18} height={18} />
        </button>
      </div>
    </div>
  );
}

export default function Calculator() {
  const [service, setService] = useState<ServiceType>("standard");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [frequency, setFrequency] = useState<Frequency>("biweekly");

  const result = calculatePrice({ service, bedrooms, bathrooms, frequency });
  const included = getService(service).included;

  return (
    <section id="calculator" className="bg-surface">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Instant price
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Get your instant price.
          </h2>
          <p className="mt-3 text-lg text-muted">
            Most cleans in the GTA fall between $120 and $500. Build yours below.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto mt-10 grid max-w-4xl overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg shadow-[0_8px_40px_rgba(15,26,23,0.07)] md:grid-cols-[1.15fr_1fr]">
            {/* Inputs */}
            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <Segmented
                legend="Service type"
                name="service"
                value={service}
                onChange={setService}
                options={SERVICES.map((s) => ({ id: s.id, label: s.label.replace(" Clean", "").replace("Move-In / Move-Out", "Move") }))}
              />

              <div className="grid grid-cols-2 gap-4">
                <Stepper
                  label="Bedrooms"
                  value={bedrooms}
                  min={0}
                  max={MAX_BEDROOMS}
                  display={bedroomLabel(bedrooms)}
                  onChange={setBedrooms}
                />
                <Stepper
                  label="Bathrooms"
                  value={bathrooms}
                  min={1}
                  max={MAX_BATHROOMS}
                  display={bathroomLabel(bathrooms)}
                  onChange={setBathrooms}
                />
              </div>

              <Segmented
                legend="How often?"
                name="frequency"
                cols={2}
                value={frequency}
                onChange={setFrequency}
                options={FREQUENCIES.map((f) => ({ id: f.id, label: f.label }))}
              />
              <p className="-mt-2 text-xs text-muted">
                Recurring plans save up to 18% — Weekly saves the most.
              </p>
            </div>

            {/* Output */}
            <div className="flex flex-col justify-between gap-5 border-t border-border bg-gradient-to-b from-surface to-bg p-6 sm:p-8 md:border-l md:border-t-0">
              <div>
                <p className="text-sm font-semibold text-muted">Your estimated price</p>
                <div
                  aria-live="polite"
                  className="mt-1 flex items-end gap-2"
                >
                  <span className="font-display text-5xl font-extrabold tracking-tight text-primary-d sm:text-6xl">
                    $<AnimatedPrice value={result.price} />
                  </span>
                  {result.discountPct > 0 && (
                    <span className="mb-2 text-sm font-medium text-muted line-through">
                      ${result.fullPrice}
                    </span>
                  )}
                </div>

                {result.discountPct > 0 ? (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary-d">
                    You save {result.discountPct}% with{" "}
                    {FREQUENCIES.find((f) => f.id === frequency)?.label.toLowerCase()}{" "}
                    service
                  </span>
                ) : (
                  <span className="mt-3 inline-flex items-center rounded-full bg-surface px-3 py-1 text-sm font-medium text-muted">
                    One-time clean — no commitment
                  </span>
                )}

                <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink/80">
                  <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-primary" />
                  <span>{included}</span>
                </p>
              </div>

              <div>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-bold text-ink shadow-sm transition-all hover:bg-accent-d hover:shadow-md active:translate-y-px"
                >
                  Book this clean
                  <ArrowRightIcon width={18} height={18} />
                </a>
                <p className="mt-3 text-center text-sm text-muted">
                  Send your address and preferred time in the DM and we&apos;ll
                  confirm your slot.
                </p>
                <p className="mt-2 text-center text-xs text-muted/80">
                  Estimate only — final quote confirmed at booking.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
