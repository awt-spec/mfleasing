import { motion } from "framer-motion";
import { RefreshCw, AlertTriangle, Calculator, FileSignature, ArrowRight } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideReestructuras = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Ejecución de Reestructuras
        </h2>
        <p className="text-xl text-primary font-semibold">
          Arrendamiento Financiero
        </p>
      </SubZoomContainer>

      {/* Flow diagram */}
      <SubZoomContainer delay={0.3} direction="left">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          {[
            { icon: AlertTriangle, label: "Atrasos en pagos", color: "bg-red-500/20", textColor: "text-red-600" },
            { icon: Calculator, label: "Proyección deuda", color: "bg-amber-500/20", textColor: "text-amber-600" },
            { icon: FileSignature, label: "Nueva línea", color: "bg-blue-500/20", textColor: "text-blue-600" },
            { icon: RefreshCw, label: "Nuevo ciclo", color: "bg-emerald-500/20", textColor: "text-emerald-600" },
          ].map((step, index) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.15 }}
            >
              <motion.div
                className={`w-20 h-20 rounded-2xl ${step.color} flex flex-col items-center justify-center`}
                whileHover={{ scale: 1.1 }}
              >
                <step.icon className={`w-8 h-8 ${step.textColor}`} />
                <span className="text-[10px] font-medium mt-1 text-center px-1">{step.label}</span>
              </motion.div>
              {index < 3 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </SubZoomContainer>

      {/* Details cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubZoomContainer delay={0.9} direction="bottom">
          <motion.div
            className="p-6 rounded-2xl bg-card border-2 border-amber-500/30 shadow-lg"
            whileHover={{ scale: 1.01 }}
          >
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Detección de Atrasos
            </h4>
            <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={1.0}>
              {[
                "Recupera adeudo del arrendamiento con atrasos",
                "Genera proyecciones de deuda total",
                "Estudio de alternativas de pago",
              ].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-sm"
                    whileHover={{ x: 4 }}
                  >
                    {item}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>

        <SubZoomContainer delay={1.1} direction="bottom">
          <motion.div
            className="p-6 rounded-2xl bg-card border-2 border-emerald-500/30 shadow-lg"
            whileHover={{ scale: 1.01 }}
          >
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-500" />
              Nueva Formalización
            </h4>
            <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={1.2}>
              {[
                "Nueva línea con indicador de reestructura",
                "Nuevas condiciones de pago",
                "Generación de contratos y cronogramas",
              ].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-sm"
                    whileHover={{ x: 4 }}
                  >
                    {item}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>
      </div>

      {/* Bottom note */}
      <SubZoomContainer delay={1.5} direction="zoom" className="mt-8">
        <motion.div
          className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <p className="text-sm text-muted-foreground">
            El sistema realiza el traslado del inventario y activa el nuevo ciclo automáticamente
          </p>
        </motion.div>
      </SubZoomContainer>
    </div>
  );
};
