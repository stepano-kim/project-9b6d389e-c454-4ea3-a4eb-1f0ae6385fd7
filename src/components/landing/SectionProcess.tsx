import { motion } from "framer-motion";
import { FileText, Link2, BarChart3, PiggyBank } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "무료 상담 신청",
    description: "간단한 정보 입력으로 30초 만에 상담 신청 완료",
  },
  {
    icon: Link2,
    step: "02",
    title: "KEPCO 연동",
    description: "한전 전기사용 데이터와 안전하게 연동",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "AI 분석 리포트",
    description: "사용 패턴 분석 후 맞춤형 절감 전략 제안",
  },
  {
    icon: PiggyBank,
    step: "04",
    title: "절감 실현",
    description: "실시간 모니터링으로 지속적인 비용 절감",
  },
];

export function SectionProcess() {
  return (
    <section id="process" className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            간단한 4단계 프로세스
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            복잡한 설치나 설정 없이 빠르게 시작하세요
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-border" />
              )}
              
              <div className="relative bg-card rounded-2xl p-6 shadow-card border border-border">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
