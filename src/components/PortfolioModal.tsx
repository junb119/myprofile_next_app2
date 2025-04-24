import { Portfolio } from "@prisma/client";
import Image from "next/image";
import React from "react";
// import Tags from "./tags";

interface PortfolioWithRelations extends Portfolio {
  Skills: { name: string; icon: string }[];
  Role: { name: string }[];
}

interface PortfolioModalProps {
  open: boolean;
  onClose: () => void;
  portfolio: PortfolioWithRelations | null;
}

const PortfolioModal = ({ open, onClose, portfolio }: PortfolioModalProps) => {
  if (!open || !portfolio) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose} // 바깥 클릭 시 닫힘
    >
      <div
        className="bg-black rounded-xl shadow-[0_0_20px_rgb(161,161,170)] w-full sm:max-w-[70vw] max-w-[80vw] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        {/* 닫기 버튼 */}
        <button
          className="fixed top-6 right-6 z-50 bg-yellow-100 text-zinc-700 hover:text-zinc-900 text-xl rounded-full w-9 h-9 flex items-center justify-center shadow-md transition"
          onClick={onClose}
        >
          X
        </button>

        {/* 섬네일 */}
        <div className="relative w-full aspect-[16/9] bg-black rounded-t-xl">
          <Image
            src={portfolio.thumb}
            alt="thumbnail"
            fill
            className="object-contain rounded-t-xl"
          />
        </div>

        {/* 본문 */}
        <div className="p-6 space-y-4 text-zinc-400">
          <h2 className="text-3xl font-bold text-cyan-100">
            {portfolio.title}
          </h2>
          <p className="text-sm text-zinc-100">{portfolio.description}</p>

          {/* 상세 정보 */}
          <ul className="text-sm text-zinc-100 space-y-1 pt-4 border-t border-zinc-700">
            <li>
              <span className="font-medium">기간:</span> {portfolio.period}
            </li>
            <li>
              <span className="font-medium">참여 인원:</span>{" "}
              {portfolio.members}명
            </li>
            <li>
              <span className="font-medium">기술 스택:</span>{" "}
              <Tags
                list={portfolio.Skills}
                color="amber"
                width={20}
                height={20}
              />
            </li>
            <li>
              <span className="font-medium">사용 도구:</span>{" "}
              {portfolio.tools.join(", ")}
            </li>
            <li>
              <span className="font-medium">역할:</span>{" "}
              {portfolio.Role.map((r) => r.name).join(", ") || "N/A"}
            </li>
          </ul>

          {/* 외부 링크 */}
          <div className="flex gap-4 pt-4 text-sm">
            {/* {portfolio.github && ( */}
            <a
              href={portfolio.github}
              target="_blank"
              className="text-sky-600 hover:underline"
            >
              🔗 GitHub
            </a>
            {/* )} */}
            {/* {portfolio.path && ( */}
            <a
              href={portfolio.path}
              target="_blank"
              className="text-amber-600 hover:underline"
            >
              🖼️ View Demo
            </a>
            {/* )} */}
          </div>

          {/* 상세 설명 HTML */}
          <div
            className="prose max-w-none prose-zinc border-t border-zinc-700 pt-10 text-zinc-300"
            dangerouslySetInnerHTML={{ __html: portfolio.detail }}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
