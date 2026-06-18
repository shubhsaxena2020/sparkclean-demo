import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About SparkClean — Local, Family-Owned GTA Cleaning",
  description:
    "Learn about the family behind Toronto's trusted local cleaning company. Our mission is to deliver spotless homes using safe, green products.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        eyebrow="About Us"
        title="Local, and we act like it."
        intro="Founded on simple family values and a passion for healthy living, we believe in honest communication, eco-friendly practices, and building lasting relationships with the clients we serve."
      />
    </div>
  );
}
