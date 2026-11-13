export const runtime = 'edge';

import { NextResponse } from "next/server";
import { getProjects, createProject, verifyToken } from "@/lib/db";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request) {
  const token = request.cookies.get("access_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }
  const payload = await verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ detail: "Not authorised" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const type = formData.get("type");
    const place = formData.get("place") || "";
    const service = formData.get("service") || "";
    const summary = formData.get("summary") || "";

    // For image paths, use uploaded file or placeholder
    const proj = await createProject({
      title,
      type,
      place,
      service,
      summary,
      before_path: "",
      after_path: "/img/ba/villa-after.webp",
    });

    return NextResponse.json(proj);
  } catch (err) {
    return NextResponse.json({ detail: err.message || "Failed to create project" }, { status: 500 });
  }
}

