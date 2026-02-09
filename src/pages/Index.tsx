import { StickyHeader } from "@/components/landing/StickyHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { SectionProcessOverview } from "@/components/landing/SectionProcessOverview";
import { SectionDeploymentCases } from "@/components/landing/SectionDeploymentCases";
import { SectionOperationScale } from "@/components/landing/SectionOperationScale";
import { SectionIntroductionProcess } from "@/components/landing/SectionIntroductionProcess";
import { SectionLeadForm } from "@/components/landing/SectionLeadForm";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <main>
        <HeroSection />
        <SectionProcessOverview />
        <SectionDeploymentCases />
        <SectionOperationScale />
        <SectionIntroductionProcess />
        <SectionLeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
