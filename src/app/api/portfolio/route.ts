import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  try {
    const portfolios = await prisma.portfolio.findMany({
      include: {
        Skills: true,
        Role: true,
      },
    });
    return NextResponse.json(portfolios, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("포트폴리오 가져오기 실패", { status: 500 });
  }
}
