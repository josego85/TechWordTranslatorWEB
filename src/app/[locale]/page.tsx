import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { StatsSection } from "@/components/home/stats-section";

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <FeaturesSection />
    </div>
  );
}
