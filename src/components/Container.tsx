import React from "react";
interface ContainerProps {
  children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return <section className="flex-1 w-full  bg-amber-50">{children}</section>;
};

export default Container;
