import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cleaning Services in the GTA | SparkClean",
  description:
    "Professional, eco-friendly house cleaning services tailored to your needs. Discover our standard, deep, and move-in/move-out options in Toronto.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        eyebrow="Services"
        title="Cleaning services for every Toronto home."
        intro="From busy downtown condos to spacious family homes, our customizable cleaning plans are designed to bring clarity and fresh energy to your living spaces."
      />
    </div>
  );
}
