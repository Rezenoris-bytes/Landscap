/**
 * Security & Sanitization Utilities for Blue Heaven Landscape
 */

// In-memory sliding window store for rate limiting (per serverless instance)
const rateLimitMap = new Map();

/**
 * Checks and increments rate limit for a given key (e.g. IP or email).
 * Automatically resets expired windows.
 * 
 * @param {string} key Unique identifier (IP, email, or composite)
 * @param {number} maxAttempts Maximum allowed requests in the window
 * @param {number} windowMs Window duration in milliseconds
 * @returns {{ limited: boolean, remaining: number, retryAfter: number }}
 */
export function checkRateLimit(key, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  let entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    entry = { count: 1, resetTime: now + windowMs };
    rateLimitMap.set(key, entry);
    return { limited: false, remaining: maxAttempts - 1, retryAfter: 0 };
  }

  entry.count += 1;
  rateLimitMap.set(key, entry);

  if (entry.count > maxAttempts) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return { limited: true, remaining: 0, retryAfter };
  }

  return { limited: false, remaining: maxAttempts - entry.count, retryAfter: 0 };
}

/**
 * Reset rate limit count (e.g. on successful login)
 */
export function resetRateLimit(key) {
  rateLimitMap.delete(key);
}

/**
 * Extracts client IP from request headers safely
 */
export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

/**
 * Strips HTML and script tags to prevent stored XSS and injection
 */
export function sanitizeText(input, maxLength = 255) {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates email addresses against standard RFC 5322 pattern
 */
export function isValidEmail(email) {
  if (typeof email !== "string" || email.length > 100) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates phone numbers (supports international and local formats)
 */
export function isValidPhone(phone) {
  if (typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, "");
  // Must have at least 7 digits and at most 15 digits (E.164 standard)
  if (digits.length < 7 || digits.length > 15) return false;
  // Allow only valid phone characters: digits, +, -, (, ), spaces
  return /^[\d\+\-\(\)\s]{7,30}$/.test(phone.trim());
}

/**
 * Constant-time string equality check to mitigate timing side-channel attacks.
 * Computes SHA-256 digests and bitwise XORs all bytes.
 */
export async function timingSafeEqual(strA, strB) {
  if (typeof strA !== "string" || typeof strB !== "string") return false;
  const enc = new TextEncoder();
  const [digestA, digestB] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(strA)),
    crypto.subtle.digest("SHA-256", enc.encode(strB)),
  ]);
  const a = new Uint8Array(digestA);
  const b = new Uint8Array(digestB);
  let diff = strA.length ^ strB.length;
  for (let i = 0; i < 32; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}
