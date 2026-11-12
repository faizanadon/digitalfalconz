"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

const PHONE = "+91 135 000 0000";
const PHONE_HREF = "+911350000000";
const EMAIL = "hello@prana-rishikesh.com";
const PLACE = "Near Laxman Jhula, Rishikesh, Uttarakhand, India";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Real yoga, river and Himalayan photography (all verified 200). The hero
   and the sunset-meditation feature are B&W for the calm, editorial look;
   everything else stays in full colour so the place shows through. */
const HERO_IMG = U("1544367567-0f2fcb009e0b", 1800); // yoga silhouette at sunset
const INCLUDED_IMG = U("1552196563-55cd4e45efb3", 1400); // yoga practice

const RHYTHM = [
  {
    time: "05:30",
    name: "Sunrise practice",
    text: "Asana and breath on the rooftop as the sun clears the ridge. Slow, steady and quiet — no experience needed, mats and props provided.",
    img: U("1506126613408-eca07ce68773", 1200),
    alt: "Meditation at sunrise",
  },
  {
    time: "08:00",
    name: "Breakfast",
    text: "A slow vegetarian breakfast in the garden — fruit, grains and chai. Eat together, or take a tray to a quiet corner.",
    img: U("1512621776951-a57141f2eefd", 1200),
    alt: "A healthy breakfast bowl",
  },
  {
    time: "10:30",
    name: "Workshop",
    text: "One focused session a day: breathwork, yoga philosophy or meditation technique, taught in a small circle with time for questions.",
    img: U("1575052814086-f385e2e2ad1b", 1200),
    alt: "A small yoga class",
  },
  {
    time: "15:00",
    name: "Free time",
    text: "Walk to the ghats, read in the garden, book a massage or do nothing at all. The afternoon is yours — there is nothing to keep up with.",
    img: U("1464822759023-fed622ff2c3b", 1200),
    alt: "Mountains above the valley",
  },
  {
    time: "17:30",
    name: "Sunset meditation",
    text: "We sit by the river as the light goes. Thirty minutes of guided stillness, then dinner together under the trees.",
    img: U("1545205597-3d9d02c29597", 1200),
    alt: "Yoga at sunset",
    bw: true,
  },
];

const PROGRAMMES = [
  {
    title: "3-Day Reset",
    days: "3 days · 2 nights",
    price: 480,
    text: "A long weekend to exhale. Two sunrise practices, one workshop and plenty of empty hours — enough to feel the difference.",
    points: ["2 sunrise practices", "1 workshop", "All meals included", "Garden Room stay"],
  },
  {
    title: "5-Day Deep Dive",
    days: "5 days · 4 nights",
    price: 750,
    text: "The full rhythm, five days running. Daily practice, four workshops and a guided walk to the ghats — the one most guests choose.",
    points: ["Daily sunrise practice", "4 workshops", "All meals included", "Guided ghat walk"],
    popular: true,
  },
  {
    title: "7-Day Immersion",
    days: "7 days · 6 nights",
    price: 980,
    text: "A whole week to slow down properly. The full programme plus a day trip into the hills and a one-to-one session with a teacher.",
    points: ["Daily practice & workshops", "Hills day trip", "One-to-one session", "All meals included"],
  },
];

const STAYS = [
  {
    title: "Garden Room",
    tag: "2 GUESTS",
    supplement: 0,
    priceNote: "Included",
    text: "A quiet room over the garden, with a shared veranda and a reading chair. Simple, cool and calm — the room most guests book.",
    img: U("1590490360182-c33d57733427", 1000),
    alt: "A calm hotel room",
  },
  {
    title: "River View Room",
    tag: "2 GUESTS",
    supplement: 120,
    priceNote: "+ £120",
    text: "Upstairs, facing the river. Wake to the water and the early light, with a private balcony for morning tea.",
    img: U("1611892440504-42a792e24d32", 1000),
    alt: "A hotel room with a view",
  },
  {
    title: "Private Cottage",
    tag: "2–4 GUESTS",
    supplement: 260,
    priceNote: "+ £260",
    text: "A standalone cottage at the far end of the garden — two bedrooms, a small kitchen and total quiet. For couples and small groups.",
    img: U("1518780664697-55e3ad937233", 1000),
    alt: "A cottage among trees",
  },
];

const INCLUDED = [
  "Daily yoga & meditation",
  "Vegetarian meals, all included",
  "Riverside accommodation",
  "Guided walks to the ghats",
  "Transfer from Dehradun airport",
  "Mats, props & blankets",
  "Chai, tea & filtered water",
  "Small groups — max 12 guests",
];

const TEACHERS = [
  {
    name: "Meera",
    role: "Lead teacher · Hatha & Vinyasa",
    text: "Fifteen years teaching in Rishikesh. Slow, precise classes that meet you where you are — beginners especially welcome.",
    img: U("1544005313-94ddf0286df2", 800),
    alt: "Portrait of Meera",
  },
  {
    name: "Arjun",
    role: "Breathwork · Pranayama",
    text: "Leads the morning breath sessions and the workshops. Calm, practical and allergic to jargon.",
    img: U("1507003211169-0a1dd7228f2d", 800),
    alt: "Portrait of Arjun",
  },
  {
    name: "Sofia",
    role: "Meditation · Yoga Nidra",
    text: "Guides the sunset sits and the evening yoga nidra. Her sessions are the reason many guests come back.",
    img: U("1494790108377-be9c29b29330", 800),
    alt: "Portrait of Sofia",
  },
];

const STATS = [
  { n: 12, suffix: "", label: "GUESTS, AT MOST", caption: "Small groups, on purpose." },
  { n: 7, suffix: "", label: "DAYS, LONGEST STAY", caption: "The full immersion." },
  { n: 3, suffix: "", label: "PROGRAMMES", caption: "Reset, Deep Dive, Immersion." },
  { n: 20, suffix: "+", label: "YEARS TEACHING", caption: "On the banks of the Ganges." },
];

const VOICES = [
  {
    quote: "I arrived exhausted and left lighter. The days have a rhythm that does the work for you — you just have to show up.",
    who: "Ana · 5-day Deep Dive",
  },
  {
    quote: "I had never done yoga before. Nobody made me feel behind. By day three I was looking forward to 5:30 in the morning.",
    who: "Tom · 3-day Reset",
  },
  {
    quote: "Seven days, no phone, river every evening. It sounds simple because it is — and that is exactly why it works.",
    who: "Priya · 7-day Immersion",
  },
];

const FAQS = [
  {
    q: "I have never done yoga. Is this for me?",
    a: "Yes. Every practice is taught for mixed levels, and the teachers offer simpler options throughout. Most guests on the Reset have never done yoga before.",
  },
  {
    q: "What should I bring?",
    a: "Comfortable clothes you can move in, a warm layer for the mornings, sturdy shoes for the walks and a book. We provide mats, props, blankets and drinking water.",
  },
  {
    q: "What is the food like?",
    a: "Simple vegetarian food, cooked in-house — fruit, grains, vegetables and chai. Tell us about allergies or dietary needs when you book and the kitchen will look after you.",
  },
  {
    q: "Can I come on my own?",
    a: "Most guests do. Rooms are priced per person, and solo travellers are paired with the group from the first morning — nobody eats alone unless they want to.",
  },
  {
    q: "When do programmes run?",
    a: "New groups start every Monday, all year round. Tell us your dates in the booking form and we will confirm availability within 48 hours.",
  },
];

const TICKER = [
  "Breathe in",
  "Breathe out",
  "Sunrise practice",
  "River Ganges",
  "Slow food",
  "Small groups",
  "Rishikesh",
];

/** Blur-to-sharp 3D reveal — the signature Framer heading entrance, now with
    a perspective tilt so sections swing in rather than just fading. */
function BlurReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      style={{ transformPerspective: 1100 }}
      initial={reduce ? false : { opacity: 0, filter: "blur(14px)", y: 28, rotateX: 12, scale: 0.97 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 0.61, 0.21, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** The breath pacer: a circle that grows on the inhale (4s) and settles on
    the exhale (6s), with the instruction changing to match. */
function BreathPacer() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"in" | "out">("in");
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(
      () => setPhase((p) => (p === "in" ? "out" : "in")),
      phase === "in" ? 4000 : 6000,
    );
    return () => clearTimeout(t);
  }, [phase, reduce]);
  return (
    <div className="pr-pacer" aria-label="Breathing pacer: inhale for 4, exhale for 6">
      <div className="pr-pacer-stage">
        <span className="pr-pacer-ring" aria-hidden="true" />
        <span className="pr-pacer-ring pr-pacer-ring-2" aria-hidden="true" />
        <motion.div
          className="pr-pacer-core"
          animate={reduce ? undefined : { scale: phase === "in" ? 1.35 : 1 }}
          transition={{ duration: phase === "in" ? 4 : 6, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <span className="pr-pacer-word">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {phase === "in" ? "Breathe in" : "Breathe out"}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
      <span className="pr-pacer-count">Inhale 4 · Exhale 6 — try one breath with us</span>
    </div>
  );
}

/** Live Rishikesh clock for the hero HUD strip — ticks every second. */
function LiveClock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      {now || "—"} IST
    </>
  );
}

/** Living gradient — a lightweight canvas of slow-drifting clay/peach/cream
    light. requestAnimationFrame, paused when off-screen, static fallback
    when reduced motion is on. No library, no video. */
function LivingGradient({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const blobs = [
      { x: 0.18, y: 0.28, r: 0.5, c: [176, 90, 58], sp: 0.00021, ph: 0 },
      { x: 0.78, y: 0.22, r: 0.42, c: [246, 201, 168], sp: 0.00016, ph: 2 },
      { x: 0.62, y: 0.82, r: 0.52, c: [138, 69, 39], sp: 0.00013, ph: 4 },
      { x: 0.22, y: 0.78, r: 0.4, c: [250, 246, 239], sp: 0.00018, ph: 1 },
    ];
    const draw = (t: number) => {
      if (!running) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (const b of blobs) {
        const bx = (b.x + Math.sin(t * b.sp + b.ph) * 0.09) * w;
        const by = (b.y + Math.cos(t * b.sp * 1.3 + b.ph) * 0.09) * h;
        const br = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        const [R, G, B] = b.c;
        g.addColorStop(0, `rgba(${R},${G},${B},0.5)`);
        g.addColorStop(1, `rgba(${R},${G},${B},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!e.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    raf = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduce]);
  if (reduce) {
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 30%, rgba(176,90,58,.35), transparent 70%), radial-gradient(50% 60% at 75% 70%, rgba(246,201,168,.3), transparent 70%)",
        }}
      />
    );
  }
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/** Magnetic wrapper — the child drifts gently toward the cursor on hover,
    then springs back. */
function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // Gentle pull, hard-capped so the button can never reach a neighbour:
    // the hero CTA gap is 14px, so a 10px max offset always clears it.
    const cx = (e.clientX - (r.left + r.width / 2)) * 0.12;
    const cy = (e.clientY - (r.top + r.height / 2)) * 0.12;
    x.set(Math.max(-10, Math.min(10, cx)));
    y.set(Math.max(-10, Math.min(10, cy)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span
      ref={ref}
      className={className ? `pr-magnetic ${className}` : "pr-magnetic"}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { x: sx, y: sy }}
    >
      {children}
    </motion.span>
  );
}

/** 3D tilt card — rotates toward the cursor with a sweeping glare.
    The tilt lives on the card; inner links and buttons keep working. */
function TiltCard({ className, children }: { className: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 260, damping: 18 });
  const sry = useSpring(ry, { stiffness: 260, damping: 18 });
  const gx = useMotionValue(50);
  const go = useMotionValue(0);
  // Diagonal shine band that sweeps across the card with the cursor.
  // Warm peach-white so it reads on the white card, the clay hover
  // colour and the stay photos alike (a plain white radial glow is
  // invisible on the white card).
  const glare = useMotionTemplate`linear-gradient(115deg, transparent calc(${gx}% - 70px), rgba(246,201,168,.45) calc(${gx}% - 24px), rgba(255,255,255,.85) ${gx}%, rgba(246,201,168,.45) calc(${gx}% + 24px), transparent calc(${gx}% + 70px))`;
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 20);
    rx.set((0.5 - py) * 20);
    gx.set(px * 100);
    go.set(1);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    go.set(0);
  };
  return (
    <motion.article
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
    >
      {children}
      <motion.span
        className="pr-glare"
        aria-hidden="true"
        style={reduce ? undefined : { background: glare, opacity: go }}
      />
    </motion.article>
  );
}

/** Hero headline with a 3D letter flip — words rotate up from 90deg,
    staggered, so the headline tumbles into place. */
function FlipTitle() {
  const reduce = useReducedMotion();
  const words: { t: string; em?: boolean }[] = [
    { t: "Come" },
    { t: "back" },
    { t: "to" },
    { t: "your breath.", em: true },
  ];
  return (
    <h1 className="pr-hero-title">
      {words.map((w, i) => (
        <span key={w.t} className="pr-flip-word">
          <motion.span
            className="pr-flip-inner"
            style={{ transformPerspective: 900 }}
            initial={reduce ? false : { rotateX: 88, y: 34, opacity: 0 }}
            animate={{ rotateX: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.11, ease: [0.22, 0.61, 0.21, 1] }}
          >
            {w.em ? <em>{w.t}</em> : w.t}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function Prana() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [part, setPart] = useState(0);
  const [programme, setProgramme] = useState(1);
  const [stay, setStay] = useState(0);
  const reduce = useReducedMotion();

  /* Hero parallax: the full-bleed photo drifts down slowly as the hero
     scrolls away. */
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "10%"]);

  /* Pinned breath moment: the core grows on the inhale half of the scroll
     and settles on the exhale half, with the word crossfading. */
  const breathRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: breathProgress } = useScroll({
    target: breathRef,
    offset: ["start start", "end end"],
  });
  const breathScale = useTransform(breathProgress, [0, 0.5, 1], [0.55, 2.3, 1]);
  const breathGlow = useTransform(breathProgress, [0, 0.5, 1], [0.35, 1, 0.5]);
  const breathWordTilt = useTransform(breathProgress, [0, 1], [10, -8]);
  const inhaleOpacity = useTransform(breathProgress, [0.02, 0.12, 0.38, 0.48], [0, 1, 1, 0]);
  const exhaleOpacity = useTransform(breathProgress, [0.52, 0.62, 0.82, 0.92], [0, 1, 1, 0]);
  const breathLineOpacity = useTransform(breathProgress, [0.55, 0.68, 1], [0, 1, 1]);

  /* Hero mouse parallax — orbs and the pacer tilt follow the cursor. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18 });
  const smy = useSpring(my, { stiffness: 55, damping: 18 });
  const orbAX = useTransform(smx, (v) => v * 36);
  const orbAY = useTransform(smy, (v) => v * 26);
  const orbBX = useTransform(smx, (v) => v * -48);
  const orbBY = useTransform(smy, (v) => v * -34);
  const orbCX = useTransform(smx, (v) => v * 22);
  const orbCY = useTransform(smy, (v) => v * -18);
  const pacerTiltX = useTransform(smy, (v) => v * -10);
  const pacerTiltY = useTransform(smx, (v) => v * 12);
  const onHeroMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onHeroMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const p = PROGRAMMES[programme];
  const s = STAYS[stay];
  const r = RHYTHM[part];
  const total = p.price + s.supplement;

  return (
    <div className="pr">
      {/* ---- header: slim, wordmark left, Reserve right ---- */}
      <header className="pr-header">
        <div className="pr-wrap pr-header-inner">
          <a className="pr-brand" href="#top" aria-label="Prana home">
            <span className="pr-brand-dot" aria-hidden="true" />
            <span className="pr-brand-text">PRANA</span>
            <span className="pr-brand-sub">RISHIKESH</span>
          </a>
          <nav className="pr-nav" aria-label="Main">
            <a href="#rhythm">The day</a>
            <a href="#programmes">Programmes</a>
            <a href="#stays">Stays</a>
            <a href="#teachers">Teachers</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="pr-btn pr-btn-accent pr-header-btn" href="#book">Reserve →</a>
        </div>
      </header>

      {/* ---- hero: full-bleed B&W photo, huge white headline, glowing pacer ---- */}
      <section
        className="pr-hero"
        ref={heroRef}
        onMouseMove={onHeroMouse}
        onMouseLeave={onHeroMouseLeave}
      >
        <motion.div
          className="pr-hero-media pr-bw"
          style={reduce ? undefined : { y: heroY }}
          aria-hidden="true"
        >
          <Image src={HERO_IMG} alt="" fill priority sizes="100vw" />
          <div className="pr-hero-shade" />
        </motion.div>
        <LivingGradient className="pr-hero-glow" />
        <div className="pr-hero-orbs" aria-hidden="true">
          <motion.span
            className="pr-orb pr-orb-a"
            style={reduce ? undefined : { x: orbAX, y: orbAY }}
          />
          <motion.span
            className="pr-orb pr-orb-b"
            style={reduce ? undefined : { x: orbBX, y: orbBY }}
          />
          <motion.span
            className="pr-orb pr-orb-c"
            style={reduce ? undefined : { x: orbCX, y: orbCY }}
          />
        </div>
        <div className="pr-wrap pr-hero-over">
          <div className="pr-hero-grid">
            <div className="pr-hero-copy">
              <BlurReveal>
                <span className="pr-mono">(00) PRANA — YOGA &amp; WELLNESS RETREAT, RISHIKESH</span>
                <FlipTitle />
                <p className="pr-hero-sub">
                  A small yoga and wellness retreat on the banks of the Ganges —
                  sunrise practice, slow food, river evenings and nothing you
                  have to keep up with.
                </p>
                <div className="pr-hero-cta">
                  <Magnetic>
                    <a className="pr-btn pr-btn-accent" href="#programmes">See programmes ↓</a>
                  </Magnetic>
                  <a className="pr-btn pr-btn-ghost-light" href="#rhythm">A day at Prana</a>
                </div>
              </BlurReveal>
            </div>
            <motion.div
              className="pr-hero-pacer-tilt"
              style={reduce ? undefined : { rotateX: pacerTiltX, rotateY: pacerTiltY, transformPerspective: 1000 }}
            >
              <BreathPacer />
            </motion.div>
          </div>
          <div className="pr-hero-facts">
            <span><b>From £480</b>per person</span>
            <span><b>12 guests</b>at most</span>
            <span><b>Every Monday</b>new groups start</span>
            <span><b><LiveClock /></b>in Rishikesh</span>
          </div>
          <a className="pr-scroll-cue" href="#rhythm">
            Scroll to breathe <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* ---- marquee ticker: clay strip, repeating ---- */}
      <div className="pr-ticker" aria-hidden="true">
        <div className="pr-ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>
              {t}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      {/* ---- pinned breath moment: the core grows as you scroll ---- */}
      <section className="pr-breath" ref={breathRef} aria-label="A breath, slowed down">
        <LivingGradient className="pr-breath-glow" />
        <div className="pr-breath-sticky">
          <motion.span
            className="pr-breath-wordmark"
            aria-hidden="true"
            style={{ x: "-50%", y: "-50%", transformPerspective: 1200, rotateX: reduce ? 0 : breathWordTilt }}
          >
            BREATHE
          </motion.span>
          <div className="pr-breath-stage">
            <motion.div
              className="pr-breath-halo"
              style={reduce ? undefined : { opacity: breathGlow, scale: breathScale }}
              aria-hidden="true"
            />
            <motion.div
              className="pr-breath-core"
              style={reduce ? undefined : { scale: breathScale }}
              aria-hidden="true"
            />
            <motion.span
              className="pr-breath-label"
              style={reduce ? undefined : { opacity: inhaleOpacity }}
            >
              Inhale
            </motion.span>
            <motion.span
              className="pr-breath-label"
              style={reduce ? undefined : { opacity: exhaleOpacity }}
            >
              Exhale
            </motion.span>
          </div>
          <motion.p
            className="pr-breath-line"
            style={reduce ? undefined : { opacity: breathLineOpacity }}
          >
            One breath. That&rsquo;s all it takes.
          </motion.p>
        </div>
      </section>

      {/* ---- rhythm: a sun arc across the day, detail below ---- */}
      <section className="pr-section" id="rhythm">
        <div className="pr-wrap">
          <BlurReveal>
            <span className="pr-mono">(01) THE DAY</span>
            <h2>One day, five slow parts.</h2>
            <p className="pr-lede">
              Every day at Prana follows the same arc — practice, food, a
              workshop, empty hours and a sit by the river. Tap a point on the
              arc to see that part of the day.
            </p>
          </BlurReveal>
          <div className="pr-arc" role="tablist" aria-label="Parts of the day">
            <svg className="pr-arc-svg" viewBox="0 0 1000 260" preserveAspectRatio="none" aria-hidden="true">
              <motion.path
                d="M 60 230 Q 500 -60 940 230"
                fill="none"
                stroke="var(--pr-line)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              <motion.circle
                cx="500" cy="28" r="7" fill="var(--pr-accent)"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
              />
              <motion.circle
                cx="500" cy="28" r="7" fill="none" stroke="var(--pr-accent)" strokeWidth="2"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0], scale: [1, 2.4, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
            </svg>
            {RHYTHM.map((rt, i) => (
              <motion.button
                key={rt.time}
                role="tab"
                aria-selected={part === i}
                className={`pr-arc-dot${part === i ? " on" : ""}`}
                style={{ left: `${[11.3, 30.6, 50, 69.4, 88.7][i]}%`, top: `${[75.8, 43.5, 32.7, 43.5, 75.8][i]}%` }}
                onClick={() => setPart(i)}
                initial={{ opacity: 0, x: "-50%", y: "-30%", scale: 0.85 }}
                whileInView={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.22, ease: "easeOut" }}
                whileHover={{ y: "-62%", scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="pr-arc-time">{rt.time}</span>
                <span className="pr-arc-name">{rt.name}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={part}
              className="pr-rhythm-detail"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className={`pr-rhythm-img${r.bw ? " pr-bw" : ""}`}>
                <Image src={r.img} alt={r.alt} width={1200} height={800} sizes="(max-width: 900px) 100vw, 45vw" />
              </div>
              <div className="pr-rhythm-body">
                <span className="pr-mono">{r.time}</span>
                <h3>{r.name}</h3>
                <p>{r.text}</p>
                <a className="pr-link" href="#book">Plan a day like this →</a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ---- programmes: three cards, selection carries into the booking form ---- */}
      <section className="pr-section pr-section-soft pr-wordmark-sec" id="programmes">
        <span className="pr-wordmark" aria-hidden="true">PRANA</span>
        <div className="pr-wrap">
          <BlurReveal>
            <span className="pr-mono">(02) PROGRAMMES</span>
            <h2>Choose how long you stay.</h2>
            <p className="pr-lede">
              Three programmes, one rhythm. Pick one and it carries straight
              into your booking below — the price updates with your stay.
            </p>
          </BlurReveal>
          <div className="pr-prog-grid">
            {PROGRAMMES.map((pg, i) => (
              <TiltCard key={pg.title} className={`pr-prog${programme === i ? " on" : ""}${pg.popular ? " pr-prog-pop" : ""}`}>
                {pg.popular && <span className="pr-prog-flag">MOST CHOSEN</span>}
                <span className="pr-mono">{pg.days}</span>
                <h3>{pg.title}</h3>
                <p className="pr-prog-price">
                  From £{pg.price} <span>per person</span>
                </p>
                <p>{pg.text}</p>
                <ul>
                  {pg.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <a
                  className="pr-btn pr-btn-accent pr-prog-btn"
                  href="#book"
                  onClick={() => setProgramme(i)}
                >
                  {programme === i ? "Selected ✓" : "Reserve this programme →"}
                </a>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ---- stays: three image cards, each reserves into the booking form ---- */}
      <section className="pr-section" id="stays">
        <div className="pr-wrap">
          <BlurReveal>
            <span className="pr-mono">(03) STAYS</span>
            <h2>Sleep simply, sleep well.</h2>
            <p className="pr-lede">
              Every programme includes a Garden Room. Upgrade to a river view
              or a private cottage when you book — the price follows your
              choice.
            </p>
          </BlurReveal>
          <div className="pr-stay-grid">
            {STAYS.map((st, i) => (
              <TiltCard key={st.title} className={`pr-stay${stay === i ? " on" : ""}`}>
                <div className="pr-stay-img">
                  <Image src={st.img} alt={st.alt} width={1000} height={700} sizes="(max-width: 900px) 100vw, 33vw" />
                  <span className="pr-stay-tag">{st.tag}</span>
                  {stay === i && <span className="pr-stay-chip">Selected ✓</span>}
                </div>
                <div className="pr-stay-body">
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                  <p className="pr-stay-price">{st.priceNote}</p>
                  <a
                    className="pr-btn pr-btn-accent pr-stay-btn"
                    href="#book"
                    onClick={() => setStay(i)}
                  >
                    {stay === i ? "Selected ✓" : "Reserve this stay →"}
                  </a>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ---- included: photo + checklist ---- */}
      <section className="pr-section pr-section-soft" id="included">
        <div className="pr-wrap pr-included-grid">
          <div className="pr-included-img">
            <Image src={INCLUDED_IMG} alt="Yoga practice at the retreat" width={1400} height={1000} sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
          <div>
            <BlurReveal>
              <span className="pr-mono">(04) WHAT&apos;S INCLUDED</span>
              <h2>Everything you need. Nothing you don&apos;t.</h2>
              <p className="pr-lede">
                One price covers the whole stay — no extras at checkout, no
                resort fees.
              </p>
            </BlurReveal>
            <ul className="pr-checks">
              {INCLUDED.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                  whileHover={{ x: 4 }}
                >
                  <motion.span
                    className="pr-check-mark"
                    aria-hidden="true"
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: [0.4, 1.25, 1], opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 + 0.15, ease: "easeOut" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <motion.path
                        d="M4 12.5 L9.5 18 L20 6"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.45, delay: i * 0.08 + 0.18, ease: "easeOut" }}
                      />
                    </svg>
                  </motion.span>
                  {it}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- teachers: three portrait cards ---- */}
      <section className="pr-section" id="teachers">
        <div className="pr-wrap">
          <BlurReveal>
            <span className="pr-mono">(05) TEACHERS</span>
            <h2>Taught by people who live here.</h2>
            <p className="pr-lede">
              Three teachers, one small team. You will know all of them by
              name before the end of your first day.
            </p>
          </BlurReveal>
          <div className="pr-teacher-grid">
            {TEACHERS.map((t) => (
              <motion.article
                key={t.name}
                className="pr-teacher"
                style={{ transformPerspective: 900 }}
                whileHover={reduce ? undefined : { y: -8, rotateX: -3, rotateY: 3 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <div className="pr-teacher-img">
                  <Image src={t.img} alt={t.alt} width={800} height={1000} sizes="(max-width: 900px) 100vw, 33vw" />
                </div>
                <h3>{t.name}</h3>
                <span className="pr-mono">{t.role}</span>
                <p>{t.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- stats: one quiet row (placeholder figures) ---- */}
      <section className="pr-stats">
        <div className="pr-wrap">
          <div className="pr-stat-row">
            {STATS.map((st) => (
              <div key={st.label} className="pr-stat">
                <span className="pr-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="pr-stat-label">{st.label}</span>
                <span className="pr-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
          <p className="pr-note">Placeholder figures — swap in your own numbers.</p>
        </div>
      </section>

      {/* ---- voices: three quiet quotes ---- */}
      <section className="pr-section" id="voices">
        <div className="pr-wrap">
          <BlurReveal>
            <span className="pr-mono">(06) GUEST VOICES</span>
            <h2>What guests take home.</h2>
          </BlurReveal>
          <div className="pr-voice-grid">
            {VOICES.map((v) => (
              <figure key={v.who} className="pr-voice">
                <blockquote>“{v.quote}”</blockquote>
                <figcaption>— {v.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---- second marquee: dark strip, runs the other way ---- */}
      <div className="pr-ticker pr-ticker-dark" aria-hidden="true">
        <div className="pr-ticker-track pr-ticker-rev">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>
              {t}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      {/* ---- faq: single-open accordion ---- */}
      <section className="pr-section pr-section-soft" id="faq">
        <div className="pr-wrap pr-faq-wrap">
          <BlurReveal>
            <span className="pr-mono">(07) QUESTIONS</span>
            <h2>Before you ask.</h2>
          </BlurReveal>
          <div className="pr-faq">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`pr-faq-item${openFaq === i ? " open" : ""}`}>
                <button
                  className="pr-faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="pr-faq-icon" aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="pr-faq-a">
                    <p>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- booking: programme + stay carry through from the page ---- */}
      <section className="pr-section" id="book">
        <div className="pr-wrap pr-book-grid">
          <div>
            <BlurReveal>
              <span className="pr-mono">(08) BOOK YOUR RETREAT</span>
              <h2>Reserve your place.</h2>
              <p className="pr-lede">
                Tell us when you would like to come and we will confirm
                availability within 48 hours — usually much sooner. No
                obligation, no card taken. Prefer to talk? Call{" "}
                <a href={`tel:${PHONE_HREF}`}>{PHONE}</a> or email{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
            </BlurReveal>
            <div className="pr-summary">
              <span className="pr-mono">YOUR SELECTION</span>
              <p className="pr-summary-line">
                {p.title} · {s.title}
              </p>
              <p className="pr-summary-price">From £{total} per person</p>
              <p className="pr-summary-note">
                {p.days} · {s.priceNote === "Included" ? "Garden Room included" : `Stay supplement ${s.priceNote}`}
              </p>
            </div>
          </div>
          <Reveal>
            {sent ? (
              <div className="pr-form-ok">
                <strong>Thank you — your request is in.</strong>
                <p>
                  We have your details and will come back with availability
                  and a price, usually within one working day. If it is
                  urgent, call {PHONE}.
                </p>
              </div>
            ) : (
              <form className="pr-form" onSubmit={onBook}>
                <label>
                  Full name
                  <input name="name" type="text" placeholder="Your name" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" placeholder="you@example.com" required />
                </label>
                <label>
                  Phone
                  <input name="phone" type="tel" placeholder="Your phone number" required />
                </label>
                <label>
                  Arrival date
                  <input name="arrival" type="date" required />
                </label>
                <label>
                  Programme
                  <select
                    name="programme"
                    value={p.title}
                    onChange={(e) =>
                      setProgramme(PROGRAMMES.findIndex((pg) => pg.title === e.target.value))
                    }
                  >
                    {PROGRAMMES.map((pg) => (
                      <option key={pg.title}>{pg.title}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Stay
                  <select
                    name="stay"
                    value={s.title}
                    onChange={(e) =>
                      setStay(STAYS.findIndex((st) => st.title === e.target.value))
                    }
                  >
                    {STAYS.map((st) => (
                      <option key={st.title}>{st.title}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Guests
                  <select name="guests" defaultValue="1 guest">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                  </select>
                </label>
                <label>
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your trip, your experience, or anything you need…"
                  />
                </label>
                <Magnetic className="pr-form-submit">
                  <button className="pr-btn pr-btn-accent pr-btn-lg" type="submit">
                    Request booking — £{total}
                  </button>
                </Magnetic>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---- footer: giant clay wordmark ---- */}
      <footer className="pr-footer">
        <div className="pr-wrap">
          <span className="pr-footer-word">PRANA</span>
          <p className="pr-footer-statement">
            A yoga &amp; wellness retreat on the Ganges — sunrise practice,
            slow food and river evenings, in Rishikesh.
          </p>
          <div className="pr-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#rhythm">The day</a></li>
                <li><a href="#programmes">Programmes</a></li>
                <li><a href="#stays">Stays</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </nav>
            <div className="pr-footer-contact">
              <h3>CONTACT</h3>
              <p>
                <a href={`tel:${PHONE_HREF}`}>{PHONE}</a>
                <br />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <br />
                {PLACE}
              </p>
            </div>
          </div>
          <span className="pr-footer-copy">
            © 2026 Prana Retreat · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
