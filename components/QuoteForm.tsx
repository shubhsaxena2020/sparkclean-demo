"use client";

import { FormEvent, useRef, useState } from "react";
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
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POSTAL_RE = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

type Errors = Partial<Record<"name" | "email" | "phone" | "postalCode" | "form", string>>;
type Status =
  | { type: "idle"; message: "" }
  | { type: "sending"; message: string }
  | { type: "error"; message: string }
  | { type: "success"; message: string };

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-ink)]">
      {children}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="text-xs font-semibold text-red-700">
      {message}
    </p>
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
  error,
  required = false,
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
  error?: string;
  required?: boolean;
}) {
  const errorId = `${id}-error`;

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
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-xl border border-[var(--color-border)] bg-white px-4 text-sm text-[var(--color-ink)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] transition-colors duration-200 placeholder:text-[var(--color-muted)]/70 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20"
      />
      <FieldError id={errorId} message={error} />
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
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const statusRef = useRef<HTMLParagraphElement>(null);

  const price = calculatePrice({ service, bedrooms, bathrooms, frequency });
  const serviceLabel = getService(service).label;
  const frequencyLabel = FREQUENCIES.find((item) => item.id === frequency)?.label ?? "Bi-weekly";

  function resetFeedback() {
    if (status.type !== "idle") setStatus({ type: "idle", message: "" });
    if (Object.keys(errors).length > 0) setErrors({});
  }

  function validate(): Errors {
    const nextErrors: Errors = {};

    if (name.trim().length < 2) nextErrors.name = "Enter your full name.";
    if (!EMAIL_RE.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 10) nextErrors.phone = "Enter a 10-digit phone number.";
    if (!POSTAL_RE.test(postalCode.trim())) nextErrors.postalCode = "Enter a valid Canadian postal code.";

    return nextErrors;
  }

  function focusFirstError(nextErrors: Errors) {
    const first = ["name", "email", "phone", "postalCode"].find((key) => nextErrors[key as keyof Errors]);
    if (!first) {
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    const idByField: Record<string, string> = {
      name: "quote-name",
      email: "quote-email",
      phone: "quote-phone",
      postalCode: "quote-postal",
    };

    requestAnimationFrame(() => document.getElementById(idByField[first])?.focus());
  }

  function mailtoHref() {
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
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ type: "error", message: "Fix the highlighted fields and send the request again." });
      focusFirstError(nextErrors);
      return;
    }

    setErrors({});
    setStatus({ type: "sending", message: "Sending quote request..." });

    const response = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service: serviceLabel,
        frequency: frequencyLabel,
        bedrooms,
        bathrooms,
        price: price.price,
        name,
        email,
        phone,
        postalCode,
        preferredDate,
        notes,
      }),
    });

    const result = (await response.json()) as {
      ok?: boolean;
      referenceId?: string;
      delivery?: "sent";
      errors?: Errors;
    };

    if (!response.ok || !result.ok) {
      const formError = result.errors?.form ?? "The request could not be sent. Use the email fallback below.";
      setErrors(result.errors ?? { form: formError });
      setStatus({ type: "error", message: formError });
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setStatus({
      type: "success",
      message: `Quote request sent. Reference ${result.referenceId}.`,
    });
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  return (
    <section id="quote" className="relative z-10 mx-auto max-w-[var(--maxw)] px-6 py-16 sm:py-20">
      <div className="grid overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-[0_24px_80px_-45px_rgba(7,15,12,0.35)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-[var(--color-ink)] p-8 text-white sm:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">Instant Estimate</p>
          <h2 className="mt-4 max-w-md font-display text-4xl font-extrabold leading-tight text-pretty sm:text-5xl">
            Turn your cleaning details into a clear quote request.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/82">
            Share the details needed before confirming a job: service scope, home size, location, contact, preferred timing, and access notes.
          </p>
          <div className="mt-10 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">Estimated Rate</p>
            <div className="mt-2 flex items-end gap-3">
              <span className="font-display text-6xl font-extrabold tabular-nums leading-none">${price.price}</span>
              {price.savings > 0 && (
                <span className="pb-2 text-sm font-semibold text-white/65 line-through">${price.fullPrice}</span>
              )}
            </div>
            <p className="mt-4 text-sm leading-6 text-white/75">
              {serviceLabel} - {frequencyLabel} - {bedrooms === 0 ? "Studio" : `${bedrooms} bed`} - {bathrooms} bath
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-7 p-6 sm:p-8 lg:p-10" noValidate>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <FieldLabel htmlFor="quote-service">Service</FieldLabel>
              <select
                id="quote-service"
                name="service"
                value={service}
                onChange={(event) => {
                  resetFeedback();
                  setService(event.target.value as ServiceType);
                }}
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
                onChange={(event) => {
                  resetFeedback();
                  setFrequency(event.target.value as Frequency);
                }}
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
                onChange={(event) => {
                  resetFeedback();
                  setBedrooms(Number(event.target.value));
                }}
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
                onChange={(event) => {
                  resetFeedback();
                  setBathrooms(Number(event.target.value));
                }}
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
            <TextInput id="quote-name" name="name" label="Name" value={name} onChange={(value) => { resetFeedback(); setName(value); }} placeholder="Priya Kumar..." autoComplete="name" error={errors.name} required />
            <TextInput id="quote-email" name="email" label="Email" type="email" inputMode="email" value={email} onChange={(value) => { resetFeedback(); setEmail(value); }} placeholder="priya@example.com..." autoComplete="email" error={errors.email} required />
            <TextInput id="quote-phone" name="tel" label="Phone" type="tel" inputMode="tel" value={phone} onChange={(value) => { resetFeedback(); setPhone(value); }} placeholder="416 800 1234..." autoComplete="tel" error={errors.phone} required />
            <TextInput id="quote-postal" name="postal-code" label="Postal Code" value={postalCode} onChange={(value) => { resetFeedback(); setPostalCode(value); }} placeholder="M4W 1A5..." autoComplete="postal-code" error={errors.postalCode} required />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <TextInput id="quote-date" name="preferred-date" label="Preferred Time" value={preferredDate} onChange={(value) => { resetFeedback(); setPreferredDate(value); }} placeholder="Friday morning..." autoComplete="off" />
            <div className="grid gap-2">
              <FieldLabel htmlFor="quote-notes">Access Notes</FieldLabel>
              <textarea
                id="quote-notes"
                name="notes"
                value={notes}
                onChange={(event) => {
                  resetFeedback();
                  setNotes(event.target.value);
                }}
                placeholder="Pets, parking, lockbox, supplies..."
                rows={3}
                className="min-h-12 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] transition-colors duration-200 placeholder:text-[var(--color-muted)]/70 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                ref={statusRef}
                tabIndex={-1}
                aria-live="polite"
                className={`min-h-6 text-sm font-semibold ${
                  status.type === "error" ? "text-red-700" : status.type === "success" ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"
                }`}
              >
                {status.message || "Estimate updates as you change the service details."}
              </p>
              {errors.form && (
                <a
                  href={mailtoHref()}
                  className="mt-2 inline-flex text-sm font-bold text-[var(--color-ink)] transition-colors hover:text-primary-d focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  Email the request instead
                </a>
              )}
            </div>
            <button
              type="submit"
              disabled={status.type === "sending"}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-[var(--color-primary)] px-6 text-sm font-bold text-[var(--color-ink)] shadow-[0_14px_32px_-18px_rgba(217,155,0,0.85)] transition-colors duration-200 hover:bg-[var(--color-primary-d)] disabled:cursor-wait disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40"
            >
              {status.type === "sending" ? "Sending..." : "Request Quote"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
