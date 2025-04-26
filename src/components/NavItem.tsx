"use client";

import { useAdminSession } from "@/hook/useAdminSession";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "About me" },
    { href: "/skills", label: "Skill Ability" },
    { href: "/portfolio", label: "Portfolio" },
  ];
  const { isAdmin, isLoading } = useAdminSession();
  return (
    <div className="">
      <ul className="flex gap-8 font-semibold justify-center">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <li
              key={href}
              className={`relative after:content-[''] after:w-[calc(100%-1rem)] after:h-1 after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:transition-all

              transition 
              ${
                isActive
                  ? "text-amber-800 after:bg-amber-700 font-bold "
                  : "text-zinc-700 hover:bg-amber-100 hover:text-amber-700"
              }
            `}
            >
              <Link href={href} className="block p-4">
                {label}
              </Link>
            </li>
          );
        })}
        {isAdmin && (
          <li
            className={`relative after:content-[''] after:w-[calc(100%-1rem)] after:h-1 after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:transition-all
        `}
          >
            <button
              className="block p-4"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavItem;
