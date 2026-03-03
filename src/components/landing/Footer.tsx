import { Logo } from "@/components/Logo";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const familySites = [
  { label: "공식 웹사이트", url: "https://nxcorp.io/?utm_source=nxenergy_landing&utm_medium=footer_family&utm_campaign=family_site" },
  { label: "enbrix 웹사이트", url: "https://enbrix.io/?utm_source=nxenergy_landing&utm_medium=footer_family&utm_campaign=family_site" },
];

export function Footer() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <footer className="py-12 md:py-16" style={{ background: 'linear-gradient(135deg, hsl(217 91% 50%) 0%, hsl(220 80% 40%) 100%)' }}>
      <div className="container-tight">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Logo variant="white" />
            <nav className="flex flex-wrap justify-center gap-5 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">이용약관</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">문의</a>
            </nav>
          </div>

          {/* Family Site Dropdown */}
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors border border-white/20 rounded-md px-4 py-2"
            >
              FAMILY SITE
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="absolute bottom-full mb-1 right-0 min-w-[180px] bg-white rounded-md shadow-elevated overflow-hidden z-50">
                {familySites.map((site) => (
                  <a
                    key={site.url}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {site.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/15 mt-8 pt-6 text-center">
          <p className="text-xs text-white/50">© 2026 NX Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
