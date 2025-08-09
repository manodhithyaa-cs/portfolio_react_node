import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInTextProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

const FadeInText = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = "up",
  className = "" 
}: FadeInTextProps) => {
  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionMap[direction]
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInText;