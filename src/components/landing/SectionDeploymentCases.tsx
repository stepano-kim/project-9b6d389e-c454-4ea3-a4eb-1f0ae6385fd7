import { motion } from "framer-motion";

const cases = [
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
    title: "대형 상업 복합 건물",
    details: [
      "연면적: 약 90,000㎡",
      "사용 용도: 오피스 · 상업시설 복합",
    ],
    results: [
      "연간 에너지 비용 약 12억 원 절감",
      "최대 절감율 18% 달성",
      "약 15,000여 개 디바이스 구축 및 운영",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    title: "도심 핵심 오피스 빌딩",
    details: [
      "연면적: 약 70,000㎡",
      "사용 용도: 업무시설",
    ],
    results: [
      "연간 에너지 비용 약 8억 원 절감",
      "최대 절감율 15% 달성",
      "약 11,000여 개 디바이스 구축 및 운영",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop",
    title: "대형 대학교 캠퍼스",
    details: [
      "대상: 강의동 · 연구동 · 기숙사",
      "운영 특성: 다건물 · 상이한 운영 패턴",
    ],
    results: [
      "연간 에너지 비용 약 20억 원 절감",
      "최대 절감율 22% 달성",
      "약 60,000여 개 디바이스 구축 및 운영",
    ],
  },
];

export function SectionDeploymentCases() {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight mb-4">
            이렇게 구축·운영되고 있습니다
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            대형 상업 건물과 대규모 캠퍼스에서 실제 운영으로 검증된 사례입니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card border border-border"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>

                {/* Details */}
                <div className="space-y-1 mb-4">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-border space-y-2">
                  {item.results.map((result, i) => (
                    <p key={i} className={`text-sm ${i === 0 ? "font-bold text-primary" : "text-foreground"}`}>
                      {result}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
