import { useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";

export function useScrollAnimation(
  effect: Variant,
  options: { threshold?: number } = {}
) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    once: true,
    amount: options.threshold || 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start(effect);
    }
  }, [inView]);

  return { ref, controls };
}
