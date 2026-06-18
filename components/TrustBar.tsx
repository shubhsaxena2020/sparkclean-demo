import { ShieldIcon, LeafIcon, BadgeCheckIcon, GuaranteeIcon } from "./icons";

const ITEMS = [
  { icon: ShieldIcon, label: "Insured & Bonded" },
  { icon: LeafIcon, label: "Eco-Friendly Products" },
  { icon: BadgeCheckIcon, label: "Background-Checked Cleaners" },
  { icon: GuaranteeIcon, label: "100% Satisfaction Guarantee" },
];

export default function TrustBar() {
  return (
    <section aria-label="Why homeowners trust us" className="border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <ul className="mx-auto grid max-w-[var(--maxw)] grid-cols-2 gap-x-6 gap-y-5 px-4 py-6 sm:px-6 md:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5">
            <Icon width={22} height={22} className="shrink-0 text-primary" />
            <span className="text-sm font-semibold text-white/90">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
