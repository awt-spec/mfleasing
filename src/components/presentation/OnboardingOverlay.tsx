import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Smartphone, MousePointerClick, Keyboard, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "sysde-onboarding-seen";

export const OnboardingOverlay = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  const tips = [
    { icon: ArrowLeftRight, titleKey: "onboarding.tip1.title", descKey: "onboarding.tip1.desc" },
    { icon: Smartphone, titleKey: "onboarding.tip2.title", descKey: "onboarding.tip2.desc" },
    { icon: MousePointerClick, titleKey: "onboarding.tip3.title", descKey: "onboarding.tip3.desc" },
    { icon: Keyboard, titleKey: "onboarding.tip4.title", descKey: "onboarding.tip4.desc" },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            className="bg-card border border-border rounded-3xl shadow-2xl p-8 max-w-md w-[90vw] relative"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <h2 className="text-2xl font-bold text-foreground mb-1 text-center">
              {t("onboarding.title")}
            </h2>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              {t("onboarding.subtitle")}
            </p>

            <div className="space-y-4">
              {tips.map((tip, i) => (
                <motion.div
                  key={tip.titleKey}
                  className="flex items-start gap-4 p-3 rounded-xl bg-muted/50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <tip.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{t(tip.titleKey)}</h3>
                    <p className="text-xs text-muted-foreground">{t(tip.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="w-full mt-6 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
              onClick={dismiss}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("onboarding.dismiss")}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
