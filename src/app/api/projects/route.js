import { NextResponse } from "next/server";
import { getProjects, createProject, verifyToken } from "@/lib/db";
import { sanitizeText } from "@/lib/security";

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
    const rawTitle = formData.get("title");
    const rawType = formData.get("type");

    if (!rawTitle || typeof rawTitle !== "string" || rawTitle.trim().length < 2) {
      return NextResponse.json({ detail: "Project title is required (at least 2 characters)." }, { status: 400 });
    }
    if (!rawType || typeof rawType !== "string" || rawType.trim().length < 2) {
      return NextResponse.json({ detail: "Project type is required." }, { status: 400 });
    }

    const title = sanitizeText(rawTitle, 150);
    const type = sanitizeText(rawType, 50);
    const place = sanitizeText(formData.get("place") || "", 100);
    const service = sanitizeText(formData.get("service") || "", 100);
    const summary = sanitizeText(formData.get("summary") || "", 2000);

    const proj = await createProject({
      title,
      type,
      place,
      service,
      summary,
      before_path: "",
      after_path: "/img/ba/villa-after.webp",
    });

    return NextResponse.json(proj, { status: 201 });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to create project." }, { status: 500 });
  }
}
