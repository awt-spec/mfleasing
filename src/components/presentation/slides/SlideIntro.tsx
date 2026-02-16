import { motion } from "framer-motion";
import { 
  Play, HelpCircle, Scale, GitBranch, Layers, LayoutGrid,
  Settings, BarChart3, Flag
} from "lucide-react";
import { SubZoomContainer } from "../SubZoomContainer";

const nodes = [
  { id: 1, label: "Inicio", icon: Play, x: 50, y: 6, color: "bg-red-600" },
  { id: 2, label: "Flujo Operativo", icon: HelpCircle, x: 18, y: 24, color: "bg-blue-500" },
  { id: 3, label: "Reglas", icon: Scale, x: 82, y: 24, color: "bg-amber-500" },
  { id: 4, label: "Riesgos", icon: GitBranch, x: 50, y: 42, color: "bg-cyan-500" },
  { id: 5, label: "Formalización", icon: Layers, x: 18, y: 58, color: "bg-purple-500" },
  { id: 6, label: "Activos", icon: LayoutGrid, x: 82, y: 58, color: "bg-emerald-500" },
  { id: 7, label: "Procesos", icon: Settings, x: 50, y: 74, color: "bg-pink-500" },
  { id: 8, label: "Reportes", icon: BarChart3, x: 25, y: 90, color: "bg-indigo-500" },
  { id: 9, label: "Cierre", icon: Flag, x: 75, y: 90, color: "bg-red-700" },
];

// Connections: [fromIndex, toIndex]
const connections: [number, number][] = [
  [0, 1], [0, 2],     // Inicio → Flujo, Reglas
  [1, 3], [2, 3],     // Flujo, Reglas → Riesgos
  [3, 4], [3, 5],     // Riesgos → Formalización, Activos
  [4, 6], [5, 6],     // Formalización, Activos → Procesos
  [6, 7],             // Procesos → Reportes
  [7, 8],             // Reportes → Cierre (single line)
];

const W = 700;
const H = 560;

const getNodeCenter = (node: typeof nodes[0]) => ({
  cx: (node.x / 100) * W,
  cy: (node.y / 100) * H,
});

// Smooth cubic bezier between two node centers, offset from edges
const getSmoothPath = (fromIdx: number, toIdx: number) => {
  const from = getNodeCenter(nodes[fromIdx]);
  const to = getNodeCenter(nodes[toIdx]);

  // Offset start/end points away from node center (30px radius)
  const angle = Math.atan2(to.cy - from.cy, to.cx - from.cx);
  const r = 30;
  const x1 = from.cx + Math.cos(angle) * r;
  const y1 = from.cy + Math.sin(angle) * r;
  const endAngle = Math.atan2(from.cy - to.cy, from.cx - to.cx);
  const x2 = to.cx + Math.cos(endAngle) * r;
  const y2 = to.cy + Math.sin(endAngle) * r;

  // Control points: pull towards vertical center
  const dy = y2 - y1;
  const dx = x2 - x1;
  const cp1x = x1 + dx * 0.15;
  const cp1y = y1 + dy * 0.55;
  const cp2x = x2 - dx * 0.15;
  const cp2y = y2 - dy * 0.55;

  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
};

export const SlideIntro = () => {
  return (
    <div className="w-full max-w-4xl mx-auto text-center px-4">
      {/* Title */}
      <SubZoomContainer delay={0.1} direction="zoom">
        <div className="flex items-center justify-center gap-3 mb-2">
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
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            {connections.map(([fromIdx, toIdx], i) => {
              const path = getSmoothPath(fromIdx, toIdx);
              return (
                <motion.path
                  key={`line-${i}`}
                  d={path}
                  stroke="hsl(var(--primary) / 0.3)"
                  strokeWidth="2.5"
                  strokeDasharray="10 6"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: "easeInOut" }}
                />
              );
            })}

            {/* Animated dots traveling along paths */}
            {connections.map(([fromIdx, toIdx], i) => {
              const path = getSmoothPath(fromIdx, toIdx);
              const pathId = `path-${i}`;
              return (
                <g key={`dot-${i}`}>
                  <defs>
                    <path id={pathId} d={path} />
                  </defs>
                  <motion.circle
                    r="3"
                    fill="hsl(var(--primary))"
                    opacity="0.6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0.6, 0] }}
                    transition={{
                      delay: 1.5 + i * 0.2,
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    <animateMotion
                      dur="2.5s"
                      repeatCount="indefinite"
                      begin={`${1.5 + i * 0.2}s`}
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </motion.circle>
                </g>
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
                  delay: 0.3 + index * 0.12,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {/* Badge number */}
                <motion.div
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center z-20 shadow"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.12, type: "spring" }}
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
      <SubZoomContainer delay={2.0} direction="top" className="mt-1">
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
