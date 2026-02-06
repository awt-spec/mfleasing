import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SubZoomContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "zoom" | "left" | "right" | "top" | "bottom";
}

const animations = {
  zoom: {
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
  },
  left: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  right: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  top: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  bottom: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
  },
};

export const SubZoomContainer = ({
  children,
  delay = 0,
  className = "",
  direction = "zoom",
}: SubZoomContainerProps) => {
  const animation = animations[direction];

  return (
    <motion.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
};

// Staggered children container
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0.3,
}: StaggerContainerProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
