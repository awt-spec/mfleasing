import { motion } from "framer-motion";

interface SlideImageProps {
  src: string;
  alt: string;
  direction?: "left" | "right" | "top" | "bottom" | "zoom";
}

const animations = {
  left: {
    initial: { opacity: 0, x: 100, rotateY: -5 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    exit: { opacity: 0, x: -100, rotateY: 5 },
  },
  right: {
    initial: { opacity: 0, x: -100, rotateY: 5 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    exit: { opacity: 0, x: 100, rotateY: -5 },
  },
  top: {
    initial: { opacity: 0, y: 100, rotateX: 10 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, y: -100, rotateX: -10 },
  },
  bottom: {
    initial: { opacity: 0, y: -100, rotateX: -10 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, y: 100, rotateX: 10 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.6, rotateX: 15 },
    animate: { opacity: 1, scale: 1, rotateX: 0 },
    exit: { opacity: 0, scale: 1.2 },
  },
};

export const SlideImage = ({ src, alt, direction = "zoom" }: SlideImageProps) => {
  const animation = animations[direction];

  return (
    <motion.div
      className="slide-image-container perspective-container"
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain max-h-[70vh]"
        loading="eager"
      />
    </motion.div>
  );
};
