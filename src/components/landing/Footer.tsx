export function Footer() {
  return (
    <footer className="bg-foreground text-background py-10 md:py-12">
      <div className="container-tight px-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="#"
              className="text-background/60 hover:text-background transition-colors"
            >
              개인정보처리방침
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-background transition-colors"
            >
              이용약관
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-background transition-colors"
            >
              문의
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-background/40">
            © 2026 NX
          </p>
        </div>
      </div>
    </footer>
  );
}
