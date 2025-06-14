"use client";
import { useState } from "react";

export default function EmailIcon() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("emfowkd@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 알림 제거
    } catch (err) {
      console.error("클립보드 복사 실패", err);
    }
  };

  return (
    <>
      <span className="sr-only bg-[#94a3b8]">Mail</span>
      <img
        src="/mail.svg"
        alt="메일 아이콘"
        onClick={handleCopy}
        className="cursor-pointer hover:opacity-80 transition"
      />
      {copied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg text-sm z-50 whitespace-nowrap">
          이메일이 복사되었습니다!
        </div>
      )}
    </>
  );
}
