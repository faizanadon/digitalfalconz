"use client";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { ArrowRight, Bot, CalendarCheck, Check, Handshake, Mail, MessageSquare, Mic, Play, Rocket, RotateCw, Search, ShieldCheck, ShoppingBag, Sparkles, Star, Target, TrendingUp, X, Zap } from "lucide-react";
import { graphicForSlug, PAGE_GRAPHICS, type MainPageKey, type GraphicMotion } from "@/data/pageGraphics";

export const EASE: [number, number, number, number] = [0.22, 0.61, 0.21, 1];

/* ------------------------------------------------------------------ */
/* Small animated divider used under heroes on plain pages so no page  */
/* is ever a static markdown dump.                                     */
/* ------------------------------------------------------------------ */
export function MotionDivider() {
  const reduce = useReducedMotion();
  return (
    <div className="motion-divider" aria-hidden="true">
      <motion.span className="md-line" initial={false} whileInView={{ scaleX: 1 }} viewport={{ once: true }} style={{ scaleX: reduce ? 1 : 0 }} transition={{ duration: 0.9, ease: EASE }} />
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="md-dot"
          animate={reduce ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Leak → system: three disconnected pieces animate into one connected */
/* system. Used in "Your next stage of growth".                        */
/* ------------------------------------------------------------------ */
const LEAKS = [
  { label: "Ads", sub: "attention, no follow-through", x: 0 },
  { label: "Website", sub: "visitors, no conversion", x: 1 },
  { label: "AI", sub: "answers, no connection", x: 2 },
];
export function LeakToSystemGraphic() {
  const reduce = useReducedMotion();
  return (
    <div className="gfx leak-gfx" role="img" aria-label="Disconnected ads, website and AI pieces connecting into one system.">
      <div className="leak-pieces">
        {LEAKS.map((l, i) => (
          <motion.div
            key={l.label}
            className="leak-piece"
            initial={false}
            whileInView={reduce ? {} : { y: [0, -8, 0], rotate: [0, i === 1 ? 2 : -2, 0] }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          >
            <span className="leak-x" aria-hidden="true"><X size={13} strokeWidth={3} /></span>
            <strong>{l.label}</strong>
            <span>{l.sub}</span>
          </motion.div>
        ))}
      </div>
      <div className="leak-connector" aria-hidden="true">
        <svg viewBox="0 0 300 40" width="100%" height="40">
          <motion.path
            d="M20 20 C 90 0, 210 40, 280 20"
            fill="none" stroke="#fcc04c" strokeWidth="3" strokeDasharray="8 8"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </svg>
        <motion.span
          className="leak-dot"
          animate={reduce ? {} : { left: ["4%", "92%", "4%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <motion.div
        className="leak-system"
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="leak-system-dot" aria-hidden="true"><Sparkles size={20} strokeWidth={2} /></span>
        <strong>One connected system</strong>
        <span>Ads, website, CRM and AI — every step attributed.</span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Capability mini-graphic: a small animated SVG per capability card.  */
/* variant: 0 bars · 1 browser · 2 chat · 3 palette · 4 chart           */
/* ------------------------------------------------------------------ */
export function CapGraphic({ variant }: { variant: number }) {
  const reduce = useReducedMotion();
  const bars = [42, 68, 55, 88];
  return (
    <div className="gfx cap-gfx" aria-hidden="true">
      {variant === 0 && (
        <div className="cap-bars">
          {bars.map((h, i) => (
            <motion.span key={i} initial={{ height: 6 }} whileInView={{ height: h }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }} style={reduce ? { height: h } : undefined} />
          ))}
          <motion.span className="cap-trend" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}><TrendingUp size={26} strokeWidth={2.2} /></motion.span>
        </div>
      )}
      {variant === 1 && (
        <div className="cap-browser">
          <span className="cap-browser-bar"><i /><i /><i /></span>
          <motion.span className="cap-browser-line" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} />
          <motion.span className="cap-browser-line short" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} />
          <motion.span className="cap-browser-btn" animate={reduce ? {} : { scale: [1, 1.12, 1] }} transition={{ duration: 2, repeat: Infinity }}><ArrowRight size={17} strokeWidth={2.4} /></motion.span>
        </div>
      )}
      {variant === 2 && (
        <div className="cap-chat">
          <motion.span className="cap-bubble them" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>Hi — can you help?</motion.span>
          <motion.span className="cap-bubble us" initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>Right away — booked <Check size={13} strokeWidth={3} style={{ display: "inline", verticalAlign: "-2px" }} /></motion.span>
        </div>
      )}
      {variant === 3 && (
        <div className="cap-palette">
          {["#fcc04c", "#feda6b", "#000000", "#ffffff"].map((c, i) => (
            <motion.span key={c} className="cap-swatch" style={{ background: c, border: c === "#ffffff" ? "1px solid #e5ddc9" : undefined }} animate={reduce ? {} : { y: [0, -7, 0], rotate: [0, i % 2 ? 6 : -6, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }} />
          ))}
        </div>
      )}
      {variant === 4 && (
        <svg viewBox="0 0 120 48" className="cap-chart">
          <motion.path d="M4 40 L 32 28 L 58 34 L 84 16 L 116 8" fill="none" stroke="#8a6d1a" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }} />
          <motion.circle cx="116" cy="8" r="4" fill="#fcc04c" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.1, type: "spring", stiffness: 300 }} />
        </svg>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Journey diagram: labelled nodes joined by a line with a travelling  */
/* gold dot. Used for connected solutions + service journeys.          */
/* ------------------------------------------------------------------ */
/** Journey diagram: numbered nodes in 72px GOLD discs with 22px bold black
    numerals, joined by ONE track line that runs exactly through the disc
    centres, with the travelling gold dot riding that same line. The track
    spans from the first node's centre to the last node's centre, whatever
    the step count — and the grid gets exactly as many columns as steps,
    so 3 steps spread across the full width instead of bunching left. */
export function JourneyDiagram({ steps }: { steps: { label: string; sub?: string }[] }) {
  const reduce = useReducedMotion();
  const n = steps.length;
  const edge = `${100 / (2 * n)}%`;
  return (
    <div className="gfx journey" role="img" aria-label={steps.map((s) => s.label).join(" → ")}>
      <div className="journey-track" style={{ left: edge, right: edge }} aria-hidden="true">
        <motion.span
          className="journey-dot"
          animate={reduce ? {} : { left: ["0%", "100%", "0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="journey-nodes" style={{ "--cols": n } as CSSProperties}>
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            className="journey-node"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.12, ease: EASE }}
          >
            <span className="journey-num">{String(i + 1).padStart(2, "0")}</span>
            <strong>{s.label}</strong>
            {s.sub && <span>{s.sub}</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Process timeline: vertical stepper whose gold line fills on scroll. */
/* ------------------------------------------------------------------ */
export function ProcessTimeline({ steps }: { steps: { num: string; title: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <div className="process-timeline" ref={ref}>
      <div className="process-line" aria-hidden="true">
        <motion.span className="process-fill" style={{ scaleY }} />
      </div>
      {steps.map((s, i) => (
        <motion.div
          key={s.num}
          className="process-step"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          <motion.span
            className="process-node"
            initial={{ scale: 0.7 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.05 }}
          >
            {s.num}
          </motion.span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Per-slug hero graphic — ONE distinct composition per service slug.   */
/* Registry: src/data/pageGraphics.ts (30 entries, 30 distinct kinds). */
/* Each slug differs in primary element (kind), content (lines) and     */
/* entrance motion. No invented stats.                                  */
/* ------------------------------------------------------------------ */
const MOTION_INITIAL: Record<GraphicMotion, Record<string, number>> = {
  rise: { opacity: 0, y: 18 },
  "slide-left": { opacity: 0, x: -22 },
  "slide-right": { opacity: 0, x: 22 },
  scale: { opacity: 0, scale: 0.92 },
  orbit: { opacity: 0, scale: 0.9, rotate: -5 },
};
function SlugAnim({ children, motion: m, delay = 0 }: { children: React.ReactNode; motion: GraphicMotion; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : MOTION_INITIAL[m]}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
function SlugBars({ heights, delay = 0 }: { heights: number[]; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="slug-bars" aria-hidden="true">
      {heights.map((h, i) => (
        <motion.span key={i} initial={{ height: 6 }} animate={{ height: h }} transition={{ delay: delay + i * 0.1, duration: 0.6, ease: EASE }} style={reduce ? { height: h } : undefined} />
      ))}
    </div>
  );
}
function SlugRows({ lines, delay = 0, motion: m }: { lines: string[]; delay?: number; motion: GraphicMotion }) {
  return (
    <div className="slug-rows">
      {lines.map((l, i) => (
        <SlugAnim key={l} motion={m} delay={delay + i * 0.12}>
          <span className={`slug-row${i === lines.length - 1 ? " slug-row-last" : ""}`}>{l}</span>
        </SlugAnim>
      ))}
    </div>
  );
}
export function SlugHeroGraphic({ slug }: { slug: string }) {
  const g = graphicForSlug(slug);
  const L = g.lines;
  const m = g.motion;
  const reduce = useReducedMotion();
  return (
    <div className="gfx svc-gfx slug-gfx" role="img" aria-label={`Animated graphic: ${g.title}`}>
      <SlugAnim motion={m}>
        <div className="slug-stage">
          {g.kind === "search-rank" && (
            <div className="slug-search">
              <span className="slug-searchbar"><Search size={16} strokeWidth={2.2} /> {L[0]}</span>
              <SlugRows lines={[L[1], L[2]]} motion="rise" delay={0.2} />
              <SlugBars heights={[34, 56, 44]} delay={0.3} />
            </div>
          )}
          {g.kind === "sparkle" && (
            <div className="slug-sparkle">
              <motion.span className="slug-sparkle-core" animate={reduce ? {} : { scale: [1, 1.18, 1], rotate: [0, 90, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><Sparkles size={40} strokeWidth={1.8} /></motion.span>
              {L.map((l, i) => (
                <motion.span key={l} className="slug-chip" animate={reduce ? {} : { y: [0, -7, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}>{l}</motion.span>
              ))}
            </div>
          )}
          {g.kind === "chat" && (
            <div className="cap-chat">
              <motion.span className="cap-bubble them" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>{L[0]}</motion.span>
              <motion.span className="cap-bubble us" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>{L[1]}</motion.span>
              <motion.span className="cap-bubble them" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.75 }}>{L[2]}</motion.span>
            </div>
          )}
          {g.kind === "waveform" && (
            <div className="slug-wave">
              <span className="slug-mic"><Mic size={26} strokeWidth={1.8} /></span>
              <div className="slug-wave-bars" aria-hidden="true">
                {[10, 22, 34, 18, 30, 14, 26, 36, 20, 28, 12, 24].map((h, i) => (
                  <motion.span key={i} animate={reduce ? {} : { height: [h * 0.5, h, h * 0.5] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.09, ease: "easeInOut" }} style={{ height: h }} />
                ))}
              </div>
              <SlugRows lines={L} motion="rise" delay={0.2} />
            </div>
          )}
          {g.kind === "nodes" && (
            <div className="slug-nodes">
              <svg viewBox="0 0 260 60" width="100%" height="60" aria-hidden="true">
                <motion.path d="M12 30 H 248" fill="none" stroke="#fcc04c" strokeWidth="3" strokeDasharray="7 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: EASE }} />
              </svg>
              <div className="slug-node-row">
                {L.map((l, i) => (
                  <SlugAnim key={l} motion="scale" delay={0.15 + i * 0.14}><span className="slug-node">{l}</span></SlugAnim>
                ))}
              </div>
            </div>
          )}
          {g.kind === "chart" && (
            <div className="slug-chart">
              <svg viewBox="0 0 260 110" width="100%" height="110" aria-hidden="true">
                <motion.path d="M8 96 L 55 72 L 105 82 L 155 46 L 205 58 L 252 14" fill="none" stroke="#8a6d1a" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, ease: EASE }} />
                <motion.circle cx="252" cy="14" r="5" fill="#fcc04c" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring", stiffness: 300 }} />
              </svg>
              <SlugBars heights={[40, 62, 52, 78, 66, 92]} delay={0.2} />
              <SlugRows lines={L} motion="rise" delay={0.3} />
            </div>
          )}
          {g.kind === "plug" && (
            <div className="slug-plug">
              <SlugAnim motion="slide-left"><span className="slug-plug-box"><Zap size={16} strokeWidth={2.2} /> {L[0]}</span></SlugAnim>
              <motion.span className="slug-plug-cable" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.7, ease: EASE }} aria-hidden="true" />
              <SlugAnim motion="slide-right" delay={0.35}><span className="slug-plug-box">{L[1]} <Zap size={16} strokeWidth={2.2} /></span></SlugAnim>
              <span className="slug-plug-pay">{L[2]}</span>
            </div>
          )}
          {g.kind === "stars" && (
            <div className="slug-stars">
              <div className="slug-star-row" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span key={i} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 260, damping: 14 }}><Star size={30} strokeWidth={1.5} fill="#fcc04c" color="#8a6d1a" /></motion.span>
                ))}
              </div>
              <SlugRows lines={L} motion="rise" delay={0.4} />
            </div>
          )}
          {g.kind === "palette" && (
            <div className="slug-palette">
              <div className="cap-palette">
                {["#fcc04c", "#feda6b", "#000000"].map((c, i) => (
                  <motion.span key={c} className="cap-swatch" style={{ background: c }} animate={reduce ? {} : { y: [0, -8, 0], rotate: [0, i % 2 ? 6 : -6, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }} />
                ))}
              </div>
              <SlugRows lines={L} motion="rise" delay={0.2} />
            </div>
          )}
          {g.kind === "gauge" && (
            <div className="slug-gauge">
              <svg viewBox="0 0 200 110" width="200" height="110" aria-hidden="true">
                <path d="M15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#e5ddc9" strokeWidth="12" strokeLinecap="round" />
                <motion.path d="M15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#fcc04c" strokeWidth="12" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 0.72 }} transition={{ duration: 1.3, ease: EASE }} />
                <motion.line x1="100" y1="100" x2="100" y2="34" stroke="#000" strokeWidth="4" strokeLinecap="round" initial={{ rotate: -70 }} animate={{ rotate: 18 }} transition={{ duration: 1.3, ease: EASE }} style={{ transformOrigin: "100px 100px" }} />
                <circle cx="100" cy="100" r="8" fill="#000" />
              </svg>
              <SlugRows lines={L} motion="rise" delay={0.3} />
            </div>
          )}
          {g.kind === "pipeline" && (
            <div className="slug-pipeline">
              {L.map((l, i) => (
                <SlugAnim key={l} motion="slide-right" delay={0.15 + i * 0.16}>
                  <span className={`slug-pipe${i === L.length - 1 ? " slug-pipe-won" : ""}`}>{String(i + 1).padStart(2, "0")} · {l}{i < L.length - 1 ? " →" : ""}</span>
                </SlugAnim>
              ))}
            </div>
          )}
          {g.kind === "code" && (
            <div className="slug-code">
              <span className="slug-code-bar"><i /><i /><i /><b>terminal</b></span>
              {L.map((l, i) => (
                <motion.code key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 + i * 0.35 }}>$ {l}</motion.code>
              ))}
            </div>
          )}
          {g.kind === "mail" && (
            <div className="slug-mail">
              {L.map((l, i) => (
                <SlugAnim key={l} motion="rise" delay={0.15 + i * 0.18}>
                  <span className="slug-mail-step"><Mail size={18} strokeWidth={1.9} /> {l}</span>
                </SlugAnim>
              ))}
              <motion.span className="slug-mail-arrow" animate={reduce ? {} : { x: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true"><ArrowRight size={22} strokeWidth={2.2} /></motion.span>
            </div>
          )}
          {g.kind === "target" && (
            <div className="slug-target">
              <div className="slug-rings" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="slug-ring" animate={reduce ? {} : { scale: [1, 1.25, 1], opacity: [0.7, 0.25, 0.7] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }} />
                ))}
                <span className="slug-ring-core"><Target size={34} strokeWidth={1.8} /></span>
              </div>
              <SlugRows lines={L} motion="rise" delay={0.2} />
            </div>
          )}
          {g.kind === "layout" && (
            <div className="slug-layout">
              {[0, 1, 2].map((i) => (
                <SlugAnim key={i} motion="scale" delay={0.15 + i * 0.16}>
                  <span className={`slug-tile slug-tile-${i}`}><b>{L[i]}</b></span>
                </SlugAnim>
              ))}
            </div>
          )}
          {g.kind === "landing" && (
            <div className="slug-landing">
              <motion.span className="slug-land-hero" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, ease: EASE }} />
              <span className="slug-land-proof">{L[0]} · {L[1]}</span>
              <motion.span className="slug-land-cta" animate={reduce ? {} : { scale: [1, 1.07, 1] }} transition={{ duration: 2, repeat: Infinity }}>{L[2]}</motion.span>
            </div>
          )}
          {g.kind === "funnel" && (
            <div className="svc-funnel">
              {L.map((l, i) => (
                <motion.div key={l} className="svc-funnel-row" style={{ width: `${100 - i * 18}%` }} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.14, duration: 0.5, ease: EASE }}>
                  <span>{l}</span>
                  <motion.span className="svc-funnel-pulse" animate={reduce ? {} : { opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} aria-hidden="true" />
                </motion.div>
              ))}
            </div>
          )}
          {g.kind === "phone" && (
            <div className="slug-phone">
              <span className="slug-phone-notch" aria-hidden="true" />
              {L.map((l, i) => (
                <SlugAnim key={l} motion="rise" delay={0.2 + i * 0.16}><span className="slug-phone-row">{l}</span></SlugAnim>
              ))}
              <motion.span className="slug-phone-cta" animate={reduce ? {} : { scale: [1, 1.06, 1] }} transition={{ duration: 2, repeat: Infinity }}>Tap to book →</motion.span>
            </div>
          )}
          {g.kind === "feed" && (
            <div className="slug-feed">
              {L.map((l, i) => (
                <SlugAnim key={l} motion="slide-left" delay={0.15 + i * 0.18}>
                  <span className="slug-feed-card"><b>{l}</b><i>ad · DigitalFalconz</i></span>
                </SlugAnim>
              ))}
            </div>
          )}
          {g.kind === "frames" && (
            <div className="svc-frames">
              {L.map((l, i) => (
                <motion.div key={l} className="svc-frame" initial={{ opacity: 0, y: 16, rotate: -4 + i * 4 }} animate={{ opacity: 1, y: 0, rotate: -4 + i * 4 }} transition={{ delay: 0.2 + i * 0.16, duration: 0.5, ease: EASE }}>
                  <span className="svc-frame-bar" />
                  <span>{l}</span>
                  <span className="svc-frame-play"><Play size={14} strokeWidth={2.2} fill="#feda6b" /></span>
                </motion.div>
              ))}
            </div>
          )}
          {g.kind === "trend" && (
            <div className="slug-trend">
              <SlugBars heights={[30, 48, 40, 66, 58, 86]} delay={0.15} />
              <motion.span className="cap-trend" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}><TrendingUp size={26} strokeWidth={2.2} /></motion.span>
              <SlugRows lines={L} motion="rise" delay={0.3} />
            </div>
          )}
          {g.kind === "rocket" && (
            <div className="slug-rocket">
              <svg viewBox="0 0 260 80" width="100%" height="80" aria-hidden="true">
                <motion.path d="M8 72 C 80 70, 160 30, 248 10" fill="none" stroke="#fcc04c" strokeWidth="3" strokeDasharray="7 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: EASE }} />
              </svg>
              <motion.span className="slug-rocket-ico" animate={reduce ? {} : { y: [0, -8, 0], rotate: [0, 6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                <Rocket size={30} strokeWidth={1.8} />
              </motion.span>
              <SlugRows lines={L} motion="rise" delay={0.2} />
            </div>
          )}
          {g.kind === "loop" && (
            <div className="slug-loop">
              <motion.span className="slug-loop-ring" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} aria-hidden="true"><RotateCw size={38} strokeWidth={1.8} /></motion.span>
              <SlugRows lines={L} motion="rise" delay={0.2} />
            </div>
          )}
          {g.kind === "cart" && (
            <div className="slug-cart">
              {L.slice(0, 2).map((l, i) => (
                <SlugAnim key={l} motion="slide-left" delay={0.15 + i * 0.18}>
                  <span className="slug-cart-item"><ShoppingBag size={16} strokeWidth={2} /> {l} <b>£</b></span>
                </SlugAnim>
              ))}
              <SlugAnim motion="scale" delay={0.5}><span className="slug-cart-total">{L[2]}</span></SlugAnim>
            </div>
          )}
          {g.kind === "calendar" && (
            <div className="slug-cal">
              <div className="slug-cal-grid" aria-hidden="true">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <motion.span key={i} className={i === 0 || i === 2 || i === 4 ? "slug-cal-on" : ""} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.08 }}>{d}</motion.span>
                ))}
              </div>
              <SlugRows lines={L} motion="rise" delay={0.3} />
            </div>
          )}
          {g.kind === "wireframe" && (
            <div className="slug-wire">
              <div className="slug-wire-grid" aria-hidden="true">
                <motion.span className="slug-wire-hero" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, ease: EASE }} />
                <motion.span className="slug-wire-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
                <motion.span className="slug-wire-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} />
                <motion.span className="slug-wire-cta" animate={reduce ? {} : { scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              </div>
              <SlugRows lines={L} motion="rise" delay={0.2} />
            </div>
          )}
          {g.kind === "playhead" && (
            <div className="slug-play">
              <div className="slug-play-track" aria-hidden="true">
                <motion.span className="slug-play-head" animate={reduce ? {} : { left: ["4%", "94%", "4%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
              </div>
              <div className="slug-play-clips" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ease: EASE }} />
                ))}
              </div>
              <SlugRows lines={L} motion="rise" delay={0.2} />
            </div>
          )}
          {g.kind === "browser" && (
            <div className="svc-browser">
              <span className="cap-browser-bar"><i /><i /><i /><b>digitalfalconz.com</b></span>
              <motion.span className="svc-browser-hero" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, ease: EASE }} />
              <div className="svc-browser-rows">
                {[0, 1].map((i) => (
                  <motion.span key={i} className="svc-browser-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: EASE }} />
                ))}
              </div>
              <span className="slug-browser-cap">{L.join(" · ")}</span>
              <motion.span className="svc-browser-cta" animate={reduce ? {} : { scale: [1, 1.06, 1] }} transition={{ duration: 2.2, repeat: Infinity }}>{L[2]}</motion.span>
            </div>
          )}
          {g.kind === "checklist" && (
            <div className="slug-check">
              {L.map((l, i) => (
                <SlugAnim key={l} motion="slide-left" delay={0.15 + i * 0.18}>
                  <span className="slug-check-row"><b><Check size={13} strokeWidth={3} /></b> {l}</span>
                </SlugAnim>
              ))}
            </div>
          )}
          {g.kind === "layers" && (
            <div className="slug-layers">
              {L.map((l, i) => (
                <SlugAnim key={l} motion="rise" delay={0.15 + i * 0.16}>
                  <span className="slug-layer" style={{ marginLeft: i * 14 }}>{l}</span>
                </SlugAnim>
              ))}
            </div>
          )}
        </div>
      </SlugAnim>
      <p className="svc-gfx-caption">{g.title}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Per-page hero graphics — one distinct composition + entrance per     */
/* main page (services / work / industries / contact / faq / privacy).  */
/* Home keeps its traffic→revenue flow.                                 */
/* ------------------------------------------------------------------ */
const PAGE_ENTER: Record<string, Record<string, number>> = {
  scale: { opacity: 0, scale: 0.94 },
  left: { opacity: 0, x: -32 },
  rotate: { opacity: 0, rotate: -3, scale: 0.96 },
  right: { opacity: 0, x: 32 },
  up: { opacity: 0, y: 32 },
  tilt: { opacity: 0, scale: 0.95, rotate: 2 },
};
export function PageHeroGraphic({ page }: { page: MainPageKey }) {
  const meta = PAGE_GRAPHICS[page];
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="gfx page-hero-gfx"
      initial={reduce ? false : PAGE_ENTER[meta.enter]}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      role="img"
      aria-label={meta.title}
    >
      {page === "services" && (
        <div className="phg-orbit">
          <motion.span className="phg-ring" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: "linear" }} aria-hidden="true" />
          <span className="phg-core">DF</span>
          {["Growth", "Web", "AI", "Brand", "Analytics"].map((l, i) => (
            <span
              key={l}
              className="phg-chip-pos"
              style={{ transform: `rotate(${i * 72}deg) translateY(var(--orbit-r)) rotate(${-i * 72}deg) translate(-50%, -50%)` }}
              aria-hidden="true"
            >
              <motion.span className="phg-chip" animate={reduce ? {} : { scale: [1, 1.08, 1] }} transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}>{l}</motion.span>
            </span>
          ))}
        </div>
      )}
      {page === "work" && (
        <div className="phg-lens">
          <div className="phg-doc" aria-hidden="true">
            <span /><span /><span /><span className="short" />
          </div>
          <motion.span className="phg-magnifier" animate={reduce ? {} : { x: [0, 120, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><Search size={20} strokeWidth={2.2} /></motion.span>
          <span className="phg-lens-labels">Challenge · Decisions · Delivery · Evidence · Role</span>
        </div>
      )}
      {page === "industries" && (
        <div className="phg-wheel">
          <motion.div className="phg-wheel-rotor" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} aria-hidden="true">
            {["HVAC", "SaaS", "E-commerce", "Healthcare", "Property", "Manufacturing"].map((l, i) => (
              <span key={l} className="phg-wheel-seg" style={{ transform: `rotate(${i * 60}deg) translateY(-78px)` }}>{l}</span>
            ))}
          </motion.div>
          <span className="phg-wheel-core"><Sparkles size={26} strokeWidth={1.8} /></span>
        </div>
      )}
      {page === "contact" && (
        <div className="phg-contact">
          {[
            { icon: <Mail size={20} strokeWidth={1.9} />, label: "Enquiry sent" },
            { icon: <CalendarCheck size={20} strokeWidth={1.9} />, label: "Call booked" },
            { icon: <Handshake size={20} strokeWidth={1.9} />, label: "Next step agreed" },
          ].map((s, i) => (
            <motion.div key={s.label} className="phg-contact-node" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.22, duration: 0.5, ease: EASE }}>
              <span className="phg-contact-ico">{s.icon}</span>
              <strong>{s.label}</strong>
              {i < 2 && <span className="phg-contact-arrow" aria-hidden="true">→</span>}
            </motion.div>
          ))}
        </div>
      )}
      {page === "faq" && (
        <div className="phg-faq">
          {["?", "?", "?"].map((q, i) => (
            <motion.span key={i} className="phg-bubble" initial={{ opacity: 0, y: 18, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.2 + i * 0.25, type: "spring", stiffness: 240, damping: 15 }}>{q}</motion.span>
          ))}
          <motion.span className="phg-answered" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}><Check size={15} strokeWidth={3} /> Answered — plainly, with no guarantees we can&apos;t keep</motion.span>
        </div>
      )}
      {page === "privacy" && (
        <div className="phg-privacy">
          <svg viewBox="0 0 120 130" width="96" height="104" aria-hidden="true">
            <motion.path d="M60 6 L 108 24 V 66 C 108 96 86 116 60 124 C 34 116 12 96 12 66 V 24 Z" fill="none" stroke="#fcc04c" strokeWidth="4" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: EASE }} />
            <motion.path d="M42 66 L 56 80 L 80 52" fill="none" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.6, ease: EASE }} />
          </svg>
          <span className="phg-privacy-label"><ShieldCheck size={18} strokeWidth={2} /> Used only to reply to your enquiry</span>
        </div>
      )}
      <p className="svc-gfx-caption">{meta.title}</p>
    </motion.div>
  );
}


/* ------------------------------------------------------------------ */
/* Service hero graphic — per-slug (see SlugHeroGraphic above). Pure SVG + */
/* Framer Motion, no external images, no invented numbers.             */
/* ------------------------------------------------------------------ */
export function ServiceHeroGraphic({ slug }: { slug: string }) {
  return <SlugHeroGraphic slug={slug} />;
}

/* ------------------------------------------------------------------ */
/* Duo CTA card graphics (home): a documentation lens for Work, a       */
/* conversation flow for Build — each animated differently.             */
/* ------------------------------------------------------------------ */
export function DuoWorkGraphic() {
  const reduce = useReducedMotion();
  return (
    <div className="duo-gfx" aria-hidden="true">
      <span className="duo-gfx-ico"><Search size={18} strokeWidth={2} /></span>
      <span>Challenge → Decisions → Delivery → Evidence</span>
      <motion.span
        className="duo-gfx-lens"
        animate={reduce ? {} : { x: [0, 26, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Search size={18} strokeWidth={2.2} />
      </motion.span>
    </div>
  );
}
export function DuoBuildGraphic() {
  const reduce = useReducedMotion();
  return (
    <div className="duo-gfx" aria-hidden="true">
      <span className="duo-gfx-ico"><MessageSquare size={18} strokeWidth={2} /></span>
      <span>Brief → Conversation → Proposal</span>
      <motion.span
        className="duo-gfx-dot"
        animate={reduce ? {} : { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Work documentation graphic: the five documentation lenses.          */
/* ------------------------------------------------------------------ */
export function WorkDocGraphic() {
  const steps = ["Challenge", "Decisions", "Delivery", "Evidence", "Our role"];
  return <JourneyDiagram steps={steps.map((label) => ({ label }))} />;
}
