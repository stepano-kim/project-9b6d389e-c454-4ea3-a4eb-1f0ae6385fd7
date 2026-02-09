import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background" />
      
      {/* Subtle blue glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/[0.08] rounded-full blur-[120px]" />

      <div className="relative container-tight pt-28 pb-20 md:pt-36 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Headline */}
          <h1 className="text-[2.5rem] leading-[1.3] md:text-5xl lg:text-[3.5rem] font-extrabold text-foreground mb-6 text-balance tracking-tight">
            에너지 비용은 매년 오르는데,
            <br />
            <span className="gradient-text mt-1 inline-block">어떻게 대응해야 할까요.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance leading-relaxed">
            NX의 고객들은 구축 비용 없이 전기료를 절감하고, 에너지를 관리하고 있습니다.
          </p>

          {/* Primary CTA */}
          <Button onClick={scrollToForm} size="lg" className="gap-2 group">
            에너지 최적화 시작해보기
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
