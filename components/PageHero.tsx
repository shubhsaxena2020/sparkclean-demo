"use client";

import { RevealEyebrow, RevealHeading, RevealSubtext } from "./Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
}

export default function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section 
      className="relative overflow-hidden bg-[var(--color-bg)] blueprint-grid border-b border-[var(--color-border)] pt-32 pb-20 sm:pt-40 sm:pb-28"
      style={{ background: "radial-gradient(circle at 10% 20%, rgba(244, 180, 0, 0.07), transparent 60%)" }}
    >
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl">
          <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary block">
            {eyebrow}
          </RevealEyebrow>
          <RevealHeading
            as="h1"
            text={title}
            className="mt-3 text-4xl font-black tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl leading-[1.02]"
          />
          <RevealSubtext className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
            {intro}
          </RevealSubtext>
        </div>
      </div>
    </section>
  );
}
