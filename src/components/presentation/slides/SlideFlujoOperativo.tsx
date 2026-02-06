import { motion } from "framer-motion";
import { Building, User, Truck, FileCheck, Handshake, Package } from "lucide-react";
import { FlowBox } from "../FlowBox";
import { SubZoomContainer, StaggerContainer, StaggerItem } from "../SubZoomContainer";

export const SlideFlujoOperativo = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Flujo Operativo
        </h2>
        <p className="text-xl text-primary font-semibold">
          Proceso de Arrendamiento Financiero
        </p>
      </SubZoomContainer>

      {/* Main flow diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Column 1 - Proveedor */}
        <SubZoomContainer delay={0.3} direction="left">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-700 rounded-full text-sm font-semibold">
              Proveedor
            </span>
          </motion.div>
          <StaggerContainer className="space-y-4" staggerDelay={0.15} initialDelay={0.5}>
            <StaggerItem>
              <FlowBox
                icon={Truck}
                title="Identifica el bien"
                description="Localización del activo requerido"
                variant="warning"
              />
            </StaggerItem>
            <StaggerItem>
              <FlowBox
                icon={Package}
                title="Provee o construye"
                description="Preparación del activo"
                variant="warning"
              />
            </StaggerItem>
            <StaggerItem>
              <FlowBox
                icon={FileCheck}
                title="Entrega el bien"
                description="Transferencia al arrendatario"
                variant="success"
              />
            </StaggerItem>
          </StaggerContainer>
        </SubZoomContainer>

        {/* Column 2 - Banco/Leasing */}
        <SubZoomContainer delay={0.5} direction="bottom">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold">
              Banco o Empresa de Leasing
            </span>
          </motion.div>
          <StaggerContainer className="space-y-4" staggerDelay={0.15} initialDelay={0.7}>
            <StaggerItem>
              <FlowBox
                icon={Building}
                title="Persona autorizada"
                description="Operaciones o leasing financiero"
                variant="default"
              />
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="p-6 rounded-xl bg-primary/10 border-2 border-primary text-center"
                whileHover={{ scale: 1.02 }}
              >
                <Handshake className="w-10 h-10 text-primary mx-auto mb-2" />
                <h4 className="font-bold text-primary">Contrato de Arrendamiento</h4>
                <p className="text-xs text-muted-foreground mt-1">Formalización legal</p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </SubZoomContainer>

        {/* Column 3 - Entidad */}
        <SubZoomContainer delay={0.7} direction="right">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-700 rounded-full text-sm font-semibold">
              Entidad Pública
            </span>
          </motion.div>
          <StaggerContainer className="space-y-4" staggerDelay={0.15} initialDelay={0.9}>
            <StaggerItem>
              <FlowBox
                icon={User}
                title="Requiere bienes productivos"
                description="Necesidad identificada"
                variant="decision"
              />
            </StaggerItem>
            <StaggerItem>
              <FlowBox
                icon={FileCheck}
                title="Recibe el bien"
                description="Inicio de operaciones"
                variant="success"
              />
            </StaggerItem>
          </StaggerContainer>
        </SubZoomContainer>
      </div>

      {/* Connecting arrows visual */}
      <SubZoomContainer delay={1.1} direction="zoom" className="mt-8">
        <motion.div
          className="flex items-center justify-center gap-4 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-xs font-medium px-4 py-1 bg-muted rounded-full">Flujo continuo</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>
      </SubZoomContainer>
    </div>
  );
};
