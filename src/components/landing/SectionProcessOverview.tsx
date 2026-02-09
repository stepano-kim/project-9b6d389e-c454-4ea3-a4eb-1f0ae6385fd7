import { motion } from "framer-motion";
import { Search, Settings, BarChart3, ChevronRight } from "lucide-react";

const steps = [{
  step: "STEP 1",
  icon: Search,
  title: "진단",
  subtitle: "어디를 최적화해야 하는지부터 파악합니다",
  bullets: ["설비·공간·운영 패턴 기준으로 에너지 사용 구조 분석", "효과가 나올 수 있는 영역부터 선별"]
}, {
  step: "STEP 2",
  icon: Settings,
  title: "구축",
  subtitle: "최적의 설계로 에너지 최적화를 구축합니다",
  bullets: ["불필요한 범위를 제외한 최적의 설계 진행", "필요한 경우에만 설비 교체 및 구축"]
}, {
  step: "STEP 3",
  icon: BarChart3,
  title: "운영",
  subtitle: "정밀한 모니터링으로 에너지를 최적화합니다",
  bullets: ["실시간 모니터링과 데이터 기반 운영", "상황별 제어로 지속적인 에너지 최적화"]
}];

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

        <div className="relative grid md:grid-cols-3 gap-4 md:gap-6">
          {/* Arrow connectors between cards - Desktop only */}
          <div className="hidden md:flex absolute top-1/2 left-[33.33%] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <ChevronRight className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          <div className="hidden md:flex absolute top-1/2 left-[66.66%] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <ChevronRight className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>

          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border flex flex-col"
            >
              {/* Mobile arrow indicator */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md rotate-90">
                    <ChevronRight className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              )}

              {/* Header: Step badge + Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
                  {item.step}
                </div>
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-border mb-5" />

              {/* Title */}
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed min-h-[40px]">
                {item.subtitle}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-border mb-5" />

              {/* Bullets */}
              <ul className="space-y-3 flex-1">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
