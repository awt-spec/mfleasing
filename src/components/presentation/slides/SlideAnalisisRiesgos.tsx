import { motion } from "framer-motion";
import { Shield, Brain, BarChart3, Code, Sparkles, Globe, Layout, Database, Zap, Eye, Lock, Activity } from "lucide-react";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

const policyTypes = [
  { icon: Shield, label: "Test Binario", desc: "Validación de condiciones", color: "from-blue-500 to-blue-600" },
  { icon: Brain, label: "Decisión", desc: "Árboles de decisión", color: "from-purple-500 to-purple-600" },
  { icon: BarChart3, label: "Cálculo", desc: "Modelos cuantitativos", color: "from-emerald-500 to-emerald-600" },
  { icon: Layout, label: "Matriz", desc: "Reglas cruzadas", color: "from-amber-500 to-amber-600" },
];

const capabilities = [
  { icon: Code, label: "Editor gráfico-web", desc: "Diseño visual de reglas" },
  { icon: Database, label: "Datos en tiempo real", desc: "Conexión a múltiples fuentes" },
  { icon: Sparkles, label: "Inteligencia Artificial", desc: "Modelos predictivos y scoring" },
  { icon: Globe, label: "API REST", desc: "Integración con cualquier sistema" },
];

const metrics = [
  { icon: Zap, value: "< 200ms", label: "Tiempo de respuesta" },
  { icon: Eye, value: "100%", label: "Trazabilidad" },
  { icon: Lock, value: "SOX", label: "Cumplimiento" },
  { icon: Activity, value: "24/7", label: "Monitoreo" },
];

export const SlideAnalisisRiesgos = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
          Análisis de Riesgos
        </h2>
        <p className="text-base text-primary font-semibold">
          Motor de Políticas & Administración de Reglas
        </p>
      </SubZoomContainer>

      {/* Policy types - hero cards */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" staggerDelay={0.12} initialDelay={0.3}>
        {policyTypes.map((item) => (
          <StaggerItem key={item.label}>
            <motion.div
              className="relative overflow-hidden rounded-xl p-4 text-white shadow-lg cursor-pointer"
              style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
              whileHover={{ scale: 1.04, y: -3 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-100`} />
              <div className="relative z-10">
                <item.icon className="w-8 h-8 mb-2 opacity-90" />
                <h3 className="font-bold text-sm">{item.label}</h3>
                <p className="text-[10px] opacity-80 mt-0.5">{item.desc}</p>
              </div>
              {/* Decorative circle */}
              <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10" />
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Two columns: Capabilities + Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Capabilities - 3 cols */}
        <SubZoomContainer delay={0.7} direction="left" className="md:col-span-3">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-sm h-full relative overflow-hidden">
            {/* Tech grid background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
            <h3 className="relative text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <code className="text-xs font-mono text-primary ml-1">funcionalidades.config</code>
            </h3>
            <div className="relative grid grid-cols-2 gap-3">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.label}
                  className="relative flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20 group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)] transition-shadow">
                    <cap.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block font-mono">{cap.label}</span>
                    <span className="text-[10px] text-muted-foreground">{cap.desc}</span>
                  </div>
                  {/* Blinking cursor indicator */}
                  <motion.div
                    className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
            {/* Terminal-style footer */}
            <div className="relative mt-3 pt-2 border-t border-border/50">
              <code className="text-[9px] text-muted-foreground/60 font-mono">
                <span className="text-green-500">●</span> 4 módulos activos — latencia {"<"} 200ms — uptime 99.9%
              </code>
            </div>
          </div>
        </SubZoomContainer>

        {/* Metrics - 2 cols */}
        <SubZoomContainer delay={0.8} direction="right" className="md:col-span-2">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-sm h-full">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Métricas Clave
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="text-center p-3 rounded-xl bg-muted/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 + i * 0.1, type: "spring" }}
                >
                  <m.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <motion.span
                    className="text-lg font-extrabold text-foreground block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    {m.value}
                  </motion.span>
                  <span className="text-[10px] text-muted-foreground">{m.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </SubZoomContainer>
      </div>

      {/* Bottom badges */}
      <SubZoomContainer delay={1.4} direction="top" className="mt-5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["Dashboard en tiempo real", "Alta conectividad", "IA Predictiva", "No-Code"].map((badge, i) => (
            <motion.span
              key={badge}
              className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.08 }}
              whileHover={{ scale: 1.05 }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </SubZoomContainer>
    </div>
  );
};
