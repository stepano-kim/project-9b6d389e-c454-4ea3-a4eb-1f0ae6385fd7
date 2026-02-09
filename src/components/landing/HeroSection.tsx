import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/hero-energy-flow.mp4";

export function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container-tight pt-28 pb-20 md:pt-36 md:pb-28 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-center mx-auto"
        >
          {/* Headline */}
          <h1 className="text-[2.5rem] leading-[1.3] md:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-6 text-balance tracking-tight">
            에너지 비용은 매년 오르는데,
            <br />
            <span className="text-white mt-1 inline-block">어떻게 대응해야 할까요.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[#E5E7EB] mb-12 max-w-2xl text-balance leading-relaxed mx-auto">
            NX의 고객들은 구축 비용 없이 전기료를 절감하고, 에너지를 관리하고 있습니다.
          </p>

          {/* Primary CTA with helper text */}
          <div className="flex flex-col items-center justify-center gap-4">
            <button 
              onClick={scrollToForm} 
              className="cta-gradient-border h-13 px-8 py-3.5 text-base font-semibold inline-flex items-center justify-center gap-2 group bg-white text-slate-900 hover:shadow-lg transition-shadow rounded-xl"
            >
              에너지 최적화 시작하기
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <span className="text-white text-sm font-medium">1분이면 완료. 무료 상담</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
