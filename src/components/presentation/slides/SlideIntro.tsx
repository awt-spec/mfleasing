import { motion } from "framer-motion";
import { 
  Building2, TrendingUp, Shield, Zap, FileText, Car, 
  DollarSign, ClipboardList, RefreshCw, ShieldCheck,
  BarChart3, ArrowRight, ArrowDown
} from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

const mapNodes = [
  { id: "reglas", label: "Reglas de Negocio", icon: Shield, color: "bg-red-500", row: 0, col: 1 },
  { id: "riesgos", label: "Análisis de Riesgos", icon: TrendingUp, color: "bg-amber-500", row: 1, col: 0 },
  { id: "procesos", label: "Procesos Comerciales", icon: Building2, color: "bg-blue-500", row: 1, col: 2 },
  { id: "formalizacion", label: "Formalización", icon: FileText, color: "bg-emerald-500", row: 2, col: 1 },
  { id: "activos", label: "Admin. Activos", icon: Car, color: "bg-purple-500", row: 3, col: 0 },
  { id: "cobranza", label: "Cobranza", icon: DollarSign, color: "bg-sky-500", row: 3, col: 1 },
  { id: "seguros", label: "Seguros", icon: ShieldCheck, color: "bg-teal-500", row: 3, col: 2 },
  { id: "compra", label: "Opción de Compra", icon: ClipboardList, color: "bg-orange-500", row: 4, col: 0 },
  { id: "reestructuras", label: "Reestructuras", icon: RefreshCw, color: "bg-pink-500", row: 4, col: 1 },
  { id: "reportes", label: "Reportes", icon: BarChart3, color: "bg-indigo-500", row: 4, col: 2 },
];

// Connections between nodes: [fromId, toId]
const connections: [string, string][] = [
  ["reglas", "riesgos"],
  ["reglas", "procesos"],
  ["riesgos", "formalizacion"],
  ["procesos", "formalizacion"],
  ["formalizacion", "activos"],
  ["formalizacion", "cobranza"],
  ["formalizacion", "seguros"],
  ["cobranza", "compra"],
  ["cobranza", "reestructuras"],
  ["cobranza", "reportes"],
];

export const SlideIntro = () => {
  return (
    <div className="w-full max-w-6xl mx-auto text-center px-4">
      {/* Title */}
      <SubZoomContainer delay={0.1} direction="zoom">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary shadow-lg">
            <span className="text-3xl font-bold text-primary-foreground">S</span>
          </div>
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Arrendamiento
            </h1>
            <p className="text-sm text-primary font-semibold">Mapa Funcional Completo</p>
          </div>
        </div>
      </SubZoomContainer>

      {/* Functional Map */}
      <SubZoomContainer delay={0.3} direction="zoom" className="mt-6">
        <div className="relative bg-card/50 border border-border rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          {/* Flow label */}
          <motion.div
            className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            FLUJO OPERATIVO
          </motion.div>

          {/* Grid-based map */}
          <div className="grid grid-rows-5 gap-4 mt-2">
            {/* Row 0: Reglas */}
            <StaggerContainer className="flex justify-center" staggerDelay={0.1} initialDelay={0.5}>
              <StaggerItem>
                <MapNode node={mapNodes[0]} index={0} />
              </StaggerItem>
            </StaggerContainer>

            {/* Arrow down */}
            <FlowArrows type="split" delay={0.7} />

            {/* Row 1: Riesgos + Procesos */}
            <StaggerContainer className="flex justify-center gap-16 md:gap-32" staggerDelay={0.1} initialDelay={0.8}>
              <StaggerItem>
                <MapNode node={mapNodes[1]} index={1} />
              </StaggerItem>
              <StaggerItem>
                <MapNode node={mapNodes[2]} index={2} />
              </StaggerItem>
            </StaggerContainer>

            {/* Arrow merge */}
            <FlowArrows type="merge" delay={1.0} />

            {/* Row 2: Formalización */}
            <StaggerContainer className="flex justify-center" staggerDelay={0.1} initialDelay={1.1}>
              <StaggerItem>
                <MapNode node={mapNodes[3]} index={3} highlight />
              </StaggerItem>
            </StaggerContainer>

            {/* Arrow split to 3 */}
            <FlowArrows type="triple" delay={1.3} />

            {/* Row 3: Activos, Cobranza, Seguros */}
            <StaggerContainer className="flex justify-center gap-4 md:gap-8" staggerDelay={0.1} initialDelay={1.4}>
              <StaggerItem>
                <MapNode node={mapNodes[4]} index={4} />
              </StaggerItem>
              <StaggerItem>
                <MapNode node={mapNodes[5]} index={5} />
              </StaggerItem>
              <StaggerItem>
                <MapNode node={mapNodes[6]} index={6} />
              </StaggerItem>
            </StaggerContainer>

            {/* Arrow down */}
            <FlowArrows type="down" delay={1.6} />

            {/* Row 4: Compra, Reestructuras, Reportes */}
            <StaggerContainer className="flex justify-center gap-4 md:gap-8" staggerDelay={0.1} initialDelay={1.7}>
              <StaggerItem>
                <MapNode node={mapNodes[7]} index={7} />
              </StaggerItem>
              <StaggerItem>
                <MapNode node={mapNodes[8]} index={8} />
              </StaggerItem>
              <StaggerItem>
                <MapNode node={mapNodes[9]} index={9} />
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </SubZoomContainer>

      {/* Clients */}
      <SubZoomContainer delay={2.0} direction="top" className="mt-6">
        <p className="text-xs text-muted-foreground mb-2">Líderes que confían en Sysde</p>
        <div className="flex items-center justify-center gap-8 opacity-50">
          <span className="text-sm font-bold text-foreground">BANORTE</span>
          <span className="text-sm font-bold text-foreground">HABITAT</span>
          <span className="text-sm font-bold text-foreground">Credix</span>
        </div>
      </SubZoomContainer>
    </div>
  );
};

// Map node component
const MapNode = ({ node, index, highlight = false }: { 
  node: typeof mapNodes[0]; 
  index: number;
  highlight?: boolean;
}) => {
  const Icon = node.icon;
  return (
    <motion.div
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border shadow-sm transition-all cursor-pointer
        ${highlight 
          ? "bg-primary/10 border-primary/40 ring-2 ring-primary/20" 
          : "bg-card border-border hover:border-primary/30"
        }`}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <div className={`w-8 h-8 rounded-lg ${node.color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-xs md:text-sm font-semibold text-foreground whitespace-nowrap">{node.label}</span>
    </motion.div>
  );
};

// Flow arrows between rows
const FlowArrows = ({ type, delay }: { type: "down" | "split" | "merge" | "triple"; delay: number }) => {
  return (
    <motion.div
      className="flex justify-center items-center h-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {type === "down" && (
        <div className="flex gap-16 md:gap-24">
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      {type === "split" && (
        <div className="flex items-center gap-2">
          <div className="w-16 md:w-24 h-px bg-muted-foreground/40" />
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
          <div className="w-16 md:w-24 h-px bg-muted-foreground/40" />
        </div>
      )}
      {type === "merge" && (
        <div className="flex items-center gap-2">
          <div className="w-16 md:w-24 h-px bg-muted-foreground/40" />
          <ArrowDown className="w-4 h-4 text-primary" />
          <div className="w-16 md:w-24 h-px bg-muted-foreground/40" />
        </div>
      )}
      {type === "triple" && (
        <div className="flex items-center gap-1">
          <div className="w-8 md:w-16 h-px bg-muted-foreground/40" />
          <ArrowDown className="w-3 h-3 text-muted-foreground" />
          <div className="w-8 md:w-12 h-px bg-muted-foreground/40" />
          <ArrowDown className="w-3 h-3 text-muted-foreground" />
          <div className="w-8 md:w-12 h-px bg-muted-foreground/40" />
          <ArrowDown className="w-3 h-3 text-muted-foreground" />
          <div className="w-8 md:w-16 h-px bg-muted-foreground/40" />
        </div>
      )}
    </motion.div>
  );
};
