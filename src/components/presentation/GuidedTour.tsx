import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Check, MousePointer2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TourStep {
  targetSelector: string;
  titleKey: string;
  descKey: string;
  position: "top" | "bottom" | "left" | "right";
  slideIndex?: number;
  dispatchOnEnter?: string;
  dispatchOnLeave?: string;
  /** Show animated click cursor on target */
  showCursor?: boolean;
  /** Selector for where the cursor should point (defaults to targetSelector) */
  cursorTarget?: string;
}

const AnimatedCursor = ({ targetSelector }: { targetSelector?: string; rect: DOMRect }) => {
  const [cursorRect, setCursorRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!targetSelector) return;
    let attempts = 0;
    const find = () => {
      const el = document.querySelector(targetSelector);
      if (el) {
        setCursorRect(el.getBoundingClientRect());
        return;
      }
      if (attempts < 10) {
        attempts++;
        setTimeout(find, 200);
      }
    };
    find();
  }, [targetSelector]);

  const finalRect = targetSelector ? cursorRect : null;
  if (!finalRect) return null;

  return (
    <motion.div
      className="fixed z-[203] pointer-events-none"
      style={{
        left: finalRect.left + finalRect.width * 0.5,
        top: finalRect.top + finalRect.height * 0.5,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        animate={{
          y: [0, 4, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: "easeInOut",
        }}
      >
        <MousePointer2 className="w-7 h-7 text-primary drop-shadow-lg" style={{ filter: "drop-shadow(0 2px 6px rgba(196,33,38,0.4))" }} />
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 w-6 h-6 rounded-full border-2 border-primary/60"
        animate={{
          scale: [0.5, 2.5],
          opacity: [0.7, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 1.2,
          delay: 0.6,
        }}
      />
    </motion.div>
  );
};

const tourSteps: TourStep[] = [
  {
    targetSelector: '[data-tour="nav-next"]',
    titleKey: "onboarding.tip1.title",
    descKey: "onboarding.tip1.desc",
    position: "left",
    slideIndex: 0,
  },
  {
    targetSelector: '[data-tour="progress-points"]',
    titleKey: "onboarding.tip5.title",
    descKey: "onboarding.tip5.desc",
    position: "top",
    slideIndex: 0,
  },
  {
    targetSelector: '[data-tour="activos-cards"]',
    titleKey: "onboarding.tip3.title",
    descKey: "onboarding.tip3.desc",
    position: "top",
    slideIndex: 6,
    showCursor: true,
    cursorTarget: '[data-tour="activos-first-btn"]',
  },
  {
    targetSelector: '[data-tour="activos-detail"]',
    titleKey: "onboarding.tip3b.title",
    descKey: "onboarding.tip3b.desc",
    position: "bottom",
    slideIndex: 6,
    dispatchOnEnter: "tour:enter-activos",
    dispatchOnLeave: "tour:exit-activos",
    showCursor: true,
    cursorTarget: '[data-tour="activos-detail"]',
  },
  {
    targetSelector: '[data-tour="nav-prev"]',
    titleKey: "onboarding.tip2.title",
    descKey: "onboarding.tip2.desc",
    position: "right",
    slideIndex: 0,
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

const getTargetRect = (selector: string) => {
  const element = document.querySelector(selector);
  return element ? element.getBoundingClientRect() : null;
};

export const GuidedTour = ({ onNavigate }: GuidedTourProps) => {
  const { t } = useLanguage();
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [waitingForSlide, setWaitingForSlide] = useState(false);
  const onNavigateRef = useRef(onNavigate);
  const prevStepRef = useRef(0);

  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const goToSlide = useCallback((slideIndex: number) => {
    onNavigateRef.current?.(slideIndex);
  }, []);

  // Handle step transitions: navigate, dispatch events
  useEffect(() => {
    if (!active) return;

    const currentStepData = tourSteps[step];
    const prevStepData = tourSteps[prevStepRef.current];

    // Dispatch leave event from previous step
    if (prevStepRef.current !== step && prevStepData?.dispatchOnLeave) {
      window.dispatchEvent(new Event(prevStepData.dispatchOnLeave));
    }

    prevStepRef.current = step;

    setWaitingForSlide(true);
    setTargetRect(null);

    // Navigate to the correct slide
    if (currentStepData.slideIndex !== undefined) {
      goToSlide(currentStepData.slideIndex);
    }

    // Dispatch enter event for this step (after a small delay for slide transition)
    const enterTimer = setTimeout(() => {
      if (currentStepData.dispatchOnEnter) {
        window.dispatchEvent(new Event(currentStepData.dispatchOnEnter));
      }
    }, 400);

    const timer = setTimeout(() => {
      setWaitingForSlide(false);
    }, currentStepData.dispatchOnEnter ? 1200 : 850);

    return () => {
      clearTimeout(timer);
      clearTimeout(enterTimer);
    };
  }, [active, step, goToSlide]);

  // Find target rect with retries
  useEffect(() => {
    if (!active || waitingForSlide) return;

    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let attempts = 0;

    const findRect = () => {
      const rect = getTargetRect(tourSteps[step].targetSelector);
      if (rect && rect.width > 0) {
        setTargetRect(rect);
        return;
      }
      if (attempts < 15) {
        attempts += 1;
        retryTimer = setTimeout(findRect, 150);
      }
    };

    const onViewportChange = () => {
      const rect = getTargetRect(tourSteps[step].targetSelector);
      if (rect) setTargetRect(rect);
    };

    findRect();
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange);

    return () => {
      if (retryTimer) clearTimeout(retryTimer);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange);
    };
  }, [active, step, waitingForSlide]);

  const dismiss = useCallback(() => {
    // Dispatch leave event from current step
    const currentStepData = tourSteps[step];
    if (currentStepData?.dispatchOnLeave) {
      window.dispatchEvent(new Event(currentStepData.dispatchOnLeave));
    }
    setActive(false);
    goToSlide(0);
  }, [goToSlide, step]);

  const next = useCallback(() => {
    if (step < tourSteps.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    dismiss();
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

          {/* Animated click cursor */}
          {currentStep.showCursor && targetRect && (
            <AnimatedCursor rect={targetRect} targetSelector={currentStep.cursorTarget || currentStep.targetSelector} />
          )}

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
                    i <= step ? "bg-foreground/30" : "bg-muted"
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
