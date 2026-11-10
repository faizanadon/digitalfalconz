"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

const PHONE = "+351 254 000 000";
const PHONE_HREF = "+351254000000";
const EMAIL = "stay@vineandstone.com";
const PLACE = "Douro Valley, Portugal";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Real vineyard photography (all verified 200). The hero rows and the
   terrace feature image are B&W for the editorial look; the cellar,
   tastings and valley stay in full colour so the place shows through. */
const HERO_IMG = U("1510812431401-41d2bd2722f3", 1800); // vineyard rows
const WINE_IMG = U("1506377247377-2a5b3b417ebb", 1000); // wine glasses
const VINE_IMG = U("1474722883778-792e7990302f", 1000); // vineyard
const POUR_IMG = U("1504279577054-acfeccf8fc52", 1000); // pouring wine
const CELLAR_IMG = U("1504274066651-8d31a536b11a", 1000); // wine cellar
const ROWS_IMG = U("1543418219-44e30b057fea", 1800); // vineyard rows

const PHASES = [
  {
    n: "01",
    title: "The Vines",
    text: "Twenty-four hectares of terraces above the Douro. The vines are tended by hand, the way they have been for generations — no machines on these slopes.",
    img: VINE_IMG,
    alt: "Vineyard terraces",
  },
  {
    n: "02",
    title: "The Cellar",
    text: "Stone walls, oak barrels and a winemaker who explains as you sip. Tastings run daily in the cellar, and there are no wrong answers.",
    img: CELLAR_IMG,
    alt: "A wine cellar",
  },
  {
    n: "03",
    title: "The Table",
    text: "Fire, olive oil and whatever the garden gives. Dinner is at 7, the terrace faces the vines, and the port comes out as the sun drops.",
    img: POUR_IMG,
    alt: "Pouring wine at the table",
  },
];

const STAYS = [
  {
    n: "01",
    title: "The Vine Room",
    text: "Two guests, a terrace over the vines and breakfast in the courtyard. The classic stay — small, warm and quiet.",
    tag: "2 GUESTS",
    price: "From €170 / night",
    img: VINE_IMG,
    alt: "Vineyard terraces",
  },
  {
    n: "02",
    title: "The Stone Suite",
    text: "Four guests, a stone-walled suite and a private terrace. The most space in the quinta, with room to spread out.",
    tag: "4 GUESTS",
    price: "From €260 / night",
    img: CELLAR_IMG,
    alt: "A wine cellar",
  },
  {
    n: "03",
    title: "The River Room",
    text: "Two guests on the river side, with dawn light over the Douro. The best wake-up in the valley.",
    tag: "2 GUESTS",
    price: "From €200 / night",
    img: POUR_IMG,
    alt: "Pouring wine at the table",
  },
  {
    n: "04",
    title: "The Family Quinta",
    text: "Six guests, two bedrooms and a full kitchen. Built for families who want the valley and a place to cook together.",
    tag: "6 GUESTS",
    price: "From €340 / night",
    img: WINE_IMG,
    alt: "Wine glasses on a table",
  },
];

const TASTINGS = [
  {
    n: "01",
    name: "The Daily Tasting",
    text: "Five wines in the cellar with the winemaker — whites, reds and a port to finish. Included in every stay.",
    tag: "DAILY · INCLUDED",
    price: "Included",
  },
  {
    n: "02",
    name: "The Vintage Tasting",
    text: "Old vintages from the cellar, poured by the winemaker. For the ones who want to taste what time does.",
    tag: "FRIDAYS · 6 WINES",
    price: "€45 / person",
  },
  {
    n: "03",
    name: "The Harvest Lunch",
    text: "A long lunch in the vines in September — fire, bread, olive oil and the new wine, straight from the press.",
    tag: "SEPTEMBER · LONG LUNCH",
    price: "€60 / person",
  },
  {
    n: "04",
    name: "Port at Sunset",
    text: "A glass of tawny port on the terrace as the sun drops behind the hills. The quietest hour of the day.",
    tag: "EVENINGS · TERRACE",
    price: "€18 / glass",
  },
];

const STATS = [
  { n: 9, suffix: "", label: "ROOMS IN THE QUINTA", caption: "Nine rooms, no crowds." },
  { n: 24, suffix: "", label: "HECTARES OF VINES", caption: "Terraces above the river." },
  { n: 48, suffix: "h", label: "BOOKING REPLY", caption: "At most — usually sooner." },
  { n: 98, suffix: "%", label: "WOULD RETURN", caption: "Guests who would come back." },
];

const ACTIVITIES = [
  { n: "01", name: "Wine tastings", text: "Daily tastings in the cellar, with the winemaker.", tags: "DAILY · CELLAR" },
  { n: "02", name: "Vineyard walks", text: "The terraces at golden hour, with a guide who knows them.", tags: "EVENINGS · GUIDED" },
  { n: "03", name: "River walks", text: "The Douro path to the village, at an easy pace.", tags: "DAILY · RIVER" },
  { n: "04", name: "Harvest days", text: "Pick grapes in September, stomp them in the evening.", tags: "SEPTEMBER · HANDS-ON" },
  { n: "05", name: "Seasonal cooking", text: "Fire, olive oil and whatever the garden gives.", tags: "EVENINGS · FOOD" },
  { n: "06", name: "Sunset terrace", text: "A glass of port as the sun drops behind the hills.", tags: "EVENINGS · PORT" },
];

const STEPS = [
  {
    n: "01",
    title: "Arrive",
    text: "Check in from 3pm. A glass of white port on arrival, bags carried, shoulders down.",
  },
  {
    n: "02",
    title: "Settle",
    text: "Your room is ready, dinner is at 7 and the terrace faces the vines. Nothing is asked of you tonight.",
  },
  {
    n: "03",
    title: "Explore",
    text: "Pick a tasting, a vineyard walk or a doing-nothing day. The cellar is open, and the valley starts at the door.",
  },
  {
    n: "04",
    title: "Depart",
    text: "Check out at 11am. Leave the valley a little lighter than you arrived.",
  },
];

const WHY = [
  { title: "Family-run, not a chain", text: "The same family has made wine here since 1998. They know the vines, the vintages and your name by day two." },
  { title: "Small on purpose", text: "Nine rooms only. No crowds, no queues, no noise — just the valley and the people who came for it." },
  { title: "Tastings included", text: "Every stay includes a daily tasting. You do not need knowledge, only a willingness to sip." },
  { title: "Honest pricing", text: "The price you see is the price you pay. No resort fees, no surprises at checkout." },
];

const TESTIMONIALS = [
  {
    name: "Marco Rossi",
    role: "Guest, Milan — The Stone Suite",
    quote:
      "We arrived tired and left rested in a way I did not think was possible in four days. The tastings were generous, the food was honest and nobody hurried us.",
  },
  {
    name: "Ingrid Johansson",
    role: "Guest, Copenhagen — The River Room",
    quote:
      "The dawn over the Douro from our terrace is the best wake-up I have ever had. We have already booked to come back for the harvest.",
  },
  {
    name: "James O'Neill",
    role: "Guest, Edinburgh — The Solo Cellar",
    quote:
      "I came alone, walked the terraces every day and drank port on the terrace every night. The Solo Cellar is exactly as described — small, quiet and perfect.",
  },
];

const FAQS = [
  {
    q: "When is the best time to visit?",
    a: "April to October for green vines and warm evenings, and September for the harvest. The quinta is closed in winter, when the vines rest.",
  },
  {
    q: "How do I get there?",
    a: "Fly to Porto, then take the train to Peso da Régua — about 2 hours — and we will collect you. Driving is also easy, with parking on site.",
  },
  {
    q: "Is the retreat suitable for children?",
    a: "Yes. The Family Quinta sleeps six and the vineyard walks include short, flat paths for younger legs. Children under 6 stay free.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 14 days before arrival. Inside 14 days we keep the first night, and the rest is refunded.",
  },
  {
    q: "Do I need to know about wine?",
    a: "No. The tastings are built for everyone — the winemaker explains as you sip, and there are no wrong answers.",
  },
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

/** Count-up intro loader (Vantrel signature) — 0 to 100, then fades out. */
function IntroLoader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + Math.ceil(Math.random() * 9) + 3);
        if (next >= 100) clearInterval(id);
        return next;
      });
    }, 90);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (pct >= 100) {
      const t = setTimeout(() => setDone(true), 350);
      return () => clearTimeout(t);
    }
  }, [pct]);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="vny-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <span className="vny-loader-word">VINE &amp; STONE</span>
          <span className="vny-loader-pct">{pct}%</span>
          <span className="vny-loader-bar"><i style={{ width: `${pct}%` }} /></span>
          <span className="vny-loader-note">POURING THE VALLEY…</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** HUD timer — seconds on site, ticking up. */
function HudTimer() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return <>{mm}:{ss}</>;
}

export default function VineyardRetreat() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [quote, setQuote] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const phasesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: phasesRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActivePhase(Math.min(PHASES.length - 1, Math.max(0, Math.floor(v * PHASES.length))));
  });

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const t = TESTIMONIALS[quote];
  const phase = PHASES[activePhase];

  return (
    <div className="vny">
      <IntroLoader />

      {/* ---- header: refined bar ---- */}
      <header className="vny-header">
        <div className="vny-wrap vny-header-inner">
          <a className="vny-brand" href="#top" aria-label="Vine and Stone home">
            <span className="vny-mark" aria-hidden="true">◆</span>
            <span className="vny-brand-text">VINE &amp; STONE</span>
          </a>
          <nav className="vny-nav" aria-label="Main">
            <a href="#story">The story</a>
            <a href="#stays">Stays</a>
            <a href="#tastings">Tastings</a>
            <a href="#stay">Your stay</a>
            <a href="#faq">FAQ</a>
          </nav>
          <span className="vny-hud">TIME ON SITE <HudTimer /></span>
        </div>
      </header>

      {/* ---- hero: cinematic, full-screen B&W image, headline overlaid ---- */}
      <section className="vny-hero" id="top">
        <div className="vny-hero-media">
          <Image src={HERO_IMG} alt="Rows of vines on a hillside" fill priority sizes="100vw" />
          <div className="vny-hero-shade" aria-hidden="true" />
        </div>
        <div className="vny-wrap vny-hero-over">
          <BlurReveal>
            <span className="vny-mono vny-mono-light">(00) VINE &amp; STONE — VINEYARD RETREAT, DOURO VALLEY</span>
            <h1>
              Drink the <em>valley.</em>
            </h1>
            <p className="vny-hero-sub">
              A vineyard retreat in the Douro Valley — tastings in the cellar,
              terraces at golden hour and slow evenings on the river. Book
              direct for the best rate.
            </p>
            <div className="vny-hero-cta">
              <a className="vny-btn vny-btn-accent vny-btn-lg" href="#story">The story ↓</a>
              <a className="vny-btn vny-btn-ghost vny-btn-lg" href="#book">Check availability</a>
            </div>
          </BlurReveal>
        </div>
        <div className="vny-hero-facts" aria-label="Key facts">
          <span><b>24 HA</b> VINES</span>
          <span><b>9</b> ROOMS</span>
          <span><b>APR–OCT</b> SEASON</span>
          <span><b>DAILY</b> TASTINGS</span>
        </div>
      </section>

      {/* ---- the story: cinematic pinned scroll section (Vantrel signature) ---- */}
      <section className="vny-story" id="story" ref={phasesRef}>
        <div className="vny-story-sticky">
          <div className="vny-phase-imgs" aria-hidden="true">
            {PHASES.map((ph, i) => (
              <motion.div
                key={ph.n}
                className="vny-phase-img"
                animate={{ opacity: i === activePhase ? 1 : 0 }}
                transition={{ duration: 0.7 }}
              >
                <Image src={ph.img} alt="" fill sizes="100vw" />
              </motion.div>
            ))}
            <div className="vny-phase-shade" aria-hidden="true" />
          </div>
          <div className="vny-wrap vny-phase-over">
            <span className="vny-mono vny-mono-light">(01) THE STORY — SCROLL</span>
            <span className="vny-phase-num" aria-hidden="true">{phase.n} / 03</span>
            <h2>{phase.title}</h2>
            <p>{phase.text}</p>
            <div className="vny-phase-dots" aria-hidden="true">
              {PHASES.map((ph, i) => (
                <span key={ph.n} className={i === activePhase ? "on" : ""} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- stays: refined 2-col card grid ---- */}
      <section className="vny-section" id="stays">
        <div className="vny-wrap">
          <BlurReveal>
            <span className="vny-mono">(02) STAYS</span>
            <h2>Four rooms, one valley.</h2>
            <p className="vny-lede">
              From a vine-facing room to a family quinta — every stay includes
              breakfast, a daily tasting and the terrace at sunset.
            </p>
          </BlurReveal>
          <div className="vny-stay-grid">
            {STAYS.map((sv, i) => (
              <Reveal key={sv.n} delay={i * 0.05}>
                <article className="vny-stay-card">
                  <div className="vny-stay-img">
                    <Image src={sv.img} alt={sv.alt} width={900} height={650} sizes="(max-width: 900px) 100vw, 45vw" />
                    <span className="vny-stay-tag">{sv.tag}</span>
                  </div>
                  <div className="vny-stay-body">
                    <span className="vny-mono">{sv.n}</span>
                    <h3>{sv.title}</h3>
                    <p>{sv.text}</p>
                    <p className="vny-stay-price">{sv.price}</p>
                    <a className="vny-link" href="#book">Check dates →</a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- tastings: the wine list ---- */}
      <section className="vny-section vny-taste-sec" id="tastings">
        <div className="vny-wrap">
          <BlurReveal>
            <span className="vny-mono">(03) TASTINGS — THE WINE LIST</span>
            <h2>What to taste.</h2>
          </BlurReveal>
          <ol className="vny-taste-list">
            {TASTINGS.map((ts) => (
              <li key={ts.n} className="vny-taste-row">
                <span className="vny-taste-n">{ts.n}</span>
                <div>
                  <h3>{ts.name}</h3>
                  <p>{ts.text}</p>
                </div>
                <span className="vny-taste-tag">{ts.tag}</span>
                <span className="vny-taste-price">{ts.price}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- count-up stats ---- */}
      <section className="vny-stats">
        <div className="vny-wrap">
          <BlurReveal>
            <span className="vny-mono">(04) THE QUINTA IN NUMBERS</span>
          </BlurReveal>
          <div className="vny-stat-row">
            {STATS.map((st) => (
              <div key={st.label} className="vny-stat">
                <span className="vny-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="vny-stat-label">{st.label}</span>
                <span className="vny-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
          <p className="vny-note">Key figures for this template — placeholder figures, replace with your own.</p>
        </div>
      </section>

      {/* ---- activities: elegant list ---- */}
      <section className="vny-section" id="activities">
        <div className="vny-wrap">
          <BlurReveal>
            <span className="vny-mono">(05) THE VALLEY</span>
            <h2>What a day looks like.</h2>
          </BlurReveal>
          <div className="vny-activities">
            {ACTIVITIES.map((ac, i) => (
              <Reveal key={ac.n} delay={i * 0.04}>
                <article className="vny-activity">
                  <span className="vny-activity-n">{ac.n}</span>
                  <h3>{ac.name}</h3>
                  <p>{ac.text}</p>
                  <span className="vny-activity-tags">{ac.tags}</span>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="vny-feature vny-bw">
            <Image src={ROWS_IMG} alt="Vineyard rows at golden hour" width={2000} height={700} sizes="100vw" />
          </div>
        </div>
      </section>

      {/* ---- your stay: steps as a numbered strip ---- */}
      <section className="vny-section vny-stay-sec" id="stay">
        <div className="vny-wrap">
          <BlurReveal>
            <span className="vny-mono">(06) YOUR STAY</span>
            <h2>From arrival to departure in four steps.</h2>
          </BlurReveal>
          <div className="vny-steps">
            {STEPS.map((st, i) => (
              <Reveal key={st.n} delay={i * 0.06}>
                <article className="vny-step">
                  <span className="vny-step-n">{st.n}</span>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="vny-why">
            {WHY.map((w) => (
              <article key={w.title} className="vny-why-item">
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- guest voices: quote carousel with prev/next ---- */}
      <section className="vny-section vny-voices-sec" id="voices">
        <div className="vny-wrap vny-voices-wrap">
          <BlurReveal>
            <span className="vny-mono">(07) GUEST VOICES</span>
          </BlurReveal>
          <div className="vny-carousel">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quote}
                className="vny-quote"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45 }}
              >
                “{t.quote}”
                <footer>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
            <div className="vny-carousel-nav">
              <button
                onClick={() => setQuote((quote - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous guest"
              >
                ←
              </button>
              <span className="vny-mono">{quote + 1} / {TESTIMONIALS.length}</span>
              <button
                onClick={() => setQuote((quote + 1) % TESTIMONIALS.length)}
                aria-label="Next guest"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="vny-section vny-faq-sec" id="faq">
        <div className="vny-wrap">
          <BlurReveal>
            <span className="vny-mono">(08) FAQ</span>
            <h2>Before you book.</h2>
            <p className="vny-lede">
              The questions every guest asks us. Anything else — call {PHONE}.
            </p>
          </BlurReveal>
          <div className="vny-faq">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`vny-faq-item${openFaq === i ? " open" : ""}`}>
                <button
                  className="vny-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className="vny-faq-plus" aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="vny-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- book: refined, two-column ---- */}
      <section className="vny-book" id="book">
        <div className="vny-wrap vny-book-inner">
          <div className="vny-book-left">
            <BlurReveal>
              <span className="vny-mono vny-mono-light">(09) BOOK YOUR STAY</span>
              <h2>Check availability for your dates.</h2>
              <p>
                Tell us when you would like to come and we will come back
                within 48 hours with availability and a price — usually much
                sooner. No obligation, no card taken.
              </p>
              <p className="vny-book-contact">
                <a href={`tel:${PHONE_HREF}`}>{PHONE}</a>
                <br />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <br />
                {PLACE}
              </p>
            </BlurReveal>
          </div>
          <Reveal>
            {sent ? (
              <div className="vny-form-ok">
                <strong>Thank you — your request is in.</strong>
                <p>
                  We have your details and will come back with availability
                  and a price, usually within one working day. If it is
                  urgent, call {PHONE}.
                </p>
              </div>
            ) : (
              <form className="vny-form" onSubmit={onBook}>
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
                  Nights
                  <select name="nights" defaultValue="4 nights">
                    <option>2 nights</option>
                    <option>3 nights</option>
                    <option>4 nights</option>
                    <option>5 nights</option>
                    <option>7 nights</option>
                    <option>Longer</option>
                  </select>
                </label>
                <label>
                  Guests
                  <select name="guests" defaultValue="2 guests">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                    <option>5 guests</option>
                    <option>6 guests</option>
                  </select>
                </label>
                <label>
                  Stay
                  <select name="stay" defaultValue="The Vine Room">
                    <option>The Vine Room</option>
                    <option>The Stone Suite</option>
                    <option>The River Room</option>
                    <option>The Family Quinta</option>
                  </select>
                </label>
                <label>
                  Tasting
                  <select name="tasting" defaultValue="The Daily Tasting">
                    <option>The Daily Tasting</option>
                    <option>The Vintage Tasting</option>
                    <option>The Harvest Lunch</option>
                    <option>Port at Sunset</option>
                  </select>
                </label>
                <label className="vny-full">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your trip, your group, or anything you need…"
                  />
                </label>
                <button className="vny-btn vny-btn-accent vny-btn-lg vny-full" type="submit">
                  Check availability
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---- footer: giant burgundy wordmark ---- */}
      <footer className="vny-footer">
        <div className="vny-wrap">
          <span className="vny-footer-word">VINE &amp; STONE</span>
          <p className="vny-footer-statement">
            A vineyard retreat in the Douro Valley — tastings in the cellar,
            terraces at golden hour and slow evenings on the river.
          </p>
          <div className="vny-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#story">The story</a></li>
                <li><a href="#stays">Stays</a></li>
                <li><a href="#tastings">Tastings</a></li>
                <li><a href="#stay">Your stay</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </nav>
            <nav aria-label="Stays">
              <h3>STAYS</h3>
              <ul>
                <li><a href="#stays">The Vine Room</a></li>
                <li><a href="#stays">The Stone Suite</a></li>
                <li><a href="#stays">The River Room</a></li>
                <li><a href="#stays">The Family Quinta</a></li>
              </ul>
            </nav>
            <div className="vny-footer-contact">
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
          <span className="vny-footer-copy">
            © 2026 Vine &amp; Stone Quinta · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
