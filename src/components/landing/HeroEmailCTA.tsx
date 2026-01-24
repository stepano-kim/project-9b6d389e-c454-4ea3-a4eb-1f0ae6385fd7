import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "올바른 이메일 형식을 입력해주세요" });

interface HeroEmailCTAProps {
  onEmailSubmit: (email: string) => void;
}

export function HeroEmailCTA({ onEmailSubmit }: HeroEmailCTAProps) {
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
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background" />
      
      {/* Decorative blurs - very subtle */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-primary/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-primary/[0.05] rounded-full blur-3xl" />

      <div className="relative container-tight pt-28 pb-20 md:pt-36 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-border text-accent-foreground text-sm font-medium mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>NX 에너지 최적화 기업</span>
          </motion.div>

          {/* Headline - Strong hierarchy */}
          <h1 className="text-[2.5rem] leading-[1.15] md:text-5xl lg:text-[3.5rem] font-extrabold text-foreground mb-6 text-balance tracking-tight">
            매년 오르는 전기료,
            <br />
            <span className="gradient-text">지금 바로 절감하세요.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg mx-auto text-balance leading-relaxed">
            NX의 고객들은 이미 연 평균 <strong className="text-foreground font-semibold">17%</strong>의 전기료를 절감하고 있습니다.
          </p>

          {/* Email CTA Form - Premium card */}
          <div className="max-w-md mx-auto bg-card rounded-2xl border border-border shadow-[0_8px_32px_-8px_hsl(220_20%_10%/0.1)] p-5 md:p-6 mb-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="hero-email" className="sr-only">
                  업무용 이메일
                </label>
                <Input
                  id="hero-email"
                  type="email"
                  placeholder="업무용 이메일을 입력하세요"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="h-12 text-base bg-background border-border rounded-xl"
                  aria-describedby={error ? "hero-email-error" : undefined}
                />
                {error && (
                  <p id="hero-email-error" className="text-sm text-destructive mt-2 text-left">
                    {error}
                  </p>
                )}
              </div>
              <Button type="submit" size="lg" className="w-full gap-2 group">
                전기료 절감 시작하기
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              1분이면 완료 · 무료 상담 · 24시간 내 회신
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-muted-foreground/70 mb-10">
            * 절감률은 시설/운영 조건에 따라 달라질 수 있습니다.
          </p>

          {/* Secondary CTA as text link */}
          <button 
            onClick={scrollToForm} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            절감 가능한 전기료 조회하기
          </button>
        </motion.div>
      </div>
    </section>
  );
}
