"use client";
import Loader from "@/components/Loader";
import PageTitle from "@/components/PageTitle";
import PortfolioModal from "@/components/PortfolioModal";
import Tags from "@/components/tags";
import { useAdminSession } from "@/hook/useAdminSession";
import useGetPortfolio from "@/hook/useGetPortfolio";
import { Portfolio } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface PortfolioWithRelations extends Portfolio {
  Skills: { name: string; icon: string }[];
  Role: { name: string }[];
}

const Portfolio = () => {
  const { portfolios, error, loading } = useGetPortfolio();
  const [selected, setSelected] = useState<PortfolioWithRelations | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
  if (loading) return <Loader />;
  return (
    <>
      <PageTitle title="Portfolio" icon="📁" />
      {isAdmin && (
        <span>
          <Link href="/admin/portfolio/add">
            <button>add</button>
          </Link>
        </span>
      )}

      <PortfolioModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        portfolio={selected}
      />

      <div className="p-6">
        {/* <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {portfolios.map((pf) => (
            <li
              key={pf.id}
              className="bg-white rounded-xl  shadow hover:shadow-md transition duration-300 flex flex-col"
            >
              <div className="w-full h-[300px] relative">
                <Image
                  src={pf.thumb}
                  alt={pf.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-zinc-800 text-base">
                    {pf.title}
                  </h3>
                  <p className="text-sm text-zinc-600 line-clamp-2">
                    {pf.description}
                  </p>
                </div>

                <div className="mt-2 text-right">
                  <Link href={`/admin/portfolio/${pf.id}`}>
                    <button className="text-sm text-sky-600 hover:underline">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deletePortfolio(pf.id)}
                    className="text-sm text-rose-500 ml-3 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul> */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {portfolios.map((pf) => (
            <li
              key={pf.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition duration-300 flex flex-col cursor-pointer  md:h-[400px] sm:h-[300px] h-[400px]"
              onClick={() => {
                setSelected(pf); // 선택한 포트폴리오
                setModalOpen(true); // 모달 열기
              }}
            >
              <div className="w-full  md:h-[250px] sm:h-[150px] h-[250px] flex-shrink-0  relative">
                <Image
                  src={pf.thumb}
                  alt={pf.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-between ">
                <div>
                  <h3 className="font-bold text-zinc-800 text-base">
                    {pf.title}
                  </h3>
                  {/* 태그 */}
                  {/* {pf.Skills && pf.Skills.length > 0 && (
                    <div className="my-2 flex flex-wrap gap-2">
                      <Tags
                        list={pf.Skills}
                        color="sky"
                        width={16}
                        height={16}
                      />
                    </div>
                  )} */}
                  <p className="text-xs text-zinc-500 my-1 text-right">
                    {pf.period} <span className="mx-1 text-zinc-400">|</span>
                    {pf.members}명
                  </p>

                  <p className="text-sm text-zinc-600 line-clamp-2">
                    {pf.description}
                  </p>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Portfolio;
