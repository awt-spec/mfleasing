import { motion } from "framer-motion";
import { Banknote, Receipt, CreditCard, FileCheck, AlertCircle, BarChart3 } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideCobranza = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Pago a Proveedores y Cobranza
        </h2>
        <p className="text-xl text-primary font-semibold">
          Gestión Financiera Integral
        </p>
      </SubZoomContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pago a Proveedores */}
        <SubZoomContainer delay={0.3} direction="left">
          <motion.div
            className="p-6 rounded-2xl bg-card border border-border shadow-lg h-full"
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Banknote className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold">Pago a Proveedores</h3>
            </motion.div>

            <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={0.5}>
              {[
                { label: "Tipo de proveedor", sub: "Persona física / moral" },
                { label: "Documentación", sub: "Control de expediente" },
                { label: "Proceso de pago", sub: "Pago de facturas" },
                { label: "Notas de crédito", sub: "Montos a retener" },
              ].map((item) => (
                <StaggerItem key={item.label}>
                  <motion.div
                    className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg"
                    whileHover={{ x: 4 }}
                  >
                    <span className="font-medium text-sm">{item.label}</span>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>

        {/* Cobranza */}
        <SubZoomContainer delay={0.5} direction="right">
          <motion.div
            className="p-6 rounded-2xl bg-card border border-border shadow-lg h-full"
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Receipt className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Cobranza</h3>
            </motion.div>

            <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={0.7}>
              {[
                { label: "Aplicación de pagos", sub: "Pagos recibidos" },
                { label: "Excedentes", sub: "Gestión de saldos" },
                { label: "Facturación", sub: "Eventos de pago" },
                { label: "Reversión de pagos", sub: "Control y auditoría" },
              ].map((item) => (
                <StaggerItem key={item.label}>
                  <motion.div
                    className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg"
                    whileHover={{ x: 4 }}
                  >
                    <span className="font-medium text-sm">{item.label}</span>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>
      </div>

      {/* Bottom section - Cartera */}
      <SubZoomContainer delay={1.0} direction="bottom" className="mt-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20">
          <h3 className="font-bold text-lg mb-4 text-center">Control de Cartera</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: AlertCircle, label: "Avisos de Mora", color: "text-red-500" },
              { icon: BarChart3, label: "Cartera Vencida", color: "text-amber-500" },
              { icon: FileCheck, label: "Estados de Cuenta", color: "text-blue-500" },
              { icon: CreditCard, label: "Cierre Diario", color: "text-emerald-500" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="p-4 bg-card rounded-xl text-center shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </SubZoomContainer>
    </div>
  );
};
