import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingDown, Building2, Leaf, ArrowRight } from "lucide-react";

const achievements = [
  {
    icon: TrendingDown,
    stat: "연 17%",
    title: "2025년 평균 전기료 절감",
    description: "고객사 평균 절감률",
  },
  {
    icon: Building2,
    stat: "649개 건물",
    title: "348,950개 국내 최대 디바이스",
    description: "절감 인프라 규모",
  },
  {
    icon: Leaf,
    stat: "연간 38GWh",
    title: "18,057t Co2 절감",
    description: "환경 기여 성과",
  },
];

export function SectionAchievements() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

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
            검증된 실적
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-primary mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {item.stat}
              </p>
              <p className="text-base font-semibold text-foreground mb-1">
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-muted-foreground text-center mb-8"
        >
          실적/절감 수치는 프로젝트 조건에 따라 달라질 수 있습니다.
        </motion.p>

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
