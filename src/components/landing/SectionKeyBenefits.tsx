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
        {/* Premium Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-12 md:mb-16 py-10 md:py-14 px-6 md:px-10 rounded-2xl overflow-hidden"
        >
          {/* Dark background */}
          <div className="absolute inset-0 bg-[hsl(222,30%,8%)] rounded-2xl" />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(217,91%,50%,0.08)] via-transparent to-[hsl(217,91%,50%,0.05)]" />
          
          <div className="relative z-10 text-center">
            {/* Main glowing headline */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide mb-4"
              style={{
                color: "hsl(217, 100%, 65%)",
                textShadow: `
                  0 0 20px hsl(217, 100%, 60%, 0.5),
                  0 0 40px hsl(217, 100%, 55%, 0.3),
                  0 0 60px hsl(217, 100%, 50%, 0.15)
                `,
              }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 20px hsl(217, 100%, 60%, 0.5), 0 0 40px hsl(217, 100%, 55%, 0.3), 0 0 60px hsl(217, 100%, 50%, 0.15)",
                    "0 0 25px hsl(217, 100%, 60%, 0.6), 0 0 50px hsl(217, 100%, 55%, 0.4), 0 0 70px hsl(217, 100%, 50%, 0.2)",
                    "0 0 20px hsl(217, 100%, 60%, 0.5), 0 0 40px hsl(217, 100%, 55%, 0.3), 0 0 60px hsl(217, 100%, 50%, 0.15)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                "부담 없이 시작해서, 지속 가능한 성과까지"
              </motion.span>
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm md:text-base text-[hsl(220,10%,55%)] tracking-wide"
            >
              에너지 관리 혁신, NX는 이렇게 다릅니다
            </motion.p>
          </div>
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
