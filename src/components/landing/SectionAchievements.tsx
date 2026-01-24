import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingDown, Building2, Leaf, Clock } from "lucide-react";

const achievements = [
  {
    icon: TrendingDown,
    value: 23,
    suffix: "%",
    label: "평균 전기료 절감률",
    description: "AI 분석 기반 최적화",
  },
  {
    icon: Building2,
    value: 500,
    suffix: "+",
    label: "도입 기업 수",
    description: "중소기업부터 대기업까지",
  },
  {
    icon: Leaf,
    value: 15000,
    suffix: "톤",
    label: "연간 탄소 절감량",
    description: "ESG 경영 기여",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "시간",
    label: "실시간 모니터링",
    description: "365일 무중단 관리",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-foreground">
      {count.toLocaleString()}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export function SectionAchievements() {
  return (
    <section id="achievements" className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            검증된 성과
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            데이터가 증명하는 EN:TER의 전기료 절감 솔루션
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-primary mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <AnimatedCounter value={item.value} suffix={item.suffix} />
              <p className="text-base font-semibold text-foreground mt-2">
                {item.label}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
