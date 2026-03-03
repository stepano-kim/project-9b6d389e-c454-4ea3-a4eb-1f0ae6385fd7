import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Zap, Leaf, TreePine, Home } from "lucide-react";

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
    icon: Zap,
    value: 38,
    suffix: "GWh",
    label: "전력 에너지 절감",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: Leaf,
    value: 18057,
    suffix: "t",
    prefix: "CO₂ ",
    label: "탄소 배출 절감",
    color: "from-emerald-400 to-green-400",
  },
  {
    icon: TreePine,
    value: 109682,
    suffix: "그루",
    label: "소나무 식수 효과",
    color: "from-green-400 to-lime-400",
  },
  {
    icon: Home,
    value: 10326,
    suffix: "가구",
    label: "에너지 절감 효과",
    sub: "4인 가구 기준, 월 평균 307kWh 사용",
    color: "from-amber-400 to-yellow-400",
  },
];

/* ── Animated energy particles on canvas ── */
function EnergyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // particles
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; hue: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -Math.random() * 0.4 - 0.1,
        r: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        hue: 200 + Math.random() * 40,
      });
    }

    // connection lines
    const lines: { x1: number; y1: number; x2: number; y2: number; progress: number; speed: number; hue: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const startX = Math.random() * w;
      lines.push({
        x1: startX,
        y1: h + 20,
        x2: startX + (Math.random() - 0.5) * 200,
        y2: -20,
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
        hue: 200 + Math.random() * 30,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw flowing energy lines
      lines.forEach((line) => {
        line.progress += line.speed;
        if (line.progress > 1) line.progress = 0;

        const gradLen = 0.15;
        const start = line.progress;
        const end = Math.min(start + gradLen, 1);

        const sx = line.x1 + (line.x2 - line.x1) * start;
        const sy = line.y1 + (line.y2 - line.y1) * start;
        const ex = line.x1 + (line.x2 - line.x1) * end;
        const ey = line.y1 + (line.y2 - line.y1) * end;

        const grad = ctx.createLinearGradient(sx, sy, ex, ey);
        grad.addColorStop(0, `hsla(${line.hue}, 80%, 60%, 0)`);
        grad.addColorStop(0.5, `hsla(${line.hue}, 80%, 60%, 0.4)`);
        grad.addColorStop(1, `hsla(${line.hue}, 80%, 60%, 0)`);

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const cleanup = draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => {
      cleanup?.();
      window.removeEventListener("resize", handleResize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ── Stat Card ── */
function StatCard({ stat, index, started }: { stat: typeof stats[number]; index: number; started: boolean }) {
  const count = useCountUp(stat.value, 2000, started);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-8 md:py-10">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Number */}
        <div className="mb-3">
          <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight tabular-nums">
            {stat.prefix || ""}{count.toLocaleString()}
          </span>
          <span className="text-xl md:text-2xl font-bold text-white/80 ml-1">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-base md:text-lg font-semibold text-white/90">{stat.label}</p>
        {stat.sub && (
          <p className="text-xs text-white/50 mt-1">{stat.sub}</p>
        )}
      </div>

      {/* Subtle divider on the right (not on last item) */}
      {index < stats.length - 1 && (
        <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      )}
    </motion.div>
  );
}

/* ── Main Section ── */
export function SectionAnnualSavings() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(222 30% 6%) 0%, hsl(217 40% 10%) 50%, hsl(222 30% 6%) 100%)",
        padding: "6rem 1.25rem",
      }}
    >
      {/* Energy flow animation */}
      <EnergyCanvas />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsla(217, 80%, 50%, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
            Annual Performance
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
            연간 절감 효과
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} started={inView} />
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
          * 수치는 2024년 연간 실적 기준이며, 프로젝트 조건에 따라 달라질 수 있습니다.
        </motion.p>
      </div>
    </section>
  );
}
