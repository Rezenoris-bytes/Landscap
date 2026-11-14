import { NextResponse } from "next/server";
import { verifyAdminLogin, createToken } from "@/lib/db";
import { checkRateLimit, resetRateLimit, getClientIp } from "@/lib/security";

export async function POST(request) {
  const clientIp = getClientIp(request);
  const rateLimitKey = `login_${clientIp}`;

  // Check rate limit: 5 attempts per 15 minutes
  const limitStatus = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
  if (limitStatus.limited) {
    return NextResponse.json(
      { detail: `Too many failed login attempts. Please try again in ${limitStatus.retryAfter} seconds.` },
      {
        status: 429,
        headers: {
          "Retry-After": String(limitStatus.retryAfter),
        },
      }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.length > 100 ||
      password.length > 256
    ) {
      // Artificial delay on invalid input to mitigate timing attacks
      await new Promise((r) => setTimeout(r, 400));
      return NextResponse.json({ detail: "Invalid email or password" }, { status: 401 });
    }

    const user = await verifyAdminLogin(email, password);
    if (!user) {
      // Artificial delay on failed authentication
      await new Promise((r) => setTimeout(r, 400));
      return NextResponse.json({ detail: "Invalid email or password" }, { status: 401 });
    }

    // Login successful - clear rate limit for this IP
    resetRateLimit(rateLimitKey);

    const token = await createToken(user.id, user.email);
    const response = NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      token,
    });

    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ detail: "An unexpected error occurred during login." }, { status: 500 });
  }
}
