export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container-tight px-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo & Info */}
          <div>
            <a href="#" className="text-2xl font-bold text-background">
              EN:TER
            </a>
            <p className="text-sm text-background/60 mt-2">
              기업 전기료 절감 솔루션
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6 text-sm">
            <a
              href="#"
              className="text-background/60 hover:text-background transition-colors"
            >
              회사소개
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
              개인정보처리방침
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-background transition-colors"
            >
              고객센터
            </a>
          </nav>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 text-xs text-background/40">
            <div className="space-y-1">
              <p>(주)엔터에너지 | 대표이사: 홍길동</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>서울특별시 강남구 테헤란로 123, 10층</p>
            </div>
            <div className="space-y-1 md:text-right">
              <p>고객센터: 1800-0000 (평일 09:00-18:00)</p>
              <p>이메일: contact@enter-energy.co.kr</p>
              <p className="mt-2">© 2024 EN:TER Energy. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
