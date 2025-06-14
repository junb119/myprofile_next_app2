import { AboutMe } from "@prisma/client";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Intro = ({
  setPhase,
}: {
  setPhase: (phase: null | "loading" | "intro" | "main") => void;
}) => {
  return (
    <section className="w-full h-full ">
      {/* <div className="relative w-full h-screen overflow-hidden bg-white"> */}
      {/* Intro 텍스트 */}
      <div className="absolute top-0 w-full h-screen">
        {/* 컬럼 배경 애니메이션 */}
        <motion.div
          initial={{ height: 0 }}
          animate={{
            height: "100%",
          }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
          className="absolute h-screen bottom-0 w-1/3 left-0 bg-[#1a1a1a]"
        />
        <motion.div
          initial={{ height: 0 }}
          animate={{
            height: "100%",
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
          className="absolute h-screen bottom-0 w-1/3 left-1/3 bg-[#1a1a1a]"
        />
        <motion.div
          initial={{ height: 0 }}
          animate={{
            height: "100%",
          }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
          onAnimationComplete={() => {
            setPhase("main");
          }}
          className="absolute h-screen bottom-0 w-1/3 left-2/3 bg-[#1a1a1a]"
        />
      </div>
    </section>
  );
};

export default Intro;
