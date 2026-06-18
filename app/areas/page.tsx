import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Service Areas Across the Greater Toronto Area | SparkClean",
  description:
    "We offer professional home cleaning services across Toronto and the surrounding municipalities. See all the GTA areas we cover.",
};

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        eyebrow="Service Areas"
        title="Proudly serving the Greater Toronto Area."
        intro="We bring our detailed, green cleaning standards to communities across the region, ensuring pristine homes from core downtown neighborhoods to the surrounding suburbs."
      />
    </div>
  );
}
