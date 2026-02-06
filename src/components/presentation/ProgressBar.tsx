import { motion } from "framer-motion";

interface ProgressBarProps {
  currentSlide: number;
  totalSlides: number;
  onSlideClick: (index: number) => void;
}

export const ProgressBar = ({ currentSlide, totalSlides, onSlideClick }: ProgressBarProps) => {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-6 py-3 shadow-lg border border-border/50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideClick(index)}
            className="relative group"
            aria-label={`Ir a diapositiva ${index + 1}`}
          >
            <motion.div
              className={`progress-dot ${index === currentSlide ? "progress-dot-active" : ""}`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {index + 1}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-2 text-center text-xs text-muted-foreground">
        {currentSlide + 1} / {totalSlides}
      </div>
    </motion.div>
  );
};
