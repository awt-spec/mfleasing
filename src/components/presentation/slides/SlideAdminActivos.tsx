import { motion } from "framer-motion";
import { Package, Car, FileText, DollarSign, RefreshCw, ClipboardList } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideAdminActivos = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Administración de Activos
        </h2>
        <p className="text-xl text-primary font-semibold">
          Inventario y Contratos
        </p>
      </SubZoomContainer>

      {/* Central diagram */}
      <SubZoomContainer delay={0.3} direction="zoom">
        <div className="relative h-80 flex items-center justify-center">
          {/* Surrounding elements - positioned first so hub is on top */}
          {[
            { icon: Car, label: "Activos", angle: 0, color: "text-blue-500", bg: "bg-blue-500/10" },
            { icon: FileText, label: "Contratos", angle: 72, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { icon: DollarSign, label: "Pagos", angle: 144, color: "text-amber-500", bg: "bg-amber-500/10" },
            { icon: RefreshCw, label: "Reestructura", angle: 216, color: "text-purple-500", bg: "bg-purple-500/10" },
            { icon: ClipboardList, label: "Reportes", angle: 288, color: "text-sky-500", bg: "bg-sky-500/10" },
          ].map((item, index) => {
            const radius = 130;
            const angleRad = (item.angle - 90) * (Math.PI / 180);
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            return (
              <motion.div
                key={item.label}
                className={`absolute w-20 h-20 rounded-xl ${item.bg} border border-border flex flex-col items-center justify-center shadow-md`}
                style={{ 
                  left: `calc(50% + ${x}px - 40px)`,
                  top: `calc(50% + ${y}px - 40px)`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-[10px] font-medium mt-1">{item.label}</span>
              </motion.div>
            );
          })}

          {/* Center hub */}
          <motion.div
            className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className="text-center">
              <Package className="w-10 h-10 text-primary mx-auto" />
              <span className="text-xs font-bold mt-1 block">Inventario</span>
            </div>
          </motion.div>
        </div>
      </SubZoomContainer>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
        <SubZoomContainer delay={1.2} direction="left">
          <div className="p-5 rounded-xl bg-card border border-border shadow-md">
            <h4 className="font-bold mb-4 text-lg">Inventario de Activos</h4>
            <StaggerContainer className="grid grid-cols-2 gap-2" staggerDelay={0.08} initialDelay={1.3}>
              {["Tipo de activo", "Características", "Marca", "Placa", "Color", "Factura"].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="p-2 bg-muted/50 rounded-lg text-xs font-medium text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </SubZoomContainer>

        <SubZoomContainer delay={1.4} direction="right">
          <div className="p-5 rounded-xl bg-card border border-border shadow-md">
            <h4 className="font-bold mb-4 text-lg">Gestión Financiera</h4>
            <StaggerContainer className="grid grid-cols-2 gap-2" staggerDelay={0.08} initialDelay={1.5}>
              {["Plazos", "Montos", "Fechas", "Garantías", "Adeudos", "Cuotas"].map((item) => (
                <StaggerItem key={item}>
                  <motion.div
                    className="p-2 bg-primary/10 rounded-lg text-xs font-medium text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
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
