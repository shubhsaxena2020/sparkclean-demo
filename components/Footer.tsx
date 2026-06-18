import { PHONE_DISPLAY, PHONE_TEL, EMAIL } from "@/lib/site";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Areas", href: "#areas" },
];

export default function Footer() {
  return (
    <>
      <div className="h-[1px] w-full bg-gradient-to-r from-primary/25 via-transparent to-primary/25" />
      <footer className="bg-ink text-white/80">
        <div className="mx-auto max-w-[var(--maxw)] px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
                  </svg>
                </span>
                <span className="font-display text-xl font-extrabold tracking-tight text-white">
                  SparkClean
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                Eco-friendly home cleaning, trusted across the GTA.
              </p>
              <p className="mt-3 text-sm text-white/60">
                Serving Toronto, North York, Mississauga, Vaughan, Markham &amp;
                the wider GTA.
              </p>
            </div>

            {/* Links */}
            <nav aria-label="Footer">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white/50">
                Explore
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-white/75 transition-colors hover:text-primary">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white/50">
                Contact
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                <li>
                  <a href={PHONE_TEL} className="text-white/75 transition-colors hover:text-primary">
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className="text-white/75 transition-colors hover:text-primary">
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 SparkClean (demo)</p>
            <p>
              Demo site built by{" "}
              <a
                href="https://shubhbuilds.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline-offset-2 hover:text-primary hover:underline"
              >
                Shubh Saxena — shubhbuilds.com
              </a>
            </p>
          </div>
          <p className="mt-3 text-xs text-white/40">
            Live booking-system integration available on request.
          </p>
        </div>
      </footer>
    </>
  );
}
