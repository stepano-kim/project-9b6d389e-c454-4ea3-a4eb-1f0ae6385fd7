export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="text-lg font-bold">NX</span>
            <nav className="flex flex-wrap justify-center gap-5 text-sm">
              <a
                href="#"
                className="text-background/50 hover:text-background transition-colors"
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className="text-background/50 hover:text-background transition-colors"
              >
                이용약관
              </a>
              <a
                href="#"
                className="text-background/50 hover:text-background transition-colors"
              >
                문의
              </a>
            </nav>
          </div>

          {/* Copyright */}
          <p className="text-sm text-background/40">
            © 2026 NX
          </p>
        </div>
      </div>
    </footer>
  );
}
