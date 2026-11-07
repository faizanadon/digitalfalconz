"use client";
import { motion, useReducedMotion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Briefcase, Building2, CalendarDays, Check, CircleHelp, LayoutGrid, Megaphone, MessageSquare, MousePointerClick, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { serviceIcon } from "@/data/serviceIcons";

/** Animated arrow for text CTAs. The arrow itself is static markup;
    the slide happens in CSS on parent hover (.cta-arrow), so it works
    identically in every theme and for keyboard focus. */
export function CtaArrow({ children = "\u2192" }: { children?: ReactNode }) {
  return (
    <span className="cta-arrow" aria-hidden="true">
      {children}
    </span>
  );
}

/** Shared fade/slide reveal — respects prefers-reduced-motion via framer's hook. */
export function Reveal({ children, className = "", delay = 0, y = 22 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.21, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", gap = 0.08 }: { children: ReactNode; className?: string; gap?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : gap } } }}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{ hidden: reduce ? {} : { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.21, 1] } } }}
    >
      {children}
    </motion.div>
  );
}

/** Gold scroll-progress bar fixed at the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/** Animated counter — only for real, stated numbers (8 / 1 / 4 / 24). */
export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) { if (inView) setN(value); return; }
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const PAGE_ICONS: Record<string, LucideIcon> = {
  "briefcase": Briefcase, "building": Building2, "calendar": CalendarDays, "help": CircleHelp,
  "grid": LayoutGrid, "message": MessageSquare, "shield": ShieldCheck, "sparkles": Sparkles,
};
/** Animated page hero used on every non-home page. Each page passes its OWN
    entrance (enter) so no two pages animate in the same way:
    scale = fade+zoom · left = slide from left · rotate = tilt in ·
    right = slide from right · up = rise · tilt = zoom+tilt.
    NOTE: icon is a string key, NOT a component — component types cannot
    cross the server/client boundary as props. */
export type HeroEnter = "scale" | "left" | "rotate" | "right" | "up" | "tilt";
const HERO_ENTER: Record<HeroEnter, Record<string, number>> = {
  scale: { opacity: 0, scale: 0.94 },
  left: { opacity: 0, x: -32 },
  rotate: { opacity: 0, rotate: -3, scale: 0.96 },
  right: { opacity: 0, x: 32 },
  up: { opacity: 0, y: 32 },
  tilt: { opacity: 0, scale: 0.95, rotate: 2 },
};
export function PageHero({ kicker, title, lede, icon, children, enter = "up" }: { kicker: string; title: string; lede?: ReactNode; icon?: string; children?: ReactNode; enter?: HeroEnter }) {
  const Icon = icon ? PAGE_ICONS[icon] : undefined;
  const reduce = useReducedMotion();
  return (
    <div className="wrap page-hero">
      <motion.div
        initial={reduce ? false : HERO_ENTER[enter]}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 0.61, 0.21, 1] }}
      >
        {Icon && (
          <motion.div className="hero-icon-tile" initial={{ scale: 0.85, rotate: -4 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 16 }}>
            <Icon size={30} strokeWidth={1.9} aria-hidden="true" />
          </motion.div>
        )}
        <span className="mono kicker">{kicker}</span>
        <h1>{title}</h1>
        <span className="hero-rule" aria-hidden="true" />
        {lede}
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Two-column page hero — the same layout as /contact: copy on the left,
 * the page's hero graphic on the right. Stacks below 1100px with the
 * copy first. Used by every page that used to stack its heading above
 * its graphic (services, work, industries, faq, privacy-policy, terms).
 */
export function TwoColumnHero({ kicker, title, icon, children, graphic, graphicClassName = "" }: {
  kicker: string;
  title: string;
  icon?: string;
  children?: ReactNode;
  graphic: ReactNode;
  graphicClassName?: string;
}) {
  const Icon = icon ? PAGE_ICONS[icon] : undefined;
  return (
    <div className="wrap page-hero">
      <Reveal>
        <div className="hero-2col">
          <div className="hero-2col-copy">
            {Icon && (
              <span className="hero-icon-tile" aria-hidden="true">
                <Icon size={30} strokeWidth={1.9} />
              </span>
            )}
            <span className="mono kicker">{kicker}</span>
            <h1>{title}</h1>
            <span className="hero-rule" aria-hidden="true" />
            {children}
          </div>
          <div className={`hero-2col-gfx${graphicClassName ? ` ${graphicClassName}` : ""}`}>{graphic}</div>
        </div>
      </Reveal>
    </div>
  );
}

/** Animated flow: Traffic in → Landing → CRM → Revenue. Dots travel the path. */
/** Flow nodes use real Lucide icons (24px, gold on black) in 60px circles —
    never unicode glyphs, which render illegibly small. */
const FLOW_STEPS: { Icon: LucideIcon; label: string; sub: string }[] = [
  { Icon: Megaphone, label: "Traffic in", sub: "Ads · Search · AI answers" },
  { Icon: MousePointerClick, label: "Landing page", sub: "One page, one decision" },
  { Icon: Users, label: "CRM", sub: "Every lead captured" },
  { Icon: TrendingUp, label: "Revenue out", sub: "Every step attributed" },
];
export function FlowDiagram() {
  const reduce = useReducedMotion();
  return (
    <div className="flow" role="img" aria-label="Traffic in, through a landing page and CRM, to revenue out — every step attributed.">
      {FLOW_STEPS.map((s, i) => (
        <div className="flow-step" key={s.label}>
          <motion.div
            className="flow-dot"
            initial={false}
            animate={reduce ? {} : { scale: [1, 1.18, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.45, ease: "easeInOut" }}
          >
            <s.Icon size={24} strokeWidth={2} aria-hidden="true" />
          </motion.div>
          <strong>{s.label}</strong>
          <span>{s.sub}</span>
          {i < FLOW_STEPS.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
        </div>
      ))}
      <motion.div className="flow-line" initial={false} animate={reduce ? {} : { backgroundPosition: ["0% 0", "200% 0"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} aria-hidden="true" />
    </div>
  );
}

/** The free audit checks four things — traffic, funnel, CRM, follow-up
    speed. Shown as a plain checklist (animated tick per row). No bars,
    no percentage widths, no scores: nothing here is a result. */
export function AuditBars() {
  const reduce = useReducedMotion();
  const bars = [
    { label: "Traffic", note: "Where attention comes from" },
    { label: "Funnel", note: "Where visitors leak" },
    { label: "CRM", note: "Where leads get lost" },
    { label: "Follow-up speed", note: "How fast you reply" },
  ];
  return (
    <div className="audit-checks" aria-label="The free audit checks traffic, funnel, CRM and follow-up speed.">
      {bars.map((b, i) => (
        <motion.div
          className="audit-check-row"
          key={b.label}
          initial={reduce ? false : { opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.61, 0.21, 1] }}
        >
          <motion.span
            className="audit-check-tick"
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.15 + i * 0.1 }}
            aria-hidden="true"
          >
            <Check size={15} strokeWidth={3} aria-hidden="true" />
          </motion.span>
          <span><strong>{b.label}</strong> — {b.note}</span>
        </motion.div>
      ))}
      <p className="audit-bars-note">The audit ranks every fix by revenue impact.</p>
    </div>
  );
}

/** Motion accordion (used on service detail pages) — keeps the same FAQ copy. */
export function MotionFaq({ items }: { items: { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div className="faq-list motion-faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className="faq" key={f.q}>
            <button className="faq-btn" type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{f.q}</span>
              <motion.span className="faq-plus" animate={{ rotate: isOpen ? 45 : 0 }} aria-hidden="true">+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.21, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="a">{f.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function ServiceIconTile({ slug, size = 22 }: { slug: string; size?: number }) {
  const Icon = serviceIcon(slug);
  return (
    <span className="svc-icon" aria-hidden="true">
      <Icon size={size} strokeWidth={1.9} />
    </span>
  );
}
export { Link };
