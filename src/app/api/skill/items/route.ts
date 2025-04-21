import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  try {
    const skills = await prisma.skill.findMany();
    return NextResponse.json(skills, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("스킬 가져오기 실패", { status: 500 });
  }
}

export async function POST(request: Request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  const body = await request.json();
  const { name, icon, level, description, categoryId } = body;
  console.log("skill 데이터 추가", body);
  try {
    const skill = await prisma.skill.create({
      data: {
        name,
        icon,
        level: Number(level),
        description,
        categoryId,
      },
    });
    return NextResponse.json(skill, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("실패", { status: 500 });
  }
}
