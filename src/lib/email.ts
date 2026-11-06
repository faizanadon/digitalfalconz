import nodemailer from "nodemailer";
import { site } from "@/data/site";

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  website?: string;
  country?: string;
  help?: string;
  investment?: string;
  start?: string;
  goals: string;
  brief?: string;
}

/**
 * Creates a reusable nodemailer transport using environment variables.
 * Supports SMTP (Google Workspace, Zoho, Microsoft 365, Mailgun, SendGrid, etc.)
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function buildHtmlTemplate(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f7f7f5; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; border: 1px solid #e5ddc9; overflow: hidden; }
    .header { background: #000000; color: #ffffff; padding: 32px 28px; border-bottom: 3px solid #fcc04c; }
    .header h1 { margin: 0 0 6px; font-size: 22px; font-weight: 700; color: #fffdf8; }
    .header p { margin: 0; font-size: 14px; color: #c9c9c2; }
    .badge { display: inline-block; background: #feda6b; color: #000000; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 999px; margin-bottom: 12px; }
    .content { padding: 28px; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #8a6d1a; margin-top: 24px; margin-bottom: 12px; border-bottom: 1px solid #f3ecdc; padding-bottom: 4px; }
    .field-row { display: flex; padding: 8px 0; border-bottom: 1px solid #f8f6f0; font-size: 15px; }
    .field-label { width: 170px; font-weight: 600; color: #555; flex-shrink: 0; }
    .field-value { color: #111; word-break: break-word; flex-grow: 1; }
    .field-value a { color: #000; font-weight: 600; text-decoration: underline; }
    .goals-box { background: #fffdf8; border: 1px solid #e5ddc9; border-radius: 6px; padding: 16px; margin-top: 8px; white-space: pre-wrap; font-size: 15px; color: #222; }
    .footer { background: #141412; color: #8a8a84; padding: 20px 28px; font-size: 13px; text-align: center; }
    .footer a { color: #feda6b; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">New Lead · Contact Form</div>
      <h1>Project Enquiry: ${escapeHtml(data.name)}</h1>
      <p>Submitted via digitalfalconz.com contact page</p>
    </div>
    
    <div class="content">
      <div class="section-title">Client Details</div>
      <div class="field-row">
        <div class="field-label">Full Name:</div>
        <div class="field-value"><strong>${escapeHtml(data.name)}</strong></div>
      </div>
      <div class="field-row">
        <div class="field-label">Email Address:</div>
        <div class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>
      <div class="field-row">
        <div class="field-label">Company:</div>
        <div class="field-value">${escapeHtml(data.company || "Not specified")}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Website / URL:</div>
        <div class="field-value">${data.website ? `<a href="${ensureUrl(data.website)}" target="_blank">${escapeHtml(data.website)}</a>` : "Not specified"}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Country / Timezone:</div>
        <div class="field-value">${escapeHtml(data.country || "Not specified")}</div>
      </div>

      <div class="section-title">Project Scope</div>
      <div class="field-row">
        <div class="field-label">Help Needed With:</div>
        <div class="field-value"><strong>${escapeHtml(data.help || "Not specified")}</strong></div>
      </div>
      <div class="field-row">
        <div class="field-label">Investment Range:</div>
        <div class="field-value">${escapeHtml(data.investment || "Not specified")}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Desired Start:</div>
        <div class="field-value">${escapeHtml(data.start || "Not specified")}</div>
      </div>
      ${data.brief ? `
      <div class="field-row">
        <div class="field-label">Brief / Attachment:</div>
        <div class="field-value"><a href="${ensureUrl(data.brief)}" target="_blank">${escapeHtml(data.brief)}</a></div>
      </div>
      ` : ""}

      <div class="section-title">What They Want to Achieve</div>
      <div class="goals-box">${escapeHtml(data.goals)}</div>
    </div>

    <div class="footer">
      Sent automatically by DigitalFalconz website backend · Reply directly to this email to contact the lead.
    </div>
  </div>
</body>
</html>
  `.trim();
}

function buildTextTemplate(data: ContactFormData): string {
  return `
NEW PROJECT ENQUIRY (DigitalFalconz Contact Page)
==================================================

CLIENT DETAILS:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company || "—"}
- Website: ${data.website || "—"}
- Country / Timezone: ${data.country || "—"}

PROJECT SCOPE:
- Help with: ${data.help || "—"}
- Investment: ${data.investment || "—"}
- Desired start: ${data.start || "—"}
- Brief / Document: ${data.brief || "—"}

WHAT THEY ARE TRYING TO ACHIEVE:
${data.goals}

==================================================
Submitted at: ${new Date().toISOString()}
  `.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function ensureUrl(url: string): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

/**
 * Sends a notification email to contact@digitalfalconz.com (or process.env.NOTIFICATION_EMAIL)
 * Supports SMTP (via nodemailer) or Resend API if RESEND_API_KEY is configured.
 */
export async function sendContactNotificationEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const recipient = process.env.NOTIFICATION_EMAIL || site.email || "contact@digitalfalconz.com";
  const subject = `New Project Enquiry: ${data.name}${data.company ? ` (${data.company})` : ""}`;
  const html = buildHtmlTemplate(data);
  const text = buildTextTemplate(data);

  // 1. Try Resend API if configured
  if (process.env.RESEND_API_KEY) {
    try {
      const from = process.env.RESEND_FROM || `DigitalFalconz Web <onboarding@resend.dev>`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: recipient,
          reply_to: data.email,
          subject,
          html,
          text,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Resend API error:", errorText);
        return { success: false, error: `Resend API failed: ${res.statusText}` };
      }
      return { success: true };
    } catch (err: any) {
      console.error("Failed to send email via Resend:", err);
      return { success: false, error: err?.message };
    }
  }

  // 2. Try SMTP via Nodemailer
  const transporter = getTransporter();
  if (transporter) {
    try {
      const from = process.env.SMTP_FROM || `"DigitalFalconz Form" <${process.env.SMTP_USER}>`;
      await transporter.sendMail({
        from,
        to: recipient,
        replyTo: data.email,
        subject,
        text,
        html,
      });
      return { success: true };
    } catch (err: any) {
      console.error("Failed to send email via SMTP:", err);
      return { success: false, error: err?.message };
    }
  }

  // 3. Fallback when credentials are not yet defined in environment
  console.warn(
    "[sendContactNotificationEmail] Neither SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS) nor RESEND_API_KEY configured in environment. Lead was logged to console.",
    { name: data.name, email: data.email, company: data.company, recipient }
  );
  return { success: false, error: "Email service credentials not configured in environment." };
}
