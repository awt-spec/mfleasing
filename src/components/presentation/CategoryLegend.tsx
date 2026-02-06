import { motion } from "framer-motion";

interface LegendItem {
  color: string;
  label: string;
}

interface CategoryLegendProps {
  items: LegendItem[];
  activeIndex?: number;
}

export const CategoryLegend = ({ items, activeIndex }: CategoryLegendProps) => {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-6 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          className={`flex items-center gap-2 ${activeIndex !== undefined && activeIndex !== index ? "opacity-40" : ""}`}
          whileHover={{ scale: 1.05 }}
        >
          <div className={`w-3 h-3 rounded-full ${item.color}`} />
          <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
