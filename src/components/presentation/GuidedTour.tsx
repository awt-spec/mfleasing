import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TourStep {
  targetSelector: string;
  titleKey: string;
  descKey: string;
  position: "top" | "bottom" | "left" | "right";
  slideIndex?: number;
}

const tourSteps: TourStep[] = [
  {
    targetSelector: '[data-tour="nav-next"]',
    titleKey: "onboarding.tip1.title",
    descKey: "onboarding.tip1.desc",
    position: "left",
    slideIndex: 0,
  },
  {
    targetSelector: '[data-tour="progress-bar"]',
    titleKey: "onboarding.tip5.title",
    descKey: "onboarding.tip5.desc",
    position: "top",
    slideIndex: 0,
  },
  {
    targetSelector: '[data-tour="slide-content"]',
    titleKey: "onboarding.tip3.title",
    descKey: "onboarding.tip3.desc",
    position: "top",
    slideIndex: 6,
  },
  {
    targetSelector: '[data-tour="nav-prev"]',
    titleKey: "onboarding.tip2.title",
    descKey: "onboarding.tip2.desc",
    position: "right",
    slideIndex: 6,
  },
  {
    targetSelector: '[data-tour="slide-content"]',
    titleKey: "onboarding.tip4.title",
    descKey: "onboarding.tip4.desc",
    position: "bottom",
    slideIndex: 0,
  },
];

interface GuidedTourProps {
  onNavigate?: (slideIndex: number) => void;
}

const TOOLTIP_WIDTH = 288;
const TOOLTIP_HEIGHT = 220;
const TOOLTIP_MARGIN = 16;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getTooltipStyle = (
  rect: DOMRect,
  position: string
): React.CSSProperties => {
  const gap = 16;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
  let top = rect.bottom + gap;

  switch (position) {
    case "top":
      top = rect.top - gap - TOOLTIP_HEIGHT;
      break;
    case "bottom":
      top = rect.bottom + gap;
      break;
    case "left":
      left = rect.left - gap - TOOLTIP_WIDTH;
      top = rect.top + rect.height / 2 - TOOLTIP_HEIGHT / 2;
      break;
    case "right":
      left = rect.right + gap;
      top = rect.top + rect.height / 2 - TOOLTIP_HEIGHT / 2;
      break;
  }

  return {
    left: clamp(left, TOOLTIP_MARGIN, vw - TOOLTIP_WIDTH - TOOLTIP_MARGIN),
    top: clamp(top, TOOLTIP_MARGIN, vh - TOOLTIP_HEIGHT - TOOLTIP_MARGIN),
  };
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

export const GuidedTour = ({ onNavigate }: GuidedTourProps) => {
  const { t } = useLanguage();
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [waitingForSlide, setWaitingForSlide] = useState(false);

  // Always start the tour after a delay
  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Navigate to the correct slide when step changes
  useEffect(() => {
    if (!active) return;
    const currentStepData = tourSteps[step];
    if (currentStepData.slideIndex !== undefined && onNavigate) {
      setWaitingForSlide(true);
      setTargetRect(null); // Clear rect while transitioning
      onNavigate(currentStepData.slideIndex);
      // Wait for slide transition to finish before finding the target
      const timer = setTimeout(() => {
        setWaitingForSlide(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [active, step, onNavigate]);

  // Update target rect after slide transition completes
  useEffect(() => {
    if (!active || waitingForSlide) return;

    const findTarget = () => {
      const el = document.querySelector(tourSteps[step].targetSelector);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      }
    };

    // Small extra delay to ensure DOM is painted
    const timer = setTimeout(findTarget, 100);

    window.addEventListener("resize", findTarget);
    window.addEventListener("scroll", findTarget);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", findTarget);
      window.removeEventListener("scroll", findTarget);
    };
  }, [active, step, waitingForSlide]);

  const dismiss = useCallback(() => {
    setActive(false);
    if (onNavigate) onNavigate(0);
  }, [onNavigate]);

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
      {active && targetRect && !waitingForSlide && (
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
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

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
