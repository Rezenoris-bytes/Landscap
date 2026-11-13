export const runtime = 'edge';

import { NextResponse } from "next/server";
import { deleteProject, verifyToken } from "@/lib/db";

export async function DELETE(request, { params }) {
  const token = request.cookies.get("access_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }
  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ detail: "Not authorised" }, { status: 401 });
  }

  const { id } = params;
  await deleteProject(id);
  return NextResponse.json({ ok: true });
}

