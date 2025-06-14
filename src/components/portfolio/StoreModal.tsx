"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; 

interface StoreModalProps {
  store: Store;
  onClose: () => void;
}
// description 문구 정제 위한 파싱
function parseDescription(raw: string) {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const lastLine = lines.find((line) => line.startsWith("LAST ORDER"));
  const desc_category = lines[0];
  const desc_brandLine = lines[1]; 

  const desc_body = lines.slice(2).filter((line) => line !== lastLine);

  return {
    desc_category,
    desc_body,
    desc_brandLine,
    desc_lastOrder: lastLine,
  };
}
export default function StoreModal({ store, onClose }: StoreModalProps) {
  const { desc_category, desc_body, desc_brandLine, desc_lastOrder } =
    parseDescription(store.description);

  // ESC 키 닫기 + 스크롤 잠금 + 흔들림 보정
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white w-full max-w-[90vw] mx-4 h-[90vh] overflow-y-auto rounded-md shadow-lg"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute z-50 
            top-2 right-2 text-white text-5xl
            md:top-4 md:right-4 md:text-gray-500 md:text-4xl
            hover:text-red-500 transition"
          >
            &times;
          </button>

          {/* 모달 내용 */}
          <div className="flex flex-col lg:flex-row h-full">
            {/* 이미지 영역 */}
            <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-full shrink-0">
              <Image
                src={store.image}
                alt={store.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
              />
            </div>

            {/* 텍스트 영역 */}
            <div className="p-6 lg:w-1/2 flex-1 overflow-y-auto">
              {/* 제목 */}
              <h2 className="font-night text-3xl lg:text-4xl  tracking-tight text-gray-800 mb-6 border-b pb-2">
                {store.name}
              </h2>

              {/* 카테고리 */}
              <div className="font-night text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">
                {desc_category}
              </div>

              {/* 브랜드 라인 */}
              {desc_brandLine && (
                <div className="font-air text-lg font-bold text-black mb-4">
                  {desc_brandLine}
                </div>
              )}

              {/* 본문 */}
              <div className="font-air space-y-4 text-gray-700 text-[15px] leading-relaxed mb-8 break-keep">
                {desc_body.map((para, idx) => (
                  <p
                    key={idx}
                    dangerouslySetInnerHTML={{
                      __html: para.replace(
                        /<([^>]+)>/g,
                        '<span class="font-bold text-cyan-500">$1</span>'
                      ),
                    }}
                  />
                ))}
              </div>

              {/* LAST ORDER */}
              {desc_lastOrder && (
                <div className="mt-6 text-sm font-medium text-gray-600 border-t pt-3">
                  ⏰ {desc_lastOrder}
                </div>
              )}

              {/* 링크 */}
              {store.url && (
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 text-sm px-4 py-2 text-emerald-500  hover:text-emerald-600 hover:font-bold transition"
                >
                  홈페이지 바로가기 →
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
