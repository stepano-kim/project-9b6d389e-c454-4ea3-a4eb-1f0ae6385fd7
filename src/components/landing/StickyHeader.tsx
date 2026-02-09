import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
    setIsMobileMenuOpen(false);
  };
  return <motion.header initial={{
    y: -100
  }} animate={{
    y: 0
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/40" : "bg-transparent"}`}>
      <div className="container-tight flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <div className="flex flex-col">
          <Logo variant={isScrolled ? "color" : "white"} />
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-5">
          <span className={`text-xs transition-colors ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}>
            1분이면 완료 · 무료 상담
          </span>
          <Button 
            onClick={scrollToForm} 
            size="sm"
            className={isScrolled ? "" : "bg-white text-slate-900 hover:bg-gray-100"}
          >
            에너지 최적화 시작해보기
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-foreground hover:bg-accent" : "text-white hover:bg-white/10"}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}>
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: -10
    }} className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="flex flex-col p-5 gap-4">
            <p className="text-xs text-muted-foreground text-center">
              1분이면 완료 · 무료 상담 · 24시간 내 회신
            </p>
            <Button onClick={scrollToForm} className="w-full">
              에너지 최적화 시작해보기
            </Button>
          </div>
        </motion.div>}
    </motion.header>;
}