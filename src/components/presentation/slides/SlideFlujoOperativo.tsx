import { motion } from "framer-motion";
import { Building, User, Truck } from "lucide-react";
import { SubZoomContainer } from "../SubZoomContainer";

// SVG diagram inspired by reference: 3 actors (Banco, Proveedor, Entidad) with labeled arrows
const W = 800;
const H = 500;

// Actor positions
const banco = { x: 400, y: 80, label: "Banco o empresa de\nleasing" };
const proveedor = { x: 100, y: 400, label: "Proveedor" };
const entidad = { x: 700, y: 400, label: "Entidad pública" };

// Arrow definitions: [from, to, label, color, side]
const arrows: {
  x1: number; y1: number; x2: number; y2: number;
  label: string; color: string; labelSide: "left" | "right" | "top" | "bottom";
  dashed?: boolean;
}[] = [
  // Right side: Entidad → Banco (Contrato de leasing financiero)
  { x1: 700, y1: 360, x2: 700, y2: 130, label: "Contrato de leasing\nfinanciero", color: "hsl(var(--primary))", labelSide: "right" },
  // Top: Banco → Proveedor (implied via left arrow)
  // Left side: Banco → Proveedor (Paga precio de bien)
  { x1: 100, y1: 130, x2: 100, y2: 360, label: "Paga precio\nde bien", color: "#888", labelSide: "left", dashed: true },
  // Right inner: Entidad → Banco (Paga la renta o servicio de deuda)
  { x1: 640, y1: 360, x2: 640, y2: 130, label: "Paga la renta\n(servicio de deuda)", color: "#888", labelSide: "right", dashed: true },
  // Bottom: Proveedor ← Entidad (Identifica el bien) - red arrow
  { x1: 650, y1: 430, x2: 200, y2: 430, label: "Identifica el bien", color: "hsl(var(--primary))", labelSide: "bottom" },
  // Bottom: Proveedor → Entidad (Entrega el bien) - gray arrow
  { x1: 200, y1: 460, x2: 650, y2: 460, label: "Entrega el bien", color: "#888", labelSide: "bottom", dashed: true },
  // Top: Banco connects to both via top bar
  { x1: 150, y1: 80, x2: 650, y2: 80, label: "Persona autorizada a efectuar operaciones", color: "#333", labelSide: "top" },
];

export const SlideFlujoOperativo = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
          Flujo Operativo
        </h2>
        <p className="text-lg text-primary font-semibold">
          Proceso de Arrendamiento Financiero
        </p>
      </SubZoomContainer>

      <SubZoomContainer delay={0.3} direction="zoom">
        <div className="relative w-full bg-card/30 rounded-2xl border border-border p-4" style={{ aspectRatio: `${W}/${H}` }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
              </marker>
              <marker id="arrowGray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#999" />
              </marker>
            </defs>

            {/* Vertical connectors: left side Banco↔Proveedor */}
            <motion.line
              x1={100} y1={130} x2={100} y2={360}
              stroke="#aaa" strokeWidth="2" strokeDasharray="6 4"
              markerEnd="url(#arrowGray)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
            {/* Left label */}
            <motion.text x={60} y={250} textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.6"
              initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.0 }}
              style={{ writingMode: "vertical-rl" } as any}
            >
              <tspan x={55} dy="0">Paga precio</tspan>
              <tspan x={68} dy="0">de bien</tspan>
            </motion.text>

            {/* Right side: Entidad → Banco (contract - red) */}
            <motion.line
              x1={700} y1={360} x2={700} y2={130}
              stroke="hsl(var(--primary))" strokeWidth="2.5"
              markerEnd="url(#arrowRed)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            />
            {/* Right label */}
            <motion.text x={735} y={200} fontSize="11" fill="hsl(var(--primary))" opacity="0.8"
              initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1.1 }}
            >
              <tspan x={735} dy="0">Contrato de</tspan>
              <tspan x={735} dy="14">leasing financiero</tspan>
            </motion.text>

            {/* Right inner: rent payment (gray dashed) */}
            <motion.line
              x1={640} y1={360} x2={640} y2={130}
              stroke="#aaa" strokeWidth="2" strokeDasharray="6 4"
              markerEnd="url(#arrowGray)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            />
            <motion.text x={600} y={250} fontSize="10" fill="currentColor" opacity="0.5" textAnchor="end"
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.2 }}
            >
              <tspan x={600} dy="0">Paga la renta</tspan>
              <tspan x={600} dy="13">(servicio de deuda)</tspan>
            </motion.text>

            {/* Bottom: Identifica el bien (red, right to left) */}
            <motion.line
              x1={650} y1={425} x2={200} y2={425}
              stroke="hsl(var(--primary))" strokeWidth="2.5"
              markerEnd="url(#arrowRed)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            />
            <motion.text x={400} y={418} textAnchor="middle" fontSize="12" fontWeight="600" fill="hsl(var(--primary))"
              initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1.4 }}
            >
              Identifica el bien
            </motion.text>

            {/* Bottom: Entrega el bien (gray, left to right) */}
            <motion.line
              x1={200} y1={455} x2={650} y2={455}
              stroke="#aaa" strokeWidth="2" strokeDasharray="6 4"
              markerEnd="url(#arrowGray)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            />
            <motion.text x={400} y={475} textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.5"
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }}
            >
              Entrega el bien
            </motion.text>

            {/* Top bar */}
            <motion.line
              x1={150} y1={60} x2={650} y2={60}
              stroke="#ccc" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
            <motion.text x={400} y={50} textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor"
              initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.7 }}
            >
              Persona autorizada a efectuar operaciones o leasing financiero
            </motion.text>
          </svg>

          {/* Actor boxes */}
          {/* Banco */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: "50%", top: "14%", transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <div className="px-5 py-3 bg-muted/80 border border-border rounded-lg shadow-sm text-center">
              <Building className="w-6 h-6 text-primary mx-auto mb-1" />
              <span className="text-xs md:text-sm font-semibold text-foreground">Banco o empresa de leasing</span>
            </div>
          </motion.div>

          {/* Proveedor */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: "12.5%", top: "80%", transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className="px-5 py-3 bg-muted/80 border border-border rounded-lg shadow-sm text-center">
              <Truck className="w-6 h-6 text-amber-600 mx-auto mb-1" />
              <span className="text-xs md:text-sm font-semibold text-foreground">Proveedor</span>
            </div>
            <span className="text-[10px] text-muted-foreground mt-1">Provee o construye el bien</span>
          </motion.div>

          {/* Entidad pública */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: "87.5%", top: "80%", transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <div className="px-5 py-3 bg-muted/80 border border-border rounded-lg shadow-sm text-center">
              <User className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <span className="text-xs md:text-sm font-semibold text-foreground">Entidad pública</span>
            </div>
            <span className="text-[10px] text-muted-foreground mt-1">Requiere bienes productivos</span>
          </motion.div>

          {/* Center icons (decorative) */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{ left: "50%", top: "55%", transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 1.0 }}
          >
            <div className="grid grid-cols-2 gap-2 opacity-40">
              <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                <Building className="w-5 h-5 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </SubZoomContainer>
    </div>
  );
};
