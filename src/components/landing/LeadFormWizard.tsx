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
import { KepcoConnectModal } from "./KepcoConnectModal";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building,
  User,
  Zap,
  Link2,
} from "lucide-react";

interface FormData {
  email: string;
  companyName: string;
  industry: string;
  employeeCount: string;
  monthlyElectricity: string;
  name: string;
  phone: string;
  position: string;
  marketingConsent: boolean;
  kepcoConnected: boolean;
}

interface LeadFormWizardProps {
  prefilledEmail?: string;
}

const steps = [
  { id: 1, title: "기업 정보", icon: Building },
  { id: 2, title: "담당자 정보", icon: User },
  { id: 3, title: "KEPCO 연동", icon: Zap },
];

export function LeadFormWizard({ prefilledEmail = "" }: LeadFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showKepcoModal, setShowKepcoModal] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [formData, setFormData] = useState<FormData>({
    email: prefilledEmail,
    companyName: "",
    industry: "",
    employeeCount: "",
    monthlyElectricity: "",
    name: "",
    phone: "",
    position: "",
    marketingConsent: false,
    kepcoConnected: false,
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = "이메일을 입력해주세요";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "올바른 이메일 형식을 입력해주세요";
      if (!formData.companyName) newErrors.companyName = "기업명을 입력해주세요";
      if (!formData.industry) newErrors.industry = "업종을 선택해주세요";
    }

    if (step === 2) {
      if (!formData.name) newErrors.name = "이름을 입력해주세요";
      if (!formData.phone) newErrors.phone = "연락처를 입력해주세요";
      else if (!/^[0-9-]{10,13}$/.test(formData.phone.replace(/-/g, "")))
        newErrors.phone = "올바른 연락처를 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    // Simulate form submission
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const handleKepcoConnect = () => {
    updateField("kepcoConnected", true);
  };

  if (isSubmitted) {
    return (
      <section id="lead-form" className="section-padding bg-background">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              상담 신청이 완료되었습니다!
            </h2>
            <p className="text-muted-foreground mb-6">
              담당자가 24시간 이내에 연락드리겠습니다.
              <br />
              빠른 상담을 원하시면 1800-0000으로 전화주세요.
            </p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              다시 신청하기
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            무료 상담 신청
          </h2>
          <p className="text-lg text-muted-foreground">
            30초 만에 신청하고, 맞춤형 절감 리포트를 받아보세요
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Step Indicator */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-sm mt-2 font-medium ${
                      currentStep >= step.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-colors ${
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Company Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <Label htmlFor="email">업무용 이메일 *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@company.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="mt-1.5"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="companyName">기업명 *</Label>
                    <Input
                      id="companyName"
                      placeholder="(주)엔터에너지"
                      value={formData.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      className="mt-1.5"
                    />
                    {errors.companyName && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="industry">업종 *</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => updateField("industry", value)}
                    >
                      <SelectTrigger id="industry" className="mt-1.5">
                        <SelectValue placeholder="업종 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">제조업</SelectItem>
                        <SelectItem value="retail">유통/소매</SelectItem>
                        <SelectItem value="office">사무/오피스</SelectItem>
                        <SelectItem value="hotel">호텔/숙박</SelectItem>
                        <SelectItem value="hospital">병원/의료</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.industry && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.industry}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employeeCount">직원 수</Label>
                      <Select
                        value={formData.employeeCount}
                        onValueChange={(value) => updateField("employeeCount", value)}
                      >
                        <SelectTrigger id="employeeCount" className="mt-1.5">
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10명</SelectItem>
                          <SelectItem value="11-50">11-50명</SelectItem>
                          <SelectItem value="51-200">51-200명</SelectItem>
                          <SelectItem value="201-500">201-500명</SelectItem>
                          <SelectItem value="500+">500명 이상</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="monthlyElectricity">월 전기료</Label>
                      <Select
                        value={formData.monthlyElectricity}
                        onValueChange={(value) =>
                          updateField("monthlyElectricity", value)
                        }
                      >
                        <SelectTrigger id="monthlyElectricity" className="mt-1.5">
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100-500">100-500만원</SelectItem>
                          <SelectItem value="500-1000">500-1000만원</SelectItem>
                          <SelectItem value="1000-5000">1000-5000만원</SelectItem>
                          <SelectItem value="5000+">5000만원 이상</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Info */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <Label htmlFor="name">담당자 이름 *</Label>
                    <Input
                      id="name"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="mt-1.5"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">연락처 *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="mt-1.5"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="position">직책</Label>
                    <Input
                      id="position"
                      placeholder="에너지관리 담당자"
                      value={formData.position}
                      onChange={(e) => updateField("position", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="marketingConsent"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) =>
                        updateField("marketingConsent", checked === true)
                      }
                    />
                    <label
                      htmlFor="marketingConsent"
                      className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                    >
                      마케팅 정보 수신에 동의합니다. (선택)
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 3: KEPCO Connect */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center py-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                        formData.kepcoConnected
                          ? "bg-accent text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Link2 className="w-8 h-8" />
                    </div>

                    {formData.kepcoConnected ? (
                      <>
                        <div className="flex items-center justify-center gap-2 text-primary mb-2">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-semibold">연동 완료</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          KEPCO 데이터가 성공적으로 연동되었습니다.
                          <br />
                          더 정확한 절감 분석이 가능합니다.
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          KEPCO 데이터 연동 (선택)
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          한전 전력 사용 데이터를 연동하면
                          <br />
                          더 정확한 절감 분석이 가능합니다.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setShowKepcoModal(true)}
                          className="gap-2"
                        >
                          <Link2 className="w-4 h-4" />
                          KEPCO 연동하기
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="p-4 bg-accent rounded-xl text-center">
                    <p className="text-sm text-muted-foreground">
                      연동하지 않아도 상담 신청이 가능합니다.
                      <br />
                      추후 담당자 안내를 통해 연동할 수 있습니다.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <Button variant="ghost" onClick={handleBack} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  이전
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button onClick={handleNext} className="gap-2">
                  다음
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="gap-2">
                  상담 신청 완료
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <KepcoConnectModal
        isOpen={showKepcoModal}
        onClose={() => setShowKepcoModal(false)}
        onConnect={handleKepcoConnect}
      />
    </section>
  );
}
