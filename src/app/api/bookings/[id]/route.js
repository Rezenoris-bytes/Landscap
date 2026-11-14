import { NextResponse } from "next/server";
import { updateBookingStatus, deleteBooking, verifyToken } from "@/lib/db";
import { sanitizeText } from "@/lib/security";

const VALID_STATUSES = new Set([
  "new",
  "contacted",
  "site_visit_scheduled",
  "proposal_sent",
  "converted",
  "closed",
  "cancelled",
]);

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
  const id = sanitizeText(params?.id, 100);
  if (!id) {
    return NextResponse.json({ detail: "Invalid booking ID" }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const status = typeof body.status === "string" ? body.status.trim().toLowerCase() : "";

  if (!VALID_STATUSES.has(status)) {
    return NextResponse.json(
      { detail: `Invalid status. Allowed values: ${Array.from(VALID_STATUSES).join(", ")}` },
      { status: 400 }
    );
  }

  const updated = await updateBookingStatus(id, status);
  if (!updated) {
    return NextResponse.json({ detail: "Booking not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ detail: "Not authorised" }, { status: 401 });
  }
  const id = sanitizeText(params?.id, 100);
  if (!id) {
    return NextResponse.json({ detail: "Invalid booking ID" }, { status: 400 });
  }

  await deleteBooking(id);
  return NextResponse.json({ ok: true });
}
