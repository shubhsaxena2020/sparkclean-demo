import Image from "next/image";
import { RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
import { CheckIcon } from "./icons";

const SCENES = [
  {
    title: "Kitchen Reset",
    image: "/img/results1.webp",
    alt: "Bright clean kitchen with clear counters after a detailed cleaning pass",
    points: ["Countertops", "Sinks & fixtures", "Appliance fronts"],
  },
  {
    title: "Bedroom Refresh",
    image: "/img/results2.webp",
    alt: "Tidy bedroom with fresh linens and organized surfaces",
    points: ["Dusting", "Floors", "Surface reset"],
  },
  {
    title: "Bathroom Detail",
    image: "/img/results3.webp",
    alt: "Minimal clean bathroom with folded towels and polished surfaces",
    points: ["Mirrors", "Fixtures", "High-touch areas"],
  },
];

export default function ServiceScenes() {
  return (
    <section className="relative z-10 border-y border-[var(--color-border)] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[var(--maxw)] px-6">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <RevealEyebrow className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-ink)]">
              Cleaning Detail
            </RevealEyebrow>
            <RevealHeading
              text="Photos help define the level of finish."
              className="mt-3 font-display text-4xl font-black tracking-[-0.02em] leading-[1.0] text-pretty sm:text-5xl"
            />
            <RevealSubtext className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              These sample room visuals make the service scope easier to understand before the quote is confirmed.
            </RevealSubtext>
          </div>
          <RevealSubtext className="text-sm leading-7 text-[var(--color-muted)] lg:text-right">
            Final service scope depends on room condition, add-ons, access, supplies, and time required.
          </RevealSubtext>
        </div>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {SCENES.map((scene, index) => (
            <RevealItem
              key={scene.title}
              as="article"
              className="group overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[0_18px_55px_-36px_rgba(7,15,12,0.38)]"
            >
              <div className="diagonal-clip relative aspect-[4/3] overflow-hidden">
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 430px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/55 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-ink)] backdrop-blur-sm">
                  0{index + 1}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-extrabold text-[var(--color-ink)]">
                  {scene.title}
                </h3>
                <ul className="mt-4 grid gap-2">
                  {scene.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)]">
                      <CheckIcon width={15} height={15} className="shrink-0 text-[var(--color-primary)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
