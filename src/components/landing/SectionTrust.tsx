import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const partners = Array(8).fill("Partner");

export function SectionTrust() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            믿을 수 있는 에너지 공기업의<br className="md:hidden" /> No.1 파트너 NX
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            에너지 운영 최적화·절감·신재생 도입까지, 공공/민간 현장에서 검증된 방식으로 지원합니다.
          </p>
        </motion.div>

        {/* Partner Logo Marquee */}
        <div className="relative overflow-hidden py-6 mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/30 to-transparent z-10" />
          
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="flex-shrink-0 mx-4 md:mx-8"
              >
                <div className="h-14 w-28 md:w-36 flex items-center justify-center px-4 py-3 bg-background rounded-lg shadow-soft border border-border">
                  <span className="text-sm font-medium text-muted-foreground/60 whitespace-nowrap">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <Button onClick={scrollToForm} size="lg" className="gap-2">
            상담 신청하기
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-muted-foreground text-center"
        >
          파트너/레퍼런스는 협의 후 업데이트 가능합니다.
        </motion.p>
      </div>
    </section>
  );
}
