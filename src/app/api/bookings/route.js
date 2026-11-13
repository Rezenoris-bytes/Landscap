import { NextResponse } from "next/server";
import { createBooking, getBookings, verifyToken } from "@/lib/db";

export async function GET(request) {
  const token = request.cookies.get("access_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }
  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ detail: "Not authorised" }, { status: 401 });
  }

  const list = await getBookings();
  return NextResponse.json(list);
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.consent) {
      return NextResponse.json({ detail: "Please agree so we can contact you." }, { status: 422 });
    }

    const { consent, ...bookingData } = body;
    const newBooking = await createBooking(bookingData);
    return NextResponse.json(newBooking);
  } catch (err) {
    return NextResponse.json({ detail: err.message || "Failed to create booking" }, { status: 500 });
  }
}

