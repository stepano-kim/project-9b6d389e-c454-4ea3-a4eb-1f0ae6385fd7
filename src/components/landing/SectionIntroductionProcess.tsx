import { motion } from "framer-motion";
import { AnimatedTitle } from "./AnimatedTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const processSteps = [
  { step: "STEP 1", label: "사전 정보 진단" },
  { step: "STEP 2", label: "실사 진단" },
  { step: "STEP 3", label: "계약" },
  { step: "STEP 4", label: "구축" },
  { step: "STEP 5", label: "운영" },
  { step: "STEP 6", label: "유지 보수 (O&M)" },
];

export function SectionIntroductionProcess() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <div className="text-center mb-12">
          <AnimatedTitle className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight mb-4">
            {"초기 투자 Zero,\n바로 시작하세요!"}
          </AnimatedTitle>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            공기업 선투자로 귀사 부담 없이<br />
            상담부터 운영까지 한 번에 진행됩니다.
          </motion.p>
        </div>

        {/* Timeline - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block mb-14"
        >
          <div className="relative">
            {/* Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />
            
            {/* Steps */}
            <div className="flex justify-between relative">
              {processSteps.map((item, index) => (
                <div key={item.step} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-[0_2px_8px_-2px_hsl(217_90%_55%/0.4)] relative z-10">
                    {index + 1}
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">{item.step}</p>
                    <p className="text-sm font-medium text-foreground whitespace-nowrap">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Timeline - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:hidden mb-14"
        >
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />
            
            {/* Steps */}
            <div className="space-y-6">
              {processSteps.map((item, index) => (
                <div key={item.step} className="flex items-center gap-4 relative">
                  <div className="absolute left-[-20px] w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shadow-[0_2px_8px_-2px_hsl(217_90%_55%/0.4)]">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.step}</p>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button onClick={scrollToForm} size="lg" className="gap-2">
            지금 바로 무료 상담 신청하기
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
