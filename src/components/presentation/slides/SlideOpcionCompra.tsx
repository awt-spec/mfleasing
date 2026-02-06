import { motion } from "framer-motion";
import { ShoppingCart, Car, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideOpcionCompra = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Opción de Compra
        </h2>
        <p className="text-xl text-primary font-semibold">
          Arrendamiento Financiero
        </p>
      </SubZoomContainer>

      {/* Main process */}
      <SubZoomContainer delay={0.3} direction="zoom">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-card to-primary/5 border border-primary/20 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: ShoppingCart, title: "Configurar Producto", desc: "Arrendamiento financiero", step: 1 },
              { icon: Car, title: "Identificar Activos", desc: "Opciones de compra activas", step: 2 },
              { icon: Send, title: "Ejecutar Opción", desc: "Pago total obligaciones", step: 3 },
              { icon: CheckCircle2, title: "Transferencia", desc: "Finalización contrato", step: 4 },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.15 }}
              >
                <motion.div
                  className="p-6 rounded-2xl bg-card border border-border shadow-md text-center h-full"
                  whileHover={{ y: -4, borderColor: "hsl(358, 78%, 45%)" }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.15, type: "spring" }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <span className="text-xs text-primary font-bold">Paso {item.step}</span>
                  <h4 className="font-bold mt-2">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </motion.div>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-5 text-muted-foreground w-4 h-4" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </SubZoomContainer>

      {/* Transfer flow */}
      <SubZoomContainer delay={1.2} direction="bottom" className="mt-8">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-lg">
          <h3 className="font-bold text-lg mb-6 text-center">Flujo de Transferencia Vehicular</h3>
          <StaggerContainer className="flex flex-wrap justify-center gap-4" staggerDelay={0.1} initialDelay={1.3}>
            {[
              "Enviado a notaría",
              "Transferencia en proceso",
              "Finalización de transferencia",
            ].map((item, index) => (
              <StaggerItem key={item}>
                <motion.div
                  className={`px-5 py-3 rounded-xl border-2 ${
                    index === 2 
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-700" 
                      : "bg-muted/50 border-border"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <motion.p
            className="text-center text-sm text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            El flujo mantiene bitácoras de control y seguimiento hasta recibir instrucción de transferencia finalizada.
          </motion.p>
        </div>
      </SubZoomContainer>
    </div>
  );
};
