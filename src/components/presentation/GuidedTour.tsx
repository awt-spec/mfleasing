import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "sysde-tour-seen";

interface TourStep {
  targetSelector: string;
  titleKey: string;
  descKey: string;
  position: "top" | "bottom" | "left" | "right";
}

const tourSteps: TourStep[] = [
  {
    targetSelector: '[data-tour="nav-next"]',
    titleKey: "onboarding.tip1.title",
    descKey: "onboarding.tip1.desc",
    position: "left",
  },
  {
    targetSelector: '[data-tour="progress-bar"]',
    titleKey: "onboarding.tip5.title",
    descKey: "onboarding.tip5.desc",
    position: "top",
  },
  {
    targetSelector: '[data-tour="slide-content"]',
    titleKey: "onboarding.tip3.title",
    descKey: "onboarding.tip3.desc",
    position: "bottom",
  },
  {
    targetSelector: '[data-tour="nav-prev"]',
    titleKey: "onboarding.tip2.title",
    descKey: "onboarding.tip2.desc",
    position: "right",
  },
  {
    targetSelector: '[data-tour="slide-content"]',
    titleKey: "onboarding.tip4.title",
    descKey: "onboarding.tip4.desc",
    position: "bottom",
  },
];

const TOOLTIP_WIDTH = 288; // w-72 = 18rem = 288px
const TOOLTIP_MARGIN = 16;

const getTooltipStyle = (
  rect: DOMRect,
  position: string
): React.CSSProperties => {
  const gap = 16;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left: number;
  let top: number;

  switch (position) {
    case "top":
      left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
      top = rect.top - gap;
      return {
        left: Math.max(TOOLTIP_MARGIN, Math.min(left, vw - TOOLTIP_WIDTH - TOOLTIP_MARGIN)),
        top: Math.max(TOOLTIP_MARGIN, top),
        transform: "translateY(-100%)",
      };
    case "bottom":
      left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
      top = rect.bottom + gap;
      return {
        left: Math.max(TOOLTIP_MARGIN, Math.min(left, vw - TOOLTIP_WIDTH - TOOLTIP_MARGIN)),
        top: Math.min(top, vh - 200),
        transform: "translateY(0)",
      };
    case "left":
      left = rect.left - gap - TOOLTIP_WIDTH;
      top = rect.top + rect.height / 2;
      // If it would go off-screen left, flip to right
      if (left < TOOLTIP_MARGIN) {
        return {
          left: rect.right + gap,
          top: Math.max(TOOLTIP_MARGIN, Math.min(top, vh - 200)),
          transform: "translateY(-50%)",
        };
      }
      return {
        left,
        top: Math.max(TOOLTIP_MARGIN, Math.min(top, vh - 200)),
        transform: "translateY(-50%)",
      };
    case "right":
      left = rect.right + gap;
      top = rect.top + rect.height / 2;
      // If it would go off-screen right, flip to left
      if (left + TOOLTIP_WIDTH > vw - TOOLTIP_MARGIN) {
        return {
          left: rect.left - gap - TOOLTIP_WIDTH,
          top: Math.max(TOOLTIP_MARGIN, Math.min(top, vh - 200)),
          transform: "translateY(-50%)",
        };
      }
      return {
        left,
        top: Math.max(TOOLTIP_MARGIN, Math.min(top, vh - 200)),
        transform: "translateY(-50%)",
      };
    default:
      return {};
  }
};

const getHighlightStyle = (rect: DOMRect): React.CSSProperties => ({
  position: "fixed",
  left: rect.left - 8,
  top: rect.top - 8,
  width: rect.width + 16,
  height: rect.height + 16,
  borderRadius: 16,
  pointerEvents: "none",
});

export const GuidedTour = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setActive(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateRect = useCallback(() => {
    if (!active) return;
    const el = document.querySelector(tourSteps[step].targetSelector);
    if (el) {
      setTargetRect(el.getBoundingClientRect());
    }
  }, [active, step]);

  useEffect(() => {
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [updateRect]);

  const dismiss = useCallback(() => {
    setActive(false);
    localStorage.setItem(STORAGE_KEY, "1");
  }, []);

  const next = useCallback(() => {
    if (step < tourSteps.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  }, [step, dismiss]);

  const prev = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const currentStep = tourSteps[step];
  const isLast = step === tourSteps.length - 1;

  return (
    <AnimatePresence>
      {active && targetRect && (
        <>
          {/* Backdrop with cutout */}
          <motion.div
            className="fixed inset-0 z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "rgba(0,0,0,0.55)",
              maskImage: `radial-gradient(ellipse ${targetRect.width / 2 + 40}px ${targetRect.height / 2 + 40}px at ${targetRect.left + targetRect.width / 2}px ${targetRect.top + targetRect.height / 2}px, transparent 70%, black 71%)`,
              WebkitMaskImage: `radial-gradient(ellipse ${targetRect.width / 2 + 40}px ${targetRect.height / 2 + 40}px at ${targetRect.left + targetRect.width / 2}px ${targetRect.top + targetRect.height / 2}px, transparent 70%, black 71%)`,
            }}
            onClick={dismiss}
          />

          {/* Highlight ring */}
          <motion.div
            className="fixed z-[201] border-2 border-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.2)]"
            style={getHighlightStyle(targetRect)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            layoutId="tour-highlight"
          />

          {/* Pulse ring */}
          <motion.div
            className="fixed z-[201] border-2 border-primary/40 rounded-2xl"
            style={getHighlightStyle(targetRect)}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Tooltip */}
          <motion.div
            className="fixed z-[202] bg-card border border-border rounded-2xl shadow-2xl p-5 max-w-xs w-72"
            style={getTooltipStyle(targetRect, currentStep.position)}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            key={step}
          >
            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Step counter */}
            <div className="flex gap-1.5 mb-3">
              {tourSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full flex-1 transition-colors ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <h3 className="text-sm font-bold text-foreground mb-1">
              {t(currentStep.titleKey)}
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              {t(currentStep.descKey)}
            </p>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={dismiss}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("tour.skip")}
              </button>
              <div className="flex gap-2">
                {step > 0 && (
                  <motion.button
                    onClick={prev}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowLeft className="w-4 h-4 text-foreground" />
                  </motion.button>
                )}
                <motion.button
                  onClick={next}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isLast ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      {t("onboarding.dismiss")}
                    </>
                  ) : (
                    <>
                      {t("tour.next")}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
