import { motion } from "framer-motion";
import { FileBarChart, Database, FileText, PieChart, Users, Building, Landmark, ShieldCheck } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideReportes = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Reportes Regulatorios
        </h2>
        <p className="text-xl text-primary font-semibold">
          Bitácora, Consultas y Reportes
        </p>
      </SubZoomContainer>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SubZoomContainer delay={0.3} direction="left">
          <motion.div
            className="p-6 rounded-2xl bg-card border border-border shadow-lg h-full"
            whileHover={{ y: -4 }}
          >
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
              <FileBarChart className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Reportes</h3>
            <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={0.5}>
              {["Regulatorios", "Arrendamientos", "Préstamos", "Clientes"].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm"
                    whileHover={{ x: 4 }}
                  >
                    {item}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>

        <SubZoomContainer delay={0.5} direction="bottom">
          <motion.div
            className="p-6 rounded-2xl bg-card border border-border shadow-lg h-full"
            whileHover={{ y: -4 }}
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
              <Database className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Consultas</h3>
            <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={0.7}>
              {["Transacciones", "Históricos", "Operaciones", "Estados financieros"].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-sm"
                    whileHover={{ x: 4 }}
                  >
                    {item}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>

        <SubZoomContainer delay={0.7} direction="right">
          <motion.div
            className="p-6 rounded-2xl bg-card border border-border shadow-lg h-full"
            whileHover={{ y: -4 }}
          >
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Bitácora</h3>
            <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={0.9}>
              {["Consultas", "Reportes", "Transacciones", "Históricos"].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-sm"
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

      {/* SOFOM & SOFIPO Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SubZoomContainer delay={0.9} direction="left">
          <motion.div
            className="p-6 rounded-2xl bg-card border border-border shadow-lg h-full"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Landmark className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Reportes SOFOM</h3>
                <p className="text-xs text-muted-foreground">Sociedad Financiera de Objeto Múltiple</p>
              </div>
            </div>
            <StaggerContainer className="space-y-2" staggerDelay={0.08} initialDelay={1.0}>
              {[
                "R01 – Catálogo mínimo",
                "R04 – Cartera de crédito",
                "R08 – Captación",
                "R12 – Operaciones de crédito (SIC)",
                "R13 – Riesgo de mercado",
                "R14 – Riesgo de liquidez",
                "Reporte CNBV Regulatorio",
                "PLD / Prevención de lavado",
              ].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-xs font-medium"
                    whileHover={{ x: 4 }}
                  >
                    {item}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </SubZoomContainer>

        <SubZoomContainer delay={1.0} direction="right">
          <motion.div
            className="p-6 rounded-2xl bg-card border border-border shadow-lg h-full"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Reportes SOFIPO</h3>
                <p className="text-xs text-muted-foreground">Sociedad Financiera Popular</p>
              </div>
            </div>
            <StaggerContainer className="space-y-2" staggerDelay={0.08} initialDelay={1.1}>
              {[
                "R01 – Catálogo mínimo",
                "R04 – Cartera de crédito",
                "R08 – Captación / Ahorro",
                "A-0411 – Calificación de cartera",
                "Reporte de operaciones (CONDUSEF)",
                "Reporte CNBV Regulatorio",
                "PLD / Prevención de lavado",
                "Estados financieros dictaminados",
              ].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="p-2 bg-teal-50 dark:bg-teal-950/30 rounded-lg text-xs font-medium"
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

      {/* Bottom section */}
      <SubZoomContainer delay={1.3} direction="zoom">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 border border-border">
          <h3 className="font-bold text-lg mb-4 text-center">Información de Origen</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: PieChart, label: "Sistema Origen" },
              { icon: Users, label: "Clientes" },
              { icon: Building, label: "Operaciones" },
              { icon: FileBarChart, label: "Crediticio" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="p-4 bg-card rounded-xl text-center shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </SubZoomContainer>
    </div>
  );
};
