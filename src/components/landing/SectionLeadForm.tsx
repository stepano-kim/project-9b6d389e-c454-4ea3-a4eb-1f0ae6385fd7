import { motion } from "framer-motion";
import { AnimatedTitle } from "./AnimatedTitle";
import { QualificationForm } from "./QualificationForm";
export function SectionLeadForm() {
  return <section id="lead-form" className="section-padding section-subtle">
      <div className="container-tight">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedTitle className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 tracking-tight">
            {"무료 에너지 진단으로\n절감 가능성을 확인하세요"}
          </AnimatedTitle>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground"
          >
            입력 시간: 약 1분
          </motion.p>
        </div>

        <QualificationForm />
      </div>
    </section>;
}