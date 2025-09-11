import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { fileUrl } = await req.json();

    if (!fileUrl) {
      return NextResponse.json({ error: "لم يتم تمرير رابط الملف" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public/uploads", path.basename(fileUrl));

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // حذف الملف
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "فشل حذف الملف" }, { status: 500 });
  }
}
