import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  try {
    const skillCategory = await prisma.skillCategory.findMany();
    return NextResponse.json(skillCategory, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const body = await request.json();
    const { name, description } = body;
    const category = await prisma.skillCategory.create({
      data: {
        name,
        description: description || "",
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error("카테고리 생성 실패:", error);
    return new NextResponse("카테고리 생성 실패", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const { id } = await request.json();
    const deleteCategory = await prisma.skillCategory.delete({
      where: { id: id },
    });
    return NextResponse.json(deleteCategory);
  } catch (error) {
    console.error(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const body = await request.json();
    console.log("패치 요청 바디: ", body);

    const updatePromises = Object.entries(body)
      .filter(([id]) => id !== "new")
      .map(([id, name]) => {
        console.log("업데이트 항목:", { id, name }); // 추가

        return prisma.skillCategory.update({
          where: { id: String(id) },
          data: {
            name: name as string,
          },
        });
      });
    const updated = await Promise.all(updatePromises);

    return NextResponse.json(updated);
  } catch (error) {
    console.error("카테고리 수정 실패 : ", error);
    return new NextResponse("업데이트 실패", { status: 500 });
  }
}
