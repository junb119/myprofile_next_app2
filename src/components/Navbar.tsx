import React from "react";
// import NavItem from "./NavItem";
interface NavbarProps {
  aboutRef: React.RefObject<HTMLDivElement | null>;
  skillRef: React.RefObject<HTMLDivElement | null>;
  portfolioRef: React.RefObject<HTMLDivElement | null>;
  navbarRef: React.RefObject<HTMLDivElement | null>;
  activeSection: string;
}

const Navbar = ({
  aboutRef,
  skillRef,
  portfolioRef,
  navbarRef,
  activeSection,
}: NavbarProps) => {
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    const headerHeight = navbarRef.current?.getBoundingClientRect().height || 0;

    if (ref.current) {
      const sectionTop =
        ref.current.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: sectionTop - headerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-50 bg-[#1a1a1a] text-white "
    >
      <nav className="flex justify-center gap-8 p-4 text-sm font-medium">
        <button
          onClick={() => scrollToSection(aboutRef)}
          className={activeSection === "about" ? "text-blue-400" : "text-white"}
        >
          About
        </button>
        <button
          onClick={() => scrollToSection(skillRef)}
          className={
            activeSection === "skills" ? "text-blue-400" : "text-white"
          }
        >
          Skills
        </button>
        <button
          onClick={() => scrollToSection(portfolioRef)}
          className={
            activeSection === "portfolio" ? "text-blue-400" : "text-white"
          }
        >
          Portfolio
        </button>
      </nav>
    </header>
  );
  {
    /* <nav className=""> <NavItem /> </nav> */
  }
};

export default Navbar;
