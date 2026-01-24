import { useState } from "react";
import { StickyHeader } from "@/components/landing/StickyHeader";
import { HeroEmailCTA } from "@/components/landing/HeroEmailCTA";
import { SectionAchievements } from "@/components/landing/SectionAchievements";
import { SectionTrust } from "@/components/landing/SectionTrust";
import { SectionProcess } from "@/components/landing/SectionProcess";
import { SectionFAQ } from "@/components/landing/SectionFAQ";
import { LeadFormWizard } from "@/components/landing/LeadFormWizard";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const [prefilledEmail, setPrefilledEmail] = useState("");

  const handleHeroEmailSubmit = (email: string) => {
    setPrefilledEmail(email);
  };

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <main>
        <HeroEmailCTA onEmailSubmit={handleHeroEmailSubmit} />
        <SectionAchievements />
        <SectionTrust />
        <SectionProcess />
        <SectionFAQ />
        <LeadFormWizard prefilledEmail={prefilledEmail} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
