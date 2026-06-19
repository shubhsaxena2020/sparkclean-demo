"use client";

import { useState } from "react";
import { RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
import { useReducedMotion } from "motion/react";

const FAQS = [
  {
    q: "Do I need to be home for the cleaning?",
    a: "The template includes an access-notes field so a real client can define lockbox, concierge, key, and arrival policies before accepting a job.",
  },
  {
    q: "Are your cleaning products safe for pets and children?",
    a: "The product-safety module should list the client's actual supply standards, allergy process, pet rules, and any eco certifications they can prove.",
  },
  {
    q: "What is your rescheduling or cancellation policy?",
    a: "Use this section to publish the client's real rescheduling window, cancellation fee, lockout fee, and same-day availability policy.",
  },
  {
    q: "Do you bring your own cleaning supplies and equipment?",
    a: "The quote form can capture whether the cleaner brings supplies or uses client-provided products. A live site should state this clearly by service tier.",
  },
  {
    q: "What happens if I am not happy with the clean?",
    a: "Publish a specific re-clean policy: report window, eligible missed areas, photo requirements, and response time. Avoid broad guarantees without written terms.",
  },
  {
    q: "Which areas in the GTA do you serve?",
    a: "A real launch should connect service-area availability to postal codes or route rules. The template includes GTA area slots that need client verification.",
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
                className="rounded-[var(--radius)] border border-[var(--color-border)] bg-surface overflow-hidden transition-[background-color,border-color,box-shadow]"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-btn-${idx}`}
                    className="flex w-full items-center justify-between px-6 py-5 text-left font-bold text-ink hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/30"
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
                  hidden={!isOpen}
                  className={`px-6 overflow-hidden transition-[max-height,opacity,padding-bottom] duration-300 ${
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
