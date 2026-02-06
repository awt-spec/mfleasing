import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  className?: string;
}

const slideVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    rotateX: 5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

export const Slide = ({ children, className = "" }: SlideProps) => {
  return (
    <motion.div
      className={`min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 perspective-container ${className}`}
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export const SlideTitle = ({ children }: { children: ReactNode }) => (
  <motion.h1
    className="section-title text-center mb-4"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, duration: 0.6 }}
  >
    {children}
  </motion.h1>
);

export const SlideSubtitle = ({ children }: { children: ReactNode }) => (
  <motion.h2
    className="section-subtitle text-center mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
  >
    {children}
  </motion.h2>
);

export const SlideContent = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={`w-full max-w-6xl mx-auto ${className}`}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
  >
    {children}
  </motion.div>
);
