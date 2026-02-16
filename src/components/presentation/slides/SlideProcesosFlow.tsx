import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, FileText, ClipboardList, BarChart3, CheckCircle, FileCheck, TrendingUp, UserCheck, Target, DollarSign, Receipt, Shield, Pencil, Workflow, MousePointerClick, ArrowDown, Settings2, Calculator, Plus, Layers, Table, FolderOpen, CreditCard, User, Calendar, Banknote, Clock, CircleDot, ArrowRight, SlidersHorizontal } from "lucide-react";
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
    description: "Flujo ajustable por reglas de negocio",
    buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    itemCount: 5,
    tag: "Configurable",
    tags: [
      { icon: DollarSign, label: "Precio" },
      { icon: Calendar, label: "Plazos" },
      { icon: SlidersHorizontal, label: "Reglas" },
      { icon: CheckCircle, label: "Aprobación" },
    ],
  },
  {
    id: "lineas",
    icon: CreditCard,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Líneas de Crédito",
    description: "Configuración y gestión de líneas",
    buttonColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    itemCount: 8,
    tag: "Flujo",
    tags: [
      { icon: User, label: "Persona" },
      { icon: Banknote, label: "Monto" },
      { icon: Calendar, label: "Fechas" },
      { icon: CircleDot, label: "Estado" },
    ],
  },
];

const legendItems = [
  { color: "bg-amber-500", label: "Originación" },
  { color: "bg-blue-500", label: "Cotización" },
  { color: "bg-emerald-500", label: "Líneas de Crédito" },
];

// ---- ORIGINACIÓN: Collections table + adaptable section ----
const OriginacionView = () => (
  <motion.div
    className="space-y-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    {/* Workflow nodes */}
    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Workflow className="w-5 h-5 text-amber-500" />
        <span className="text-sm font-bold text-foreground">Flujo de Originación</span>
        <motion.span
          className="ml-auto px-2.5 py-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] font-bold rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          NO-CODE
        </motion.span>
      </div>

      <StaggerContainer className="flex flex-col items-center gap-1" staggerDelay={0.1} initialDelay={0.3}>
        {[
          { icon: UserCheck, label: "Contacto del prospecto" },
          { icon: Search, label: "Identificación de necesidad" },
          { icon: FileText, label: "Documentación del cliente" },
        ].map((step, i) => (
          <StaggerItem key={step.label} className="w-full flex flex-col items-center">
            <motion.div
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-muted/50 border border-border w-full max-w-sm group cursor-grab"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col gap-0.5 opacity-30 group-hover:opacity-60">
                <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-foreground" /><div className="w-1 h-1 rounded-full bg-foreground" /></div>
                <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-foreground" /><div className="w-1 h-1 rounded-full bg-foreground" /></div>
              </div>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <step.icon className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <span className="text-xs font-semibold text-foreground">{step.label}</span>
              <Pencil className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            {i < 2 && <ArrowDown className="w-3 h-3 text-muted-foreground my-0.5 opacity-40" />}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>

    {/* Collections table */}
    <SubZoomContainer delay={0.7} direction="bottom">
      <div className="p-5 rounded-2xl bg-card border-2 border-dashed border-border">
        <div className="flex items-center gap-2 mb-3">
          <Table className="w-4 h-4 text-foreground" />
          <span className="text-sm font-bold text-foreground">Tabla de Colecciones</span>
          <div className="ml-auto flex gap-1.5">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center"><Plus className="w-3 h-3 text-emerald-500" /></div>
            <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center"><Pencil className="w-3 h-3 text-blue-500" /></div>
            <div className="w-6 h-6 rounded-md bg-red-500/10 flex items-center justify-center"><ClipboardList className="w-3 h-3 text-red-500" /></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Colección", icon: SlidersHorizontal },
            { label: "Cantidad", icon: SlidersHorizontal },
            { label: "Descripción", icon: SlidersHorizontal },
            { label: "Documentación", icon: FolderOpen },
          ].map(field => (
            <div key={field.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/50">
              <span className="text-xs font-medium text-foreground">{field.label}</span>
              <field.icon className="w-3 h-3 text-muted-foreground ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </SubZoomContainer>

    {/* Adaptable section */}
    <SubZoomContainer delay={0.9} direction="bottom">
      <div className="p-5 rounded-2xl bg-violet-500/5 border border-violet-300/30">
        <div className="flex items-center gap-2 mb-3">
          <Settings2 className="w-4 h-4 text-violet-500" />
          <span className="text-sm font-bold text-foreground">Adaptable a cada Cliente</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Plus, label: "Agregar", desc: "Nuevos campos y colecciones", color: "text-emerald-500" },
            { icon: Pencil, label: "Editar", desc: "Configurar flujos y reglas", color: "text-blue-500" },
            { icon: Layers, label: "Organizar", desc: "Estados y transiciones", color: "text-amber-500" },
          ].map(item => (
            <motion.div
              key={item.label}
              className="p-3 rounded-xl bg-card border border-border text-center"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-1`} />
              <span className="text-xs font-bold text-foreground block">{item.label}</span>
              <span className="text-[10px] text-muted-foreground">{item.desc}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-3 px-4 py-2 rounded-lg bg-violet-500/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-violet-600 text-xs font-bold">Sin código</span>
          <span className="text-xs text-muted-foreground"> — Diseña el workflow perfecto para tu operación</span>
        </motion.div>
      </div>
    </SubZoomContainer>
  </motion.div>
);

// ---- COTIZACIÓN: Flow with adjustable rules ----
const CotizacionView = () => (
  <motion.div
    className="p-6 rounded-3xl bg-card border border-border shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div className="flex flex-col items-center">
      {[
        { icon: Target, title: "Definir condiciones", variant: "primary" as const, rules: ["Tipo de activo", "Moneda", "Plazo"] },
        { icon: Calculator, title: "Calcular rentas", variant: "primary" as const, rules: ["Tasa", "Valor residual", "Comisiones"] },
        { icon: BarChart3, title: "Análisis financiero", variant: "secondary" as const, rules: ["TIR", "VPN", "Spread"] },
        { icon: FileText, title: "Generar propuesta", variant: "accent" as const, rules: [] },
        { icon: CheckCircle, title: "Aprobación del cliente", variant: "muted" as const, rules: [] },
      ].map((step, i, arr) => (
        <div key={step.title} className="flex flex-col items-center w-full">
          <div className="flex items-center gap-4 w-full max-w-lg">
            {/* Flow node */}
            <div className="flex-1">
              <FlowNode
                icon={step.icon}
                title={step.title}
                variant={step.variant}
                delay={0.3 + i * 0.12}
                showArrow={false}
              />
            </div>
            {/* Adjustable rules badge */}
            {step.rules.length > 0 && (
              <motion.div
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/5 border border-blue-300/30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
              >
                <SlidersHorizontal className="w-3 h-3 text-blue-500 flex-shrink-0" />
                <div className="flex flex-col">
                  {step.rules.map(r => (
                    <span key={r} className="text-[10px] text-muted-foreground leading-tight">{r}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          {i < arr.length - 1 && (
            <motion.div
              className="my-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          )}
        </div>
      ))}
    </div>

    <motion.div
      className="flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-lg bg-muted/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <SlidersHorizontal className="w-3 h-3 text-primary" />
      <span className="text-[10px] text-muted-foreground">Todos los parámetros son <span className="text-primary font-semibold">ajustables según las reglas de negocio</span> configuradas</span>
    </motion.div>
  </motion.div>
);

// ---- LÍNEAS DE CRÉDITO: Vertical branching flow ----
const LineasCreditoView = () => {
  const steps = [
    { label: "Configuración", icon: Settings2, isHeader: true },
    { label: "Persona física o jurídica", icon: User },
    { label: "Monto autorizado / disponible", icon: Banknote },
    { label: "Periodicidad de pago", icon: Clock },
  ];

  const branches = [
    { label: "Moneda", icon: DollarSign, side: "left" as const },
    { label: "Fecha de apertura", icon: Calendar, side: "right" as const },
  ];

  const bottomSteps = [
    { label: "Fecha de vencimiento", icon: Calendar, side: "left" as const },
    { label: "Estado", icon: CircleDot, side: "right" as const },
  ];

  return (
    <motion.div
      className="p-6 rounded-3xl bg-card border border-border shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header badge */}
      <motion.div
        className="flex justify-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Líneas de Crédito
        </div>
      </motion.div>

      <div className="flex flex-col items-center">
        {/* Linear steps */}
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center">
            <motion.div
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border shadow-sm ${
                step.isHeader ? "bg-muted border-border" : "bg-card border-border"
              }`}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              whileHover={{ scale: 1.03 }}
            >
              <step.icon className={`w-4 h-4 ${step.isHeader ? "text-foreground" : "text-emerald-500"}`} />
              <span className="text-xs font-semibold text-foreground">{step.label}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5 + i * 0.12 }}
            >
              <ArrowDown className="w-3 h-3 text-muted-foreground my-1" />
            </motion.div>
          </div>
        ))}

        {/* Branch: Moneda ← → Fecha de apertura */}
        <motion.div
          className="flex items-start gap-6 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {branches.map((b, i) => (
            <motion.div
              key={b.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: b.side === "left" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.1 }}
            >
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border shadow-sm">
                <b.icon className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold text-foreground">{b.label}</span>
              </div>
              <ArrowDown className="w-3 h-3 text-muted-foreground my-1 opacity-40" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom branch: Fecha vencimiento ← → Estado */}
        <motion.div
          className="flex items-start gap-6 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {bottomSteps.map((b, i) => (
            <motion.div
              key={b.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: b.side === "left" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + i * 0.1 }}
            >
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border shadow-sm">
                <b.icon className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold text-foreground">{b.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

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
                  Procesos Comerciales
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
                {selectedProcess === "lineas" && <LineasCreditoView />}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
