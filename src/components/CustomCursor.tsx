"use client";

import { style } from "framer-motion/client";
import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;

    if (isPointerFine && !isTouch) {
      setEnabled(true);
    }

    if (!(isPointerFine && !isTouch)) return;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        const cursor = cursorRef.current;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);

        animationRef.current = requestAnimationFrame(() => {
          cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      // ref={cursorRef}
      // className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] w-24 h-24 rounded-full bg-white mix-blend-difference opacity-80 transition-transform duration-150 ease-out"
    />
  );
};

export default CustomCursor;
