import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Car, FileText, DollarSign, RefreshCw, User, Calendar, Shield, Calculator, Banknote, ArrowDown, CreditCard, Palette, Hash, Tag, Receipt, Clock, ArrowLeft } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

const categories = [
  { id: "contratos", label: "Contratos", icon: FileText, color: "bg-primary", textColor: "text-primary-foreground" },
  { id: "inventario", label: "Inventario", icon: Package, color: "bg-primary", textColor: "text-primary-foreground" },
  { id: "reestructura", label: "Reestructura", icon: RefreshCw, color: "bg-primary", textColor: "text-primary-foreground" },
];

// Flow node helper
const FlowItem = ({ label, icon: Icon, delay, indent = 0, highlight = false }: {
  label: string; icon: typeof FileText; delay: number; indent?: number; highlight?: boolean;
}) => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <motion.div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm text-xs font-semibold ${
        highlight ? "bg-muted border-border text-foreground" : "bg-card border-border text-foreground"
      }`}
      style={{ marginLeft: indent * 16 }}
      whileHover={{ scale: 1.03 }}
    >
      <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
      {label}
    </motion.div>
  </motion.div>
);

const FlowArrow = ({ delay }: { delay: number }) => (
  <motion.div
    className="flex justify-center my-0.5"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    transition={{ delay }}
  >
    <ArrowDown className="w-3 h-3 text-muted-foreground" />
  </motion.div>
);

// ---- Contratos column ----
const ContratosFlow = () => {
  const steps = [
    { label: "Cliente", icon: User },
    { label: "Producto financiado", icon: CreditCard },
    { label: "Tipos de moneda", icon: DollarSign },
    { label: "Fecha apertura / vencimiento", icon: Calendar },
    { label: "Garantías", icon: Shield },
    { label: "Cálculo de la cuota", icon: Calculator },
    { label: "Tipos de moneda", icon: DollarSign },
    { label: "Rentas en depósito", icon: Banknote },
    { label: "Documentación", icon: FileText },
  ];
  return (
    <div className="flex flex-col items-center gap-0">
      {steps.map((s, i) => (
        <div key={`${s.label}-${i}`} className="flex flex-col items-center">
          <FlowItem label={s.label} icon={s.icon} delay={0.3 + i * 0.08} indent={i % 2} />
          {i < steps.length - 1 && <FlowArrow delay={0.35 + i * 0.08} />}
        </div>
      ))}
    </div>
  );
};

// ---- Inventario column ----
const InventarioFlow = () => (
  <div className="flex flex-col items-center gap-0">
    <FlowItem label="Inventario de activos" icon={Package} delay={0.3} highlight />
    <FlowArrow delay={0.38} />

    {/* 3-way branch */}
    <motion.div
      className="flex items-start gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45 }}
    >
      {[
        { label: "Tipo de activo", icon: Car },
        { label: "Características", icon: Tag },
        { label: "Financiero", icon: DollarSign },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.08 }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-card border border-border shadow-sm">
            <item.icon className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-semibold text-foreground">{item.label}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>

    <FlowArrow delay={0.7} />

    {/* Sub-branches from Financiero */}
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.75 }}
    >
      <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-card border border-border shadow-sm">
        <Receipt className="w-3 h-3 text-primary" />
        <span className="text-[10px] font-semibold">Pagos programados</span>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-card border border-border shadow-sm">
        <FileText className="w-3 h-3 text-primary" />
        <span className="text-[10px] font-semibold">Factura</span>
      </div>
    </motion.div>

    <FlowArrow delay={0.85} />

    {/* Characteristics detail box */}
    <motion.div
      className="px-4 py-3 rounded-lg bg-muted border border-border"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9 }}
    >
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { label: "Color", icon: Palette },
          { label: "Placa", icon: Hash },
          { label: "Fechas", icon: Calendar },
          { label: "Marca", icon: Tag },
        ].map(d => (
          <div key={d.label} className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground">
            <d.icon className="w-3 h-3 text-muted-foreground" />
            {d.label}
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

// ---- Reestructura column ----
const ReestructuraFlow = () => {
  const topBranch = [
    { label: "Plazos", icon: Clock },
    { label: "Montos", icon: Banknote },
    { label: "Fechas", icon: Calendar },
  ];
  const steps = [
    { label: "Rentas vencidos", icon: Receipt },
    { label: "Cargos a Capitalizar", icon: Calculator },
    { label: "Condonación de Mora", icon: Shield },
    { label: "Monto de la restructura", icon: DollarSign },
    { label: "Cargos", icon: CreditCard },
    { label: "Reversiones de reestructura", icon: RefreshCw },
  ];

  return (
    <div className="flex flex-col items-center gap-0">
      <FlowItem label="Tipos" icon={Tag} delay={0.3} highlight />
      <FlowArrow delay={0.38} />

      {/* 3-way branch */}
      <motion.div
        className="flex items-start gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.42 }}
      >
        {topBranch.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-card border border-border shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.08 }}
          >
            <item.icon className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <FlowArrow delay={0.65} />
      <FlowItem label="Adeudos" icon={Receipt} delay={0.7} highlight />
      <FlowArrow delay={0.75} />

      {steps.map((s, i) => (
        <div key={s.label} className="flex flex-col items-center">
          <FlowItem label={s.label} icon={s.icon} delay={0.8 + i * 0.08} indent={i % 2} />
          {i < steps.length - 1 && <FlowArrow delay={0.85 + i * 0.08} />}
        </div>
      ))}
    </div>
  );
};

export const SlideAdminActivos = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                Administración de Activos
              </h2>
              <p className="text-base text-primary font-semibold">
                Selecciona una categoría para ver el detalle
              </p>
            </SubZoomContainer>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15} initialDelay={0.3}>
              {categories.map((cat) => (
                <StaggerItem key={cat.id}>
                  <motion.button
                    className="w-full p-6 rounded-2xl bg-card border border-border shadow-sm text-center hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(cat.id)}
                  >
                    <div className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center mx-auto mb-3`}>
                      <cat.icon className={`w-7 h-7 ${cat.textColor}`} />
                    </div>
                    <span className="text-lg font-bold text-foreground">{cat.label}</span>
                    <p className="text-xs text-muted-foreground mt-1">Ver diagrama de flujo →</p>
                  </motion.button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back header */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.button
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-semibold"
                onClick={() => setSelected(null)}
                whileHover={{ x: -4 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </motion.button>
              <div className={`px-4 py-2 rounded-lg ${categories.find(c => c.id === selected)?.color} ${categories.find(c => c.id === selected)?.textColor} font-bold text-sm`}>
                {categories.find(c => c.id === selected)?.label}
              </div>
            </motion.div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-lg overflow-auto">
              {selected === "contratos" && <ContratosFlow />}
              {selected === "inventario" && <InventarioFlow />}
              {selected === "reestructura" && <ReestructuraFlow />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
