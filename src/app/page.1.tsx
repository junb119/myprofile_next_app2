"use client";

import Loader from "@/components/Loader";
import PageTitle from "@/components/PageTitle";
import { useAdminSession } from "@/hook/useAdminSession";
import fetcher from "@/lib/fetcher";
import { AboutMe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
// import Skills from "./skills/page";
// import Portfolio from "./portfolio/page";

export default function Home() {
  const { data: aboutData, isLoading: isLoadingAbout } = useSWR<AboutMe | null>(
    "api/about",
    fetcher
  );

  const { isAdmin } = useAdminSession();
  if (isLoadingAbout) return <Loader />;
  if (!aboutData) return <p className="text-center mt-8">정보가 없습니다</p>;

  return (
    <>
      타이틀
      <PageTitle title="About Me" icon="💬" />

      {/* edit 버튼 */}
      {isAdmin && (
        <div className="flex justify-end max-w-4xl mx-auto mt-2">
          <Link
            href="/admin/about/edit"
            className="text-sm bg-rose-400 px-3 py-1 rounded-md text-white shadow hover:bg-rose-500"
          >
            Edit About
          </Link>
        </div>
      )}

      {/* 카드 전체 */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mt-4 flex flex-col sm:flex-row gap-8">
        {/* 이미지 */}
        <div className="flex-shrink-0 sm:mx-0 mx-auto">
          <Image
            src={aboutData.image}
            alt="profile_image"
            width={300}
            height={300}
            className="rounded-lg object-cover w-full max-w-[300px] h-auto"
          />
        </div>

        {/* 텍스트 정보 */}
        <div className="flex flex-col justify-between space-y-4 text-zinc-700 w-full">
          {/* 이름 / 소개 */}
          <div>
            <h2 className="text-xl font-bold text-amber-800">
              {aboutData.name}
            </h2>
            <p className="text-sm text-zinc-500">{aboutData.tagline}</p>
            <p className="mt-2 leading-relaxed whitespace-pre-line">
              {aboutData.bio}
            </p>
          </div>

          {/* 역할 태그 */}
          {Array.isArray(aboutData.fields) && aboutData.fields.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {aboutData.fields.map((field, i) => (
                <span key={i}>
                  {typeof field === "string" || typeof field === "number"
                    ? field
                    : JSON.stringify(field)}
                </span>
              ))}
            </div>
          )}

          {/* 사용 기술 */}
          {aboutData.skills?.length > 0 && (
            <div>
              <h3 className="font-semibold text-amber-700 text-sm mb-1">
                🧰 사용 기술
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-zinc-100 px-3 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 좋아하는 것들 */}
          {aboutData.favorites?.length > 0 && (
            <div>
              <h3 className="font-semibold text-amber-700 text-sm mb-1">
                🌿 좋아하는 것들
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.favorites.map((fav, i) => (
                  <span
                    key={i}
                    className="bg-zinc-100 px-3 py-1 rounded-full text-xs italic"
                  >
                    {fav}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 연락처 (카드 하단 정리) */}
          <div className="space-y-1 text-sm pt-2 border-t border-dashed mt-2">
            <p>
              <span className="font-medium">Email:</span> {aboutData.email}
            </p>
            <p>
              <span className="font-medium">GitHub:</span>{" "}
              <a
                href={aboutData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline"
              >
                {aboutData.githubUrl}
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* <Skills />
      <Portfolio /> */}
    </>
  );
}
