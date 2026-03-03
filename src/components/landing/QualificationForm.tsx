import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, ArrowRight, X } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "이름을 입력해주세요" }).max(100),
  email: z.string().trim().email({ message: "올바른 이메일 형식을 입력해주세요" }).max(255),
  phone: z.string().min(10, { message: "올바른 연락처를 입력해주세요" }),
  siteName: z.string().trim().min(1, { message: "사이트명을 입력해주세요" }),
  region: z.string().trim().min(1, { message: "지역을 입력해주세요" }),
  buildingType: z.string().min(1, { message: "건물 유형을 선택해주세요" }),
  annualElectricityCost: z.string().trim().min(1, { message: "연평균 전기료를 입력해주세요" }),
  totalFloorArea: z.string().trim().min(1, { message: "연면적을 입력해주세요" }),
  consent: z.literal(true, { errorMap: () => ({ message: "개인정보 제3자 제공 동의가 필요합니다" }) }),
  thirdPartyConsent: z.boolean().optional(),
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  siteName: string;
  region: string;
  buildingType: string;
  annualElectricityCost: string;
  totalFloorArea: string;
  consent: boolean;
  thirdPartyConsent: boolean;
}

export function QualificationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    siteName: "",
    region: "",
    buildingType: "",
    annualElectricityCost: "",
    totalFloorArea: "",
    consent: false,
    thirdPartyConsent: false,
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = formSchema.safeParse({
      name: formData.name,
      email: formData.email,
      phone: formData.phone.replace(/-/g, ""),
      siteName: formData.siteName,
      region: formData.region,
      buildingType: formData.buildingType,
      annualElectricityCost: formData.annualElectricityCost,
      totalFloorArea: formData.totalFloorArea,
      consent: formData.consent,
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      siteName: "",
      region: "",
      buildingType: "",
      annualElectricityCost: "",
      totalFloorArea: "",
      consent: false,
      thirdPartyConsent: false,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center py-8"
      >
        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          접수가 완료되었습니다
        </h3>
        <p className="text-muted-foreground mb-8">
          영업일 기준 24시간 내 담당자가 연락드리겠습니다.
        </p>
        <Button onClick={resetForm} variant="outline">
          홈으로 돌아가기
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
      {/* Reassurance line */}
      <p className="text-center text-muted-foreground text-sm">
        정보를 모두 입력해주시면, 확인 후 회신드리겠습니다.
      </p>

      {/* Basic Information */}
      <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
        <h3 className="text-lg font-semibold text-foreground mb-6">기본 정보</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">이름 *</Label>
            <Input
              id="name"
              placeholder="예) 홍길동"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="mt-1.5"
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email">이메일 *</Label>
            <Input
              id="email"
              type="email"
              placeholder="예) name@company.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="mt-1.5"
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone">휴대전화 *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="예) 010-0000-0000"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">결과 안내를 위해 사용됩니다.</p>
            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Building Information */}
      <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
        <h3 className="text-lg font-semibold text-foreground mb-6">건물 운영 정보</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="siteName">사이트명 *</Label>
            <Input
              id="siteName"
              placeholder="예) OO빌딩, OO캠퍼스"
              value={formData.siteName}
              onChange={(e) => updateField("siteName", e.target.value)}
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">건물 또는 운영 사이트의 이름</p>
            {errors.siteName && <p className="text-sm text-destructive mt-1">{errors.siteName}</p>}
          </div>

          <div>
            <Label htmlFor="region">지역 *</Label>
            <Input
              id="region"
              placeholder="예) 서울시 강남구"
              value={formData.region}
              onChange={(e) => updateField("region", e.target.value)}
              className="mt-1.5"
            />
            {errors.region && <p className="text-sm text-destructive mt-1">{errors.region}</p>}
          </div>

          <div>
            <Label htmlFor="buildingType">건물 유형 *</Label>
            <Select
              value={formData.buildingType}
              onValueChange={(value) => updateField("buildingType", value)}
            >
              <SelectTrigger id="buildingType" className="mt-1.5">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commercial">상업용 빌딩</SelectItem>
                <SelectItem value="campus">대학 캠퍼스</SelectItem>
                <SelectItem value="industrial">공장·산업시설</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
            {errors.buildingType && <p className="text-sm text-destructive mt-1">{errors.buildingType}</p>}
          </div>

          <div>
            <Label htmlFor="annualElectricityCost">연평균 전기료 *</Label>
            <Input
              id="annualElectricityCost"
              placeholder="예) 5억"
              value={formData.annualElectricityCost}
              onChange={(e) => updateField("annualElectricityCost", e.target.value)}
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">대략적인 수준이면 충분합니다.</p>
            {errors.annualElectricityCost && <p className="text-sm text-destructive mt-1">{errors.annualElectricityCost}</p>}
          </div>

          <div>
            <Label htmlFor="totalFloorArea">연면적 (㎡) *</Label>
            <Input
              id="totalFloorArea"
              placeholder="예) 120,000"
              value={formData.totalFloorArea}
              onChange={(e) => updateField("totalFloorArea", e.target.value)}
              className="mt-1.5"
            />
            {errors.totalFloorArea && <p className="text-sm text-destructive mt-1">{errors.totalFloorArea}</p>}
          </div>
        </div>
      </div>

      {/* Consent */}
      <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8 space-y-5">
        {/* Required consent */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => updateField("consent", checked === true)}
          />
          <div className="flex-1">
            <label htmlFor="consent" className="text-sm text-foreground cursor-pointer leading-relaxed">
              [필수] 본인은 에너지 최적화 검토를 위해 에너지 공기업 등 제3자에게 정보가 제공되는 것에 동의합니다.
            </label>
            {errors.consent && <p className="text-sm text-destructive mt-1">{errors.consent}</p>}
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Optional third-party consent */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="thirdPartyConsent"
            checked={formData.thirdPartyConsent}
            onCheckedChange={(checked) => updateField("thirdPartyConsent", checked === true)}
          />
          <div className="flex-1">
            <label htmlFor="thirdPartyConsent" className="text-sm text-foreground cursor-pointer leading-relaxed">
              [선택] 개인정보 제3자 제공(정보 공개) 동의
            </label>
            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="text-xs text-primary hover:underline mt-1 block"
            >
              자세히 보기
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Detail Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPrivacyModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl shadow-elevated max-w-2xl w-full max-h-[80vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">
                  [선택] 개인정보 제3자 제공(정보 공개) 동의(상세)
                </h3>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto text-sm text-muted-foreground leading-relaxed space-y-5">
                <div>
                  <p className="font-semibold text-foreground mb-2">1. 동의의 의미</p>
                  <p>본 동의는 NX가 고객 상담/진단 및 프로젝트 추진 과정에서, 필요한 경우에 한해 아래 "제3자(파트너/공기업 등)"에게 개인정보를 제공하는 것에 관한 동의입니다.</p>
                  <p className="mt-1">제3자 제공은 선택 사항이며, 동의하지 않더라도 무료 진단/상담 신청은 가능합니다.</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">2. 제공받는 자(제3자)</p>
                  <p>NX는 원칙적으로 정보주체 동의 없이 제3자에게 개인정보를 제공하지 않습니다. 다만, 아래 업무 수행이 필요한 경우에 한해, 최소한의 범위로 제공할 수 있습니다.</p>
                  <ul className="list-none space-y-2 mt-2">
                    <li><span className="font-medium text-foreground">(A) 에너지 공기업/공공기관</span>(선투자·사업 수행 주체) — 제공받는 자: [공기업/기관명] (예: ○○발전, ○○공사 등 / 프로젝트별 확정)</li>
                    <li><span className="font-medium text-foreground">(B) 구축(시공) 협력사</span>(설비 교체·디바이스 설치·현장 시공) — 제공받는 자: [시공사명] (프로젝트별 확정)</li>
                    <li><span className="font-medium text-foreground">(C) 운영·유지보수(O&M) 협력사</span>(운영 지원·유지보수) — 제공받는 자: [O&M사명] (프로젝트별 확정)</li>
                  </ul>
                  <p className="mt-2 text-xs">제공받는 자가 최종 확정되는 시점에, NX는 제공 전에 제공받는 자(상호/담당/연락처 등) 정보를 별도로 안내하거나, 본 상세 문서의 해당 항목을 업데이트하여 고지합니다.</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">3. 제공받는 자의 개인정보 이용 목적</p>
                  <ul className="list-none space-y-1">
                    <li><span className="font-medium text-foreground">(A) 공기업/공공기관:</span> 선투자 적용 적합성 검토, 계약/사업 진행, 정산·관리 등 프로젝트 수행</li>
                    <li><span className="font-medium text-foreground">(B) 구축(시공) 협력사:</span> 현장 방문/견적/설치·시공/안전관리/준공 등 현장 구축 수행</li>
                    <li><span className="font-medium text-foreground">(C) 운영·유지보수(O&M) 협력사:</span> 운영 지원, 장애 대응, 유지보수 등 서비스 제공</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">4. 제공하는 개인정보의 항목(최소 범위)</p>
                  <p><span className="font-medium text-foreground">(필수 제공 가능 항목)</span> 이름, 이메일, 휴대전화</p>
                  <p className="mt-1"><span className="font-medium text-foreground">(프로젝트 수행에 필요한 경우에 한해 제공 가능 항목)</span> 건물 운영 정보: 사이트명, 지역, 건물 유형, 연평균 전기료(범위 또는 값), 연면적</p>
                  <p className="mt-1 text-xs">※ NX는 목적 달성에 필요한 최소 범위로만 제공합니다.</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">5. 제공받는 자의 개인정보 보유·이용 기간</p>
                  <p>원칙: 제공 목적 달성 시까지 또는 동의 철회 시까지 보유·이용</p>
                  <p className="mt-1">단, 관계 법령에 따라 보관이 필요한 경우에는 해당 법령에서 정한 기간 동안 보관될 수 있습니다.</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">6. 동의 거부권 및 동의 거부에 따른 불이익</p>
                  <p>정보주체는 제3자 제공 동의를 거부할 권리가 있습니다.</p>
                  <p className="mt-1">동의를 거부하더라도 무료 진단/상담 신청은 가능합니다.</p>
                  <p className="mt-1">다만, 제3자(공기업/협력사) 참여가 필요한 실행 단계(선투자 계약/시공/운영 등)는 일부 제한될 수 있습니다(예: 공기업 선투자 적용 절차 진행 불가, 현장 시공/운영 협력 연계 제한 등).</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">7. 동의 철회 및 문의</p>
                  <p>동의 철회 및 개인정보 관련 문의: [NX 담당부서/이메일/전화]</p>
                  <p className="mt-1">동의 철회는 향후 제공에만 영향을 미치며, 이미 제공된 경우 제공받는 자에게도 철회/파기 요청이 전달될 수 있습니다.</p>
                </div>
              </div>

              {/* Modal Footer — Agree / Disagree */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    updateField("thirdPartyConsent", false);
                    setShowPrivacyModal(false);
                  }}
                >
                  비동의
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    updateField("thirdPartyConsent", true);
                    setShowPrivacyModal(false);
                  }}
                >
                  동의
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="space-y-3">
        <Button type="submit" size="lg" className="w-full gap-2">
          절감 가능 금액 지금 확인하기
          <ArrowRight className="w-4 h-4" />
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          제출 후, 입력하신 정보를 바탕으로 검토하여 회신드리겠습니다.
        </p>
      </div>
    </form>
  );
}
