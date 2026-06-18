import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import ServiceAreas from "@/components/ServiceAreas";
import FounderStory from "@/components/FounderStory";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Calculator />
      <HowItWorks />
      <Pricing />
      <Reviews />
      <ServiceAreas />
      <FounderStory />
      <CTABanner />
    </>
  );
}
