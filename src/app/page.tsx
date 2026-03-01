import Hero from "@/components/Hero";
import TrendingCarousel from "@/components/TrendingCarousel";
import BrainrotMeter from "@/components/BrainrotMeter";
import LifecycleTimeline from "@/components/LifecycleTimeline";
import CategoryGrid from "@/components/CategoryGrid";
import EditorialSection from "@/components/EditorialSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getCategoryCounts } from "@/lib/actions";

export default async function Home() {
  const { counts } = await getCategoryCounts();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Hero />
      <ScrollReveal rotate={1}>
        <TrendingCarousel />
      </ScrollReveal>
      <ScrollReveal rotate={-1}>
        <BrainrotMeter />
      </ScrollReveal>
      {/* LifecycleTimeline has intense intrinsic scrolling so we skip wrapper */}
      <LifecycleTimeline />
      <ScrollReveal rotate={1}>
        <CategoryGrid dbCounts={counts || {}} />
      </ScrollReveal>
      <ScrollReveal rotate={2}>
        <FeaturesSection />
      </ScrollReveal>
      <ScrollReveal rotate={-1}>
        <EditorialSection />
      </ScrollReveal>
      <ScrollReveal rotate={0} y={100}>
        <Footer />
      </ScrollReveal>
    </main>
  );
}
