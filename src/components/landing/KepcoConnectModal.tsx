import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Shield, CheckCircle2, Loader2 } from "lucide-react";

interface KepcoConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

export function KepcoConnectModal({ isOpen, onClose, onConnect }: KepcoConnectModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!agreed) return;
    
    setIsConnecting(true);
    // Simulate API connection delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConnecting(false);
    onConnect();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-background rounded-2xl shadow-elevated border border-border mx-4">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">KEPCO 연동</h3>
                    <p className="text-sm text-muted-foreground">한전 데이터 연동</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">연동 시 수집되는 정보</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "월별 전력 사용량 데이터",
                      "시간대별 사용 패턴",
                      "현재 적용 중인 요금제 정보",
                      "계약 전력 및 기본 정보",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-accent rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">🔒 보안 안내:</strong> 모든 데이터는 
                    암호화되어 전송되며, ISO 27001 인증 보안 체계로 안전하게 관리됩니다.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="kepco-consent"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked === true)}
                  />
                  <label
                    htmlFor="kepco-consent"
                    className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                  >
                    위 정보 수집 및 활용에 동의하며, 
                    <a href="#" className="text-primary hover:underline"> 개인정보 처리방침</a>을 
                    확인하였습니다.
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-border">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  취소
                </Button>
                <Button
                  onClick={handleConnect}
                  disabled={!agreed || isConnecting}
                  className="flex-1"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      연동 중...
                    </>
                  ) : (
                    "연동하기"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
