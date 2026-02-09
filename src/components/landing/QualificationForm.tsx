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
  buildingCount: z.string().min(1, { message: "건물 수를 입력해주세요" }),
  usageType: z.string().min(1, { message: "사용 용도를 선택해주세요" }),
  annualEnergyCost: z.string().min(1, { message: "연간 에너지 비용을 선택해주세요" }),
  consent: z.literal(true, { errorMap: () => ({ message: "동의가 필요합니다" }) }),
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  buildingCount: string;
  maxFloors: string;
  floorsUnknown: boolean;
  totalFloorArea: string;
  areaUnknown: boolean;
  usageType: string;
  annualEnergyCost: string;
  consent: boolean;
}

export function QualificationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    buildingCount: "",
    maxFloors: "",
    floorsUnknown: false,
    totalFloorArea: "",
    areaUnknown: false,
    usageType: "",
    annualEnergyCost: "",
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
      buildingCount: formData.buildingCount,
      usageType: formData.usageType,
      annualEnergyCost: formData.annualEnergyCost,
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
      buildingCount: "",
      maxFloors: "",
      floorsUnknown: false,
      totalFloorArea: "",
      areaUnknown: false,
      usageType: "",
      annualEnergyCost: "",
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
            <Label htmlFor="buildingCount">운용 중인 건물 수 *</Label>
            <Input
              id="buildingCount"
              type="number"
              min="1"
              placeholder="예) 3"
              value={formData.buildingCount}
              onChange={(e) => updateField("buildingCount", e.target.value)}
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">현재 관리·운영 중인 전체 건물 수</p>
            {errors.buildingCount && <p className="text-sm text-destructive mt-1">{errors.buildingCount}</p>}
          </div>

          <div>
            <Label htmlFor="maxFloors">최고 층수</Label>
            <div className="flex items-center gap-4 mt-1.5">
              <Input
                id="maxFloors"
                type="number"
                min="1"
                placeholder="예) 25"
                value={formData.maxFloors}
                onChange={(e) => updateField("maxFloors", e.target.value)}
                disabled={formData.floorsUnknown}
                className="flex-1"
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  id="floorsUnknown"
                  checked={formData.floorsUnknown}
                  onCheckedChange={(checked) => {
                    updateField("floorsUnknown", checked === true);
                    if (checked) updateField("maxFloors", "");
                  }}
                />
                <label htmlFor="floorsUnknown" className="text-sm text-muted-foreground cursor-pointer">
                  모름
                </label>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">여러 건물 중 가장 높은 층수 기준</p>
          </div>

          <div>
            <Label htmlFor="totalFloorArea">총 연면적 (㎡)</Label>
            <div className="flex items-center gap-4 mt-1.5">
              <Input
                id="totalFloorArea"
                type="number"
                min="1"
                placeholder="예) 120,000"
                value={formData.totalFloorArea}
                onChange={(e) => updateField("totalFloorArea", e.target.value)}
                disabled={formData.areaUnknown}
                className="flex-1"
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  id="areaUnknown"
                  checked={formData.areaUnknown}
                  onCheckedChange={(checked) => {
                    updateField("areaUnknown", checked === true);
                    if (checked) updateField("totalFloorArea", "");
                  }}
                />
                <label htmlFor="areaUnknown" className="text-sm text-muted-foreground cursor-pointer">
                  모름
                </label>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">운용 중인 건물 전체 연면적의 합</p>
          </div>

          <div>
            <Label htmlFor="usageType">사용 용도 *</Label>
            <Select
              value={formData.usageType}
              onValueChange={(value) => updateField("usageType", value)}
            >
              <SelectTrigger id="usageType" className="mt-1.5">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="office">오피스</SelectItem>
                <SelectItem value="commercial">상업시설</SelectItem>
                <SelectItem value="mixed">복합시설</SelectItem>
                <SelectItem value="education">교육시설</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">주 사용 용도를 선택해주세요.</p>
            {errors.usageType && <p className="text-sm text-destructive mt-1">{errors.usageType}</p>}
          </div>

          <div>
            <Label htmlFor="annualEnergyCost">연간 에너지 비용 *</Label>
            <Select
              value={formData.annualEnergyCost}
              onValueChange={(value) => updateField("annualEnergyCost", value)}
            >
              <SelectTrigger id="annualEnergyCost" className="mt-1.5">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-10">10억 미만</SelectItem>
                <SelectItem value="10-20">10억 ~ 20억</SelectItem>
                <SelectItem value="20-50">20억 ~ 50억</SelectItem>
                <SelectItem value="over-50">50억 이상</SelectItem>
                <SelectItem value="unknown">모름</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">전기·가스 등 전체 기준, 대략적인 수준이면 충분합니다.</p>
            {errors.annualEnergyCost && <p className="text-sm text-destructive mt-1">{errors.annualEnergyCost}</p>}
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
          에너지 최적화 조회하기
          <ArrowRight className="w-4 h-4" />
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          제출 후, 입력하신 정보를 바탕으로 검토하여 회신드리겠습니다.
        </p>
      </div>
    </form>
  );
}
