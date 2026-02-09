import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import partnerKepco from "@/assets/partners/partner-kepco.svg";
import partnerKoreawest from "@/assets/partners/partner-koreawest.svg";
import partnerKomipo from "@/assets/partners/partner-komipo.svg";
import partnerKepcoEs from "@/assets/partners/partner-kepco-es.png";
import partnerMcc from "@/assets/partners/partner-mcc.svg";
const partners = [{
  name: "한국전력공사",
  logo: partnerKepco
}, {
  name: "한국서부발전",
  logo: partnerKoreawest
}, {
  name: "한국중부발전",
  logo: partnerKomipo
}, {
  name: "한전KPS",
  logo: partnerKepcoEs
}, {
  name: "MCC",
  logo: partnerMcc
}];
export function SectionTrust() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="section-padding bg-card/30">
      <div className="container-tight">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 text-balance tracking-tight">
            믿을 수 있는 에너지 공기업의 No.1 파트너
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto text-balance leading-relaxed">
            에너지 운영 최적화·절감·신재생 도입까지, 공공/민간 현장에서 검증된 방식으로 지원합니다.
          </p>
        </motion.div>

        {/* Partner Logo Marquee - dark theme cards */}
        <div className="relative overflow-hidden py-8 mb-10">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card/30 to-transparent z-10" />
          
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, index) => <div key={`${partner.name}-${index}`} className="flex-shrink-0 mx-3 md:mx-4">
                <div className="h-14 md:h-16 min-w-[140px] md:min-w-[160px] flex items-center justify-center px-4 py-3 bg-card backdrop-blur-sm rounded-2xl border border-border/40 shadow-soft">
                  <img src={partner.logo} alt={partner.name} className="h-8 md:h-10 max-w-[100px] md:max-w-[120px] object-contain opacity-70" />
                </div>
              </div>)}
          </div>
        </div>

        {/* CTA as text link - secondary placement */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center">
          <Button onClick={scrollToForm} size="lg" className="gap-2">
            에너지 최적화 시작하기
            <ArrowRight className="w-4 h-4" />
          </Button>
          
        </motion.div>
      </div>
    </section>;
}