"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

const PHONE = "+41 27 000 00 00";
const PHONE_HREF = "+41270000000";
const EMAIL = "stay@alderandpine.ch";
const PLACE = "Zermatt, Swiss Alps";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Real alpine photography (all verified 200). The hero and the night
   feature image are B&W for the editorial LEV look; the rooms, activities
   and setting stay in full colour so the place shows through. */
const HERO_IMG = U("1506905925346-21bda4d32df4", 1800); // mountain landscape
const CABIN_IMG = U("1510798831971-661eb04b3739", 1000); // snow cabin
const LAKE_CABIN_IMG = U("1470770841072-f978cf4d019e", 1000); // cabin by a lake
const HIKE_IMG = U("1465056836041-7f43ac27dcb5", 1000); // mountain hiking
const TRAIL_IMG = U("1551632811-561732d1e306", 1000); // hiking trail
const NIGHT_IMG = U("1519681393784-d120267933ba", 1800); // mountain stars at night
const LAKE_IMG = U("1501785888041-af3ef285b470", 1200); // mountain lake

const TICKER = [
  "ALPINE CABINS",
  "GUIDED HIKES",
  "LAKE SWIMS",
  "FIRESIDE EVENINGS",
  "SLOW MORNINGS",
  "BOOK DIRECT",
];

const STAYS = [
  {
    n: "01",
    title: "The Pine Cabin",
    text: "Two guests, a wood stove and a lake view. The classic cabin — small, warm and quiet, with a deck for slow mornings.",
    tag: "2 GUESTS",
    price: "From CHF 180 / night",
  },
  {
    n: "02",
    title: "The Alder Suite",
    text: "Four guests, a wraparound deck and a deep bath. The most space in the lodge, with room to spread out after a long hike.",
    tag: "4 GUESTS",
    price: "From CHF 260 / night",
  },
  {
    n: "03",
    title: "The Summit Room",
    text: "Two guests on the top floor, with dawn light over the valley. The best wake-up in the building.",
    tag: "2 GUESTS",
    price: "From CHF 210 / night",
  },
  {
    n: "04",
    title: "The Family Lodge",
    text: "Six guests, two bedrooms and a full kitchen. Built for families who want the mountain and a place to cook together.",
    tag: "6 GUESTS",
    price: "From CHF 340 / night",
  },
  {
    n: "05",
    title: "The Solo Nook",
    text: "One guest, a reading chair and a door straight onto the trail. For the ones who came to be alone with the mountain.",
    tag: "1 GUEST",
    price: "From CHF 120 / night",
  },
];

const STATS = [
  { n: 12, suffix: "", label: "KEY STAT · 001", caption: "Cabins and rooms" },
  { n: 26, suffix: "", label: "KEY STAT · 002", caption: "Guided trails from the door" },
  { n: 48, suffix: "h", label: "KEY STAT · 003", caption: "Booking reply, at most" },
  { n: 98, suffix: "%", label: "KEY STAT · 004", caption: "Guests who would return" },
];

const ACTIVITIES = [
  { n: "01", name: "Guided hikes", text: "Marked trails from the door, with a guide who knows them.", tags: ["DAILY", "ALL LEVELS"] },
  { n: "02", name: "Lake swims", text: "Cold, clear water at 1,800 m. Towels and tea after.", tags: ["SUMMER", "COLD WATER"] },
  { n: "03", name: "Fireside evenings", text: "Wood stove, stories, no screens after dark.", tags: ["EVENINGS", "FIRE"] },
  { n: "04", name: "Sunrise summit", text: "An early start for the best light in the valley.", tags: ["DAWN", "GUIDED"] },
  { n: "05", name: "Foraging walk", text: "Mushrooms, herbs and berries with a local guide.", tags: ["SEASONAL", "GUIDED"] },
  { n: "06", name: "Stargazing", text: "No light pollution. The Milky Way, every clear night.", tags: ["NIGHT", "CLEAR SKIES"] },
];

const STEPS = [
  {
    n: "01",
    title: "Arrive",
    text: "Check in from 3pm. Tea on arrival, boots off, shoulders down. The mountain does the rest.",
  },
  {
    n: "02",
    title: "Settle",
    text: "Your cabin is ready, the stove is lit and dinner is at 7. Nothing is asked of you tonight.",
  },
  {
    n: "03",
    title: "Explore",
    text: "Pick a hike, a lake or a doing-nothing day. Guides are on hand, and the trails start at the door.",
  },
  {
    n: "04",
    title: "Depart",
    text: "Check out at 11am. Leave the mountain a little lighter than you arrived.",
  },
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
    role: "Guest, Stockholm",
    org: "Stayed in The Pine Cabin",
    quote:
      "We arrived tired and left rested in a way I did not think was possible in four days. The cabin was warm, the hikes were honest, and nobody hurried us at any point.",
  },
  {
    name: "Tom Becker",
    role: "Guest, Munich",
    org: "Stayed in The Family Lodge",
    quote:
      "The kids still talk about the lake swim and the fireside evenings. It is the first holiday where the whole family actually slowed down.",
  },
  {
    name: "Amelia Hart",
    role: "Guest, London",
    org: "Stayed in The Solo Nook",
    quote:
      "I came alone, walked every day and read by the stove every night. The Solo Nook is exactly as described — small, quiet and perfect.",
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

/** A counter that ticks continuously, like the live numbers on the
    Framer reference sites. */
function LiveTick({ start, step = 1, intervalMs = 2600 }: { start: number; step?: number; intervalMs?: number }) {
  const [v, setV] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setV((x) => x + step), intervalMs);
    return () => clearInterval(id);
  }, [step, intervalMs]);
  return <>{v.toLocaleString()}</>;
}

export default function MountainLodge() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState(0);
  const [stay, setStay] = useState(0);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavHidden(y > 140 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const t = TESTIMONIALS[tab];
  const s = STAYS[stay];

  return (
    <div className="mtl">
      {/* ---- header: floating pill nav ---- */}
      <header className={`mtl-header${navHidden ? " mtl-hidden" : ""}`}>
        <div className="mtl-wrap mtl-header-inner">
          <a className="mtl-brand" href="#top" aria-label="Alder and Pine home">
            <span className="mtl-logo-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="mtl-brand-text">ALDER &amp; PINE</span>
          </a>
          <nav className="mtl-pillnav" aria-label="Main">
            <a href="#stays" className="on">Stays</a>
            <a href="#setting">The setting</a>
            <a href="#activities">Activities</a>
            <a href="#stay">Your stay</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="mtl-header-cta">
            <a className="mtl-phone" href={`tel:${PHONE_HREF}`}>
              {PHONE}
            </a>
            <a className="mtl-btn mtl-btn-accent" href="#book">
              Check availability
            </a>
          </div>
        </div>
      </header>

      {/* ---- hero: huge grotesque headline, mono spec strip, B&W photo ---- */}
      <section className="mtl-hero" id="top">
        <div className="mtl-wrap mtl-hero-inner">
          <BlurReveal>
            <span className="mtl-mono">(00) ALDER &amp; PINE — MOUNTAIN LODGE, ZERMATT</span>
            <h1>
              Stay wild. <em>Stay warm.</em>
            </h1>
            <p className="mtl-hero-sub">
              Alpine cabins above Zermatt — guided hikes, lake swims, fireside
              evenings and slow mornings. Book direct for the best rate.
            </p>
            <div className="mtl-hero-cta">
              <a className="mtl-btn mtl-btn-accent mtl-btn-lg" href="#book">
                Check availability →
              </a>
              <a className="mtl-btn mtl-btn-ghost mtl-btn-lg" href="#stays">
                Explore the stays
              </a>
            </div>
          </BlurReveal>
          <div className="mtl-specstrip" aria-label="Key facts">
            <span><b>1,620 M</b> Altitude</span>
            <span><b>12</b> Cabins &amp; rooms</span>
            <span><b>JUN–SEP · DEC–MAR</b> Season</span>
            <span><b>DAILY</b> Guided hikes</span>
            <span><b>48H</b> Booking reply</span>
          </div>
        </div>
        <div className="mtl-hero-media">
          <Image
            src={HERO_IMG}
            alt="A mountain range above the clouds"
            fill
            priority
            sizes="100vw"
          />
          <div className="mtl-hero-chip" aria-hidden="true">
            <span>● LIVE — SUMMIT 3,200 M · 14°C, CLEAR</span>
            <span>GUESTS ON THE MOUNTAIN NOW <LiveTick start={86} /></span>
          </div>
        </div>
      </section>

      {/* ---- marquee ticker ---- */}
      <div className="mtl-ticker" aria-hidden="true">
        <div className="mtl-ticker-track">
          {[...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i}>{item} <i>◆</i></span>
          ))}
        </div>
      </div>

      {/* ---- trust strip ---- */}
      <div className="mtl-trustbar">
        <div className="mtl-wrap mtl-trustbar-inner">
          <span>✓ Book direct, best rate</span>
          <span>✓ Free cancellation to 14 days</span>
          <span>✓ Guided hikes included</span>
          <span>✓ Family-run since 2012</span>
        </div>
      </div>

      {/* ---- count-up stats ---- */}
      <section className="mtl-section mtl-stats">
        <div className="mtl-wrap">
          <BlurReveal>
            <span className="mtl-mono">(01) THE LODGE IN NUMBERS</span>
            <h2>Small on purpose.</h2>
            <p className="mtl-lede">
              Key figures for this template — placeholder figures, replace
              with your own.
            </p>
          </BlurReveal>
          <div className="mtl-stat-grid">
            {STATS.map((st) => (
              <div key={st.label} className="mtl-stat">
                <span className="mtl-stat-label">{st.label}</span>
                <span className="mtl-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="mtl-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- stays: interactive rows, orange fill on select ---- */}
      <section className="mtl-section" id="stays">
        <div className="mtl-wrap">
          <BlurReveal>
            <span className="mtl-mono">(02) STAYS</span>
            <h2>Five cabins, one mountain.</h2>
            <p className="mtl-lede">
              From a solo nook to a family lodge — every stay includes
              breakfast, guided hikes and fireside evenings. Select a stay to
              see the detail.
            </p>
          </BlurReveal>
          <div className="mtl-stays">
            <div className="mtl-stay-list" role="tablist" aria-label="Stays">
              {STAYS.map((sv, i) => (
                <button
                  key={sv.n}
                  role="tab"
                  aria-selected={stay === i}
                  className={`mtl-stay-row${stay === i ? " on" : ""}`}
                  onClick={() => setStay(i)}
                  onMouseEnter={() => setStay(i)}
                >
                  <span className="mtl-stay-n">{sv.n}</span>
                  <span className="mtl-stay-name">{sv.title}</span>
                  <span className="mtl-stay-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <div className="mtl-stay-detail">
              <span className="mtl-mono">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <p className="mtl-stay-price">{s.price}</p>
              <a className="mtl-btn mtl-btn-dark" href="#book">
                Check dates for this stay →
              </a>
            </div>
          </div>
          <div className="mtl-stay-photos">
            <Image src={CABIN_IMG} alt="A wooden cabin in the snow" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={LAKE_CABIN_IMG} alt="A cabin beside a mountain lake" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- the setting (dark) ---- */}
      <section className="mtl-section mtl-dark mtl-speckle" id="setting">
        <div className="mtl-wrap">
          <div className="mtl-setting">
            <BlurReveal>
              <div>
                <span className="mtl-mono mtl-mono-light">(03) THE SETTING</span>
                <h2>
                  Above the valley, <em>below the noise.</em>
                </h2>
                <p>
                  Alder &amp; Pine sits at 1,620 metres, above the valley and
                  below the high peaks. There is no road to the door — guests
                  arrive by shuttle, then walk the last hundred metres through
                  pine trees. The air is thin, the water is cold and the
                  evenings are quiet.
                </p>
                <p>
                  The lodge is not a hotel. There is no reception desk, no
                  minibar, no television. There is a stove, a library, a
                  drying room for boots and a deck that faces the dawn.
                </p>
                <a className="mtl-btn mtl-btn-accent" href="#book">
                  See the season
                </a>
              </div>
            </BlurReveal>
            <Reveal delay={0.1}>
              <aside className="mtl-highlight">
                <span className="mtl-highlight-tag">THE SLOW MORNING</span>
                <h3>Nothing before 10am</h3>
                <p>
                  Breakfast is served until 10, coffee is on from 7, and
                  there is no schedule before the first hike leaves. Mornings
                  here are for doing nothing properly.
                </p>
                <ul>
                  <li>✓ Breakfast until 10am</li>
                  <li>✓ Coffee and tea all day</li>
                  <li>✓ First hike leaves at 10:30</li>
                  <li>✓ Library and deck, always open</li>
                </ul>
                <a className="mtl-btn mtl-btn-dark" href="#book">
                  Book a slow morning →
                </a>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- activities ---- */}
      <section className="mtl-section" id="activities">
        <div className="mtl-wrap">
          <BlurReveal>
            <span className="mtl-mono">(04) ACTIVITIES</span>
            <h2>What a day looks like.</h2>
            <p className="mtl-lede">
              Hikes, water, fire and sky — the lodge runs on a short list of
              good things, done well.
            </p>
          </BlurReveal>
          <div className="mtl-activities">
            {ACTIVITIES.map((ac, i) => (
              <Reveal key={ac.n} delay={i * 0.04}>
                <article className="mtl-activity">
                  <span className="mtl-activity-n">{ac.n}</span>
                  <div className="mtl-activity-tags">
                    {ac.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h3>{ac.name}</h3>
                  <p>{ac.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mtl-activity-photos">
            <Image src={HIKE_IMG} alt="Hikers on a mountain trail" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={TRAIL_IMG} alt="A trail through alpine meadow" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- your stay (sticky intro + steps) ---- */}
      <section className="mtl-section mtl-how-sec" id="stay">
        <div className="mtl-wrap">
          <div className="mtl-how">
            <div className="mtl-how-sticky">
              <BlurReveal>
                <span className="mtl-mono">(05) YOUR STAY</span>
                <h2>From arrival to departure in four steps.</h2>
                <p>
                  A short, honest process — so you know exactly what a stay
                  here feels like before you book.
                </p>
                <a className="mtl-btn mtl-btn-accent" href="#book">
                  Check availability
                </a>
              </BlurReveal>
            </div>
            <div className="mtl-steps">
              {STEPS.map((st, i) => (
                <Reveal key={st.n} delay={i * 0.06}>
                  <article className="mtl-step">
                    <span className="mtl-step-n">{st.n}</span>
                    <div>
                      <h3>{st.title}</h3>
                      <p>{st.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal>
            <div className="mtl-why">
              <h3>Why guests return</h3>
              <div className="mtl-why-grid">
                {WHY.map((w) => (
                  <article key={w.title} className="mtl-why-item">
                    <h4>{w.title}</h4>
                    <p>{w.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mtl-fullbleed mtl-bw">
          <Image
            src={NIGHT_IMG}
            alt="Stars over a mountain ridge at night"
            width={2000}
            height={700}
            sizes="100vw"
          />
        </div>
      </section>

      {/* ---- guest voices (dark, tabbed) ---- */}
      <section className="mtl-section mtl-dark mtl-speckle" id="voices">
        <div className="mtl-wrap">
          <BlurReveal>
            <div className="mtl-testi-head">
              <span className="mtl-mono mtl-mono-light">(06) GUEST VOICES</span>
              <h2>What a stay feels like.</h2>
            </div>
          </BlurReveal>
          <div className="mtl-testi">
            <div className="mtl-testi-tabs" role="tablist" aria-label="Guests">
              {TESTIMONIALS.map((c, i) => (
                <button
                  key={c.name}
                  role="tab"
                  aria-selected={tab === i}
                  className={tab === i ? "on" : ""}
                  onClick={() => setTab(i)}
                >
                  <strong>{c.name}</strong>
                  <span>{c.role}</span>
                </button>
              ))}
            </div>
            <div className="mtl-testi-quote">
              <blockquote>“{t.quote}”</blockquote>
              <span className="mtl-testi-org">{t.org}</span>
            </div>
            <div className="mtl-testi-img">
              <Image
                src={LAKE_IMG}
                alt="A still mountain lake in the morning"
                width={800}
                height={1000}
                sizes="(max-width: 900px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="mtl-section" id="faq">
        <div className="mtl-wrap mtl-faq-wrap">
          <BlurReveal>
            <span className="mtl-mono">(07) FAQ</span>
            <h2>Before you book.</h2>
            <p className="mtl-lede">
              The questions every guest asks us. Anything else — call {PHONE}.
            </p>
          </BlurReveal>
          <div className="mtl-faq">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className={`mtl-faq-item${openFaq === i ? " open" : ""}`}
              >
                <button
                  className="mtl-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className="mtl-faq-plus" aria-hidden="true">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && <p className="mtl-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- book (dark CTA + form + photo strip) ---- */}
      <section className="mtl-section mtl-dark mtl-speckle" id="book">
        <div className="mtl-wrap">
          <BlurReveal>
            <div className="mtl-cta-head">
              <span className="mtl-mono mtl-mono-light">(08) BOOK YOUR STAY</span>
              <h2>Check availability for your dates.</h2>
              <p>
                Tell us when you would like to come and we will come back
                within 48 hours with availability and a price — usually much
                sooner. No obligation, no card taken.
              </p>
            </div>
          </BlurReveal>
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
                    <option>The Solo Nook</option>
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
                <p className="mtl-form-note mtl-full">
                  Prefer to talk? Call{" "}
                  <a href={`tel:${PHONE_HREF}`}>{PHONE}</a> or email{" "}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </form>
            )}
          </Reveal>
          <div className="mtl-strip" aria-hidden="true">
            {[LAKE_IMG, CABIN_IMG, HIKE_IMG, LAKE_CABIN_IMG, TRAIL_IMG].map(
              (src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={500}
                  height={400}
                  sizes="300px"
                  style={{ height: `${300 + (i % 2) * 70}px` }}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* ---- footer (giant wordmark) ---- */}
      <footer className="mtl-footer">
        <div className="mtl-wrap">
          <BlurReveal>
            <p className="mtl-footer-statement">
              Alpine cabins, guided hikes and slow mornings — above the
              valley, below the noise.
            </p>
          </BlurReveal>
          <div className="mtl-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#stays">Stays</a></li>
                <li><a href="#setting">The setting</a></li>
                <li><a href="#activities">Activities</a></li>
                <li><a href="#stay">Your stay</a></li>
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
                <li><a href="#stays">The Solo Nook</a></li>
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
              <p className="mtl-reg">
                Alder &amp; Pine Lodge · Zermatt, Switzerland
              </p>
            </div>
            <div className="mtl-footer-status">
              <h3>STATUS</h3>
              <p>● TRAILS OPEN</p>
              <p>
                GUESTS BOOKED THIS SEASON{" "}
                <LiveTick start={1240} step={2} intervalMs={3400} />
              </p>
            </div>
          </div>
          <span className="mtl-footer-word">ALDER &amp; PINE</span>
          <span className="mtl-footer-copy">
            © 2026 Alder &amp; Pine Lodge · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
