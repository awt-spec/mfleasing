import { motion } from "framer-motion";
import { Building2, TrendingUp, Shield, Zap } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideIntro = () => {
  return (
    <div className="w-full max-w-6xl mx-auto text-center">
      {/* Main title with zoom animation */}
      <SubZoomContainer delay={0.1} direction="zoom">
        <motion.div
          className="mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary mb-6 shadow-lg">
            <span className="text-5xl font-bold text-primary-foreground">S</span>
          </div>
        </motion.div>
      </SubZoomContainer>

      <SubZoomContainer delay={0.3} direction="bottom">
        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-4 tracking-tight">
          Arrendamiento
        </h1>
      </SubZoomContainer>

      <SubZoomContainer delay={0.5} direction="bottom">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8">
          Mapa Funcional
        </h2>
      </SubZoomContainer>

      <SubZoomContainer delay={0.7} direction="zoom">
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          <span className="text-primary font-semibold">Potenciando los servicios financieros</span> en el mundo digital mediante la aplicación ágil de la tecnología
        </p>
      </SubZoomContainer>

      {/* Feature cards with staggered animation */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8" staggerDelay={0.15} initialDelay={0.9}>
        <StaggerItem>
          <motion.div
            className="p-6 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Building2 className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-sm">Leasing Financiero</h3>
          </motion.div>
        </StaggerItem>
        <StaggerItem>
          <motion.div
            className="p-6 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-semibold text-sm">Gestión Operativa</h3>
          </motion.div>
        </StaggerItem>
        <StaggerItem>
          <motion.div
            className="p-6 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Shield className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-sm">Control de Riesgos</h3>
          </motion.div>
        </StaggerItem>
        <StaggerItem>
          <motion.div
            className="p-6 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Zap className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-semibold text-sm">Automatización</h3>
          </motion.div>
        </StaggerItem>
      </StaggerContainer>

      {/* Clients section */}
      <SubZoomContainer delay={1.5} direction="top" className="mt-12">
        <p className="text-sm text-muted-foreground mb-4">Algunos líderes que confían en Sysde</p>
        <div className="flex items-center justify-center gap-8 opacity-60">
          <span className="text-lg font-bold text-foreground">BANORTE</span>
          <span className="text-lg font-bold text-foreground">HABITAT</span>
          <span className="text-lg font-bold text-foreground">Credix</span>
        </div>
      </SubZoomContainer>
    </div>
  );
};
