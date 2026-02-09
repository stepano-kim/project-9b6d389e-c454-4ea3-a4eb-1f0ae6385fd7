import { motion } from "framer-motion";
import { Search, Settings, BarChart3, ChevronRight, Check } from "lucide-react";

const steps = [{
  step: "STEP 1",
  icon: Search,
  title: "진단",
  subtitle: "어디를 최적화해야 하는지부터 파악합니다",
  bullets: ["설비·공간·운영 패턴 기준으로 에너지 사용 구조 분석", "효과가 나올 수 있는 영역부터 선별"],
  featured: false
}, {
  step: "STEP 2",
  icon: Settings,
  title: "구축",
  subtitle: "최적의 설계로 에너지 최적화를 구축합니다",
  bullets: ["불필요한 범위를 제외한 최적의 설계 진행", "필요한 경우에만 설비 교체 및 구축"],
  featured: true
}, {
  step: "STEP 3",
  icon: BarChart3,
  title: "운영",
  subtitle: "정밀한 모니터링으로 에너지를 최적화합니다",
  bullets: ["실시간 모니터링과 데이터 기반 운영", "상황별 제어로 지속적인 에너지 최적화"],
  featured: false
}];

export function SectionProcessOverview() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            프로세스
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight">
            NX는 이렇게 에너지를 최적화합니다
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {/* Arrow connectors between cards - Desktop only */}
          <div className="hidden md:flex absolute top-1/2 left-[33.33%] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-8 h-8 rounded-full bg-white border border-border shadow-md flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="hidden md:flex absolute top-1/2 left-[66.66%] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-8 h-8 rounded-full bg-white border border-border shadow-md flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-primary" />
            </div>
          </div>

          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-7 md:p-8 flex flex-col transition-all duration-300
                ${item.featured 
                  ? 'bg-gradient-to-br from-primary via-primary to-primary/80 text-white shadow-xl shadow-primary/20 md:scale-[1.02]' 
                  : 'bg-white border border-border/60 shadow-lg shadow-black/[0.03] hover:shadow-xl hover:shadow-black/[0.06]'
                }`}
            >
              {/* Mobile arrow indicator */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="w-7 h-7 rounded-full bg-white border border-border shadow-md flex items-center justify-center rotate-90">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              )}

              {/* Step badge */}
              <div className={`inline-flex self-start items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-6
                ${item.featured 
                  ? 'bg-white/20 text-white' 
                  : 'bg-primary/10 text-primary'
                }`}
              >
                {item.step}
              </div>

              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                  ${item.featured 
                    ? 'bg-white/20' 
                    : 'bg-accent'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.featured ? 'text-white' : 'text-primary'}`} />
                </div>
                <h3 className={`text-2xl font-bold ${item.featured ? 'text-white' : 'text-foreground'}`}>
                  {item.title}
                </h3>
              </div>

              {/* Subtitle */}
              <p className={`text-sm mb-6 leading-relaxed
                ${item.featured 
                  ? 'text-white/80' 
                  : 'text-muted-foreground'
                }`}
              >
                {item.subtitle}
              </p>

              {/* Divider */}
              <div className={`w-full h-px mb-6 ${item.featured ? 'bg-white/20' : 'bg-border'}`} />

              {/* Bullets with checkmarks */}
              <ul className="space-y-3 flex-1">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                      ${item.featured 
                        ? 'bg-white/20' 
                        : 'bg-primary/10'
                      }`}
                    >
                      <Check className={`w-3 h-3 ${item.featured ? 'text-white' : 'text-primary'}`} />
                    </span>
                    <span className={`leading-relaxed ${item.featured ? 'text-white/90' : 'text-muted-foreground'}`}>
                      {bullet}
                    </span>
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
