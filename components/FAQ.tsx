"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";

const FAQS = [
  {
    q: "Do I need to be home for the cleaning?",
    a: "Use the access-notes field to describe lockbox, concierge, key, parking, pet, and arrival instructions before the quote is confirmed.",
  },
  {
    q: "Are your cleaning products safe for pets and children?",
    a: "Add allergies, pets, fragrance sensitivity, and supply preferences in the quote notes so SparkClean can confirm the right setup before booking.",
  },
  {
    q: "What is your rescheduling or cancellation policy?",
    a: "Rescheduling, lockout, and cancellation details are confirmed with the quote because timing and access rules can vary by job.",
  },
  {
    q: "Do you bring your own cleaning supplies and equipment?",
    a: "Include your supply preference in the request. SparkClean can confirm whether supplies are provided or client-provided products are preferred.",
  },
  {
    q: "What happens if I am not happy with the clean?",
    a: "Report missed areas within 24 hours with photos and a short description so the concern can be reviewed quickly.",
  },
  {
    q: "Which areas in the GTA do you serve?",
    a: "SparkClean reviews availability by postal code, route capacity, requested scope, access notes, and preferred timing.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <RevealEyebrow className="block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            FAQ
          </RevealEyebrow>
          <RevealHeading
            text="Frequently Asked Questions"
            className="mt-2 text-3xl font-extrabold leading-[1.05] tracking-tight text-ink text-balance sm:text-4xl"
          />
          <RevealSubtext className="mt-3 text-base text-muted">
            Clear answers help you send a usable quote request before any appointment is confirmed.
          </RevealSubtext>
        </div>

        <RevealGroup className="mt-12 flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <RevealItem
                key={faq.q}
                className="overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)] bg-surface transition-[background-color,border-color,box-shadow]"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-btn-${idx}`}
                    className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left font-bold text-ink transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    <span>{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className={`ml-4 text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      style={reduce ? { transition: "none" } : undefined}
                    >
                      v
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  hidden={!isOpen}
                  className={`overflow-hidden px-6 transition-[max-height,opacity,padding-bottom] duration-300 ${
                    isOpen ? "max-h-[200px] pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={reduce ? { transition: "none" } : undefined}
                >
                  <p className="border-t border-[var(--color-border)] pt-4 text-sm leading-relaxed text-muted">
                    {faq.a}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
