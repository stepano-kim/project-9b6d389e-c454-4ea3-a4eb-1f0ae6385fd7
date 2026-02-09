import { motion } from "framer-motion";
import { Building2, Cpu, MapPin, Zap, Leaf, Home } from "lucide-react";

const operationStats = [
  {
    icon: Building2,
    title: "운영 중 건물",
    value: "649개 건물",
    sub: "(운영 중 522개 / 구축 완료 127개)",
  },
  {
    icon: Cpu,
    title: "스마트 디바이스",
    value: "348,950개",
    sub: "현장 단위 실시간 계측·제어",
  },
  {
    icon: MapPin,
    title: "적용 범위",
    value: "다양한 시설",
    sub: "공공 · 캠퍼스 · 오피스 · 상업시설 · 산업 현장",
  },
];

const impactStats = [
  {
    icon: Zap,
    title: "에너지 절감",
    value: "38 GWh",
    sub: "연간 전력 에너지 절감 효과",
  },
  {
    icon: Leaf,
    title: "CO₂ 절감",
    value: "18,057 t",
    sub: "약 109,682그루 소나무 식재 효과",
  },
  {
    icon: Home,
    title: "가구 환산",
    value: "10,326 가구",
    sub: "4인 가구 기준 연간 사용량 환산",
  },
];

export function SectionOperationScale() {
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
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight mb-4">
            국내 최대 규모의 구축·운영으로 검증된 실증 레퍼런스
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            실제 운영 데이터로 검증된 에너지 최적화
          </p>
        </motion.div>

        {/* Group 1 - Operation Status */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-10">
          {operationStats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-7 md:p-8 shadow-card border border-border text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-primary mb-5">
                <item.icon className="w-6 h-6" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {item.title}
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-foreground mb-1 tracking-tight">
                {item.value}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Group 2 - Energy Impact */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {impactStats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
              className="bg-card rounded-2xl p-7 md:p-8 shadow-card border border-border text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-5">
                <item.icon className="w-6 h-6" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {item.title}
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-primary mb-1 tracking-tight">
                {item.value}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] text-muted-foreground/70 text-center mt-10"
        >
          * 실적/절감 수치는 프로젝트 조건에 따라 달라질 수 있습니다.
        </motion.p>
      </div>
    </section>
  );
}
