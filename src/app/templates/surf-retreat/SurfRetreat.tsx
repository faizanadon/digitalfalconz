"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

const PHONE = "+351 261 000 000";
const PHONE_HREF = "+351261000000";
const EMAIL = "stay@saltandswell.com";
const PLACE = "Ericeira, Portugal";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Real surf photography (all verified 200). The hero and the wave
   feature image are B&W for the editorial LEV look; the boards,
   activities and setting stay in full colour so the coast shows
   through. */
const HERO_IMG = U("1502680390469-be75c86b636f", 1800); // surf wave
const BEACH_IMG = U("1507525428034-b723cf961d3e", 1000); // beach
const BEACH2_IMG = U("1519046904884-53103b34b206", 1000); // beach shoreline
const OCEAN_IMG = U("1505142468610-359e7d316be0", 1000); // ocean
const RESORT_IMG = U("1520250497591-112f2f40a3f4", 1000); // coastal stay
const FEATURE_IMG = U("1468413253725-0d5181091126", 1800); // surfer

const TICKER = [
  "SURF LESSONS",
  "LONGBOARD MORNINGS",
  "CLIFF WALKS",
  "SUNSET SESSIONS",
  "SLOW EVENINGS",
  "BOOK DIRECT",
];

const PACKAGES = [
  {
    n: "01",
    title: "The Learn to Surf Week",
    text: "Seven nights, five lessons, boards and wetsuits included. For first-timers who want to stand up by Friday.",
    tag: "7 NIGHTS",
    price: "From €890 / person",
  },
  {
    n: "02",
    title: "The Longboard Weekend",
    text: "Three nights, two longboard sessions and a cliff walk included. Slow, graceful rides on the mellow morning swell.",
    tag: "3 NIGHTS",
    price: "From €420 / person",
  },
  {
    n: "03",
    title: "The Surf & Stay",
    text: "Four nights, bed and breakfast, surf when you like. For improvers who want the coast without the schedule.",
    tag: "4 NIGHTS",
    price: "From €520 / person",
  },
  {
    n: "04",
    title: "The Family Surf Week",
    text: "Seven nights for the family, lessons for all ages. The kids learn in the morning, the parents surf in the afternoon.",
    tag: "7 NIGHTS",
    price: "From €2,400 / family",
  },
  {
    n: "05",
    title: "The Solo Session",
    text: "Three nights, one-to-one coaching, your own pace. For the ones who came to get better, quietly.",
    tag: "3 NIGHTS",
    price: "From €610 / person",
  },
];

const STATS = [
  { n: 10, suffix: "", label: "KEY STAT · 001", caption: "Rooms by the sea" },
  { n: 320, suffix: "", label: "KEY STAT · 002", caption: "Surfable days a year" },
  { n: 48, suffix: "h", label: "KEY STAT · 003", caption: "Booking reply, at most" },
  { n: 96, suffix: "%", label: "KEY STAT · 004", caption: "Guests who would return" },
];

const ACTIVITIES = [
  { n: "01", name: "Surf lessons", text: "Daily lessons for every level, boards and wetsuits included.", tags: ["DAILY", "ALL LEVELS"] },
  { n: "02", name: "Longboard mornings", text: "Slow, graceful rides on the mellow morning swell.", tags: ["MORNINGS", "LONGBOARD"] },
  { n: "03", name: "Cliff walks", text: "The coastal path to the lighthouse, at golden hour.", tags: ["EVENINGS", "WALKS"] },
  { n: "04", name: "Yoga at dawn", text: "Stretch on the deck before the first session.", tags: ["DAWN", "YOGA"] },
  { n: "05", name: "Fish market morning", text: "Buy the catch with a local, cook it that evening.", tags: ["MORNINGS", "FOOD"] },
  { n: "06", name: "Sunset session", text: "One last wave as the sun drops into the Atlantic.", tags: ["EVENINGS", "SURF"] },
];

const STEPS = [
  {
    n: "01",
    title: "Arrive",
    text: "Check in from 3pm. Coffee on the deck, boards by the door, the ocean in front of you.",
  },
  {
    n: "02",
    title: "Settle",
    text: "Your room is ready, dinner is at 7 and the tide times are on the board. Nothing is asked of you tonight.",
  },
  {
    n: "03",
    title: "Surf",
    text: "Pick a lesson, a longboard morning or a doing-nothing day. Coaches are on hand, and the beach is a two-minute walk.",
  },
  {
    n: "04",
    title: "Depart",
    text: "Check out at 11am. Leave the coast a little saltier than you arrived.",
  },
];

const WHY = [
  { title: "Family-run, not a chain", text: "The same family has run the retreat since 2016. They know the breaks, the tides and your name by day two." },
  { title: "Small on purpose", text: "Ten rooms only. No crowds, no queues, no noise — just the coast and the people who came for it." },
  { title: "Lessons included", text: "Every package includes coaching. You do not need experience, only a willingness to fall in." },
  { title: "Honest pricing", text: "The price you see is the price you pay. No resort fees, no surprises at checkout." },
];

const TESTIMONIALS = [
  {
    name: "Hannah Moore",
    role: "Guest, Bristol",
    org: "Learn to Surf Week",
    quote:
      "I stood up on day three and have not stopped smiling since. The coaches are patient, the house is calm and the food is better than it has any right to be.",
  },
  {
    name: "Felix Hartmann",
    role: "Guest, Hamburg",
    org: "Longboard Weekend",
    quote:
      "The morning longboard sessions are the best part of my year. Slow waves, warm water and nobody in a hurry.",
  },
  {
    name: "Lucy Chen",
    role: "Guest, Dublin",
    org: "Solo Session",
    quote:
      "I came alone and left with better surfing and three new friends. The one-to-one coaching is worth every cent.",
  },
];

const FAQS = [
  {
    q: "When is the best time to visit?",
    a: "March to November, when the water is warm enough and the waves are kind. Summer is busiest; spring and autumn are quieter and often the best surf.",
  },
  {
    q: "How do I get there?",
    a: "Fly to Lisbon, then take the bus or a transfer to Ericeira — about 45 minutes. We can arrange a pickup from the airport on request.",
  },
  {
    q: "I have never surfed. Is that okay?",
    a: "Yes — most of our guests are first-timers. The Learn to Surf Week is built for complete beginners, with small groups and patient coaches.",
  },
  {
    q: "Is the retreat suitable for children?",
    a: "Yes. The Family Surf Week includes lessons for children from 8 up, and the beach is sandy and gentle at low tide.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 14 days before arrival. Inside 14 days we keep the first night, and the rest is refunded.",
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

export default function SurfRetreat() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState(0);
  const [pkg, setPkg] = useState(0);
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
  const s = PACKAGES[pkg];

  return (
    <div className="srf">
      {/* ---- header: floating pill nav ---- */}
      <header className={`srf-header${navHidden ? " srf-hidden" : ""}`}>
        <div className="srf-wrap srf-header-inner">
          <a className="srf-brand" href="#top" aria-label="Salt and Swell home">
            <span className="srf-logo-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="srf-brand-text">SALT &amp; SWELL</span>
          </a>
          <nav className="srf-pillnav" aria-label="Main">
            <a href="#packages" className="on">Packages</a>
            <a href="#setting">The coast</a>
            <a href="#activities">Activities</a>
            <a href="#stay">Your stay</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="srf-header-cta">
            <a className="srf-phone" href={`tel:${PHONE_HREF}`}>
              {PHONE}
            </a>
            <a className="srf-btn srf-btn-accent" href="#book">
              Check availability
            </a>
          </div>
        </div>
      </header>

      {/* ---- hero: huge grotesque headline, mono spec strip, B&W photo ---- */}
      <section className="srf-hero" id="top">
        <div className="srf-wrap srf-hero-inner">
          <BlurReveal>
            <span className="srf-mono">(00) SALT &amp; SWELL — SURF RETREAT, ERICEIRA</span>
            <h1>
              Salt air. <em>Long waves.</em>
            </h1>
            <p className="srf-hero-sub">
              A surf retreat on the Ericeira coast — daily lessons, longboard
              mornings, cliff walks and slow evenings. Book direct for the
              best rate.
            </p>
            <div className="srf-hero-cta">
              <a className="srf-btn srf-btn-accent srf-btn-lg" href="#book">
                Check availability →
              </a>
              <a className="srf-btn srf-btn-ghost srf-btn-lg" href="#packages">
                Explore the packages
              </a>
            </div>
          </BlurReveal>
          <div className="srf-specstrip" aria-label="Key facts">
            <span><b>45 MIN</b> From Lisbon</span>
            <span><b>10</b> Rooms</span>
            <span><b>MAR–NOV</b> Season</span>
            <span><b>DAILY</b> Lessons</span>
            <span><b>48H</b> Booking reply</span>
          </div>
        </div>
        <div className="srf-hero-media">
          <Image
            src={HERO_IMG}
            alt="A wave breaking"
            fill
            priority
            sizes="100vw"
          />
          <div className="srf-hero-chip" aria-hidden="true">
            <span>● LIVE — RIBEIRA D&apos;ILHAS · 1.2 M, OFFSHORE</span>
            <span>SURFERS IN THE WATER NOW <LiveTick start={34} /></span>
          </div>
        </div>
      </section>

      {/* ---- marquee ticker ---- */}
      <div className="srf-ticker" aria-hidden="true">
        <div className="srf-ticker-track">
          {[...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i}>{item} <i>◆</i></span>
          ))}
        </div>
      </div>

      {/* ---- trust strip ---- */}
      <div className="srf-trustbar">
        <div className="srf-wrap srf-trustbar-inner">
          <span>✓ Book direct, best rate</span>
          <span>✓ Free cancellation to 14 days</span>
          <span>✓ Lessons &amp; boards included</span>
          <span>✓ Family-run since 2016</span>
        </div>
      </div>

      {/* ---- count-up stats ---- */}
      <section className="srf-section srf-stats">
        <div className="srf-wrap">
          <BlurReveal>
            <span className="srf-mono">(01) THE RETREAT IN NUMBERS</span>
            <h2>Small on purpose.</h2>
            <p className="srf-lede">
              Key figures for this template — placeholder figures, replace
              with your own.
            </p>
          </BlurReveal>
          <div className="srf-stat-grid">
            {STATS.map((st) => (
              <div key={st.label} className="srf-stat">
                <span className="srf-stat-label">{st.label}</span>
                <span className="srf-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="srf-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- packages: interactive rows, orange fill on select ---- */}
      <section className="srf-section" id="packages">
        <div className="srf-wrap">
          <BlurReveal>
            <span className="srf-mono">(02) PACKAGES</span>
            <h2>Five ways to surf the week.</h2>
            <p className="srf-lede">
              From a first-timer week to a family week — every package
              includes lessons, boards and breakfast. Select a package to see
              the detail.
            </p>
          </BlurReveal>
          <div className="srf-stays">
            <div className="srf-stay-list" role="tablist" aria-label="Packages">
              {PACKAGES.map((sv, i) => (
                <button
                  key={sv.n}
                  role="tab"
                  aria-selected={pkg === i}
                  className={`srf-stay-row${pkg === i ? " on" : ""}`}
                  onClick={() => setPkg(i)}
                  onMouseEnter={() => setPkg(i)}
                >
                  <span className="srf-stay-n">{sv.n}</span>
                  <span className="srf-stay-name">{sv.title}</span>
                  <span className="srf-stay-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <div className="srf-stay-detail">
              <span className="srf-mono">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <p className="srf-stay-price">{s.price}</p>
              <a className="srf-btn srf-btn-dark" href="#book">
                Check dates for this package →
              </a>
            </div>
          </div>
          <div className="srf-stay-photos">
            <Image src={BEACH_IMG} alt="A sandy beach at low tide" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={OCEAN_IMG} alt="The Atlantic from the cliffs" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- the coast (dark) ---- */}
      <section className="srf-section srf-dark srf-speckle" id="setting">
        <div className="srf-wrap">
          <div className="srf-setting">
            <BlurReveal>
              <div>
                <span className="srf-mono srf-mono-light">(03) THE COAST</span>
                <h2>
                  A working fishing town, <em>with world-class waves.</em>
                </h2>
                <p>
                  Salt &amp; Swell sits in Ericeira, a whitewashed fishing
                  town an hour from Lisbon and home to a World Surfing
                  Reserve. The house is two minutes from the beach, the
                  boats come in at dawn and the waves are there most days
                  of the year.
                </p>
                <p>
                  The retreat is not a hotel. There is no reception desk
                  and no minibar. There is a board rack, a wetsuit line, a
                  deck for coffee and a kitchen that cooks the catch.
                </p>
                <a className="srf-btn srf-btn-accent" href="#book">
                  See the season
                </a>
              </div>
            </BlurReveal>
            <Reveal delay={0.1}>
              <aside className="srf-highlight">
                <span className="srf-highlight-tag">THE SUNSET SESSION</span>
                <h3>One last wave</h3>
                <p>
                  Every evening, if the tide allows, the house paddles out
                  for one last session as the sun drops into the Atlantic.
                  Then dinner on the deck, salt still on your skin.
                </p>
                <ul>
                  <li>✓ Every evening, tide permitting</li>
                  <li>✓ Boards and wetsuits provided</li>
                  <li>✓ All levels welcome</li>
                  <li>✓ Dinner on the deck after</li>
                </ul>
                <a className="srf-btn srf-btn-dark" href="#book">
                  Book a sunset session →
                </a>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- activities ---- */}
      <section className="srf-section" id="activities">
        <div className="srf-wrap">
          <BlurReveal>
            <span className="srf-mono">(04) ACTIVITIES</span>
            <h2>What a day looks like.</h2>
            <p className="srf-lede">
              Surf, salt, food and sky — the retreat runs on a short list of
              good things, done well.
            </p>
          </BlurReveal>
          <div className="srf-activities">
            {ACTIVITIES.map((ac, i) => (
              <Reveal key={ac.n} delay={i * 0.04}>
                <article className="srf-activity">
                  <span className="srf-activity-n">{ac.n}</span>
                  <div className="srf-activity-tags">
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
          <div className="srf-activity-photos">
            <Image src={BEACH2_IMG} alt="The shoreline at golden hour" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={RESORT_IMG} alt="A coastal stay by the sea" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- your stay (sticky intro + steps) ---- */}
      <section className="srf-section srf-how-sec" id="stay">
        <div className="srf-wrap">
          <div className="srf-how">
            <div className="srf-how-sticky">
              <BlurReveal>
                <span className="srf-mono">(05) YOUR STAY</span>
                <h2>From arrival to departure in four steps.</h2>
                <p>
                  A short, honest process — so you know exactly what a stay
                  here feels like before you book.
                </p>
                <a className="srf-btn srf-btn-accent" href="#book">
                  Check availability
                </a>
              </BlurReveal>
            </div>
            <div className="srf-steps">
              {STEPS.map((st, i) => (
                <Reveal key={st.n} delay={i * 0.06}>
                  <article className="srf-step">
                    <span className="srf-step-n">{st.n}</span>
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
            <div className="srf-why">
              <h3>Why guests return</h3>
              <div className="srf-why-grid">
                {WHY.map((w) => (
                  <article key={w.title} className="srf-why-item">
                    <h4>{w.title}</h4>
                    <p>{w.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="srf-fullbleed srf-bw">
          <Image
            src={FEATURE_IMG}
            alt="A surfer riding a wave"
            width={2000}
            height={700}
            sizes="100vw"
          />
        </div>
      </section>

      {/* ---- guest voices (dark, tabbed) ---- */}
      <section className="srf-section srf-dark srf-speckle" id="voices">
        <div className="srf-wrap">
          <BlurReveal>
            <div className="srf-testi-head">
              <span className="srf-mono srf-mono-light">(06) GUEST VOICES</span>
              <h2>What a stay feels like.</h2>
            </div>
          </BlurReveal>
          <div className="srf-testi">
            <div className="srf-testi-tabs" role="tablist" aria-label="Guests">
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
            <div className="srf-testi-quote">
              <blockquote>“{t.quote}”</blockquote>
              <span className="srf-testi-org">{t.org}</span>
            </div>
            <div className="srf-testi-img">
              <Image
                src={OCEAN_IMG}
                alt="The Atlantic from the cliffs"
                width={800}
                height={1000}
                sizes="(max-width: 900px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="srf-section" id="faq">
        <div className="srf-wrap srf-faq-wrap">
          <BlurReveal>
            <span className="srf-mono">(07) FAQ</span>
            <h2>Before you book.</h2>
            <p className="srf-lede">
              The questions every guest asks us. Anything else — call {PHONE}.
            </p>
          </BlurReveal>
          <div className="srf-faq">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className={`srf-faq-item${openFaq === i ? " open" : ""}`}
              >
                <button
                  className="srf-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className="srf-faq-plus" aria-hidden="true">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && <p className="srf-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- book (dark CTA + form + photo strip) ---- */}
      <section className="srf-section srf-dark srf-speckle" id="book">
        <div className="srf-wrap">
          <BlurReveal>
            <div className="srf-cta-head">
              <span className="srf-mono srf-mono-light">(08) BOOK YOUR STAY</span>
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
              <div className="srf-form-ok">
                <strong>Thank you — your request is in.</strong>
                <p>
                  We have your details and will come back with availability
                  and a price, usually within one working day. If it is
                  urgent, call {PHONE}.
                </p>
              </div>
            ) : (
              <form className="srf-form" onSubmit={onBook}>
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
                  <select name="nights" defaultValue="7 nights">
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
                  Package
                  <select name="package" defaultValue="The Learn to Surf Week">
                    <option>The Learn to Surf Week</option>
                    <option>The Longboard Weekend</option>
                    <option>The Surf &amp; Stay</option>
                    <option>The Family Surf Week</option>
                    <option>The Solo Session</option>
                  </select>
                </label>
                <label>
                  Surf level
                  <select name="level" defaultValue="Never surfed">
                    <option>Never surfed</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </label>
                <label className="srf-full">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your trip, your group, or anything you need…"
                  />
                </label>
                <button className="srf-btn srf-btn-accent srf-btn-lg srf-full" type="submit">
                  Check availability
                </button>
                <p className="srf-form-note srf-full">
                  Prefer to talk? Call{" "}
                  <a href={`tel:${PHONE_HREF}`}>{PHONE}</a> or email{" "}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </form>
            )}
          </Reveal>
          <div className="srf-strip" aria-hidden="true">
            {[OCEAN_IMG, BEACH_IMG, BEACH2_IMG, RESORT_IMG, FEATURE_IMG].map(
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
      <footer className="srf-footer">
        <div className="srf-wrap">
          <BlurReveal>
            <p className="srf-footer-statement">
              Surf lessons, longboard mornings and slow evenings — salt air,
              long waves.
            </p>
          </BlurReveal>
          <div className="srf-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#packages">Packages</a></li>
                <li><a href="#setting">The coast</a></li>
                <li><a href="#activities">Activities</a></li>
                <li><a href="#stay">Your stay</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </nav>
            <nav aria-label="Packages">
              <h3>PACKAGES</h3>
              <ul>
                <li><a href="#packages">Learn to Surf Week</a></li>
                <li><a href="#packages">Longboard Weekend</a></li>
                <li><a href="#packages">Surf &amp; Stay</a></li>
                <li><a href="#packages">Family Surf Week</a></li>
                <li><a href="#packages">Solo Session</a></li>
              </ul>
            </nav>
            <div className="srf-footer-contact">
              <h3>CONTACT</h3>
              <p>
                <a href={`tel:${PHONE_HREF}`}>{PHONE}</a>
                <br />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <br />
                {PLACE}
              </p>
              <p className="srf-reg">
                Salt &amp; Swell Retreat · Ericeira, Portugal
              </p>
            </div>
            <div className="srf-footer-status">
              <h3>STATUS</h3>
              <p>● SURFABLE TODAY</p>
              <p>
                GUESTS BOOKED THIS SEASON{" "}
                <LiveTick start={980} step={2} intervalMs={3400} />
              </p>
            </div>
          </div>
          <span className="srf-footer-word">SALT &amp; SWELL</span>
          <span className="srf-footer-copy">
            © 2026 Salt &amp; Swell Retreat · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
