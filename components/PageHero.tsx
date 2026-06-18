"use client";

import { RevealEyebrow, RevealHeading, RevealSubtext } from "./Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
}

export default function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="w-full bg-white py-16 sm:py-24 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
        <div className="max-w-3xl">
          <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block">
            {eyebrow}
          </RevealEyebrow>
          <RevealHeading
            as="h1"
            text={title}
            className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl leading-[1.05]"
          />
          <RevealSubtext className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
            {intro}
          </RevealSubtext>
        </div>
      </div>
    </section>
  );
}
