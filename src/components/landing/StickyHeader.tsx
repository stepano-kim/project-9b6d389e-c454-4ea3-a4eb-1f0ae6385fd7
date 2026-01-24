import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-tight flex items-center justify-between h-16 md:h-20 px-5">
        {/* Logo */}
        <div className="flex flex-col">
          <a href="#" className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            NX
          </a>
          <span className="text-[10px] md:text-xs text-muted-foreground -mt-1">
            에너지 최적화 기업
          </span>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-xs text-muted-foreground">
            1분이면 완료 · 무료 상담 · 24시간 내 회신
          </span>
          <Button onClick={scrollToForm} size="sm">
            절감 가능한 전기료 조회하기
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-background border-t border-border"
        >
          <div className="flex flex-col p-5 gap-4">
            <p className="text-xs text-muted-foreground text-center">
              1분이면 완료 · 무료 상담 · 24시간 내 회신
            </p>
            <Button onClick={scrollToForm} className="w-full">
              절감 가능한 전기료 조회하기
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
