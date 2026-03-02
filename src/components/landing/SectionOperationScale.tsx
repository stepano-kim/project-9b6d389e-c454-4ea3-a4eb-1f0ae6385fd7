import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import bgBuildings from "@/assets/bg-buildings.jpg";

const kpiCards = [
  {
    label: "운영 중 건물",
    target: 649,
    suffix: "개",
    helper: "운영 중 522개 / 구축 완료 127개",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        <defs>
          <linearGradient id="bldg-g" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#5b9aff" />
            <stop offset="100%" stopColor="#256ef4" />
          </linearGradient>
          <filter id="bldg-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect x="8" y="16" width="20" height="40" rx="3" fill="url(#bldg-g)" filter="url(#bldg-glow)" opacity="0.9" />
        <rect x="36" y="8" width="22" height="48" rx="3" fill="url(#bldg-g)" filter="url(#bldg-glow)" />
        <rect x="13" y="22" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="20" y="22" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="13" y="30" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="20" y="30" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="13" y="38" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="20" y="38" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="41" y="14" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="49" y="14" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="41" y="22" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="49" y="22" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="41" y="30" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="49" y="30" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="41" y="38" width="4" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="49" y="38" width="4" height="4" rx="1" fill="white" opacity="0.7" />
      </svg>
    ),
  },
  {
    label: "스마트 디바이스",
    target: 348950,
    suffix: "개",
    helper: "현장 단위 실시간 계측·제어",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        <defs>
          <linearGradient id="dev-g" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#5b9aff" />
            <stop offset="100%" stopColor="#256ef4" />
          </linearGradient>
          <filter id="dev-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect x="6" y="12" width="52" height="32" rx="4" fill="url(#dev-g)" filter="url(#dev-glow)" />
        <rect x="10" y="16" width="44" height="24" rx="2" fill="#0c45c2" opacity="0.5" />
        <circle cx="20" cy="28" r="4" fill="white" opacity="0.8" />
        <circle cx="32" cy="28" r="4" fill="white" opacity="0.6" />
        <circle cx="44" cy="28" r="4" fill="white" opacity="0.8" />
        <line x1="20" y1="28" x2="32" y2="28" stroke="white" strokeWidth="1.5" opacity="0.5" />
        <line x1="32" y1="28" x2="44" y2="28" stroke="white" strokeWidth="1.5" opacity="0.5" />
        <rect x="24" y="44" width="16" height="4" rx="2" fill="url(#dev-g)" opacity="0.7" />
        <rect x="20" y="48" width="24" height="3" rx="1.5" fill="url(#dev-g)" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "적용 범위",
    target: 5,
    suffix: "개 분야",
    helper: "공공·캠퍼스·오피스·상업시설·산업 현장",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        <defs>
          <linearGradient id="map-g" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#5b9aff" />
            <stop offset="100%" stopColor="#256ef4" />
          </linearGradient>
          <filter id="map-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="32" cy="32" r="24" fill="url(#map-g)" filter="url(#map-glow)" opacity="0.15" />
        <circle cx="32" cy="32" r="16" fill="url(#map-g)" filter="url(#map-glow)" opacity="0.25" />
        <path d="M32 8 C32 8 44 20 44 30 C44 36.6 38.6 42 32 42 C25.4 42 20 36.6 20 30 C20 20 32 8 32 8Z" fill="url(#map-g)" filter="url(#map-glow)" />
        <circle cx="32" cy="28" r="6" fill="white" opacity="0.85" />
        <circle cx="32" cy="28" r="3" fill="#256ef4" />
        <ellipse cx="32" cy="52" rx="10" ry="3" fill="#256ef4" opacity="0.2" />
      </svg>
    ),
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
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: "100vh", padding: "5rem 1.25rem" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgBuildings})`,
        }}
      />
      {/* Navy gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(12,69,194,0.75) 0%, rgba(12,69,194,0.65) 50%, rgba(10,50,150,0.75) 100%)",
        }}
      />

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight mb-4">
            국내 최대 규모의 구축·운영으로 검증된 실증 레퍼런스
          </h2>
          <p className="text-base md:text-lg text-white/70">
            실제 운영 데이터로 검증된 에너지 최적화
          </p>
        </motion.div>

        {/* 3 KPI Cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {kpiCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex items-center gap-5 rounded-2xl px-6 py-5 md:px-7 md:py-6 border border-white/15"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px -8px rgba(0,0,0,0.3)",
              }}
            >
              {/* Icon */}
              <div className="shrink-0" style={{ filter: "drop-shadow(0 0 10px rgba(37,110,244,0.5))" }}>
                {card.icon}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p className="text-sm text-white/60 mb-1">{card.label}</p>
                <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none mb-1">
                  <KpiNumber target={card.target} suffix={card.suffix} started={started} />
                </p>
                <p className="text-xs text-white/50">{card.helper}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] text-white/40 text-center mt-10"
        >
          * 실적/절감 수치는 프로젝트 조건에 따라 달라질 수 있습니다.
        </motion.p>
      </div>
    </section>
  );
}
