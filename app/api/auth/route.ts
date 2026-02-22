import { NextRequest, NextResponse } from "next/server";

const ADMIN_USER = "admin2";
const ADMIN_PASS = "1234";

// Simple token (in production, use JWT or a proper session library)
const TOKEN = Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString("base64");

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_token", TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return response;
    }

    return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}

// Check auth status
export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (token === TOKEN) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
