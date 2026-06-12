// api/submit-lead.js
// Vercel 서버리스 함수 (Vite 프로젝트 루트의 /api 폴더에 위치).
// nxenergy.ai 랜딩 폼(QualificationForm) 제출 → 변환 → interbrix webhook 호출.
//
// 환경변수 (Vercel 대시보드에 등록 필요):
//   - LANDING_API_KEY      : interbrix webhook 인증 키 (interbrix 측과 동일 값)
//   - INTERBRIX_WEBHOOK_URL : (선택) 기본값 아래. 필요 시 override.

const DEFAULT_WEBHOOK_URL = "https://interbrix.vercel.app/api/leads/webhook";

// §4 건물유형 변환: 폼 value(소문자) → interbrix LeadBuildingType enum
const BUILDING_TYPE_MAP = {
  school_k12: "SCHOOL_K12",
  university: "SCHOOL_UNIVERSITY",
  office: "OFFICE",
  commercial: "COMMERCIAL",
  hospital: "HOSPITAL",
  factory: "FACTORY",
  warehouse: "WAREHOUSE",
  mixed_use: "MIXED_USE",
  other: "OTHER",
};

// §5 관심항목 변환: 폼 한글 라벨 → interbrix 영문키
const INTEREST_MAP = {
  "조명(LED) 교체·리뉴얼": "led",
  "노후 설비 교체": "aging",
  "에너지 사용량 모니터링": "monitoring",
  "피크(최대수요) 관리": "peak",
  "태양광 설비 도입 검토": "solar",
  "이상 사용 탐지": "anomaly",
  "과전압 기반 화재 예방": "fireSafety",
  "기타(직접 입력)": "other",
};

// 숫자 정규화: "500,000,000" / " 25000 " → 500000000 / 25000, 빈값 → null
function toNumber(v) {
  if (v == null) return null;
  const digits = String(v).replace(/[,\s]/g, "");
  if (digits === "" || !/^\d+$/.test(digits)) return null;
  const n = parseInt(digits, 10);
  return Number.isNaN(n) ? null : n;
}

export default async function handler(req, res) {
  // POST 만 허용
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const apiKey = process.env.LANDING_API_KEY;
  if (!apiKey) {
    console.error("LANDING_API_KEY 미설정");
    return res.status(500).json({ ok: false, error: "Server misconfigured" });
  }

  const webhookUrl = process.env.INTERBRIX_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;

  try {
    // Vercel 은 보통 req.body 를 파싱해주지만, 문자열로 올 경우 대비
    const form =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    // 필수: name
    if (!form.name || String(form.name).trim() === "") {
      return res.status(400).json({ ok: false, error: "name is required" });
    }

    // 관심항목 변환 (폼: needs 배열[한글 라벨] → 영문키 배열, 미매핑 제거)
    const improvementInterest = Array.isArray(form.needs)
      ? form.needs.map((label) => INTEREST_MAP[label]).filter(Boolean)
      : [];

    // 페이로드 구성 (명세서 §3)
    const payload = {
      name: String(form.name).trim(),
      email: form.email ? String(form.email).trim() : undefined,
      phone: form.phone ? String(form.phone).replace(/-/g, "").trim() : undefined,
      siteName: form.siteName ? String(form.siteName).trim() : undefined,
      region: form.region ? String(form.region).trim() : undefined,
      buildingType: BUILDING_TYPE_MAP[form.buildingType] || "OTHER",
      annualElectricityCost: toNumber(form.annualElectricCostKRW),
      grossFloorArea: toNumber(form.floorAreaM2),
      improvementInterest,
    };

    // interbrix webhook 호출 (키는 서버에서만 부착)
    const r = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json().catch(() => ({}));

    if (!r.ok) {
      console.error("interbrix webhook 실패:", r.status, data);
      // 외부에는 상세 노출하지 않음
      return res.status(502).json({ ok: false, error: "Lead submission failed" });
    }

    // 성공 — 폼에는 ok 만 반환 (interbrix 내부 정보 최소 노출)
    return res.status(200).json({
      ok: true,
      autoConverted: data.autoConverted ?? false,
    });
  } catch (e) {
    console.error("submit-lead 에러:", e);
    return res.status(500).json({ ok: false, error: "Internal error" });
  }
}
