import { NextResponse } from "next/server";
import { createBooking, getBookings, verifyToken } from "@/lib/db";
import { sanitizeText, isValidEmail, isValidPhone, checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request) {
  const token = request.cookies.get("access_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }
  const payload = await verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ detail: "Not authorised" }, { status: 401 });
  }

  const list = await getBookings();
  return NextResponse.json(list);
}

export async function POST(request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`booking_${clientIp}`, 15, 60 * 60 * 1000); // 15 bookings per hour per IP
  if (rateLimit.limited) {
    return NextResponse.json(
      { detail: `Too many booking submissions. Please try again in ${rateLimit.retryAfter} seconds or contact us directly on WhatsApp.` },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));

    // Consent check
    if (!body.consent) {
      return NextResponse.json({ detail: "Please agree so we can contact you." }, { status: 422 });
    }

    // Name validation
    const name = sanitizeText(body.name, 100);
    if (!name || name.length < 2) {
      return NextResponse.json({ detail: "Please enter your name (at least 2 characters)." }, { status: 422 });
    }

    // Email validation
    const email = (body.email || "").trim().toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json({ detail: "Please enter a valid email address." }, { status: 422 });
    }

    // Phone validation
    const phone = sanitizeText(body.phone, 30);
    if (!isValidPhone(phone)) {
      return NextResponse.json({ detail: "Please enter a valid mobile number (10 digits)." }, { status: 422 });
    }

    // Space & Services
    const space = sanitizeText(body.space, 50);
    const services = Array.isArray(body.services)
      ? body.services.slice(0, 15).map((s) => sanitizeText(s, 50)).filter(Boolean)
      : [];

    // Optional fields
    const city = sanitizeText(body.city, 100);
    const timeline = sanitizeText(body.timeline, 60);
    const note = sanitizeText(body.note, 2000);
    const date = sanitizeText(body.date, 20);
    const time = sanitizeText(body.time, 30);

    const cleanBookingData = {
      name,
      email,
      phone,
      space,
      services,
      city,
      timeline,
      note,
      date,
      time,
    };

    const newBooking = await createBooking(cleanBookingData);
    return NextResponse.json(newBooking, { status: 201 });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to process booking. Please check your details." }, { status: 500 });
  }
}
