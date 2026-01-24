import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const partners = Array(8).fill("Partner");

export function SectionTrust() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 text-balance tracking-tight">
            믿을 수 있는 에너지 공기업의 No.1 파트너
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto text-balance leading-relaxed">
            에너지 운영 최적화·절감·신재생 도입까지, 공공/민간 현장에서 검증된 방식으로 지원합니다.
          </p>
        </motion.div>

        {/* Partner Logo Marquee */}
        <div className="relative overflow-hidden py-8 mb-10">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="flex-shrink-0 mx-3 md:mx-5"
              >
                <div className="h-12 w-24 md:w-32 flex items-center justify-center px-4 py-2.5 bg-muted/50 rounded-xl border border-border/50">
                  <span className="text-sm font-medium text-muted-foreground/50 whitespace-nowrap">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA as text link - secondary placement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button 
            onClick={scrollToForm}
            className="text-sm text-primary hover:text-primary-hover transition-colors font-medium inline-flex items-center gap-1.5"
          >
            상담 신청하기
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <p className="text-[11px] text-muted-foreground/60 mt-3">
            파트너/레퍼런스는 협의 후 업데이트 가능합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
