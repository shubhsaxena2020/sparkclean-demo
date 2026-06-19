"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import {
  SERVICES,
  FREQUENCIES,
  calculatePrice,
  getService,
  type ServiceType,
  type Frequency,
} from "@/lib/pricing";
import { BOOKING_URL } from "@/lib/site";
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

/** Accessible segmented radio control. */
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
    <fieldset className="border-0 p-0 m-0">
      <legend className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)]">{legend}</legend>
      <div className={`grid ${colClass} gap-2.5`} role="radiogroup" aria-label={legend}>
        {options.map((opt) => {
          const active = opt.id === value;
          return (
            <label
              key={opt.id}
              className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-all duration-300 outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--color-primary)]/40 has-[:focus-visible]:ring-offset-1 ${
                active
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_4px_15px_rgba(6,61,46,0.15)]"
                  : "border-[var(--color-border)] bg-[var(--color-bg)]/80 text-[var(--color-ink)] hover:border-[var(--color-primary)]/40 hover:bg-white"
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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)]">{label}</span>
      <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/80 p-1.5">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-ink)] transition-all duration-200 hover:bg-[var(--color-primary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          <MinusIcon width={16} height={16} />
        </button>
        <span aria-live="polite" className="min-w-[3rem] text-center text-sm font-bold text-[var(--color-ink)]">
          {display}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-ink)] transition-all duration-200 hover:bg-[var(--color-primary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          <PlusIcon width={16} height={16} />
        </button>
      </div>
    </div>
  );
}

export default function Calculator({ compact = false }: { compact?: boolean }) {
  const [service, setService] = useState<ServiceType>("standard");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [frequency, setFrequency] = useState<Frequency>("biweekly");

  const result = calculatePrice({ service, bedrooms, bathrooms, frequency });
  const included = getService(service).included;

  return (
    <div className={`w-full grid overflow-hidden rounded-[32px] border border-[var(--color-primary)]/10 bg-white/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(6,61,46,0.05)] ${compact ? "grid-cols-1" : "md:grid-cols-[1.2fr_1fr]"}`}>
      {/* Inputs */}
      <div className={`flex flex-col gap-7 p-6 sm:p-8 ${compact ? "" : "md:p-10"}`}>
        <Segmented
          legend="Select Cleaning tier"
          name="service"
          value={service}
          onChange={setService}
          options={SERVICES.map((s) => ({ id: s.id, label: s.label.replace(" Clean", "").replace("Move-In / Move-Out", "Move-In") }))}
        />

        <div className="grid grid-cols-2 gap-5">
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
          legend="Cleaning Frequency"
          name="frequency"
          cols={2}
          value={frequency}
          onChange={setFrequency}
          options={FREQUENCIES.map((f) => ({ id: f.id, label: f.label }))}
        />
        <p className="-mt-2.5 text-[11px] font-medium text-[var(--color-muted)]">
          * Recurring elite plans save up to 18% — Weekly saves the most.
        </p>
      </div>

      {/* Output */}
      <div className={`flex flex-col justify-between gap-6 border-t border-[var(--color-border)] bg-white/50 backdrop-blur-md p-6 sm:p-8 ${compact ? "" : "md:p-10 md:border-l md:border-t-0"}`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Your estimated rate</p>
          <div
            aria-live="polite"
            className="mt-2 flex items-baseline gap-2"
          >
            <span className="font-display text-5xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-6xl leading-none">
              $<AnimatedPrice value={result.price} />
            </span>
            {result.discountPct > 0 && (
              <span className="text-base font-semibold text-[var(--color-muted)] line-through">
                ${result.fullPrice}
              </span>
            )}
          </div>

          <div className="mt-4">
            {result.discountPct > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-xs font-semibold tracking-wide text-white">
                Save {result.discountPct}% with {FREQUENCIES.find((f) => f.id === frequency)?.label.toLowerCase()}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-[var(--color-surface-2)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)]">
                One-time premium clean
              </span>
            )}
          </div>

          <div className="mt-6 border-t border-[var(--color-border)] pt-5">
            <p className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--color-ink)]/90">
              <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
              <span>{included}</span>
            </p>
          </div>
        </div>

        <div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-d)] px-6 py-4 text-base font-bold text-white shadow-[0_4px_15px_rgba(6,61,46,0.15)] transition-all duration-300 ease-out hover:-translate-y-[2px]"
          >
            Book Standard Rate
            <ArrowRightIcon width={16} height={16} className="text-white" />
          </a>
          <p className="mt-4 text-center text-xs text-[var(--color-muted)] leading-relaxed">
            Estimate only — final quotes confirmed at dispatch booking.
          </p>
        </div>
      </div>
    </div>
  );
}
