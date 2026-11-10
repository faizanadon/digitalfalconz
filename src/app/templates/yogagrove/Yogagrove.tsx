"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

/* Yogagrove — small-group yoga, breathwork & mindful movement studio
   (Melbourne). Converted from Faizan's standalone HTML template; all
   copy, headings and placeholder contact details are his. Images live
   locally in public/templates/yogagrove/. Note: 16 of the photos are
   .jpg even though the HTML referenced them as .png. */

const PHONE = "(03) 9417 0432";
const PHONE_HREF = "+61394170432";
const EMAIL = "hello@yogagrove.studio";
const ADDRESS = "41 Gertrude Street, Fitzroy";
const PLACE = "Melbourne";

const A = (f: string) => `/templates/yogagrove/${f}`;

const HERO_IMG = A("61cc7003-269c-4b78-bcf7-36da5332e27b.jpg");
const ABOUT_IMG = A("9af6368e-33dc-4739-ac35-46fb81d7c976.jpg");
const CTA_BG = A("293bbe92-63e0-43c4-8e7b-cef34ece49cf.jpg");
const FOOTER_BG = A("5b713d96-16ba-4afc-b056-1b53bb28c9c8.jpg");
const BANNER_IMG = A("8a3dab63-efa0-4782-9dd5-6ff71982c199.jpg");
const FEATURED_IMG = A("afb9f9c5-eaa0-4391-887f-abb1d07eb922.jpg");
const LOGO = A("c7e6b861-c341-4c87-bcbc-265c12393538.svg");
const LOGO_FOOTER = A("9dd4b7cf-a1a0-4343-ad05-1837df4daf1e.svg");
const CAL_ICON = A("1cd226a7-9d13-4127-8be9-49920d094bd7.svg");
const CLOCK_ICON = A("df744fdd-b216-4af2-87f9-0a76012b50ba.svg");
const STARS = A("d4570dea-9980-48de-beb6-321e0999287f.svg");
const CHECK = A("9dbb7387-d6fc-4663-8f2e-6587372a6d2c.svg");
const CHECK_LIGHT = A("6d66e6c4-b5ca-4eda-9cf3-749558241304.svg");

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Classes", href: "#classes" },
  { label: "Method", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Teachers", href: "#teachers" },
  { label: "FAQ", href: "#faq" },
];

const CHALLENGES = [
  { icon: A("9b4e332f-fc92-4d89-a52a-5f98467f40ac.svg"), text: "Stress and tension that never quite switches off" },
  { icon: A("4c903a73-4940-4659-ac80-68031ff816da.svg"), text: "Tight hips and stiffness from sitting all day" },
  { icon: A("ff793bd6-073b-4eb5-b2aa-38cebdb7a249.svg"), text: "Low, flat energy that coffee only masks" },
  { icon: A("109a47ca-7544-4d41-a1a8-cb70aa491341.svg"), text: "Poor posture and a tight, aching back" },
  { icon: A("781f6ac3-8c39-4034-8f6e-6182e62c1299.svg"), text: "Restless sleep and a busy, racing mind" },
  { icon: A("3f978147-06c2-4ea8-be9e-796bf882ea45.svg"), text: "Feeling disconnected from your body and breath" },
];

const STEPS = [
  {
    n: "01",
    title: "Breathe",
    text: "We begin with breath and nervous-system regulation - the fastest way out of stress and into the present moment.",
    img: A("21fe2c7f-2591-4f40-be73-a0c8ed030e39.jpg"),
    alt: "Woman in prayer yoga pose",
    w: 938,
    h: 1024,
    top: 110,
  },
  {
    n: "02",
    title: "Move",
    text: "Gentle, intuitive sequences build functional strength and mobility, loosening the places where tension hides.",
    img: A("718dbd56-2798-46ca-ba82-82262215787b.jpg"),
    alt: "Woman stretching arms overhead",
    w: 966,
    h: 1024,
    top: 140,
  },
  {
    n: "03",
    title: "Rest",
    text: "Every class ends in restorative stillness - allowing your nervous system to assimilate the practice and fully reset.",
    img: A("f16c0daf-578b-4ed0-8d5d-d7fe4b7bb2c8.jpg"),
    alt: "Woman breathing during yoga",
    w: 1024,
    h: 990,
    top: 170,
  },
];

const CLASSES = [
  {
    name: "Vinyasa Flow",
    desc: "Move with the breath through a flowing, energising sequence that builds heat, strength and focus.",
    img: A("2214c180-f581-4e40-a8d0-69474c89865a.jpg"),
    alt: "Vinyasa Flow",
    w: 1760,
    h: 1328,
    freq: "5x weekly",
    dur: "60 min",
  },
  {
    name: "Gentle Hatha",
    desc: "Slow, foundational poses with mindful alignment - perfect for beginners and quiet mornings.",
    img: A("a6a35ab7-40dd-4267-b44c-2688ccce8b41.jpg"),
    alt: "Gentle Hatha",
    w: 1024,
    h: 773,
    freq: "4x weekly",
    dur: "60 min",
  },
  {
    name: "Deep Yin",
    desc: "Long, supported holds that release deep tension in the hips, spine and connective tissue.",
    img: A("76b1ce16-5285-440a-b3cb-96839696797d.jpg"),
    alt: "Deep Yin",
    w: 1024,
    h: 773,
    freq: "3x weekly",
    dur: "75 min",
  },
  {
    name: "Restore & Rest",
    desc: "Surrender into stillness with soft, supported shapes that calm the nervous system.",
    img: A("a1328a12-58ad-4aaa-84d2-a7734dc48b96.jpg"),
    alt: "Restore & Rest",
    w: 1760,
    h: 1328,
    freq: "3x weekly",
    dur: "75 min",
  },
];

const BENEFITS = [
  { icon: A("7dd85c37-153f-4584-83cd-2aa9ce74e18f.svg"), alt: "Strength", title: "Real, functional strength" },
  { icon: A("ddc73435-b500-4de8-9fc4-654f9ae6d9e7.svg"), alt: "Mind", title: "A calmer, quieter mind" },
  { icon: A("2946d5cc-dc51-4581-8bf7-80e45f2d709f.svg"), alt: "Hips", title: "Freer hips and mobility" },
  { icon: A("f70b5ffc-7215-4463-9709-668fd4d7bc8d.svg"), alt: "Sleep", title: "Deeper, more restful sleep" },
  { icon: A("c304229d-319a-448f-bd3d-431fe6845d19.svg"), alt: "Community", title: "A warm, welcoming community" },
  { icon: A("faa110f9-97f5-4bae-b2f9-0083c0667604.svg"), alt: "Confidence", title: "Confidence in your body" },
];

const TEACHERS = [
  {
    name: "Naomi",
    role: "Founder · Vinyasa & Breath",
    img: A("ac43d732-d9a4-438c-a942-c4bb1bcdd92b.jpg"),
    alt: "Naomi",
  },
  {
    name: "Claire",
    role: "Yin & Restorative",
    img: A("614dab8a-7bc6-4f35-a446-3798ca062794.jpg"),
    alt: "Claire",
  },
  {
    name: "Emma",
    role: "Hatha & Prenatal",
    img: A("c2cf9fc3-32be-4b99-b2ae-0b1152874211.jpg"),
    alt: "Emma",
  },
];

const REVIEWS = [
  {
    quote: "\u201CThe small classes make all the difference \u2014 the teacher actually adjusts you and remembers your name.\u201D",
    name: "James Miller",
    role: "Vinyasa regular",
    avatar: A("10554bc0-8561-4b8d-a9da-b6cbe7a5f0bd.png"),
  },
  {
    quote: "\u201CI hadn't moved in years and never felt judged once. Three months in, my back pain is basically gone.\u201D",
    name: "Sarah Collins",
    role: "Beginner",
    avatar: A("4c495ea2-f861-4225-bf9f-96030f3b0d93.png"),
  },
  {
    quote: "\u201CEven the online classes feel personal \u2014 the streaming setup is genuinely well thought through.\u201D",
    name: "Daniel Hughes",
    role: "Online member",
    avatar: A("367f99e8-570b-4290-b84b-fccd4acc3961.png"),
  },
];

const PRICING = [
  {
    name: "Drop-in",
    sub: "Perfect for trying us out",
    price: "22",
    period: "/class",
    featured: false,
    check: CHECK,
    features: [
      "Any single class",
      "All levels welcome",
      "Book online in seconds",
      "Mat & props included",
      "No commitment",
    ],
  },
  {
    name: "Membership",
    sub: "Our most popular",
    price: "95",
    period: "/month",
    featured: true,
    check: CHECK_LIGHT,
    features: [
      "Unlimited studio classes",
      "Free online class library",
      "Priority class booking",
      "Bring-a-friend passes",
      "10% off workshops & events",
    ],
  },
  {
    name: "10-Class Pack",
    sub: "Flexible multi-pass",
    price: "190",
    period: "/10 classes",
    featured: false,
    check: CHECK,
    features: [
      "Ten classes, use anytime",
      "Valid for four months",
      "All levels welcome",
      "Online or in-person",
      "Share with a friend",
    ],
  },
];

const FAQS = [
  {
    q: "Who are your classes for?",
    a: "Everyone \u2014 complete beginners, busy parents, people returning after injury, and seasoned practitioners. Every class is small and adapted to who is in the room.",
  },
  {
    q: "Do I need any experience or flexibility?",
    a: "Not at all. You do not need to be flexible to start yoga \u2014 just like you do not need to know how to play the piano before taking your first lesson. Our teachers provide variations, props, and gentle guidance to meet your body where it is today.",
  },
  {
    q: "What should I bring to my first class?",
    a: "Just wear comfortable clothes you can move and breathe easily in. We provide complimentary premium non-slip yoga mats, cork blocks, bolsters, and organic cotton blankets at the studio. Filtered water and warm herbal tea are always ready for you.",
  },
  {
    q: "Can I practise online?",
    a: "Yes! We livestream all our daily classes with dedicated high-definition audio and mindful camera angles so you can follow along seamlessly from the comfort of home. Full on-demand replays are accessible with our membership.",
  },
  {
    q: "What is your cancellation policy?",
    a: "You can easily cancel or reschedule any class booking up to 2 hours before the start time without penalty via our app or website. Drop-in credits are returned to your account instantly to use whenever you are ready.",
  },
  {
    q: "Do you offer private or prenatal sessions?",
    a: "Yes, our teachers offer both one-on-one tailored private sessions and specialized prenatal / postnatal series. Feel free to contact our studio team directly at hello@yogagrove.studio to discuss your goals and schedule.",
  },
];

const SOCIALS = [
  { label: "Instagram", icon: A("900a63d5-1e54-4a91-9db1-9bc37f3eb9bd.svg") },
  { label: "Facebook", icon: A("73d9eab1-e34e-43d5-a8bf-fa782ecf1753.svg") },
  { label: "TikTok", icon: A("cadc8e48-6cd7-4e23-9258-f7a50fb67d64.svg") },
  { label: "WhatsApp", icon: A("7317448c-d0a7-4925-b6b4-6bde80a53c62.svg") },
];

/** Blur-to-sharp reveal — the signature Framer heading entrance. */
function BlurReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, filter: "blur(10px)", y: 18 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.21, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Yogagrove() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeDot, setActiveDot] = useState(4);
  const heroBgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setShowTop(y > 500);
      const img = heroBgRef.current;
      if (img && y < window.innerHeight) {
        img.style.transform = `scale(1.05) translateY(${y * 0.22}px)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="yg">
      {/* ---- navbar: fixed, transparent over the hero, solid on scroll ---- */}
      <header className={`yg-navbar${scrolled ? " scrolled" : ""}`} id="navbar">
        <div className="yg-container yg-nav-inner">
          <a href="#" className="yg-nav-logo">
            <span className="yg-nav-logo-icon">
              <img src={LOGO} alt="Lotus Logo" width={26} height={26} />
            </span>
            <span>Yogagrove</span>
          </a>

          <nav className={`yg-nav-menu${menuOpen ? " open" : ""}`} id="navMenu" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="yg-nav-link" onClick={closeMenu}>
                <span className="yg-nav-link-track">
                  <span className="yg-nav-link-text">{l.label}</span>
                  <span className="yg-nav-link-text">{l.label}</span>
                </span>
              </a>
            ))}
          </nav>

          <div className="yg-nav-right">
            <a href="#pricing" className="yg-nav-cta">
              <span>Book a Class</span>
              <span className="yg-nav-cta-arrow">
                <ArrowIcon />
              </span>
            </a>
            <button
              className="yg-menu-toggle"
              id="menuToggle"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ---- hero ---- */}
        <section className="yg-hero-section" id="hero">
          <Image
            ref={heroBgRef}
            src={HERO_IMG}
            alt="Yoga meditation"
            fill
            priority
            sizes="100vw"
            className="yg-hero-bg"
          />
          <div className="yg-hero-veil-top" aria-hidden="true" />
          <div className="yg-hero-scrim" aria-hidden="true" />
          <div className="yg-container">
            <div className="yg-hero-content">
              <BlurReveal>
                <span className="yg-eyebrow-pill pill-light">
                  <span className="yg-eyebrow-dot" />
                  <span>Yoga · Breathwork · Meditation</span>
                </span>
                <h1 className="yg-hero-title">
                  Find ease in
                  <br />
                  every breath.
                </h1>
                <p className="yg-hero-subtext">
                  Small-group yoga and mindful movement for every body,
                  in-studio or at home.
                </p>
                <div className="yg-hero-cta-row">
                  <a href="#pricing" className="yg-btn-primary">
                    <span>Book a free class</span>
                    <span className="yg-btn-arrow">
                      <ArrowIcon />
                    </span>
                  </a>
                  <a href="#classes" className="yg-btn-outline-white">
                    <span>See the schedule</span>
                  </a>
                </div>
              </BlurReveal>
            </div>
          </div>
        </section>

        {/* ---- challenges: "Is this you?" ---- */}
        <section className="yg-challenges-section" id="challenges">
          <div className="yg-container">
            <Reveal>
              <div className="yg-section-header">
                <span className="yg-eyebrow-pill">
                  <span className="yg-eyebrow-dot" />
                  <span>Is this you?</span>
                </span>
                <h2 className="yg-section-title">
                  The tension you have been
                  <br />
                  told to simply live with.
                </h2>
                <p className="yg-section-subtext" style={{ marginTop: 14 }}>
                  Most of us carry the whole day in our bodies. If any of
                  these feel familiar, your practice can meet you exactly there.
                </p>
              </div>
            </Reveal>
            <div className="yg-challenges-grid">
              {CHALLENGES.map((c, i) => (
                <Reveal key={c.text} delay={(i + 1) * 0.1}>
                  <div className="yg-challenge-card">
                    <span className="yg-challenge-icon-box">
                      <img src={c.icon} alt="Icon" width={22} height={22} />
                    </span>
                    <span className="yg-challenge-text">{c.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- about ---- */}
        <section className="yg-about-section" id="about">
          <div className="yg-container">
            <div className="yg-about-grid">
              <Reveal>
                <div className="yg-about-image-wrapper">
                  <Image
                    src={ABOUT_IMG}
                    alt="Sukha's founder seated in the studio in warm morning light"
                    width={928}
                    height={1152}
                    sizes="(max-width: 992px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="yg-about-content">
                  <span className="yg-eyebrow-pill">
                    <span className="yg-eyebrow-dot" />
                    <span>About Yogagrove</span>
                  </span>
                  <h2 className="yg-section-title">
                    A calm place to come home to yourself.
                  </h2>
                  <p className="yg-about-body">
                    Yogagrove grew from a small home practice into a studio
                    built on one belief - that yoga should feel like ease, not
                    another thing to achieve. Whether you are new to the mat
                    or returning after years away, you are welcome exactly as
                    you are.
                  </p>
                  <div className="yg-about-stats" id="statsBar">
                    <div>
                      <span className="yg-stat-number">
                        <AnimatedCounter value={12} suffix="+" />
                      </span>
                      <span className="yg-stat-label">Years of practice</span>
                    </div>
                    <div>
                      <span className="yg-stat-number">
                        <AnimatedCounter value={8} />
                      </span>
                      <span className="yg-stat-label">Students per class</span>
                    </div>
                    <div>
                      <span className="yg-stat-number">
                        <AnimatedCounter value={300} suffix="+" />
                      </span>
                      <span className="yg-stat-label">Members guided</span>
                    </div>
                  </div>
                  <a href="#stories" className="yg-btn-outline">
                    <span>Read our story</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- how it works: sticky left + stacking cards ---- */}
        <section className="yg-how-it-works-section" id="how-it-works">
          <div className="yg-container">
            <div className="yg-hiw-layout">
              <Reveal>
                <div className="yg-hiw-sticky-left">
                  <span className="yg-eyebrow-pill">
                    <span className="yg-eyebrow-dot" />
                    <span>The Yogagrove Method</span>
                  </span>
                  <h2 className="yg-section-title">
                    A simple path
                    <br />
                    back to yourself.
                  </h2>
                  <p className="yg-section-subtext">
                    Every class moves through the same gentle arc - no rush, no
                    performance. Just three simple movements that guide your
                    body home.
                  </p>
                  <a href="#pricing" className="yg-btn-dark" style={{ marginTop: 8 }}>
                    <span>Book a class</span>
                    <span className="yg-btn-arrow">
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </Reveal>
              <div className="yg-hiw-cards-stack">
                {STEPS.map((s) => (
                  <article
                    key={s.n}
                    className="yg-hiw-card"
                    style={{ top: `${s.top}px` }}
                  >
                    <Image
                      src={s.img}
                      alt={s.alt}
                      width={s.w}
                      height={s.h}
                      sizes="(max-width: 992px) 100vw, 55vw"
                      className="yg-hiw-card-bg"
                    />
                    <div className="yg-hiw-card-overlay" aria-hidden="true" />
                    <div className="yg-hiw-card-top">
                      <span className="yg-hiw-badge-num">{s.n}</span>
                    </div>
                    <div className="yg-hiw-card-bottom">
                      <h3 className="yg-hiw-card-title">{s.title}</h3>
                      <p className="yg-hiw-card-desc">{s.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- classes ---- */}
        <section className="yg-classes-section" id="classes">
          <div className="yg-container">
            <Reveal>
              <div className="yg-classes-header-row">
                <div>
                  <span className="yg-eyebrow-pill" style={{ background: "#fff" }}>
                    <span className="yg-eyebrow-dot" />
                    <span>Classes</span>
                  </span>
                  <h2 className="yg-section-title">
                    Unlock balance through
                    <br />
                    our daily yoga classes
                  </h2>
                </div>
                <a href="#pricing" className="yg-btn-dark">
                  <span>Book a session</span>
                  <span className="yg-btn-arrow">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </Reveal>
            <div className="yg-classes-grid">
              {CLASSES.map((c, i) => (
                <Reveal key={c.name} delay={(i + 1) * 0.1}>
                  <article className="yg-class-card">
                    <Image
                      src={c.img}
                      alt={c.alt}
                      width={c.w}
                      height={c.h}
                      sizes="(max-width: 850px) 100vw, 50vw"
                      className="yg-class-card-bg"
                    />
                    <div className="yg-class-card-gradient" aria-hidden="true" />
                    <div className="yg-class-tags">
                      <span className="yg-glass-tag">
                        <img src={CAL_ICON} alt="Calendar" width={14} height={14} />
                        <span>{c.freq}</span>
                      </span>
                      <span className="yg-glass-tag">
                        <img src={CLOCK_ICON} alt="Clock" width={14} height={14} />
                        <span>{c.dur}</span>
                      </span>
                    </div>
                    <div className="yg-class-info">
                      <h3 className="yg-class-name">{c.name}</h3>
                      <p className="yg-class-desc">{c.desc}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- benefits ---- */}
        <section className="yg-benefits-section" id="benefits">
          <div className="yg-container">
            <Reveal>
              <div className="yg-section-header">
                <span className="yg-eyebrow-pill">
                  <span className="yg-eyebrow-dot" />
                  <span>Benefits</span>
                </span>
                <h2 className="yg-section-title">
                  How mindful movement changes
                  <br />
                  everything for you
                </h2>
              </div>
            </Reveal>
            <div className="yg-benefits-grid">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={(i + 1) * 0.1}>
                  <div className="yg-benefit-tile">
                    <span className="yg-benefit-icon-chip">
                      <img src={b.icon} alt={b.alt} width={22} height={22} />
                    </span>
                    <span className="yg-benefit-title">{b.title}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="yg-benefits-banner">
                <Image
                  src={BANNER_IMG}
                  alt="Mindful studio practice"
                  width={1328}
                  height={1760}
                  sizes="(max-width: 900px) 100vw, 90vw"
                  className="yg-benefits-banner-img"
                />
                <div className="yg-benefits-dots" role="tablist" aria-label="Benefits banner">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <button
                      key={i}
                      type="button"
                      className={`yg-b-dot${activeDot === i ? " active" : ""}`}
                      aria-label={`Banner image ${i + 1}`}
                      aria-selected={activeDot === i}
                      onClick={() => setActiveDot(i)}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- teachers ---- */}
        <section className="yg-team-section" id="teachers">
          <div className="yg-container">
            <Reveal>
              <div className="yg-section-header">
                <span className="yg-eyebrow-pill">
                  <span className="yg-eyebrow-dot" />
                  <span>Your teachers</span>
                </span>
                <h2 className="yg-section-title">
                  Meet the ones who
                  <br />
                  will guide you.
                </h2>
                <p className="yg-section-subtext" style={{ marginTop: 14 }}>
                  A small, senior team - every class is led by an experienced
                  teacher who genuinely knows your name and your practice.
                </p>
              </div>
            </Reveal>
            <div className="yg-team-grid">
              {TEACHERS.map((t, i) => (
                <Reveal key={t.name} delay={(i + 1) * 0.1}>
                  <article className="yg-team-card">
                    <Image
                      src={t.img}
                      alt={t.alt}
                      width={928}
                      height={1152}
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="yg-team-card-img"
                    />
                    <div className="yg-team-card-content">
                      <h3 className="yg-team-name">{t.name}</h3>
                      <span className="yg-team-role">{t.role}</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <a href="#about" className="yg-btn-outline">
                  <span>Meet the full team</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- client stories ---- */}
        <section className="yg-client-story-section" id="stories">
          <div className="yg-container">
            <Reveal>
              <div className="yg-section-header">
                <span className="yg-eyebrow-pill">
                  <span className="yg-eyebrow-dot" />
                  <span>Kind words</span>
                </span>
                <h2 className="yg-section-title">
                  Loved by people who keep showing up.
                </h2>
                <p className="yg-section-subtext" style={{ marginTop: 14 }}>
                  A few honest words from the people who practise with us -
                  beginners, parents-to-be and long-time regulars alike.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="yg-featured-testimonial">
                <Image
                  src={FEATURED_IMG}
                  alt="Smiling student"
                  width={680}
                  height={551}
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className="yg-featured-test-img"
                />
                <div>
                  <p className="yg-featured-quote">
                    &ldquo;I came for the flexibility and stayed for the calm -
                    it&rsquo;s the one hour a week I now never miss.&rdquo;
                  </p>
                  <div className="yg-featured-author">Thomas Ward</div>
                  <div className="yg-featured-title">Member since 2023</div>
                </div>
              </div>
            </Reveal>
            <div className="yg-reviews-grid">
              {REVIEWS.map((r, i) => (
                <Reveal key={r.name} delay={(i + 1) * 0.1}>
                  <article className="yg-review-card">
                    <div>
                      <img
                        src={STARS}
                        alt="5 Stars"
                        width={102}
                        height={18}
                        className="yg-review-stars"
                      />
                      <p className="yg-review-quote">{r.quote}</p>
                    </div>
                    <div className="yg-review-author-row">
                      <Image
                        src={r.avatar}
                        alt={r.name}
                        width={84}
                        height={84}
                        className="yg-review-avatar"
                      />
                      <div>
                        <div className="yg-review-author-name">{r.name}</div>
                        <div className="yg-review-author-role">{r.role}</div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- pricing ---- */}
        <section className="yg-pricing-section" id="pricing">
          <div className="yg-container">
            <Reveal>
              <div className="yg-section-header">
                <span className="yg-eyebrow-pill">
                  <span className="yg-eyebrow-dot" />
                  <span>Pricing</span>
                </span>
                <h2 className="yg-section-title">
                  Simple pricing, no lock-in.
                </h2>
                <p className="yg-section-subtext" style={{ marginTop: 14 }}>
                  Drop in whenever suits you, or join as a member and save.
                  Cancel any time - no long contracts, ever.
                </p>
              </div>
            </Reveal>
            <div className="yg-pricing-grid">
              {PRICING.map((p, i) => (
                <Reveal key={p.name} delay={(i + 1) * 0.1}>
                  <article className={`yg-pricing-card${p.featured ? " featured" : ""}`}>
                    <div>
                      <div className="yg-tier-header">
                        <h3 className="yg-tier-name">{p.name}</h3>
                        <span className="yg-tier-subtext">{p.sub}</span>
                      </div>
                      <div className="yg-tier-price-row">
                        <span className="yg-price-currency">$</span>
                        <span className="yg-price-value">{p.price}</span>
                        <span className="yg-price-period">{p.period}</span>
                      </div>
                      <button type="button" className="yg-btn-plan">
                        Select Plan
                      </button>
                      <ul className="yg-tier-features">
                        {p.features.map((f) => (
                          <li key={f}>
                            <img
                              src={p.check}
                              alt="Check"
                              width={20}
                              height={20}
                              className="yg-feature-check"
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="yg-faq-section" id="faq">
          <div className="yg-container">
            <Reveal>
              <div className="yg-section-header">
                <span className="yg-eyebrow-pill">
                  <span className="yg-eyebrow-dot" />
                  <span>FAQ</span>
                </span>
                <h2 className="yg-section-title">Questions, answered.</h2>
                <p className="yg-section-subtext" style={{ marginTop: 14 }}>
                  Everything you might want to know before your first class.
                  Still curious? Just reach out.
                </p>
              </div>
            </Reveal>
            <div className="yg-faq-list">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={(i + 1) * 0.1}>
                  <div className={`yg-faq-item${openFaq === i ? " open" : ""}`}>
                    <button
                      type="button"
                      className="yg-faq-question"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span>{f.q}</span>
                      <span className="yg-faq-icon-indicator" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    <div className="yg-faq-answer">
                      <p className="yg-faq-answer-inner">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA (id="book") ---- */}
        <section className="yg-cta-section" id="book">
          <div className="yg-container">
            <Reveal>
              <div className="yg-cta-banner">
                <Image
                  src={CTA_BG}
                  alt="Peaceful yoga space"
                  width={1829}
                  height={860}
                  sizes="100vw"
                  className="yg-cta-bg"
                />
                <div className="yg-cta-overlay" aria-hidden="true" />
                <div className="yg-cta-content">
                  <span className="yg-eyebrow-pill pill-light">
                    <span className="yg-eyebrow-dot" />
                    <span>Begin today</span>
                  </span>
                  <h2 className="yg-cta-title">
                    Your first
                    <br />
                    class is on us.
                  </h2>
                  <p className="yg-cta-subtext">
                    Come as you are. Book a spot, roll out a mat, and see how
                    you feel after just one hour with us.
                  </p>
                  <a
                    href="#pricing"
                    className="yg-btn-primary"
                    style={{ marginTop: 10 }}
                  >
                    <span>Book a class</span>
                    <span className="yg-btn-arrow">
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---- footer ---- */}
      <footer className="yg-footer">
        <Image
          src={FOOTER_BG}
          alt="Footer foliage"
          width={1648}
          height={1200}
          sizes="100vw"
          className="yg-footer-bg"
        />
        <div className="yg-container yg-footer-inner">
          <div className="yg-footer-top">
            <div>
              <a href="#" className="yg-nav-logo" style={{ color: "#f8f4ec" }}>
                <span className="yg-nav-logo-icon">
                  <img src={LOGO_FOOTER} alt="Logo" width={26} height={26} />
                </span>
                <span>Yogagrove</span>
              </a>
              <p className="yg-footer-brand-desc">
                Small-group yoga and mindful movement - in the studio or
                streamed gently to your home.
              </p>
              <div className="yg-footer-social-row">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    className="yg-social-btn"
                    aria-label={s.label}
                  >
                    <img src={s.icon} alt={s.label} width={20} height={20} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="yg-footer-col-title">Explore</h3>
              <ul className="yg-footer-links">
                <li><a href="#about" className="yg-footer-link">About</a></li>
                <li><a href="#classes" className="yg-footer-link">Classes</a></li>
                <li><a href="#how-it-works" className="yg-footer-link">Schedule</a></li>
                <li><a href="#pricing" className="yg-footer-link">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="yg-footer-col-title">Studio</h3>
              <ul className="yg-footer-links">
                <li><a href="#about" className="yg-footer-link">Our Story</a></li>
                <li><a href="#teachers" className="yg-footer-link">Our Teachers</a></li>
                <li><a href="#stories" className="yg-footer-link">Journal</a></li>
                <li><a href="#faq" className="yg-footer-link">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="yg-footer-col-title">Visit Us</h3>
              <div className="yg-footer-contact-item">
                <a href="https://maps.google.com" target="_blank" rel="noopener">
                  &rarr; {ADDRESS}
                </a>
              </div>
              <div className="yg-footer-contact-item">
                <a href={`tel:${PHONE_HREF}`}>&rarr; {PHONE}</a>
              </div>
              <div className="yg-footer-contact-item">
                <a href={`mailto:${EMAIL}`}>&rarr; {EMAIL}</a>
              </div>
              <div
                className="yg-footer-contact-item"
                style={{ color: "rgba(240, 235, 224, 0.55)", marginTop: 14 }}
              >
                Mon&ndash;Fri 6am&ndash;9pm
                <br />
                Sat&ndash;Sun 7am&ndash;5pm
              </div>
            </div>
          </div>
          <div className="yg-footer-wordmark" aria-hidden="true">yogagrove</div>
          <div className="yg-footer-divider" />
          <div className="yg-footer-bottom-row">
            <span>&copy; 2026 Yogagrove Studio. All rights reserved.</span>
            <span>
              <a href="#">Privacy Policy</a>
            </span>
          </div>
        </div>
      </footer>

      {/* ---- back to top ---- */}
      <button
        type="button"
        className={`yg-back-to-top${showTop ? " visible" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Top</span>
      </button>
    </div>
  );
}
