"use client";

import { useState } from "react";
import { RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
import { useReducedMotion } from "motion/react";

const FAQS = [
  {
    q: "Do I need to be home for the cleaning?",
    a: "No, you do not need to be present. Many of our clients provide a key code or lockbox access. We ensure secure entry and exit for every home.",
  },
  {
    q: "Are your cleaning products safe for pets and children?",
    a: "Yes, absolutely. We use eco-certified, non-toxic products that clean effectively without leaving harsh chemicals or residues.",
  },
  {
    q: "What is your rescheduling or cancellation policy?",
    a: "We request at least 24 hours notice for any schedule changes or cancellations. Changes made inside 24 hours may incur a small booking fee.",
  },
  {
    q: "Do you bring your own cleaning supplies and equipment?",
    a: "Yes, our teams arrive fully equipped with premium microfiber cloths, eco-friendly products, and high-filtration HEPA vacuums.",
  },
  {
    q: "What happens if I am not happy with the clean?",
    a: "We offer a 100% satisfaction guarantee. If any area is missed or not cleaned to your standards, let us know within 24 hours and we will return to re-clean it.",
  },
  {
    q: "Which areas in the GTA do you serve?",
    a: "We service Toronto, North York, Scarborough, Etobicoke, East York, Mississauga, Vaughan, Markham, Richmond Hill, Brampton, Thornhill, and Oakville.",
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
          <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block">
            FAQ
          </RevealEyebrow>
          <RevealHeading
            text="Frequently Asked Questions"
            className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl leading-[1.05]"
          />
          <RevealSubtext className="mt-3 text-base text-muted">
            Got questions? We have answers to help you feel confident in our service.
          </RevealSubtext>
        </div>

        <RevealGroup className="mt-12 flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <RevealItem
                key={idx}
                className="rounded-[var(--radius)] border border-[var(--color-border)] bg-surface overflow-hidden transition-all"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-btn-${idx}`}
                    className="flex w-full items-center justify-between px-6 py-5 text-left font-bold text-ink hover:text-primary transition-colors focus-visible:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`ml-4 text-primary transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={reduce ? { transition: "none" } : undefined}
                    >
                      ▼
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    isOpen ? "pb-6 max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={reduce ? { transition: "none" } : undefined}
                >
                  <p className="text-sm leading-relaxed text-muted border-t border-[var(--color-border)] pt-4">
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
