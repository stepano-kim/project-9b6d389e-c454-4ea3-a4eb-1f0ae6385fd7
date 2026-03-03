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

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export function SectionKeyBenefits() {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight mb-3">
            부담 없이 시작해서, 지속 가능한 성과까지
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            에너지 관리 혁신, NX는 이렇게 다릅니다
          </p>
        </motion.div>

        {/* Cards - Staggered offset layout */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`group bg-card rounded-2xl overflow-hidden border border-border shadow-card 
                transition-all duration-500 hover:shadow-elevated hover:-translate-y-2
                ${index === 1 ? "md:mt-8" : ""}`}
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] overflow-hidden">
                <motion.img
                  src={benefit.image}
                  alt={benefit.keyword}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-7">
                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2 tracking-tight">
                  {benefit.keyword}
                </h3>
                <p className="text-sm font-semibold text-primary mb-3">
                  {benefit.subHeadline}
                </p>
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
