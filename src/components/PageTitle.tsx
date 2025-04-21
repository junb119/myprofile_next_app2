import React from "react";
interface PageTitleProps {
  title: string;
  icon: string;
}
const PageTitle = ({ title, icon }: PageTitleProps) => {
  return (
    <div className="text-center mt-12 mb-6 text-4xl font-extrabold tracking-tight flex justify-center items-center gap-2">
      <span>{icon}</span>
      {/* <span className="bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent"> */}
      <span className="bg-gradient-to-r from-zinc-700 to-cyan-900 bg-clip-text text-transparent">
        {title}
      </span>
    </div>
  );
};

export default PageTitle;
