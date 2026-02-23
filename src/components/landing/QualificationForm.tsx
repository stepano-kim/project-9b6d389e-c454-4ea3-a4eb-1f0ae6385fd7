import { useState } from "react";
import { motion } from "framer-motion";
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
import { CheckCircle2, ArrowRight } from "lucide-react";
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
  consent: z.literal(true, { errorMap: () => ({ message: "동의가 필요합니다" }) }),
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
}

export function QualificationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
      <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => updateField("consent", checked === true)}
          />
          <div className="flex-1">
            <label htmlFor="consent" className="text-sm text-foreground cursor-pointer leading-relaxed">
              본인은 에너지 최적화 검토를 위해 에너지 공기업 등 제3자에게 정보가 제공되는 것에 동의합니다.
            </label>
            <button type="button" className="text-xs text-primary hover:underline mt-1 block">
              자세히 보기
            </button>
            {errors.consent && <p className="text-sm text-destructive mt-1">{errors.consent}</p>}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="space-y-3">
        <Button type="submit" size="lg" className="w-full gap-2">
          우리 건물 절감 가능 금액 확인하기
          <ArrowRight className="w-4 h-4" />
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          제출 후, 입력하신 정보를 바탕으로 검토하여 회신드리겠습니다.
        </p>
      </div>
    </form>
  );
}
