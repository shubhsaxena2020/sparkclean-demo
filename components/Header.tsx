"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { PhoneIcon, MenuIcon, CloseIcon } from "./icons";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/about" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="SparkClean home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-primary)] text-white shadow-[0_4px_15px_rgba(6,61,46,0.2)] overflow-hidden relative">
        <Image
          src="/img/sparkle.gif"
          alt="Sparkling logo"
          width={22}
          height={22}
          className="object-contain"
          unoptimized
        />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-[var(--color-ink)]">
        SparkClean
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-[var(--color-primary)]/10 shadow-[0_10px_30px_rgba(6,61,46,0.03)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[var(--maxw)] items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:text-[var(--color-primary)] relative py-1 ${
                  active
                    ? "text-[var(--color-primary)] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[var(--color-primary)]"
                    : "text-[var(--color-ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={PHONE_TEL}
            className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-primary)] sm:flex"
          >
            <PhoneIcon width={12} height={12} className="text-[var(--color-primary)] shrink-0" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_TEL}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-border)] text-[var(--color-primary)] transition-colors hover:bg-white sm:hidden"
          >
            <PhoneIcon width={16} height={16} />
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-d)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_15px_rgba(6,61,46,0.15)] transition-all duration-200"
          >
            Book Now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-border)] text-[var(--color-ink)] transition-colors hover:bg-white md:hidden"
          >
            {open ? <CloseIcon width={18} height={18} /> : <MenuIcon width={18} height={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown navigation */}
      {open && (
        <nav
          className="border-t border-[var(--color-border)] bg-white/95 backdrop-blur-xl md:hidden shadow-[0_10px_35px_rgba(6,61,46,0.06)]"
          aria-label="Mobile"
        >
          <ul className="mx-auto flex max-w-[var(--maxw)] flex-col px-6 py-4 gap-2">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-widest transition-colors hover:bg-[var(--color-surface-2)]/50 ${
                      active ? "text-[var(--color-primary)] bg-[var(--color-surface-2)]/30 font-bold" : "text-[var(--color-ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
