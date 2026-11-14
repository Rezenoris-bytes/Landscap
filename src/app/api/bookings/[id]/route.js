import { NextResponse } from "next/server";
import { updateBookingStatus, deleteBooking, verifyToken } from "@/lib/db";

async function checkAuth(request) {
  const token = request.cookies.get("access_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return false;
  const payload = await verifyToken(token);
  return payload && payload.role === "admin";
}

export async function PATCH(request, { params }) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ detail: "Not authorised" }, { status: 401 });
  }
  const { id } = params;
  const body = await request.json();
  const updated = await updateBookingStatus(id, body.status);
  if (!updated) {
    return NextResponse.json({ detail: "Booking not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ detail: "Not authorised" }, { status: 401 });
  }
  const { id } = params;
  await deleteBooking(id);
  return NextResponse.json({ ok: true });
}

