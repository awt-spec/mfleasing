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
  showCursor?: boolean;
  cursorTarget?: string;
  /** Extra padding around the spotlight */
  spotlightPadding?: number;
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
      if (attempts < 15) {
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
        left: finalRect.left + finalRect.width * 0.45,
        top: finalRect.top + finalRect.height * 0.45,
      }}
      initial={{ opacity: 0, scale: 0.3, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
    >
      {/* Mouse pointer icon */}
      <motion.div
        animate={{
          y: [0, 6, 2, 6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut",
        }}
      >
        <MousePointer2
          className="w-8 h-8 text-primary"
          style={{
            filter: "drop-shadow(0 3px 8px rgba(196,33,38,0.5))",
            transform: "rotate(-5deg)",
          }}
        />
      </motion.div>

      {/* Click ripple effect */}
      <motion.div
        className="absolute top-1 left-1 w-5 h-5 rounded-full bg-primary/30"
        animate={{
          scale: [0.3, 2.5, 3],
          opacity: [0.8, 0.3, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 1.3,
          delay: 0.8,
          ease: "easeOut",
        }}
      />
      {/* Second ripple (delayed) */}
      <motion.div
        className="absolute top-1 left-1 w-5 h-5 rounded-full border-2 border-primary/50"
        animate={{
          scale: [0.5, 3],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 1.5,
          delay: 1.1,
          ease: "easeOut",
        }}
      />

      {/* "Click" text label */}
      <motion.div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full"
        animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, 4] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.5,
          delay: 0.6,
        }}
      >
        click
      </motion.div>
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
  {
    targetSelector: '[data-tour="activos-first-btn"]',
    titleKey: "onboarding.tip3.title",
    descKey: "onboarding.tip3.desc",
    position: "right",
    slideIndex: 6,
    showCursor: true,
    cursorTarget: '[data-tour="activos-first-btn"]',
    spotlightPadding: 12,
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
    cursorTarget: '[data-tour="activos-sub-contratos"]',
  },
  {
    targetSelector: '[data-tour="contratos-detail"]',
    titleKey: "onboarding.tip3c.title",
    descKey: "onboarding.tip3c.desc",
    position: "top",
    slideIndex: 6,
    dispatchOnEnter: "tour:enter-contratos",
    dispatchOnLeave: "tour:exit-contratos",
    showCursor: false,
    spotlightPadding: 16,
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

  // Broadcast tour active state
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("tour:state", { detail: { active } }));
  }, [active]);

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

    // Longer wait for steps that navigate to a different slide to let animations fully settle
    const needsSlideNav = currentStepData.slideIndex !== undefined && currentStepData.slideIndex !== tourSteps[prevStepRef.current]?.slideIndex;
    const baseDelay = needsSlideNav ? 1400 : 850;
    const timer = setTimeout(() => {
      setWaitingForSlide(false);
    }, currentStepData.dispatchOnEnter ? 1600 : baseDelay);

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

    // Ensure nested Activos views are always reset
    window.dispatchEvent(new Event("tour:exit-contratos"));
    window.dispatchEvent(new Event("tour:exit-activos"));

    setWaitingForSlide(false);
    setTargetRect(null);
    setStep(0);
    setActive(false);

    requestAnimationFrame(() => {
      goToSlide(0);
    });
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
  const padding = currentStep.spotlightPadding ?? 40;

  return (
    <AnimatePresence>
      {active && targetRect && !waitingForSlide && (
        <>
          {/* Overlay using box-shadow instead of mask for cleaner shadow */}
          <motion.div
            className="fixed inset-0 z-[200] pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          >
            <div
              className="absolute"
              style={{
                left: targetRect.left - padding,
                top: targetRect.top - padding,
                width: targetRect.width + padding * 2,
                height: targetRect.height + padding * 2,
                borderRadius: "16px",
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)",
              }}
            />
          </motion.div>

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
