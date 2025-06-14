import { AboutMe } from "@prisma/client";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface IntroProps {
  aboutData: AboutMe;
  onFinish: () => void;
}

const Intro = ({ aboutData, onFinish }: IntroProps) => {
  const [step, setStep] = useState<"intro" | "crossing" | "main" | "content">(
    "intro"
  );
  const controls = useAnimation();

  useEffect(() => {
    const timer1 = setTimeout(() => setStep("crossing"), 1500);
    const timer2 = setTimeout(() => setStep("main"), 2000);
    const timer3 = setTimeout(() => {
      setStep("content");
    }, 3200); // 마지막 컬럼 끝나고 등장

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  useEffect(() => {
    if (step === "content") {
      requestAnimationFrame(() => {
        controls
          .start({
            opacity: 1,
            transition: { duration: 0.8 },
          })
          .then(() => {
            controls.start({
              left: 0,
              translateX: "0%",
              transition: { duration: 0.6, ease: "easeInOut" },
            });
          });
      });

      const introEndTimer = setTimeout(() => {
        onFinish();
      }, 1400);
      return () => clearTimeout(introEndTimer);
    }
  }, [step]);

  // 첫 번째 애니메이션 실행

  return (
    <section className="w-full h-full ">
      {/* <div className="relative w-full h-screen overflow-hidden bg-white"> */}
      {/* Intro 텍스트 */}
      <div className="absolute top-0 w-full h-screen">
        <AnimatePresence>
          {step === "intro" && (
            <motion.h1
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center text-xl font-semibold bg-black text-white z-50"
            >
              Frontend Developer Junb.
            </motion.h1>
          )}
        </AnimatePresence>
        {/* 컬럼 배경 애니메이션 */}
        <motion.div
          initial={false}
          animate={{
            height: step === "main" || step === "content" ? "100%" : 0,
          }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
          className="absolute h-screen bottom-0 w-1/3 left-0 bg-white"
        />
        <motion.div
          initial={false}
          animate={{
            height: step === "main" || step === "content" ? "100%" : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
          className="absolute h-screen bottom-0 w-1/3 left-1/3 bg-white"
        />
        <motion.div
          initial={false}
          animate={{
            height: step === "main" || step === "content" ? "100%" : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
          className="absolute h-screen bottom-0 w-1/3 left-2/3 bg-white"
        />
      </div>

      {/* </div> */}
      {/* 소개 콘텐츠 (텍스트 + 이미지) */}
      {step === "content" && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full relative  "
            style={
              {
                // backgroundColor: "#ffffff",
              }
            }
          >
            <section>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`relative w-full   h-screen max-w-4xl  flex flex-col justify-center rotate-0 items-center text-[#1a1a1a] text-center  `}
              >
                {/* 이미지 */}
                <div className="absolute w-full  h-screen   my-6 ">
                  <Image
                    src={"/main1.jpg"}
                    alt="프로필 이미지"
                    fill
                    className="object-cover grayscale"
                  />
                </div>

                {/* 텍스트 */}
                <div className="absolute w-full h-screen top-0 py-[10px] px-[20px]">
                  <span className="text-white">
                    Frontend Developer of the Year
                  </span>
                  <h2 className="text-6xl text-red-500 mb-4 ">JUNB</h2>
                  <p className="absolute top-1/2  text-right text-zinc-100  [text-shadow:_1px_2px_3px_#000]">
                    <strong>‘어떻게 만들지’</strong>보다
                    <br />
                    <strong> ‘왜 만드는지’</strong>
                    를<br />
                    먼저 고민하는 개발자
                  </p>
                </div>
                {/* 표지 테두리 */}
                <div className="absolute w-full h-screen max-w-3xl mx-auto top-0 left-1/2 -translate-x-1/2 ">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-0 w-full h-[10px] bg-red-500"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute bottom-0 right-0 rotate-180 w-full h-[10px] bg-red-500"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute left-0 bottom-0 rotate-180 w-[10px] h-screen bg-red-500"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute right-0 w-[10px] h-screen bg-red-500"
                  />
                </div>
              </motion.div>
            </section>
            <section className="test2 sticky top-0 w-full h-screen bg-white p-8">
              {/* 이름 / 소개 */}
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-bold text-[#1a1a1a]">
                  {aboutData.name}
                </h2>
                <p className="text-base text-zinc-500">{aboutData.tagline}</p>
                <p className="mt-2 leading-relaxed whitespace-pre-line">
                  {aboutData.bio}
                </p>
                {/* 역할 태그 */}
                {Array.isArray(aboutData.fields) &&
                  aboutData.fields.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {aboutData.fields.map((field, i) => (
                        <span key={i}>
                          {typeof field === "string" ||
                          typeof field === "number"
                            ? field
                            : JSON.stringify(field)}
                        </span>
                      ))}
                    </div>
                  )}

                {/* 사용 기술 */}
                {aboutData.skills?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-zinc-900 text-sm mb-1">
                      사용 기술
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
                <div>
                  {" "}
                  <h3 className="font-semibold text-zinc-900 text-sm mb-1">
                    교육
                  </h3>
                  <div className="flex flex-cols">
                    <span>dd대</span>
                  </div>
                </div>
                {/* 좋아하는 것들 */}
                {/* {aboutData.favorites?.length > 0 && (
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
                )} */}

                {/* 연락처 (카드 하단 정리) */}
                <div className="space-y-1 text-sm pt-2 border-t border-dashed mt-2">
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {aboutData.email}
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
            </section>
          </motion.div>
        </>
      )}
    </section>
  );
};

export default Intro;
