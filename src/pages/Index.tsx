import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/presentation/Header";
import { BackgroundDecorations } from "@/components/presentation/BackgroundDecorations";
import { NavigationControls } from "@/components/presentation/NavigationControls";
import { ProgressBar } from "@/components/presentation/ProgressBar";
import { Slide, SlideSubtitle, SlideContent, SlideTitle } from "@/components/presentation/Slide";
import { SlideImage } from "@/components/presentation/SlideImage";
import { slidesData } from "@/data/slidesData";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.length;

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  const goNext = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const goHome = useCallback(() => {
    goToSlide(0);
  }, [goToSlide]);

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

  const currentSlideData = slidesData[currentSlide];

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

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Slide key={currentSlide}>
            <SlideTitle>{currentSlideData.title}</SlideTitle>
            {currentSlideData.subtitle && (
              <SlideSubtitle>{currentSlideData.subtitle}</SlideSubtitle>
            )}
            <SlideContent className="mt-4">
              <SlideImage
                src={currentSlideData.image}
                alt={currentSlideData.title}
                direction={currentSlideData.direction}
              />
            </SlideContent>
          </Slide>
        </AnimatePresence>
      </main>

      <ProgressBar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSlideClick={goToSlide}
      />
    </div>
  );
};

export default Index;
