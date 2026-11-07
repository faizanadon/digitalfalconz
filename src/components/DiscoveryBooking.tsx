"use client";
import Script from "next/script";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
import type { CSSProperties } from "react";

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

export default function DiscoveryBooking() {
  const reduce = useReducedMotion();
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
              <div className="growth-diagram">
                <svg viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
                  <motion.path
                    d="M 20 250 C 120 250, 180 100, 300 88 S 500 190, 625 175 S 800 300, 875 265 S 960 220, 990 205"
                    fill="none"
                    stroke="#fcc04c"
                    strokeWidth="2.5"
                    strokeDasharray="7 8"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: EASE }}
                  />
                  {[
                    [20, 250],
                    [375, 85],
                    [625, 175],
                    [875, 265],
                    [990, 205],
                  ].map(([cx, cy]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="#fcc04c" stroke="#0b0b0a" strokeWidth="2" />
                  ))}
                </svg>
                <div className="growth-cards">
                  {GROWTH.map((g, i) => (
                    <motion.div
                      key={g.num}
                      className="growth-card"
                      style={{ "--top": `${g.top}px` } as CSSProperties}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
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
