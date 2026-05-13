import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Rate limiting ────────────────────────────────────────────────────────────
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// ── Validation ───────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  website?: string;
}

function validate(body: ContactPayload): string | null {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2 || name.length > 80) {
    return "Name must be between 2 and 80 characters.";
  }
  if (!EMAIL_RE.test(email)) {
    return "A valid email address is required.";
  }
  if (message.length < 5 || message.length > 5000) {
    return "Message must be between 5 and 5000 characters.";
  }
  return null;
}

// ── Email templates ──────────────────────────────────────────────────────────
function buildOwnerHtml(
  name: string,
  email: string,
  message: string,
  timestamp: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif;color:#e5e5e5;">
  <div style="max-width:560px;margin:32px auto;background:#141414;border-radius:12px;overflow:hidden;border:1px solid #262626;">
    <div style="padding:24px 28px;background:#10b981;border-bottom:1px solid #059669;">
      <h1 style="margin:0;font-size:18px;font-weight:700;color:#fff;">New portfolio inquiry</h1>
      <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.85);">${timestamp}</p>
    </div>
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
        <tr>
          <td style="padding:8px 0;color:#a3a3a3;width:80px;">From</td>
          <td style="padding:8px 0;font-weight:600;color:#f5f5f5;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#a3a3a3;">Email</td>
          <td style="padding:8px 0;">
            <a href="mailto:${escapeHtml(email)}" style="color:#10b981;text-decoration:none;">${escapeHtml(email)}</a>
          </td>
        </tr>
      </table>
      <div style="background:#1a1a1a;border-radius:8px;padding:16px 20px;border-left:3px solid #10b981;">
        <p style="margin:0;font-size:13px;color:#a3a3a3;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;">Message</p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#e5e5e5;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <p style="margin:20px 0 0;font-size:12px;color:#525252;">Hit reply to respond directly — the reply-to is already set to ${escapeHtml(email)}.</p>
    </div>
  </div>
</body>
</html>`;
}

function buildOwnerText(
  name: string,
  email: string,
  message: string,
  timestamp: string
): string {
  return `New portfolio inquiry — ${timestamp}

From: ${name}
Email: ${email}

Message:
${message}

---
Hit reply to respond directly.`;
}

function buildSenderHtml(name: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif;color:#e5e5e5;">
  <div style="max-width:560px;margin:32px auto;background:#141414;border-radius:12px;overflow:hidden;border:1px solid #262626;">
    <div style="padding:24px 28px;background:#10b981;border-bottom:1px solid #059669;">
      <h1 style="margin:0;font-size:18px;font-weight:700;color:#fff;">Thanks for reaching out!</h1>
      <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.85);">Keenan Fernandes — Full-Stack AI Engineer</p>
    </div>
    <div style="padding:28px;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">
        Thanks for getting in touch — I've received your message and will get back to you within a few days.
      </p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;">
        In the meantime, feel free to connect on
        <a href="https://www.linkedin.com/in/keenan-fernandes-9906b4171/" style="color:#10b981;text-decoration:none;">LinkedIn</a>.
      </p>
      <div style="background:#1a1a1a;border-radius:8px;padding:16px 20px;border-left:3px solid #10b981;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;color:#a3a3a3;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;">Your message</p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#e5e5e5;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <p style="margin:0;font-size:15px;line-height:1.7;">
        Cheers,<br />
        <strong>Keenan</strong>
      </p>
    </div>
    <div style="padding:16px 28px;border-top:1px solid #262626;">
      <p style="margin:0;font-size:11px;color:#525252;">
        You're receiving this because you submitted the contact form at keenanfernandes.dev.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildSenderText(name: string, message: string): string {
  return `Hi ${name},

Thanks for getting in touch — I've received your message and will get back to you within a few days.

Feel free to connect on LinkedIn: https://www.linkedin.com/in/keenan-fernandes-9906b4171/

--- Your original message ---
${message}
-----------------------------

Cheers,
Keenan Fernandes`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Rate limiting
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests, try again later." },
      { status: 429 }
    );
  }

  // Parse body
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot check
  if (body.website) {
    // Silently accept — don't reveal the trap to bots
    return NextResponse.json({ ok: true });
  }

  // Server-side validation
  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();

  // Resend API key check
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — cannot send email.");
    return NextResponse.json(
      { error: "Email service unavailable." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const fromAddress =
    process.env.EMAIL_FROM ?? "Keenan Fernandes <onboarding@resend.dev>";
  const timestamp = new Date().toUTCString();

  try {
    const [ownerResult, senderResult] = await Promise.all([
      resend.emails.send({
        from: fromAddress,
        to: "keenan030900@gmail.com",
        replyTo: email,
        subject: `New portfolio inquiry from ${name}`,
        html: buildOwnerHtml(name, email, message, timestamp),
        text: buildOwnerText(name, email, message, timestamp),
      }),
      resend.emails.send({
        from: fromAddress,
        to: email,
        subject: "Thanks for reaching out — Keenan Fernandes",
        html: buildSenderHtml(name, message),
        text: buildSenderText(name, message),
      }),
    ]);

    if (ownerResult.error || senderResult.error) {
      console.error("[contact] Resend error:", {
        owner: ownerResult.error,
        sender: senderResult.error,
      });
      return NextResponse.json(
        { error: "Email service unavailable." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error sending email:", err);
    return NextResponse.json(
      { error: "Email service unavailable." },
      { status: 502 }
    );
  }
}
