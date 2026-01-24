import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Settings, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "진단",
    description: "현재 전력 사용 현황과 절감 가능성을 무료로 분석합니다.",
  },
  {
    icon: Settings,
    step: "02",
    title: "개선",
    description: "맞춤형 절감 방안을 설계하고 최적화를 진행합니다.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "검증",
    description: "절감 효과를 실측 데이터로 검증하고 리포트를 제공합니다.",
  },
];

export function SectionProcess() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

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
            이렇게 진행됩니다.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
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
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-border" />
              )}
              
              <div className="relative bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border text-center">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button onClick={scrollToForm} size="lg" className="gap-2">
            절감 가능한 전기료 조회하기
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
