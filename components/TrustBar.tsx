import { ShieldIcon, LeafIcon, BadgeCheckIcon, GuaranteeIcon } from "./icons";

const ITEMS = [
  { icon: ShieldIcon, label: "Insured & Bonded" },
  { icon: LeafIcon, label: "Eco-Friendly Products" },
  { icon: BadgeCheckIcon, label: "Background-Checked Cleaners" },
  { icon: GuaranteeIcon, label: "100% Satisfaction Guarantee" },
];

export default function TrustBar() {
  return (
    <section aria-label="Why homeowners trust us" className="border-y border-[var(--color-border)] bg-surface py-5">
      <ul className="mx-auto flex flex-wrap justify-between items-center gap-x-6 gap-y-4 px-4 max-w-[var(--maxw)] sm:px-6">
        {ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5">
            <Icon width={20} height={20} className="shrink-0 text-primary" />
            <span className="text-sm font-semibold text-ink">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
