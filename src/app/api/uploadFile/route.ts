import { requireAdmin } from "@/lib/requireAdmin";
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: Request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const formdata = await req.formData();
    const file: File | null = formdata.get("file") as File;
    const rawSubPath = formdata.get("subPath") as string;

    if (!file || !rawSubPath) {
      return NextResponse.json(
        { error: "파일 또는 경로 없음" },
        { status: 400 }
      );
    }
    const subPath = rawSubPath.replace(/^\/+/, "");
    if (subPath.includes("..")) {
      return NextResponse.json({ error: "잘못된 경로" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}_${file.name}`;
    const uploadPath = join(process.cwd(), "public", "upload", subPath);
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    const fullPath = join(uploadPath, filename);

    await writeFile(fullPath, buffer);

    return NextResponse.json({ filename, fullPath });
  } catch (error) {
    console.error("파일 업로드 중 에러:", error);
    return NextResponse.json({ error: "서버 내부 오류 발생" }, { status: 500 });
  }
}
