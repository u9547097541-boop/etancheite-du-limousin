import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TOKEN = Buffer.from("admin2:1234").toString("base64");

function isAuthenticated(req: NextRequest): boolean {
  return req.cookies.get("admin_token")?.value === TOKEN;
}

// GET /api/content?file=home
export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const file = req.nextUrl.searchParams.get("file");
  if (!file || !/^[a-z]+$/.test(file)) {
    return NextResponse.json({ error: "Fichier invalide" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "content", `${file}.json`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Fichier introuvable" }, { status: 404 });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}

// POST /api/content  { file: "home", data: { ... } }
export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { file, data } = await req.json();
    if (!file || !/^[a-z]+$/.test(file)) {
      return NextResponse.json({ error: "Fichier invalide" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "content", `${file}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur de sauvegarde" }, { status: 500 });
  }
}
