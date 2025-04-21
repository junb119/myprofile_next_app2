import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function uploadFile(
  file: File,
  subPath: string
): Promise<{ filename: string; fullPath: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}_${file.name}`;
  const uploadPath = join(process.cwd(), "public", "upload", subPath);
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }
  const fullPath = join(uploadPath, filename);

  await writeFile(fullPath, buffer);

  return { filename, fullPath };
}
