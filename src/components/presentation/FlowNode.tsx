import { motion } from "framer-motion";
import { LucideIcon, ArrowDown } from "lucide-react";

export interface FlowNodeProps {
  icon: LucideIcon;
  title: string;
  variant: "primary" | "secondary" | "accent" | "muted";
  delay?: number;
  showArrow?: boolean;
  isBranch?: boolean;
  branchDirection?: "left" | "right";
}

const variantStyles = {
  primary: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    border: "border-amber-300 dark:border-amber-700",
    iconBg: "bg-amber-200 dark:bg-amber-800",
    iconColor: "text-amber-700 dark:text-amber-300",
  },
  secondary: {
    bg: "bg-red-100 dark:bg-red-900/30",
    border: "border-red-300 dark:border-red-700",
    iconBg: "bg-red-200 dark:bg-red-800",
    iconColor: "text-red-700 dark:text-red-300",
  },
  accent: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    border: "border-orange-300 dark:border-orange-700",
    iconBg: "bg-orange-200 dark:bg-orange-800",
    iconColor: "text-orange-700 dark:text-orange-300",
  },
  muted: {
    bg: "bg-card",
    border: "border-border",
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
  },
};

export const FlowNode = ({
  icon: Icon,
  title,
  variant,
  delay = 0,
  showArrow = true,
  isBranch = false,
  branchDirection,
}: FlowNodeProps) => {
  const styles = variantStyles[variant];

  return (
    <motion.div
      className={`flex flex-col items-center ${isBranch ? (branchDirection === "left" ? "mr-8" : "ml-8") : ""}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`px-6 py-4 rounded-2xl ${styles.bg} border-2 ${styles.border} min-w-[200px] text-center`}
        whileHover={{ scale: 1.05, y: -2 }}
      >
        <motion.div
          className={`w-10 h-10 rounded-lg ${styles.iconBg} flex items-center justify-center mx-auto mb-2`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.1, type: "spring" }}
        >
          <Icon className={`w-5 h-5 ${styles.iconColor}`} />
        </motion.div>
        <span className="font-semibold text-sm text-foreground">{title}</span>
      </motion.div>
      
      {showArrow && (
        <motion.div
          className="my-2 text-muted-foreground"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          <div className="w-px h-6 bg-muted-foreground/40 mx-auto" />
          <ArrowDown className="w-4 h-4 mx-auto -mt-1" />
        </motion.div>
      )}
    </motion.div>
  );
};

// Flow connector for branches
export const FlowBranchConnector = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="flex items-center justify-center my-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
  >
    <div className="flex items-end gap-8">
      <div className="w-20 h-px bg-muted-foreground/40" />
      <ArrowDown className="w-4 h-4 text-muted-foreground -mb-1" />
      <div className="w-20 h-px bg-muted-foreground/40" />
    </div>
  </motion.div>
);
