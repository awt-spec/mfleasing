import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Car, FileText, DollarSign, RefreshCw, User, Calendar, Shield,
  Calculator, Banknote, ArrowDown, CreditCard, Tag, Receipt, Clock,
  ArrowRight, Factory, HardHat, Stethoscope, Server, ShoppingCart,
  Sun, Building, Tractor, Code, Settings2, Landmark, SlidersHorizontal,
  CircleDot, Layers, ClipboardList, Pencil, Plus, ShoppingBag,
  AlertTriangle, FileSignature, CheckCircle, Key, Send, CheckCircle2
} from "lucide-react";
import { SubzoomHeader } from "../SubzoomHeader";
import { CategoryLegend } from "../CategoryLegend";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

// ==================== TOP-LEVEL PROCESSES ====================
const topProcesses = [
  {
    id: "activos",
    icon: Package,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    title: "Activos",
    description: "Contratos, inventario, pagos y más",
    buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    itemCount: 5,
    tag: "Core",
    tags: [
      { icon: FileText, label: "Contratos" },
      { icon: Car, label: "Inventario" },
      { icon: Landmark, label: "Pagos" },
    ],
  },
  {
    id: "cobranza",
    icon: Receipt,
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    title: "Cobranza",
    description: "Workflow No-Code personalizable",
    buttonColor: "bg-gradient-to-r from-red-500 to-red-600",
    itemCount: 7,
    tag: "No-Code",
    tags: [
      { icon: Banknote, label: "Pagos" },
      { icon: Clock, label: "Mora" },
      { icon: Settings2, label: "Reglas" },
    ],
  },
  {
    id: "seguros",
    icon: Shield,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Seguros",
    description: "Gestión de pólizas",
    buttonColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    itemCount: 4,
    tag: "Pólizas",
    tags: [
      { icon: FileText, label: "Factura" },
      { icon: Key, label: "Póliza" },
      { icon: CheckCircle, label: "Cronograma" },
    ],
  },
  {
    id: "compra",
    icon: ShoppingBag,
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    title: "Opción de Compra",
    description: "Arrendamiento financiero",
    buttonColor: "bg-gradient-to-r from-violet-500 to-purple-600",
    itemCount: 4,
    tag: "Flujo",
    tags: [
      { icon: Car, label: "Activo" },
      { icon: Send, label: "Ejecutar" },
      { icon: CheckCircle2, label: "Transferir" },
    ],
  },
  {
    id: "reestructuras",
    icon: RefreshCw,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "Reestructuras",
    description: "Ejecución y renegociación",
    buttonColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    itemCount: 4,
    tag: "Proceso",
    tags: [
      { icon: AlertTriangle, label: "Atrasos" },
      { icon: Calculator, label: "Proyección" },
      { icon: FileSignature, label: "Nueva línea" },
    ],
  },
];

const legendItems = [
  { color: "bg-blue-500", label: "Activos" },
  { color: "bg-red-500", label: "Cobranza" },
  { color: "bg-emerald-500", label: "Seguros" },
  { color: "bg-violet-500", label: "Compra" },
  { color: "bg-amber-500", label: "Reestructuras" },
];

// ==================== ACTIVOS: Sub-navigation ====================
const activosSubProcesses = [
  {
    id: "contratos",
    icon: FileText,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    title: "Contratos",
    description: "Ciclo contractual",
    buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    itemCount: 9,
    tag: "Core",
    tags: [
      { icon: User, label: "Cliente" },
      { icon: CreditCard, label: "Producto" },
      { icon: Calculator, label: "Cuota" },
    ],
  },
  {
    id: "inventario",
    icon: Package,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Inventario",
    description: "Multi-categoría",
    buttonColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    itemCount: 10,
    tag: "Multi-Activo",
    tags: [
      { icon: Car, label: "Vehículos" },
      { icon: Factory, label: "Maquinaria" },
      { icon: Server, label: "TI" },
    ],
  },
  {
    id: "reestructura-config",
    icon: RefreshCw,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "Reestructura",
    description: "Condiciones",
    buttonColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    itemCount: 6,
    tag: "Config",
    tags: [
      { icon: Clock, label: "Plazos" },
      { icon: Banknote, label: "Montos" },
      { icon: Receipt, label: "Adeudos" },
    ],
  },
  {
    id: "pago-proveedores",
    icon: Landmark,
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    title: "Pago Proveedores",
    description: "Desembolsos",
    buttonColor: "bg-gradient-to-r from-violet-500 to-purple-600",
    itemCount: 5,
    tag: "Pagos",
    tags: [
      { icon: DollarSign, label: "Desembolso" },
      { icon: ClipboardList, label: "Conciliación" },
    ],
  },
];

// ==================== CONTRATOS VIEW ====================
const ContratosView = () => {
  const phases = [
    { title: "Apertura", color: "from-blue-500 to-blue-600", items: [
      { icon: User, label: "Cliente / deudor" }, { icon: CreditCard, label: "Producto financiado" }, { icon: DollarSign, label: "Tipos de moneda" },
    ]},
    { title: "Configuración", color: "from-blue-400 to-cyan-500", items: [
      { icon: Calendar, label: "Fecha apertura / vencimiento" }, { icon: Shield, label: "Garantías asociadas" }, { icon: Calculator, label: "Cálculo de la cuota" },
    ]},
    { title: "Financiamiento", color: "from-cyan-500 to-teal-500", items: [
      { icon: Banknote, label: "Rentas en depósito" }, { icon: SlidersHorizontal, label: "Tasas y comisiones" }, { icon: FileText, label: "Documentación legal" },
    ]},
  ];
  return (
    <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      {phases.map((phase, pi) => (
        <div key={phase.title} className="flex flex-col items-center">
          <motion.div className="w-full max-w-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + pi * 0.2 }}>
            <motion.div className={`px-5 py-3 rounded-t-2xl bg-gradient-to-r ${phase.color} text-white font-bold text-sm flex items-center gap-2`} whileHover={{ scale: 1.01 }}>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{pi + 1}</div>
              {phase.title}
            </motion.div>
            <div className="bg-card border border-t-0 border-border rounded-b-2xl p-4 space-y-2">
              {phase.items.map((item, ii) => (
                <motion.div key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/70 transition-colors" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + pi * 0.2 + ii * 0.08 }} whileHover={{ x: 4 }}>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><item.icon className="w-4 h-4 text-blue-500" /></div>
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {pi < phases.length - 1 && <motion.div className="my-2" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.6 + pi * 0.2 }}><ArrowDown className="w-5 h-5 text-muted-foreground" /></motion.div>}
        </div>
      ))}
    </motion.div>
  );
};

// ==================== INVENTARIO VIEW ====================
const assetCategories = [
  { icon: Car, title: "Vehículos", items: ["Autos", "Pickups", "Vans", "Camiones", "Buses", "Motos", "Flotas"], color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Factory, title: "Maquinaria Industrial", items: ["CNC", "Prensas", "Compresores", "Calderas", "Montacargas", "Generadores"], color: "text-orange-500", bg: "bg-orange-500/10" },
  { icon: HardHat, title: "Equipo de Construcción", items: ["Excavadoras", "Retroexcavadoras", "Grúas", "Mezcladoras", "Pavimentación"], color: "text-amber-600", bg: "bg-amber-500/10" },
  { icon: Stethoscope, title: "Equipo Médico", items: ["Rayos X", "Resonancia", "Ultrasonidos", "Odontológicos", "Lab. clínico"], color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Server, title: "Tecnología / TI", items: ["Servidores", "Storage", "Redes", "Laptops corporativas", "IT Leasing"], color: "text-violet-500", bg: "bg-violet-500/10" },
  { icon: ShoppingCart, title: "Equipamiento Comercial", items: ["Refrigeración", "Cocina industrial", "Hornos", "Mobiliario", "POS"], color: "text-pink-500", bg: "bg-pink-500/10" },
  { icon: Sun, title: "Energía y Renovables", items: ["Paneles solares", "Inversores", "Baterías", "Plantas eléctricas"], color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { icon: Building, title: "Inmuebles", items: ["Bodegas", "Edificios", "Locales", "Oficinas", "Naves industriales"], color: "text-slate-500", bg: "bg-slate-500/10" },
  { icon: Tractor, title: "Activos Agrícolas", items: ["Tractores", "Implementos", "Riego", "Ordeño"], color: "text-lime-600", bg: "bg-lime-500/10" },
  { icon: Code, title: "Activos Intangibles", items: ["Software", "Licencias", "Derechos de uso", "Arrendamiento operativo"], color: "text-cyan-500", bg: "bg-cyan-500/10" },
];

const InventarioView = () => (
  <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
    <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3" staggerDelay={0.06} initialDelay={0.3}>
      {assetCategories.map((cat) => (
        <StaggerItem key={cat.title}>
          <motion.div className="p-4 rounded-2xl bg-card border border-border shadow-sm h-full" whileHover={{ y: -4, scale: 1.02 }}>
            <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center mb-3`}><cat.icon className={`w-5 h-5 ${cat.color}`} /></div>
            <h4 className="text-xs font-bold text-foreground mb-2">{cat.title}</h4>
            <div className="space-y-1">
              {cat.items.map(item => (
                <div key={item} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${cat.bg.replace('/10', '/40')}`} />
                  <span className="text-[10px] text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>
    <motion.div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted/50 border border-border" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
      <Layers className="w-4 h-4 text-primary" />
      <span className="text-xs text-muted-foreground"><span className="text-primary font-semibold">Entre otros</span> — El sistema es extensible a cualquier tipo de activo</span>
    </motion.div>
  </motion.div>
);

// ==================== REESTRUCTURA CONFIG VIEW ====================
const ReestructuraConfigView = () => {
  const steps = [
    { icon: Tag, label: "Tipos de reestructura", highlight: true },
    { icon: Clock, label: "Plazos" }, { icon: Banknote, label: "Montos" }, { icon: Calendar, label: "Fechas" },
    { icon: Receipt, label: "Adeudos / Rentas vencidas", highlight: true },
    { icon: Calculator, label: "Cargos a capitalizar" }, { icon: Shield, label: "Condonación de mora" },
    { icon: DollarSign, label: "Monto de la reestructura" }, { icon: CreditCard, label: "Cargos" },
    { icon: RefreshCw, label: "Reversiones de reestructura" },
  ];
  return (
    <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <StaggerContainer className="flex flex-col items-center gap-1" staggerDelay={0.08} initialDelay={0.3}>
        {steps.map((step, i) => (
          <StaggerItem key={step.label} className="flex flex-col items-center">
            <motion.div className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-sm w-full max-w-md ${step.highlight ? "bg-amber-500/10 border-amber-300/50 dark:border-amber-700/50" : "bg-card border-border"}`} whileHover={{ scale: 1.02, x: 4 }}>
              <div className={`w-8 h-8 rounded-lg ${step.highlight ? "bg-amber-500/20" : "bg-muted"} flex items-center justify-center`}><step.icon className={`w-4 h-4 ${step.highlight ? "text-amber-600" : "text-muted-foreground"}`} /></div>
              <span className="text-sm font-semibold text-foreground">{step.label}</span>
            </motion.div>
            {i < steps.length - 1 && <ArrowDown className="w-3 h-3 text-muted-foreground my-0.5 opacity-40" />}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </motion.div>
  );
};

// ==================== PAGO PROVEEDORES VIEW ====================
const PagoProveedoresView = () => {
  const steps = [
    { icon: FileText, label: "Orden de compra / Factura", highlight: true },
    { icon: ClipboardList, label: "Validación documental" }, { icon: Calculator, label: "Cálculo de desembolso" },
    { icon: Calendar, label: "Programación de pago" },
    { icon: DollarSign, label: "Desembolso al proveedor", highlight: true },
    { icon: Receipt, label: "Conciliación bancaria" }, { icon: FileText, label: "Comprobante y registro contable" },
  ];
  return (
    <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <StaggerContainer className="flex flex-col items-center gap-1" staggerDelay={0.08} initialDelay={0.3}>
        {steps.map((step, i) => (
          <StaggerItem key={step.label} className="flex flex-col items-center">
            <motion.div className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-sm w-full max-w-md ${step.highlight ? "bg-violet-500/10 border-violet-300/50 dark:border-violet-700/50" : "bg-card border-border"}`} whileHover={{ scale: 1.02, x: 4 }}>
              <div className={`w-8 h-8 rounded-lg ${step.highlight ? "bg-violet-500/20" : "bg-muted"} flex items-center justify-center`}><step.icon className={`w-4 h-4 ${step.highlight ? "text-violet-600" : "text-muted-foreground"}`} /></div>
              <span className="text-sm font-semibold text-foreground">{step.label}</span>
            </motion.div>
            {i < steps.length - 1 && <ArrowDown className="w-3 h-3 text-muted-foreground my-0.5 opacity-40" />}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </motion.div>
  );
};

// ==================== ACTIVOS VIEW (sub-navigation) ====================
const ActivosView = () => {
  const [subSelected, setSubSelected] = useState<string | null>(null);
  const activeSub = activosSubProcesses.find(p => p.id === subSelected);

  return (
    <AnimatePresence mode="wait">
      {!subSelected ? (
        <motion.div key="activos-overview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.4 }}>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3" staggerDelay={0.1} initialDelay={0.2}>
            {activosSubProcesses.map((process) => (
              <StaggerItem key={process.id}>
                <motion.div className="bg-card rounded-2xl border border-border shadow-md p-4 flex flex-col h-full cursor-pointer" whileHover={{ y: -4, boxShadow: "0 16px 32px -12px rgba(0,0,0,0.15)" }} onClick={() => setSubSelected(process.id)}>
                  <motion.div className={`w-10 h-10 rounded-xl ${process.iconBg} flex items-center justify-center mb-3`} whileHover={{ scale: 1.1 }}>
                    <process.icon className={`w-5 h-5 ${process.iconColor}`} />
                  </motion.div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{process.title}</h3>
                  <p className="text-[10px] text-muted-foreground mb-3">{process.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3 flex-1">
                    {process.tags.map((tag) => (
                      <div key={tag.label} className="flex items-center gap-1 px-2 py-1 bg-muted/60 rounded-md">
                        <tag.icon className="w-3 h-3 text-muted-foreground" /><span className="text-[9px] font-medium text-foreground">{tag.label}</span>
                      </div>
                    ))}
                  </div>
                  <motion.div className={`w-full py-2 px-3 rounded-xl text-white text-xs font-semibold text-center ${process.buttonColor}`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    Ver {process.itemCount} config.
                  </motion.div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      ) : (
        <motion.div key="activos-detail" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }}>
          {activeSub && (
            <>
              <SubzoomHeader icon={activeSub.icon} iconBg={activeSub.iconBg} iconColor={activeSub.iconColor} title={activeSub.title} description={activeSub.description} tag={activeSub.tag} onBack={() => setSubSelected(null)} />
              {subSelected === "contratos" && <ContratosView />}
              {subSelected === "inventario" && <InventarioView />}
              {subSelected === "reestructura-config" && <ReestructuraConfigView />}
              {subSelected === "pago-proveedores" && <PagoProveedoresView />}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==================== COBRANZA VIEW (No-Code) ====================
const CobranzaView = () => {
  const workflowSteps = [
    { icon: Calendar, label: "Generación de cuotas" }, { icon: Banknote, label: "Aplicación de pagos" },
    { icon: Clock, label: "Cálculo de mora e intereses" }, { icon: Settings2, label: "Reglas de cobro configurables" },
    { icon: Receipt, label: "Gestión de cobro (notificaciones)" }, { icon: CircleDot, label: "Estatus de cartera" },
    { icon: FileText, label: "Estados de cuenta" },
  ];
  return (
    <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5 text-red-500" />
          <span className="text-sm font-bold text-foreground">Flujo de Cobranza</span>
          <motion.span className="ml-auto px-2.5 py-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] font-bold rounded-full" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>NO-CODE</motion.span>
        </div>
        <StaggerContainer className="flex flex-col items-center gap-1" staggerDelay={0.08} initialDelay={0.3}>
          {workflowSteps.map((step, i) => (
            <StaggerItem key={step.label} className="w-full flex flex-col items-center">
              <motion.div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-muted/50 border border-border w-full max-w-sm group cursor-grab" whileHover={{ scale: 1.02 }}>
                <div className="flex flex-col gap-0.5 opacity-30 group-hover:opacity-60">
                  <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-foreground" /><div className="w-1 h-1 rounded-full bg-foreground" /></div>
                  <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-foreground" /><div className="w-1 h-1 rounded-full bg-foreground" /></div>
                </div>
                <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center"><step.icon className="w-3.5 h-3.5 text-red-600" /></div>
                <span className="text-xs font-semibold text-foreground">{step.label}</span>
                <Pencil className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              {i < workflowSteps.length - 1 && <ArrowDown className="w-3 h-3 text-muted-foreground my-0.5 opacity-40" />}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
      <SubZoomContainer delay={0.9} direction="bottom">
        <div className="p-5 rounded-2xl bg-red-500/5 border border-red-300/30">
          <div className="flex items-center gap-2 mb-3">
            <Settings2 className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-foreground">100% Personalizable</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Plus, label: "Agregar", desc: "Nuevos pasos y reglas", color: "text-emerald-500" },
              { icon: Pencil, label: "Editar", desc: "Condiciones y plazos", color: "text-blue-500" },
              { icon: Layers, label: "Organizar", desc: "Orden y prioridad", color: "text-amber-500" },
            ].map(item => (
              <motion.div key={item.label} className="p-3 rounded-xl bg-card border border-border text-center" whileHover={{ y: -2, scale: 1.02 }}>
                <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-1`} />
                <span className="text-xs font-bold text-foreground block">{item.label}</span>
                <span className="text-[10px] text-muted-foreground">{item.desc}</span>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-3 px-4 py-2 rounded-lg bg-red-500/10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <span className="text-red-600 text-xs font-bold">Sin código</span>
            <span className="text-xs text-muted-foreground"> — Diseña el workflow de cobranza perfecto para tu operación</span>
          </motion.div>
        </div>
      </SubZoomContainer>
    </motion.div>
  );
};

// ==================== SEGUROS VIEW ====================
const SegurosView = () => (
  <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
    <SubZoomContainer delay={0.3} direction="left">
      <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
        {[
          { icon: FileText, label: "Registrar factura" },
          { icon: Shield, label: "Asociar cargo" },
          { icon: Key, label: "Periodicidad póliza" },
          { icon: CheckCircle, label: "Generar cronograma" },
        ].map((step, index) => (
          <motion.div key={step.label} className="flex items-center gap-3" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + index * 0.15 }}>
            <motion.div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center" whileHover={{ scale: 1.1 }}>
              <step.icon className="w-6 h-6 text-primary" />
            </motion.div>
            <span className="text-sm font-medium max-w-[100px] hidden md:block">{step.label}</span>
            {index < 3 && <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />}
          </motion.div>
        ))}
      </div>
    </SubZoomContainer>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SubZoomContainer delay={0.8} direction="bottom">
        <motion.div className="p-6 rounded-2xl bg-card border border-border shadow-lg" whileHover={{ y: -2 }}>
          <h4 className="font-bold text-lg mb-4 text-primary">¿Cómo cobrar un seguro dentro de las rentas?</h4>
          <p className="text-sm text-muted-foreground mb-4">Podemos asociar un cargo tipo seguro cuando ya está generado el contrato.</p>
          <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={0.9}>
            {["Asociar cargo tipo póliza", "Adjuntar documentos", "Programar periodicidad"].map((item) => (
              <StaggerItem key={item}><motion.div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded-lg" whileHover={{ x: 4 }}><CheckCircle className="w-4 h-4 text-emerald-500" /><span>{item}</span></motion.div></StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      </SubZoomContainer>
      <SubZoomContainer delay={1.0} direction="bottom">
        <motion.div className="p-6 rounded-2xl bg-card border border-border shadow-lg" whileHover={{ y: -2 }}>
          <h4 className="font-bold text-lg mb-4 text-primary">¿Puedo administrar las pólizas de seguro?</h4>
          <p className="text-sm text-muted-foreground mb-4">Se posee un apartado para poder administrar las pólizas asociadas a los bienes.</p>
          <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={1.1}>
            {["# Póliza e inventario", "Tipo de póliza", "Notificaciones de vencimiento", "Reporte de control"].map((item) => (
              <StaggerItem key={item}><motion.div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded-lg" whileHover={{ x: 4 }}><Shield className="w-4 h-4 text-blue-500" /><span>{item}</span></motion.div></StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      </SubZoomContainer>
    </div>
  </motion.div>
);

// ==================== COMPRA VIEW ====================
const CompraView = () => (
  <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
    <SubZoomContainer delay={0.3} direction="zoom">
      <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-card to-primary/5 border border-primary/20 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: ShoppingBag, title: "Configurar Producto", desc: "Arrendamiento financiero", step: 1 },
            { icon: Car, title: "Identificar Activos", desc: "Opciones de compra activas", step: 2 },
            { icon: Send, title: "Ejecutar Opción", desc: "Pago total obligaciones", step: 3 },
            { icon: CheckCircle2, title: "Transferencia", desc: "Finalización contrato", step: 4 },
          ].map((item, index) => (
            <motion.div key={item.title} className="relative" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.15 }}>
              <motion.div className="p-6 rounded-2xl bg-card border border-border shadow-md text-center h-full" whileHover={{ y: -4 }}>
                <motion.div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 + index * 0.15, type: "spring" }}>
                  <item.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <span className="text-xs text-primary font-bold">Paso {item.step}</span>
                <h4 className="font-bold mt-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
              {index < 3 && <ArrowRight className="hidden md:block absolute top-1/2 -right-5 text-muted-foreground w-4 h-4" />}
            </motion.div>
          ))}
        </div>
      </div>
    </SubZoomContainer>
    <SubZoomContainer delay={1.2} direction="bottom">
      <div className="p-6 rounded-2xl bg-card border border-border shadow-lg">
        <h3 className="font-bold text-lg mb-6 text-center">Flujo de Transferencia Vehicular</h3>
        <StaggerContainer className="flex flex-wrap justify-center gap-4" staggerDelay={0.1} initialDelay={1.3}>
          {["Enviado a notaría", "Transferencia en proceso", "Finalización de transferencia"].map((item, index) => (
            <StaggerItem key={item}>
              <motion.div className={`px-5 py-3 rounded-xl border-2 ${index === 2 ? "bg-emerald-500/20 border-emerald-500 text-emerald-700" : "bg-muted/50 border-border"}`} whileHover={{ scale: 1.05 }}>
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <motion.p className="text-center text-sm text-muted-foreground mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
          El flujo mantiene bitácoras de control y seguimiento hasta recibir instrucción de transferencia finalizada.
        </motion.p>
      </div>
    </SubZoomContainer>
  </motion.div>
);

// ==================== REESTRUCTURAS VIEW ====================
const ReestructurasView = () => (
  <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
    <SubZoomContainer delay={0.3} direction="left">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
        {[
          { icon: AlertTriangle, label: "Atrasos en pagos", color: "bg-red-500/20", textColor: "text-red-600" },
          { icon: Calculator, label: "Proyección deuda", color: "bg-amber-500/20", textColor: "text-amber-600" },
          { icon: FileSignature, label: "Nueva línea", color: "bg-blue-500/20", textColor: "text-blue-600" },
          { icon: RefreshCw, label: "Nuevo ciclo", color: "bg-emerald-500/20", textColor: "text-emerald-600" },
        ].map((step, index) => (
          <motion.div key={step.label} className="flex items-center gap-3" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.15 }}>
            <motion.div className={`w-20 h-20 rounded-2xl ${step.color} flex flex-col items-center justify-center`} whileHover={{ scale: 1.1 }}>
              <step.icon className={`w-8 h-8 ${step.textColor}`} />
              <span className="text-[10px] font-medium mt-1 text-center px-1">{step.label}</span>
            </motion.div>
            {index < 3 && <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />}
          </motion.div>
        ))}
      </div>
    </SubZoomContainer>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SubZoomContainer delay={0.9} direction="bottom">
        <motion.div className="p-6 rounded-2xl bg-card border-2 border-amber-500/30 shadow-lg" whileHover={{ scale: 1.01 }}>
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" />Detección de Atrasos</h4>
          <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={1.0}>
            {["Recupera adeudo del arrendamiento con atrasos", "Genera proyecciones de deuda total", "Estudio de alternativas de pago"].map((item) => (
              <StaggerItem key={item}><motion.div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-sm" whileHover={{ x: 4 }}>{item}</motion.div></StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      </SubZoomContainer>
      <SubZoomContainer delay={1.1} direction="bottom">
        <motion.div className="p-6 rounded-2xl bg-card border-2 border-emerald-500/30 shadow-lg" whileHover={{ scale: 1.01 }}>
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><RefreshCw className="w-5 h-5 text-emerald-500" />Nueva Formalización</h4>
          <StaggerContainer className="space-y-3" staggerDelay={0.1} initialDelay={1.2}>
            {["Nueva línea con indicador de reestructura", "Nuevas condiciones de pago", "Generación de contratos y cronogramas"].map((item) => (
              <StaggerItem key={item}><motion.div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-sm" whileHover={{ x: 4 }}>{item}</motion.div></StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      </SubZoomContainer>
    </div>
    <SubZoomContainer delay={1.5} direction="zoom">
      <motion.div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
        <p className="text-sm text-muted-foreground">El sistema realiza el traslado del inventario y activa el nuevo ciclo automáticamente</p>
      </motion.div>
    </SubZoomContainer>
  </motion.div>
);

// ==================== MAIN SLIDE ====================
export const SlideAdminActivos = () => {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const activeProcess = topProcesses.find(p => p.id === selectedProcess);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedProcess ? (
          <motion.div key="overview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5 }}>
            <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Package className="w-10 h-10 text-primary" />
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">Administración de Activos</h2>
              </div>
              <p className="text-lg text-muted-foreground">Selecciona un proceso para ver su diagrama</p>
            </SubZoomContainer>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3" staggerDelay={0.1} initialDelay={0.2}>
              {topProcesses.map((process) => (
                <StaggerItem key={process.id}>
                  <motion.div className="bg-card rounded-2xl border border-border shadow-md p-4 flex flex-col h-full cursor-pointer" whileHover={{ y: -4, boxShadow: "0 16px 32px -12px rgba(0,0,0,0.15)" }} onClick={() => setSelectedProcess(process.id)}>
                    <motion.div className={`w-11 h-11 rounded-xl ${process.iconBg} flex items-center justify-center mb-3`} whileHover={{ scale: 1.1, rotate: 5 }}>
                      <process.icon className={`w-5 h-5 ${process.iconColor}`} />
                    </motion.div>
                    <h3 className="text-sm font-bold text-foreground mb-1 leading-tight">{process.title}</h3>
                    <p className="text-[10px] text-muted-foreground mb-3 leading-snug">{process.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3 flex-1">
                      {process.tags.map((tag) => (
                        <div key={tag.label} className="flex items-center gap-1 px-2 py-1 bg-muted/60 rounded-md">
                          <tag.icon className="w-3 h-3 text-muted-foreground" /><span className="text-[9px] font-medium text-foreground">{tag.label}</span>
                        </div>
                      ))}
                    </div>
                    <motion.div className={`w-full py-2 px-3 rounded-xl text-white text-xs font-semibold text-center ${process.buttonColor}`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      Ver {process.itemCount} config.
                    </motion.div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <CategoryLegend items={legendItems} />
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }}>
            {activeProcess && (
              <>
                <SubzoomHeader icon={activeProcess.icon} iconBg={activeProcess.iconBg} iconColor={activeProcess.iconColor} title={activeProcess.title} description={activeProcess.description} tag={activeProcess.tag} onBack={() => setSelectedProcess(null)} />
                {selectedProcess === "activos" && <ActivosView />}
                {selectedProcess === "cobranza" && <CobranzaView />}
                {selectedProcess === "seguros" && <SegurosView />}
                {selectedProcess === "compra" && <CompraView />}
                {selectedProcess === "reestructuras" && <ReestructurasView />}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
