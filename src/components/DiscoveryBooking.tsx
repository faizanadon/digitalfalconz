"use client";
import Script from "next/script";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Asterisk,
  Clock,
  Monitor,
  Sparkles,
  Target,
  TrendingUp,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Motion";
import { EASE } from "@/components/Graphics";

/**
 * Shared body for /meet and /discovery — both mirror the
 * meet.digitalfalconz.com page: a dark two-column booking hero (copy left,
 * HighLevel calendar right), the Connected Growth System diagram, and the
 * "Let's connect the dots." band. Site header + original footer come from
 * the App Router layout. Copy is the provided page's copy, verbatim.
 */

const COVER = [
  { num: "01", title: "Your priorities", text: "Where you are today and what you want to achieve." },
  { num: "02", title: "The opportunities", text: "Where the right strategy or technology may help." },
  { num: "03", title: "A practical direction", text: "Useful next steps, without unnecessary complexity." },
];

const GROWTH: { num: string; tag: string; title: string; sub: string; Icon: LucideIcon; top: number }[] = [
  { num: "01", tag: "Attract", title: "Marketing", sub: "Create demand", Icon: Target, top: 140 },
  { num: "02", tag: "Experience", title: "Software", sub: "Remove friction", Icon: Monitor, top: 0 },
  { num: "03", tag: "Connect", title: "AI & CRM", sub: "Keep things moving", Icon: Sparkles, top: 90 },
  { num: "04", tag: "Optimise", title: "Analytics", sub: "Learn and improve", Icon: TrendingUp, top: 180 },
];

/** The dashed gold curve the growth cards sit on. */
const GROWTH_PATH =
  "M 20 250 C 120 250, 180 100, 300 88 S 500 190, 625 175 S 800 300, 875 265 S 960 220, 990 205";
/** Fixed gold dots where the curve meets each card (last node is the open ring at the end). */
const GROWTH_NODES: [number, number][] = [
  [20, 250],
  [375, 85],
  [625, 175],
  [875, 265],
];
const GROWTH_END: [number, number] = [990, 205];
/** How long the curve takes to draw, and the travelling dot to cross it. */
const DRAW_SECONDS = 2.4;
/** Seconds into the draw when the dot reaches each card's node — cards and nodes appear then. */
const CARD_DELAYS = [0, 0.85, 1.45, 2.0];

export default function DiscoveryBooking() {
  const reduce = useReducedMotion();
  const diagramRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<SVGAnimateMotionElement>(null);
  const diagramInView = useInView(diagramRef, { once: true, margin: "-80px" });
  useEffect(() => {
    if (diagramInView && !reduce) dotRef.current?.beginElement();
  }, [diagramInView, reduce]);
  return (
    <>
      {/* Booking hero — copy left, calendar right */}
      <section className="tight">
        <div className="wrap">
          <Reveal>
            <div className="book-hero">
              <div className="book-copy">
                <div className="book-top">
                  <span className="mono">— DigitalFalconz / Private Consultations</span>
                  <span className="mono book-page">01 / 01</span>
                </div>
                <h1>
                  Let&apos;s make your next move <span className="book-gold">count.</span>
                </h1>
                <p className="book-lede">
                  A focused, 30-minute conversation about your business, your
                  ambitions, and where <strong>marketing, software or AI</strong>{" "}
                  could create meaningful opportunities.
                </p>
                <p className="book-meta">
                  <span>
                    <Clock size={14} strokeWidth={2} aria-hidden="true" /> 30 minutes
                  </span>
                  <span>
                    <Video size={14} strokeWidth={2} aria-hidden="true" /> Google Meet
                  </span>
                  <span>
                    <Sparkles size={14} strokeWidth={2} aria-hidden="true" /> Complimentary
                  </span>
                </p>
                <p className="mono book-cover-label">— What we&apos;ll cover</p>
                <div className="book-cover">
                  {COVER.map((c) => (
                    <div className="book-cover-row" key={c.num}>
                      <span className="mono">{c.num}</span>
                      <div>
                        <strong>{c.title}</strong>
                        <span className="book-cover-sub">{c.text}</span>
                      </div>
                      <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                    </div>
                  ))}
                </div>
                <p className="book-note">
                  <Asterisk size={16} strokeWidth={2.2} aria-hidden="true" />
                  A considered conversation. No obligation to proceed.
                </p>
              </div>
              <div className="book-cal">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/booking/3uyvXhd8aw8baaZKsCb2"
                  title="Book a free discovery call with DigitalFalconz"
                  style={{
                    width: "100%",
                    border: "none",
                    overflow: "hidden",
                    minHeight: 750,
                    display: "block",
                  }}
                  scrolling="no"
                  id="3uyvXhd8aw8baaZKsCb2_1794047366166"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Connected Growth System */}
      <section className="tight">
        <div className="wrap">
          <Reveal>
            <div className="growth">
              <div className="growth-head">
                <span className="mono">
                  <i className="gold-dot" aria-hidden="true" /> Connected Growth System
                </span>
                <span className="mono">
                  Designed to work together <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </span>
              </div>
              <div className="growth-diagram" ref={diagramRef}>
                <svg viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
                  {reduce ? (
                    <>
                      <path d={GROWTH_PATH} fill="none" stroke="#fcc04c" strokeWidth="2.5" strokeDasharray="7 8" />
                      {GROWTH_NODES.map(([cx, cy]) => (
                        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="#fcc04c" stroke="#0b0b0a" strokeWidth="2" />
                      ))}
                      <circle cx={GROWTH_END[0]} cy={GROWTH_END[1]} r="6.5" fill="none" stroke="#fcc04c" strokeWidth="2" />
                    </>
                  ) : (
                    <>
                      {/* The dashed curve is revealed by a drawing mask, so the dashes stay dashed while it draws. */}
                      <defs>
                        <mask id="growth-curve-mask">
                          <motion.path
                            d={GROWTH_PATH}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="20"
                            initial={{ pathLength: 0 }}
                            animate={diagramInView ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ duration: DRAW_SECONDS, ease: "linear" }}
                          />
                        </mask>
                      </defs>
                      <g mask="url(#growth-curve-mask)">
                        <path id="growth-curve-path" d={GROWTH_PATH} fill="none" stroke="#fcc04c" strokeWidth="2.5" strokeDasharray="7 8" />
                        {GROWTH_NODES.map(([cx, cy], i) => (
                          <motion.circle
                            key={`${cx}-${cy}`}
                            cx={cx}
                            cy={cy}
                            r="6"
                            fill="#fcc04c"
                            stroke="#0b0b0a"
                            strokeWidth="2"
                            initial={{ opacity: 0 }}
                            animate={diagramInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.35, delay: CARD_DELAYS[i], ease: "easeOut" }}
                          />
                        ))}
                        <motion.circle
                          cx={GROWTH_END[0]}
                          cy={GROWTH_END[1]}
                          r="6.5"
                          fill="none"
                          stroke="#fcc04c"
                          strokeWidth="2"
                          initial={{ opacity: 0 }}
                          animate={diagramInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.35, delay: DRAW_SECONDS - 0.05, ease: "easeOut" }}
                        />
                      </g>
                      {/* Glowing dot that travels the curve as it draws, then rests at the end. */}
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={diagramInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <animateMotion ref={dotRef} dur={`${DRAW_SECONDS}s`} begin="indefinite" fill="freeze">
                          <mpath href="#growth-curve-path" />
                        </animateMotion>
                        <circle r="14" fill="#fcc04c" opacity="0.25" />
                        <circle r="6.5" fill="#fcc04c" />
                      </motion.g>
                    </>
                  )}
                </svg>
                <div className="growth-cards">
                  {GROWTH.map((g, i) => (
                    <motion.div
                      key={g.num}
                      className="growth-card"
                      style={{ "--top": `${g.top}px` } as CSSProperties}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={diagramInView || reduce ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: CARD_DELAYS[i], ease: EASE }}
                    >
                      <span className="mono">
                        {g.num} / {g.tag}
                      </span>
                      <span className="growth-ico" aria-hidden="true">
                        <g.Icon size={22} strokeWidth={1.9} />
                      </span>
                      <strong>{g.title}</strong>
                      <span>{g.sub}</span>
                    </motion.div>
                  ))}
                </div>
                <span className="mono growth-demand" aria-hidden="true">
                  ← Demand
                </span>
                <span className="mono growth-momentum" aria-hidden="true">
                  Momentum →
                </span>
              </div>
              <div className="growth-foot">
                <span className="mono">Not disconnected services.</span>
                <span className="mono">
                  <i className="gold-dot" aria-hidden="true" /> One considered approach.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Let's connect the dots. */}
      <section className="tight">
        <div className="wrap">
          <Reveal>
            <div className="dots-band">
              <div>
                <h2>
                  Let&apos;s connect the dots<span className="book-gold">.</span>
                </h2>
                <p>
                  Tell us what you want to build, improve or grow. We&apos;ll
                  help clarify the practical next step.
                </p>
              </div>
              <Link href="/contact" className="dots-circle" aria-label="Start a conversation — go to the contact page">
                <ArrowUpRight size={30} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HighLevel booking widget embed — resizes the iframe above. */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
