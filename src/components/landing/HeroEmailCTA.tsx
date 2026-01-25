import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
const emailSchema = z.string().trim().email({
  message: "올바른 이메일 형식을 입력해주세요"
});
interface HeroEmailCTAProps {
  onEmailSubmit: (email: string) => void;
}
export function HeroEmailCTA({
  onEmailSubmit
}: HeroEmailCTAProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");
    onEmailSubmit(result.data);
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Dark gradient background - slabscan inspired */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background" />
      
      {/* Subtle blue glow in center */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/[0.08] rounded-full blur-[120px]" />

      <div className="relative container-tight pt-28 pb-20 md:pt-36 md:pb-28">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          

          {/* Headline - Strong hierarchy */}
          <h1 className="text-[2.5rem] leading-[1.3] md:text-5xl lg:text-[3.5rem] font-extrabold text-foreground mb-6 text-balance tracking-tight">
            매년 오르는 전기료,
            <br />
            <span className="gradient-text mt-1 inline-block">지금 바로 절감하세요.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg mx-auto text-balance leading-relaxed">
            NX의 고객들은 이미 연 평균 <strong className="text-foreground font-semibold">17%</strong>의 전기료를 절감하고 있습니다.
          </p>

          {/* Email CTA Form - Premium dark card */}
          <div className="max-w-md mx-auto bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-card p-5 md:p-6 mb-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="hero-email" className="sr-only">
                  업무용 이메일
                </label>
                <Input id="hero-email" type="email" placeholder="업무용 이메일을 입력하세요" value={email} onChange={e => {
                setEmail(e.target.value);
                if (error) setError("");
              }} className="h-12 text-base bg-background/50 border-border/60 rounded-xl focus:bg-background/80 transition-colors" aria-describedby={error ? "hero-email-error" : undefined} />
                {error && <p id="hero-email-error" className="text-sm text-destructive mt-2 text-left">
                    {error}
                  </p>}
              </div>
              <Button type="submit" size="lg" className="w-full gap-2 group">
                전기료 절감 시작하기
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              1분이면 완료 · 무료 상담 · 24시간 내 회신
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-muted-foreground/70 mb-10">
            * 절감률은 시설/운영 조건에 따라 달라질 수 있습니다.
          </p>

          {/* Secondary CTA as text link */}
          
        </motion.div>
      </div>
    </section>;
}