import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface DetailCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  highlighted?: boolean;
  delay?: number;
  onClick?: () => void;
}

export const DetailCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  highlighted = false,
  delay = 0,
  onClick,
}: DetailCardProps) => {
  return (
    <motion.div
      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
        highlighted 
          ? "bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800" 
          : "bg-card border-border hover:border-primary/30"
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
    >
      <motion.div
        className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.15, type: "spring", stiffness: 200 }}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </motion.div>
      <h4 className="font-bold text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};
