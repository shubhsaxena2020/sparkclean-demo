// Typed pricing rules for the SparkClean instant-price calculator.
// Mirrors 01_ARCHITECTURE.md exactly. Pure functions, no side effects.

export type ServiceType = "standard" | "deep" | "move";
export type Frequency = "onetime" | "monthly" | "biweekly" | "weekly";

export interface ServiceOption {
  id: ServiceType;
  label: string;
  base: number;
  perBedroom: number;
  perBathroom: number; // charged for each bathroom beyond the first
  included: string;
}

export interface FrequencyOption {
  id: Frequency;
  label: string;
  discount: number; // applied to the total
}

// base by service · + per bedroom · + per bathroom beyond 1
export const SERVICES: ServiceOption[] = [
  {
    id: "standard",
    label: "Standard Clean",
    base: 109,
    perBedroom: 20,
    perBathroom: 18,
    included: "Dusting, vacuuming, mopping, kitchen & bathrooms.",
  },
  {
    id: "deep",
    label: "Deep Clean",
    base: 179,
    perBedroom: 30,
    perBathroom: 25,
    included:
      "Everything in Standard + inside oven, fridge, baseboards, window sills.",
  },
  {
    id: "move",
    label: "Move-In / Move-Out",
    base: 229,
    perBedroom: 35,
    perBathroom: 30,
    included: "Full deep clean + inside all cabinets, closets, and appliances.",
  },
];

// frequency discount applied to the total
export const FREQUENCIES: FrequencyOption[] = [
  { id: "onetime", label: "One-time", discount: 0 },
  { id: "monthly", label: "Monthly", discount: 0.05 },
  { id: "biweekly", label: "Bi-weekly", discount: 0.12 },
  { id: "weekly", label: "Weekly", discount: 0.18 },
];

// Real GTA band — clamp the displayed estimate so it always reads credibly.
export const PRICE_MIN = 120;
export const PRICE_MAX = 520;

export interface PriceInput {
  service: ServiceType;
  bedrooms: number; // 0 = studio (counts as 0 rooms); up to 5
  bathrooms: number; // 1 to 4
  frequency: Frequency;
}

export interface PriceResult {
  price: number; // final, rounded to $5 and clamped to the GTA band
  fullPrice: number; // before the frequency discount (rounded to $5, clamped)
  discountPct: number; // 0–18, integer percent
  savings: number; // dollars saved vs one-time, at the displayed prices
}

const roundTo5 = (n: number) => Math.round(n / 5) * 5;
const clamp = (n: number) => Math.min(PRICE_MAX, Math.max(PRICE_MIN, n));

export function getService(id: ServiceType): ServiceOption {
  return SERVICES.find((s) => s.id === id) ?? SERVICES[0];
}

export function getFrequency(id: Frequency): FrequencyOption {
  return FREQUENCIES.find((f) => f.id === id) ?? FREQUENCIES[0];
}

export function calculatePrice(input: PriceInput): PriceResult {
  const service = getService(input.service);
  const freq = getFrequency(input.frequency);

  // studio (0 bedrooms) adds nothing per the spec; bathrooms charged beyond 1
  const extraBathrooms = Math.max(0, input.bathrooms - 1);
  const subtotal =
    service.base +
    service.perBedroom * input.bedrooms +
    service.perBathroom * extraBathrooms;

  const fullPrice = clamp(roundTo5(subtotal));
  const price = clamp(roundTo5(subtotal * (1 - freq.discount)));

  return {
    price,
    fullPrice,
    discountPct: Math.round(freq.discount * 100),
    savings: Math.max(0, fullPrice - price),
  };
}
