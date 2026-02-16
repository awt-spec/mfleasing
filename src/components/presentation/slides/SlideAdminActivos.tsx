import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Car, FileText, DollarSign, RefreshCw, User, Calendar, Shield,
  Calculator, Banknote, ArrowDown, CreditCard, Hash, Tag, Receipt, Clock,
  ArrowRight, Truck, Factory, HardHat, Stethoscope, Server, ShoppingCart,
  Sun, Building, Tractor, Code, Settings2, Landmark, SlidersHorizontal,
  CircleDot, Layers, ClipboardList
} from "lucide-react";
import { CategoryCard } from "../CategoryCard";
import { SubzoomHeader } from "../SubzoomHeader";
import { CategoryLegend } from "../CategoryLegend";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

const processes = [
  {
    id: "contratos",
    icon: FileText,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    title: "Contratos",
    description: "Gestión integral del ciclo contractual",
    buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    itemCount: 9,
    tag: "Core",
    tags: [
      { icon: User, label: "Cliente" },
      { icon: CreditCard, label: "Producto" },
      { icon: Calculator, label: "Cuota" },
      { icon: Shield, label: "Garantías" },
    ],
  },
  {
    id: "inventario",
    icon: Package,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Inventario de Activos",
    description: "Catálogo completo multi-categoría",
    buttonColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    itemCount: 10,
    tag: "Multi-Activo",
    tags: [
      { icon: Car, label: "Vehículos" },
      { icon: Factory, label: "Maquinaria" },
      { icon: Stethoscope, label: "Médico" },
      { icon: Server, label: "TI" },
    ],
  },
  {
    id: "reestructura",
    icon: RefreshCw,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "Reestructura",
    description: "Renegociación de condiciones",
    buttonColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    itemCount: 6,
    tag: "Flujo",
    tags: [
      { icon: Clock, label: "Plazos" },
      { icon: Banknote, label: "Montos" },
      { icon: Receipt, label: "Adeudos" },
      { icon: Shield, label: "Condonación" },
    ],
  },
  {
    id: "pago-proveedores",
    icon: Landmark,
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    title: "Pago a Proveedores",
    description: "Desembolsos y conciliación",
    buttonColor: "bg-gradient-to-r from-violet-500 to-purple-600",
    itemCount: 5,
    tag: "Pagos",
    tags: [
      { icon: DollarSign, label: "Desembolso" },
      { icon: ClipboardList, label: "Conciliación" },
      { icon: FileText, label: "Facturación" },
      { icon: Calendar, label: "Programación" },
    ],
  },
  {
    id: "cobranza",
    icon: Receipt,
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    title: "Cobranza",
    description: "Gestión de pagos y mora",
    buttonColor: "bg-gradient-to-r from-red-500 to-red-600",
    itemCount: 6,
    tag: "Recaudo",
    tags: [
      { icon: Banknote, label: "Pagos" },
      { icon: Clock, label: "Mora" },
      { icon: Settings2, label: "Reglas" },
      { icon: CircleDot, label: "Estado" },
    ],
  },
];

const legendItems = [
  { color: "bg-blue-500", label: "Contratos" },
  { color: "bg-emerald-500", label: "Inventario" },
  { color: "bg-amber-500", label: "Reestructura" },
  { color: "bg-violet-500", label: "Pago Proveedores" },
  { color: "bg-red-500", label: "Cobranza" },
];

// ---- CONTRATOS: Visual flow ----
const ContratosView = () => {
  const phases = [
    {
      title: "Apertura",
      color: "from-blue-500 to-blue-600",
      items: [
        { icon: User, label: "Cliente / deudor" },
        { icon: CreditCard, label: "Producto financiado" },
        { icon: DollarSign, label: "Tipos de moneda" },
      ],
    },
    {
      title: "Configuración",
      color: "from-blue-400 to-cyan-500",
      items: [
        { icon: Calendar, label: "Fecha apertura / vencimiento" },
        { icon: Shield, label: "Garantías asociadas" },
        { icon: Calculator, label: "Cálculo de la cuota" },
      ],
    },
    {
      title: "Financiamiento",
      color: "from-cyan-500 to-teal-500",
      items: [
        { icon: Banknote, label: "Rentas en depósito" },
        { icon: SlidersHorizontal, label: "Tasas y comisiones" },
        { icon: FileText, label: "Documentación legal" },
      ],
    },
  ];

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {phases.map((phase, pi) => (
        <div key={phase.title} className="flex flex-col items-center">
          <motion.div
            className="w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + pi * 0.2 }}
          >
            {/* Phase header */}
            <motion.div
              className={`px-5 py-3 rounded-t-2xl bg-gradient-to-r ${phase.color} text-white font-bold text-sm flex items-center gap-2`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                {pi + 1}
              </div>
              {phase.title}
            </motion.div>

            {/* Phase items */}
            <div className="bg-card border border-t-0 border-border rounded-b-2xl p-4 space-y-2">
              {phase.items.map((item, ii) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/70 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + pi * 0.2 + ii * 0.08 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {pi < phases.length - 1 && (
            <motion.div
              className="my-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.6 + pi * 0.2 }}
            >
              <ArrowDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

// ---- INVENTARIO: Asset categories grid ----
const assetCategories = [
  {
    icon: Car,
    title: "Vehículos",
    items: ["Autos", "Pickups", "Vans", "Camiones", "Buses", "Motos", "Flotas"],
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Factory,
    title: "Maquinaria Industrial",
    items: ["CNC", "Prensas", "Compresores", "Calderas", "Montacargas", "Generadores"],
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: HardHat,
    title: "Equipo de Construcción",
    items: ["Excavadoras", "Retroexcavadoras", "Grúas", "Mezcladoras", "Pavimentación"],
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
  {
    icon: Stethoscope,
    title: "Equipo Médico",
    items: ["Rayos X", "Resonancia", "Ultrasonidos", "Odontológicos", "Lab. clínico"],
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Server,
    title: "Tecnología / TI",
    items: ["Servidores", "Storage", "Redes", "Laptops corporativas", "IT Leasing"],
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: ShoppingCart,
    title: "Equipamiento Comercial",
    items: ["Refrigeración", "Cocina industrial", "Hornos", "Mobiliario", "POS"],
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Sun,
    title: "Energía y Renovables",
    items: ["Paneles solares", "Inversores", "Baterías", "Plantas eléctricas"],
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Building,
    title: "Inmuebles",
    items: ["Bodegas", "Edificios", "Locales", "Oficinas", "Naves industriales"],
    color: "text-slate-500",
    bg: "bg-slate-500/10",
  },
  {
    icon: Tractor,
    title: "Activos Agrícolas",
    items: ["Tractores", "Implementos", "Riego", "Ordeño"],
    color: "text-lime-600",
    bg: "bg-lime-500/10",
  },
  {
    icon: Code,
    title: "Activos Intangibles",
    items: ["Software", "Licencias", "Derechos de uso", "Arrendamiento operativo"],
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
];

const InventarioView = () => (
  <motion.div
    className="space-y-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3" staggerDelay={0.06} initialDelay={0.3}>
      {assetCategories.map((cat) => (
        <StaggerItem key={cat.title}>
          <motion.div
            className="p-4 rounded-2xl bg-card border border-border shadow-sm h-full"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center mb-3`}>
              <cat.icon className={`w-5 h-5 ${cat.color}`} />
            </div>
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

    <motion.div
      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted/50 border border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <Layers className="w-4 h-4 text-primary" />
      <span className="text-xs text-muted-foreground">
        <span className="text-primary font-semibold">Entre otros</span> — El sistema es extensible a cualquier tipo de activo según regulación y producto
      </span>
    </motion.div>
  </motion.div>
);

// ---- REESTRUCTURA: Flow ----
const ReestructuraView = () => {
  const steps = [
    { icon: Tag, label: "Tipos de reestructura", highlight: true },
    { icon: Clock, label: "Plazos" },
    { icon: Banknote, label: "Montos" },
    { icon: Calendar, label: "Fechas" },
    { icon: Receipt, label: "Adeudos / Rentas vencidas", highlight: true },
    { icon: Calculator, label: "Cargos a capitalizar" },
    { icon: Shield, label: "Condonación de mora" },
    { icon: DollarSign, label: "Monto de la reestructura" },
    { icon: CreditCard, label: "Cargos" },
    { icon: RefreshCw, label: "Reversiones de reestructura" },
  ];

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <StaggerContainer className="flex flex-col items-center gap-1" staggerDelay={0.08} initialDelay={0.3}>
        {steps.map((step, i) => (
          <StaggerItem key={step.label} className="flex flex-col items-center">
            <motion.div
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-sm w-full max-w-md ${
                step.highlight
                  ? "bg-amber-500/10 border-amber-300/50 dark:border-amber-700/50"
                  : "bg-card border-border"
              }`}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className={`w-8 h-8 rounded-lg ${step.highlight ? "bg-amber-500/20" : "bg-muted"} flex items-center justify-center`}>
                <step.icon className={`w-4 h-4 ${step.highlight ? "text-amber-600" : "text-muted-foreground"}`} />
              </div>
              <span className="text-sm font-semibold text-foreground">{step.label}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <ArrowDown className="w-3 h-3 text-muted-foreground my-0.5 opacity-40" />
            )}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </motion.div>
  );
};

// ---- PAGO A PROVEEDORES: Flow ----
const PagoProveedoresView = () => {
  const steps = [
    { icon: FileText, label: "Orden de compra / Factura", highlight: true },
    { icon: ClipboardList, label: "Validación documental" },
    { icon: Calculator, label: "Cálculo de desembolso" },
    { icon: Calendar, label: "Programación de pago" },
    { icon: DollarSign, label: "Desembolso al proveedor", highlight: true },
    { icon: Receipt, label: "Conciliación bancaria" },
    { icon: FileText, label: "Comprobante y registro contable" },
  ];

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <StaggerContainer className="flex flex-col items-center gap-1" staggerDelay={0.08} initialDelay={0.3}>
        {steps.map((step, i) => (
          <StaggerItem key={step.label} className="flex flex-col items-center">
            <motion.div
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-sm w-full max-w-md ${
                step.highlight
                  ? "bg-violet-500/10 border-violet-300/50 dark:border-violet-700/50"
                  : "bg-card border-border"
              }`}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className={`w-8 h-8 rounded-lg ${step.highlight ? "bg-violet-500/20" : "bg-muted"} flex items-center justify-center`}>
                <step.icon className={`w-4 h-4 ${step.highlight ? "text-violet-600" : "text-muted-foreground"}`} />
              </div>
              <span className="text-sm font-semibold text-foreground">{step.label}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <ArrowDown className="w-3 h-3 text-muted-foreground my-0.5 opacity-40" />
            )}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </motion.div>
  );
};

// ---- COBRANZA: Flow ----
const CobranzaView = () => {
  const steps = [
    { icon: Calendar, label: "Generación de cuotas", highlight: true },
    { icon: Banknote, label: "Aplicación de pagos" },
    { icon: Clock, label: "Cálculo de mora e intereses" },
    { icon: Settings2, label: "Reglas de cobro configurables", highlight: true },
    { icon: Receipt, label: "Gestión de cobro (notificaciones)" },
    { icon: CircleDot, label: "Estatus de cartera" },
    { icon: FileText, label: "Estados de cuenta" },
  ];

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <StaggerContainer className="flex flex-col items-center gap-1" staggerDelay={0.08} initialDelay={0.3}>
        {steps.map((step, i) => (
          <StaggerItem key={step.label} className="flex flex-col items-center">
            <motion.div
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-sm w-full max-w-md ${
                step.highlight
                  ? "bg-red-500/10 border-red-300/50 dark:border-red-700/50"
                  : "bg-card border-border"
              }`}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className={`w-8 h-8 rounded-lg ${step.highlight ? "bg-red-500/20" : "bg-muted"} flex items-center justify-center`}>
                <step.icon className={`w-4 h-4 ${step.highlight ? "text-red-600" : "text-muted-foreground"}`} />
              </div>
              <span className="text-sm font-semibold text-foreground">{step.label}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <ArrowDown className="w-3 h-3 text-muted-foreground my-0.5 opacity-40" />
            )}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </motion.div>
  );
};

// ---- MAIN SLIDE ----
export const SlideAdminActivos = () => {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const activeProcess = processes.find(p => p.id === selectedProcess);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedProcess ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Package className="w-10 h-10 text-primary" />
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Administración de Activos
                </h2>
              </div>
              <p className="text-lg text-muted-foreground">
                Selecciona un proceso para ver su diagrama
              </p>
            </SubZoomContainer>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {processes.map((process, index) => (
                <CategoryCard
                  key={process.id}
                  {...process}
                  delay={0.2 + index * 0.1}
                  onClick={() => setSelectedProcess(process.id)}
                />
              ))}
            </div>

            <CategoryLegend items={legendItems} />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
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

                {selectedProcess === "contratos" && <ContratosView />}
                {selectedProcess === "inventario" && <InventarioView />}
                {selectedProcess === "reestructura" && <ReestructuraView />}
                {selectedProcess === "pago-proveedores" && <PagoProveedoresView />}
                {selectedProcess === "cobranza" && <CobranzaView />}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
