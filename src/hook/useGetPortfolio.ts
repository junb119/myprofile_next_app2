"use client";

import fetcher from "@/lib/fetcher";
import { Portfolio } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface PortfolioWithRelations extends Portfolio {
  Skills: { name: string; icon: string }[];
  Role: { name: string }[];
}

export default function useGetPortfolio() {
  const { data, error, isLoading } = useSWR<PortfolioWithRelations[]>(
    "/api/portfolio",
    fetcher
  );

  return {
    portfolios: data || [],
    error,
    loading: isLoading,
  };

  // const [portfolios, setPortfolios] = useState<PortfolioWithRelations[]>([]);
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPortfolio = async () => {
  //     try {
  //       const { data } = await axios.get("/api/portfolio");
  //       const portfolioList = data.map((pf: any) => ({
  //         id: pf.id,
  //         title: pf.title,
  //         period: pf.period,
  //         Skills: pf.Skills,
  //         tools: pf.tools,
  //         members: pf.members,
  //         description: pf.description,
  //         thumb: pf.thumb,
  //         github: pf.github,
  //         path: pf.path,
  //         Role: pf.Role,
  //         detail: pf.detail,
  //         attribute: pf.attribute,
  //         modalTags: pf.modalTags,
  //         modalImages: pf.modalImages,
  //       }));
  //       setPortfolios(portfolioList);
  //     } catch (error) {
  //       console.error(error);
  //       setError("포트폴리오 목록 불러오기 실패");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPortfolio();
  // }, []);
  // return { portfolios, error, loading };
}
