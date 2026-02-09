import { motion } from "framer-motion";
import benefitZeroCost from "@/assets/benefits/benefit-zero-cost.jpg";
import benefitEnergySaving from "@/assets/benefits/benefit-energy-saving.jpg";
import benefitEsgData from "@/assets/benefits/benefit-esg-data.jpg";

const benefits = [
  {
    image: benefitZeroCost,
    keyword: "초기 비용 ZERO",
    subHeadline: "에너지 공기업 선투자 구조",
    body: "에너지 공기업의 선투자를 통해\n건물은 초기 구축 비용 부담 없이\n에너지 최적화를 시작할 수 있습니다.",
  },
  {
    image: benefitEnergySaving,
    keyword: "전기료 절감",
    subHeadline: "에너지 최적화 설계 기반",
    body: "건물 운영과 설비 특성에 맞춘\n에너지 최적화 설계를 통해\n실질적인 전기료 절감을 만듭니다.",
  },
  {
    image: benefitEsgData,
    keyword: "ESG 대응",
    subHeadline: "에너지 데이터 자동 확보",
    body: "에너지 사용 데이터 기반으로\nESG 대응에 필요한\n보고·관리 데이터까지 함께 제공합니다.",
  },
];

export function SectionKeyBenefits() {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight">
            부담 없이 시작해서, 지속 가능한 성과까지
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={benefit.image}
                  alt={benefit.keyword}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark overlay for better text contrast below */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-7">
                {/* Main Keyword - Most dominant */}
                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2 tracking-tight">
                  {benefit.keyword}
                </h3>
                
                {/* Sub-headline */}
                <p className="text-sm font-semibold text-primary mb-3">
                  {benefit.subHeadline}
                </p>
                
                {/* Body text */}
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {benefit.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
