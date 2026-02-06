import { motion } from "framer-motion";
import { ArrowLeft, LucideIcon } from "lucide-react";

interface SubzoomHeaderProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  itemCount?: number;
  tag?: string;
  onBack: () => void;
}

export const SubzoomHeader = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  itemCount,
  tag,
  onBack,
}: SubzoomHeaderProps) => {
  return (
    <motion.div
      className="w-full mb-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back button and tag row */}
      <div className="flex items-center gap-4 mb-4">
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
          onClick={onBack}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </motion.button>
        
        <motion.div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl ${iconBg}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <span className={`font-semibold ${iconColor}`}>{title}</span>
        </motion.div>

        {tag && (
          <motion.span
            className="px-3 py-1 bg-muted rounded-lg text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {tag}
          </motion.span>
        )}
      </div>

      {/* Main header card */}
      <motion.div
        className={`w-full p-6 rounded-2xl bg-gradient-to-r ${iconBg.includes("blue") ? "from-blue-500 to-blue-600" : iconBg.includes("emerald") || iconBg.includes("green") ? "from-emerald-500 to-emerald-600" : iconBg.includes("amber") || iconBg.includes("orange") ? "from-amber-500 to-orange-500" : iconBg.includes("red") ? "from-red-500 to-red-600" : "from-primary to-primary/80"} text-white shadow-xl`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-white/80">{description}</p>
            {itemCount && (
              <p className="text-sm text-white/60 mt-1">{itemCount} configuraciones disponibles</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
