import { motion } from "framer-motion";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

type FlowVariant = "default" | "success" | "danger" | "warning" | "decision" | "info" | "special";

interface FlowBoxProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  variant?: FlowVariant;
  delay?: number;
  className?: string;
  children?: ReactNode;
}

const variantStyles: Record<FlowVariant, string> = {
  default: "border-border bg-card hover:border-primary/50",
  success: "border-emerald-500/50 bg-emerald-50/80 dark:bg-emerald-950/30 hover:border-emerald-500",
  danger: "border-red-500/50 bg-red-50/80 dark:bg-red-950/30 hover:border-red-500",
  warning: "border-amber-500/50 bg-amber-50/80 dark:bg-amber-950/30 hover:border-amber-500",
  decision: "border-blue-500/50 bg-blue-50/80 dark:bg-blue-950/30 hover:border-blue-500",
  info: "border-sky-500/50 bg-sky-50/80 dark:bg-sky-950/30 hover:border-sky-500",
  special: "border-purple-500/50 bg-purple-50/80 dark:bg-purple-950/30 hover:border-purple-500",
};

const iconColors: Record<FlowVariant, string> = {
  default: "text-primary",
  success: "text-emerald-600",
  danger: "text-red-600",
  warning: "text-amber-600",
  decision: "text-blue-600",
  info: "text-sky-600",
  special: "text-purple-600",
};

export const FlowBox = ({
  icon: Icon,
  title,
  description,
  variant = "default",
  delay = 0,
  className = "",
  children,
}: FlowBoxProps) => {
  return (
    <motion.div
      className={`flow-box ${variantStyles[variant]} ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: delay + 0.2, duration: 0.4, type: "spring" }}
          >
            <Icon className={`w-6 h-6 ${iconColors[variant]}`} />
          </motion.div>
        )}
        <div className="flex-1">
          <motion.h4
            className="font-semibold text-foreground text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.15 }}
          >
            {title}
          </motion.h4>
          {description && (
            <motion.p
              className="text-xs text-muted-foreground mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.25 }}
            >
              {description}
            </motion.p>
          )}
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// Decision diamond component
interface DecisionBoxProps {
  label: string;
  delay?: number;
}

export const DecisionBox = ({ label, delay = 0 }: DecisionBoxProps) => (
  <motion.div
    className="relative flex items-center justify-center"
    initial={{ opacity: 0, scale: 0, rotate: 45 }}
    animate={{ opacity: 1, scale: 1, rotate: 45 }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 150 }}
  >
    <div className="w-20 h-20 bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
      <span className="-rotate-45 text-xs font-semibold text-blue-700 text-center px-1">
        {label}
      </span>
    </div>
  </motion.div>
);

// Connector arrow
interface ConnectorProps {
  direction?: "right" | "down" | "left" | "up";
  delay?: number;
}

export const Connector = ({ direction = "right", delay = 0 }: ConnectorProps) => {
  const rotations = {
    right: "rotate-0",
    down: "rotate-90",
    left: "rotate-180",
    up: "-rotate-90",
  };

  return (
    <motion.div
      className={`flex items-center justify-center ${rotations[direction]}`}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <div className="w-8 h-0.5 bg-muted-foreground/40" />
      <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-muted-foreground/40" />
    </motion.div>
  );
};
