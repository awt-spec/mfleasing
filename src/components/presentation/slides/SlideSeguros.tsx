import { motion } from "framer-motion";
import { Shield, FileText, Key, Car, CheckCircle, ArrowRight } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideSeguros = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Flujo de Seguros
        </h2>
        <p className="text-xl text-primary font-semibold">
          Gestión de Pólizas en Arrendamiento
        </p>
      </SubZoomContainer>

      {/* Process flow */}
      <SubZoomContainer delay={0.3} direction="left">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center mb-10">
          {[
            { icon: FileText, label: "Registrar factura" },
            { icon: Shield, label: "Asociar cargo" },
            { icon: Key, label: "Periodicidad póliza" },
            { icon: CheckCircle, label: "Generar cronograma" },
          ].map((step, index) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.15 }}
            >
              <motion.div
                className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex flex-col items-center justify-center"
                whileHover={{ scale: 1.1, borderColor: "hsl(358, 78%, 45%)" }}
              >
                <step.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="text-sm font-medium max-w-[100px] hidden md:block">{step.label}</span>
              {index < 3 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </SubZoomContainer>

      {/* FAQ Style content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubZoomContainer delay={0.8} direction="bottom">
          <motion.div
            className="p-6 rounded-2xl bg-card border border-border shadow-lg"
            whileHover={{ y: -2 }}
          >
            <h4 className="font-bold text-lg mb-4 text-primary">
              ¿Cómo cobrar un seguro dentro de las rentas?
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Podemos asociar un cargo tipo seguro cuando ya está generado el contrato.
            </p>
            <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={0.9}>
              {["Asociar cargo tipo póliza", "Adjuntar documentos", "Programar periodicidad"].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded-lg"
                    whileHover={{ x: 4 }}
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>

        <SubZoomContainer delay={1.0} direction="bottom">
          <motion.div
            className="p-6 rounded-2xl bg-card border border-border shadow-lg"
            whileHover={{ y: -2 }}
          >
            <h4 className="font-bold text-lg mb-4 text-primary">
              ¿Puedo administrar las pólizas de seguro?
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Se posee un apartado para poder administrar las pólizas asociadas a los bienes.
            </p>
            <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={1.1}>
              {["# Póliza e inventario", "Tipo de póliza", "Notificaciones de vencimiento", "Reporte de control"].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded-lg"
                    whileHover={{ x: 4 }}
                  >
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>{item}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>
      </div>
    </div>
  );
};
