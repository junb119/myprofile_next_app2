// src/app/admin/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "admin") {
      router.push("/"); // 일반 유저는 홈으로 리디렉션
    }
  }, [session, status, router]);

  return (
    <div>
      <h1>관리자 전용 페이지</h1>
      {session?.user && <p>환영합니다, {session.user.name}님!</p>}
    </div>
  );
}
