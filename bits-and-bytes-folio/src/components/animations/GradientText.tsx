import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

const GradientText = ({ children, className = "", animate = true }: GradientTextProps) => {
  return (
    <motion.span
      className={`bg-text-gradient bg-clip-text text-transparent ${className}`}
      initial={animate ? { backgroundPosition: "200% center" } : {}}
      animate={animate ? { 
        backgroundPosition: ["200% center", "0% center", "-200% center"]
      } : {}}
      transition={animate ? {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      } : {}}
      style={{
        backgroundSize: "200% 200%"
      }}
    >
      {children}
    </motion.span>
  );
};

export default GradientText;