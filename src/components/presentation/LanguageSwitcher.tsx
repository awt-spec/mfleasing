import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const flags: Record<Language, string> = {
  es: "🇪🇸",
  en: "🇺🇸",
  fr: "🇫🇷",
  ko: "🇰🇷",
  pl: "🇵🇱",
  bg: "🇧🇬",
};

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages: Language[] = ["es", "en", "fr", "ko", "pl", "bg"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-card/80 border border-border hover:border-[#C42126]/40 transition-colors text-sm font-medium text-foreground"
      >
        <Globe className="w-4 h-4" />
        <span>{flags[language]}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden min-w-[140px] z-[60]"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-muted transition-colors ${
                  language === lang ? "bg-[#C42126]/10 text-[#C42126] font-semibold" : "text-foreground"
                }`}
              >
                <span>{flags[lang]}</span>
                <span>{t(`lang.${lang}`)}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {open && (
        <div className="fixed inset-0 z-[59]" onClick={() => setOpen(false)} />
      )}
    </div>
  );
};
