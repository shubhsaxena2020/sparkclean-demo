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
