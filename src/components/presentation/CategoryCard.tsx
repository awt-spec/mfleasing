import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";

export interface CategoryCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  tags: { icon: LucideIcon; label: string }[];
  buttonColor: string;
  itemCount: number;
  onClick: () => void;
  delay?: number;
}

export const CategoryCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  tags,
  buttonColor,
  itemCount,
  onClick,
  delay = 0,
}: CategoryCardProps) => {
  return (
    <motion.div
      className="bg-card rounded-2xl border border-border shadow-lg p-6 flex flex-col h-full"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)" }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <motion.div
          className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
        >
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* Tags grid */}
      <div className="flex-1 mb-5">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.div
              key={tag.label}
              className="flex items-center gap-2 px-3 py-2 bg-muted/60 rounded-lg text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.3 + index * 0.05 }}
            >
              <tag.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{tag.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action button */}
      <motion.button
        className={`w-full py-3 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 ${buttonColor}`}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4 }}
      >
        Ver {itemCount} configuraciones
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};
