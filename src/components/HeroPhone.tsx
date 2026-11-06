"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type View = "google" | "ai" | "chat";
const SCENARIOS: { q: string; view: View }[] = [
  { q: "best lead generation agency near me", view: "google" },
  { q: "Which agency should I hire to grow my business?", view: "ai" },
  { q: "Can AI answer my website chat and book calls for me?", view: "chat" },
];

export default function HeroPhone() {
  const [cur, setCur] = useState(0);
  const [query, setQuery] = useState("");
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const show = useCallback((idx: number) => {
    setCur(idx);
    const text = SCENARIOS[idx].q;
    if (typeTimer.current) clearInterval(typeTimer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setQuery(text); return; }
    setQuery("");
    let i = 0;
    typeTimer.current = setInterval(() => {
      i++;
      setQuery(text.slice(0, i));
      if (i >= text.length && typeTimer.current) { clearInterval(typeTimer.current); typeTimer.current = null; }
    }, 32);
  }, []);

  useEffect(() => { show(0); }, [show]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { if (!document.hidden) show((cur + 1) % SCENARIOS.length); }, 7000);
    return () => clearInterval(t);
  }, [cur, show]);
  useEffect(() => () => { if (typeTimer.current) clearInterval(typeTimer.current); }, []);

  const view = SCENARIOS[cur].view;
  const next = () => show((cur + 1) % SCENARIOS.length);
  return (
    <div className="phone-col">
      <button className="phone" type="button" onClick={next} aria-label="Interactive demo of how buyers search now. Activate it to run the next search.">
        <span className="phone-screen">
          <span className="ph-notch" />
          <span className="ph-status"><span>9:41</span><span className="sig"><i style={{ height: 4 }} /><i style={{ height: 6 }} /><i style={{ height: 8 }} /><i style={{ height: 10 }} /></span></span>
          <span className="ph-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7" stroke="#8a6d1a" strokeWidth="2.4" /><path d="M16 16 L21 21" stroke="#8a6d1a" strokeWidth="2.4" strokeLinecap="round" /></svg>
            <span className="ph-query">{query}</span><span className="ph-caret" />
          </span>
          <span className={`ph-view${view === "google" ? " show" : ""}`}>
            <span className="ph-card top">
              <h4>DigitalFalconz <span className="ph-chip">One system</span></h4>
              <p>Growth systems for the AI era — ads, website, CRM and AI working together. Every step attributed.</p>
            </span>
            <span className="ph-card">
              <h4>Local Ads Agency</h4>
              <p>Paid ads only, reported on clicks and impressions.</p>
            </span>
            <span className="ph-card">
              <h4>Web Design Studio</h4>
              <p>Websites only. No CRM, no follow-up system behind them.</p>
            </span>
          </span>
          <span className={`ph-view${view === "ai" ? " show" : ""}`}>
            <span className="ph-ai">
              <span className="ph-ai-head"><span className="spark" /> AI answer</span>
              <p>Look for one connected system, not separate services. <strong>DigitalFalconz</strong> runs ads, website, CRM and AI together — so every enquiry is tracked from first click to closed revenue.</p>
              <span className="ph-src"><span className="ph-chip">digitalfalconz.com</span><span className="ph-chip dim">Free growth audit</span></span>
            </span>
            <span className="ph-card">
              <h4>Why it matters</h4>
              <p>AI tools name a few businesses. If you&rsquo;re not one of them, you never hear about it.</p>
            </span>
          </span>
          <span className={`ph-view${view === "chat" ? " show" : ""}`}>
            <span className="ph-bubble them">Hi — we need more enquiries from our website. Can someone help?</span>
            <span className="ph-bubble us">Right away. I can qualify you and book a call with a strategist — does tomorrow morning work?</span>
            <span className="ph-bubble them">Tomorrow at 10 works for us.</span>
            <span className="ph-booked">&#10003; Call booked — added to the CRM</span>
          </span>
          <span className="ph-foot">Traffic in &middot; Revenue out</span>
        </span>
      </button>
      <p className="phone-hint">Tap the phone — run the next search</p>
    </div>
  );
}
