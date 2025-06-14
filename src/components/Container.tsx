import React from "react";
interface ContainerProps {
  children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return <section className="flex-1 w-full  bg-black pb-6">{children}</section>;
};

export default Container;
