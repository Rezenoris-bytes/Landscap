import { NextResponse } from "next/server";
import { deleteProject, verifyToken } from "@/lib/db";
import { sanitizeText } from "@/lib/security";

export async function DELETE(request, { params }) {
  const token = request.cookies.get("access_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }
  const payload = await verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ detail: "Not authorised" }, { status: 401 });
  }

  const id = sanitizeText(params?.id, 100);
  if (!id) {
    return NextResponse.json({ detail: "Invalid project ID" }, { status: 400 });
  }

  await deleteProject(id);
  return NextResponse.json({ ok: true });
}
