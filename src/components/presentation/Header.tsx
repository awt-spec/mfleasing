import { motion } from "framer-motion";
import logoSysde from "@/assets/logo_sysde.png";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  showLogo?: boolean;
}

export const Header = ({ showLogo = true }: HeaderProps) => {
  const { t } = useLanguage();

  if (!showLogo) return null;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center p-1">
            <img src={logoSysde} alt="Sysde" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">{t("header.title")}</h1>
            <p className="text-xs text-muted-foreground">{t("header.subtitle")}</p>
          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </motion.header>
  );
};
