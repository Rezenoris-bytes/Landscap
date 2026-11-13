export const runtime = 'edge';

import { NextResponse } from "next/server";
import { verifyAdminLogin, createToken } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ detail: "Email and password required" }, { status: 400 });
    }

    const user = await verifyAdminLogin(email, password);
    if (!user) {
      return NextResponse.json({ detail: "Wrong email or password" }, { status: 401 });
    }

    const token = await createToken(user.id, user.email);
    const response = NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      token,
    });

    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ detail: err.message || "Login failed" }, { status: 500 });
  }
}

