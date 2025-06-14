"use client";
import { useEffect, useState } from "react";

interface ScrollTopButtonProps {
  scrollTarget?: string; // 선택자 (없으면 window)
  offset?: number; // 스크롤 노출 임계값
  className?: string; // 위치 및 스타일 커스터마이징
  // label?: React.ReactNode; // 버튼 안쪽 텍스트나 아이콘
}

const ScrollTopButton = ({
  scrollTarget,
  offset = 300,
  className = "fixed bottom-6 right-6 lg:right-6 lg:bottom-6",
}: // label = <span className="text-xl font-bold">↑</span>,
ScrollTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = scrollTarget ? document.querySelector(scrollTarget) : window;

    if (!target) return;

    const scrollElement = target as HTMLElement | Window;

    const getScrollY = () =>
      scrollElement instanceof Window
        ? scrollElement.scrollY
        : (scrollElement as HTMLElement).scrollTop;

    const toggleVisibility = () => {
      setIsVisible(getScrollY() > offset);
    };

    scrollElement.addEventListener("scroll", toggleVisibility);
    return () => scrollElement.removeEventListener("scroll", toggleVisibility);
  }, [scrollTarget, offset]);

  const scrollToTop = () => {
    const target = scrollTarget ? document.querySelector(scrollTarget) : window;

    if (target instanceof HTMLElement) {
      target.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`z-50 w-12 h-12 rounded-full bg-zinc-200 text-gray-800 hover:bg-zinc-500 hover:text-white flex items-center justify-center shadow-lg transition ${className}`}
      aria-label="맨 위로 이동"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 28 17"
        fill="none"
      >
        <path
          d="M2 15L14 3L26 15"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        ></path>
      </svg>
    </button>
  );
};

export default ScrollTopButton;
