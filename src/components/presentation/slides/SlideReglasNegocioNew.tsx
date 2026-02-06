import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, CreditCard, Users, Percent, FileText, Coins, BookOpen, Calendar, Clock, Bookmark, DollarSign, Receipt, User, FileCheck, AlertCircle } from "lucide-react";
import { CategoryCard } from "../CategoryCard";
import { DetailCard } from "../DetailCard";
import { SubzoomHeader } from "../SubzoomHeader";
import { CategoryLegend } from "../CategoryLegend";
import { SubZoomContainer } from "../SubZoomContainer";

// Category definitions
const categories = [
  {
    id: "config",
    icon: Settings,
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    title: "Configuración General",
    description: "Parámetros base del sistema",
    buttonColor: "bg-gradient-to-r from-red-500 to-red-600",
    itemCount: 8,
    tags: [
      { icon: Percent, label: "Tasa de Interés" },
      { icon: FileText, label: "Tipos de Producto" },
      { icon: Coins, label: "Tipo de Moneda" },
      { icon: BookOpen, label: "Asientos Contables" },
    ],
    details: [
      { icon: Percent, title: "Tasa de Interés", description: "Configuración de tasas base y spread", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: FileText, title: "Tipos de Producto", description: "Arrendamiento puro, financiero", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: Coins, title: "Tipo de Moneda", description: "Monedas permitidas y conversiones", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: BookOpen, title: "Asientos Contables", description: "Configuración de cuentas y centros", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: DollarSign, title: "Cargos y Comisiones", description: "Estructura de cobros adicionales", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: Calendar, title: "Días de Gracia", description: "Períodos de tolerancia configurables", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { icon: Clock, title: "Plazos Máximos", description: "Límites de tiempo por operación", iconBg: "bg-amber-100", iconColor: "text-amber-600", highlighted: true },
      { icon: Bookmark, title: "Catálogos Base", description: "Datos maestros del sistema", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
    ],
  },
  {
    id: "credito",
    icon: CreditCard,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Líneas de Crédito",
    description: "Gestión de límites y condiciones",
    buttonColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    itemCount: 8,
    tags: [
      { icon: FileText, label: "Definición de Línea" },
      { icon: DollarSign, label: "Monto Mín/Máx" },
      { icon: Receipt, label: "Monto por Factura" },
      { icon: Percent, label: "Cobro de Interés" },
    ],
    details: [
      { icon: FileText, title: "Definición de Línea", description: "Parámetros de línea de crédito", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
      { icon: DollarSign, title: "Monto Mín/Máx", description: "Límites de montos autorizados", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
      { icon: Receipt, title: "Monto por Factura", description: "Límites por documento", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
      { icon: Percent, title: "Cobro de Interés", description: "Tasas y periodicidad", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
      { icon: Calendar, title: "Vigencia", description: "Fecha de apertura y vencimiento", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
      { icon: Clock, title: "Periodicidad de Pago", description: "Frecuencia de cobros", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
      { icon: FileCheck, title: "Garantías", description: "Requisitos de garantía", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
      { icon: AlertCircle, title: "Restricciones", description: "Límites y condiciones especiales", iconBg: "bg-amber-100", iconColor: "text-amber-600", highlighted: true },
    ],
  },
  {
    id: "pagadores",
    icon: Users,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "Pagadores",
    description: "Configuración de deudores",
    buttonColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    itemCount: 8,
    tags: [
      { icon: User, label: "Registro de Pagador" },
      { icon: FileText, label: "Límites Asignados" },
      { icon: Settings, label: "Condiciones Espec..." },
      { icon: Clock, label: "Días de Mora" },
    ],
    details: [
      { icon: User, title: "Registro de Pagador", description: "Datos del deudor", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
      { icon: FileText, title: "Límites Asignados", description: "Montos autorizados por pagador", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
      { icon: Settings, title: "Condiciones Especiales", description: "Parámetros personalizados", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
      { icon: Clock, title: "Días de Mora", description: "Tolerancia de atraso", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
      { icon: AlertCircle, title: "Calificación", description: "Score crediticio", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
      { icon: FileCheck, title: "Documentación", description: "Expediente del cliente", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
      { icon: Bookmark, title: "Historial", description: "Comportamiento de pago", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
      { icon: Receipt, title: "Facturación", description: "Configuración de cobros", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
    ],
  },
];

const legendItems = [
  { color: "bg-red-500", label: "Config. General" },
  { color: "bg-emerald-500", label: "Líneas de Crédito" },
  { color: "bg-amber-500", label: "Pagadores" },
];

const detailLegendItems = [
  { color: "bg-blue-500", label: "Configuración base" },
  { color: "bg-gray-400", label: "Parámetros secundarios" },
  { color: "bg-emerald-500", label: "Control y validación" },
  { color: "bg-amber-500", label: "Restricciones" },
];

export const SlideReglasNegocioNew = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const activeCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          // Main category view
          <motion.div
            key="categories"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <SubZoomContainer delay={0.1} direction="zoom" className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Settings className="w-10 h-10 text-primary" />
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Reglas de Negocio
                </h2>
              </div>
              <p className="text-lg text-muted-foreground">
                Selecciona una categoría para ver sus configuraciones
              </p>
            </SubZoomContainer>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  {...category}
                  delay={0.2 + index * 0.15}
                  onClick={() => setSelectedCategory(category.id)}
                />
              ))}
            </div>

            <CategoryLegend items={legendItems} />
          </motion.div>
        ) : (
          // Detail subzoom view
          <motion.div
            key="details"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {activeCategory && (
              <>
                <SubzoomHeader
                  icon={activeCategory.icon}
                  iconBg={activeCategory.iconBg}
                  iconColor={activeCategory.iconColor}
                  title={activeCategory.title}
                  description={activeCategory.description}
                  itemCount={activeCategory.itemCount}
                  onBack={() => setSelectedCategory(null)}
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {activeCategory.details.map((detail, index) => (
                    <DetailCard
                      key={detail.title}
                      {...detail}
                      delay={0.1 + index * 0.08}
                    />
                  ))}
                </div>

                <CategoryLegend items={detailLegendItems} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
