import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideClosing = () => {
  return (
    <div className="w-full max-w-5xl mx-auto text-center">
      <SubZoomContainer delay={0.1} direction="zoom">
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary mb-6 shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className="text-5xl font-bold text-primary-foreground">S</span>
        </motion.div>
      </SubZoomContainer>

      <SubZoomContainer delay={0.4} direction="bottom">
        <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">
          ¡Gracias!
        </h2>
      </SubZoomContainer>

      <SubZoomContainer delay={0.6} direction="bottom">
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          <span className="text-primary font-semibold">Sysde</span> - Potenciando los servicios financieros en el mundo digital
        </p>
      </SubZoomContainer>

      {/* Key benefits */}
      <SubZoomContainer delay={0.8} direction="zoom">
        <StaggerContainer className="flex flex-wrap justify-center gap-4" staggerDelay={0.1} initialDelay={0.9}>
          {[
            "Automatización completa",
            "Gestión integral",
            "Reportes en tiempo real",
            "Alta conectividad",
          ].map((benefit) => (
            <StaggerItem key={benefit}>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{benefit}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SubZoomContainer>
    </div>
  );
};
