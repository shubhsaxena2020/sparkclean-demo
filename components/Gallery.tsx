import { RevealEyebrow, RevealHeading, RevealSubtext, RevealGroup, RevealItem } from "./Reveal";
import Image from "next/image";


const IMAGES = [
  { src: "/img/results1.jpg", alt: "Sparkling clean modern white kitchen with plants" },
  { src: "/img/results2.jpg", alt: "Tidy minimal bedroom with fresh folded sheets" },
  { src: "/img/results3.jpg", alt: "Spotless minimalist bathroom with fresh rolled towels" },
];

export default function Gallery() {
  return (
    <section className="w-full bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[var(--maxw)] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <RevealEyebrow className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            OUR WORK
          </RevealEyebrow>
          <RevealHeading
            text="The SparkClean Standard."
            className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.05]"
          />
          <RevealSubtext className="mt-3 text-lg text-muted">
            Real results from homes across the Greater Toronto Area.
          </RevealSubtext>
        </div>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {IMAGES.map((img) => (
            <RevealItem
              key={img.src}
              className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-[var(--color-border)] shadow-[0_10px_30px_-12px_rgba(15,26,23,0.12)] bg-surface"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
