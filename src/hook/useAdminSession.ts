"use client";
import { useSession } from "next-auth/react";

export function useAdminSession() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAdmin = session?.user?.role === "admin";

  return {
    isLoading,
    isAdmin,
  };
}
