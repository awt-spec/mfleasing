import { motion } from "framer-motion";
import logoSysde from "@/assets/logo_sysde.png";
import {
  Play, HelpCircle, Scale, GitBranch, Layers, LayoutGrid,
  Settings, BarChart3, Flag
} from "lucide-react";
import { SubZoomContainer } from "../SubZoomContainer";
import { useLanguage } from "@/contexts/LanguageContext";

const clients = [
  "CMI", "DOS PINOS", "AFP CRECER", "BAC", "BANCO DE COSTA RICA", "UNICOMER",
  "CREDICOMER", "FACTOR Y VALOR", "DESYFIN", "ION", "BANCO ADOPEM", "BROXEL",
  "CREDICEFI", "CAPITAL ACTIVO", "VALMEX", "CFE", "COOPECAR",
];

const nodeConfig = [
  { id: 1, labelKey: "node.inicio", icon: Play, x: 300, y: 40, color: "#dc2626" },
  { id: 2, labelKey: "node.flujo", icon: HelpCircle, x: 100, y: 120, color: "#3b82f6" },
  { id: 3, labelKey: "node.reglas", icon: Scale, x: 500, y: 120, color: "#f59e0b" },
  { id: 4, labelKey: "node.riesgos", icon: GitBranch, x: 300, y: 200, color: "#06b6d4" },
  { id: 5, labelKey: "node.comerciales", icon: Settings, x: 100, y: 280, color: "#ec4899" },
  { id: 6, labelKey: "node.formalizacion", icon: Layers, x: 500, y: 280, color: "#8b5cf6" },
  { id: 7, labelKey: "node.activos", icon: LayoutGrid, x: 300, y: 360, color: "#10b981" },
  { id: 8, labelKey: "node.reportes", icon: BarChart3, x: 100, y: 440, color: "#6366f1" },
  { id: 9, labelKey: "node.cierre", icon: Flag, x: 500, y: 440, color: "#b91c1c" },
];

const connections: [number, number][] = [
  [0, 1], [0, 2],
  [1, 3], [2, 3],
  [3, 4], [3, 5],
  [4, 6], [5, 6],
  [6, 7], [6, 8],
];

const W = 600;
const H = 490;
const NODE_R = 24; // icon box half-size

const getPath = (fi: number, ti: number) => {
  const f = nodeConfig[fi];
  const t = nodeConfig[ti];
  // Start from bottom of source, end at top of target
  const x1 = f.x, y1 = f.y + NODE_R;
  const x2 = t.x, y2 = t.y - NODE_R;
  // Control points: vertical bias
  const cy1 = y1 + (y2 - y1) * 0.5;
  const cy2 = y1 + (y2 - y1) * 0.5;
  return `M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`;
};

export const SlideIntro = () => {
  const { t } = useLanguage();

  const nodes = nodeConfig.map(n => ({ ...n, label: t(n.labelKey) }));

  return (
    <div className="w-full max-w-3xl mx-auto text-center px-4">
      {/* Title */}
      <SubZoomContainer delay={0.1} direction="zoom">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary shadow-lg p-1.5">
            <img src={logoSysde} alt="Sysde" className="w-full h-full object-contain" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              {t("map.title")}
            </h1>
            <p className="text-xs text-primary font-semibold">{t("map.subtitle")}</p>
          </div>
        </div>
      </SubZoomContainer>

      {/* Pure SVG Map */}
      <SubZoomContainer delay={0.3} direction="zoom">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-xl mx-auto"
          style={{ overflow: "visible" }}
        >
          {/* Connection lines */}
          {connections.map(([fi, ti], i) => (
            <motion.path
              key={`line-${i}`}
              d={getPath(fi, ti)}
              stroke="hsl(var(--primary) / 0.25)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeInOut" }}
            />
          ))}

          {/* Animated dots traveling along paths */}
          {connections.map(([fi, ti], i) => {
            const pathId = `conn-${i}`;
            return (
              <g key={`dot-${i}`}>
                <defs>
                  <path id={pathId} d={getPath(fi, ti)} />
                </defs>
                <motion.circle
                  r="3"
                  fill="hsl(var(--primary))"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0.7, 0] }}
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

          {/* Nodes - all in SVG */}
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.3 + index * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                {/* Icon background */}
                <rect
                  x={node.x - NODE_R}
                  y={node.y - NODE_R}
                  width={NODE_R * 2}
                  height={NODE_R * 2}
                  rx="10"
                  fill={node.color}
                  className="drop-shadow-lg"
                />
                {/* Icon (as foreignObject) */}
                <foreignObject
                  x={node.x - 12}
                  y={node.y - 12}
                  width="24"
                  height="24"
                >
                  <Icon
                    style={{ width: 24, height: 24, color: "white" }}
                  />
                </foreignObject>

                {/* Badge number */}
                <circle
                  cx={node.x + NODE_R - 2}
                  cy={node.y - NODE_R + 2}
                  r="9"
                  fill="hsl(var(--primary))"
                />
                <text
                  x={node.x + NODE_R - 2}
                  y={node.y - NODE_R + 6}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="white"
                >
                  {node.id}
                </text>

                {/* Label */}
                <rect
                  x={node.x - node.label.length * 3.5 - 6}
                  y={node.y + NODE_R + 4}
                  width={node.label.length * 7 + 12}
                  height="18"
                  rx="4"
                  fill="hsl(var(--card))"
                  stroke="hsl(var(--border) / 0.5)"
                  strokeWidth="0.5"
                />
                <text
                  x={node.x}
                  y={node.y + NODE_R + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="hsl(var(--foreground))"
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </SubZoomContainer>

      {/* Clients carousel */}
      <SubZoomContainer delay={2.0} direction="top" className="mt-1 overflow-hidden">
        <p className="text-[10px] text-muted-foreground mb-2">{t("map.clients")}</p>
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...clients, ...clients].map((name, i) => (
              <span key={`${name}-${i}`} className="text-xs font-bold text-foreground/40 flex-shrink-0">
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </SubZoomContainer>
    </div>
  );
};
