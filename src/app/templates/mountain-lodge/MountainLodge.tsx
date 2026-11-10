"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

const PHONE = "+41 27 000 00 00";
const PHONE_HREF = "+41270000000";
const EMAIL = "stay@alderandpine.ch";
const PLACE = "Zermatt, Swiss Alps";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Real alpine photography (all verified 200). The hero and the night
   feature image are B&W for the editorial look; the rooms, activities
   and setting stay in full colour so the place shows through. */
const HERO_IMG = U("1506905925346-21bda4d32df4", 1800); // mountain landscape
const CABIN_IMG = U("1510798831971-661eb04b3739", 1000); // snow cabin
const LAKE_CABIN_IMG = U("1470770841072-f978cf4d019e", 1000); // cabin by a lake
const HIKE_IMG = U("1465056836041-7f43ac27dcb5", 1000); // mountain hiking
const TRAIL_IMG = U("1551632811-561732d1e306", 1000); // hiking trail
const NIGHT_IMG = U("1519681393784-d120267933ba", 1800); // mountain stars at night
const LAKE_IMG = U("1501785888041-af3ef285b470", 1200); // mountain lake

const TICKER_A = ["ALPINE CABINS", "GUIDED HIKES", "LAKE SWIMS", "FIRESIDE EVENINGS"];
const TICKER_B = ["SLOW MORNINGS", "BOOK DIRECT", "1,620 M", "FAMILY-RUN SINCE 2012"];

const LEVELS = [
  {
    n: "00",
    title: "Arrive",
    text: "Check in from 3pm. Tea on arrival, boots off, shoulders down. The mountain does the rest.",
    img: CABIN_IMG,
    alt: "A wooden cabin in the snow",
  },
  {
    n: "01",
    title: "Settle",
    text: "Your cabin is ready, the stove is lit and dinner is at 7. Nothing is asked of you tonight.",
    img: LAKE_CABIN_IMG,
    alt: "A cabin beside a mountain lake",
  },
  {
    n: "02",
    title: "Explore",
    text: "Pick a hike, a lake or a doing-nothing day. Guides are on hand, and the trails start at the door.",
    img: HIKE_IMG,
    alt: "Hikers on a mountain trail",
  },
  {
    n: "03",
    title: "Unwind",
    text: "Fireside evenings, stargazing and slow mornings. Leave the mountain a little lighter than you arrived.",
    img: NIGHT_IMG,
    alt: "Stars over a mountain ridge at night",
    bw: true,
  },
];

const STAYS = [
  {
    n: "01",
    title: "The Pine Cabin",
    text: "Two guests, a wood stove and a lake view. The classic cabin — small, warm and quiet, with a deck for slow mornings.",
    tag: "2 GUESTS",
    price: "From CHF 180 / night",
    img: CABIN_IMG,
    alt: "A wooden cabin in the snow",
  },
  {
    n: "02",
    title: "The Alder Suite",
    text: "Four guests, a wraparound deck and a deep bath. The most space in the lodge, with room to spread out after a long hike.",
    tag: "4 GUESTS",
    price: "From CHF 260 / night",
    img: LAKE_CABIN_IMG,
    alt: "A cabin beside a mountain lake",
  },
  {
    n: "03",
    title: "The Summit Room",
    text: "Two guests on the top floor, with dawn light over the valley. The best wake-up in the building.",
    tag: "2 GUESTS",
    price: "From CHF 210 / night",
    img: TRAIL_IMG,
    alt: "A trail through alpine meadow",
  },
  {
    n: "04",
    title: "The Family Lodge",
    text: "Six guests, two bedrooms and a full kitchen. Built for families who want the mountain and a place to cook together.",
    tag: "6 GUESTS",
    price: "From CHF 340 / night",
    img: LAKE_IMG,
    alt: "A still mountain lake in the morning",
  },
];

const STATS = [
  { n: 12, suffix: "", label: "CABINS AND ROOMS", caption: "Twelve cabins, no crowds." },
  { n: 26, suffix: "", label: "GUIDED TRAILS", caption: "Marked trails from the door." },
  { n: 48, suffix: "h", label: "BOOKING REPLY", caption: "At most — usually sooner." },
  { n: 98, suffix: "%", label: "WOULD RETURN", caption: "Guests who would come back." },
];

const ACTIVITIES = [
  { n: "01", name: "Guided hikes", text: "Marked trails from the door, with a guide who knows them.", tags: ["DAILY", "ALL LEVELS"] },
  { n: "02", name: "Lake swims", text: "Cold, clear water at 1,800 m. Towels and tea after.", tags: ["SUMMER", "COLD WATER"] },
  { n: "03", name: "Fireside evenings", text: "Wood stove, stories, no screens after dark.", tags: ["EVENINGS", "FIRE"] },
  { n: "04", name: "Sunrise summit", text: "An early start for the best light in the valley.", tags: ["DAWN", "GUIDED"] },
  { n: "05", name: "Foraging walk", text: "Mushrooms, herbs and berries with a local guide.", tags: ["SEASONAL", "GUIDED"] },
  { n: "06", name: "Stargazing", text: "No light pollution. The Milky Way, every clear night.", tags: ["NIGHT", "CLEAR SKIES"] },
];

const WHY = [
  { title: "Family-run, not a chain", text: "The same family has run the lodge since 2012. They know the trails, the weather and your name by day two." },
  { title: "Small on purpose", text: "Twelve cabins only. No crowds, no queues, no noise — just the mountain and the people who came for it." },
  { title: "Guides included", text: "Every stay includes guided hikes. You do not need experience, only boots and a willingness to walk." },
  { title: "Honest pricing", text: "The price you see is the price you pay. No resort fees, no surprises at checkout." },
];

const TESTIMONIALS = [
  {
    name: "Sara Lindqvist",
    role: "Guest, Stockholm — The Pine Cabin",
    quote:
      "We arrived tired and left rested in a way I did not think was possible in four days. The cabin was warm, the hikes were honest, and nobody hurried us at any point.",
  },
  {
    name: "Tom Becker",
    role: "Guest, Munich — The Family Lodge",
    quote:
      "The kids still talk about the lake swim and the fireside evenings. It is the first holiday where the whole family actually slowed down.",
  },
  {
    name: "Amelia Hart",
    role: "Guest, London — The Solo Nook",
    quote:
      "I came alone, walked every day and read by the stove every night. Small, quiet and perfect.",
  },
];

const FAQS = [
  {
    q: "When is the best time to visit?",
    a: "June to September for hiking and lake swims, and December to March for snow and fireside evenings. The lodge is closed in the shoulder months, when the mountain rests.",
  },
  {
    q: "How do I get there?",
    a: "Take the train to Zermatt, then the lodge shuttle from the station — it runs twice a day and takes about 25 minutes. There are no cars in Zermatt, which is part of the point.",
  },
  {
    q: "Is the lodge suitable for children?",
    a: "Yes. The Family Lodge sleeps six and the trails from the door include short, flat walks for younger legs. Children under 6 stay free.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 14 days before arrival. Inside 14 days we keep the first night, and the rest is refunded.",
  },
  {
    q: "Do I need hiking experience?",
    a: "No. Guided hikes run daily at three levels — gentle, moderate and full-day — and every guest chooses on the morning. Boots can be hired at the lodge.",
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

export default function MountainLodge() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [activeLevel, setActiveLevel] = useState(0);
  const levelsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: levelsRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveLevel(Math.min(LEVELS.length - 1, Math.max(0, Math.floor(v * LEVELS.length))));
  });

  /* Stays: scroll-driven horizontal strip. The section is tall (100vh +
     the strip's overflow width); while it is pinned, scrolling down
     slides the cabins across, then the page moves to the next section. */
  const staysWrapRef = useRef<HTMLElement | null>(null);
  const staysStripRef = useRef<HTMLDivElement | null>(null);
  const [staysRange, setStaysRange] = useState(0);
  useEffect(() => {
    const measure = () => {
      const strip = staysStripRef.current;
      if (!strip || !strip.parentElement) return;
      setStaysRange(Math.max(0, strip.scrollWidth - strip.parentElement.clientWidth));
    };
    measure();
    const t = setTimeout(measure, 700);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);
  const { scrollYProgress: staysProgress } = useScroll({
    target: staysWrapRef,
    offset: ["start start", "end end"],
  });
  const staysX = useTransform(staysProgress, [0, 1], [0, -staysRange]);

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const level = LEVELS[activeLevel];

  return (
    <div className="mtl">
      {/* ---- header: full-width bar, bottom border (not a floating pill) ---- */}
      <header className="mtl-header">
        <div className="mtl-wrap mtl-header-inner">
          <a className="mtl-brand" href="#top" aria-label="Alder and Pine home">
            <span className="mtl-mark" aria-hidden="true">▲</span>
            <span className="mtl-brand-text">ALDER &amp; PINE</span>
          </a>
          <nav className="mtl-nav" aria-label="Main">
            <a href="#levels">The journey</a>
            <a href="#stays">Stays</a>
            <a href="#activities">Activities</a>
            <a href="#voices">Guests</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="mtl-btn mtl-btn-accent" href="#book">
            Check availability
          </a>
        </div>
      </header>

      {/* ---- hero: full-bleed B&W photo, headline overlaid on the image ---- */}
      <section className="mtl-hero" id="top">
        <div className="mtl-hero-media">
          <Image src={HERO_IMG} alt="A mountain range above the clouds" fill priority sizes="100vw" />
          <div className="mtl-hero-shade" aria-hidden="true" />
        </div>
        <div className="mtl-wrap mtl-hero-over">
          <BlurReveal>
            <span className="mtl-mono mtl-mono-light">(00) ALDER &amp; PINE — MOUNTAIN LODGE, ZERMATT</span>
            <h1>
              Stay wild.
              <br />
              <em>Stay warm.</em>
            </h1>
            <p className="mtl-hero-sub">
              Alpine cabins above Zermatt — guided hikes, lake swims, fireside
              evenings and slow mornings. Book direct for the best rate.
            </p>
            <div className="mtl-hero-cta">
              <a className="mtl-btn mtl-btn-accent mtl-btn-lg" href="#book">
                Check availability →
              </a>
              <a className="mtl-btn mtl-btn-ghost mtl-btn-lg" href="#levels">
                The journey ↓
              </a>
            </div>
          </BlurReveal>
        </div>
        <div className="mtl-hero-facts" aria-label="Key facts">
          <span><b>1,620 M</b> ALTITUDE</span>
          <span><b>12</b> CABINS</span>
          <span><b>JUN–SEP · DEC–MAR</b> SEASON</span>
          <span><b>48H</b> BOOKING REPLY</span>
        </div>
      </section>

      {/* ---- crossing diagonal marquee tapes (Raw Structure signature) ---- */}
      <div className="mtl-tapes" aria-hidden="true">
        <div className="mtl-tape mtl-tape-a">
          <div className="mtl-tape-track">
            {[...TICKER_A, ...TICKER_A, ...TICKER_A, ...TICKER_A].map((item, i) => (
              <span key={i}>{item} <i>◆</i></span>
            ))}
          </div>
        </div>
        <div className="mtl-tape mtl-tape-b">
          <div className="mtl-tape-track mtl-tape-rev">
            {[...TICKER_B, ...TICKER_B, ...TICKER_B, ...TICKER_B].map((item, i) => (
              <span key={i}>{item} <i>◆</i></span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- the levels journey: sticky scroll-driven centrepiece ---- */}
      <section className="mtl-levels" id="levels" ref={levelsRef}>
        <div className="mtl-wrap mtl-levels-inner">
          <div className="mtl-levels-sticky">
            <span className="mtl-mono">(01) THE JOURNEY</span>
            <span className="mtl-level-num" aria-hidden="true">{level.n}</span>
            <h2>{level.title}</h2>
            <p>{level.text}</p>
            <div className="mtl-level-dots" aria-hidden="true">
              {LEVELS.map((lv, i) => (
                <span key={lv.n} className={i === activeLevel ? "on" : ""} />
              ))}
            </div>
            <span className="mtl-mono">LEVEL {level.n} / 03 — SCROLL TO CONTINUE</span>
          </div>
          <div className="mtl-level-cards">
            {LEVELS.map((lv) => (
              <article key={lv.n} className="mtl-level-card">
                <div className={`mtl-level-img${lv.bw ? " mtl-bw" : ""}`}>
                  <Image src={lv.img} alt={lv.alt} width={1000} height={1200} sizes="(max-width: 900px) 100vw, 45vw" />
                </div>
                <div className="mtl-level-body">
                  <span className="mtl-mono">LEVEL {lv.n}</span>
                  <h3>{lv.title}</h3>
                  <p>{lv.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- count-up stats: single bordered row ---- */}
      <section className="mtl-stats">
        <div className="mtl-wrap">
          <BlurReveal>
            <span className="mtl-mono">(02) THE LODGE IN NUMBERS</span>
          </BlurReveal>
          <div className="mtl-stat-row">
            {STATS.map((st) => (
              <div key={st.label} className="mtl-stat">
                <span className="mtl-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="mtl-stat-label">{st.label}</span>
                <span className="mtl-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
          <p className="mtl-note">Key figures for this template — placeholder figures, replace with your own.</p>
        </div>
      </section>

      {/* ---- stays: scroll-driven horizontal strip ---- */}
      <section
        className="mtl-stays-sec"
        id="stays"
        ref={staysWrapRef}
        style={{ height: `calc(100vh + ${staysRange}px)` }}
      >
        <div className="mtl-stays-sticky">
          <div className="mtl-wrap">
            <BlurReveal>
              <div className="mtl-sec-head">
                <div>
                  <span className="mtl-mono">(03) STAYS</span>
                  <h2>Four cabins, one mountain.</h2>
                </div>
                <span className="mtl-mono">SCROLL →</span>
              </div>
            </BlurReveal>
          </div>
          <motion.div ref={staysStripRef} style={{ x: staysX }} className="mtl-stay-strip">
            {STAYS.map((sv) => (
              <article key={sv.n} className="mtl-stay-card">
                <div className="mtl-stay-img">
                  <Image src={sv.img} alt={sv.alt} width={800} height={600} sizes="420px" />
                  <span className="mtl-stay-tag">{sv.tag}</span>
                </div>
                <div className="mtl-stay-body">
                  <span className="mtl-mono">{sv.n}</span>
                  <h3>{sv.title}</h3>
                  <p>{sv.text}</p>
                  <p className="mtl-stay-price">{sv.price}</p>
                  <a className="mtl-btn mtl-btn-dark" href="#book">Check dates →</a>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---- activities: numbered list, two columns ---- */}
      <section className="mtl-section" id="activities">
        <div className="mtl-wrap">
          <BlurReveal>
            <span className="mtl-mono">(04) ACTIVITIES</span>
            <h2>What a day looks like.</h2>
          </BlurReveal>
          <ol className="mtl-act-list">
            {ACTIVITIES.map((ac) => (
              <li key={ac.n} className="mtl-act">
                <span className="mtl-act-n">{ac.n}</span>
                <div>
                  <h3>{ac.name}</h3>
                  <p>{ac.text}</p>
                  <span className="mtl-act-tags">{ac.tags.join(" · ")}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- the setting: full-bleed B&W night image, text over it ---- */}
      <section className="mtl-setting">
        <div className="mtl-setting-media mtl-bw">
          <Image src={NIGHT_IMG} alt="Stars over a mountain ridge at night" fill sizes="100vw" />
          <div className="mtl-setting-shade" aria-hidden="true" />
        </div>
        <div className="mtl-wrap mtl-setting-over">
          <BlurReveal>
            <span className="mtl-mono mtl-mono-light">(05) THE SETTING</span>
            <h2>
              Above the valley, <em>below the noise.</em>
            </h2>
            <p>
              Alder &amp; Pine sits at 1,620 metres, above the valley and below
              the high peaks. There is no road to the door — guests arrive by
              shuttle, then walk the last hundred metres through pine trees.
              The air is thin, the water is cold and the evenings are quiet.
            </p>
            <p>
              The lodge is not a hotel. There is no reception desk, no minibar,
              no television. There is a stove, a library, a drying room for
              boots and a deck that faces the dawn.
            </p>
          </BlurReveal>
          <div className="mtl-why">
            {WHY.map((w) => (
              <article key={w.title} className="mtl-why-item">
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- guest voices: one large quote + small quote row ---- */}
      <section className="mtl-section" id="voices">
        <div className="mtl-wrap">
          <BlurReveal>
            <span className="mtl-mono">(06) GUEST VOICES</span>
            <blockquote className="mtl-big-quote">
              “{TESTIMONIALS[0].quote}”
              <footer>
                <strong>{TESTIMONIALS[0].name}</strong>
                <span>{TESTIMONIALS[0].role}</span>
              </footer>
            </blockquote>
          </BlurReveal>
          <div className="mtl-quote-row">
            {TESTIMONIALS.slice(1).map((tst) => (
              <Reveal key={tst.name}>
                <article className="mtl-quote-card">
                  <p>“{tst.quote}”</p>
                  <span><strong>{tst.name}</strong> — {tst.role}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ: numbered accordion ---- */}
      <section className="mtl-section mtl-faq-sec" id="faq">
        <div className="mtl-wrap">
          <BlurReveal>
            <span className="mtl-mono">(07) FAQ</span>
            <h2>Before you book.</h2>
            <p className="mtl-lede">
              The questions every guest asks us. Anything else — call {PHONE}.
            </p>
          </BlurReveal>
          <div className="mtl-faq">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`mtl-faq-item${openFaq === i ? " open" : ""}`}>
                <button
                  className="mtl-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="mtl-faq-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{f.q}</span>
                  <span className="mtl-faq-plus" aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="mtl-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- book: two-column (contact left, form right) ---- */}
      <section className="mtl-book" id="book">
        <div className="mtl-wrap mtl-book-inner">
          <div className="mtl-book-left">
            <BlurReveal>
              <span className="mtl-mono mtl-mono-light">(08) BOOK YOUR STAY</span>
              <h2>Check availability for your dates.</h2>
              <p>
                Tell us when you would like to come and we will come back
                within 48 hours with availability and a price — usually much
                sooner. No obligation, no card taken.
              </p>
              <p className="mtl-book-contact">
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
              <div className="mtl-form-ok">
                <strong>Thank you — your request is in.</strong>
                <p>
                  We have your details and will come back with availability
                  and a price, usually within one working day. If it is
                  urgent, call {PHONE}.
                </p>
              </div>
            ) : (
              <form className="mtl-form" onSubmit={onBook}>
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
                  <select name="stay" defaultValue="The Pine Cabin">
                    <option>The Pine Cabin</option>
                    <option>The Alder Suite</option>
                    <option>The Summit Room</option>
                    <option>The Family Lodge</option>
                  </select>
                </label>
                <label>
                  Hiking level
                  <select name="level" defaultValue="Moderate">
                    <option>Gentle</option>
                    <option>Moderate</option>
                    <option>Full-day</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label className="mtl-full">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your trip, your group, or anything you need…"
                  />
                </label>
                <button className="mtl-btn mtl-btn-accent mtl-btn-lg mtl-full" type="submit">
                  Check availability
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---- footer: wordmark first, then columns ---- */}
      <footer className="mtl-footer">
        <div className="mtl-wrap">
          <span className="mtl-footer-word">ALDER &amp; PINE</span>
          <p className="mtl-footer-statement">
            Alpine cabins, guided hikes and slow mornings — above the valley,
            below the noise.
          </p>
          <div className="mtl-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#levels">The journey</a></li>
                <li><a href="#stays">Stays</a></li>
                <li><a href="#activities">Activities</a></li>
                <li><a href="#voices">Guests</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </nav>
            <nav aria-label="Stays">
              <h3>STAYS</h3>
              <ul>
                <li><a href="#stays">The Pine Cabin</a></li>
                <li><a href="#stays">The Alder Suite</a></li>
                <li><a href="#stays">The Summit Room</a></li>
                <li><a href="#stays">The Family Lodge</a></li>
              </ul>
            </nav>
            <div className="mtl-footer-contact">
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
          <span className="mtl-footer-copy">
            © 2026 Alder &amp; Pine Lodge · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
