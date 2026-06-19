import Link from "next/link";
import { BOOKING_URL, EMAIL } from "@/lib/site";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-primary)]/25 bg-[#15130D] text-white/80">
      <div className="mx-auto max-w-[var(--maxw)] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-accent)] text-xs font-black text-[var(--color-ink)] shadow-[0_4px_15px_rgba(244,180,0,0.3)]">
                SC
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                SparkClean
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/62">
              Toronto and GTA home cleaning quote requests with transparent estimates,
              service-area clarity, and written scope before confirmation.
            </p>
            <p className="mt-3 text-xs leading-6 text-white/42">
              Email quote requests are reviewed before any visit is confirmed. Final scope,
              timing, access details, and product preferences are confirmed in writing.
            </p>
          </div>

          <nav aria-label="Footer Navigation">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Pages
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/30"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Quote Intake
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={BOOKING_URL}
                  className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/30"
                >
                  Request Quote
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/30"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SparkClean Toronto. Quote requests are confirmed by email.</p>
          <p>Serving Toronto and nearby GTA neighborhoods by availability.</p>
        </div>
        <p className="mt-6 text-center text-xs text-white/45 sm:text-left">
          Demo site built by Shubh Saxena —{" "}
          <a
            href="https://shubhbuilds.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-accent)] transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/30"
          >
            shubhbuilds.com
          </a>
        </p>
      </div>
    </footer>
  );
}
