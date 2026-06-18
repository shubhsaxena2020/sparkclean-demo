"use client";

import { useEffect, useState } from "react";
import { BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { PhoneIcon, MenuIcon, CloseIcon } from "./icons";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Areas", href: "#areas" },
];

function Logo() {
  return (
    <a href="#main" className="flex items-center gap-2" aria-label="SparkClean home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white shadow-[0_0_15px_rgba(15,182,126,0.3)]">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
          <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
        </svg>
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-ink">
        SparkClean
      </span>
    </a>
  );
}

function DemoPill() {
  return (
    <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary-d">
      ✦ DEMO
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[var(--color-border)] shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[var(--maxw)] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden sm:inline-flex">
            <DemoPill />
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side — phone + Book Now stay visible at every breakpoint */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PHONE_TEL}
            className="hidden items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-primary sm:flex"
          >
            <PhoneIcon width={14} height={14} className="text-primary shrink-0" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_TEL}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-primary transition-colors hover:bg-[var(--color-surface)] sm:hidden"
          >
            <PhoneIcon width={16} height={16} />
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-ink shadow-[0_4px_10px_rgba(255,197,61,0.25)] transition-all hover:bg-[#F5B625] hover:shadow-[0_6px_15px_rgba(255,197,61,0.4)] active:translate-y-px"
          >
            Book Now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-ink transition-colors hover:bg-[var(--color-surface)] md:hidden"
          >
            {open ? <CloseIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {open && (
        <nav
          className="border-t border-[var(--color-border)] bg-white/95 backdrop-blur-md md:hidden shadow-[0_10px_30px_rgba(15,26,23,0.08)]"
          aria-label="Mobile"
        >
          <ul className="mx-auto flex max-w-[var(--maxw)] flex-col px-4 py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-ink transition-colors hover:bg-[var(--color-surface)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="px-2 py-3">
              <DemoPill />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
