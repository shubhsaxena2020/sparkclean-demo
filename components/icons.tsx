// Inline SVG icons — no icon library, no images. Stroke = currentColor so
// callers control colour via Tailwind `text-*`.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const ShieldIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const LeafIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 19c0-8 5-13 14-13 0 9-5 14-13 14 0-4 2-7 6-9" />
  </svg>
);

export const BadgeCheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l2.1 1.6 2.6-.3 1 2.4 2.2 1.4-.6 2.6.6 2.6-2.2 1.4-1 2.4-2.6-.3L12 21l-2.1-1.6-2.6.3-1-2.4L4.1 16l.6-2.6L4.1 10.8 6.3 9.4l1-2.4 2.6.3L12 3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const GuaranteeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9" r="6" />
    <path d="M9.5 9l1.8 1.8L15 7" />
    <path d="M8.5 14L7 21l5-2.5L17 21l-1.5-7" />
  </svg>
);

export const RepeatIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 9a5 5 0 015-5h7" />
    <path d="M16 2l3 2-3 2" />
    <path d="M20 15a5 5 0 01-5 5H8" />
    <path d="M8 22l-3-2 3-2" />
  </svg>
);

export const SparkleIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3c.6 3.8 2.2 5.4 6 6-3.8.6-5.4 2.2-6 6-.6-3.8-2.2-5.4-6-6 3.8-.6 5.4-2.2 6-6z" />
    <path d="M19 14c.3 1.6 1 2.3 2.5 2.5-1.6.3-2.2 1-2.5 2.5-.3-1.6-1-2.2-2.5-2.5 1.6-.3 2.2-1 2.5-2.5z" />
  </svg>
);

export const TruckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 6h11v9H3z" />
    <path d="M14 9h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);

export const BuildingIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 21V5a2 2 0 012-2h7a2 2 0 012 2v16" />
    <path d="M16 9h3a2 2 0 012 2v10" />
    <path d="M8 7h2M8 11h2M8 15h2" />
    <path d="M3 21h18" />
  </svg>
);

export const HardHatIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 16a8 8 0 0116 0" />
    <path d="M10 8.5V6a2 2 0 014 0v2.5" />
    <path d="M3 16h18v2H3z" />
  </svg>
);

export const BriefcaseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
    <path d="M3 12h18" />
  </svg>
);

export const TagIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 12l9-9 9 9-9 9-9-9z" />
    <circle cx="12" cy="9" r="1.4" />
    <path d="M9 12l3 3 3-3" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12l5 5 9-10" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  // filled star — uses fill, ignores stroke base
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 20.4l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
