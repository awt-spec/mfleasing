import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, FileText, ClipboardList, BarChart3, CheckCircle, FileCheck, Handshake, TrendingUp, UserCheck, Briefcase, Target, Phone, MessageSquare, Calendar, DollarSign, Receipt, Shield, Pencil, Workflow, MousePointerClick, ArrowDown, ArrowRight, Settings2, Calculator, Percent, Clock } from "lucide-react";
import { CategoryCard } from "../CategoryCard";
import { SubzoomHeader } from "../SubzoomHeader";
import { CategoryLegend } from "../CategoryLegend";
import { FlowNode } from "../FlowNode";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

const processes = [
  {
    id: "originacion",
    icon: Users,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "Originación",
    description: "Workflow No-Code 100% personalizable",
    buttonColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    itemCount: 6,
    tag: "No-Code",
    tags: [
      { icon: Workflow, label: "Workflow" },
      { icon: Pencil, label: "Editable" },
      { icon: MousePointerClick, label: "Drag & Drop" },
      { icon: Settings2, label: "Configurable" },
    ],
  },
  {
    id: "cotizacion",
    icon: Receipt,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    title: "Cotización",
    description: "Generación de propuestas comerciales",
    buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    itemCount: 5,
    tag: "Diagrama experto",
    tags: [
      { icon: DollarSign, label: "Precio" },
      { icon: Calendar, label: "Plazos" },
      { icon: FileText, label: "Condiciones" },
      { icon: CheckCircle, label: "Aprobación" },
    ],
  },
  {
    id: "formalizacion",
    icon: Handshake,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Formalización",
    description: "Cierre y firma de contratos",
    buttonColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    itemCount: 4,
    tag: "Diagrama de flujo",
    tags: [
      { icon: FileCheck, label: "Contrato" },
      { icon: Shield, label: "Garantías" },
      { icon: Briefcase, label: "Activos" },
      { icon: TrendingUp, label: "Activación" },
    ],
  },
];

const legendItems = [
  { color: "bg-amber-500", label: "Originación" },
  { color: "bg-blue-500", label: "Cotización" },
  { color: "bg-emerald-500", label: "Formalización" },
];

// Originación: No-code workflow builder visual
const OriginacionView = () => (
  <motion.div
    className="p-6 rounded-3xl bg-card border border-border shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    {/* No-code badge */}
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <Workflow className="w-5 h-5 text-amber-500" />
        <span className="text-sm font-bold text-foreground">Workflow Builder</span>
      </div>
      <motion.span
        className="px-3 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] font-bold rounded-full"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        NO-CODE
      </motion.span>
    </div>

    {/* Visual workflow canvas */}
    <div className="bg-muted/30 rounded-xl border-2 border-dashed border-border p-4 relative">
      {/* Toolbar mock */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
        <div className="flex gap-1.5">
          {["bg-red-400", "bg-amber-400", "bg-emerald-400"].map(c => (
            <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground ml-2">Arrastra y suelta los pasos del proceso</span>
        <div className="ml-auto flex gap-1">
          <Pencil className="w-3 h-3 text-muted-foreground" />
          <MousePointerClick className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>

      {/* Workflow nodes */}
      <StaggerContainer className="flex flex-col items-center gap-1" staggerDelay={0.12} initialDelay={0.4}>
        {[
          { icon: UserCheck, label: "Contacto del prospecto", editable: true },
          { icon: Search, label: "Identificación de necesidad", editable: true },
          { icon: FileText, label: "Documentación del cliente", editable: true },
          { icon: ClipboardList, label: "Recuperación SLA", editable: false },
        ].map((step, i) => (
          <StaggerItem key={step.label} className="w-full flex flex-col items-center">
            <motion.div
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-card border border-border shadow-sm w-full max-w-xs group cursor-grab active:cursor-grabbing relative"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >
              {/* Drag handle */}
              <div className="flex flex-col gap-0.5 opacity-30 group-hover:opacity-60">
                <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-foreground" /><div className="w-1 h-1 rounded-full bg-foreground" /></div>
                <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-foreground" /><div className="w-1 h-1 rounded-full bg-foreground" /></div>
                <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-foreground" /><div className="w-1 h-1 rounded-full bg-foreground" /></div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <step.icon className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-xs font-semibold text-foreground flex-1">{step.label}</span>
              {step.editable && (
                <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.div>
            {i < 3 && (
              <motion.div
                className="my-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <ArrowDown className="w-3 h-3 text-muted-foreground" />
              </motion.div>
            )}
          </StaggerItem>
        ))}

        {/* Branch */}
        <StaggerItem className="w-full flex flex-col items-center">
          <div className="flex items-center gap-4 mt-1">
            <motion.div
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border shadow-sm cursor-grab"
              whileHover={{ scale: 1.03 }}
            >
              <FileCheck className="w-4 h-4 text-amber-600" />
              <span className="text-[10px] font-semibold">Datos de buró</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border shadow-sm cursor-grab"
              whileHover={{ scale: 1.03 }}
            >
              <BarChart3 className="w-4 h-4 text-amber-600" />
              <span className="text-[10px] font-semibold">Evaluación</span>
            </motion.div>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* "Add step" button */}
      <motion.div
        className="flex justify-center mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="px-3 py-1.5 rounded-lg border-2 border-dashed border-primary/30 text-primary text-[10px] font-semibold flex items-center gap-1 cursor-pointer hover:bg-primary/5 transition-colors">
          + Agregar paso
        </div>
      </motion.div>
    </div>

    <motion.p
      className="text-[10px] text-center text-muted-foreground mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ delay: 1.3 }}
    >
      Personaliza cada paso del workflow sin necesidad de código
    </motion.p>
  </motion.div>
);

// Cotización: Expert diagram view
const CotizacionView = () => (
  <motion.div
    className="p-6 rounded-3xl bg-card border border-border shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div className="flex items-center gap-2 mb-5">
      <Calculator className="w-5 h-5 text-blue-500" />
      <span className="text-sm font-bold text-foreground">Motor de Cotización</span>
    </div>

    {/* Expert diagram: horizontal flow with detail cards */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      {[
        { icon: Target, label: "Condiciones", items: ["Tipo de activo", "Moneda", "Plazo"], color: "border-blue-400", iconColor: "text-blue-500", bg: "bg-blue-500/5" },
        { icon: Calculator, label: "Cálculo de Rentas", items: ["Tasa", "Residual", "Comisiones"], color: "border-blue-500", iconColor: "text-blue-600", bg: "bg-blue-500/10" },
        { icon: Percent, label: "Análisis Financiero", items: ["TIR", "VPN", "Spread"], color: "border-indigo-400", iconColor: "text-indigo-500", bg: "bg-indigo-500/5" },
        { icon: FileText, label: "Propuesta", items: ["PDF", "Tabla amort.", "Comparativa"], color: "border-purple-400", iconColor: "text-purple-500", bg: "bg-purple-500/5" },
        { icon: CheckCircle, label: "Aprobación", items: ["Cliente", "Comité", "Firma"], color: "border-emerald-400", iconColor: "text-emerald-500", bg: "bg-emerald-500/5" },
      ].map((step, i) => (
        <motion.div
          key={step.label}
          className={`relative p-3 rounded-xl ${step.bg} border-l-4 ${step.color}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.12 }}
          whileHover={{ y: -3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <step.icon className={`w-5 h-5 ${step.iconColor}`} />
            <span className="text-xs font-bold text-foreground">{step.label}</span>
          </div>
          <ul className="space-y-1">
            {step.items.map(item => (
              <li key={item} className="text-[10px] text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                {item}
              </li>
            ))}
          </ul>
          {/* Step number */}
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
            {i + 1}
          </div>
        </motion.div>
      ))}
    </div>

    {/* Connecting arrows (visual only) */}
    <motion.div
      className="flex items-center justify-center gap-1 mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ delay: 1.0 }}
    >
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex items-center">
          <div className="w-12 h-px bg-blue-400/40" />
          <ArrowRight className="w-3 h-3 text-blue-400/40" />
        </div>
      ))}
    </motion.div>

    <motion.div
      className="flex items-center justify-center gap-2 mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
    >
      <Clock className="w-3 h-3 text-muted-foreground" />
      <span className="text-[10px] text-muted-foreground">Generación automática de tabla de amortización con múltiples escenarios</span>
    </motion.div>
  </motion.div>
);

// Formalización: standard flow
const FormalizacionView = () => (
  <motion.div
    className="p-8 rounded-3xl bg-card border border-border shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div className="flex flex-col items-center">
      {[
        { icon: FileCheck, title: "Generación de contrato", variant: "primary" as const },
        { icon: Shield, title: "Registro de garantías", variant: "secondary" as const },
        { icon: Briefcase, title: "Alta de activos", variant: "secondary" as const },
        { icon: TrendingUp, title: "Activación de operación", variant: "accent" as const },
      ].map((step, index, arr) => (
        <FlowNode
          key={step.title}
          icon={step.icon}
          title={step.title}
          variant={step.variant}
          delay={0.3 + index * 0.15}
          showArrow={index < arr.length - 1}
        />
      ))}
    </div>
  </motion.div>
);

export const SlideProcesosFlow = () => {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const activeProcess = processes.find(p => p.id === selectedProcess);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedProcess ? (
          <motion.div
            key="processes"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <TrendingUp className="w-10 h-10 text-primary" />
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Macro Procesos
                </h2>
              </div>
              <p className="text-lg text-muted-foreground">
                Selecciona un proceso para ver su diagrama
              </p>
            </SubZoomContainer>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {processes.map((process, index) => (
                <CategoryCard
                  key={process.id}
                  {...process}
                  delay={0.2 + index * 0.15}
                  onClick={() => setSelectedProcess(process.id)}
                />
              ))}
            </div>

            <CategoryLegend items={legendItems} />
          </motion.div>
        ) : (
          <motion.div
            key="flow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {activeProcess && (
              <>
                <SubzoomHeader
                  icon={activeProcess.icon}
                  iconBg={activeProcess.iconBg}
                  iconColor={activeProcess.iconColor}
                  title={activeProcess.title}
                  description={activeProcess.description}
                  tag={activeProcess.tag}
                  onBack={() => setSelectedProcess(null)}
                />

                {selectedProcess === "originacion" && <OriginacionView />}
                {selectedProcess === "cotizacion" && <CotizacionView />}
                {selectedProcess === "formalizacion" && <FormalizacionView />}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
