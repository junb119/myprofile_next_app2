// import { requireAdmin } from "@/lib/requireAdmin";
// import { existsSync, mkdirSync } from "fs";
// import { writeFile } from "fs/promises";
// import { NextResponse } from "next/server";
// import { join } from "path";

// export async function POST(req: Request) {
//   const { authorized, response } = await requireAdmin();
//   if (!authorized) return response;

//   try {
//     const formdata = await req.formData();
//     const file: File | null = formdata.get("file") as File;
//     const rawSubPath = formdata.get("subPath") as string;

//     if (!file || !rawSubPath) {
//       return NextResponse.json(
//         { error: "파일 또는 경로 없음" },
//         { status: 400 }
//       );
//     }
//     const subPath = rawSubPath.replace(/^\/+/, "");
//     if (subPath.includes("..")) {
//       return NextResponse.json({ error: "잘못된 경로" }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const filename = `${Date.now()}_${file.name}`;
//     const uploadPath = join(process.cwd(), "public", "upload", subPath);
//     if (!existsSync(uploadPath)) {
//       mkdirSync(uploadPath, { recursive: true });
//     }
//     const fullPath = join(uploadPath, filename);

//     await writeFile(fullPath, buffer);

//     return NextResponse.json({ filename, fullPath });
//   } catch (error) {
//     console.error("파일 업로드 중 에러:", error);
//     return NextResponse.json({ error: "서버 내부 오류 발생" }, { status: 500 });
//   }
// }

// app/api/uploadFile/route.ts
import { requireAdmin } from "@/lib/requireAdmin";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const { authorized, response } = await requireAdmin();
  if (!authorized) return response;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const rawPath = formData.get("subPath") as string; // ex: "about/profile"
    const publicId = formData.get("publicId") as string | null; // (선택) 덮어쓰기용 id
    console.log("🧩 publicId =", publicId);

    if (!file || !rawPath) {
      return NextResponse.json(
        { error: "파일 또는 경로(subPath) 없음" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: rawPath.replace(/^\/+/, ""), // 슬래시 제거
            public_id: publicId ?? undefined, // 지정 시 덮어쓰기
            overwrite: true,
            resource_type: "image",
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json(
      {
        secure_url: result.secure_url,
        public_id: result.public_id,
        url: result.url, // optional
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cloudinary 업로드 에러:", error);
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }
}
