"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform, animate } from "framer-motion";

const PHONE = "+91 477 000 0000";
const PHONE_HREF = "+914770000000";
const EMAIL = "hello@sattva-kerala.com";
const PLACE = "Near the Alleppey backwaters, Kerala, India";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Kerala, Ayurveda and ritual photography (all verified 200). The yoga
   practice and the herbs are B&W for the calm, editorial look; everything
   else stays in full colour so the place shows through. */
const HERO_IMG = U("1602216056096-3b40cc0c9944", 1800); // Kerala backwaters
const RITUAL_IMG = U("1506126613408-eca07ce68773", 1400); // morning practice (B&W)
const HERBS_IMG = U("1477763858572-cda7deaa9bc5", 1400); // herbs and oils (B&W)
const PLANTS_IMG = U("1466692476868-aef1dfb1e735", 1400); // green leaves

const DOSHAS = [
  {
    name: "Vata",
    element: "Air + Space",
    sanskrit: "वात",
    qualities: ["Light", "Dry", "Cool", "Mobile"],
    focus: "Grounding, warmth and routine — slow oil, steady meals, early nights.",
    text: "Vata moves fast and dries out easily. When it is out of balance, sleep gets light, the mind races and digestion turns irregular. The ritual for Vata is warmth and weight: warm oil, warm food, warm rooms, and nothing rushed.",
    treatments: ["Abhyanga", "Pizhichil", "Shirodhara"],
    colour: "#8A7B5C",
  },
  {
    name: "Pitta",
    element: "Fire + Water",
    sanskrit: "पित्त",
    qualities: ["Hot", "Sharp", "Light", "Intense"],
    focus: "Cooling, calm and moderation — cool oils, moonlit walks, no hurry.",
    text: "Pitta runs hot and sharp. When it is out of balance, skin flares, temper shortens and sleep turns shallow. The ritual for Pitta is cooling and softening: cool oils, gentle touch, shade in the afternoon, and food that calms rather than stokes.",
    treatments: ["Shirodhara", "Abhyanga", "Nasya"],
    colour: "#B0713C",
  },
  {
    name: "Kapha",
    element: "Earth + Water",
    sanskrit: "कफ",
    qualities: ["Heavy", "Slow", "Cool", "Steady"],
    focus: "Stimulation, warmth and movement — dry brushing, brisk walks, spice.",
    text: "Kapha is steady and heavy. When it is out of balance, mornings feel sluggish, weight creeps up and the body holds water. The ritual for Kapha is movement and heat: stimulating massage, dry powders, brisk walks along the water, and food with bite.",
    treatments: ["Udwarthanam", "Nasya", "Kizhi"],
    colour: "#5C6E58",
  },
];

const DAYS = [
  {
    title: "Arrive & settle",
    focus: "Consultation and a gentle first touch.",
    blocks: [
      { when: "Morning", time: "09:00", text: "Arrive, settle into your cottage, and sit down with the Vaidya for your dosha consultation — pulse, questions, and a plan for the days ahead." },
      { when: "Midday", time: "13:00", text: "A light kitchari lunch, then a gentle foot massage and an afternoon free to walk the bund and watch the backwaters." },
      { when: "Evening", time: "18:30", text: "A short Abhyanga to loosen the journey out of your shoulders, herbal tea, and an early night." },
    ],
  },
  {
    title: "Begin the cleanse",
    focus: "Warm oil, warm food, slow mornings.",
    blocks: [
      { when: "Morning", time: "06:30", text: "Sunrise yoga and breathwork on the deck, then warm water with lemon and a slow, quiet breakfast." },
      { when: "Midday", time: "11:00", text: "Full-body Abhyanga followed by a herbal steam. Lunch is kitchari with ghee and cumin." },
      { when: "Evening", time: "17:30", text: "A guided meditation by the water, then a light dinner and an early night — no screens after dark." },
    ],
  },
  {
    title: "Deepen",
    focus: "The oil reaches further in.",
    blocks: [
      { when: "Morning", time: "06:30", text: "Yoga and breathwork, then a warm oil head massage. Breakfast is stewed fruit and spiced porridge." },
      { when: "Midday", time: "11:00", text: "Shirodhara — a slow stream of warm oil on the forehead — followed by rest in a dark, cool room." },
      { when: "Evening", time: "17:30", text: "A gentle walk along the backwaters, then soup, tea and sleep." },
    ],
  },
  {
    title: "Release",
    focus: "What the body is ready to let go of.",
    blocks: [
      { when: "Morning", time: "06:30", text: "Yoga, breathwork and a warm lemon cleanse. Breakfast is light — fruit and herbal tea." },
      { when: "Midday", time: "11:00", text: "Pizhichil — warm oil poured and massaged in rhythm — then a long rest. Lunch is simple kitchari." },
      { when: "Evening", time: "17:30", text: "Sitting by the water at dusk. A short talk on daily routine, then dinner and sleep." },
    ],
  },
  {
    title: "Restore",
    focus: "Nourishment comes back in.",
    blocks: [
      { when: "Morning", time: "06:30", text: "Yoga and breathwork, then Nasya — herbal oil for the sinuses — and a fuller breakfast with ghee and fruit." },
      { when: "Midday", time: "11:00", text: "Kizhi — warm herbal poultices pressed along the joints — followed by a slow lunch and a nap." },
      { when: "Evening", time: "17:30", text: "A backwater boat ride at golden hour, then a proper dinner together under the trees." },
    ],
  },
  {
    title: "Integrate",
    focus: "The routine becomes yours.",
    blocks: [
      { when: "Morning", time: "06:30", text: "Yoga and breathwork, then a self-massage lesson — the one practice you take home with you." },
      { when: "Midday", time: "11:00", text: "A final Abhyanga, then a long lunch and free time to swim, read or do nothing at all." },
      { when: "Evening", time: "17:30", text: "A closing circle: what changed, what to keep, and a simple daily routine written out for home." },
    ],
  },
  {
    title: "Return",
    focus: "Leave lighter than you arrived.",
    blocks: [
      { when: "Morning", time: "06:30", text: "A last sunrise practice on the deck, then breakfast and a slow pack." },
      { when: "Midday", time: "11:00", text: "A farewell consultation with the Vaidya — your take-home plan, oils and herbs for the first month." },
      { when: "Evening", time: "16:00", text: "The boat to the jetty. Leave with a routine, not just a memory." },
    ],
  },
];

const PROGRAMMES = [
  {
    title: "3-Day Reset",
    days: "3 days · 2 nights",
    daysCount: 3,
    price: 520,
    text: "A long weekend to arrive and exhale. Consultation, daily Abhyanga and Shirodhara — enough to feel the difference.",
    points: ["Dosha consultation", "Daily Abhyanga", "1 Shirodhara", "All meals included"],
  },
  {
    title: "5-Day Deep Cleanse",
    days: "5 days · 4 nights",
    price: 840,
    text: "The full cleanse arc: consultation, five days of treatments, Pizhichil and Kizhi, and a backwater boat ride at golden hour.",
    points: ["Dosha consultation", "Daily treatments", "Pizhichil & Kizhi", "Backwater boat ride"],
    popular: true,
  },
  {
    title: "7-Day Panchakarma",
    days: "7 days · 6 nights",
    price: 1150,
    text: "The classical seven-day Panchakarma, done properly and slowly. The full ritual, a take-home plan, and a routine to keep.",
    points: ["Full Panchakarma", "Daily treatments", "Take-home plan", "One-to-one with the Vaidya"],
  },
];

const STAYS = [
  {
    title: "Garden Cottage",
    supplement: 0,
    text: "A quiet cottage among the palms, with a veranda for morning tea and a garden you can walk barefoot in.",
    img: U("1582719478250-c89cae4dc85b", 1200),
    alt: "A calm garden cottage bedroom",
    tag: "Included",
  },
  {
    title: "Backwater View",
    supplement: 90,
    text: "A room above the water, with a balcony over the backwaters — boats drift past while you have your tea.",
    img: U("1590490360182-c33d57733427", 1200),
    alt: "A bright room with a view over the water",
    tag: "Water view",
  },
  {
    title: "Private Villa",
    supplement: 220,
    text: "A standalone villa with its own plunge pool and garden — for two, or for one person who wants real quiet.",
    img: U("1578683010236-d716f9a3f461", 1200),
    alt: "A private villa bedroom",
    tag: "Most private",
  },
];

const TREATMENTS = [
  {
    name: "Abhyanga",
    time: "60 min",
    dosha: ["Vata", "Pitta"],
    img: U("1544161515-4ab6ce6db874", 1200),
    alt: "Warm oil massage",
    text: "The foundation of everything here. Warm herbal oil, massaged over the whole body in long, slow strokes. It loosens the shoulders, steadies the nerves and helps you sleep like you used to.",
  },
  {
    name: "Shirodhara",
    time: "45 min",
    dosha: ["Pitta", "Vata"],
    img: U("1540555700478-4be289fbecef", 1200),
    alt: "A calm spa treatment",
    text: "A slow, unbroken stream of warm oil poured onto the forehead. Guests describe it as the mind going quiet — the one treatment people come back for, and the one they talk about for months.",
  },
  {
    name: "Udwarthanam",
    time: "45 min",
    dosha: ["Kapha"],
    img: U("1600334129128-685c5582fd35", 1200),
    alt: "An invigorating massage",
    text: "Warm herbal powders massaged upward against the grain of the hair. Stimulating, warming and brisk — the treatment for heavy mornings, slow digestion and the feeling of carrying too much.",
  },
  {
    name: "Nasya",
    time: "30 min",
    dosha: ["Kapha", "Pitta"],
    img: U("1570172619644-dfd03ed5d881", 1200),
    alt: "A gentle head and face treatment",
    text: "Herbal oil, gently administered through the nose after a face massage and steam. Clears the sinuses, sharpens the senses and settles the head — small treatment, outsized effect.",
  },
  {
    name: "Pizhichil",
    time: "75 min",
    dosha: ["Vata"],
    img: U("1596178065887-1198b6148b2b", 1200),
    alt: "Warm oil poured in rhythm",
    text: "Warm oil poured in a steady rhythm while two therapists massage in time with it. Deeply soothing — the treatment we give on the days the body is ready to let go.",
  },
  {
    name: "Kizhi",
    time: "45 min",
    dosha: ["Vata", "Kapha"],
    img: U("1512290923902-8a9f81dc236c", 1200),
    alt: "Herbal poultice massage",
    text: "Warm pouches of herbs, rice and camphor pressed along the joints and spine. Eases stiffness, warms the joints and leaves the body feeling oiled from the inside out.",
  },
];

const PRACTITIONERS = [
  {
    name: "Ananya",
    role: "Ayurvedic physician (Vaidya)",
    focus: "Consultations & Panchakarma",
    img: U("1573496359142-b8d87734a5a2", 900),
    alt: "Portrait of Ananya",
    text: "Trained in Kerala, practising for over a decade. She reads the pulse, asks the right questions, and writes a plan that fits the person in front of her — not the textbook.",
  },
  {
    name: "Meera",
    role: "Senior therapist",
    focus: "Abhyanga & Shirodhara",
    img: U("1580489944761-15a19d654956", 900),
    alt: "Portrait of Meera",
    text: "Hands that have done this thousands of times. Meera is the one guests ask for by name, and the reason the Shirodhara room is always booked first.",
  },
  {
    name: "Arjun",
    role: "Yoga & breathwork teacher",
    focus: "Sunrise practice & breath",
    img: U("1595152772835-219674b2a8a6", 900),
    alt: "Portrait of Arjun",
    text: "Leads the sunrise practice on the deck — slow, steady and quiet, with no experience needed and no showing off. He teaches the breath you take home with you.",
  },
];

const INCLUDED = [
  "Dosha consultation with the Vaidya",
  "Daily Ayurvedic treatments",
  "All vegetarian meals, cooked on site",
  "Sunrise yoga & breathwork",
  "Herbal teas, oils & steam",
  "Backwater walks & boat ride",
  "Mats, props & blankets",
  "Small groups — max 12 guests",
];

const STATS = [
  { n: 7, suffix: "", label: "DAYS, LONGEST PROGRAMME" },
  { n: 12, suffix: "", label: "GUESTS, AT MOST" },
  { n: 6, suffix: "", label: "TREATMENTS IN THE RITUAL" },
  { n: 20, suffix: "+", label: "YEARS OF PRACTICE" },
];

const VOICES = [
  {
    quote: "I arrived wired and left quiet. The Shirodhara did something no holiday ever has.",
    who: "Guest, 5-Day Deep Cleanse",
  },
  {
    quote: "The food alone was worth it — and then the treatments started. I slept through the night for the first time in years.",
    who: "Guest, 7-Day Panchakarma",
  },
  {
    quote: "Slow, unhurried, and nothing to keep up with. I took the morning routine home and I still do it.",
    who: "Guest, 3-Day Reset",
  },
];

const FAQS = [
  {
    q: "Do I need to know my dosha before I arrive?",
    a: "No. The Vaidya works it out in your consultation on the first morning — pulse, questions, and a look at how you actually live. The dosha selector on this page is just a way to explore; your plan is written for you, in person.",
  },
  {
    q: "What will I eat during the cleanse?",
    a: "Simple vegetarian food, cooked on site: kitchari, stewed fruit, spiced porridge, soups and herbal teas. Everything is chosen for your dosha and the day you are on — lighter at the start, more nourishing as the cleanse deepens.",
  },
  {
    q: "Is Panchakarma suitable for everyone?",
    a: "Almost everyone, but not quite everyone — pregnancy, some heart conditions and acute illness mean a gentler programme instead. That is exactly what the consultation is for: the Vaidya will tell you honestly if the full seven days is right for you, and adjust it if it is not.",
  },
  {
    q: "What should I bring?",
    a: "Light, loose clothes you do not mind getting oil on, a shawl for cool mornings, and comfortable shoes for the bund walks. Mats, props, blankets, oils and towels are all provided.",
  },
  {
    q: "Can I come alone?",
    a: "Most guests do. Groups are small — twelve at most — and the days are structured enough that you are never on your own unless you want to be. The backwater boat ride is the one thing everyone does together.",
  },
];

const TICKER = [
  "Abhyanga",
  "Shirodhara",
  "Panchakarma",
  "Dosha consultation",
  "Backwater mornings",
  "Warm oil",
  "Kitchari",
  "Sunrise yoga",
  "Herbal steam",
  "Slow days",
];

/* ---- local motion helpers: blur-to-sharp reveals, calm easings ---- */
function BlurReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Count-up number that starts when it scrolls into view. */
function CountUp({ n, suffix }: { n: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, n, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => c.stop();
  }, [inView, n]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

/* Gentle tilt card — a calm lean (±3°) and a faint sheen, never a flip.
   Hover is deliberately subtle: no colour change, no bright band. */
function SoftTilt({ className, children }: { className: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const gx = useMotionValue(50);
  const go = useMotionValue(0);
  const glare = useMotionTemplate`linear-gradient(115deg, transparent calc(${gx}% - 90px), rgba(246,201,168,.14) calc(${gx}% - 36px), rgba(255,255,255,.28) ${gx}%, rgba(246,201,168,.14) calc(${gx}% + 36px), transparent calc(${gx}% + 90px))`;
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 6);
    rx.set((0.5 - py) * 6);
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
        className="sv-glare"
        aria-hidden="true"
        style={reduce ? undefined : { background: glare, opacity: go }}
      />
    </motion.article>
  );
}

/* Ritual ring — seven slow dots on a ring, turning once a minute.
   A ceremonial motif, not a pacer: it marks the seven days, not the breath. */
function RitualRing() {
  const reduce = useReducedMotion();
  return (
    <div className="sv-ring" aria-hidden="true">
      <motion.div
        className="sv-ring-turn"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <span key={i} className="sv-ring-dot" style={{ transform: `rotate(${i * (360 / 7)}deg) translateY(-58px)` }} />
        ))}
      </motion.div>
      <span className="sv-ring-core">7</span>
    </div>
  );
}

export default function Sattva() {
  const reduce = useReducedMotion();
  const [dosha, setDosha] = useState(1);
  const [programme, setProgramme] = useState(1);
  const [stay, setStay] = useState(0);
  const [treatment, setTreatment] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);
  const [day, setDay] = useState(0);
  const [booked, setBooked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2 guests");

  const d = DOSHAS[dosha];
  const p = PROGRAMMES[programme];
  const s = STAYS[stay];
  const t = TREATMENTS[treatment];
  const total = p.price + s.supplement;
  const visibleDays = DAYS.slice(0, p.daysCount);
  const safeDay = Math.min(day, visibleDays.length - 1);
  const dayData = visibleDays[safeDay];

  const onBook = (e: FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="sv" id="top">
      {/* ---- header: slim, cream, wordmark left, Reserve right ---- */}
      <header className="sv-header">
        <div className="sv-wrap sv-header-inner">
          <a className="sv-brand" href="#top" aria-label="Sattva home">
            <span className="sv-brand-leaf" aria-hidden="true">✦</span>
            <span className="sv-brand-text">SATTVA</span>
            <span className="sv-brand-sub">KERALA</span>
          </a>
          <nav className="sv-nav" aria-label="Main">
            <a href="#dosha">Dosha</a>
            <a href="#ritual">Ritual</a>
            <a href="#programmes">Programmes</a>
            <a href="#stays">Stays</a>
            <a href="#treatments">Treatments</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="sv-btn sv-btn-accent sv-header-btn" href="#book">Reserve →</a>
        </div>
      </header>

      {/* ---- hero: cream editorial, arched backwater photo, ritual ring ---- */}
      <section className="sv-hero">
        <div className="sv-wrap">
          <div className="sv-hero-grid">
            <div className="sv-hero-copy">
              <BlurReveal>
                <span className="sv-mono">(00) SATTVA — AYURVEDA &amp; DETOX RETREAT, KERALA</span>
                <h1 className="sv-hero-title">
                  Come home to <em>your body.</em>
                </h1>
                <p className="sv-hero-sub">
                  Seven slow days on the Alleppey backwaters — warm oil, warm
                  food, sunrise yoga and a ritual written for your dosha.
                  Nothing to keep up with, nothing to prove.
                </p>
                <div className="sv-hero-cta">
                  <a className="sv-btn sv-btn-accent" href="#programmes">See programmes ↓</a>
                  <a className="sv-btn sv-btn-ghost" href="#dosha">Find your dosha</a>
                </div>
                <div className="sv-hero-doshas" aria-label="The three doshas">
                  {DOSHAS.map((dh, i) => (
                    <button
                      key={dh.name}
                      type="button"
                      className={`sv-hero-dosha${dosha === i ? " on" : ""}`}
                      onClick={() => setDosha(i)}
                    >
                      <span className="sv-hero-dosha-name">{dh.name}</span>
                      <span className="sv-hero-dosha-el">{dh.element}</span>
                    </button>
                  ))}
                </div>
              </BlurReveal>
            </div>
            <BlurReveal delay={0.15}>
              <div className="sv-hero-media">
                <div className="sv-hero-arch">
                  <Image src={HERO_IMG} alt="A houseboat drifting on the Kerala backwaters at golden hour" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
                </div>
                <RitualRing />
                <div className="sv-hero-card">
                  <span className="sv-mono">NEXT GROUP</span>
                  <strong>Every Monday</strong>
                  <span>12 guests at most · From £520</span>
                </div>
              </div>
            </BlurReveal>
          </div>
          <div className="sv-hero-facts">
            <span><b>From £520</b> per person</span>
            <span><b>12 guests</b> at most</span>
            <span><b>Every Monday</b> new groups start</span>
            <span><b>Kerala, India</b> Alleppey backwaters</span>
          </div>
        </div>
      </section>

      {/* ---- ticker: sage strip, repeating ---- */}
      <div className="sv-ticker" aria-hidden="true">
        <div className="sv-ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>{t} <i>✦</i></span>
          ))}
        </div>
      </div>

      {/* ---- dosha: three natures, one detail panel ---- */}
      <section className="sv-section" id="dosha">
        <div className="sv-wrap">
          <BlurReveal>
            <span className="sv-mono">(01) KNOW YOUR NATURE</span>
            <h2>Three doshas. One of them is you.</h2>
            <p className="sv-lede">
              Ayurveda begins with constitution, not symptoms. Pick the nature
              that sounds most like you — the Vaidya confirms it in person on
              your first morning, and your whole ritual is written around it.
            </p>
          </BlurReveal>
          <div className="sv-dosha-grid" role="tablist" aria-label="Choose a dosha">
            {DOSHAS.map((dh, i) => (
              <motion.button
                key={dh.name}
                type="button"
                role="tab"
                aria-selected={dosha === i}
                className={`sv-dosha${dosha === i ? " on" : ""}`}
                onClick={() => setDosha(i)}
                whileHover={reduce ? undefined : { y: -4 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <span className="sv-dosha-sanskrit" aria-hidden="true">{dh.sanskrit}</span>
                <span className="sv-dosha-name">{dh.name}</span>
                <span className="sv-dosha-el">{dh.element}</span>
                <span className="sv-dosha-qualities">
                  {dh.qualities.map((q) => (
                    <span key={q} className="sv-chip">{q}</span>
                  ))}
                </span>
              </motion.button>
            ))}
          </div>
          <div className="sv-dosha-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={d.name}
                className="sv-dosha-detail"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="sv-dosha-detail-copy">
                  <span className="sv-mono">YOUR NATURE — {d.element.toUpperCase()}</span>
                  <h3>{d.name} — {d.focus}</h3>
                  <p>{d.text}</p>
                  <span className="sv-mono">RECOMMENDED TREATMENTS</span>
                  <span className="sv-dosha-treats">
                    {d.treatments.map((tr) => (
                      <span key={tr} className="sv-chip sv-chip-solid">{tr}</span>
                    ))}
                  </span>
                </div>
                <div className="sv-dosha-detail-side">
                  <RitualRing />
                  <p className="sv-dosha-note">
                    Your dosha is confirmed in person — this is a starting
                    point, not a diagnosis.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ---- ritual timeline: day-by-day, driven by the chosen programme ---- */}
      <section className="sv-section sv-section-soft" id="ritual">
        <div className="sv-wrap">
          <BlurReveal>
            <span className="sv-mono">(02) THE RITUAL</span>
            <h2>Seven days, one ritual.</h2>
            <p className="sv-lede">
              The days build on each other — settle, cleanse, deepen, release,
              restore, integrate, return. Pick a programme below and the
              timeline follows it: a 3-day reset shows its three days, the full
              Panchakarma shows all seven.
            </p>
          </BlurReveal>
          <div className="sv-ritual-grid">
            <div className="sv-ritual-main">
              <div className="sv-day-pills" role="tablist" aria-label="Choose a day">
                {visibleDays.map((dy, i) => (
                  <motion.button
                    key={dy.title}
                    type="button"
                    role="tab"
                    aria-selected={safeDay === i}
                    className={`sv-day-pill${safeDay === i ? " on" : ""}`}
                    onClick={() => setDay(i)}
                    whileHover={reduce ? undefined : { y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.96 }}
                  >
                    <span className="sv-day-num">Day {i + 1}</span>
                    <span className="sv-day-name">{dy.title}</span>
                  </motion.button>
                ))}
              </div>
              <div className="sv-day-track" aria-hidden="true">
                <span className="sv-day-fill" style={{ width: `${((safeDay + 1) / visibleDays.length) * 100}%` }} />
              </div>
              <div className="sv-day-panel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${p.title}-${safeDay}`}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="sv-mono">DAY {safeDay + 1} OF {visibleDays.length} — {p.title.toUpperCase()}</span>
                    <h3>{dayData.title}</h3>
                    <p className="sv-day-focus">{dayData.focus}</p>
                    <div className="sv-day-blocks">
                      {dayData.blocks.map((b, bi) => (
                        <motion.div
                          key={b.when}
                          className="sv-day-block"
                          initial={reduce ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + bi * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <span className="sv-day-when">{b.when} · {b.time}</span>
                          <p>{b.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <BlurReveal delay={0.1}>
              <div className="sv-ritual-media">
                <Image src={RITUAL_IMG} alt="Morning yoga and breathwork on the deck" fill sizes="(max-width: 900px) 100vw, 34vw" className="sv-bw" />
                <div className="sv-ritual-caption">
                  <span className="sv-mono">EVERY MORNING</span>
                  <strong>Sunrise yoga &amp; breathwork</strong>
                  <span>Slow, steady and quiet — no experience needed.</span>
                </div>
              </div>
            </BlurReveal>
          </div>
        </div>
      </section>

      {/* ---- programmes: three cards, selection carries into booking ---- */}
      <section className="sv-section" id="programmes">
        <div className="sv-wrap">
          <BlurReveal>
            <span className="sv-mono">(03) PROGRAMMES</span>
            <h2>Choose how long you stay.</h2>
            <p className="sv-lede">
              Three lengths, one ritual. The longer you stay, the deeper the
              cleanse goes — and the timeline above follows whichever you pick.
            </p>
          </BlurReveal>
          <div className="sv-prog-grid">
            {PROGRAMMES.map((pg, i) => (
              <SoftTilt key={pg.title} className={`sv-prog${programme === i ? " on" : ""}${pg.popular ? " sv-prog-pop" : ""}`}>
                {pg.popular ? <span className="sv-prog-flag">Most chosen</span> : null}
                <span className="sv-mono">{pg.days.toUpperCase()}</span>
                <h3>{pg.title}</h3>
                <p className="sv-prog-price">£{pg.price} <span>per person</span></p>
                <p>{pg.text}</p>
                <ul>
                  {pg.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <a
                  className="sv-btn sv-btn-accent sv-prog-btn"
                  href="#book"
                  onClick={() => setProgramme(i)}
                >
                  {programme === i ? "Selected ✓" : "Reserve this programme →"}
                </a>
              </SoftTilt>
            ))}
          </div>
        </div>
      </section>

      {/* ---- stays: three rooms, selection carries into booking ---- */}
      <section className="sv-section sv-section-soft" id="stays">
        <div className="sv-wrap">
          <BlurReveal>
            <span className="sv-mono">(04) STAYS</span>
            <h2>Sleep close to the water.</h2>
            <p className="sv-lede">
              Every stay includes the same ritual, the same food and the same
              quiet. The difference is how close you sleep to the backwaters.
            </p>
          </BlurReveal>
          <div className="sv-stay-grid">
            {STAYS.map((st, i) => (
              <SoftTilt key={st.title} className={`sv-stay${stay === i ? " on" : ""}`}>
                <div className="sv-stay-img">
                  <Image src={st.img} alt={st.alt} fill sizes="(max-width: 900px) 100vw, 30vw" />
                  <span className="sv-stay-tag">{st.tag}</span>
                  {stay === i ? <span className="sv-stay-chip">Selected ✓</span> : null}
                </div>
                <div className="sv-stay-body">
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                  <p className="sv-stay-price">
                    {st.supplement === 0 ? "Included" : `+ £${st.supplement} per person`}
                  </p>
                  <a
                    className="sv-btn sv-btn-accent sv-stay-btn"
                    href="#book"
                    onClick={() => setStay(i)}
                  >
                    {stay === i ? "Selected ✓" : "Reserve this stay →"}
                  </a>
                </div>
              </SoftTilt>
            ))}
          </div>
        </div>
      </section>

      {/* ---- treatments: interactive list driving a detail panel ---- */}
      <section className="sv-section" id="treatments">
        <div className="sv-wrap">
          <BlurReveal>
            <span className="sv-mono">(05) TREATMENTS</span>
            <h2>The ritual, treatment by treatment.</h2>
            <p className="sv-lede">
              Six treatments, each with its own oil, its own rhythm and its own
              dosha. Tap one to see what it does and who it is for.
            </p>
          </BlurReveal>
          <div className="sv-treat-grid">
            <div className="sv-treat-list" role="tablist" aria-label="Choose a treatment">
              {TREATMENTS.map((tr, i) => (
                <motion.button
                  key={tr.name}
                  type="button"
                  role="tab"
                  aria-selected={treatment === i}
                  className={`sv-treat${treatment === i ? " on" : ""}`}
                  onClick={() => setTreatment(i)}
                  whileHover={reduce ? undefined : { x: 4 }}
                  whileTap={reduce ? undefined : { scale: 0.99 }}
                >
                  <span className="sv-treat-name">{tr.name}</span>
                  <span className="sv-treat-time">{tr.time}</span>
                  <span className="sv-treat-arrow" aria-hidden="true">→</span>
                </motion.button>
              ))}
            </div>
            <div className="sv-treat-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.name}
                  className="sv-treat-detail"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="sv-treat-img">
                    <Image src={t.img} alt={t.alt} fill sizes="(max-width: 900px) 100vw, 40vw" />
                  </div>
                  <div className="sv-treat-copy">
                    <span className="sv-mono">{t.time.toUpperCase()} · BEST FOR {t.dosha.join(" & ").toUpperCase()}</span>
                    <h3>{t.name}</h3>
                    <p>{t.text}</p>
                    <span className="sv-treat-dosha">
                      {t.dosha.map((dh) => (
                        <span key={dh} className="sv-chip sv-chip-solid">{dh}</span>
                      ))}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ---- what's included: animated checklist + herbs image ---- */}
      <section className="sv-section sv-section-soft" id="included">
        <div className="sv-wrap sv-included-grid">
          <BlurReveal>
            <div className="sv-included-media">
              <Image src={HERBS_IMG} alt="Herbs and oils used in the treatments" fill sizes="(max-width: 900px) 100vw, 44vw" className="sv-bw" />
              <div className="sv-included-caption">
                <span className="sv-mono">FROM OUR OWN GARDEN</span>
                <strong>Herbs, oils &amp; steam</strong>
                <span>Blended on site, for your dosha, every morning.</span>
              </div>
            </div>
          </BlurReveal>
          <div>
            <BlurReveal>
              <span className="sv-mono">(06) WHAT&apos;S INCLUDED</span>
              <h2>Everything is taken care of.</h2>
              <p className="sv-lede">
                One price, no extras to think about. You arrive, we handle the
                rest — treatments, food, yoga and the boat ride included.
              </p>
            </BlurReveal>
            <ul className="sv-checks">
              {INCLUDED.map((it, i) => (
                <motion.li
                  key={it}
                  initial={reduce ? false : { opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={reduce ? undefined : { x: 4 }}
                >
                  <span className="sv-check-mark" aria-hidden="true">
                    <motion.svg viewBox="0 0 20 20" width="20" height="20" fill="none">
                      <motion.path
                        d="M4 10.5 L8.5 15 L16 5.5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: 0.18 + i * 0.07, duration: 0.45, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </span>
                  {it}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- practitioners: three, first names only ---- */}
      <section className="sv-section" id="practitioners">
        <div className="sv-wrap">
          <BlurReveal>
            <span className="sv-mono">(07) PRACTITIONERS</span>
            <h2>The hands behind the ritual.</h2>
            <p className="sv-lede">
              A small team, not a spa floor. The same three people look after
              you all week — they know your dosha, your shoulders and your
              sleep by day two.
            </p>
          </BlurReveal>
          <div className="sv-prac-grid">
            {PRACTITIONERS.map((pr, i) => (
              <motion.article
                key={pr.name}
                className="sv-prac"
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -6 }}
              >
                <div className="sv-prac-img">
                  <Image src={pr.img} alt={pr.alt} fill sizes="(max-width: 900px) 100vw, 30vw" />
                </div>
                <div className="sv-prac-body">
                  <span className="sv-mono">{pr.role.toUpperCase()}</span>
                  <h3>{pr.name}</h3>
                  <p className="sv-prac-focus">{pr.focus}</p>
                  <p>{pr.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- stats: sage band, count-up ---- */}
      <section className="sv-stats">
        <div className="sv-wrap">
          <div className="sv-stats-grid">
            {STATS.map((st, i) => (
              <motion.div
                key={st.label}
                className="sv-stat"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="sv-stat-num"><CountUp n={st.n} suffix={st.suffix} /></span>
                <span className="sv-stat-label">{st.label}</span>
              </motion.div>
            ))}
          </div>
          <p className="sv-stats-note">Placeholder figures — replace with the retreat&apos;s real numbers.</p>
        </div>
      </section>

      {/* ---- guest voices ---- */}
      <section className="sv-section" id="voices">
        <div className="sv-wrap">
          <BlurReveal>
            <span className="sv-mono">(08) GUEST VOICES</span>
            <h2>What guests say, in their own words.</h2>
          </BlurReveal>
          <div className="sv-voice-grid">
            {VOICES.map((v, i) => (
              <motion.figure
                key={v.who}
                className="sv-voice"
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -4 }}
              >
                <blockquote>&ldquo;{v.quote}&rdquo;</blockquote>
                <figcaption>— {v.who}</figcaption>
              </motion.figure>
            ))}
          </div>
          <p className="sv-voices-note">Guest words are placeholders — replace with real reviews.</p>
        </div>
      </section>

      {/* ---- FAQ: single-open accordion ---- */}
      <section className="sv-section sv-section-soft" id="faq">
        <div className="sv-wrap sv-faq-wrap">
          <BlurReveal>
            <span className="sv-mono">(09) QUESTIONS</span>
            <h2>Before you ask.</h2>
          </BlurReveal>
          <div className="sv-faq">
            {FAQS.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div key={f.q} className={`sv-faq-item${open ? " on" : ""}`}>
                  <button
                    type="button"
                    className="sv-faq-q"
                    aria-expanded={open}
                    onClick={() => setFaqOpen(open ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span className="sv-faq-icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        className="sv-faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p>{f.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- booking: form with live price summary ---- */}
      <section className="sv-section" id="book">
        <div className="sv-wrap">
          <BlurReveal>
            <span className="sv-mono">(10) BOOK</span>
            <h2>Request your stay.</h2>
            <p className="sv-lede">
              Pick a programme and a stay — the price updates as you choose.
              Send the request and we confirm within a day.
            </p>
          </BlurReveal>
          <div className="sv-book-grid">
            <div className="sv-book-media">
              <Image src={PLANTS_IMG} alt="Green leaves in the retreat garden" fill sizes="(max-width: 900px) 100vw, 40vw" />
              <div className="sv-book-caption">
                <span className="sv-mono">SATTVA · KERALA</span>
                <strong>Slow days, warm oil.</strong>
                <span>{PLACE}</span>
              </div>
            </div>
            {booked ? (
              <motion.div
                className="sv-book-done"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="sv-mono">REQUEST RECEIVED</span>
                <h3>Thank you{name ? `, ${name.split(" ")[0]}` : ""}.</h3>
                <p>
                  Your request for the <strong>{p.title}</strong>
                  {s.supplement > 0 ? ` in the ${s.title}` : ` in the ${s.title}`} is with
                  us. We will confirm within a day at {email || "your email"}.
                </p>
                <div className="sv-book-summary">
                  <div><span>Programme</span><strong>{p.title} · £{p.price}</strong></div>
                  <div><span>Stay</span><strong>{s.title} · {s.supplement === 0 ? "Included" : `+ £${s.supplement}`}</strong></div>
                  <div><span>Arrival</span><strong>{date || "To be confirmed"}</strong></div>
                  <div><span>Guests</span><strong>{guests}</strong></div>
                  <div className="sv-book-total"><span>Total</span><strong>£{total} per person</strong></div>
                </div>
                <button type="button" className="sv-btn sv-btn-ghost" onClick={() => setBooked(false)}>
                  Book another stay →
                </button>
              </motion.div>
            ) : (
              <form className="sv-form" onSubmit={onBook}>
                <label>
                  <span>Your name</span>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                </label>
                <label>
                  <span>Programme</span>
                  <select value={programme} onChange={(e) => setProgramme(Number(e.target.value))}>
                    {PROGRAMMES.map((pg, i) => (
                      <option key={pg.title} value={i}>
                        {pg.title} — £{pg.price}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Stay</span>
                  <select value={stay} onChange={(e) => setStay(Number(e.target.value))}>
                    {STAYS.map((st, i) => (
                      <option key={st.title} value={i}>
                        {st.title}{st.supplement === 0 ? " — Included" : ` — + £${st.supplement}`}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Arrival date</span>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <label>
                  <span>Guests</span>
                  <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                  </select>
                </label>
                <label className="sv-form-notes">
                  <span>Anything we should know? (optional)</span>
                  <textarea rows={3} placeholder="Dietary needs, health notes, a question…" />
                </label>
                <div className="sv-book-summary">
                  <div><span>Programme</span><strong>{p.title} · £{p.price}</strong></div>
                  <div><span>Stay</span><strong>{s.title} · {s.supplement === 0 ? "Included" : `+ £${s.supplement}`}</strong></div>
                  <div className="sv-book-total"><span>Total</span><strong>£{total} per person</strong></div>
                </div>
                <button type="submit" className="sv-btn sv-btn-accent sv-form-submit">
                  Request booking — £{total} →
                </button>
                <p className="sv-form-note">
                  No payment is taken now. We confirm availability first, then
                  send a secure payment link.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ---- footer: giant wordmark ---- */}
      <footer className="sv-footer">
        <div className="sv-wrap">
          <div className="sv-footer-top">
            <div>
              <span className="sv-mono">SATTVA — AYURVEDA &amp; DETOX RETREAT</span>
              <p className="sv-footer-line">Slow days, warm oil, backwater mornings.</p>
            </div>
            <nav aria-label="Explore">
              <a href="#dosha">Dosha</a>
              <a href="#ritual">Ritual</a>
              <a href="#programmes">Programmes</a>
              <a href="#stays">Stays</a>
              <a href="#treatments">Treatments</a>
              <a href="#faq">FAQ</a>
              <a href="#book">Book</a>
            </nav>
            <div className="sv-footer-contact">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href={`tel:${PHONE_HREF}`}>{PHONE}</a>
              <span>{PLACE}</span>
            </div>
          </div>
          <div className="sv-footer-word" aria-hidden="true">SATTVA</div>
          <p className="sv-footer-small">
            A DigitalFalconz template — placeholder details throughout. Replace
            the phone, email, prices and words with the retreat&apos;s real ones.
          </p>
        </div>
      </footer>
    </div>
  );
}
