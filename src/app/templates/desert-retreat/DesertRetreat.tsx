"use client";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Motion";

const PHONE = "+212 600 000 000";
const PHONE_HREF = "+212600000000";
const EMAIL = "stay@duneandstar.com";
const PLACE = "Merzouga, Morocco";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Real desert photography (all verified 200). The hero and the feature
   landscape are B&W for the editorial look; the camp, activities and
   setting stay in full colour so the place shows through. */
const HERO_IMG = U("1473580044384-7ba9967e16a0", 1800); // desert dunes
const CAMP_IMG = U("1547234935-80c7145ec969", 1000); // desert camp
const DUNES_IMG = U("1682686581551-867e0b208bd1", 1000); // sand dunes
const ROAD_IMG = U("1469854523086-cc02fe5d8800", 1000); // road trip van
const NIGHT_IMG = U("1518709268805-4e9042af9f23", 1000); // desert at night
const SAND_IMG = U("1509023464722-18d996393ca8", 1200); // desert sand
const FEATURE_IMG = U("1509316785289-025f5b846b35", 1800); // desert landscape

const CAMPS = [
  {
    n: "01",
    title: "The Standard Tent",
    text: "Two guests, a real bed and a shared washhouse. The honest desert camp — simple, warm and quiet.",
    tag: "2 GUESTS",
    price: "From MAD 900 / night",
    wash: "Shared",
    view: "Dune view",
  },
  {
    n: "02",
    title: "The Deluxe Tent",
    text: "Two guests, a private washroom and a dune view. The most comfort in the camp, with room to stretch out.",
    tag: "2 GUESTS",
    price: "From MAD 1,400 / night",
    wash: "Private",
    view: "Dune view",
  },
  {
    n: "03",
    title: "The Family Tent",
    text: "Four guests, two rooms and space for the kids. Built for families who want the desert and a place to gather.",
    tag: "4 GUESTS",
    price: "From MAD 2,200 / night",
    wash: "Private",
    view: "Camp view",
  },
  {
    n: "04",
    title: "The Star Tent",
    text: "Two guests and a glass roof, so the sky is above your bed. The best sleep in the desert.",
    tag: "2 GUESTS",
    price: "From MAD 1,800 / night",
    wash: "Private",
    view: "Sky roof",
  },
  {
    n: "05",
    title: "The Solo Tent",
    text: "One guest, a lantern and the whole desert. For the ones who came to be alone with the sand and the stars.",
    tag: "1 GUEST",
    price: "From MAD 650 / night",
    wash: "Shared",
    view: "Dune view",
  },
];

const ACTIVITIES = [
  { time: "17:30", name: "Camel trek", text: "Ride out at sunset, return by starlight.", tags: "DAILY · SUNSET" },
  { time: "21:00", name: "Stargazing", text: "No light pollution. The Milky Way, every clear night.", tags: "NIGHT · CLEAR SKIES" },
  { time: "10:00", name: "Sandboarding", text: "Down the big dune, as fast as you dare.", tags: "DAY · ADRENALINE" },
  { time: "19:00", name: "Berber evening", text: "Tea, drums and stories around the fire.", tags: "EVENINGS · FIRE" },
  { time: "05:30", name: "Sunrise dunes", text: "Up before dawn for the best light in the desert.", tags: "DAWN · GUIDED" },
  { time: "09:00", name: "Oasis walk", text: "A green pocket in the sand, with a local guide.", tags: "GUIDED · HALF-DAY" },
];

const JOURNEY = [
  { time: "15:00", title: "Arrive", text: "Meet us in Merzouga and ride out to the camp by camel or 4x4. Tea on arrival, shoes off, shoulders down." },
  { time: "19:00", title: "Settle", text: "Your tent is ready, dinner is at 7 and the fire is lit. Nothing is asked of you tonight." },
  { time: "07:00", title: "Explore", text: "Pick a camel trek, a dune walk or a doing-nothing day. Guides are on hand, and the desert starts at the tent door." },
  { time: "10:00", title: "Depart", text: "Ride out after breakfast. Leave the desert a little lighter than you arrived." },
];

const WHY = [
  { title: "Family-run, not a chain", text: "The same Berber family has run the camp since 2015. They know the dunes, the sky and your name by day two." },
  { title: "Small on purpose", text: "Eighteen tents only. No crowds, no queues, no noise — just the desert and the people who came for it." },
  { title: "Camel treks included", text: "Every stay includes a sunset camel trek. You do not need experience, only a willingness to ride." },
  { title: "Honest pricing", text: "The price you see is the price you pay. No resort fees, no surprises at checkout." },
];

const TESTIMONIALS = [
  {
    date: "12 MAR 2026",
    name: "Claire Dubois",
    role: "Guest, Paris — The Star Tent",
    quote:
      "I fell asleep under the stars and woke to the sun on the dunes. It is the quietest, clearest place I have ever slept.",
  },
  {
    date: "28 FEB 2026",
    name: "Jonas Weber",
    role: "Guest, Berlin — The Family Tent",
    quote:
      "The kids still talk about the camel ride and the drums around the fire. It is the first holiday where the whole family actually slowed down.",
  },
  {
    date: "09 JAN 2026",
    name: "Priya Nair",
    role: "Guest, London — The Solo Tent",
    quote:
      "I came alone, walked every day and watched the sky every night. The Solo Tent is exactly as described — small, quiet and perfect.",
  },
];

const FAQS = [
  {
    q: "When is the best time to visit?",
    a: "October to April, when the days are warm and the nights are cool. Summer in the desert is very hot, so the camp is closed from June to September.",
  },
  {
    q: "How do I get there?",
    a: "Fly to Marrakech or Fes, then take the bus or a private transfer to Merzouga — about 9 hours from Marrakech. We meet you in Merzouga and take you to the camp by camel or 4x4.",
  },
  {
    q: "Is the camp suitable for children?",
    a: "Yes. The Family Tent sleeps four and the camel treks include short, gentle rides for younger legs. Children under 6 stay free.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 14 days before arrival. Inside 14 days we keep the first night, and the rest is refunded.",
  },
  {
    q: "What should I pack?",
    a: "Light layers for the day, something warm for the night, a hat, sunscreen and a good book. We provide bedding, towels and drinking water.",
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

/** A live clock, ticking every second. */
function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return <>--:--:--</>;
  return <>{now.toLocaleTimeString("en-GB", { hour12: false })}</>;
}

/** Approximate moon phase from the current date (synodic month). */
function moonPhase(): { name: string; illum: number } {
  const synodic = 29.53058867;
  const known = Date.UTC(2000, 0, 6, 18, 14) / 86400000;
  const days = Date.now() / 86400000 - known;
  const age = ((days % synodic) + synodic) % synodic;
  const illum = Math.round(((1 - Math.cos((age / synodic) * Math.PI * 2)) / 2) * 100);
  const names = [
    "NEW MOON", "WAXING CRESCENT", "FIRST QUARTER", "WAXING GIBBOUS",
    "FULL MOON", "WANING GIBBOUS", "LAST QUARTER", "WANING CRESCENT",
  ];
  const idx = Math.floor((age / synodic) * 8 + 0.5) % 8;
  return { name: names[idx], illum };
}

export default function DesertRetreat() {
  const [sent, setSent] = useState(false);
  const [temp, setTemp] = useState(31);
  const [bookTent, setBookTent] = useState("The Star Tent");
  const moon = moonPhase();

  useEffect(() => {
    const id = setInterval(() => {
      setTemp((t) => Math.min(38, Math.max(24, t + (Math.random() > 0.5 ? 1 : -1))));
    }, 9000);
    return () => clearInterval(id);
  }, []);

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="dst">
      {/* ---- header: dark, thin, mono, live status ---- */}
      <header className="dst-header">
        <div className="dst-wrap dst-header-inner">
          <a className="dst-brand" href="#top" aria-label="Dune and Star home">
            <span className="dst-mark" aria-hidden="true">✦</span>
            <span className="dst-brand-text">DUNE &amp; STAR</span>
          </a>
          <nav className="dst-nav" aria-label="Main">
            <a href="#camps">Camps</a>
            <a href="#log">Field log</a>
            <a href="#sky">Sky report</a>
            <a href="#notes">Guest notes</a>
            <a href="#faq">FAQ</a>
          </nav>
          <span className="dst-status"><i /> CAMP OPEN · <LiveClock /></span>
        </div>
      </header>

      {/* ---- hero: dark, HUD telemetry is the focal element ---- */}
      <section className="dst-hero" id="top">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono dst-mono-light">(00) DUNE &amp; STAR — DESERT RETREAT, MERZOUGA</span>
            <h1>
              Silence, <em>stars</em> &amp; sand.
            </h1>
            <p className="dst-hero-sub">
              A desert camp in the Merzouga dunes — camel treks, stargazing,
              Berber evenings and slow, sun-warmed days. Book direct for the
              best rate.
            </p>
          </BlurReveal>
          {/* live HUD / telemetry strip */}
          <div className="dst-hud" aria-label="Live desert telemetry">
            <div className="dst-hud-tile">
              <span className="dst-hud-label">TEMPERATURE NOW</span>
              <span className="dst-hud-num">{temp}°C</span>
              <span className="dst-hud-sub">DAYTIME · DROPS TO 14°C AT NIGHT</span>
            </div>
            <div className="dst-hud-tile">
              <span className="dst-hud-label">STARS VISIBLE TONIGHT</span>
              <span className="dst-hud-num"><LiveTick start={2841} step={1} intervalMs={7000} /></span>
              <span className="dst-hud-sub">COUNTING UP AS THE SKY DARKENS</span>
            </div>
            <div className="dst-hud-tile">
              <span className="dst-hud-label">MOON PHASE</span>
              <span className="dst-hud-num">{moon.name}</span>
              <span className="dst-hud-sub">{moon.illum}% ILLUMINATED</span>
            </div>
            <div className="dst-hud-tile">
              <span className="dst-hud-label">WIND</span>
              <span className="dst-hud-num">12 KM/H</span>
              <span className="dst-hud-sub">NE · LIGHT, DUNES STABLE</span>
            </div>
            <div className="dst-hud-tile">
              <span className="dst-hud-label">CAMP TIME</span>
              <span className="dst-hud-num"><LiveClock /></span>
              <span className="dst-hud-sub">MERZOUGA · GMT+1</span>
            </div>
            <div className="dst-hud-tile dst-hud-cta">
              <span className="dst-hud-label">NEXT SUNSET TREK</span>
              <span className="dst-hud-num">17:30</span>
              <span className="dst-hud-sub"><a href="#book">RESERVE A PLACE →</a></span>
            </div>
          </div>
          <div className="dst-hero-cta">
            <a className="dst-btn dst-btn-accent dst-btn-lg" href="#book">Check availability →</a>
            <a className="dst-btn dst-btn-ghost dst-btn-lg" href="#camps">See the tents</a>
          </div>
        </div>
        <div className="dst-hero-media">
          <Image src={HERO_IMG} alt="Sand dunes in the desert" fill priority sizes="100vw" />
        </div>
      </section>

      {/* ---- camps: spec table, not cards ---- */}
      <section className="dst-section" id="camps">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono">(01) CAMPS — SPECIFICATION</span>
            <h2>Five tents, one desert.</h2>
            <p className="dst-lede">
              Every stay includes breakfast, a sunset camel trek and Berber
              evenings. The table below is the whole offer — no hidden extras.
            </p>
          </BlurReveal>
          <div className="dst-table-wrap">
            <table className="dst-table">
              <thead>
                <tr>
                  <th>TENT</th>
                  <th>GUESTS</th>
                  <th>WASHROOM</th>
                  <th>VIEW</th>
                  <th>PRICE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {CAMPS.map((c) => (
                  <tr key={c.n}>
                    <td>
                      <span className="dst-t-n">{c.n}</span>
                      <strong>{c.title}</strong>
                      <span className="dst-t-text">{c.text}</span>
                    </td>
                    <td>{c.tag}</td>
                    <td>{c.wash}</td>
                    <td>{c.view}</td>
                    <td className="dst-t-price">{c.price}</td>
                    <td><a className="dst-t-link" href="#book" onClick={() => setBookTent(c.title)}>Book →</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dst-camp-photos">
            <Image src={CAMP_IMG} alt="Tents in a desert camp" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={DUNES_IMG} alt="Sand dunes" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- field log: activities as a timed log ---- */}
      <section className="dst-section dst-log-sec" id="log">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono">(02) FIELD LOG — A DAY IN THE DESERT</span>
            <h2>What a day looks like.</h2>
          </BlurReveal>
          <ol className="dst-log">
            {ACTIVITIES.map((ac) => (
              <li key={ac.name} className="dst-log-row">
                <span className="dst-log-time">{ac.time}</span>
                <div>
                  <h3>{ac.name}</h3>
                  <p>{ac.text}</p>
                </div>
                <span className="dst-log-tags">{ac.tags}</span>
              </li>
            ))}
          </ol>
          <div className="dst-log-photos">
            <Image src={ROAD_IMG} alt="A van on a desert road" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={NIGHT_IMG} alt="The desert at night" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- live stats: counters that keep ticking ---- */}
      <section className="dst-live-stats">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono dst-mono-light">(03) THE CAMP, LIVE</span>
          </BlurReveal>
          <div className="dst-live-grid">
            <div className="dst-live-stat">
              <span className="dst-live-num">18</span>
              <span className="dst-live-label">TENTS IN THE CAMP</span>
            </div>
            <div className="dst-live-stat">
              <span className="dst-live-num">300</span>
              <span className="dst-live-label">CLEAR NIGHTS A YEAR</span>
            </div>
            <div className="dst-live-stat">
              <span className="dst-live-num"><LiveTick start={1240} step={2} intervalMs={3400} /></span>
              <span className="dst-live-label">GUESTS BOOKED THIS SEASON</span>
            </div>
            <div className="dst-live-stat">
              <span className="dst-live-num">97%</span>
              <span className="dst-live-label">WOULD RETURN</span>
            </div>
          </div>
          <p className="dst-note">Key figures for this template — placeholder figures, replace with your own.</p>
        </div>
      </section>

      {/* ---- the setting + sky report ---- */}
      <section className="dst-section" id="sky">
        <div className="dst-wrap">
          <div className="dst-setting">
            <BlurReveal>
              <div>
                <span className="dst-mono">(04) THE SETTING</span>
                <h2>
                  The dunes, <em>the sky,</em> nothing else.
                </h2>
                <p>
                  Dune &amp; Star sits in the Erg Chebbi dunes, an hour from
                  the nearest town by camel or 4x4. There is no road, no
                  streetlight and no sound but wind and sand. The camp is
                  eighteen tents, a fire and a sky that does the talking.
                </p>
                <p>
                  The camp is not a hotel. There is no reception desk, no
                  minibar, no television. There is tea, a lantern, a dune to
                  climb and a sky full of stars.
                </p>
              </div>
            </BlurReveal>
            <aside className="dst-sky">
              <span className="dst-mono">SKY REPORT — TONIGHT</span>
              <dl>
                <div><dt>Moon</dt><dd>{moon.name} · {moon.illum}%</dd></div>
                <div><dt>Cloud cover</dt><dd>0% · CLEAR</dd></div>
                <div><dt>Visibility</dt><dd>EXCELLENT</dd></div>
                <div><dt>Best viewing</dt><dd>22:00 – 02:00</dd></div>
                <div><dt>Temperature</dt><dd>{temp}°C, falling to 14°C</dd></div>
              </dl>
              <a className="dst-btn dst-btn-accent" href="#book">Book a clear night →</a>
            </aside>
          </div>
          <div className="dst-feature dst-bw">
            <Image src={FEATURE_IMG} alt="A desert landscape" width={2000} height={700} sizes="100vw" />
          </div>
          <div className="dst-why">
            {WHY.map((w) => (
              <article key={w.title} className="dst-why-item">
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- journey: timed log ---- */}
      <section className="dst-section dst-journey-sec">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono">(05) YOUR STAY — BY THE CLOCK</span>
            <h2>From arrival to departure.</h2>
          </BlurReveal>
          <ol className="dst-journey">
            {JOURNEY.map((j) => (
              <li key={j.title} className="dst-journey-row">
                <span className="dst-journey-time">{j.time}</span>
                <div>
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- guest notes: field-note log entries ---- */}
      <section className="dst-section dst-notes-sec" id="notes">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono">(06) GUEST NOTES — FIELD LOG</span>
            <h2>What a stay feels like.</h2>
          </BlurReveal>
          <div className="dst-notes">
            {TESTIMONIALS.map((tst) => (
              <Reveal key={tst.name}>
                <article className="dst-note-card">
                  <span className="dst-note-date">{tst.date}</span>
                  <blockquote>“{tst.quote}”</blockquote>
                  <span className="dst-note-who"><strong>{tst.name}</strong> — {tst.role}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ: logbook, answers always visible ---- */}
      <section className="dst-section dst-faq-sec" id="faq">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono">(07) LOGBOOK — BEFORE YOU BOOK</span>
            <h2>Questions, answered.</h2>
            <p className="dst-lede">
              The questions every guest asks us. Anything else — call {PHONE}.
            </p>
          </BlurReveal>
          <dl className="dst-logbook">
            {FAQS.map((f, i) => (
              <div key={f.q} className="dst-logbook-row">
                <dt><span className="dst-logbook-n">{String(i + 1).padStart(2, "0")}</span> {f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- book: dark, compact ---- */}
      <section className="dst-book" id="book">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono dst-mono-light">(08) BOOK YOUR STAY</span>
            <h2>Check availability for your dates.</h2>
            <p>
              Tell us when you would like to come and we will come back
              within 48 hours with availability and a price — usually much
              sooner. No obligation, no card taken.
            </p>
          </BlurReveal>
          <Reveal>
            {sent ? (
              <div className="dst-form-ok">
                <strong>Thank you — your request is in.</strong>
                <p>
                  We have your details and will come back with availability
                  and a price, usually within one working day. If it is
                  urgent, call {PHONE}.
                </p>
              </div>
            ) : (
              <form className="dst-form" onSubmit={onBook}>
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
                  <select name="nights" defaultValue="3 nights">
                    <option>1 night</option>
                    <option>2 nights</option>
                    <option>3 nights</option>
                    <option>4 nights</option>
                    <option>7 nights</option>
                  </select>
                </label>
                <label>
                  Guests
                  <select name="guests" defaultValue="2 guests">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                  </select>
                </label>
                <label>
                  Tent
                  <select
                    name="tent"
                    value={bookTent}
                    onChange={(e) => setBookTent(e.target.value)}
                  >
                    <option>The Standard Tent</option>
                    <option>The Deluxe Tent</option>
                    <option>The Family Tent</option>
                    <option>The Star Tent</option>
                    <option>The Solo Tent</option>
                  </select>
                </label>
                <label>
                  Arrival by
                  <select name="arrival-by" defaultValue="Camel">
                    <option>Camel</option>
                    <option>4x4</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label className="dst-full">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your trip, your group, or anything you need…"
                  />
                </label>
                <button className="dst-btn dst-btn-accent dst-btn-lg dst-full" type="submit">
                  Check availability
                </button>
                <p className="dst-form-note dst-full">
                  Prefer to talk? Call{" "}
                  <a href={`tel:${PHONE_HREF}`}>{PHONE}</a> or email{" "}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </form>
            )}
          </Reveal>
          <div className="dst-strip" aria-hidden="true">
            {[SAND_IMG, CAMP_IMG, DUNES_IMG, NIGHT_IMG].map((src, i) => (
              <Image key={i} src={src} alt="" width={500} height={400} sizes="300px" />
            ))}
          </div>
        </div>
      </section>

      {/* ---- footer: dark, giant amber wordmark ---- */}
      <footer className="dst-footer">
        <div className="dst-wrap">
          <span className="dst-footer-word">DUNE &amp; STAR</span>
          <p className="dst-footer-statement">
            A desert camp in the Merzouga dunes — camel treks, stargazing and
            slow, sun-warmed days.
          </p>
          <div className="dst-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#camps">Camps</a></li>
                <li><a href="#log">Field log</a></li>
                <li><a href="#sky">Sky report</a></li>
                <li><a href="#notes">Guest notes</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </nav>
            <nav aria-label="Camps">
              <h3>CAMPS</h3>
              <ul>
                <li><a href="#camps">The Standard Tent</a></li>
                <li><a href="#camps">The Deluxe Tent</a></li>
                <li><a href="#camps">The Family Tent</a></li>
                <li><a href="#camps">The Star Tent</a></li>
                <li><a href="#camps">The Solo Tent</a></li>
              </ul>
            </nav>
            <div className="dst-footer-contact">
              <h3>CONTACT</h3>
              <p>
                <a href={`tel:${PHONE_HREF}`}>{PHONE}</a>
                <br />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <br />
                {PLACE}
              </p>
              <p className="dst-reg">Dune &amp; Star Camp · Merzouga, Morocco</p>
            </div>
            <div className="dst-footer-status">
              <h3>STATUS</h3>
              <p>● CAMP OPEN · OCT–APR</p>
              <p>
                CAMP TIME <LiveClock />
              </p>
            </div>
          </div>
          <span className="dst-footer-copy">
            © 2026 Dune &amp; Star Camp · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
