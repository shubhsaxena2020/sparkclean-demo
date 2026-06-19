import { PHONE_DISPLAY, PHONE_TEL, EMAIL } from "@/lib/site";
import Link from "next/link";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <>
      <footer className="bg-[#041A14] text-white/80 border-t border-[var(--color-primary)]/20 relative z-10">
        <div className="mx-auto max-w-[var(--maxw)] px-6 py-16">
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
            {/* Brand block */}
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-accent)] text-[var(--color-primary)] shadow-[0_4px_15px_rgba(212,175,55,0.25)]">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
                  </svg>
                </span>
                <span className="font-display text-xl font-extrabold tracking-tight text-white">
                  SparkClean
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                Eco-certified, bespoke home maintenance programs. Curation-level hospitality serving Toronto&apos;s most refined residences.
              </p>
              <p className="mt-3 text-xs text-white/40">
                Coverage: Rosedale, Forest Hill, Yorkville, The Annex, Lawrence Park, and the wider Greater Toronto Area.
              </p>
            </div>

            {/* Links block */}
            <nav aria-label="Footer Navigation">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                Bespoke Services
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-xs font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-[var(--color-accent)]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact details */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                Residency Inquiries
              </h2>
              <ul className="mt-5 flex flex-col gap-3 text-sm">
                <li>
                  <a href={PHONE_TEL} className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-[var(--color-accent)]">
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-[var(--color-accent)]">
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 SparkClean Toronto. All rights reserved.</p>
            <p>
              Designed &amp; Developed by{" "}
              <a
                href="https://shubhbuilds.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white/60 hover:text-[var(--color-accent)] underline underline-offset-2"
              >
                Shubh Saxena
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
