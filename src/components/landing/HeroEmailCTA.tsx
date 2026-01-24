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
            <span>NX | 에너지 최적화 기업</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
            매년 오르는 전기료,
            <br />
            <span className="gradient-text">지금 바로 절감하세요.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto text-balance">
            NX의 고객들은 이미 연 평균 <strong className="text-foreground">17%</strong>의 전기료를 절감하고 있습니다.
          </p>

          {/* Email CTA Form - Boxed */}
          <div className="max-w-lg mx-auto bg-card rounded-2xl border border-border shadow-card p-6 md:p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="h-12 text-base bg-background border-border"
                  aria-describedby={error ? "hero-email-error" : undefined}
                />
                {error && (
                  <p id="hero-email-error" className="text-sm text-destructive mt-2 text-left">
                    {error}
                  </p>
                )}
              </div>
              <Button type="submit" size="lg" className="w-full h-12 gap-2 group">
                전기료 절감 시작하기
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              1분이면 완료. 무료 상담. 24시간 내 회신.
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground mb-8">
            절감률은 시설/운영 조건에 따라 달라질 수 있습니다.
          </p>

          {/* Secondary CTA */}
          <Button 
            onClick={scrollToForm} 
            variant="outline" 
            size="lg" 
            className="gap-2"
          >
            절감 가능한 전기료 조회하기
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
