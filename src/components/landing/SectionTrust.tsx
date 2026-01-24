import { motion } from "framer-motion";

const partners = [
  "삼성전자",
  "LG전자",
  "현대자동차",
  "SK하이닉스",
  "포스코",
  "롯데케미칼",
  "한화솔루션",
  "두산에너빌리티",
];

export function SectionTrust() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            신뢰할 수 있는 파트너
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            500+ 기업이 선택한 솔루션
          </h2>
        </motion.div>

        {/* Partner Logo Marquee */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/30 to-transparent z-10" />
          
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12"
              >
                <div className="h-12 flex items-center justify-center px-6 py-3 bg-background rounded-lg shadow-soft border border-border">
                  <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mt-10"
        >
          {[
            "ISO 27001 인증",
            "KEPCO 공식 파트너",
            "정보보호 관리체계",
          ].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {badge}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
