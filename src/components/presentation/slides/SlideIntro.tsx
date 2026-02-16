import { motion } from "framer-motion";
import { 
  Play, HelpCircle, Scale, GitBranch, Layers, LayoutGrid,
  Settings, BarChart3, Flag
} from "lucide-react";
import { SubZoomContainer } from "../SubZoomContainer";

const nodes = [
  { id: 1, label: "Inicio", icon: Play, x: 50, y: 8, color: "bg-red-600" },
  { id: 2, label: "Flujo Operativo", icon: HelpCircle, x: 15, y: 28, color: "bg-blue-500" },
  { id: 3, label: "Reglas", icon: Scale, x: 85, y: 28, color: "bg-amber-500" },
  { id: 4, label: "Riesgos", icon: GitBranch, x: 50, y: 48, color: "bg-cyan-500" },
  { id: 5, label: "Formalización", icon: Layers, x: 15, y: 65, color: "bg-purple-500" },
  { id: 6, label: "Activos", icon: LayoutGrid, x: 85, y: 65, color: "bg-emerald-500" },
  { id: 7, label: "Procesos", icon: Settings, x: 50, y: 78, color: "bg-pink-500" },
  { id: 8, label: "Reportes", icon: BarChart3, x: 25, y: 93, color: "bg-indigo-500" },
  { id: 9, label: "Cierre", icon: Flag, x: 75, y: 93, color: "bg-red-700" },
];

// Connections as [fromIndex, toIndex]
const connections: [number, number][] = [
  [0, 1], [0, 2],   // Inicio → Flujo, Reglas
  [1, 3], [2, 3],   // Flujo, Reglas → Riesgos
  [3, 4], [3, 5],   // Riesgos → Formalización, Activos
  [4, 6], [5, 6],   // Formalización, Activos → Procesos
  [6, 7], [6, 8],   // Procesos → Reportes, Cierre
];

// Generate SVG path between two points with a curve
const getCurvedPath = (x1: number, y1: number, x2: number, y2: number) => {
  const midY = (y1 + y2) / 2;
  const cpOffset = Math.abs(x2 - x1) * 0.3;
  return `M ${x1} ${y1} C ${x1 + (x2 > x1 ? cpOffset : -cpOffset)} ${midY}, ${x2 + (x1 > x2 ? cpOffset : -cpOffset)} ${midY}, ${x2} ${y2}`;
};

export const SlideIntro = () => {
  // Map width/height for SVG coordinate system
  const W = 700;
  const H = 520;

  return (
    <div className="w-full max-w-4xl mx-auto text-center px-4">
      {/* Title */}
      <SubZoomContainer delay={0.1} direction="zoom">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary shadow-lg">
            <span className="text-2xl font-bold text-primary-foreground">S</span>
          </div>
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Arrendamiento
            </h1>
            <p className="text-xs text-primary font-semibold">Mapa Funcional</p>
          </div>
        </div>
      </SubZoomContainer>

      {/* Map */}
      <SubZoomContainer delay={0.3} direction="zoom">
        <div className="relative w-full" style={{ aspectRatio: `${W}/${H}` }}>
          {/* SVG Lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            {connections.map(([fromIdx, toIdx], i) => {
              const from = nodes[fromIdx];
              const to = nodes[toIdx];
              const x1 = (from.x / 100) * W;
              const y1 = (from.y / 100) * H + 20;
              const x2 = (to.x / 100) * W;
              const y2 = (to.y / 100) * H - 5;
              const path = getCurvedPath(x1, y1, x2, y2);

              return (
                <motion.path
                  key={`line-${i}`}
                  d={path}
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeDasharray="12 8"
                  strokeLinecap="round"
                  opacity="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: "easeOut" }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.4 + index * 0.13,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {/* Badge number */}
                <motion.div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center z-20 shadow"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.13, type: "spring" }}
                >
                  {node.id}
                </motion.div>

                {/* Icon box */}
                <motion.div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${node.color} flex items-center justify-center shadow-lg cursor-pointer relative z-10`}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </motion.div>

                {/* Label */}
                <span className="mt-1.5 px-2 py-0.5 bg-card/80 backdrop-blur-sm rounded text-[11px] md:text-xs font-semibold text-foreground shadow-sm border border-border/50 whitespace-nowrap">
                  {node.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </SubZoomContainer>

      {/* Clients */}
      <SubZoomContainer delay={2.0} direction="top" className="mt-2">
        <p className="text-[10px] text-muted-foreground mb-1">Líderes que confían en Sysde</p>
        <div className="flex items-center justify-center gap-6 opacity-50">
          <span className="text-xs font-bold text-foreground">BANORTE</span>
          <span className="text-xs font-bold text-foreground">HABITAT</span>
          <span className="text-xs font-bold text-foreground">Credix</span>
        </div>
      </SubZoomContainer>
    </div>
  );
};
