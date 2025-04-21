"use client";
import React from "react";
// import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-56px)] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-500 border-t-transparent" />
    </div>
  );
};

export default Loader;
