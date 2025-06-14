"use client";
import React, { useEffect, useState } from "react";

const faces = ["about", "skills", "portfolio"];

interface DynamicTitleProps {
  target: string;
}

const DynamicTitle: React.FC<DynamicTitleProps> = ({ target }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const newIndex = faces.indexOf(target);
    if (newIndex !== -1) {
      setIndex(newIndex);
    }
  }, [target]);

  const rotateX = -index * 90;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
      <div className="w-[300px] h-[200px] [perspective:1000px]">
        <div
          className="w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d]"
          style={{ transform: `translateZ(-100px) rotateX(${rotateX}deg)` }}
        >
          {/* Front Face */}
          <div className="absolute w-full h-full flex items-center justify-center text-4xl font-bold text-white bg-blue-500 border-2 border-white [transform:rotateX(0deg)_translateZ(100px)]">
            about
          </div>

          {/* Bottom Face */}
          <div className="absolute w-full h-full flex items-center justify-center text-4xl font-bold text-white bg-green-500 border-2 border-white [transform:rotateX(90deg)_translateZ(100px)]">
            skills
          </div>
          {/* Top Face */}
          <div className="absolute w-full h-full flex items-center justify-center text-4xl font-bold text-white bg-gray-700 border-2 border-white [transform:rotateX(180deg)_translateZ(100px)]">
            portfolio
          </div>
          {/* back Face */}
          <div className="absolute w-full h-full flex items-center justify-center text-4xl font-bold text-white bg-purple-500 border-2 border-white [transform:rotateX(-90deg)_translateZ(100px)]"></div>
        </div>
      </div>
    </main>
  );
};

export default DynamicTitle;
