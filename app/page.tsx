import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import ServiceAreas from "@/components/ServiceAreas";
import Gallery from "@/components/Gallery";
import FounderStory from "@/components/FounderStory";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "SparkClean — Toronto's Trusted Home Cleaning, Booked in 60 Seconds",
  description:
    "Eco-friendly, insured home cleaning trusted across the GTA. Get an instant price and book online in under a minute — no waiting for a callback.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Stats />
      <Services />
      <Calculator />
      <HowItWorks />
      <Pricing />
      <Reviews />
      <ServiceAreas />
      <Gallery />
      <FounderStory />
      <CTABanner />
    </>
  );
}
