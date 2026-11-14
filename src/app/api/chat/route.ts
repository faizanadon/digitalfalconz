import { NextResponse } from "next/server";

// Current stable Flash model (verified against Google's official model docs,
// ai.google.dev/gemini-api/docs/models, 2026-11-14). gemini-2.5-flash is
// deprecated and no longer available to new keys; gemini-3.8-flash is the
// current stable Flash. Plain REST fetch — no SDK dependency.
const MODEL = "gemini-3.8-flash";

// Server-side only — never sent to the client.
const SYSTEM_PROMPT =
  "You are the friendly assistant for DigitalFalconz, a digital marketing, software and AI agency. " +
  "You answer questions about the agency's services: performance marketing, websites, booking systems, CRM and automation, and AI. " +
  "Your ONE goal is to lead the visitor to book a FREE consultation call. " +
  "The booking link is https://meet.digitalfalconz.com/ (they can also visit /meet or /discovery on the site, or /contact). " +
  "Be helpful and concise — a few sentences at most, never essays. " +
  "When useful, ask 1–2 short qualifying questions (e.g. what kind of business they run, what they need help with), then steer toward booking the call. " +
  "Never invent services, prices, client names, case studies, statistics, or availability. " +
  "If asked about pricing, say pricing is confirmed during scoping and offer to book a call to discuss it. " +
  "Never claim to be human — you are DigitalFalconz's AI assistant. " +
  "Keep every reply short.";

const FALLBACK_REPLY =
  "Thanks for reaching out! Our AI assistant is unavailable right now, but we'd love to chat — book a free consultation call and we'll talk through how DigitalFalconz can help.";

// The widget must never show a raw error: every failure path returns 200
// with the friendly fallback, and never leaks why the key is missing.
function unavailable() {
  return NextResponse.json({
    ok: false,
    unavailable: true,
    reply: FALLBACK_REPLY,
  });
}

type ChatMessage = { role: "user" | "assistant"; text: string };

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const raw: unknown[] = Array.isArray(body?.messages) ? body.messages : [];
    const messages: ChatMessage[] = raw
      .filter(
        (m: unknown): m is ChatMessage =>
          !!m &&
          typeof m === "object" &&
          (m as ChatMessage).role !== undefined &&
          ((m as ChatMessage).role === "user" ||
            (m as ChatMessage).role === "assistant") &&
          typeof (m as ChatMessage).text === "string" &&
          (m as ChatMessage).text.trim().length > 0
      )
      .slice(-10)
      .map((m) => ({ role: m.role, text: m.text.trim().slice(0, 1000) }));

    if (messages.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Please send a message." },
        { status: 400 }
      );
    }

    // Faizan adds GEMINI_API_KEY directly in Vercel Environment Variables.
    // Until then the widget shows the graceful fallback, never an error.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return unavailable();
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.text }],
          })),
          generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
        }),
        signal: AbortSignal.timeout(20000),
      }
    );

    if (!res.ok) {
      console.warn("[Chat API] Gemini request failed with status", res.status);
      return unavailable();
    }

    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts;
    const reply = Array.isArray(parts)
      ? parts
          .map((p: { text?: string }) => p.text ?? "")
          .join("")
          .trim()
      : "";

    if (!reply) {
      return unavailable();
    }

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    // Never log the key or the request body — status/message only.
    console.error(
      "API error in /api/chat:",
      err instanceof Error ? err.message : "unknown error"
    );
    return unavailable();
  }
}
