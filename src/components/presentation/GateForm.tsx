import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface GateFormProps {
  open: boolean;
  onComplete: (answers: Record<string, string>) => void;
  gateId: number;
  hasActiveOperation: boolean;
}

export const GateForm = ({ open, onComplete, gateId, hasActiveOperation }: GateFormProps) => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string>("");
  const [subSelected, setSubSelected] = useState<string>("");
  const [showSub, setShowSub] = useState(false);

  // Contact form fields
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const doComplete = (main: string, sub: string) => {
    onComplete({ main, sub });
    setSelected("");
    setSubSelected("");
    setShowSub(false);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setSubSelected("");

    if (gateId === 1 && value === "no") {
      setShowSub(true);
      return;
    }
    doComplete(value, "");
  };

  const handleSubSelect = (value: string) => {
    setSubSelected(value);
    doComplete(selected, value);
  };

  const handleContactSubmit = () => {
    if (!company.trim() || !email.trim()) return;
    onComplete({ main: company.trim(), email: email.trim(), whatsapp: whatsapp.trim() });
  };

  const config = getGateConfig(gateId, t, hasActiveOperation);
  if (!config) return null;

  const isContactGate = gateId === 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            className="relative bg-card border border-border rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C42126] rounded-t-2xl" />
            <h3 className="text-lg font-bold text-foreground mb-1 mt-2">{config.title}</h3>
            {config.subtitle && (
              <p className="text-sm text-muted-foreground mb-4">{config.subtitle}</p>
            )}

            {isContactGate ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">{t("gate0.company")}</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:border-[#C42126] transition-colors"
                    placeholder={t("gate0.company.placeholder")}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">{t("gate0.email")}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:border-[#C42126] transition-colors"
                    placeholder={t("gate0.email.placeholder")}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">{t("gate0.whatsapp")}</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:border-[#C42126] transition-colors"
                    placeholder={t("gate0.whatsapp.placeholder")}
                  />
                </div>
                <button
                  onClick={handleContactSubmit}
                  disabled={!company.trim() || !email.trim()}
                  className="w-full mt-2 px-4 py-3 rounded-xl bg-[#C42126] text-white font-bold text-sm disabled:opacity-40 hover:bg-[#a81b1f] transition-colors"
                >
                  {t("gate0.continue")}
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {config.options!.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                        selected === opt.value
                          ? "border-[#C42126] bg-[#C42126]/10 text-foreground"
                          : "border-border bg-card hover:border-[#C42126]/40 text-foreground/80"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selected === opt.value ? "border-[#C42126]" : "border-muted-foreground/40"
                        }`}>
                          {selected === opt.value && <span className="w-2 h-2 rounded-full bg-[#C42126]" />}
                        </span>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {showSub && config.subOptions && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm font-semibold text-foreground mb-2 mt-4">{config.subTitle}</p>
                      <div className="space-y-2">
                        {config.subOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleSubSelect(opt.value)}
                            className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                              subSelected === opt.value
                                ? "border-[#C42126] bg-[#C42126]/10 text-foreground"
                                : "border-border bg-card hover:border-[#C42126]/40 text-foreground/80"
                            }`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                subSelected === opt.value ? "border-[#C42126]" : "border-muted-foreground/40"
                              }`}>
                                {subSelected === opt.value && <span className="w-2 h-2 rounded-full bg-[#C42126]" />}
                              </span>
                              {opt.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface GateConfig {
  title: string;
  subtitle?: string;
  options?: { label: string; value: string }[];
  subTitle?: string;
  subOptions?: { label: string; value: string }[];
}

function getGateConfig(gateId: number, t: (k: string) => string, hasActiveOperation: boolean): GateConfig | null {
  switch (gateId) {
    case 0:
      return {
        title: t("gate0.title"),
        subtitle: t("gate0.subtitle"),
      };
    case 1:
      return {
        title: t("gate1.title"),
        options: [
          { label: t("gate.yes"), value: "yes" },
          { label: t("gate.no"), value: "no" },
        ],
        subTitle: t("gate2.title"),
        subOptions: [
          { label: "1–25", value: "1-25" },
          { label: "26–100", value: "26-100" },
          { label: "101–500", value: "101-500" },
          { label: "501–2,000", value: "501-2000" },
          { label: ">2,000", value: "2000+" },
        ],
      };
    case 3:
      return {
        title: t("gate3.title"),
        options: [
          { label: t("gate.yes"), value: "yes" },
          { label: t("gate.no"), value: "no" },
        ],
      };
    case 4:
      return {
        title: hasActiveOperation ? t("gate4.title") : t("gate4.title.prospect"),
        subtitle: hasActiveOperation ? t("gate4.subtitle") : t("gate4.subtitle.prospect"),
        options: [
          { label: "1–5", value: "1-5" },
          { label: "6–15", value: "6-15" },
          { label: "16–50", value: "16-50" },
          { label: "51–200", value: "51-200" },
          { label: ">200", value: "200+" },
        ],
      };
    case 5:
      return {
        title: hasActiveOperation ? t("gate6.title") : t("gate6.title.prospect"),
        options: [
          { label: "1–500", value: "1-500" },
          { label: "501–2,000", value: "501-2000" },
          { label: "2,001–10,000", value: "2001-10000" },
          { label: "10,001–50,000", value: "10001-50000" },
          { label: ">50,000", value: "50000+" },
        ],
      };
    default:
      return null;
  }
}
