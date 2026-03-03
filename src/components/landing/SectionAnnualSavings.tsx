import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import bgElectricity from "@/assets/savings/bg-electricity.jpg";
import bgCarbon from "@/assets/savings/bg-carbon.jpg";
import bgForest from "@/assets/savings/bg-forest.jpg";
import bgHomes from "@/assets/savings/bg-homes.jpg";

/* ── Count-up hook ── */
function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

/* ── Stat card data ── */
const stats = [
  {
    value: 38,
    suffix: "GWh",
    label: "전력 에너지 절감",
    bg: bgElectricity,
  },
  {
    value: 18057,
    suffix: "tCO₂",
    label: "탄소 배출 절감",
    bg: bgCarbon,
  },
  {
    value: 109682,
    suffix: "그루",
    label: "소나무 식수 효과",
    bg: bgForest,
  },
  {
    value: 10326,
    suffix: "가구",
    label: "가구 환산 효과",
    bg: bgHomes,
  },
];

/* ── Glassmorphism Stat Card ── */
function StatCard({
  stat,
  index,
  started,
  onHover,
}: {
  stat: (typeof stats)[number];
  index: number;
  started: boolean;
  onHover: (idx: number | null) => void;
}) {
  const count = useCountUp(stat.value, 2000, started);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="group relative flex flex-col items-center text-center rounded-2xl border border-white/20 backdrop-blur-xl px-6 py-10 cursor-pointer transition-all duration-500 ease-out hover:scale-110 hover:border-white/40 hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)]"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Label */}
      <p className="text-sm font-semibold text-white/60 tracking-wide mb-4 transition-colors duration-300 group-hover:text-white/90">
        {stat.label}
      </p>

      {/* Number + Unit */}
      <div className="flex items-baseline gap-1 whitespace-nowrap">
        <span className="text-2xl md:text-3xl font-black text-white tracking-tight tabular-nums">
          {count.toLocaleString()}
        </span>
        <span className="text-sm md:text-base font-bold text-white/70">
          {stat.suffix}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export function SectionAnnualSavings() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Default background is the first stat's image
  const currentBg = hoveredIdx !== null ? stats[hoveredIdx].bg : bgElectricity;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: "6rem 1.25rem" }}
    >
      {/* Background images – all preloaded, opacity-toggled for smooth crossfade */}
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: currentBg === stat.bg ? 1 : 0,
            backgroundImage: `url(${stat.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight">
            NX가 연간 만들어내는 에너지 최적화 효과
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              started={inView}
              onHover={setHoveredIdx}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-xs text-white/40 text-center mt-14"
        >
          * 수치는 2024년 연간 실적 기준이며, 프로젝트 조건에 따라 달라질 수
          있습니다.
        </motion.p>
      </div>
    </section>
  );
}
