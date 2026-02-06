import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, FileText, ClipboardList, BarChart3, CheckCircle, FileCheck, Handshake, TrendingUp, UserCheck, Briefcase, Target, Phone, MessageSquare, Calendar, DollarSign, Receipt, Shield } from "lucide-react";
import { CategoryCard } from "../CategoryCard";
import { SubzoomHeader } from "../SubzoomHeader";
import { CategoryLegend } from "../CategoryLegend";
import { FlowNode } from "../FlowNode";
import { SubZoomContainer } from "../SubZoomContainer";

// Process categories
const processes = [
  {
    id: "originacion",
    icon: Users,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "Originación",
    description: "Proceso de prospección y evaluación",
    buttonColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    itemCount: 6,
    tag: "Diagrama de flujo",
    tags: [
      { icon: Phone, label: "Contacto" },
      { icon: Search, label: "Identificación" },
      { icon: FileText, label: "Documentación" },
      { icon: BarChart3, label: "Evaluación" },
    ],
    flowSteps: [
      { icon: UserCheck, title: "Contacto del prospecto", variant: "primary" as const, isBranch: false, branchLeft: false, branchRight: false },
      { icon: Search, title: "Identificación de necesidad", variant: "secondary" as const, isBranch: false, branchLeft: false, branchRight: false },
      { icon: FileText, title: "Documentación del cliente", variant: "secondary" as const, isBranch: false, branchLeft: false, branchRight: false },
      { icon: ClipboardList, title: "Recuperación SLA prospecto", variant: "muted" as const, isBranch: true, branchLeft: false, branchRight: false },
      { icon: FileCheck, title: "Datos de buró", variant: "muted" as const, isBranch: false, branchLeft: true, branchRight: false },
      { icon: BarChart3, title: "Evaluación de prospecto", variant: "accent" as const, isBranch: false, branchLeft: false, branchRight: true },
    ],
  },
  {
    id: "cotizacion",
    icon: Receipt,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    title: "Cotización",
    description: "Generación de propuestas comerciales",
    buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    itemCount: 5,
    tag: "Diagrama de flujo",
    tags: [
      { icon: DollarSign, label: "Precio" },
      { icon: Calendar, label: "Plazos" },
      { icon: FileText, label: "Condiciones" },
      { icon: CheckCircle, label: "Aprobación" },
    ],
    flowSteps: [
      { icon: Target, title: "Definir condiciones", variant: "primary" as const, isBranch: false, branchLeft: false, branchRight: false },
      { icon: DollarSign, title: "Calcular rentas", variant: "primary" as const, isBranch: false, branchLeft: false, branchRight: false },
      { icon: FileText, title: "Generar propuesta", variant: "secondary" as const, isBranch: false, branchLeft: false, branchRight: false },
      { icon: MessageSquare, title: "Negociación", variant: "accent" as const, isBranch: false, branchLeft: false, branchRight: false },
      { icon: CheckCircle, title: "Aprobación cliente", variant: "muted" as const, isBranch: false, branchLeft: false, branchRight: false },
    ],
  },
  {
    id: "formalizacion",
    icon: Handshake,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Formalización",
    description: "Cierre y firma de contratos",
    buttonColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    itemCount: 4,
    tag: "Diagrama de flujo",
    tags: [
      { icon: FileCheck, label: "Contrato" },
      { icon: Shield, label: "Garantías" },
      { icon: Briefcase, label: "Activos" },
      { icon: TrendingUp, label: "Activación" },
    ],
    flowSteps: [
      { icon: FileCheck, title: "Generación de contrato", variant: "primary" as const, isBranch: false, branchLeft: false, branchRight: false },
      { icon: Shield, title: "Registro de garantías", variant: "secondary" as const, isBranch: false, branchLeft: false, branchRight: false },
      { icon: Briefcase, title: "Alta de activos", variant: "secondary" as const, isBranch: false, branchLeft: false, branchRight: false },
      { icon: TrendingUp, title: "Activación de operación", variant: "accent" as const, isBranch: false, branchLeft: false, branchRight: false },
    ],
  },
];

const legendItems = [
  { color: "bg-amber-500", label: "Originación" },
  { color: "bg-blue-500", label: "Cotización" },
  { color: "bg-emerald-500", label: "Formalización" },
];

export const SlideProcesosFlow = () => {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  
  const activeProcess = processes.find(p => p.id === selectedProcess);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedProcess ? (
          // Main process view
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
                  Macro Procesos
                </h2>
              </div>
              <p className="text-lg text-muted-foreground">
                Selecciona un proceso para ver su diagrama de flujo
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
          // Flow diagram subzoom
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

                {/* Flow diagram container */}
                <motion.div
                  className="p-8 rounded-3xl bg-card border border-border shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex flex-col items-center">
                    {activeProcess.flowSteps.map((step, index) => {
                      // Check if this is a branch start
                      if (step.isBranch) {
                        return (
                          <div key={step.title} className="w-full">
                            <FlowNode
                              icon={step.icon}
                              title={step.title}
                              variant={step.variant}
                              delay={0.3 + index * 0.15}
                              showArrow={true}
                            />
                            {/* Branch container */}
                            <motion.div
                              className="flex justify-center gap-12 mt-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.15 }}
                            >
                              {activeProcess.flowSteps
                                .filter((_, i) => i > index)
                                .map((branchStep, bi) => (
                                  <FlowNode
                                    key={branchStep.title}
                                    icon={branchStep.icon}
                                    title={branchStep.title}
                                    variant={branchStep.variant}
                                    delay={0.6 + bi * 0.1}
                                    showArrow={false}
                                  />
                                ))}
                            </motion.div>
                          </div>
                        );
                      }
                      // Skip items that are part of a branch (already rendered)
                      const prevStep = activeProcess.flowSteps[index - 1];
                      if (prevStep?.isBranch) return null;
                      if (step.branchLeft || step.branchRight) return null;

                      return (
                        <FlowNode
                          key={step.title}
                          icon={step.icon}
                          title={step.title}
                          variant={step.variant}
                          delay={0.3 + index * 0.15}
                          showArrow={index < activeProcess.flowSteps.length - 1 && !activeProcess.flowSteps[index + 1]?.isBranch}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
