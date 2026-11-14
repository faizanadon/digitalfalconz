"use client";
import { useEffect, useRef, useState } from "react";
import { Calendar, Send, X } from "lucide-react";

const BOOKING_URL = "https://meet.digitalfalconz.com/";

// Claude's starburst mark (MingCute "Claude Line", Apache 2.0) as an
// inline SVG — the launcher icon. Claude's brand orange #D97757 is
// darkened to #A34A1F in .cb-launcher .cb-claude so the mark reads on
// the gold launcher (the plain orange is ~1.9:1 on gold; the darkened
// one is ~3.6:1). The bot itself stays Gemini-powered — icon only.
function ClaudeMark() {
  return (
    <svg
      className="cb-claude"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g fill="none">
        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M13.604 2.006a1 1 0 0 1 .89 1.099l-.643 6.104l3.868-4.834a1 1 0 0 1 1.562 1.25l-4.19 5.237l5.68-1.336a1.001 1.001 0 0 1 .458 1.948l-3.77.886l3.715.656a1 1 0 1 1-.348 1.968l-4.901-.865l4.225 3.622a.999.999 0 1 1-1.3 1.518l-2.324-1.991l1.331 2.217a1 1 0 0 1-1.715 1.03l-2.992-4.988l-.657 5.59a1 1 0 0 1-1.986-.234l.556-4.732l-3.256 4.44a1 1 0 0 1-1.614-1.183l2.564-3.497l-3.242 1.947a1 1 0 0 1-1.03-1.715l4.693-2.817L2.948 13a1 1 0 0 1 .105-1.998l6.218.327L3.901 7.3A1 1 0 1 1 5.1 5.7l4.446 3.335l-2.93-5.57a1 1 0 0 1 1.769-.93l3.466 6.584l.655-6.223a1 1 0 0 1 1.098-.89"
        />
      </g>
    </svg>
  );
}

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

          <div
            className="cb-messages"
            ref={listRef}
            // Lenis smooth-scrolls the whole page and intercepts wheel
            // events inside nested scrollables — data-lenis-prevent lets
            // this message list scroll natively instead (same pattern as
            // the mobile menu in Header.tsx).
            data-lenis-prevent
          >
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
          {open ? <X size={26} /> : <ClaudeMark />}
        </button>
      </div>
    </div>
  );
}
