import { motion } from "framer-motion";
import { 
  Play, HelpCircle, Scale, GitBranch, Layers, LayoutGrid,
  Settings, BarChart3, Flag
} from "lucide-react";
import { SubZoomContainer } from "../SubZoomContainer";

// Row-based layout: each row has nodes at fixed positions
const nodes = [
  { id: 1, label: "Inicio", icon: Play, row: 0, col: 1, color: "bg-red-600" },
  { id: 2, label: "Flujo Operativo", icon: HelpCircle, row: 1, col: 0, color: "bg-blue-500" },
  { id: 3, label: "Reglas", icon: Scale, row: 1, col: 2, color: "bg-amber-500" },
  { id: 4, label: "Riesgos", icon: GitBranch, row: 2, col: 1, color: "bg-cyan-500" },
  { id: 5, label: "Comerciales", icon: Settings, row: 3, col: 0, color: "bg-pink-500" },
  { id: 6, label: "Formalización", icon: Layers, row: 3, col: 2, color: "bg-purple-500" },
  { id: 7, label: "Admin. Activos", icon: LayoutGrid, row: 4, col: 1, color: "bg-emerald-500" },
  { id: 8, label: "Reportes", icon: BarChart3, row: 5, col: 0, color: "bg-indigo-500" },
  { id: 9, label: "Cierre", icon: Flag, row: 5, col: 2, color: "bg-red-700" },
];

const connections: [number, number][] = [
  [0, 1], [0, 2],
  [1, 3], [2, 3],
  [3, 4], [3, 5],
  [4, 6], [5, 6],
  [6, 7], [6, 8],
];

const COLS = [100, 300, 500]; // x positions for 3 columns
const ROW_H = 90; // vertical spacing between rows
const PAD_TOP = 40;
const W = 600;
const H = PAD_TOP + 6 * ROW_H + 20;

const getNodePos = (node: typeof nodes[0]) => ({
  cx: COLS[node.col],
  cy: PAD_TOP + node.row * ROW_H,
});

const getSmoothPath = (fromIdx: number, toIdx: number) => {
  const from = getNodePos(nodes[fromIdx]);
  const to = getNodePos(nodes[toIdx]);
  const dy = Math.abs(to.cy - from.cy);
  const offset = dy * 0.35;
  return `M ${from.cx} ${from.cy + 20} C ${from.cx} ${from.cy + 20 + offset}, ${to.cx} ${to.cy - 20 - offset}, ${to.cx} ${to.cy - 20}`;
};

export const SlideIntro = () => {
  return (
    <div className="w-full max-w-3xl mx-auto text-center px-4">
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
                  strokeWidth="2"
                  strokeDasharray="8 5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6 + i * 0.12, duration: 0.7, ease: "easeInOut" }}
                />
              );
            })}

            {/* Animated dots */}
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
            const pos = getNodePos(node);
            return (
              <motion.div
                key={node.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${(pos.cx / W) * 100}%`,
                  top: `${(pos.cy / H) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <motion.div
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center z-20 shadow"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  {node.id}
                </motion.div>

                <motion.div
                  className={`w-11 h-11 md:w-13 md:h-13 rounded-xl ${node.color} flex items-center justify-center shadow-lg cursor-pointer relative z-10`}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </motion.div>

                <span className="mt-1 px-2 py-0.5 bg-card/80 backdrop-blur-sm rounded text-[10px] md:text-[11px] font-semibold text-foreground shadow-sm border border-border/50 whitespace-nowrap">
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
