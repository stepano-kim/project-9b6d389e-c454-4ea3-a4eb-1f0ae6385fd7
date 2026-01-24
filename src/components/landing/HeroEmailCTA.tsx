import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Zap } from "lucide-react";

interface HeroEmailCTAProps {
  onEmailSubmit: (email: string) => void;
}

export function HeroEmailCTA({ onEmailSubmit }: HeroEmailCTAProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("이메일을 입력해주세요");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요");
      return;
    }
    setError("");
    onEmailSubmit(email);
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative container-tight px-5 pt-24 pb-16 md:pt-32 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4" />
            <span>기업 전기료 절감 솔루션</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
            전기료, 더 이상
            <br />
            <span className="gradient-text">과다 지출</span>하지 마세요
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto text-balance">
            AI 기반 실시간 분석으로 평균 <strong className="text-foreground">23%</strong> 전기료 절감.
            무료 진단으로 절감 가능 금액을 확인하세요.
          </p>

          {/* Email CTA Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="hero-email" className="sr-only">
                  이메일 주소
                </label>
                <Input
                  id="hero-email"
                  type="email"
                  placeholder="업무용 이메일 입력"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="h-12 text-base bg-background border-border"
                  aria-describedby={error ? "hero-email-error" : undefined}
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-6 gap-2 group">
                전기료 절감 시작하기
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            {error && (
              <p id="hero-email-error" className="text-sm text-destructive mt-2 text-left">
                {error}
              </p>
            )}
          </form>

          {/* Trust text */}
          <p className="text-sm text-muted-foreground mt-6">
            ✓ 30초 만에 시작 · ✓ 무료 진단 제공 · ✓ 약정 없음
          </p>
        </motion.div>
      </div>
    </section>
  );
}
