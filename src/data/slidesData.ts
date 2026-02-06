// Slide images from the PDF
import page2 from "@/assets/slides/page_2.jpg";
import page3 from "@/assets/slides/page_3.jpg";
import page4 from "@/assets/slides/page_4.jpg";
import page5 from "@/assets/slides/page_5.jpg";
import page6 from "@/assets/slides/page_6.jpg";
import page7 from "@/assets/slides/page_7.jpg";
import page8 from "@/assets/slides/page_8.jpg";
import page9 from "@/assets/slides/page_9.jpg";
import page10 from "@/assets/slides/page_10.jpg";
import page11 from "@/assets/slides/page_11.jpg";
import page12 from "@/assets/slides/page_12.jpg";
import page13 from "@/assets/slides/page_13.jpg";
import page14 from "@/assets/slides/page_14.jpg";
import page15 from "@/assets/slides/page_15.jpg";
import page16 from "@/assets/slides/page_16.jpg";
import page17 from "@/assets/slides/page_17.jpg";
import page18 from "@/assets/slides/page_18.jpg";

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  direction: "left" | "right" | "top" | "bottom" | "zoom";
}

export const slidesData: SlideData[] = [
  {
    id: 1,
    title: "Arrendamiento",
    subtitle: "Mapa Funcional",
    image: page2,
    direction: "zoom",
  },
  {
    id: 2,
    title: "Flujo Operativo",
    subtitle: "Proceso de Arrendamiento",
    image: page3,
    direction: "left",
  },
  {
    id: 3,
    title: "Reglas de Negocio",
    subtitle: "Tipos de Arrendamiento",
    image: page4,
    direction: "right",
  },
  {
    id: 4,
    title: "Análisis de Riesgos",
    subtitle: "Administración de Políticas",
    image: page5,
    direction: "top",
  },
  {
    id: 5,
    title: "Macro Procesos",
    subtitle: "Visión General",
    image: page6,
    direction: "zoom",
  },
  {
    id: 6,
    title: "Macro Procesos Comerciales",
    subtitle: "Prospección y Cotización",
    image: page7,
    direction: "left",
  },
  {
    id: 7,
    title: "Prospección y Cotización",
    subtitle: "Líneas de Crédito",
    image: page8,
    direction: "right",
  },
  {
    id: 8,
    title: "Formalización",
    subtitle: "Operación y Postventa",
    image: page9,
    direction: "bottom",
  },
  {
    id: 9,
    title: "Administración de Activos",
    subtitle: "Macro Procesos",
    image: page10,
    direction: "zoom",
  },
  {
    id: 10,
    title: "Contratos e Inventario",
    subtitle: "Gestión de Activos",
    image: page11,
    direction: "left",
  },
  {
    id: 11,
    title: "Pago a Proveedores",
    subtitle: "Cobranza y Facturación",
    image: page12,
    direction: "right",
  },
  {
    id: 12,
    title: "Bitácora",
    subtitle: "Consultas y Reportes",
    image: page13,
    direction: "top",
  },
  {
    id: 13,
    title: "Flujo de Proceso Operativo",
    subtitle: "Gestión de Cobranza",
    image: page14,
    direction: "zoom",
  },
  {
    id: 14,
    title: "Flujo de Seguros",
    subtitle: "Gestión de Arrendamiento",
    image: page15,
    direction: "left",
  },
  {
    id: 15,
    title: "Control de Inventarios",
    subtitle: "Administración de Arrendamiento",
    image: page16,
    direction: "right",
  },
  {
    id: 16,
    title: "Opción de Compra",
    subtitle: "Arrendamiento Financiero",
    image: page17,
    direction: "bottom",
  },
  {
    id: 17,
    title: "Reestructuras",
    subtitle: "Arrendamiento Financiero",
    image: page18,
    direction: "zoom",
  },
];
