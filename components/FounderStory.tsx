"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealEyebrow, RevealHeading, RevealSubtext } from "./Reveal";
import { GuaranteeIcon } from "./icons";

export default function FounderStory({ showLink = false }: { showLink?: boolean }) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-surface py-24 sm:py-32 lg:py-36">
      <div className="relative z-10 mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="relative flex flex-col items-start text-left lg:col-span-7">
            <span className="pointer-events-none absolute -left-4 -top-16 select-none font-display text-[9rem] font-black leading-none text-primary/[0.04]">
              02
            </span>

            <div className="relative z-10 flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-sm font-black text-[var(--color-ink)] shadow-[0_4px_12px_rgba(217,155,0,0.25)]">
                SC
              </span>
              <RevealEyebrow className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)]">
                Founder Story
              </RevealEyebrow>
            </div>

            <RevealHeading
              text="Built around clear cleaning requests."
              className="mt-4 text-3xl font-black tracking-[-0.02em] text-ink text-balance sm:text-4xl"
              as="h2"
            />

            <RevealSubtext className="relative z-10 mt-6 border-l-4 border-primary/40 pl-4 text-xl font-medium italic leading-[1.6] text-ink sm:text-2xl">
              &quot;A good clean starts before the door opens. SparkClean asks for the scope, timing, postal code, access notes, pets, parking, and product preferences up front so the visit can be confirmed clearly.&quot;
            </RevealSubtext>

            <RevealSubtext className="relative z-10 mt-6 text-sm font-bold text-muted">
              SparkClean quote process
            </RevealSubtext>

            {showLink && (
              <RevealSubtext className="relative z-10 mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-ink)] transition-colors hover:text-primary-d focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  About Us
                </Link>
              </RevealSubtext>
            )}
          </div>

          <div className="flex w-full justify-center lg:col-span-5">
            <Reveal className="relative w-full max-w-[380px]">
              <div className="relative rounded-[32px] border border-[var(--color-border)] bg-white p-4 shadow-[0_20px_50px_-20px_rgba(21,19,13,0.15)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_25px_60px_-15px_rgba(217,155,0,0.25)] md:-rotate-2 md:hover:rotate-0">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[var(--color-border)]">
                  <Image
                    src="/img/founder.webp"
                    alt="Professional cleaner in a bright home preparing for a scheduled cleaning visit"
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>

              <div className="mt-4 inline-flex w-fit items-center gap-3 rounded-2xl bg-[#15130D] px-5 py-4 shadow-[0_20px_50px_-20px_rgba(21,19,13,0.65)] sm:absolute sm:-bottom-5 sm:-left-5 sm:z-20 sm:mt-0">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-accent)] text-[var(--color-ink)]">
                  <GuaranteeIcon width={20} height={20} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-display text-lg font-black text-[var(--color-bg)]">24-Hour</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">Issue Window</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
