import { useState } from "react";
import { ChevronDown, Sun } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface FacilitiesStatus {
  lighting: {
    ledRate: string;
  };
  cooling: {
    options: string[];
    otherText: string;
  };
  heating: {
    options: string[];
    otherText: string;
  };
  solar: {
    hasSolar: boolean;
    capacity: string;
    usageType: string;
  };
  other: {
    options: string[];
    productionText: string;
  };
}

interface FacilitiesStatusSectionProps {
  value: FacilitiesStatus;
  onChange: (value: FacilitiesStatus) => void;
  errors: Record<string, string>;
}

const lightingOptions = [
  { value: "under30", label: "30% 미만" },
  { value: "30to50", label: "30% ~ 50%" },
  { value: "50to70", label: "50% ~ 70%" },
  { value: "70to100", label: "70% ~ 100%" },
];

const coolingOptions = [
  { value: "ehp", label: "EHP(시스템, 스탠드, 벽걸이)" },
  { value: "ghp", label: "GHP" },
  { value: "absorption", label: "흡수식 냉온수기" },
  { value: "other", label: "기타" },
];

const heatingOptions = [
  { value: "ehp", label: "EHP(시스템, 스탠드, 벽걸이)" },
  { value: "ghp", label: "GHP" },
  { value: "absorption", label: "흡수식 냉온수기" },
  { value: "gasBoiler", label: "가스 보일러 (급탕 포함)" },
  { value: "electricBoiler", label: "전기 보일러 (급탕 포함)" },
  { value: "other", label: "기타" },
];

const otherEquipmentOptions = [
  { value: "compressor", label: "공기 압축기" },
  { value: "pump", label: "급수 펌프/모터" },
  { value: "production", label: "생산 설비" },
];

export function FacilitiesStatusSection({
  value,
  onChange,
  errors,
}: FacilitiesStatusSectionProps) {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const updateLighting = (ledRate: string) => {
    onChange({
      ...value,
      lighting: { ledRate },
    });
  };

  const toggleCoolingOption = (option: string) => {
    const current = value.cooling.options;
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    onChange({
      ...value,
      cooling: { ...value.cooling, options: updated },
    });
  };

  const toggleHeatingOption = (option: string) => {
    const current = value.heating.options;
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    onChange({
      ...value,
      heating: { ...value.heating, options: updated },
    });
  };

  const toggleOtherOption = (option: string) => {
    const current = value.other.options;
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    onChange({
      ...value,
      other: { ...value.other, options: updated },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">주요 시설현황</Label>
        <p className="text-sm text-muted-foreground mt-1">
          해당되는 항목을 선택하면 더 정확한 분석이 가능합니다. (선택)
        </p>
      </div>

      <div className="space-y-3">
        {/* 조명 */}
        <Collapsible
          open={openSections.includes("lighting")}
          onOpenChange={() => toggleSection("lighting")}
        >
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-border hover:bg-accent/50 transition-colors">
            <span className="font-medium text-foreground">조명</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                openSections.includes("lighting") ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 px-1">
            <div className="p-4 bg-background rounded-lg border border-border space-y-3">
              <Label className="text-sm">LED 보급율</Label>
              <RadioGroup
                value={value.lighting.ledRate}
                onValueChange={updateLighting}
                className="grid grid-cols-2 gap-2"
              >
                {lightingOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={`led-${option.value}`} />
                    <Label htmlFor={`led-${option.value}`} className="font-normal text-sm cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* 냉방 */}
        <Collapsible
          open={openSections.includes("cooling")}
          onOpenChange={() => toggleSection("cooling")}
        >
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-border hover:bg-accent/50 transition-colors">
            <span className="font-medium text-foreground">냉방</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                openSections.includes("cooling") ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 px-1">
            <div className="p-4 bg-background rounded-lg border border-border space-y-3">
              {coolingOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`cooling-${option.value}`}
                    checked={value.cooling.options.includes(option.value)}
                    onCheckedChange={() => toggleCoolingOption(option.value)}
                  />
                  <Label htmlFor={`cooling-${option.value}`} className="font-normal text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
              {value.cooling.options.includes("other") && (
                <div className="pt-2">
                  <Input
                    placeholder="기타 냉방 설비를 입력하세요"
                    value={value.cooling.otherText}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        cooling: { ...value.cooling, otherText: e.target.value },
                      })
                    }
                  />
                  {errors.coolingOther && (
                    <p className="text-sm text-destructive mt-1">{errors.coolingOther}</p>
                  )}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* 난방 */}
        <Collapsible
          open={openSections.includes("heating")}
          onOpenChange={() => toggleSection("heating")}
        >
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-border hover:bg-accent/50 transition-colors">
            <span className="font-medium text-foreground">난방</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                openSections.includes("heating") ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 px-1">
            <div className="p-4 bg-background rounded-lg border border-border space-y-3">
              {heatingOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`heating-${option.value}`}
                    checked={value.heating.options.includes(option.value)}
                    onCheckedChange={() => toggleHeatingOption(option.value)}
                  />
                  <Label htmlFor={`heating-${option.value}`} className="font-normal text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
              {value.heating.options.includes("other") && (
                <div className="pt-2">
                  <Input
                    placeholder="기타 난방 설비를 입력하세요"
                    value={value.heating.otherText}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        heating: { ...value.heating, otherText: e.target.value },
                      })
                    }
                  />
                  {errors.heatingOther && (
                    <p className="text-sm text-destructive mt-1">{errors.heatingOther}</p>
                  )}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* 태양광 발전 설비 */}
        <Collapsible
          open={openSections.includes("solar")}
          onOpenChange={() => toggleSection("solar")}
        >
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-border hover:bg-accent/50 transition-colors">
            <span className="font-medium text-foreground">태양광 발전 설비</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                openSections.includes("solar") ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 px-1">
            <div className="p-4 bg-background rounded-lg border border-border space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="hasSolar"
                  checked={value.solar.hasSolar}
                  onCheckedChange={(checked) =>
                    onChange({
                      ...value,
                      solar: { ...value.solar, hasSolar: checked === true },
                    })
                  }
                />
                <Label htmlFor="hasSolar" className="font-normal text-sm cursor-pointer">
                  태양광 설비 보유
                </Label>
              </div>

              {value.solar.hasSolar && (
                <div className="space-y-4 pl-6 pt-2 border-l-2 border-primary/30">
                  <div>
                    <Label htmlFor="solarCapacity" className="text-sm">용량</Label>
                    <Input
                      id="solarCapacity"
                      placeholder="예: 50kW"
                      value={value.solar.capacity}
                      onChange={(e) =>
                        onChange({
                          ...value,
                          solar: { ...value.solar, capacity: e.target.value },
                        })
                      }
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">사용 유형</Label>
                    <RadioGroup
                      value={value.solar.usageType}
                      onValueChange={(val) =>
                        onChange({
                          ...value,
                          solar: { ...value.solar, usageType: val },
                        })
                      }
                      className="flex gap-4 mt-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="selfConsumption" id="solar-self" />
                        <Label htmlFor="solar-self" className="font-normal text-sm cursor-pointer">
                          자가 소비
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="sell" id="solar-sell" />
                        <Label htmlFor="solar-sell" className="font-normal text-sm cursor-pointer">
                          전력 판매
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* 기타 설비 */}
        <Collapsible
          open={openSections.includes("other")}
          onOpenChange={() => toggleSection("other")}
        >
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-border hover:bg-accent/50 transition-colors">
            <span className="font-medium text-foreground">기타 설비</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                openSections.includes("other") ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 px-1">
            <div className="p-4 bg-background rounded-lg border border-border space-y-3">
              {otherEquipmentOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`other-${option.value}`}
                    checked={value.other.options.includes(option.value)}
                    onCheckedChange={() => toggleOtherOption(option.value)}
                  />
                  <Label htmlFor={`other-${option.value}`} className="font-normal text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
              {value.other.options.includes("production") && (
                <div className="pt-2">
                  <Input
                    placeholder="생산 설비 내용을 입력하세요"
                    value={value.other.productionText}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        other: { ...value.other, productionText: e.target.value },
                      })
                    }
                  />
                  {errors.productionOther && (
                    <p className="text-sm text-destructive mt-1">{errors.productionOther}</p>
                  )}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
