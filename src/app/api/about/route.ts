import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const aboutData = await prisma.aboutMe.findFirst();
    return NextResponse.json(aboutData, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "서버 에러", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function PATCH(request: Request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;
  try {
    const {
      id,
      name,
      tagline,
      email,
      githubUrl,
      bio,
      fields,
      image,
      skills,
      favorites,
    } = await request.json();

    const updated = await prisma.aboutMe.update({
      where: { id },
      data: {
        name,
        email,
        bio,
        tagline,
        githubUrl,
        fields,
        skills,
        favorites,
        image,
      },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "업데이트 실패", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
