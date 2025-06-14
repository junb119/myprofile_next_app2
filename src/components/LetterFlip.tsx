// 📁 components/LetterFlip.tsx
"use client";
import React, { useEffect, useState } from "react";
import "./flip.css";

export const LetterFlip = ({
  from,
  to,
  trigger,
}: {
  from: string;
  to: string;
  trigger: boolean;
}) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (trigger) {
      setFlipped(true);
    }
  }, [trigger]);

  return (
    <span className={`flip-container ${flipped ? "flipped" : ""}`}>
      <span className="flip-front">{from}</span>
      <span className="flip-back">{to}</span>
    </span>
  );
};
