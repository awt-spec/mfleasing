import { motion } from "framer-motion";
import { Shield, Brain, BarChart3, Code, Cpu, Globe, Layout, Database } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideAnalisisRiesgos = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Análisis de Riesgos
        </h2>
        <p className="text-xl text-primary font-semibold">
          Administración de Políticas
        </p>
      </SubZoomContainer>

      {/* Main feature grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Shield, label: "Test Binario", color: "text-blue-500", bg: "bg-blue-500/10" },
          { icon: Brain, label: "Decisión", color: "text-purple-500", bg: "bg-purple-500/10" },
          { icon: BarChart3, label: "Cálculo", color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { icon: Layout, label: "Matriz", color: "text-amber-500", bg: "bg-amber-500/10" },
        ].map((item, index) => (
          <SubZoomContainer key={item.label} delay={0.3 + index * 0.1} direction="zoom">
            <motion.div
              className={`p-6 rounded-2xl ${item.bg} border border-border text-center`}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              >
                <item.icon className={`w-10 h-10 ${item.color} mx-auto mb-3`} />
              </motion.div>
              <span className="font-semibold text-sm">{item.label}</span>
            </motion.div>
          </SubZoomContainer>
        ))}
      </div>

      {/* Funcionalidad section */}
      <SubZoomContainer delay={0.7} direction="bottom">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-lg">
          <motion.h3
            className="text-xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Funcionalidad
          </motion.h3>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.1} initialDelay={0.9}>
            <StaggerItem>
              <motion.div
                className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 text-center"
                whileHover={{ y: -2 }}
              >
                <Code className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <span className="text-xs font-medium">Editor gráfico-web</span>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 text-center"
                whileHover={{ y: -2 }}
              >
                <Database className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <span className="text-xs font-medium">Datos</span>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 text-center"
                whileHover={{ y: -2 }}
              >
                <Cpu className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <span className="text-xs font-medium">Machine Learning</span>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 text-center"
                whileHover={{ y: -2 }}
              >
                <Globe className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <span className="text-xs font-medium">API REST</span>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </SubZoomContainer>

      {/* Bottom badges */}
      <SubZoomContainer delay={1.3} direction="top" className="mt-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {["Dashboard", "Alta conectividad", "Tiempo real"].map((badge, i) => (
            <motion.span
              key={badge}
              className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </SubZoomContainer>
    </div>
  );
};
