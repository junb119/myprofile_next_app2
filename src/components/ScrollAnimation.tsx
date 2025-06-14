"use client";

import { useScrollAnimation } from "@/hook/useScrollAnimation";
import { Variant, motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  effect?: Variant;
  threshold?: number;
  className?: string;
}

export default function ScrollAnimation({
  children,
  effect = {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
  threshold,
  className,
}: AnimatedSectionProps) {
  const { ref, controls } = useScrollAnimation(effect, { threshold });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
