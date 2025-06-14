"use client";
import { useEffect, useRef, useState } from "react";
import "./fade.css";

export default function FadeText({ text = "about" }) {
  const prevText = useRef(text);
  const [displayText, setDisplayText] = useState(text);
  const [fadeOutTrigger, setFadeOutTrigger] = useState(false);
  const [showPrev, setShowPrev] = useState(false);

  useEffect(() => {
    if (prevText.current !== text) {
      setShowPrev(true);
      setFadeOutTrigger(false);

      requestAnimationFrame(() => {
        setFadeOutTrigger(true); // 이게 핵심: 렌더 후 trigger
      });

      const timeout = setTimeout(() => {
        prevText.current = text;
        setDisplayText(text);
        setShowPrev(false); // 이전 텍스트 제거
      }, 1000); // 애니메이션 시간과 일치

      return () => clearTimeout(timeout);
    }
  }, [text]);

  return (
    <div className="fade-wrapper">
      {showPrev && (
        <div
          className={`fade-text test1 ${fadeOutTrigger ? "fade-out" : ""}`}
        >
          {prevText.current}
        </div>
      )}
      <div className={`fade-text test2 fade-in`}>{displayText}</div>
    </div>
  );
}
