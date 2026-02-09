import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Headphones, Megaphone, TrendingUp, Heart } from "lucide-react";

const tabs = [
  {
    id: "collaboration",
    label: "Collaboration",
    icon: Users,
    title: "팀 협업의 새로운 기준",
    description: "실시간 에너지 데이터를 팀 전체와 공유하고, 의사결정을 빠르게 내릴 수 있습니다. NX 플랫폼은 부서 간 협업을 원활하게 만들어 에너지 관리의 효율성을 극대화합니다.",
    features: ["실시간 대시보드 공유", "팀별 권한 관리", "알림 및 리포트 자동화"],
  },
  {
    id: "customer-support",
    label: "Customer support",
    icon: Headphones,
    title: "24/7 전문가 지원",
    description: "에너지 전문가가 상시 대기하여 문제 해결과 최적화 조언을 제공합니다. 빠른 응답과 맞춤형 솔루션으로 고객 만족도를 높입니다.",
    features: ["24시간 기술 지원", "원격 진단 서비스", "정기 컨설팅 리포트"],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    title: "ESG 마케팅 가치 창출",
    description: "에너지 절감 성과를 마케팅 자산으로 활용하세요. 탄소 절감량과 비용 절감 데이터를 ESG 보고서와 홍보에 바로 사용할 수 있습니다.",
    features: ["ESG 성과 리포트", "탄소 절감 인증", "브랜드 가치 향상"],
  },
  {
    id: "sales",
    label: "Sales",
    icon: TrendingUp,
    title: "비용 절감으로 수익 개선",
    description: "에너지 비용 절감은 곧 수익 개선입니다. NX와 함께 운영 비용을 줄이고, 절감된 비용을 핵심 사업에 재투자하세요.",
    features: ["월별 절감액 분석", "ROI 시뮬레이션", "투자 대비 효과 리포트"],
  },
  {
    id: "employee-engagement",
    label: "Employee engagement",
    icon: Heart,
    title: "구성원 참여 유도",
    description: "에너지 절약 캠페인과 실시간 피드백으로 구성원들의 자발적 참여를 이끌어냅니다. 함께 만드는 지속가능한 사업장 환경.",
    features: ["에너지 절약 챌린지", "부서별 랭킹 시스템", "성과 공유 대시보드"],
  },
];

export function SectionCategoryTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeTabElement = tabRefs.current[activeIndex];
    
    if (activeTabElement && tabContainerRef.current) {
      const containerRect = tabContainerRef.current.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();
      
      setIndicatorStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });

      // Scroll active tab into view on mobile
      activeTabElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground tracking-tight mb-4">
            모든 조직을 위한 에너지 솔루션
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            NX는 다양한 부서와 목표에 맞춤화된 솔루션을 제공합니다
          </p>
        </motion.div>

        {/* Tabs Container */}
        <div className="relative mb-10 md:mb-14">
          {/* Scrollable Tab Container */}
          <div
            ref={tabContainerRef}
            className="relative flex items-center justify-start md:justify-center gap-1 md:gap-2 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[index] = el)}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
                    transition-all duration-200 ease-out
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    ${isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}

            {/* Animated Gradient Underline Indicator */}
            <motion.div
              className="absolute bottom-0 h-[3px] rounded-full"
              initial={false}
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
              }}
              style={{
                background: "linear-gradient(90deg, hsl(217 91% 40%), hsl(200 85% 50%), hsl(185 80% 50%))",
                boxShadow: "0 0 12px 2px hsl(200 85% 50% / 0.4)",
              }}
            />
          </div>
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-card rounded-2xl border border-border p-8 md:p-10"
          >
            {activeTabData && (
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Text Content */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                    <activeTabData.icon className="w-4 h-4" />
                    {activeTabData.label}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {activeTabData.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {activeTabData.description}
                  </p>
                  <ul className="space-y-3">
                    {activeTabData.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Placeholder */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent rounded-xl flex items-center justify-center">
                  <activeTabData.icon className="w-20 h-20 text-primary/20" strokeWidth={1} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
