"use client";

import { Reveal } from "./Reveal";
import { LeafIcon } from "./icons";
import Image from "next/image";

export default function FounderStory() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[var(--maxw)] px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <Reveal className="mx-auto max-w-4xl">
          <div className="grid gap-8 items-center rounded-[var(--radius)] border border-[var(--color-border)] bg-surface p-8 sm:p-12 md:grid-cols-[1fr_1.8fr] shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)]">
            {/* Left Column: Image */}
            <div className="relative w-full aspect-[4/3] md:aspect-[3/4] overflow-hidden rounded-[20px] border border-[var(--color-border)] shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
              <Image
                src="/img/founder.jpg"
                alt="Friendly professional cleaner smiling in a clean bright house"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
            </div>
            
            {/* Right Column: Story */}
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-black text-white shrink-0">
                  SC
                </span>
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <LeafIcon width={16} height={16} />
                  Local, and we act like it
                </p>
              </div>
              <blockquote className="mt-6 text-lg leading-[1.75] text-ink italic">
                &ldquo;SparkClean started with one family, one minivan, and a
                simple promise: show up on time, use products safe for kids and
                pets, and leave every home better than we found it. We&apos;re
                not a franchise — we&apos;re your neighbours, and our name is on
                every clean.&rdquo;
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-muted">
                — The SparkClean family · Family-owned in the GTA
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
