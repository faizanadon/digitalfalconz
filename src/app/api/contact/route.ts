import { NextResponse } from "next/server";
import { sendContactNotificationEmail, type ContactFormData } from "@/lib/email";
import { sendToGHL } from "@/lib/ghl";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Spam protection: honeypot field
    if (body._hp) {
      console.warn("[Spam detected] Honeypot field filled. Dropping request silently.");
      return NextResponse.json({
        ok: true,
        message: "Thank you. Your enquiry has been received.",
      });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const goals = String(body.goals ?? "").trim();
    const privacy = Boolean(body.privacy);

    // Validation
    if (!name || !email || !goals) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please fill in your name, work email and what you are trying to achieve so we can reply with something specific.",
        },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          ok: false,
          error: "That email address doesn't look complete — check it and try again.",
        },
        { status: 400 }
      );
    }

    if (!privacy) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please confirm the privacy acknowledgement before sending your enquiry.",
        },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      name,
      email,
      company: String(body.company ?? "").trim() || undefined,
      website: String(body.website ?? "").trim() || undefined,
      country: String(body.country ?? "").trim() || undefined,
      help: String(body.help ?? "").trim() || undefined,
      investment: String(body.investment ?? "").trim() || undefined,
      start: String(body.start ?? "").trim() || undefined,
      goals,
      brief: String(body.brief ?? "").trim() || undefined,
    };

    // Dispatch concurrently to GHL and Email notification
    const [ghlResult, emailResult] = await Promise.allSettled([
      sendToGHL(formData),
      sendContactNotificationEmail(formData),
    ]);

    if (ghlResult.status === "rejected") {
      console.error("[GHL Error]", ghlResult.reason);
    } else if (!ghlResult.value.success) {
      console.warn("[GHL Warning]", ghlResult.value.error);
    }

    if (emailResult.status === "rejected") {
      console.error("[Email Error]", emailResult.reason);
    } else if (!emailResult.value.success) {
      console.warn("[Email Warning]", emailResult.value.error);
    }

    return NextResponse.json({
      ok: true,
      message:
        "Thank you. Your enquiry has been received. We'll review the details and respond through the contact information you provided.",
    });
  } catch (err: any) {
    console.error("API error in /api/contact:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "An unexpected error occurred while processing your enquiry. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}
