import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "정말 무료인가요?",
    answer:
      "네, 초기 진단과 상담은 완전 무료입니다. 절감 가능 금액을 확인하신 후 도입 여부를 결정하시면 됩니다. 부담 없이 문의해 주세요.",
  },
  {
    question: "상담은 얼마나 걸리나요?",
    answer:
      "신청 후 24시간 내 담당자가 연락드립니다. 기본 상담은 30분 내외로 진행되며, 현장 조건에 따라 달라질 수 있습니다.",
  },
  {
    question: "공사해야 하나요?",
    answer:
      "대부분의 경우 별도 공사 없이 진행 가능합니다. 일부 설비 최적화가 필요한 경우에도 운영 중단 없이 진행합니다. 조건에 따라 달라질 수 있습니다.",
  },
  {
    question: "무조건 전기료가 아껴지나요?",
    answer:
      "절감 효과는 시설 규모, 운영 패턴, 기존 설비 상태에 따라 달라집니다. 무료 진단을 통해 절감 가능 여부와 예상 금액을 먼저 확인해 드립니다.",
  },
];

export function SectionFAQ() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight">
            자주 묻는 질문
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl border border-border px-6 shadow-[0_2px_12px_-2px_hsl(220_20%_10%/0.06)]"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-[15px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA - softer approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            더 궁금한 점이 있으신가요?
          </p>
          <button 
            onClick={scrollToForm}
            className="text-sm text-primary hover:text-primary-hover transition-colors font-medium inline-flex items-center gap-1.5"
          >
            상담 신청하기
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
