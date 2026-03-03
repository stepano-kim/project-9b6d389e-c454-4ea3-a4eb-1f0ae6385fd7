import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="py-12 md:py-16" style={{ background: 'linear-gradient(135deg, hsl(217 91% 50%) 0%, hsl(220 80% 40%) 100%)' }}>
      <div className="container-tight">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Logo variant="white" />
            <nav className="flex flex-wrap justify-center gap-5 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">이용약관</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">문의</a>
            </nav>
          </div>
          <p className="text-sm text-white/60">© 2026 NX</p>
        </div>

        {/* Family Site */}
        <div className="border-t border-white/15 mt-8 pt-6 flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-white/50 tracking-wide uppercase">Family Site</span>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 text-sm">
            <a
              href="https://nxcorp.io/?utm_source=nxenergy_landing&utm_medium=footer_family&utm_campaign=family_site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              공식 홈페이지
            </a>
            <span className="hidden md:inline text-white/30 mx-3">·</span>
            <a
              href="https://enbrix.io/?utm_source=nxenergy_landing&utm_medium=footer_family&utm_campaign=family_site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              엔브릭스 홈페이지
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
