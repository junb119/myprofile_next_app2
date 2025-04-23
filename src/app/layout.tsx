import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Container from "@/components/Container";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata: Metadata = {
  title: "JunB의 준비된 이야기 | 프론트엔드 개발자 포트폴리오",
  description:
    "프론트엔드 개발자 JunB의 포트폴리오입니다. 사용자 인터페이스, 웹 개발, 디자인까지 준비된 이야기들을 담았습니다.",
  keywords: [
    "JunB",
    "준비된 이야기",
    "프론트엔드 개발자",
    "개발자 포트폴리오",
    "웹 개발",
    "React",
    "Next.js",
    "UI 개발",
    "개발자 이력서",
    "개발자 프로필",
  ],
  authors: [{ name: "JunB", url: "https://github.com/junb119" }],
  creator: "JunB",
  openGraph: {
    title: "JunB의 준비된 이야기 | 프론트엔드 개발자 포트폴리오",
    description:
      "프론트엔드 개발자 JunB의 웹 포트폴리오입니다. 코드와 디자인 사이, 준비된 이야기들을 만나보세요.",
    url: "https://your-domain.com",
    siteName: "JunB의 준비된 이야기",
    images: [
      {
        url: "https://your-domain.com/og-image.png", // 🖼 OG 이미지 있으면 여기 경로
        width: 1200,
        height: 630,
        alt: "JunB의 준비된 이야기 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  themeColor: "#ffffff", // 파비콘에 어울리는 색
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionWrapper>
          <Navbar />
          <Container>{children}</Container>
        </SessionWrapper>
      </body>
    </html>
  );
}
