import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { PipelineFlow } from "@/components/home/PipelineFlow";
import { DocTracks } from "@/components/home/DocTracks";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#edeef7] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PipelineFlow />
        <DocTracks />
        <ComparisonSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
