import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type Locale = "en" | "fr" | "nl";

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  locale?: string;
  projectType?: string;
  brand?: string;
  _honeypot?: string;
}

interface ValidatedContact {
  name: string;
  email: string;
  message: string;
  locale?: Locale;
  projectType?: string;
  brand?: string;
}

type ErrorCode = "VALIDATION" | "RATE_LIMIT" | "SEND_FAILED" | "INVALID_ORIGIN";

interface SuccessResponse {
  success: true;
}

interface ErrorResponse {
  error: string;
  code: ErrorCode;
}

const VALID_LOCALES: Locale[] = ["en", "fr", "nl"];

const ALLOWED_ORIGINS = [
  "https://vantir.studio",
  "https://www.vantir.studio",
  "https://studio-test-ten.vercel.app",
];

const COOLDOWN_MS = 30_000;
const HOURLY_WINDOW_MS = 3_600_000;
const HOURLY_LIMIT = 10;

interface RateLimitEntry {
  lastSubmit: number;
  hourlyCount: number;
  hourWindowStart: number;
}

// In-memory, per-server-instance rate limit. Resets on redeploy/restart and is
// not shared across serverless instances — acceptable for low-volume launch traffic.
const rateLimitByIp = new Map<string, RateLimitEntry>();

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  const allowedOrigins = [...ALLOWED_ORIGINS];
  if (process.env.NODE_ENV === "development") {
    allowedOrigins.push("http://localhost:3000");
  }
  return allowedOrigins.some((allowed) => origin.startsWith(allowed));
}

// Checks both the 30s cooldown and the rolling 10/hour cap in one pass.
// Returns true if the request should be rejected; otherwise records the
// attempt (so a single call both checks and consumes quota).
function checkAndConsumeRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitByIp.get(ip);

  if (!entry) {
    rateLimitByIp.set(ip, { lastSubmit: now, hourlyCount: 1, hourWindowStart: now });
    return false;
  }

  if (now - entry.lastSubmit < COOLDOWN_MS) {
    return true;
  }

  if (now - entry.hourWindowStart > HOURLY_WINDOW_MS) {
    entry.hourWindowStart = now;
    entry.hourlyCount = 0;
  }

  if (entry.hourlyCount >= HOURLY_LIMIT) {
    return true;
  }

  entry.lastSubmit = now;
  entry.hourlyCount += 1;
  return false;
}

function validateBody(
  body: Partial<ContactRequestBody>
): { valid: true; data: ValidatedContact } | { valid: false; error: string } {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const locale = VALID_LOCALES.includes(body.locale as Locale)
    ? (body.locale as Locale)
    : undefined;
  const projectType =
    typeof body.projectType === "string" && body.projectType.trim().length > 0
      ? body.projectType.trim().slice(0, 200)
      : undefined;
  const brand =
    typeof body.brand === "string" && body.brand.trim().length > 0
      ? body.brand.trim().slice(0, 200)
      : undefined;

  if (name.length < 2 || name.length > 100) {
    return { valid: false, error: "Name must be between 2 and 100 characters." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: "Please provide a valid email address." };
  }
  if (message.length < 10 || message.length > 5000) {
    return { valid: false, error: "Message must be between 10 and 5000 characters." };
  }

  return { valid: true, data: { name, email, message, locale, projectType, brand } };
}

function emailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid rgba(163,158,150,0.3);font-family:system-ui,-apple-system,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#5C5853;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid rgba(163,158,150,0.3);font-family:system-ui,-apple-system,sans-serif;font-size:15px;color:#0F0E0C;vertical-align:top;">${value}</td>
    </tr>`;
}

function buildEmailHtml(data: ValidatedContact): string {
  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const rows = [
    emailRow("From", escapeHtml(data.name)),
    emailRow("Email", escapeHtml(data.email)),
  ];
  if (data.brand) rows.push(emailRow("Brand / Company", escapeHtml(data.brand)));
  if (data.projectType) rows.push(emailRow("Project timeline", escapeHtml(data.projectType)));

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#F5F1EA;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F1EA;padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#F5F1EA;">
            <tr>
              <td style="padding:40px;">
                <h1 style="font-family:'Newsreader','Times New Roman',serif;font-size:24px;font-weight:400;color:#0F0E0C;margin:0 0 8px;">New inquiry — VANTIR Studio</h1>
                <p style="font-family:system-ui,-apple-system,sans-serif;font-size:13px;color:#A39E96;margin:0 0 32px;letter-spacing:0.05em;text-transform:uppercase;">Submitted via the contact form</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #A39E96;margin-bottom:24px;">
                  ${rows.join("")}
                </table>

                <p style="font-family:system-ui,-apple-system,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#5C5853;margin:0 0 8px;">Message</p>
                <p style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#0F0E0C;white-space:pre-wrap;margin:0 0 32px;">${escapeHtml(data.message)}</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #A39E96;">
                  <tr>
                    <td style="padding-top:16px;font-family:system-ui,-apple-system,sans-serif;font-size:12px;color:#5C5853;">
                      Submitted ${escapeHtml(submittedAt)} (Brussels time) &middot; Form locale: ${(data.locale ?? "en").toUpperCase()}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get("origin") || request.headers.get("referer");

  if (!isAllowedOrigin(origin)) {
    console.error("Rejected contact form request — invalid origin:", origin ?? "missing");
    const response: ErrorResponse = { error: "Forbidden", code: "INVALID_ORIGIN" };
    return NextResponse.json(response, { status: 403 });
  }

  const ip = getClientIp(request);

  let body: Partial<ContactRequestBody>;
  try {
    body = (await request.json()) as Partial<ContactRequestBody>;
  } catch {
    const response: ErrorResponse = { error: "Invalid request body.", code: "VALIDATION" };
    return NextResponse.json(response, { status: 400 });
  }

  // Bots that fill every field trip the hidden honeypot. Pretend success so
  // they don't learn the field is monitored, and skip rate-limit bookkeeping
  // and the Resend call entirely.
  if (typeof body._honeypot === "string" && body._honeypot.length > 0) {
    console.error("Honeypot triggered from IP:", ip);
    const response: SuccessResponse = { success: true };
    return NextResponse.json(response, { status: 200 });
  }

  if (checkAndConsumeRateLimit(ip)) {
    const response: ErrorResponse = {
      error: "Please wait a moment before sending another message.",
      code: "RATE_LIMIT",
    };
    return NextResponse.json(response, { status: 429 });
  }

  const validation = validateBody(body);
  if (!validation.valid) {
    const response: ErrorResponse = { error: validation.error, code: "VALIDATION" };
    return NextResponse.json(response, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("Resend environment variables are not configured.");
    const response: ErrorResponse = {
      error: "Email service is not configured.",
      code: "SEND_FAILED",
    };
    return NextResponse.json(response, { status: 500 });
  }

  const { name, email, message, locale, projectType, brand } = validation.data;
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: `VANTIR Studio <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New inquiry from ${name} · VANTIR contact form`,
      html: buildEmailHtml({ name, email, message, locale, projectType, brand }),
    });

    const response: SuccessResponse = { success: true };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Resend send failed:", error);
    const response: ErrorResponse = {
      error: "Failed to send message. Please try again later.",
      code: "SEND_FAILED",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
