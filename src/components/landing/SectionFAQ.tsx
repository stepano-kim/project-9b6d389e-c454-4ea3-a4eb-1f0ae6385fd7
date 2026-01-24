import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "전기료 절감은 어떻게 이루어지나요?",
    answer:
      "AI가 귀사의 전력 사용 패턴을 실시간으로 분석하여 피크 타임 분산, 대기전력 최적화, 요금제 전환 등 맞춤형 절감 전략을 제안합니다. 별도의 하드웨어 설치 없이 소프트웨어만으로 절감을 실현합니다.",
  },
  {
    question: "도입 비용과 투자 대비 효과(ROI)는 어떻게 되나요?",
    answer:
      "초기 도입 비용 없이 월 구독료 방식으로 운영됩니다. 평균적으로 도입 후 3개월 내 투자 비용을 회수하며, 연간 전기료의 15-30%를 절감하는 것으로 검증되었습니다.",
  },
  {
    question: "KEPCO 연동은 안전한가요?",
    answer:
      "네, 한전 공식 API를 통해 암호화된 연동을 진행합니다. ISO 27001 인증을 받은 보안 체계로 데이터를 보호하며, 사용자 동의 없이는 어떠한 데이터도 활용되지 않습니다.",
  },
  {
    question: "어떤 규모의 기업에 적합한가요?",
    answer:
      "월 전기료 100만원 이상 사용하는 모든 기업에 적합합니다. 중소기업부터 대기업까지 맞춤형 솔루션을 제공하며, 제조업, 유통업, 사무실 빌딩 등 업종에 관계없이 도입 가능합니다.",
  },
  {
    question: "계약 기간과 해지 조건은 어떻게 되나요?",
    answer:
      "최소 계약 기간은 3개월이며, 이후 월 단위로 자유롭게 해지 가능합니다. 해지 시 위약금이 없으며, 남은 기간에 대한 환불도 제공됩니다.",
  },
];

export function SectionFAQ() {
  return (
    <section id="faq" className="section-padding bg-secondary/30">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-lg text-muted-foreground">
            궁금한 점이 있으시면 언제든 문의해주세요
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border border-border px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
