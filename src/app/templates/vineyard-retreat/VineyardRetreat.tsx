"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

const PHONE = "+351 254 000 000";
const PHONE_HREF = "+351254000000";
const EMAIL = "stay@vineandstone.com";
const PLACE = "Douro Valley, Portugal";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Real vineyard photography (all verified 200). The hero and the
   vineyard feature image are B&W for the editorial LEV look; the
   tastings, activities and setting stay in full colour so the valley
   shows through. */
const HERO_IMG = U("1510812431401-41d2bd2722f3", 1800); // vineyard rows
const WINE_IMG = U("1506377247377-2a5b3b417ebb", 1000); // wine glasses
const VINE_IMG = U("1474722883778-792e7990302f", 1000); // vineyard
const POUR_IMG = U("1504279577054-acfeccf8fc52", 1000); // pouring wine
const CELLAR_IMG = U("1504274066651-8d31a536b11a", 1000); // wine cellar
const ROWS_IMG = U("1543418219-44e30b057fea", 1200); // vineyard rows

const TICKER = [
  "WINE TASTINGS",
  "VINEYARD STAYS",
  "SEASONAL FOOD",
  "RIVER WALKS",
  "HARVEST DAYS",
  "BOOK DIRECT",
];

const STAYS = [
  {
    n: "01",
    title: "The Vine Room",
    text: "Two guests, a terrace over the vines and breakfast in the courtyard. The classic stay — small, warm and quiet.",
    tag: "2 GUESTS",
    price: "From €170 / night",
  },
  {
    n: "02",
    title: "The Stone Suite",
    text: "Four guests, a stone-walled suite and a private terrace. The most space in the quinta, with room to spread out.",
    tag: "4 GUESTS",
    price: "From €260 / night",
  },
  {
    n: "03",
    title: "The River Room",
    text: "Two guests on the river side, with dawn light over the Douro. The best wake-up in the valley.",
    tag: "2 GUESTS",
    price: "From €200 / night",
  },
  {
    n: "04",
    title: "The Family Quinta",
    text: "Six guests, two bedrooms and a full kitchen. Built for families who want the valley and a place to cook together.",
    tag: "6 GUESTS",
    price: "From €340 / night",
  },
  {
    n: "05",
    title: "The Solo Cellar",
    text: "One guest, a reading chair and a door straight into the vines. For the ones who came to be alone with the valley.",
    tag: "1 GUEST",
    price: "From €120 / night",
  },
];

const STATS = [
  { n: 9, suffix: "", label: "KEY STAT · 001", caption: "Rooms in the quinta" },
  { n: 24, suffix: "", label: "KEY STAT · 002", caption: "Hectares of vines" },
  { n: 48, suffix: "h", label: "KEY STAT · 003", caption: "Booking reply, at most" },
  { n: 98, suffix: "%", label: "KEY STAT · 004", caption: "Guests who would return" },
];

const ACTIVITIES = [
  { n: "01", name: "Wine tastings", text: "Daily tastings in the cellar, with the winemaker.", tags: ["DAILY", "CELLAR"] },
  { n: "02", name: "Vineyard walks", text: "The terraces at golden hour, with a guide who knows them.", tags: ["EVENINGS", "GUIDED"] },
  { n: "03", name: "River walks", text: "The Douro path to the village, at an easy pace.", tags: ["DAILY", "RIVER"] },
  { n: "04", name: "Harvest days", text: "Pick grapes in September, stomp them in the evening.", tags: ["SEPTEMBER", "HANDS-ON"] },
  { n: "05", name: "Seasonal cooking", text: "Fire, olive oil and whatever the garden gives.", tags: ["EVENINGS", "FOOD"] },
  { n: "06", name: "Sunset terrace", text: "A glass of port as the sun drops behind the hills.", tags: ["EVENINGS", "PORT"] },
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
    role: "Guest, Milan",
    org: "Stayed in The Stone Suite",
    quote:
      "We arrived tired and left rested in a way I did not think was possible in four days. The tastings were generous, the food was honest and nobody hurried us.",
  },
  {
    name: "Ingrid Johansson",
    role: "Guest, Copenhagen",
    org: "Stayed in The River Room",
    quote:
      "The dawn over the Douro from our terrace is the best wake-up I have ever had. We have already booked to come back for the harvest.",
  },
  {
    name: "James O'Neill",
    role: "Guest, Edinburgh",
    org: "Stayed in The Solo Cellar",
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

export default function VineyardRetreat() {
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
    <div className="vny">
      {/* ---- header: floating pill nav ---- */}
      <header className={`vny-header${navHidden ? " vny-hidden" : ""}`}>
        <div className="vny-wrap vny-header-inner">
          <a className="vny-brand" href="#top" aria-label="Vine and Stone home">
            <span className="vny-logo-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="vny-brand-text">VINE &amp; STONE</span>
          </a>
          <nav className="vny-pillnav" aria-label="Main">
            <a href="#stays" className="on">Stays</a>
            <a href="#setting">The valley</a>
            <a href="#activities">Activities</a>
            <a href="#stay">Your stay</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="vny-header-cta">
            <a className="vny-phone" href={`tel:${PHONE_HREF}`}>
              {PHONE}
            </a>
            <a className="vny-btn vny-btn-accent" href="#book">
              Check availability
            </a>
          </div>
        </div>
      </header>

      {/* ---- hero: huge grotesque headline, mono spec strip, B&W photo ---- */}
      <section className="vny-hero" id="top">
        <div className="vny-wrap vny-hero-inner">
          <BlurReveal>
            <span className="vny-mono">(00) VINE &amp; STONE — VINEYARD RETREAT, DOURO VALLEY</span>
            <h1>
              Slow days, <em>among the vines.</em>
            </h1>
            <p className="vny-hero-sub">
              A vineyard stay in the Douro Valley — tastings in the cellar,
              terrace dinners, river walks and slow evenings. Book direct for
              the best rate.
            </p>
            <div className="vny-hero-cta">
              <a className="vny-btn vny-btn-accent vny-btn-lg" href="#book">
                Check availability →
              </a>
              <a className="vny-btn vny-btn-ghost vny-btn-lg" href="#stays">
                Explore the stays
              </a>
            </div>
          </BlurReveal>
          <div className="vny-specstrip" aria-label="Key facts">
            <span><b>24 HA</b> Of vines</span>
            <span><b>9</b> Rooms</span>
            <span><b>APR–OCT</b> Season</span>
            <span><b>DAILY</b> Tastings</span>
            <span><b>48H</b> Booking reply</span>
          </div>
        </div>
        <div className="vny-hero-media">
          <Image
            src={HERO_IMG}
            alt="Terraced vineyard rows"
            fill
            priority
            sizes="100vw"
          />
          <div className="vny-hero-chip" aria-hidden="true">
            <span>● LIVE — DOURO 24°C, CLEAR SKY</span>
            <span>GUESTS IN THE VALLEY NOW <LiveTick start={57} /></span>
          </div>
        </div>
      </section>

      {/* ---- marquee ticker ---- */}
      <div className="vny-ticker" aria-hidden="true">
        <div className="vny-ticker-track">
          {[...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i}>{item} <i>◆</i></span>
          ))}
        </div>
      </div>

      {/* ---- trust strip ---- */}
      <div className="vny-trustbar">
        <div className="vny-wrap vny-trustbar-inner">
          <span>✓ Book direct, best rate</span>
          <span>✓ Free cancellation to 14 days</span>
          <span>✓ Tastings included</span>
          <span>✓ Family-run since 1998</span>
        </div>
      </div>

      {/* ---- count-up stats ---- */}
      <section className="vny-section vny-stats">
        <div className="vny-wrap">
          <BlurReveal>
            <span className="vny-mono">(01) THE QUINTA IN NUMBERS</span>
            <h2>Small on purpose.</h2>
            <p className="vny-lede">
              Key figures for this template — placeholder figures, replace
              with your own.
            </p>
          </BlurReveal>
          <div className="vny-stat-grid">
            {STATS.map((st) => (
              <div key={st.label} className="vny-stat">
                <span className="vny-stat-label">{st.label}</span>
                <span className="vny-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="vny-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- stays: interactive rows, orange fill on select ---- */}
      <section className="vny-section" id="stays">
        <div className="vny-wrap">
          <BlurReveal>
            <span className="vny-mono">(02) STAYS</span>
            <h2>Five rooms, one valley.</h2>
            <p className="vny-lede">
              From a solo cellar to a family quinta — every stay includes
              breakfast, a daily tasting and a terrace dinner. Select a stay
              to see the detail.
            </p>
          </BlurReveal>
          <div className="vny-stays">
            <div className="vny-stay-list" role="tablist" aria-label="Stays">
              {STAYS.map((sv, i) => (
                <button
                  key={sv.n}
                  role="tab"
                  aria-selected={stay === i}
                  className={`vny-stay-row${stay === i ? " on" : ""}`}
                  onClick={() => setStay(i)}
                  onMouseEnter={() => setStay(i)}
                >
                  <span className="vny-stay-n">{sv.n}</span>
                  <span className="vny-stay-name">{sv.title}</span>
                  <span className="vny-stay-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <div className="vny-stay-detail">
              <span className="vny-mono">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <p className="vny-stay-price">{s.price}</p>
              <a className="vny-btn vny-btn-dark" href="#book">
                Check dates for this stay →
              </a>
            </div>
          </div>
          <div className="vny-stay-photos">
            <Image src={WINE_IMG} alt="Glasses of wine on a terrace" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={VINE_IMG} alt="Vines in the late light" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- the valley (dark) ---- */}
      <section className="vny-section vny-dark vny-speckle" id="setting">
        <div className="vny-wrap">
          <div className="vny-setting">
            <BlurReveal>
              <div>
                <span className="vny-mono vny-mono-light">(03) THE VALLEY</span>
                <h2>
                  Terraces, river <em>and old vines.</em>
                </h2>
                <p>
                  Vine &amp; Stone sits in the Douro Valley, where the river
                  bends between terraced hills and the vines are older than
                  the house. The quinta has made wine here since 1998, and
                  the cellar door is always open to guests.
                </p>
                <p>
                  The quinta is not a hotel. There is no reception desk and
                  no minibar. There is a cellar, a terrace, a kitchen that
                  cooks what the garden gives and a river that never hurries.
                </p>
                <a className="vny-btn vny-btn-accent" href="#book">
                  See the season
                </a>
              </div>
            </BlurReveal>
            <Reveal delay={0.1}>
              <aside className="vny-highlight">
                <span className="vny-highlight-tag">THE SUNSET TERRACE</span>
                <h3>A glass of port, at dusk</h3>
                <p>
                  Every evening, the terrace fills with a glass of port as
                  the sun drops behind the hills. No agenda, no talks — just
                  the valley, the light and whoever is there.
                </p>
                <ul>
                  <li>✓ Every evening, at sunset</li>
                  <li>✓ Port from our own cellar</li>
                  <li>✓ Terrace, always open</li>
                  <li>✓ Dinner after, in the courtyard</li>
                </ul>
                <a className="vny-btn vny-btn-dark" href="#book">
                  Book a sunset on the terrace →
                </a>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- activities ---- */}
      <section className="vny-section" id="activities">
        <div className="vny-wrap">
          <BlurReveal>
            <span className="vny-mono">(04) ACTIVITIES</span>
            <h2>What a day looks like.</h2>
            <p className="vny-lede">
              Wine, food, river and sky — the quinta runs on a short list of
              good things, done well.
            </p>
          </BlurReveal>
          <div className="vny-activities">
            {ACTIVITIES.map((ac, i) => (
              <Reveal key={ac.n} delay={i * 0.04}>
                <article className="vny-activity">
                  <span className="vny-activity-n">{ac.n}</span>
                  <div className="vny-activity-tags">
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
          <div className="vny-activity-photos">
            <Image src={POUR_IMG} alt="Pouring wine in the cellar" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={CELLAR_IMG} alt="Barrels in the wine cellar" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- your stay (sticky intro + steps) ---- */}
      <section className="vny-section vny-how-sec" id="stay">
        <div className="vny-wrap">
          <div className="vny-how">
            <div className="vny-how-sticky">
              <BlurReveal>
                <span className="vny-mono">(05) YOUR STAY</span>
                <h2>From arrival to departure in four steps.</h2>
                <p>
                  A short, honest process — so you know exactly what a stay
                  here feels like before you book.
                </p>
                <a className="vny-btn vny-btn-accent" href="#book">
                  Check availability
                </a>
              </BlurReveal>
            </div>
            <div className="vny-steps">
              {STEPS.map((st, i) => (
                <Reveal key={st.n} delay={i * 0.06}>
                  <article className="vny-step">
                    <span className="vny-step-n">{st.n}</span>
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
            <div className="vny-why">
              <h3>Why guests return</h3>
              <div className="vny-why-grid">
                {WHY.map((w) => (
                  <article key={w.title} className="vny-why-item">
                    <h4>{w.title}</h4>
                    <p>{w.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="vny-fullbleed vny-bw">
          <Image
            src={ROWS_IMG}
            alt="Terraced vineyard rows in the valley"
            width={2000}
            height={700}
            sizes="100vw"
          />
        </div>
      </section>

      {/* ---- guest voices (dark, tabbed) ---- */}
      <section className="vny-section vny-dark vny-speckle" id="voices">
        <div className="vny-wrap">
          <BlurReveal>
            <div className="vny-testi-head">
              <span className="vny-mono vny-mono-light">(06) GUEST VOICES</span>
              <h2>What a stay feels like.</h2>
            </div>
          </BlurReveal>
          <div className="vny-testi">
            <div className="vny-testi-tabs" role="tablist" aria-label="Guests">
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
            <div className="vny-testi-quote">
              <blockquote>“{t.quote}”</blockquote>
              <span className="vny-testi-org">{t.org}</span>
            </div>
            <div className="vny-testi-img">
              <Image
                src={WINE_IMG}
                alt="Glasses of wine on a terrace"
                width={800}
                height={1000}
                sizes="(max-width: 900px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="vny-section" id="faq">
        <div className="vny-wrap vny-faq-wrap">
          <BlurReveal>
            <span className="vny-mono">(07) FAQ</span>
            <h2>Before you book.</h2>
            <p className="vny-lede">
              The questions every guest asks us. Anything else — call {PHONE}.
            </p>
          </BlurReveal>
          <div className="vny-faq">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className={`vny-faq-item${openFaq === i ? " open" : ""}`}
              >
                <button
                  className="vny-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className="vny-faq-plus" aria-hidden="true">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && <p className="vny-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- book (dark CTA + form + photo strip) ---- */}
      <section className="vny-section vny-dark vny-speckle" id="book">
        <div className="vny-wrap">
          <BlurReveal>
            <div className="vny-cta-head">
              <span className="vny-mono vny-mono-light">(08) BOOK YOUR STAY</span>
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
                    <option>The Solo Cellar</option>
                  </select>
                </label>
                <label>
                  Tasting
                  <select name="tasting" defaultValue="Classic tasting">
                    <option>Classic tasting</option>
                    <option>Premium tasting</option>
                    <option>Harvest experience</option>
                    <option>Not sure yet</option>
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
                <p className="vny-form-note vny-full">
                  Prefer to talk? Call{" "}
                  <a href={`tel:${PHONE_HREF}`}>{PHONE}</a> or email{" "}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </form>
            )}
          </Reveal>
          <div className="vny-strip" aria-hidden="true">
            {[WINE_IMG, VINE_IMG, POUR_IMG, CELLAR_IMG, ROWS_IMG].map(
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
      <footer className="vny-footer">
        <div className="vny-wrap">
          <BlurReveal>
            <p className="vny-footer-statement">
              Wine tastings, terrace dinners and slow evenings — slow days,
              among the vines.
            </p>
          </BlurReveal>
          <div className="vny-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#stays">Stays</a></li>
                <li><a href="#setting">The valley</a></li>
                <li><a href="#activities">Activities</a></li>
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
                <li><a href="#stays">The Solo Cellar</a></li>
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
              <p className="vny-reg">
                Vine &amp; Stone Quinta · Douro Valley, Portugal
              </p>
            </div>
            <div className="vny-footer-status">
              <h3>STATUS</h3>
              <p>● CELLAR OPEN</p>
              <p>
                GUESTS BOOKED THIS SEASON{" "}
                <LiveTick start={940} step={2} intervalMs={3400} />
              </p>
            </div>
          </div>
          <span className="vny-footer-word">VINE &amp; STONE</span>
          <span className="vny-footer-copy">
            © 2026 Vine &amp; Stone Quinta · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
