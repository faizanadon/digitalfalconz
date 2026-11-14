"use client";
import { useEffect, useRef, useState } from "react";
import { Calendar, MessageCircle, Send, X } from "lucide-react";

const BOOKING_URL = "https://meet.digitalfalconz.com/";

const GREETING =
  "Hi! I'm DigitalFalconz's AI assistant. Ask me about our services — performance marketing, websites, booking systems, CRM and AI — or book a free consultation call and we'll talk through your project.";

const BOOK_CHIP = "Book a free call";

const QUICK_REPLIES = [
  BOOK_CHIP,
  "What services do you offer?",
  "Tell me about DigitalFalconz",
];

type Msg = { role: "user" | "assistant"; text: string; showBook?: boolean };

// Render the booking URL inside a bot reply as a real link.
function renderText(text: string) {
  return text.split(BOOKING_URL).map((part, i) =>
    i === 0 ? (
      <span key={i}>{part}</span>
    ) : (
      <span key={i}>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          {BOOKING_URL}
        </a>
        {part}
      </span>
    )
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: GREETING, showBook: true },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  // The "Talk to us" label hides while the user scrolls and comes back
  // ~300ms after scrolling stops.
  const [scrolling, setScrolling] = useState(false);
  const scrollingRef = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!scrollingRef.current) {
        scrollingRef.current = true;
        setScrolling(true);
      }
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        scrollingRef.current = false;
        setScrolling(false);
      }, 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  // Focus the input when the panel opens; Escape closes it.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  // Keep the latest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setInput("");

    const next: Msg[] = [...messages, { role: "user", text: trimmed }];

    // The booking chip answers locally — no API round-trip needed, and the
    // booking link is shown even when the AI is unavailable.
    if (trimmed === BOOK_CHIP) {
      setMessages([
        ...next,
        {
          role: "assistant",
          text: "Great — grab a free 30-minute consultation call with us here:",
          showBook: true,
        },
      ]);
      return;
    }

    setMessages(next);
    setTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply.trim()
          : null;
      if (reply) {
        setMessages([
          ...next,
          {
            role: "assistant",
            text: reply,
            showBook: data?.unavailable === true,
          },
        ]);
        if (data?.unavailable === true) setUnavailable(true);
      }
    } catch {
      // Never show a raw error — fall back to the friendly text + book button.
      setUnavailable(true);
      setMessages([
        ...next,
        {
          role: "assistant",
          text: "Thanks for reaching out! Our AI assistant is unavailable right now, but we'd love to chat — book a free consultation call and we'll talk through how DigitalFalconz can help.",
          showBook: true,
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="cb-root">
      {open && (
        <div
          className="cb-panel"
          role="dialog"
          aria-label="Chat with DigitalFalconz"
        >
          <div className="cb-head">
            <div>
              <p className="cb-title">Chat with DigitalFalconz</p>
              <p className="cb-sub">
                Ask about our services — or book a free call
              </p>
            </div>
            <button
              type="button"
              className="cb-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="cb-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`cb-msg cb-${m.role}`}>
                <div className="cb-bubble">
                  {m.role === "assistant" ? renderText(m.text) : m.text}
                </div>
                {m.showBook && (
                  <a
                    className="cb-book-inline"
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar size={15} /> Book a free call
                  </a>
                )}
              </div>
            ))}
            {typing && (
              <div className="cb-msg cb-assistant">
                <div className="cb-bubble cb-typing" aria-label="DigitalFalconz is typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <div className="cb-chips">
            {QUICK_REPLIES.map((chip) => (
              <button
                key={chip}
                type="button"
                className="cb-chip"
                onClick={() => send(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          <form
            className="cb-form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              className="cb-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              aria-label="Type your message"
              maxLength={1000}
            />
            <button
              type="submit"
              className="cb-send"
              aria-label="Send message"
              disabled={!input.trim() || typing}
            >
              <Send size={18} />
            </button>
          </form>

          <a
            className="cb-book"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Calendar size={16} /> Book a free call
          </a>
          {unavailable && (
            <p className="cb-note">
              Our AI assistant is unavailable right now — the button above
              still books you a free call.
            </p>
          )}
        </div>
      )}

      <div className="cb-launcher-row">
        <button
          type="button"
          className={`cb-label${open || scrolling ? " cb-label-hidden" : ""}`}
          onClick={() => setOpen(true)}
          aria-label="Talk to us — open chat with DigitalFalconz"
          aria-hidden={open || scrolling}
          tabIndex={open || scrolling ? -1 : 0}
        >
          Talk to us
        </button>
        <button
          type="button"
          className="cb-launcher"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat with DigitalFalconz"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <MessageCircle size={26} />}
        </button>
      </div>
    </div>
  );
}
