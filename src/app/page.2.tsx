"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { AboutMe } from "@prisma/client";
import Intro from "@/components/Intro";
import Loader from "@/components/Loader";
import Skills from "@/components/skills/Skills";
import Portfolio from "@/components/portfolio/Portfolio";
import Navbar from "@/components/Navbar";
import { useAdminSession } from "@/hook/useAdminSession";
import fetcher from "@/lib/fetcher";
import Image from "next/image";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");

  const { data: aboutData, isLoading: isLoadingAbout } = useSWR<AboutMe | null>(
    "api/about",
    fetcher
  );
  const { isAdmin } = useAdminSession();

  const aboutRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleIntroFinish = () => {
    // document.body.style.overflow = "auto";
  };

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, []);

  // 🔍 IntersectionObserver로 현재 섹션 추적
  useEffect(() => {
    const navbarHeight = navbarRef.current?.getBoundingClientRect().height || 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: `-${navbarHeight + 1}px 0px 0px 0px`,
        threshold: 0.3,
      }
    );

    requestAnimationFrame(() => {
      const targets = [
        aboutRef.current,
        skillRef.current,
        portfolioRef.current,
      ];
      targets.forEach((el) => {
        if (el) observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  if (isLoadingAbout) return <Loader />;
  if (!aboutData) return <p className="text-center mt-8">정보가 없습니다</p>;

  return (
    <div className="relative h-[300vh] bg-black">
      {/* <Intro aboutData={aboutData} onFinish={handleIntroFinish} /> */}

      {/* 콘텐츠 영역 */}
      <div className="absolute top-[200vh] left-0 w-full bg-[#1a1a1a] z-20">
        <Navbar
          aboutRef={aboutRef}
          skillRef={skillRef}
          portfolioRef={portfolioRef}
          navbarRef={navbarRef}
          activeSection={activeSection}
        />

        <section
          ref={aboutRef}
          id="about"
          className="scroll-mt-24 py-24 text-white"
        >
          <h2 className="text-5xl mb-8">Interview</h2>
          <div className="flex flex-col items-center gap-4">
            <p>
              I'm passionate about digital design and art direction, and enjoy
              solving problems through beautiful designs and experiences.
            </p>
            <div className="relative w-[70%] aspect-square overflow-hidden">
              <Image
                src={aboutData.image}
                alt="About"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section ref={skillRef} id="skills" className="scroll-mt-24 py-24">
          {/* <Skills /> */}
        </section>

        <section
          ref={portfolioRef}
          id="portfolio"
          className="scroll-mt-24 py-24"
        >
          {/* <Portfolio /> */}
        </section>
      </div>
    </div>
  );
}
