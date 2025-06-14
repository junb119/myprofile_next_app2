import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  const body = await request.json();
  const {
    title,
    period,
    skillIds,
    roleIds,
    members,
    description,
    detail,
    thumb,
    github,
    path,
    attribute,
    modalTags,
  } = body;

  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        period,
        Skills: { connect: skillIds.map((id: string) => ({ id })) },
        Role: { connect: roleIds.map((id: string) => ({ id })) },
        members,
        description,
        detail,
        thumb,
        github,
        path,
        modalTags,
        attribute,
      },
    });
    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("실패", { status: 500 });
  }
}
