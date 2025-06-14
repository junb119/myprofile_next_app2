import { motion, AnimationControls } from "framer-motion";
import React from "react";

const NavTitle = ({
  title,
  animation,
}: {
  title: string;
  animation: AnimationControls;
}) => {
  return (
    <div
      className="sticky top-0 z-20 -mx-6 mb-4 w-screen  px-6 py-5 backdrop-blur-sm bg-black/10 md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 "
    >
      <motion.h2 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.3}} className="text-sm font-bold uppercase tracking-widest text-amber-200 lg:sr-only">
        {title}
      </motion.h2>
    </div>
  );
};

export default NavTitle;
