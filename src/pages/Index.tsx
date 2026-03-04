import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/presentation/Header";
import { BackgroundDecorations } from "@/components/presentation/BackgroundDecorations";
import { NavigationControls } from "@/components/presentation/NavigationControls";
import { Slide } from "@/components/presentation/Slide";
import { GateForm } from "@/components/presentation/GateForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Import all slide components
import { SlideIntro } from "@/components/presentation/slides/SlideIntro";
import { SlideFlujoOperativo } from "@/components/presentation/slides/SlideFlujoOperativo";
import { SlideReglasNegocioNew } from "@/components/presentation/slides/SlideReglasNegocioNew";
import { SlideAnalisisRiesgos } from "@/components/presentation/slides/SlideAnalisisRiesgos";
import { SlideProcesosFlow } from "@/components/presentation/slides/SlideProcesosFlow";
import { SlideFormalizacion } from "@/components/presentation/slides/SlideFormalizacion";
import { SlideAdminActivos } from "@/components/presentation/slides/SlideAdminActivos";
import { SlideReportes } from "@/components/presentation/slides/SlideReportes";
import { SlideClosing } from "@/components/presentation/slides/SlideClosing";

// Slide configuration with components and label keys
const slideConfig = [
  { id: 0, component: SlideIntro, labelKey: "slide.inicio" },
  { id: 1, component: SlideFlujoOperativo, labelKey: "slide.flujo" },
  { id: 2, component: SlideReglasNegocioNew, labelKey: "slide.reglas" },
  { id: 3, component: SlideAnalisisRiesgos, labelKey: "slide.riesgos" },
  { id: 4, component: SlideProcesosFlow, labelKey: "slide.comerciales" },
  { id: 5, component: SlideFormalizacion, labelKey: "slide.formalizacion" },
  { id: 6, component: SlideAdminActivos, labelKey: "slide.activos" },
  { id: 7, component: SlideReportes, labelKey: "slide.reportes" },
  { id: 8, component: SlideClosing, labelKey: "slide.cierre" },
];

// Mapping: slide index → gateId (which gate form to show before entering that slide)
const SLIDE_TO_GATE: Record<number, number> = {
  1: 0,  // Intro → Contacto (empresa, email, WhatsApp)
  2: 1,  // Reglas de Negocio → "¿Tienen operación activa de leasing?"
  4: 3,  // Procesos Comerciales → "¿Tienen sistema para administrar leasing?"
  5: 4,  // Formalización → "Usuarios que operan leasing"
  6: 5,  // Admin Activos → "¿Contratos activos?"
};

const Index = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [completedGates, setCompletedGates] = useState<Set<number>>(new Set());
  const [activeGate, setActiveGate] = useState<number | null>(null);
  const [pendingSlide, setPendingSlide] = useState<number | null>(null);
  const [hasActiveOperation, setHasActiveOperation] = useState<boolean | null>(null);
  const allAnswers = useRef<Record<string, string>>({});
  const totalSlides = slideConfig.length;

  const contactInfo = useRef<{ company: string; email: string; whatsapp: string }>({ company: '', email: '', whatsapp: '' });

  const sendSurvey = useCallback(async (answers: Record<string, string>, isSummary = false) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-survey', {
        body: { answers, contact: contactInfo.current, isSummary },
      });
      if (error) throw error;
      console.log('Survey sent successfully', data);
    } catch (err) {
      console.error('Error sending survey:', err);
    }
  }, []);

  const tryNavigate = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= totalSlides) return;

    // If no active operation, skip gate 3 (system question) automatically
    const gateId = SLIDE_TO_GATE[targetIndex];
    if (gateId !== undefined && !completedGates.has(targetIndex)) {
      if (gateId === 3 && hasActiveOperation === false) {
        // Auto-complete: no active operation means no system either
        setCompletedGates(prev => new Set(prev).add(targetIndex));
        setDirection(targetIndex > currentSlide ? 1 : -1);
        setCurrentSlide(targetIndex);
        return;
      }
      setActiveGate(gateId);
      setPendingSlide(targetIndex);
      return;
    }

    setDirection(targetIndex > currentSlide ? 1 : -1);
    setCurrentSlide(targetIndex);
  }, [totalSlides, currentSlide, completedGates, hasActiveOperation]);

  const gateLabels: Record<number, string> = {
    0: "Datos de contacto",
    1: "Operación activa de leasing",
    3: "Sistema para administrar leasing",
    4: "Usuarios que operan leasing",
    5: "Contratos activos de leasing",
  };

  const handleGateComplete = useCallback((answers: Record<string, string>) => {
    if (pendingSlide !== null) {
      // Contact gate
      if (activeGate === 0) {
        contactInfo.current = { company: answers.main, email: answers.email || '', whatsapp: answers.whatsapp || '' };
        allAnswers.current["Empresa"] = answers.main;
        allAnswers.current["Email"] = answers.email || '';
        allAnswers.current["WhatsApp"] = answers.whatsapp || '';
        sendSurvey({ "Empresa": answers.main, "Email": answers.email || '', "WhatsApp": answers.whatsapp || '' });
      } else {
        if (activeGate === 1) {
          setHasActiveOperation(answers.main === "yes");
        }
        const label = gateLabels[activeGate!] || `Gate ${activeGate}`;
        const value = answers.sub ? `${answers.main} → ${answers.sub}` : answers.main;
        allAnswers.current[label] = value;
        // Send individual answer
        sendSurvey({ [label]: value });
      }

      setCompletedGates(prev => new Set(prev).add(pendingSlide));
      setDirection(pendingSlide > currentSlide ? 1 : -1);
      setCurrentSlide(pendingSlide);

      // Send summary after last gate (gate 5)
      if (activeGate === 5) {
        sendSurvey(allAnswers.current, true);
      }
    }
    setActiveGate(null);
    setPendingSlide(null);
  }, [pendingSlide, currentSlide, activeGate, sendSurvey]);

  const goNext = useCallback(() => {
    tryNavigate(currentSlide + 1);
  }, [currentSlide, tryNavigate]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const goHome = useCallback(() => {
    setDirection(-1);
    setCurrentSlide(0);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeGate !== null) return; // Block keyboard nav while gate is open
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          goHome();
          break;
        case "End":
          e.preventDefault();
          tryNavigate(totalSlides - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, goHome, tryNavigate, totalSlides, toggleFullscreen, activeGate]);

  // Touch/swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  const CurrentSlideComponent = slideConfig[currentSlide].component;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? -10 : 10,
    }),
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <BackgroundDecorations />
      <Header />
      
      <NavigationControls
        onPrev={goPrev}
        onNext={goNext}
        onHome={goHome}
        onFullscreen={toggleFullscreen}
        canGoPrev={currentSlide > 0}
        canGoNext={currentSlide < totalSlides - 1}
      />

      {/* Gate Form Modal */}
      {activeGate !== null && (
        <GateForm
          open={true}
          onComplete={handleGateComplete}
          gateId={activeGate}
          hasActiveOperation={hasActiveOperation ?? true}
        />
      )}

      <main className="relative z-10 perspective-container" style={{ perspective: "1200px" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-h-screen"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Slide>
              <CurrentSlideComponent />
            </Slide>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Enhanced Progress Bar with labels */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative h-1 bg-muted mx-16">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentSlide / (totalSlides - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex justify-between items-start px-4 py-4">
          {slideConfig.map((slide, index) => {
            const isActive = index === currentSlide;
            const isPast = index < currentSlide;
            
            return (
              <button
                key={slide.id}
                onClick={() => tryNavigate(index)}
                className="flex flex-col items-center gap-2 group"
              >
                <motion.div
                  className={`w-3 h-3 rounded-full transition-all ${
                    isActive 
                      ? "bg-primary scale-150 shadow-lg" 
                      : isPast 
                        ? "bg-primary/60" 
                        : "bg-muted-foreground/30"
                  }`}
                  whileHover={{ scale: 1.5 }}
                  animate={isActive ? { 
                    boxShadow: ["0 0 0 0 rgba(196, 33, 38, 0.4)", "0 0 0 10px rgba(196, 33, 38, 0)", "0 0 0 0 rgba(196, 33, 38, 0)"] 
                  } : {}}
                  transition={isActive ? { duration: 1.5, repeat: Infinity } : {}}
                />
                <span className={`text-[10px] font-medium transition-all ${
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground opacity-0 group-hover:opacity-100"
                }`}>
                  {t(slide.labelKey)}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
