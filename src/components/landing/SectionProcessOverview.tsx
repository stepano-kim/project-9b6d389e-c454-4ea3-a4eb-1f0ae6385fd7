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

export function SectionProcessOverview() {
  return (
    <section className="section-padding section-subtle">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight">
            NX는 이렇게 에너지를 최적화합니다
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-card rounded-2xl border border-border overflow-hidden h-full"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Text content */}
                <div className="flex-1 p-6 md:p-7 flex flex-col">
                  {/* Step badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 w-fit">
                    {item.step}
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

                {/* Icon section - right side on desktop, top on mobile */}
                <div className="order-first md:order-last flex items-center justify-center p-6 md:p-7 md:pl-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-accent flex items-center justify-center">
                    <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
