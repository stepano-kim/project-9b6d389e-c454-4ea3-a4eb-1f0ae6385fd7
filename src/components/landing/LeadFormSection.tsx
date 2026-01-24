import { motion } from "framer-motion";
import { LeadFormWizard } from "./LeadFormWizard";

interface LeadFormSectionProps {
  prefilledEmail?: string;
}

export function LeadFormSection({ prefilledEmail = "" }: LeadFormSectionProps) {
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
            지금 아낄 수 있는 전기료 조회하기
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            1분이면 완료됩니다. 24시간 내 담당자가 연락드립니다.
          </p>
        </motion.div>

        <LeadFormWizard prefilledEmail={prefilledEmail} />
      </div>
    </section>
  );
}
