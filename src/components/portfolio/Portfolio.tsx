"use client";
// import Loader from "@/components/Loader";
// import PageTitle from "@/components/PageTitle";
import PortfolioModal from "@/components/portfolio/PortfolioModal";
import { useAdminSession } from "@/hook/useAdminSession";
// import useGetPortfolio from "@/hook/useGetPortfolio";
import type { Portfolio } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { forwardRef, useEffect, useState } from "react";

interface PortfolioWithRelations extends Portfolio {
  Skills: { name: string; icon: string }[];
  Role: { name: string }[];
}

const Portfolio = ({
  selected,
  portfolios,
  onSelect,
}: {
  selected: PortfolioWithRelations | null;
  portfolios: PortfolioWithRelations[];
  onSelect: (portfolio: PortfolioWithRelations | null) => void;
}) => {
  // const { portfolios, error, loading } = useGetPortfolio();
  // const [selected, setSelected] = useState<PortfolioWithRelations | null>(null);
  // const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const { isAdmin } = useAdminSession();
  const router = useRouter();
  const deletePortfolio = async (id: string) => {
    const confrimDelete = confirm("정말 포트폴리오를 삭제하시겠습니까?");
    try {
      if (confrimDelete) {
        const { data } = await axios.delete(`/api/portfolio/${id}`);
        if (data) {
          alert("포트폴리오 삭제 성공");
          router.refresh();
          // todo : 삭제시 관련 이미지파일도 삭제
        }
      }
    } catch (error) {
      alert("포트폴리오 삭제 실패");
      console.error(error);
    }
  };
  // if (loading) return <Loader />;
  return (
    <>
      {isAdmin && (
        <span>
          <Link href="/admin/portfolio/add">
            <button>New Portfolio</button>
          </Link>
        </span>
      )}

      <PortfolioModal
        open={!!selected}
        onClose={() => onSelect(null)}
        portfolio={selected}
      />
      <div>
        {/* 포트폴리오리스트 */}
        <ul className="flex flex-col gap-8">
          {/* 포트폴리오카드 */}
          {portfolios.map((pf) => (
            <li
              key={pf.id}
              className="cursor-pointer border-l border-r px-4 border-transparent hover:border-white py-8 box-border transition-colors duration-300 lg:flex lg:gap-4 lg:items-start "
              onClick={() => {
                onSelect(pf); // 선택한 포트폴리오
              }}
            >
              {/* 텍스트영역 */}
              <div className="lg:order-2">
                <h3 className="text-[20px]">{pf.title}</h3>
                {/* <span className="text-slate-400 text-xs">{pf.period}</span>
                <span className="text-slate-400 text-xs ml-2">
                  {pf.members}명
                </span> */}
                <p className="text-sm mt-2 text-slate-400">{pf.description}</p>
                <ul className="flex flex-wrap gap-1 mt-2 text-xs">
                  {pf.modalTags &&
                    pf.modalTags.map((tag) => (
                      <li
                        key={tag}
                        className="bg-sky-400/10  text-sky-300 py-1 px-2 rounded-lg "
                      >
                        {tag}
                      </li>
                    ))}
                </ul>
              </div>
              {/* 섬네일 */}
              <div className="mt-4 lg:order-1 lg:w-52 lg:mt-0">
                <Image
                  src={pf.thumb}
                  alt="portfolio.jpg"
                  width={500}
                  height={500}
                  className="aspect-video object-cover"
                />
              </div>
              {isAdmin && (
                <div className="mt-2 text-right space-x-3">
                  <Link href={`/admin/portfolio/${pf.id}`} passHref>
                    <button
                      className="text-sm text-sky-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 카드 클릭 이벤트 막기
                      deletePortfolio(pf.id);
                    }}
                    className="text-sm text-rose-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Portfolio;
