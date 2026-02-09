import { motion } from "framer-motion";
import { QualificationForm } from "./QualificationForm";

export function SectionLeadForm() {
  return (
    <section id="lead-form" className="section-padding section-subtle">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4 tracking-tight">
            우리 건물도 에너지 최적화를 시작할 수 있는지 확인해보세요
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            입력 시간: 약 2분
          </p>
        </motion.div>

        <QualificationForm />
      </div>
    </section>
  );
}
