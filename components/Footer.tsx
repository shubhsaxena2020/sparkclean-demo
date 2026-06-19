import { BOOKING_URL, EMAIL } from "@/lib/site";
import Link from "next/link";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-primary)]/20 bg-[#041A14] text-white/80">
      <div className="mx-auto max-w-[var(--maxw)] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-accent)] text-xs font-black text-[var(--color-primary)] shadow-[0_4px_15px_rgba(212,175,55,0.25)]">
                SC
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                SparkClean
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/62">
              A client-ready cleaning website template built around quote intake,
              transparent estimates, service-area clarity, and replaceable proof modules.
            </p>
            <p className="mt-3 text-xs leading-6 text-white/42">
              Real launches should connect a verified phone number, business address,
              review profile, insurance proof, and booking system before claiming them.
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
                    className="text-xs font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors duration-200 hover:text-[var(--color-accent)]"
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
                  className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  Request quote
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SparkClean Toronto. Template content requires client verification before launch.</p>
          <p>Designed & developed for client conversion workflows.</p>
        </div>
      </div>
    </footer>
  );
}
