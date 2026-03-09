import { motion } from "framer-motion";
import { AnimatedTitle } from "./AnimatedTitle";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ClipboardCheck,
  BarChart3,
  ShieldCheck,
  Handshake,
  Wrench } from
"lucide-react";

const steps = [
{
  icon: ClipboardCheck,
  label: "무료 사전 진단",
  desc: "기본 정보로 절감 가능성/적합성 사전 검토",
  highlighted: false
},
{
  icon: BarChart3,
  label: "현장/데이터 진단",
  desc: "운영 데이터·현장 조건 기반으로 개선 포인트 확인",
  highlighted: false
},
{
  icon: ShieldCheck,
  label: "적합성 판정",
  desc: "선투자 적용 가능 여부 판단 및 범위 확정",
  highlighted: false
},
{
  icon: Handshake,
  label: "공기업 선투자 계약",
  desc: "공기업이 선투자 계약 체결 → 고객 초기 투자 0원 구조",
  highlighted: true
},
{
  icon: Wrench,
  label: "구축 & 운영",
  desc: "설비 교체 · 디바이스 시공 · 소프트웨어 설치 · 운영(O&M)까지 실행",
  highlighted: false
}];


const coverageItems = [
"설비 교체",
"디바이스 구축 시공",
"소프트웨어 설치",
"운영 및 유지보수(O&M)"];


const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2 + i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  })
};

/** Compute dot color: gray → primary blue up to step4, then fade back */
function getDotColor(progress: number) {
  const highlightRatio = 3 / 4; // step4 is at index 3 out of 4 segments
  if (progress <= highlightRatio) {
    return `hsl(var(--primary) / ${0.15 + progress / highlightRatio * 0.85})`;
  }
  const fadeProgress = (progress - highlightRatio) / (1 - highlightRatio);
  return `hsl(var(--primary) / ${1 - fadeProgress * 0.7})`;
}

export function SectionIntroductionProcess() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const dotsPerSegment = 5;
  const totalDesktopDots = 4 * dotsPerSegment;

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <AnimatedTitle className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight mb-4">
            {"공기업 선투자 구조로,\n초기 투자 부담 없이 시작합니다"}
          </AnimatedTitle>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            진단 후 적합성 판정 시 공기업이 선투자 계약을 진행하고,
그 예산으로 설비·디바이스·소프트웨어 구축과 운영까지 한 번에 진행됩니다<br className="hidden md:inline" />
            그 예산으로 설비·디바이스·소프트웨어 구축과 운영까지 한 번에 진행됩니다.
          </motion.p>
        </div>

        {/* 5-Step Flow — Desktop */}
        <div className="hidden md:block mb-14">
          <div className="relative">
            {/* Animated dot connectors */}
            <div className="absolute top-8 left-[10%] right-[10%] flex items-center -translate-y-1/2">
              {[0, 1, 2, 3].map((segmentIndex) =>
              <div key={segmentIndex} className="flex-1 flex items-center justify-center gap-[6px]">
                  {Array.from({ length: dotsPerSegment }).map((_, dotIndex) => {
                  const globalIndex = segmentIndex * dotsPerSegment + dotIndex;
                  const progress = globalIndex / (totalDesktopDots - 1);
                  return (
                    <motion.div
                      key={dotIndex}
                      className="w-[6px] h-[6px] rounded-full"
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        delay: globalIndex * 0.08,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                      style={{ backgroundColor: getDotColor(progress) }} />);


                })}
                </div>
              )}
            </div>

            <div className="grid grid-cols-5 gap-4 relative">
              {steps.map((step, i) =>
              <motion.div
                key={step.label}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center text-center">
                
                  {/* Circle icon */}
                  <div
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                  step.highlighted ?
                  "bg-primary text-primary-foreground shadow-[0_0_20px_-4px_hsl(217_90%_55%/0.5)] ring-2 ring-primary/30" :
                  "bg-accent text-primary border border-border"}`
                  }>
                  
                    <step.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>

                  {/* Step number */}
                  <p className="text-[11px] font-semibold text-muted-foreground mb-1">
                    STEP {i + 1}
                  </p>

                  {/* Label */}
                  <p
                  className={`text-base font-bold mb-2 ${
                  step.highlighted ? "text-primary" : "text-foreground"}`
                  }>
                  
                    {step.label}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed px-1">
                    {step.desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* 5-Step Flow — Mobile */}
        <div className="md:hidden mb-14">
          <div className="relative pl-10">
            {/* Animated vertical dots */}
            <div className="absolute left-[11px] top-2 bottom-2 flex flex-col items-center justify-between">
              {Array.from({ length: 20 }).map((_, i) => {
                const progress = i / 19;
                return (
                  <motion.div
                    key={i}
                    className="w-[5px] h-[5px] rounded-full"
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1, 1, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.08,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                    style={{ backgroundColor: getDotColor(progress) }} />);


              })}
            </div>

            <div className="space-y-8">
              {steps.map((step, i) =>
              <motion.div
                key={step.label}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative">
                
                  {/* Circle */}
                  <div
                  className={`absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  step.highlighted ?
                  "bg-primary text-primary-foreground shadow-[0_0_12px_-2px_hsl(217_90%_55%/0.5)]" :
                  "bg-accent text-primary border border-border"}`
                  }>
                  
                    <step.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground mb-0.5">
                      STEP {i + 1}
                    </p>
                    <p
                    className={`text-base font-bold mb-1 ${
                    step.highlighted ? "text-primary" : "text-foreground"}`
                    }>
                    
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] text-muted-foreground/70 text-center mb-8">
          
          ※ 선투자 적용 여부는 진단 결과 및 내부 기준에 따라 달라질 수 있습니다.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center">
          
          <Button onClick={scrollToForm} size="lg" className="gap-2">
            무료 진단 신청하기
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>);

}