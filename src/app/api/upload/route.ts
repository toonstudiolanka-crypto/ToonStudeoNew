import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "@/lib/auth";
import { ensureDirs, uploadsDir } from "@/lib/content";
import { validateUploadFile, VIDEO_MIME_TYPES } from "@/lib/upload-limits";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const validationError = validateUploadFile(file, "both");
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const isVideo = VIDEO_MIME_TYPES.includes(file.type as (typeof VIDEO_MIME_TYPES)[number]);

  await ensureDirs();
  const ext = path.extname(file.name) || (isVideo ? ".mp4" : ".jpg");
  const filename = `${uuidv4()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir(), filename), buffer);

  return NextResponse.json({
    url: `/uploads/${filename}`,
    type: isVideo ? "video" : "image",
  });
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url } = (await request.json()) as { url?: string };
  if (!url?.startsWith("/uploads/")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const { deleteUploadedFile } = await import("@/lib/content");
  await deleteUploadedFile(url);
  return NextResponse.json({ ok: true });
}
