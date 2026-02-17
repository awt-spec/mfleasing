import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "es" | "en" | "fr" | "ko";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Header
    "header.title": "Sysde",
    "header.subtitle": "Arrendamiento",
    "header.demo": "Agendar una Demo",
    // Slide labels
    "slide.inicio": "Inicio",
    "slide.flujo": "Flujo",
    "slide.reglas": "Reglas",
    "slide.riesgos": "Riesgos",
    "slide.comerciales": "Comerciales",
    "slide.formalizacion": "Formalización",
    "slide.activos": "Activos",
    "slide.reportes": "Reportes",
    "slide.cierre": "Cierre",
    // Gate forms
    "gate.continue": "Continuar",
    "gate.yes": "Sí",
    "gate.no": "No",
    "gate1.title": "¿Tienen operación activa de leasing hoy?",
    "gate2.title": "Meta de originación mensual (6–12m):",
    "gate3.title": "¿Tienen sistema para administrar leasing?",
    "gate4.title": "Usuarios que operan leasing",
    "gate4.subtitle": "(usuarios internos que requieren acceso al sistema)",
    "gate5.title": "¿Tienen un número confiable de contratos activos?",
    "gate6.title": "Contratos activos:",
    // Language
    "lang.es": "Español",
    "lang.en": "English",
    "lang.fr": "Français",
    "lang.ko": "한국어",
  },
  en: {
    "header.title": "Sysde",
    "header.subtitle": "Leasing",
    "header.demo": "Schedule a Demo",
    "slide.inicio": "Home",
    "slide.flujo": "Flow",
    "slide.reglas": "Rules",
    "slide.riesgos": "Risks",
    "slide.comerciales": "Commercial",
    "slide.formalizacion": "Formalization",
    "slide.activos": "Assets",
    "slide.reportes": "Reports",
    "slide.cierre": "Closing",
    "gate.continue": "Continue",
    "gate.yes": "Yes",
    "gate.no": "No",
    "gate1.title": "Do you have an active leasing operation today?",
    "gate2.title": "Monthly origination goal (6–12m):",
    "gate3.title": "Do you have a system to manage leasing?",
    "gate4.title": "Users operating leasing",
    "gate4.subtitle": "(internal users who need system access)",
    "gate5.title": "Do you have a reliable count of active contracts?",
    "gate6.title": "Active contracts:",
    "lang.es": "Español",
    "lang.en": "English",
    "lang.fr": "Français",
    "lang.ko": "한국어",
  },
  fr: {
    "header.title": "Sysde",
    "header.subtitle": "Crédit-bail",
    "header.demo": "Planifier une Démo",
    "slide.inicio": "Accueil",
    "slide.flujo": "Flux",
    "slide.reglas": "Règles",
    "slide.riesgos": "Risques",
    "slide.comerciales": "Commercial",
    "slide.formalizacion": "Formalisation",
    "slide.activos": "Actifs",
    "slide.reportes": "Rapports",
    "slide.cierre": "Clôture",
    "gate.continue": "Continuer",
    "gate.yes": "Oui",
    "gate.no": "Non",
    "gate1.title": "Avez-vous une opération de leasing active aujourd'hui ?",
    "gate2.title": "Objectif d'origination mensuel (6–12m) :",
    "gate3.title": "Avez-vous un système pour gérer le leasing ?",
    "gate4.title": "Utilisateurs opérant le leasing",
    "gate4.subtitle": "(utilisateurs internes nécessitant un accès au système)",
    "gate5.title": "Avez-vous un nombre fiable de contrats actifs ?",
    "gate6.title": "Contrats actifs :",
    "lang.es": "Español",
    "lang.en": "English",
    "lang.fr": "Français",
    "lang.ko": "한국어",
  },
  ko: {
    "header.title": "Sysde",
    "header.subtitle": "리스",
    "header.demo": "데모 예약",
    "slide.inicio": "홈",
    "slide.flujo": "흐름",
    "slide.reglas": "규칙",
    "slide.riesgos": "위험",
    "slide.comerciales": "상업",
    "slide.formalizacion": "공식화",
    "slide.activos": "자산",
    "slide.reportes": "보고서",
    "slide.cierre": "종료",
    "gate.continue": "계속",
    "gate.yes": "예",
    "gate.no": "아니오",
    "gate1.title": "현재 활성 리스 운영이 있습니까?",
    "gate2.title": "월간 원천 목표 (6–12개월):",
    "gate3.title": "리스를 관리하는 시스템이 있습니까?",
    "gate4.title": "리스를 운영하는 사용자",
    "gate4.subtitle": "(시스템 접근이 필요한 내부 사용자)",
    "gate5.title": "활성 계약 수에 대한 신뢰할 수 있는 숫자가 있습니까?",
    "gate6.title": "활성 계약:",
    "lang.es": "Español",
    "lang.en": "English",
    "lang.fr": "Français",
    "lang.ko": "한국어",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return translations[language]?.[key] ?? translations.es[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
