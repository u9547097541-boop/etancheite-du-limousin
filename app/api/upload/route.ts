import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TOKEN = Buffer.from("admin2:1234").toString("base64");

function isAuthenticated(req: NextRequest): boolean {
  return req.cookies.get("admin_token")?.value === TOKEN;
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });
    }

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    const fileName = `${timestamp}-${originalName}`;

    const uploadDir = path.join(process.cwd(), "public", "images", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/images/uploads/${fileName}`,
    });
  } catch {
    return NextResponse.json({ error: "Erreur d'upload" }, { status: 500 });
  }
}
