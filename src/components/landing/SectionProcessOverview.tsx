import { motion } from "framer-motion";
import { AnimatedTitle } from "./AnimatedTitle";
import { Search, Settings, BarChart3 } from "lucide-react";
import processDiagnosis from "@/assets/process/process-diagnosis.jpg";
import processConstruction from "@/assets/process/process-construction.jpg";
import processOperation from "@/assets/process/process-operation.jpg";

const steps = [
  {
    icon: Search,
    image: processDiagnosis,
    title: "진단",
    subtitle: "어디를 최적화해야 하는지부터 파악합니다",
    body: "전기요금 전체가 아니라 설비·공간·운영 패턴 기준으로 에너지 사용 구조를 분석하고, 지금 건물에서 효과가 나올 수 있는 영역부터 선별합니다.",
  },
  {
    icon: Settings,
    image: processConstruction,
    title: "구축",
    subtitle: "최적의 설계로 에너지 최적화를 위한 구축을 진행합니다",
    body: "진단 결과를 바탕으로 불필요한 범위를 제외한 최적의 설계를 하고, 필요한 경우에만 에너지 최적화를 위한 설비 교체 및 구축을 진행합니다.",
  },
  {
    icon: BarChart3,
    image: processOperation,
    title: "운영",
    subtitle: "정밀한 모니터링과 최적화 제어로 에너지 최적화를 실현합니다",
    body: "구축 이후에는 실시간 모니터링과 데이터 기반 운영으로 상황에 맞는 제어를 통해 지속적으로 에너지 사용을 최적화합니다.",
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

export function SectionProcessOverview() {
  return (
    <section className="section-padding section-subtle">
      <div className="container-tight">
        <div className="text-center mb-14 md:mb-20">
          <AnimatedTitle className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight">
            {"NX는 이렇게\n에너지를 최적화합니다"}
          </AnimatedTitle>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="group rounded-2xl overflow-hidden border border-border bg-card shadow-card
                transition-all duration-500 hover:shadow-elevated hover:-translate-y-3 hover:scale-[1.02]
                flex flex-col"
            >
              {/* Icon */}
              <div className="p-6 pb-0">
                <div className="w-12 h-12 rounded-xl border border-border bg-accent flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
              </div>

              {/* Image */}
              <div className="px-6 pt-5">
                <div className="aspect-[16/10] rounded-xl overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
