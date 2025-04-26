import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  const id = (await context.params).id;
  try {
    const portfolioDelete = await prisma.portfolio.delete({
      where: { id },
    });
    return NextResponse.json(portfolioDelete, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("포트폴리오 삭제 실패", { status: 500 });
  }
}
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const id = (await context.params).id;
  try {
    const portfolioId = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        Skills: true,
        Role: true,
      },
    });
    return NextResponse.json(portfolioId, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("포트폴리오 가져오기 실패", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  const {
    title,
    period,
    members,
    description,
    detail,
    thumb,
    github,
    path,
    skillIds,
    roleIds,
  } = await req.json();
  const id = (await context.params).id;
  try {
    const portfolioUpdate = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        period,
        members,
        description,
        detail,
        thumb,
        github,
        path,
        Skills: {
          set: skillIds.map((id: string) => ({ id })),
        },
        Role: {
          set: roleIds.map((id: string) => ({ id })),
        },
      },
      include: {
        Skills: true,
        Role: true,
      },
    });
    return NextResponse.json(portfolioUpdate, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("포트폴리오 업데이트 실패", { status: 500 });
  }
}
