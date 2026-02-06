import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/presentation/Header";
import { BackgroundDecorations } from "@/components/presentation/BackgroundDecorations";
import { NavigationControls } from "@/components/presentation/NavigationControls";
import { Slide } from "@/components/presentation/Slide";

// Import all slide components
import { SlideIntro } from "@/components/presentation/slides/SlideIntro";
import { SlideFlujoOperativo } from "@/components/presentation/slides/SlideFlujoOperativo";
import { SlideReglasNegocioNew } from "@/components/presentation/slides/SlideReglasNegocioNew";
import { SlideAnalisisRiesgos } from "@/components/presentation/slides/SlideAnalisisRiesgos";
import { SlideProcesosFlow } from "@/components/presentation/slides/SlideProcesosFlow";
import { SlideFormalizacion } from "@/components/presentation/slides/SlideFormalizacion";
import { SlideAdminActivos } from "@/components/presentation/slides/SlideAdminActivos";
import { SlideCobranza } from "@/components/presentation/slides/SlideCobranza";
import { SlideSeguros } from "@/components/presentation/slides/SlideSeguros";
import { SlideOpcionCompra } from "@/components/presentation/slides/SlideOpcionCompra";
import { SlideReestructuras } from "@/components/presentation/slides/SlideReestructuras";
import { SlideReportes } from "@/components/presentation/slides/SlideReportes";
import { SlideClosing } from "@/components/presentation/slides/SlideClosing";

// Slide configuration with components and labels
const slides = [
  { id: 0, component: SlideIntro, label: "Inicio" },
  { id: 1, component: SlideFlujoOperativo, label: "Flujo" },
  { id: 2, component: SlideReglasNegocioNew, label: "Reglas" },
  { id: 3, component: SlideAnalisisRiesgos, label: "Riesgos" },
  { id: 4, component: SlideProcesosFlow, label: "Procesos" },
  { id: 5, component: SlideFormalizacion, label: "Formalización" },
  { id: 6, component: SlideAdminActivos, label: "Activos" },
  { id: 7, component: SlideCobranza, label: "Cobranza" },
  { id: 8, component: SlideSeguros, label: "Seguros" },
  { id: 9, component: SlideOpcionCompra, label: "Compra" },
  { id: 10, component: SlideReestructuras, label: "Reestructuras" },
  { id: 11, component: SlideReportes, label: "Reportes" },
  { id: 12, component: SlideClosing, label: "Cierre" },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSlides = slides.length;

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    }
  }, [totalSlides, currentSlide]);

  const goNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

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
          goToSlide(totalSlides - 1);
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
  }, [goNext, goPrev, goHome, goToSlide, totalSlides, toggleFullscreen]);

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
        if (diff > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  const CurrentSlideComponent = slides[currentSlide].component;

  // Slide animation variants
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
        {/* Progress line */}
        <div className="relative h-1 bg-muted mx-16">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentSlide / (totalSlides - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Dots with labels */}
        <div className="flex justify-between items-start px-4 py-4">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            const isPast = index < currentSlide;
            
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
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
                  {slide.label}
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
