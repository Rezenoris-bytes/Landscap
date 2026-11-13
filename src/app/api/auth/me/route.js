export const runtime = 'edge';

import { NextResponse } from "next/server";
import { verifyToken, getAdminUser } from "@/lib/db";

export async function GET(request) {
  const token = request.cookies.get("access_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ detail: "Not authorised" }, { status: 401 });
  }

  const user = await getAdminUser();
  return NextResponse.json({
    id: user._id || user.id,
    email: user.email,
    name: user.name || "Admin",
    role: "admin",
  });
}

