import { motion } from "framer-motion";
import { Search, Settings, BarChart3 } from "lucide-react";

const steps = [
  {
    step: "STEP 1",
    icon: Search,
    title: "진단",
    subtitle: "어디를 최적화해야 하는지부터 파악합니다",
    bullets: [
      "전기요금 전체가 아니라 설비·공간·운영 패턴 기준으로 에너지 사용 구조를 분석",
      "지금 건물에서 효과가 나올 수 있는 영역부터 선별",
    ],
  },
  {
    step: "STEP 2",
    icon: Settings,
    title: "구축",
    subtitle: "최적의 설계로 에너지 최적화를 위한 구축을 진행합니다",
    bullets: [
      "진단 결과를 바탕으로 불필요한 범위를 제외한 최적의 설계",
      "필요한 경우에만 에너지 최적화를 위한 설비 교체 및 구축 진행",
    ],
  },
  {
    step: "STEP 3",
    icon: BarChart3,
    title: "운영",
    subtitle: "정밀한 모니터링과 최적화 제어로 에너지 최적화를 실현합니다",
    bullets: [
      "구축 이후에는 실시간 모니터링과 데이터 기반 운영",
      "상황에 맞는 제어를 통해 지속적으로 에너지 사용을 최적화",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export function SectionProcessOverview() {
  return (
    <section className="section-padding section-subtle">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight">
            NX는 이렇게 에너지를 최적화합니다
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative bg-card rounded-2xl border border-border overflow-hidden h-full
                transition-all duration-500 hover:shadow-elevated hover:-translate-y-2"
            >
              <div className="flex flex-col h-full p-6 md:p-7">
                {/* Top row: Step badge + Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold w-fit">
                    {item.step}
                  </div>
                  <motion.div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item.subtitle}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 flex-1">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
