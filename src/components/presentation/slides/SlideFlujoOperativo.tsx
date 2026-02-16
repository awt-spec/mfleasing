import { motion } from "framer-motion";
import { Building, User, Truck, ArrowDown, ArrowRight, ArrowLeft } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideFlujoOperativo = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
          Flujo Operativo
        </h2>
        <p className="text-base text-primary font-semibold">
          Proceso de Arrendamiento Financiero
        </p>
      </SubZoomContainer>

      <SubZoomContainer delay={0.3} direction="zoom">
        <div className="bg-card/40 border border-border rounded-2xl p-6 md:p-8">
          {/* Top: Title bar */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-xs md:text-sm font-bold text-foreground/70 tracking-wide uppercase">
              Persona autorizada a efectuar operaciones o leasing financiero
            </span>
          </motion.div>

          {/* Banco at top center */}
          <StaggerContainer className="flex justify-center mb-2" staggerDelay={0.1} initialDelay={0.5}>
            <StaggerItem>
              <ActorBox
                icon={Building}
                title="Banco o Empresa de Leasing"
                color="bg-primary/10 border-primary/30"
                iconColor="text-primary"
              />
            </StaggerItem>
          </StaggerContainer>

          {/* Arrows down from Banco to both sides */}
          <motion.div
            className="flex justify-between items-start px-8 md:px-16 my-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {/* Left arrow: Banco → Proveedor */}
            <div className="flex flex-col items-center">
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium mt-0.5 text-center leading-tight">
                Paga precio<br />de bien
              </span>
              <ArrowDown className="w-4 h-4 text-muted-foreground mt-0.5" />
            </div>

            {/* Right arrow: Entidad → Banco (upward, red) */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-0.5 h-4 bg-primary"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.9 }}
                />
                <span className="text-[10px] text-primary font-semibold my-0.5 text-center leading-tight">
                  Contrato de<br />leasing financiero
                </span>
                <motion.div
                  className="w-0.5 h-4 bg-primary"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.0 }}
                />
              </div>
            </div>

            {/* Middle: Renta payment */}
            <div className="flex flex-col items-center">
              <ArrowDown className="w-4 h-4 text-muted-foreground rotate-180" />
              <span className="text-[10px] text-muted-foreground font-medium mt-0.5 text-center leading-tight">
                Paga la renta<br />(servicio de deuda)
              </span>
              <ArrowDown className="w-4 h-4 text-muted-foreground rotate-180 mt-0.5" />
            </div>
          </motion.div>

          {/* Proveedor and Entidad side by side */}
          <StaggerContainer className="flex justify-between items-start px-4 md:px-8 mt-2" staggerDelay={0.15} initialDelay={0.9}>
            <StaggerItem>
              <ActorBox
                icon={Truck}
                title="Proveedor"
                subtitle="Provee o construye el bien"
                color="bg-amber-500/10 border-amber-500/30"
                iconColor="text-amber-600"
              />
            </StaggerItem>

            {/* Center: horizontal arrows between Proveedor & Entidad */}
            <StaggerItem className="flex flex-col items-center justify-center gap-3 pt-4 flex-1 px-2">
              <motion.div
                className="flex items-center gap-1 w-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <ArrowLeft className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="h-0.5 flex-1 bg-primary" />
                <span className="text-[10px] text-primary font-semibold whitespace-nowrap px-1">Identifica el bien</span>
                <div className="h-0.5 flex-1 bg-primary" />
              </motion.div>

              <motion.div
                className="flex items-center gap-1 w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="h-px flex-1 bg-muted-foreground/40 border-dashed border-t" />
                <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap px-1">Entrega el bien</span>
                <div className="h-px flex-1 bg-muted-foreground/40 border-dashed border-t" />
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <ActorBox
                icon={User}
                title="Entidad Pública"
                subtitle="Requiere bienes productivos"
                color="bg-blue-500/10 border-blue-500/30"
                iconColor="text-blue-600"
              />
            </StaggerItem>
          </StaggerContainer>

          {/* Legend */}
          <motion.div
            className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 bg-primary rounded" />
              <span className="text-[10px] text-muted-foreground">Flujo contractual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 bg-muted-foreground/40 border-dashed border-t" />
              <span className="text-[10px] text-muted-foreground">Flujo operativo</span>
            </div>
          </motion.div>
        </div>
      </SubZoomContainer>
    </div>
  );
};

const ActorBox = ({
  icon: Icon,
  title,
  subtitle,
  color,
  iconColor,
}: {
  icon: typeof Building;
  title: string;
  subtitle?: string;
  color: string;
  iconColor: string;
}) => (
  <motion.div
    className={`px-5 py-4 rounded-xl border ${color} text-center min-w-[140px] shadow-sm`}
    whileHover={{ scale: 1.03, y: -2 }}
  >
    <Icon className={`w-7 h-7 ${iconColor} mx-auto mb-1.5`} />
    <span className="text-xs md:text-sm font-bold text-foreground block">{title}</span>
    {subtitle && (
      <span className="text-[10px] text-muted-foreground block mt-0.5">{subtitle}</span>
    )}
  </motion.div>
);
