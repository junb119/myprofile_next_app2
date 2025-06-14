import { Portfolio } from "@prisma/client";
import Image from "next/image";
import React from "react";
// import Tags from "../Tags";
import ScrollTopButton from "../ScrollTopButton";
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
    // <div
    //   className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm lg:px-4"
    //   onClick={onClose} // 바깥 클릭 시 닫힘
    // >
    //   <div
    //     className="relative bg-white bg-opacity-100 lg:rounded-xl shadow-[0_0_20px_rgb(161,161,170)] w-full h-screen overflow-y-auto    "
    //     onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
    //   >
    //     {/* 닫기 버튼 */}
    //     <button
    //       className="fixed top-6 right-6 z-50 bg-zinc-700 text-zinc-200 hover:text-zinc-700 hover:bg-yellow-100 text-xl rounded-full w-9 h-9 flex items-center justify-center shadow-md transition"
    //       onClick={onClose}
    //     >
    //       X
    //     </button>

    //     {/* 섬네일 */}
    //     <div className="relative w-full aspect-[16/9] bg-black rounded-t-xl">
    //       <Image
    //         src={portfolio.thumb}
    //         alt="thumbnail"
    //         fill
    //         className="object-contain rounded-t-xl"
    //       />
    //     </div>

    //     {/* 본문 */}
    //     {/* <div className="p-6 space-y-4 text-zinc-700"> */}
    //     <div className="p-6 space-y-4 ">
    //       {/* <h2 className="text-3xl font-bold text-zinc-900"> */}
    //       <h2 className="text-3xl font-bold">{portfolio.title}</h2>
    //       {/* <p className="text-sm text-zinc-700">{portfolio.description}</p> */}
    //       <p className="text-sm ">{portfolio.description}</p>

    //       {/* 상세 정보 */}
    //       {/* <ul className="text-sm text-zinc-700 space-y-1 pt-4 border-t border-zinc-700"> */}
    //       <ul className="text-sm space-y-1 pt-4 border-t ">
    //         <li>
    //           <span className="font-medium">기간:</span> {portfolio.period}
    //         </li>
    //         <li>
    //           <span className="font-medium">참여 인원:</span>{" "}
    //           {portfolio.members}명
    //         </li>
    //         <li>
    //           <span className="font-medium">기술 스택:</span>{" "}
    //           <Tags
    //             list={portfolio.Skills}
    //             color="amber"
    //             width={20}
    //             height={20}
    //           />
    //         </li>
    //         <li>
    //           <span className="font-medium">사용 도구:</span>{" "}
    //           {portfolio.tools.join(", ")}
    //         </li>
    //         <li>
    //           <span className="font-medium">역할:</span>{" "}
    //           {portfolio.Role.map((r) => r.name).join(", ") || "N/A"}
    //         </li>
    //       </ul>

    //       {/* 외부 링크 */}
    //       <div className="flex gap-4 pt-4 text-sm">
    //         {/* {portfolio.github && ( */}
    //         <a
    //           href={portfolio.github || ""}
    //           target="_blank"
    //           className="text-sky-600 hover:underline"
    //         >
    //           🔗 GitHub
    //         </a>
    //         {/* )} */}
    //         {/* {portfolio.path && ( */}
    //         <a
    //           href={portfolio.path || ""}
    //           target="_blank"
    //           className="text-amber-600 hover:underline"
    //         >
    //           🖼️ View Demo
    //         </a>
    //         {/* )} */}
    //       </div>

    //       {/* 상세 설명 HTML */}
    //       <div
    //         // className="prose prose-invert max-w-none  border-t prose-zinc border-zinc-700 pt-10 "
    //         className="prose max-w-none border-t pt-10"
    //         dangerouslySetInnerHTML={{ __html: portfolio.detail }}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div
      className="fixed inset-0 z-50 flex items-center lg:pt-10 justify-center bg-black bg-opacity-60  "
      onClick={onClose}
    >
      <div
        className="modal-scroll-container relative bg-white text-black w-full h-screen lg:w-[70%] lg:h-[100%] overflow-y-auto hide-scrollbar "
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="fixed z-50 top-2 right-2 lg:top-10 lg:right-[7.5%] lg:translate-x-1/2 bg-zinc-700 text-zinc-200  
    text-xl md:top-4 md:right-4 md:text-2xl
    p-2 w-10 h-10 lg:w-15 lg:h-15 flex items-center justify-center
    rounded-full transition"
        >
          X
        </button>
        {/* 스크롤탑 버튼 */}
        <ScrollTopButton
          scrollTarget=".modal-scroll-container"
          offset={100}
          className="fixed bottom-4 right-4 lg:right-[8%] lg:bottom-6"
        />
        {/* 모달 내용 */}
        <div className="flex flex-col  w-full  ">
          {/* 이미지 영역 */}
          <div className="sticky top-0 w-full aspect-[19/10] lg:relative lg:flex lg:items-center lg:justify-center bg-[rgb(15,23,42)]/90">
            <div className="relative w-full h-full lg:w-[90%] lg:h-[90%] lg:rounded-lg lg:border-8 lg:border-zinc-400 ">
              <Image
                src={portfolio.thumb}
                alt={portfolio.title}
                fill
                className="object-cover"
                // sizes=""
                priority
              />
            </div>
          </div>

          {/* 텍스트 영역 */}
          <div className=" ">
            <div className="text-center py-4 lg:py-10 px-2 bg-[rgb(15,23,42)]/90 text-slate-200">
              {/* 태그 */}
              <ul className="flex flex-wrap gap-1 items-center justify-center text-xs lg:text-sm w-[90%] mx-auto ">
                {portfolio.modalTags &&
                  portfolio.modalTags.map((tag) => (
                    <li
                      key={tag}
                      className="bg-sky-400/10  text-sky-300 py-1 px-2 rounded-full "
                    >
                      {tag}
                    </li>
                  ))}
              </ul>

              {/* 제목 */}
              <h2 className="text-xl lg:text-2xl font-bold mt-3  lg:mt-4  ">
                {portfolio.title}
              </h2>

              {/* 기간  */}
              <div className="text-xs lg:text-sm mt-2 lg:mt-4 flex justify-center gap-4">
                <span>{portfolio.period}</span>
              </div>
              <div className="text-xs lg:text-sm mt-2 lg:mt-4 flex justify-center gap-4 text-white">
                <span>기여도 {portfolio.attribute} </span>
                <span>{portfolio.members}명</span>
              </div>
              {/* 인원 & 기여도 */}
              <ul className="flex gap-2 justify-center text-xs lg:text-sm  my-4 flex-wrap">
                {portfolio.Skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="text-center rounded-full bg-teal-400/10 px-3 py-1  font-medium leading-5 text-teal-300 "
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>

              <div className="flex gap-4 justify-center mt-2 text-sm lg:mt-4 lg:text-lg">
                {portfolio.github && (
                  <a
                    href={portfolio.github}
                    className="text-amber-200 border border-amber-200 p-2 lg:px-3 lg:py-2 flex justify-center items-center hover:border-black hover:text-black hover:bg-white transition"
                  >
                    GitHub
                  </a>
                )}
                {portfolio.path && (
                  <a
                    href={portfolio.path}
                    className="text-amber-200 border border-amber-200 p-2 lg:px-3 lg:py-2  flex justify-center items-center hover:border-black hover:text-black hover:bg-white transition "
                  >
                    자세히 보기
                  </a>
                )}
              </div>
              {/* 소개 */}
            </div>
            {/* 본문 */}
            <div className="text-center border-solid border-[#dcdcdc] py-10 px-4 border-b-[1px]">
              {portfolio.description}
            </div>
            {/* 상세 설명 HTML */}
            <div
              // className="prose prose-invert max-w-none  border-t prose-zinc border-zinc-700 pt-10 "
              className="prose max-w-none border-t pt-10 px-4"
              dangerouslySetInnerHTML={{ __html: portfolio.detail }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
