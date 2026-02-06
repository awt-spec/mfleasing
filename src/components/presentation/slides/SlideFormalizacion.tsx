import { motion } from "framer-motion";
import { FileSignature, Calendar, Wallet, FileText, Building2, Calculator } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideFormalizacion = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Formalización
        </h2>
        <p className="text-xl text-primary font-semibold">
          Operación y Postventa
        </p>
      </SubZoomContainer>

      {/* Main process cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formalización */}
        <SubZoomContainer delay={0.3} direction="left">
          <motion.div
            className="p-6 rounded-2xl bg-card border-2 border-primary/30 shadow-lg h-full"
            whileHover={{ y: -4 }}
          >
            <motion.div
              className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <FileSignature className="w-7 h-7 text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-4">Firma de Contrato</h3>
            <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={0.6}>
              <StaggerItem>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  <span className="font-medium">Firma pago inicial</span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  <span className="font-medium">Actualización proveedores</span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  <span className="font-medium">Incorporación inventario</span>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>

        {/* Operación */}
        <SubZoomContainer delay={0.5} direction="bottom">
          <motion.div
            className="p-6 rounded-2xl bg-card border-2 border-emerald-500/30 shadow-lg h-full"
            whileHover={{ y: -4 }}
          >
            <motion.div
              className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              <Calendar className="w-7 h-7 text-emerald-600" />
            </motion.div>
            <h3 className="text-xl font-bold mb-4">Operación</h3>
            <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={0.8}>
              <StaggerItem>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-sm">
                  <span className="font-medium">Programación de pagos</span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-sm">
                  <span className="font-medium">Tabla de pagos final</span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-sm">
                  <span className="font-medium">Generar operación</span>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>

        {/* Cargos */}
        <SubZoomContainer delay={0.7} direction="right">
          <motion.div
            className="p-6 rounded-2xl bg-card border-2 border-amber-500/30 shadow-lg h-full"
            whileHover={{ y: -4 }}
          >
            <motion.div
              className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.9, type: "spring" }}
            >
              <Calculator className="w-7 h-7 text-amber-600" />
            </motion.div>
            <h3 className="text-xl font-bold mb-4">Cargos Iniciales</h3>
            <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={1.0}>
              <StaggerItem>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-sm">
                  <span className="font-medium">Comisión por apertura</span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-sm">
                  <span className="font-medium">Depósito de garantía</span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-sm">
                  <span className="font-medium">Documentación legal</span>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>
      </div>

      {/* Bottom indicators */}
      <SubZoomContainer delay={1.2} direction="zoom" className="mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { icon: FileText, label: "Contrato" },
            { icon: Wallet, label: "Pagaré" },
            { icon: Building2, label: "Intereses" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </SubZoomContainer>
    </div>
  );
};
