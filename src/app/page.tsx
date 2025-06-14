"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import {
  AboutMe,
  Portfolio as PortfolioType,
  Skill,
  SkillCategory,
} from "@prisma/client";
import Intro from "@/components/Intro";
import Loader from "@/components/Loader";
import Skills from "@/components/skills/Skills";
import Portfolio from "@/components/portfolio/Portfolio";
// import Navbar from "@/components/Navbar";
import { useAdminSession } from "@/hook/useAdminSession";
import fetcher from "@/lib/fetcher";
import Image from "next/image";
import NavTitle from "@/components/NavTitle";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import ScrollTopButton from "@/components/ScrollTopButton";
import EmailIcon from "@/components/EmailIcon";
import useGetPortfolio from "@/hook/useGetPortfolio";
import ScrollAnimation from "@/components/ScrollAnimation";
import About from "@/components/About";

interface PortfolioWithRelations extends Portfolio {
  Skills: { name: string; icon: string }[];
  Role: { name: string }[];
}

export default function Home() {
  const sections = ["about", "skills", "portfolio"];
  const [phase, setPhase] = useState<null | "loading" | "intro" | "main">(null);

  const [activeSection, setActiveSection] = useState<string>("");
  const { data: aboutData, isLoading: isLoadingAbout } = useSWR<AboutMe | null>(
    "api/about",
    fetcher
  );
  const { data: categories, isLoading: isLoadingCategories } = useSWR<
    SkillCategory[] | null
  >("/api/skill/category", fetcher);
  const { data: skills, isLoading: isLoadingSkills } = useSWR<Skill[] | null>(
    "/api/skill/items",
    fetcher
  );
  const { portfolios, error, loading } = useGetPortfolio();
  const { isAdmin } = useAdminSession();
  const isLoading =
    isLoadingAbout || isLoadingCategories || isLoadingSkills || loading;
  useEffect(() => {
    if (isLoading) return; // 아직 로딩 중이면 아무것도 하지 않음

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActiveSection(id);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading, sections]); // 로딩 끝난 이후에만 등록되게
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioWithRelations | null>(null);

  const Header1 = useAnimation();
  const Header2 = useAnimation();
  const Nav = useAnimation();
  const mobileNav = useAnimation();
  const Social = useAnimation();
  const Main1 = useAnimation();
  const Main2 = useAnimation();
  useEffect(() => {
    if (phase !== "main") return;

    requestAnimationFrame(() => {
      Header1.start({ opacity: 1, y: 0, transition: { duration: 0.3 } })
        .then(() =>
          Header2.start({ opacity: 1, y: 0, transition: { duration: 0.3 } })
        )
        .then(() =>
          Promise.all([
            Nav.start({ opacity: 1, y: 0, transition: { duration: 0.3 } }),
            mobileNav.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.3 },
            }),
            Social.start({
              opacity: 1,
              transition: { duration: 0.3 },
            }),
          ])
        )
        .then(() => Main1.start({ opacity: 1, transition: { duration: 0.3 } }))
        .then(() =>
          Main2.start({ opacity: 1, y: 0, transition: { duration: 0.3 } })
        );
    });
  }, [phase]);

  useEffect(() => {
    if (isLoading) {
      setPhase("loading");
    } else {
      setPhase("intro");
    }
  }, [isLoading]);
  if (phase === "loading" || !phase) return <Loader />;
  if (phase === "intro") return <Intro setPhase={setPhase} />;

  if (phase === "main")
    return (
      <div className="bg-[#1a1a1a]">
        <div className="relative   px-6 py-12 lg:py-0 text-white lg:flex lg:justify-center lg:gap-4 mx-auto  min-h-screen max-w-screen-xl">
          <header className="intro lg:sticky lg:top-0 lg:max-h-screen lg:w-[48%] lg:py-24  lg:flex lg:flex-col">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={Header1}>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                Woo Jun Beom
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                Frontend Developer
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={Header2}
              className="mt-4 max-w-xs leading-normal text-[#94a3b8]"
            >
              {aboutData && aboutData.tagline}
            </motion.p>
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={Nav}
              className="nav hidden lg:flex lg:flex-col lg:justify-center lg:items-start lg:flex-grow"
            >
              <ul className="w-full h-full flex flex-col justify-center  items-start">
                {sections.map((sec) => (
                  <li key={sec}>
                    <a
                      className="group flex items-center py-3 active"
                      href={`#${sec}`}
                    >
                      <span
                        className={`nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none  ${
                          activeSection === sec ? "w-16 bg-slate-200" : ""
                        } 
                      `}
                      ></span>
                      <span
                        className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 
                       ${
                         activeSection === sec
                           ? "text-slate-200"
                           : "text-slate-500 "
                       } 
                      `}
                      >
                        {sec}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={Social}
              className="ml-1 mt-4 flex items-center"
              aria-label="Social media"
            >
              <li className="mr-5 shrink-0 text-xs">
                <a
                  className="block hover:text-slate-200"
                  href="https://github.com/junb119"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub (opens in a new tab)"
                  title="GitHub"
                >
                  <span className="sr-only bg-[#94a3b8]">GitHub</span>
                  <img
                    src="/github-white.svg"
                    alt="깃허브 아이콘"
                    className="cursor-pointer hover:opacity-80 transition  w-6"
                  />
                </a>
              </li>
              <li className="cursor-pointer">
                <EmailIcon />
              </li>
            </motion.ul>
          </header>
          <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
            <section
              id="about"
              className="mb-16  md:mb-24 lg:mb-36 lg:scroll-mt-0"
              aria-label="About me"
            >
              <NavTitle title="About" animation={mobileNav} />
            {aboutData && (
              <About aboutData={aboutData} animate1={Main1} animate2={Main2} />
            )}
            </section>
            <ScrollAnimation>
              <section
                id="skills"
                className="mb-16 md:mb-24 lg:mb-36 lg:scroll-mt-0"
                aria-label="Skill list"
              >
                <NavTitle title="Skills" animation={mobileNav} />
                {categories && skills ? (
                  <Skills categories={categories} skills={skills} />
                ) : (
                  <div>정보가 없습니다.</div>
                )}
              </section>
            </ScrollAnimation>
            <ScrollAnimation>
              <section
                id="portfolio"
                className="mb-16  md:mb-24 lg:mb-36 lg:scroll-mt-0"
                aria-label="Portfolio list"
              >
                <NavTitle title="Portfolio" animation={mobileNav} />

                <Portfolio
                  selected={selectedPortfolio}
                  portfolios={portfolios}
                  onSelect={setSelectedPortfolio}
                />
              </section>
            </ScrollAnimation>

            {!selectedPortfolio && <ScrollTopButton />}
          </main>
        </div>
      </div>
    );
}
// if (!aboutData) return <p className="text-center mt-8">정보가 없습니다</p>;
