import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Maximize2 } from "lucide-react";

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onHome: () => void;
  onFullscreen: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export const NavigationControls = ({
  onPrev,
  onNext,
  onHome,
  onFullscreen,
  canGoPrev,
  canGoNext,
}: NavigationControlsProps) => {
  return (
    <>
      {/* Left control */}
      <motion.button
        className={`nav-control fixed left-6 top-1/2 -translate-y-1/2 z-40 ${!canGoPrev ? "opacity-30 pointer-events-none" : ""}`}
        onClick={onPrev}
        disabled={!canGoPrev}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      {/* Right control */}
      <motion.button
        className={`nav-control fixed right-6 top-1/2 -translate-y-1/2 z-40 ${!canGoNext ? "opacity-30 pointer-events-none" : ""}`}
        onClick={onNext}
        disabled={!canGoNext}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Top controls */}
      <motion.div
        className="fixed top-6 right-6 z-40 flex gap-3"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          className="nav-control"
          onClick={onHome}
          aria-label="Ir al inicio"
        >
          <Home className="w-5 h-5" />
        </button>
        <button
          className="nav-control"
          onClick={onFullscreen}
          aria-label="Pantalla completa"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </motion.div>
    </>
  );
};
