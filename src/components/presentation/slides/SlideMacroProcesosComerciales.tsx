import { motion } from "framer-motion";
import { Users, FileSearch, CreditCard, Clipboard, Briefcase, TrendingUp, CheckCircle, BarChart } from "lucide-react";
import { FlowBox } from "../FlowBox";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideMacroProcesosComerciales = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Macro Procesos Comerciales
        </h2>
        <p className="text-xl text-primary font-semibold">
          Del lead al cierre
        </p>
      </SubZoomContainer>

      {/* Main process flow */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Users, title: "Prospección", desc: "Calificación de leads", color: "info" as const },
          { icon: FileSearch, title: "Cotización", desc: "Generar propuesta", color: "warning" as const },
          { icon: CreditCard, title: "Líneas de Crédito", desc: "Configuración", color: "decision" as const },
          { icon: Clipboard, title: "Formalización", desc: "Contrato", color: "success" as const },
        ].map((item, index) => (
          <SubZoomContainer key={item.title} delay={0.3 + index * 0.15} direction="bottom">
            <FlowBox
              icon={item.icon}
              title={item.title}
              description={item.desc}
              variant={item.color}
            />
          </SubZoomContainer>
        ))}
      </div>

      {/* Detailed process sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Prospección detallada */}
        <SubZoomContainer delay={0.8} direction="left">
          <div className="p-5 rounded-xl bg-card border border-border shadow-md">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-sky-600">
              <Users className="w-5 h-5" />
              Prospección
            </h4>
            <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={0.9}>
              {["Persona física o jurídica", "Sysde CRM", "Seguimiento", "Negociación"].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="flex items-center gap-2 text-sm p-2 rounded-lg bg-sky-50 dark:bg-sky-950/30"
                    whileHover={{ x: 4 }}
                  >
                    <CheckCircle className="w-4 h-4 text-sky-500" />
                    <span>{item}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </SubZoomContainer>

        {/* Línea de crédito */}
        <SubZoomContainer delay={1.0} direction="bottom">
          <div className="p-5 rounded-xl bg-card border border-border shadow-md">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-blue-600">
              <CreditCard className="w-5 h-5" />
              Línea de Crédito
            </h4>
            <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={1.1}>
              {["Monto autorizado", "Moneda", "Periodicidad de pago", "Fecha apertura/vencimiento"].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="flex items-center gap-2 text-sm p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30"
                    whileHover={{ x: 4 }}
                  >
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>{item}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </SubZoomContainer>

        {/* Postventa */}
        <SubZoomContainer delay={1.2} direction="right">
          <div className="p-5 rounded-xl bg-card border border-border shadow-md">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
              Postventa & KPI
            </h4>
            <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={1.3}>
              {["Estado operación", "Métricas", "Seguimiento", "Reportes"].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="flex items-center gap-2 text-sm p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30"
                    whileHover={{ x: 4 }}
                  >
                    <BarChart className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </SubZoomContainer>
      </div>
    </div>
  );
};
