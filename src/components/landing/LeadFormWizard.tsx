import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Zap,
  Building2,
  FileCheck,
  ChevronDown,
  Link2,
} from "lucide-react";
import { z } from "zod";
import { EnterConnectModal, KepcoDataSummary } from "./EnterConnectModal";

// Validation schemas
const step1Schema = z.object({
  companyName: z.string().trim().min(1, { message: "기업명을 입력해주세요" }).max(100),
  contactName: z.string().trim().min(1, { message: "담당자명을 입력해주세요" }).max(50),
  phone: z.string().trim().regex(/^[0-9-]{10,13}$/, { message: "올바른 연락처를 입력해주세요" }),
  email: z.string().trim().email({ message: "올바른 이메일 형식을 입력해주세요" }).max(255),
});

const step3Schema = z.object({
  assetType: z.string().min(1, { message: "관리 자산 유형을 선택해주세요" }),
  buildingCount: z.number().min(1, { message: "빌딩/시설 수를 입력해주세요" }),
  constructionYear: z.string().regex(/^[0-9]{4}$/, { message: "준공연도 4자리를 입력해주세요" }),
  totalFloorArea: z.number().min(1, { message: "연면적을 입력해주세요" }),
});

const step4Schema = z.object({
  annualElectricityCost: z.string().min(1, { message: "연간 전기료 범위를 선택해주세요" }),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: "개인정보 수집·이용에 동의해주세요" }) }),
});

interface FormData {
  // Step 1: Basic Info
  companyName: string;
  contactName: string;
  position: string;
  phone: string;
  email: string;
  // Step 2: EN:TER Connection
  enterConnected: boolean;
  // Step 3: Asset Info
  assetType: string;
  buildingCount: number;
  address: string;
  constructionYear: string;
  totalFloorArea: number;
  floors: string;
  buildings: string;
  // Step 4: Energy/Contract + Equipment
  annualElectricityCost: string;
  contractedPower: string;
  tariffType: string;
  peakManagement: string;
  equipmentCategories: string[];
  // Conditional fields
  shiftOperation: string;
  compressorCount: string;
  compressorCapacity: string;
  chillerType: string;
  hasBems: string;
  nightWeekendOperation: string;
  // Consents
  privacyConsent: boolean;
  thirdPartyConsent: string;
  marketingConsent: boolean;
  marketingSms: boolean;
  marketingEmail: boolean;
}

interface LeadFormWizardProps {
  prefilledEmail?: string;
}

const steps = [
  { id: 1, title: "기본 정보", icon: User },
  { id: 2, title: "전력 데이터", icon: Zap },
  { id: 3, title: "자산 정보", icon: Building2 },
  { id: 4, title: "에너지/설비", icon: FileCheck },
];

const assetTypes = [
  { value: "commercial", label: "상업용 빌딩" },
  { value: "hospital", label: "대형 병원" },
  { value: "factory", label: "공장" },
  { value: "logistics", label: "물류센터" },
  { value: "campus", label: "캠퍼스" },
  { value: "other", label: "기타" },
];

const electricityCostRanges = [
  { value: "5-10", label: "5~10억" },
  { value: "10-15", label: "10~15억" },
  { value: "15-30", label: "15~30억" },
  { value: "30-50", label: "30~50억" },
  { value: "50+", label: "50억 이상" },
];

const equipmentOptions = [
  { value: "hvac", label: "공조(HVAC)" },
  { value: "refrigeration", label: "냉동/냉장" },
  { value: "boiler", label: "보일러/스팀" },
  { value: "compressed_air", label: "압축공기" },
  { value: "pump_fan", label: "펌프/팬" },
  { value: "production", label: "생산설비" },
  { value: "lighting", label: "조명" },
  { value: "other", label: "기타" },
];

export function LeadFormWizard({ prefilledEmail = "" }: LeadFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showEnterModal, setShowEnterModal] = useState(false);
  const [isEditingEnterFields, setIsEditingEnterFields] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    // Step 1
    companyName: "",
    contactName: "",
    position: "",
    phone: "",
    email: prefilledEmail,
    // Step 2
    enterConnected: false,
    // Step 3
    assetType: "",
    buildingCount: 1,
    address: "",
    constructionYear: "",
    totalFloorArea: 0,
    floors: "",
    buildings: "",
    // Step 4
    annualElectricityCost: "",
    contractedPower: "",
    tariffType: "",
    peakManagement: "",
    equipmentCategories: [],
    // Conditional
    shiftOperation: "",
    compressorCount: "",
    compressorCapacity: "",
    chillerType: "",
    hasBems: "",
    nightWeekendOperation: "",
    // Consents
    privacyConsent: false,
    thirdPartyConsent: "none",
    marketingConsent: false,
    marketingSms: false,
    marketingEmail: false,
  });

  useEffect(() => {
    if (prefilledEmail && prefilledEmail !== formData.email) {
      setFormData((prev) => ({ ...prev, email: prefilledEmail }));
    }
  }, [prefilledEmail]);

  const updateField = (field: keyof FormData, value: string | boolean | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleEquipment = (value: string) => {
    const current = formData.equipmentCategories;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateField("equipmentCategories", updated);
  };

  const validateStep = (step: number): boolean => {
    let newErrors: Record<string, string> = {};

    if (step === 1) {
      const result = step1Schema.safeParse({
        companyName: formData.companyName,
        contactName: formData.contactName,
        phone: formData.phone.replace(/-/g, ""),
        email: formData.email,
      });
      if (!result.success) {
        result.error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
      }
    }

    if (step === 2) {
      // Step 2 is optional (EN:TER connection)
      return true;
    }

    if (step === 3) {
      const result = step3Schema.safeParse({
        assetType: formData.assetType,
        buildingCount: formData.buildingCount,
        constructionYear: formData.constructionYear,
        totalFloorArea: formData.totalFloorArea,
      });
      if (!result.success) {
        result.error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
      }
    }

    if (step === 4) {
      const result = step4Schema.safeParse({
        annualElectricityCost: formData.annualElectricityCost,
        privacyConsent: formData.privacyConsent,
      });
      if (!result.success) {
        result.error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
      console.log("Form Data Submitted:", formData);
      setIsSubmitted(true);
    }
  };

  const handleEnterConnect = (data: KepcoDataSummary) => {
    // Update connection state
    updateField("enterConnected", true);
    // Prefill fields from KEPCO data
    updateField("annualElectricityCost", data.annualCostRange);
    updateField("contractedPower", data.contractPower.replace(/,/g, ""));
    updateField("tariffType", data.tariffType);
    updateField("peakManagement", data.peakIssue);
    setShowEnterModal(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData({
      companyName: "",
      contactName: "",
      position: "",
      phone: "",
      email: "",
      enterConnected: false,
      assetType: "",
      buildingCount: 1,
      address: "",
      constructionYear: "",
      totalFloorArea: 0,
      floors: "",
      buildings: "",
      annualElectricityCost: "",
      contractedPower: "",
      tariffType: "",
      peakManagement: "",
      equipmentCategories: [],
      shiftOperation: "",
      compressorCount: "",
      compressorCapacity: "",
      chillerType: "",
      hasBems: "",
      nightWeekendOperation: "",
      privacyConsent: false,
      thirdPartyConsent: "none",
      marketingConsent: false,
      marketingSms: false,
      marketingEmail: false,
    });
    setErrors({});
  };

  // Check if conditional fields should show
  const isFactory = formData.assetType === "factory";
  const hasCompressedAir = formData.equipmentCategories.includes("compressed_air");
  const isHvacBuilding = ["commercial", "hospital", "campus"].includes(formData.assetType) && 
    formData.equipmentCategories.includes("hvac");

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
          접수 완료! 24시간 내 연락드릴게요.
        </h3>
        <p className="text-muted-foreground mb-8">
          빠른 상담을 원하시면 1800-0000으로 전화주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={scrollToTop} variant="outline" className="gap-2">
            홈으로
          </Button>
          {!formData.enterConnected && (
            <Button onClick={() => { setShowEnterModal(true); }} className="gap-2">
              <Link2 className="w-4 h-4" />
              추가로 데이터 연동하기
            </Button>
          )}
        </div>

        <EnterConnectModal
          open={showEnterModal}
          onOpenChange={setShowEnterModal}
          onConnect={handleEnterConnect}
        />
      </motion.div>
    );
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">
            {currentStep} / {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {steps[currentStep - 1].title}
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        {/* Step Icons */}
        <div className="flex justify-between mt-5">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  currentStep >= step.id
                    ? "bg-primary text-primary-foreground shadow-[0_2px_8px_-2px_hsl(217_90%_55%/0.4)]"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <step.icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[11px] mt-1.5 hidden sm:block font-medium ${
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-card rounded-2xl shadow-[0_8px_32px_-8px_hsl(220_20%_10%/0.1)] border border-border p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">기본 정보</h3>
              
              <div>
                <Label htmlFor="companyName">기업명 *</Label>
                <Input
                  id="companyName"
                  placeholder="(주)엔엑스에너지"
                  value={formData.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className="mt-1.5"
                />
                {errors.companyName && (
                  <p className="text-sm text-destructive mt-1">{errors.companyName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactName">담당자명 *</Label>
                <Input
                  id="contactName"
                  placeholder="홍길동"
                  value={formData.contactName}
                  onChange={(e) => updateField("contactName", e.target.value)}
                  className="mt-1.5"
                />
                {errors.contactName && (
                  <p className="text-sm text-destructive mt-1">{errors.contactName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="position">직함/부서</Label>
                <Input
                  id="position"
                  placeholder="시설관리팀 팀장"
                  value={formData.position}
                  onChange={(e) => updateField("position", e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="phone">휴대폰 번호 *</Label>
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
                <Label htmlFor="email">이메일 *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@company.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="mt-1.5"
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: EN:TER Data Connection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                전력 데이터 자동 불러오기 (EN:TER)
              </h3>

              {!formData.enterConnected ? (
                <div className="bg-accent/50 rounded-xl p-6 border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-2">
                        한전 EN:TER 에너지 마이데이터 연동
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        전력 사용량/요금 정보를 자동으로 불러옵니다. 
                        더 정확한 절감 분석이 가능해집니다.
                      </p>
                      <Button onClick={() => setShowEnterModal(true)} className="gap-2">
                        <Link2 className="w-4 h-4" />
                        내 에너지 사용량 자동으로 가져오기
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-accent/50 rounded-xl p-6 border border-primary/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-foreground">연동 완료</span>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground">
                      최근 12개월 데이터 연결됨 (예시)
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">월평균 전력량:</span>
                        <span className="ml-2 font-medium text-foreground">125,000 kWh</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">월평균 요금:</span>
                        <span className="ml-2 font-medium text-foreground">1,850만원</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
              >
                나중에 하고 계속하기 →
              </button>

              <EnterConnectModal
                open={showEnterModal}
                onOpenChange={setShowEnterModal}
                onConnect={handleEnterConnect}
              />
            </motion.div>
          )}

          {/* Step 3: Asset Info */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">자산 정보</h3>

              <div>
                <Label htmlFor="assetType">관리 자산 유형 *</Label>
                <Select
                  value={formData.assetType}
                  onValueChange={(value) => updateField("assetType", value)}
                >
                  <SelectTrigger id="assetType" className="mt-1.5">
                    <SelectValue placeholder="자산 유형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {assetTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.assetType && (
                  <p className="text-sm text-destructive mt-1">{errors.assetType}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buildingCount">빌딩/시설 수 *</Label>
                  <Input
                    id="buildingCount"
                    type="number"
                    min={1}
                    value={formData.buildingCount}
                    onChange={(e) => updateField("buildingCount", parseInt(e.target.value) || 1)}
                    className="mt-1.5"
                  />
                  {errors.buildingCount && (
                    <p className="text-sm text-destructive mt-1">{errors.buildingCount}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">주소 (시/구)</Label>
                  <Input
                    id="address"
                    placeholder="서울 강남구"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="constructionYear">준공연도 *</Label>
                  <Input
                    id="constructionYear"
                    placeholder="2015"
                    maxLength={4}
                    value={formData.constructionYear}
                    onChange={(e) => updateField("constructionYear", e.target.value.replace(/\D/g, ""))}
                    className="mt-1.5"
                  />
                  {errors.constructionYear && (
                    <p className="text-sm text-destructive mt-1">{errors.constructionYear}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="totalFloorArea">연면적 (m²) *</Label>
                  <Input
                    id="totalFloorArea"
                    type="number"
                    placeholder="50000"
                    value={formData.totalFloorArea || ""}
                    onChange={(e) => updateField("totalFloorArea", parseInt(e.target.value) || 0)}
                    className="mt-1.5"
                  />
                  {errors.totalFloorArea && (
                    <p className="text-sm text-destructive mt-1">{errors.totalFloorArea}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="floors">층수</Label>
                  <Input
                    id="floors"
                    placeholder="B3~25F"
                    value={formData.floors}
                    onChange={(e) => updateField("floors", e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="buildings">동수</Label>
                  <Input
                    id="buildings"
                    type="number"
                    placeholder="1"
                    value={formData.buildings}
                    onChange={(e) => updateField("buildings", e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Energy/Contract + Equipment */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-foreground">에너지/계약 + 설비 정보</h3>

              {/* Energy/Contract Section - Collapsible if connected */}
              {formData.enterConnected ? (
                <Collapsible open={isEditingEnterFields} onOpenChange={setIsEditingEnterFields}>
                  <div className="bg-accent/30 rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">EN:TER 데이터로 자동 입력됨</span>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <span className="text-xs">필요 시 수정하기</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isEditingEnterFields ? "rotate-180" : ""}`} />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <EnergyContractFields formData={formData} updateField={updateField} errors={errors} />
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">에너지 비용/계약 정보</h4>
                  <EnergyContractFields formData={formData} updateField={updateField} errors={errors} />
                </div>
              )}

              {/* Equipment Section */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground">주요 설비/운영 정보</h4>
                
                <div>
                  <Label>주요 설비 카테고리 (1개 이상 권장)</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {equipmentOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleEquipment(option.value)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                          formData.equipmentCategories.includes(option.value)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border hover:border-primary/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional: Factory shift operation */}
                {isFactory && (
                  <div>
                    <Label htmlFor="shiftOperation">교대 운영 여부</Label>
                    <Select
                      value={formData.shiftOperation}
                      onValueChange={(value) => updateField("shiftOperation", value)}
                    >
                      <SelectTrigger id="shiftOperation" className="mt-1.5">
                        <SelectValue placeholder="선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2shift">2교대</SelectItem>
                        <SelectItem value="3shift">3교대</SelectItem>
                        <SelectItem value="always">상시</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                        <SelectItem value="unknown">모름</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Conditional: Compressed air */}
                {hasCompressedAir && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="compressorCount">압축기 대수</Label>
                      <Input
                        id="compressorCount"
                        placeholder="예: 3대"
                        value={formData.compressorCount}
                        onChange={(e) => updateField("compressorCount", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="compressorCapacity">총 용량</Label>
                      <Input
                        id="compressorCapacity"
                        placeholder="예: 150kW (모름)"
                        value={formData.compressorCapacity}
                        onChange={(e) => updateField("compressorCapacity", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                )}

                {/* Conditional: HVAC building */}
                {isHvacBuilding && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="chillerType">냉온수기 유형</Label>
                        <Select
                          value={formData.chillerType}
                          onValueChange={(value) => updateField("chillerType", value)}
                        >
                          <SelectTrigger id="chillerType" className="mt-1.5">
                            <SelectValue placeholder="선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electric">전기식</SelectItem>
                            <SelectItem value="absorption">흡수식</SelectItem>
                            <SelectItem value="other">기타</SelectItem>
                            <SelectItem value="unknown">모름</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="hasBems">BAS/BEMS 보유 여부</Label>
                        <Select
                          value={formData.hasBems}
                          onValueChange={(value) => updateField("hasBems", value)}
                        >
                          <SelectTrigger id="hasBems" className="mt-1.5">
                            <SelectValue placeholder="선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">있음</SelectItem>
                            <SelectItem value="no">없음</SelectItem>
                            <SelectItem value="unknown">모름</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="nightWeekendOperation">야간/주말 운영 패턴</Label>
                      <Select
                        value={formData.nightWeekendOperation}
                        onValueChange={(value) => updateField("nightWeekendOperation", value)}
                      >
                        <SelectTrigger id="nightWeekendOperation" className="mt-1.5">
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="always">상시</SelectItem>
                          <SelectItem value="partial">일부</SelectItem>
                          <SelectItem value="rare">거의 없음</SelectItem>
                          <SelectItem value="unknown">모름</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>

              {/* Consent Block */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground">동의 항목</h4>

                {/* Privacy Consent (Required) */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacyConsent"
                    checked={formData.privacyConsent}
                    onCheckedChange={(checked) => updateField("privacyConsent", checked === true)}
                  />
                  <div className="flex-1">
                    <label htmlFor="privacyConsent" className="text-sm text-foreground cursor-pointer">
                      (필수) 개인정보 수집·이용 동의
                    </label>
                    {errors.privacyConsent && (
                      <p className="text-sm text-destructive mt-1">{errors.privacyConsent}</p>
                    )}
                  </div>
                </div>

                {/* Third Party Consent (Required - Radio) */}
                <div className="space-y-2">
                  <span className="text-sm text-foreground">(필수) 제3자 제공 동의</span>
                  <RadioGroup
                    value={formData.thirdPartyConsent}
                    onValueChange={(value) => updateField("thirdPartyConsent", value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="none" id="thirdParty-none" />
                      <Label htmlFor="thirdParty-none" className="font-normal text-sm">
                        해당 없음 (제공하지 않음)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="applicable" id="thirdParty-applicable" />
                      <Label htmlFor="thirdParty-applicable" className="font-normal text-sm">
                        해당 있음 (필요 시 제공)
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.thirdPartyConsent === "applicable" && (
                    <div className="ml-6 p-3 bg-accent/30 rounded-lg text-xs text-muted-foreground">
                      제3자 제공 시 관련 법령에 따라 별도 안내드립니다.
                    </div>
                  )}
                </div>

                {/* Marketing Consent (Optional) */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="marketingConsent"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) => updateField("marketingConsent", checked === true)}
                    />
                    <label htmlFor="marketingConsent" className="text-sm text-foreground cursor-pointer">
                      (선택) 마케팅 정보 수신 동의
                    </label>
                  </div>
                  {formData.marketingConsent && (
                    <div className="ml-6 flex gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="marketingSms"
                          checked={formData.marketingSms}
                          onCheckedChange={(checked) => updateField("marketingSms", checked === true)}
                        />
                        <label htmlFor="marketingSms" className="text-sm text-muted-foreground cursor-pointer">
                          SMS
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="marketingEmail"
                          checked={formData.marketingEmail}
                          onCheckedChange={(checked) => updateField("marketingEmail", checked === true)}
                        />
                        <label htmlFor="marketingEmail" className="text-sm text-muted-foreground cursor-pointer">
                          이메일
                        </label>
                      </div>
                    </div>
                  )}
                </div>
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

          {currentStep < 4 ? (
            <Button onClick={handleNext} className="gap-2">
              다음
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2">
              절감 가능한 전기료 조회하기
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Disclaimer */}
        {currentStep === 4 && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            입력하신 정보는 조회/상담 목적에만 사용됩니다.
          </p>
        )}
      </div>
    </div>
  );
}

// Extracted component for energy contract fields
function EnergyContractFields({
  formData,
  updateField,
  errors,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: string | boolean | number | string[]) => void;
  errors: Record<string, string>;
}) {
  return (
    <>
      <div>
        <Label htmlFor="annualElectricityCost">연간 전기료 (범위) *</Label>
        <Select
          value={formData.annualElectricityCost}
          onValueChange={(value) => updateField("annualElectricityCost", value)}
        >
          <SelectTrigger id="annualElectricityCost" className="mt-1.5">
            <SelectValue placeholder="범위 선택" />
          </SelectTrigger>
          <SelectContent>
            {electricityCostRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.annualElectricityCost && (
          <p className="text-sm text-destructive mt-1">{errors.annualElectricityCost}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contractedPower">계약전력 (kW)</Label>
          <Input
            id="contractedPower"
            placeholder="예: 2500 또는 모름"
            value={formData.contractedPower}
            onChange={(e) => updateField("contractedPower", e.target.value)}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="tariffType">요금제</Label>
          <Select
            value={formData.tariffType}
            onValueChange={(value) => updateField("tariffType", value)}
          >
            <SelectTrigger id="tariffType" className="mt-1.5">
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highVoltageA">고압A</SelectItem>
              <SelectItem value="highVoltageB">고압B</SelectItem>
              <SelectItem value="highVoltageC">고압C</SelectItem>
              <SelectItem value="lowVoltage">저압</SelectItem>
              <SelectItem value="unknown">모름</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="peakManagement">피크 관리 이슈</Label>
        <Select
          value={formData.peakManagement}
          onValueChange={(value) => updateField("peakManagement", value)}
        >
          <SelectTrigger id="peakManagement" className="mt-1.5">
            <SelectValue placeholder="선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">월 1회 이상</SelectItem>
            <SelectItem value="sometimes">가끔</SelectItem>
            <SelectItem value="rarely">거의 없음</SelectItem>
            <SelectItem value="unknown">모름</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
