import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";
// context: { params: { id: string } }
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  
  const id = context.params.id;
  try {
    const skill = await prisma.skill.findUnique({
      where: { id: id },
    });
    return NextResponse.json(skill, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("스킬 데이터 가져오기 실패", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  const id = context.params.id;

  try {
    const successDelete = await prisma.skill.delete({
      where: { id: id },
    });
    return NextResponse.json(successDelete, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("삭제 실패", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  const { name, level, description, icon, categoryId } = await req.json();
  const id = context.params.id;

  try {
    const editSkill = await prisma.skill.update({
      where: { id: id },
      data: {
        name,
        level: Number(level),
        description,
        icon,
        categoryId,
      },
    });
    return NextResponse.json(editSkill, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("수정 실패", { status: 500 });
  }
}
