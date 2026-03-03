import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatedTitle } from "./AnimatedTitle";
import kpiBuildingsImg from "@/assets/kpi-buildings.jpg";
import kpiDevicesImg from "@/assets/kpi-devices.jpg";

const kpiCards = [
  {
    label: "운영 중 건물",
    target: 649,
    suffix: "개",
    helper: "운영 중 522개 / 구축 완료 127개",
    image: kpiBuildingsImg,
  },
  {
    label: "스마트 디바이스",
    target: 348950,
    suffix: "개",
    helper: "현장 단위 실시간 계측·제어",
    image: kpiDevicesImg,
  },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

function KpiNumber({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const count = useCountUp(target, 1500, started);
  return (
    <span className="tabular-nums">
      {count.toLocaleString()}<span className="text-lg md:text-xl font-bold ml-0.5">{suffix}</span>
    </span>
  );
}

export function SectionOperationScale() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-background"
    >
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedTitle className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight mb-4">
            {"국내 최대 규모의 구축·운영으로\n검증된 실증 레퍼런스"}
          </AnimatedTitle>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            공공·캠퍼스·오피스·상업시설·산업 현장 등<br />다양한 분야에서 에너지를 최적화하고 있습니다.
          </motion.p>
        </div>

        {/* KPI Cards with photos */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {kpiCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative rounded-2xl overflow-hidden border border-border shadow-lg group"
              style={{ aspectRatio: "16 / 10" }}
            >
              {/* Background photo */}
              <img
                src={card.image}
                alt={card.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark gradient overlay for readability */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%)",
                }}
              />
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <p className="text-base md:text-lg font-bold text-white/90 mb-1">{card.label}</p>
                <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-1.5 drop-shadow-lg">
                  <KpiNumber target={card.target} suffix={card.suffix} started={started} />
                </p>
                <p className="text-xs md:text-sm text-white/60">{card.helper}</p>
              </div>
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
