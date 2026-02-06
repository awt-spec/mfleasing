import { motion } from "framer-motion";
import { Calendar, Percent, DollarSign, FileText, Clock, Settings } from "lucide-react";
import { FlowBox } from "../FlowBox";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideReglasNegocio = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Reglas de Negocio
        </h2>
        <p className="text-xl text-primary font-semibold">
          Tipos de Arrendamiento
        </p>
      </SubZoomContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Arrendamiento Puro */}
        <SubZoomContainer delay={0.3} direction="left">
          <motion.div
            className="p-6 rounded-2xl bg-card border-2 border-border shadow-lg"
            whileHover={{ y: -4 }}
          >
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Arrendamiento Puro</h3>
                <p className="text-sm text-muted-foreground">Operativo</p>
              </div>
            </motion.div>

            <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={0.5}>
              <StaggerItem>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  <div>
                    <span className="text-sm font-medium">Calendario Comercial</span>
                    <p className="text-xs text-muted-foreground">Plazo natural</p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div className="flex-1">
                    <span className="text-sm font-medium">Plazos</span>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded">Mínimo</span>
                      <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded">Máximo</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>

        {/* Arrendamiento Financiero */}
        <SubZoomContainer delay={0.5} direction="right">
          <motion.div
            className="p-6 rounded-2xl bg-card border-2 border-primary/30 shadow-lg"
            whileHover={{ y: -4 }}
          >
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Arrendamiento Financiero</h3>
                <p className="text-sm text-muted-foreground">Capital</p>
              </div>
            </motion.div>

            <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={0.7}>
              <StaggerItem>
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                  <Percent className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-sm font-medium">Intereses Naturales</span>
                    <p className="text-xs text-muted-foreground">Financiero</p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <span className="text-sm font-medium">Plazos</span>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs bg-primary/20 px-2 py-0.5 rounded">Mínimo</span>
                      <span className="text-xs bg-primary/20 px-2 py-0.5 rounded">Máximo</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>
      </div>

      {/* Catálogo de cargos */}
      <SubZoomContainer delay={0.9} direction="bottom" className="mt-8">
        <motion.div
          className="p-6 rounded-2xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Catálogo de Cargos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Gastos", "Póliza", "Renta", "Comisiones"].map((item, index) => (
              <motion.div
                key={item}
                className="p-3 bg-card rounded-lg text-center shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SubZoomContainer>
    </div>
  );
};
