import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Blue Heaven Landscape API (Next.js)" });
}

