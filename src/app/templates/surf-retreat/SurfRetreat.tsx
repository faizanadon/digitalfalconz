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

/* Real coastal photography (all verified 200). The hero wave and the
   surfer feature image are B&W for the editorial look; the breaks,
   beach and rooms stay in full colour so the coast shows through. */
const HERO_IMG = U("1502680390469-be75c86b636f", 1800); // surf wave
const BEACH_IMG = U("1507525428034-b723cf961d3e", 1000); // beach
const BEACH2_IMG = U("1519046904884-53103b34b206", 1000); // beach shoreline
const OCEAN_IMG = U("1505142468610-359e7d316be0", 1000); // ocean
const RESORT_IMG = U("1520250497591-112f2f40a3f4", 1000); // coastal stay
const FEATURE_IMG = U("1468413253725-0d5181091126", 1800); // surfer

const CONDITIONS = [
  "SWELL 1.2 M SW",
  "WIND OFFSHORE NE 8 KT",
  "WATER 18°C",
  "BEST TIME 07:00",
  "TIDE RISING",
  "AIR 22°C",
  "VISIBILITY CLEAR",
  "SURFABLE TODAY",
];

const BREAKS = [
  {
    n: "01",
    name: "Ribeira d'Ilhas",
    level: "INTERMEDIATE – ADVANCED",
    swell: "SW · 1–2 M",
    bottom: "Reef / rock",
    tide: "Mid tide",
    text: "The world-class right point. Long, clean walls that hold their shape — the break the town is known for, and the one our coaches know best.",
    img: BEACH_IMG,
    alt: "A beach beside the surf",
  },
  {
    n: "02",
    name: "Coxos",
    level: "ADVANCED",
    swell: "W · 1.5–2.5 M",
    bottom: "Rock",
    tide: "Low – mid",
    text: "Fast, hollow and not for the faint-hearted. A right that barrels on its day — for experienced surfers only, with a coach watching.",
    img: OCEAN_IMG,
    alt: "The ocean off the coast",
  },
  {
    n: "03",
    name: "Praia do Sul",
    level: "BEGINNER",
    swell: "W · 0.5–1.5 M",
    bottom: "Sand",
    tide: "Any tide",
    text: "The mellow beach break where most of our guests stand up for the first time. Soft, forgiving and a two-minute walk from the house.",
    img: BEACH2_IMG,
    alt: "A sandy shoreline",
  },
  {
    n: "04",
    name: "Foz do Lizandro",
    level: "ALL LEVELS",
    swell: "NW · 1–2 M",
    bottom: "Sand",
    tide: "Mid – high",
    text: "River-mouth peaks with long rides and plenty of room. The pick for a relaxed session when the point breaks are crowded.",
    img: RESORT_IMG,
    alt: "A coastal stay by the sea",
  },
];

const PACKAGES = [
  {
    n: "01",
    title: "The Learn to Surf Week",
    text: "Seven nights, five lessons, boards and wetsuits included. For first-timers who want to stand up by Friday.",
    tag: "7 NIGHTS",
    price: "From €890 / person",
    includes: "5 lessons · boards · wetsuits",
  },
  {
    n: "02",
    title: "The Longboard Weekend",
    text: "Three nights, two longboard sessions and a cliff walk included. Slow, graceful rides on the mellow morning swell.",
    tag: "3 NIGHTS",
    price: "From €420 / person",
    includes: "2 sessions · board · cliff walk",
  },
  {
    n: "03",
    title: "The Surf & Stay",
    text: "Four nights, bed and breakfast, surf when you like. For improvers who want the coast without the schedule.",
    tag: "4 NIGHTS",
    price: "From €520 / person",
    includes: "B&B · board hire · tide times",
  },
  {
    n: "04",
    title: "The Family Surf Week",
    text: "Seven nights for the family, lessons for all ages. The kids learn in the morning, the parents surf in the afternoon.",
    tag: "7 NIGHTS",
    price: "From €2,400 / family",
    includes: "Lessons all ages · boards",
  },
  {
    n: "05",
    title: "The Solo Session",
    text: "Three nights, one-to-one coaching, your own pace. For the ones who came to get better, quietly.",
    tag: "3 NIGHTS",
    price: "From €610 / person",
    includes: "1-to-1 coaching · video review",
  },
];

const STATS = [
  { n: 10, suffix: "", label: "ROOMS BY THE SEA", caption: "Ten rooms, no crowds." },
  { n: 320, suffix: "", label: "SURFABLE DAYS A YEAR", caption: "The coast, most days." },
  { n: 48, suffix: "h", label: "BOOKING REPLY", caption: "At most — usually sooner." },
  { n: 96, suffix: "%", label: "WOULD RETURN", caption: "Guests who would come back." },
];

const ACTIVITIES = [
  { n: "01", name: "Surf lessons", text: "Daily lessons for every level, boards and wetsuits included.", tags: "DAILY · ALL LEVELS" },
  { n: "02", name: "Longboard mornings", text: "Slow, graceful rides on the mellow morning swell.", tags: "MORNINGS · LONGBOARD" },
  { n: "03", name: "Cliff walks", text: "The coastal path to the lighthouse, at golden hour.", tags: "EVENINGS · WALKS" },
  { n: "04", name: "Yoga at dawn", text: "Stretch on the deck before the first session.", tags: "DAWN · YOGA" },
  { n: "05", name: "Fish market morning", text: "Buy the catch with a local, cook it that evening.", tags: "MORNINGS · FOOD" },
  { n: "06", name: "Sunset session", text: "One last wave as the sun drops into the Atlantic.", tags: "EVENINGS · SURF" },
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
    role: "Guest, Bristol — Learn to Surf Week",
    quote:
      "I stood up on day three and have not stopped smiling since. The coaches are patient, the house is calm and the food is better than it has any right to be.",
  },
  {
    name: "Felix Hartmann",
    role: "Guest, Hamburg — Longboard Weekend",
    quote:
      "The morning longboard sessions are the best part of my year. Slow waves, warm water and nobody in a hurry.",
  },
  {
    name: "Lucy Chen",
    role: "Guest, Dublin — Solo Session",
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

export default function SurfRetreat() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [brk, setBrk] = useState(0);
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

  const b = BREAKS[brk];

  return (
    <div className="srf">
      {/* ---- header: compact bar with a live conditions chip ---- */}
      <header className={`srf-header${navHidden ? " srf-hidden" : ""}`}>
        <div className="srf-wrap srf-header-inner">
          <a className="srf-brand" href="#top" aria-label="Salt and Swell home">
            <span className="srf-mark" aria-hidden="true">≈</span>
            <span className="srf-brand-text">SALT &amp; SWELL</span>
          </a>
          <nav className="srf-pillnav" aria-label="Main">
            <a href="#breaks" className="on">Breaks</a>
            <a href="#packages">Packages</a>
            <a href="#activities">Activities</a>
            <a href="#stay">Your stay</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="srf-header-cta">
            <span className="srf-cond-chip">SWELL 1.2 M · OFFSHORE</span>
            <a className="srf-btn srf-btn-accent" href="#book">Check availability</a>
          </div>
        </div>
      </header>

      {/* ---- hero: compact, huge headline, B&W wave band ---- */}
      <section className="srf-hero" id="top">
        <div className="srf-wrap">
          <BlurReveal>
            <span className="srf-mono">(00) SALT &amp; SWELL — SURF RETREAT, ERICEIRA</span>
            <h1>
              Salt. <em>Swell.</em> Sun.
            </h1>
            <p className="srf-hero-sub">
              A surf retreat on the Ericeira coast — daily lessons, longboard
              mornings, cliff walks and slow evenings. Book direct for the
              best rate.
            </p>
            <div className="srf-hero-cta">
              <a className="srf-btn srf-btn-accent srf-btn-lg" href="#breaks">Explore the breaks ↓</a>
              <a className="srf-btn srf-btn-ghost srf-btn-lg" href="#book">Check availability</a>
            </div>
          </BlurReveal>
        </div>
        <div className="srf-hero-media">
          <Image src={HERO_IMG} alt="A wave breaking" fill priority sizes="100vw" />
        </div>
      </section>

      {/* ---- conditions ticker (Crox signature) ---- */}
      <div className="srf-ticker" aria-label="Surf conditions today">
        <div className="srf-ticker-track">
          {[...CONDITIONS, ...CONDITIONS, ...CONDITIONS].map((item, i) => (
            <span key={i}>{item} <i>◆</i></span>
          ))}
        </div>
      </div>

      {/* ---- break explorer: list drives a large detail panel ---- */}
      <section className="srf-section" id="breaks">
        <div className="srf-wrap">
          <BlurReveal>
            <span className="srf-mono">(01) THE BREAKS — PICK A SPOT</span>
            <h2>Four breaks, one coastline.</h2>
            <p className="srf-lede">
              Ericeira is a World Surfing Reserve, and the breaks are the
              reason. Select a break to see the swell, the bottom and the
              best tide — our coaches surf all four, every week.
            </p>
          </BlurReveal>
          <div className="srf-explorer">
            <div className="srf-break-list" role="tablist" aria-label="Surf breaks">
              {BREAKS.map((bk, i) => (
                <button
                  key={bk.n}
                  role="tab"
                  aria-selected={brk === i}
                  className={`srf-break-row${brk === i ? " on" : ""}`}
                  onClick={() => setBrk(i)}
                  onMouseEnter={() => setBrk(i)}
                >
                  <span className="srf-break-n">{bk.n}</span>
                  <span className="srf-break-name">{bk.name}</span>
                  <span className="srf-break-level">{bk.level}</span>
                  <span className="srf-break-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <div className="srf-break-detail">
              <div className="srf-break-img">
                <Image src={b.img} alt={b.alt} width={1000} height={700} sizes="(max-width: 900px) 100vw, 55vw" />
                <span className="srf-break-tag">{b.level}</span>
              </div>
              <div className="srf-break-body">
                <span className="srf-mono">BREAK {b.n} / 04</span>
                <h3>{b.name}</h3>
                <p>{b.text}</p>
                <dl className="srf-break-specs">
                  <div><dt>Swell</dt><dd>{b.swell}</dd></div>
                  <div><dt>Bottom</dt><dd>{b.bottom}</dd></div>
                  <div><dt>Best tide</dt><dd>{b.tide}</dd></div>
                </dl>
                <a className="srf-btn srf-btn-dark" href="#book">Surf this break →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- packages: price table ---- */}
      <section className="srf-section srf-pkg-sec" id="packages">
        <div className="srf-wrap">
          <BlurReveal>
            <span className="srf-mono">(02) PACKAGES — THE WHOLE OFFER</span>
            <h2>Five ways to surf the week.</h2>
            <p className="srf-lede">
              Every package includes coaching, boards and wetsuits. The table
              below is the whole offer — no hidden extras.
            </p>
          </BlurReveal>
          <div className="srf-table-wrap">
            <table className="srf-table">
              <thead>
                <tr>
                  <th>PACKAGE</th>
                  <th>LENGTH</th>
                  <th>INCLUDES</th>
                  <th>PRICE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {PACKAGES.map((p) => (
                  <tr key={p.n}>
                    <td>
                      <span className="srf-t-n">{p.n}</span>
                      <strong>{p.title}</strong>
                      <span className="srf-t-text">{p.text}</span>
                    </td>
                    <td>{p.tag}</td>
                    <td>{p.includes}</td>
                    <td className="srf-t-price">{p.price}</td>
                    <td><a className="srf-t-link" href="#book">Book →</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---- count-up stats ---- */}
      <section className="srf-stats">
        <div className="srf-wrap">
          <BlurReveal>
            <span className="srf-mono">(03) THE RETREAT IN NUMBERS</span>
          </BlurReveal>
          <div className="srf-stat-row">
            {STATS.map((st) => (
              <div key={st.label} className="srf-stat">
                <span className="srf-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="srf-stat-label">{st.label}</span>
                <span className="srf-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
          <p className="srf-note">Key figures for this template — placeholder figures, replace with your own.</p>
        </div>
      </section>

      {/* ---- activities: horizontal list ---- */}
      <section className="srf-section" id="activities">
        <div className="srf-wrap">
          <BlurReveal>
            <span className="srf-mono">(04) BEYOND THE WAVES</span>
            <h2>What a day looks like.</h2>
          </BlurReveal>
          <div className="srf-activities">
            {ACTIVITIES.map((ac, i) => (
              <Reveal key={ac.n} delay={i * 0.04}>
                <article className="srf-activity">
                  <span className="srf-activity-n">{ac.n}</span>
                  <h3>{ac.name}</h3>
                  <p>{ac.text}</p>
                  <span className="srf-activity-tags">{ac.tags}</span>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="srf-feature srf-bw">
            <Image src={FEATURE_IMG} alt="A surfer on a wave" width={2000} height={700} sizes="100vw" />
          </div>
        </div>
      </section>

      {/* ---- your stay: steps as a simple numbered strip ---- */}
      <section className="srf-section srf-stay-sec" id="stay">
        <div className="srf-wrap">
          <BlurReveal>
            <span className="srf-mono">(05) YOUR STAY</span>
            <h2>From arrival to departure in four steps.</h2>
          </BlurReveal>
          <div className="srf-steps">
            {STEPS.map((st, i) => (
              <Reveal key={st.n} delay={i * 0.06}>
                <article className="srf-step">
                  <span className="srf-step-n">{st.n}</span>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="srf-why">
            {WHY.map((w) => (
              <article key={w.title} className="srf-why-item">
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- guest voices: horizontal scroll strip of quote cards ---- */}
      <section className="srf-section srf-voices-sec" id="voices">
        <div className="srf-wrap">
          <BlurReveal>
            <div className="srf-sec-head">
              <div>
                <span className="srf-mono">(06) GUEST VOICES</span>
                <h2>What a week feels like.</h2>
              </div>
              <span className="srf-mono">SCROLL →</span>
            </div>
          </BlurReveal>
        </div>
        <div className="srf-quote-strip">
          {TESTIMONIALS.map((tst) => (
            <article key={tst.name} className="srf-quote-card">
              <p>“{tst.quote}”</p>
              <span><strong>{tst.name}</strong> — {tst.role}</span>
            </article>
          ))}
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="srf-section srf-faq-sec" id="faq">
        <div className="srf-wrap">
          <BlurReveal>
            <span className="srf-mono">(07) FAQ</span>
            <h2>Before you book.</h2>
            <p className="srf-lede">
              The questions every guest asks us. Anything else — call {PHONE}.
            </p>
          </BlurReveal>
          <div className="srf-faq">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`srf-faq-item${openFaq === i ? " open" : ""}`}>
                <button
                  className="srf-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className="srf-faq-plus" aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="srf-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- book: light, two-column ---- */}
      <section className="srf-book" id="book">
        <div className="srf-wrap srf-book-inner">
          <div className="srf-book-left">
            <BlurReveal>
              <span className="srf-mono">(08) BOOK YOUR STAY</span>
              <h2>Check availability for your dates.</h2>
              <p>
                Tell us when you would like to come and we will come back
                within 48 hours with availability and a price — usually much
                sooner. No obligation, no card taken.
              </p>
              <p className="srf-book-contact">
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
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---- footer: giant wordmark ---- */}
      <footer className="srf-footer">
        <div className="srf-wrap">
          <span className="srf-footer-word">SALT &amp; SWELL</span>
          <p className="srf-footer-statement">
            A surf retreat on the Ericeira coast — daily lessons, longboard
            mornings and slow evenings.
          </p>
          <div className="srf-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#breaks">Breaks</a></li>
                <li><a href="#packages">Packages</a></li>
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
            </div>
          </div>
          <span className="srf-footer-copy">
            © 2026 Salt &amp; Swell Retreat · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
