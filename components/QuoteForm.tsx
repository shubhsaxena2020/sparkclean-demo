"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  SERVICES,
  FREQUENCIES,
  calculatePrice,
  getService,
  type Frequency,
  type ServiceType,
} from "@/lib/pricing";
import { EMAIL } from "@/lib/site";

const BEDROOMS = [0, 1, 2, 3, 4, 5];
const BATHROOMS = [1, 2, 3, 4];

type Status =
  | { type: "idle"; message: "" }
  | { type: "error"; message: string }
  | { type: "ready"; message: string; href: string };

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]">
      {children}
    </label>
  );
}

function TextInput({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
}) {
  return (
    <div className="grid gap-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        name={name}
        value={value}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        spellCheck={type === "email" ? false : undefined}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-xl border border-[var(--color-border)] bg-white px-4 text-sm text-[var(--color-ink)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] transition-colors duration-200 placeholder:text-[var(--color-muted)]/70 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20"
      />
    </div>
  );
}

export default function QuoteForm() {
  const [service, setService] = useState<ServiceType>("standard");
  const [frequency, setFrequency] = useState<Frequency>("biweekly");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const statusRef = useRef<HTMLParagraphElement>(null);

  const price = calculatePrice({ service, bedrooms, bathrooms, frequency });
  const serviceLabel = getService(service).label;
  const frequencyLabel = FREQUENCIES.find((item) => item.id === frequency)?.label ?? "Bi-weekly";

  const mailtoHref = useMemo(() => {
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Postal code: ${postalCode}`,
      `Preferred date/time: ${preferredDate || "Flexible"}`,
      `Service: ${serviceLabel}`,
      `Bedrooms: ${bedrooms === 0 ? "Studio" : bedrooms}`,
      `Bathrooms: ${bathrooms}`,
      `Frequency: ${frequencyLabel}`,
      `Estimated rate: $${price.price}`,
      "",
      `Notes: ${notes || "None"}`,
    ].join("\n");

    return `mailto:${EMAIL}?subject=${encodeURIComponent("SparkClean Quote Request")}&body=${encodeURIComponent(body)}`;
  }, [bathrooms, bedrooms, email, frequencyLabel, name, notes, phone, postalCode, preferredDate, price.price, serviceLabel]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !postalCode.trim()) {
      setStatus({
        type: "error",
        message: "Add your name, email, phone, and postal code so the quote request is usable.",
      });
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setStatus({
      type: "ready",
      message: "Quote summary is ready. Open your email draft to send this request.",
      href: mailtoHref,
    });
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  return (
    <section id="quote" className="relative z-10 mx-auto max-w-[var(--maxw)] px-6 py-16 sm:py-20">
      <div className="grid overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-[0_24px_80px_-45px_rgba(7,15,12,0.35)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-[var(--color-primary)] p-8 text-white sm:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">Instant Estimate</p>
          <h2 className="mt-4 max-w-md font-display text-4xl font-extrabold leading-tight text-pretty sm:text-5xl">
            Turn pricing into a real lead, not a dead-end button.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/82">
            This form captures the details a cleaning operator needs before confirming a job:
            service scope, home size, location, contact, preferred timing, and access notes.
          </p>
          <div className="mt-10 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">Estimated Rate</p>
            <div className="mt-2 flex items-end gap-3">
              <span className="font-display text-6xl font-extrabold tabular-nums leading-none">${price.price}</span>
              {price.discountPct > 0 && (
                <span className="pb-2 text-sm font-semibold text-white/65 line-through">${price.fullPrice}</span>
              )}
            </div>
            <p className="mt-4 text-sm leading-6 text-white/75">
              {serviceLabel} · {frequencyLabel} · {bedrooms === 0 ? "Studio" : `${bedrooms} bed`} · {bathrooms} bath
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-7 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <FieldLabel htmlFor="quote-service">Service</FieldLabel>
              <select
                id="quote-service"
                name="service"
                value={service}
                onChange={(event) => setService(event.target.value as ServiceType)}
                className="min-h-12 rounded-xl border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-ink)] transition-colors duration-200 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20"
              >
                {SERVICES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <FieldLabel htmlFor="quote-frequency">Frequency</FieldLabel>
              <select
                id="quote-frequency"
                name="frequency"
                value={frequency}
                onChange={(event) => setFrequency(event.target.value as Frequency)}
                className="min-h-12 rounded-xl border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-ink)] transition-colors duration-200 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20"
              >
                {FREQUENCIES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <FieldLabel htmlFor="quote-bedrooms">Bedrooms</FieldLabel>
              <select
                id="quote-bedrooms"
                name="bedrooms"
                value={bedrooms}
                onChange={(event) => setBedrooms(Number(event.target.value))}
                className="min-h-12 rounded-xl border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-ink)] transition-colors duration-200 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20"
              >
                {BEDROOMS.map((item) => (
                  <option key={item} value={item}>
                    {item === 0 ? "Studio" : `${item}${item === 5 ? "+" : ""} bedrooms`}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <FieldLabel htmlFor="quote-bathrooms">Bathrooms</FieldLabel>
              <select
                id="quote-bathrooms"
                name="bathrooms"
                value={bathrooms}
                onChange={(event) => setBathrooms(Number(event.target.value))}
                className="min-h-12 rounded-xl border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-ink)] transition-colors duration-200 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20"
              >
                {BATHROOMS.map((item) => (
                  <option key={item} value={item}>
                    {item}{item === 4 ? "+" : ""} bathrooms
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <TextInput id="quote-name" name="name" label="Name" value={name} onChange={setName} placeholder="Priya Kumar…" autoComplete="name" />
            <TextInput id="quote-email" name="email" label="Email" type="email" inputMode="email" value={email} onChange={setEmail} placeholder="priya@example.com…" autoComplete="email" />
            <TextInput id="quote-phone" name="tel" label="Phone" type="tel" inputMode="tel" value={phone} onChange={setPhone} placeholder="416 800 1234…" autoComplete="tel" />
            <TextInput id="quote-postal" name="postal-code" label="Postal Code" value={postalCode} onChange={setPostalCode} placeholder="M4W 1A5…" autoComplete="postal-code" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <TextInput id="quote-date" name="preferred-date" label="Preferred Time" value={preferredDate} onChange={setPreferredDate} placeholder="Friday morning…" autoComplete="off" />
            <div className="grid gap-2">
              <FieldLabel htmlFor="quote-notes">Access Notes</FieldLabel>
              <textarea
                id="quote-notes"
                name="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Pets, parking, lockbox, supplies…"
                rows={3}
                className="min-h-12 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] transition-colors duration-200 placeholder:text-[var(--color-muted)]/70 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p
              ref={statusRef}
              tabIndex={-1}
              aria-live="polite"
              className={`min-h-6 text-sm font-semibold ${
                status.type === "error" ? "text-red-700" : status.type === "ready" ? "text-[var(--color-primary)]" : "text-[var(--color-muted)]"
              }`}
            >
              {status.message || "Estimate updates as you change the service details."}
            </p>
            {status.type === "ready" ? (
              <a
                href={status.href}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--color-primary)] px-6 text-sm font-bold text-white shadow-[0_14px_32px_-18px_rgba(6,61,46,0.8)] transition-colors duration-200 hover:bg-[var(--color-primary-d)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30"
              >
                Open Email Draft
              </a>
            ) : (
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--color-primary)] px-6 text-sm font-bold text-white shadow-[0_14px_32px_-18px_rgba(6,61,46,0.8)] transition-colors duration-200 hover:bg-[var(--color-primary-d)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30"
              >
                Prepare Quote Request
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
