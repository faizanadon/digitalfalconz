"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

const PHONE = "+212 600 000 000";
const PHONE_HREF = "+212600000000";
const EMAIL = "stay@duneandstar.com";
const PLACE = "Merzouga, Morocco";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Real desert photography (all verified 200). The hero and the dune
   feature image are B&W for the editorial LEV look; the camps,
   activities and setting stay in full colour so the desert shows
   through. */
const HERO_IMG = U("1473580044384-7ba9967e16a0", 1800); // desert dunes
const CAMP_IMG = U("1547234935-80c7145ec969", 1000); // desert camp
const DUNES_IMG = U("1682686581551-867e0b208bd1", 1000); // sand dunes
const ROAD_IMG = U("1469854523086-cc02fe5d8800", 1000); // road trip van
const NIGHT_IMG = U("1518709268805-4e9042af9f23", 1000); // desert at night
const SAND_IMG = U("1509023464722-18d996393ca8", 1200); // desert sand
const FEATURE_IMG = U("1509316785289-025f5b846b35", 1800); // desert landscape

const TICKER = [
  "DESERT CAMPS",
  "CAMEL TREKS",
  "STARGAZING",
  "BERBER EVENINGS",
  "SUNRISE DUNES",
  "BOOK DIRECT",
];

const CAMPS = [
  {
    n: "01",
    title: "The Standard Tent",
    text: "Two guests, a real bed and a shared washhouse. The honest desert camp — simple, warm and quiet.",
    tag: "2 GUESTS",
    price: "From MAD 900 / night",
  },
  {
    n: "02",
    title: "The Deluxe Tent",
    text: "Two guests, a private washroom and a dune view. The most comfort in the camp, with room to stretch out.",
    tag: "2 GUESTS",
    price: "From MAD 1,400 / night",
  },
  {
    n: "03",
    title: "The Family Tent",
    text: "Four guests, two rooms and space for the kids. Built for families who want the desert and a place to gather.",
    tag: "4 GUESTS",
    price: "From MAD 2,200 / night",
  },
  {
    n: "04",
    title: "The Star Tent",
    text: "Two guests and a glass roof, so the sky is above your bed. The best sleep in the desert.",
    tag: "2 GUESTS",
    price: "From MAD 1,800 / night",
  },
  {
    n: "05",
    title: "The Solo Tent",
    text: "One guest, a lantern and the whole desert. For the ones who came to be alone with the sand and the stars.",
    tag: "1 GUEST",
    price: "From MAD 650 / night",
  },
];

const STATS = [
  { n: 18, suffix: "", label: "KEY STAT · 001", caption: "Tents in the camp" },
  { n: 300, suffix: "", label: "KEY STAT · 002", caption: "Clear nights a year" },
  { n: 48, suffix: "h", label: "KEY STAT · 003", caption: "Booking reply, at most" },
  { n: 97, suffix: "%", label: "KEY STAT · 004", caption: "Guests who would return" },
];

const ACTIVITIES = [
  { n: "01", name: "Camel trek", text: "Ride out at sunset, return by starlight.", tags: ["DAILY", "SUNSET"] },
  { n: "02", name: "Stargazing", text: "No light pollution. The Milky Way, every clear night.", tags: ["NIGHT", "CLEAR SKIES"] },
  { n: "03", name: "Sandboarding", text: "Down the big dune, as fast as you dare.", tags: ["DAY", "ADRENALINE"] },
  { n: "04", name: "Berber evening", text: "Tea, drums and stories around the fire.", tags: ["EVENINGS", "FIRE"] },
  { n: "05", name: "Sunrise dunes", text: "Up before dawn for the best light in the desert.", tags: ["DAWN", "GUIDED"] },
  { n: "06", name: "Oasis walk", text: "A green pocket in the sand, with a local guide.", tags: ["GUIDED", "HALF-DAY"] },
];

const STEPS = [
  {
    n: "01",
    title: "Arrive",
    text: "Meet us in Merzouga and ride out to the camp by camel or 4x4. Tea on arrival, shoes off, shoulders down.",
  },
  {
    n: "02",
    title: "Settle",
    text: "Your tent is ready, dinner is at 7 and the fire is lit. Nothing is asked of you tonight.",
  },
  {
    n: "03",
    title: "Explore",
    text: "Pick a camel trek, a dune walk or a doing-nothing day. Guides are on hand, and the desert starts at the tent door.",
  },
  {
    n: "04",
    title: "Depart",
    text: "Ride out after breakfast. Leave the desert a little lighter than you arrived.",
  },
];

const WHY = [
  { title: "Family-run, not a chain", text: "The same Berber family has run the camp since 2015. They know the dunes, the sky and your name by day two." },
  { title: "Small on purpose", text: "Eighteen tents only. No crowds, no queues, no noise — just the desert and the people who came for it." },
  { title: "Camel treks included", text: "Every stay includes a sunset camel trek. You do not need experience, only a willingness to ride." },
  { title: "Honest pricing", text: "The price you see is the price you pay. No resort fees, no surprises at checkout." },
];

const TESTIMONIALS = [
  {
    name: "Claire Dubois",
    role: "Guest, Paris",
    org: "Stayed in The Star Tent",
    quote:
      "I fell asleep under the stars and woke to the sun on the dunes. It is the quietest, clearest place I have ever slept.",
  },
  {
    name: "Jonas Weber",
    role: "Guest, Berlin",
    org: "Stayed in The Family Tent",
    quote:
      "The kids still talk about the camel ride and the drums around the fire. It is the first holiday where the whole family actually slowed down.",
  },
  {
    name: "Priya Nair",
    role: "Guest, London",
    org: "Stayed in The Solo Tent",
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

export default function DesertRetreat() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState(0);
  const [camp, setCamp] = useState(0);
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
  const s = CAMPS[camp];

  return (
    <div className="dst">
      {/* ---- header: floating pill nav ---- */}
      <header className={`dst-header${navHidden ? " dst-hidden" : ""}`}>
        <div className="dst-wrap dst-header-inner">
          <a className="dst-brand" href="#top" aria-label="Dune and Star home">
            <span className="dst-logo-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="dst-brand-text">DUNE &amp; STAR</span>
          </a>
          <nav className="dst-pillnav" aria-label="Main">
            <a href="#camps" className="on">Camps</a>
            <a href="#setting">The desert</a>
            <a href="#activities">Activities</a>
            <a href="#stay">Your stay</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="dst-header-cta">
            <a className="dst-phone" href={`tel:${PHONE_HREF}`}>
              {PHONE}
            </a>
            <a className="dst-btn dst-btn-accent" href="#book">
              Check availability
            </a>
          </div>
        </div>
      </header>

      {/* ---- hero: huge grotesque headline, mono spec strip, B&W photo ---- */}
      <section className="dst-hero" id="top">
        <div className="dst-wrap dst-hero-inner">
          <BlurReveal>
            <span className="dst-mono">(00) DUNE &amp; STAR — DESERT RETREAT, MERZOUGA</span>
            <h1>
              Silence, <em>stars</em> &amp; sand.
            </h1>
            <p className="dst-hero-sub">
              A desert camp in the Merzouga dunes — camel treks, stargazing,
              Berber evenings and slow, sun-warmed days. Book direct for the
              best rate.
            </p>
            <div className="dst-hero-cta">
              <a className="dst-btn dst-btn-accent dst-btn-lg" href="#book">
                Check availability →
              </a>
              <a className="dst-btn dst-btn-ghost dst-btn-lg" href="#camps">
                Explore the camps
              </a>
            </div>
          </BlurReveal>
          <div className="dst-specstrip" aria-label="Key facts">
            <span><b>45 MIN</b> From Merzouga</span>
            <span><b>18</b> Tents</span>
            <span><b>OCT–APR</b> Season</span>
            <span><b>DAILY</b> Camel treks</span>
            <span><b>48H</b> Booking reply</span>
          </div>
        </div>
        <div className="dst-hero-media">
          <Image
            src={HERO_IMG}
            alt="Sand dunes under a wide sky"
            fill
            priority
            sizes="100vw"
          />
          <div className="dst-hero-chip" aria-hidden="true">
            <span>● LIVE — DUNES 38°C, CLEAR SKY</span>
            <span>GUESTS IN CAMP NOW <LiveTick start={42} /></span>
          </div>
        </div>
      </section>

      {/* ---- marquee ticker ---- */}
      <div className="dst-ticker" aria-hidden="true">
        <div className="dst-ticker-track">
          {[...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i}>{item} <i>◆</i></span>
          ))}
        </div>
      </div>

      {/* ---- trust strip ---- */}
      <div className="dst-trustbar">
        <div className="dst-wrap dst-trustbar-inner">
          <span>✓ Book direct, best rate</span>
          <span>✓ Free cancellation to 14 days</span>
          <span>✓ Camel treks included</span>
          <span>✓ Family-run since 2015</span>
        </div>
      </div>

      {/* ---- count-up stats ---- */}
      <section className="dst-section dst-stats">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono">(01) THE CAMP IN NUMBERS</span>
            <h2>Small on purpose.</h2>
            <p className="dst-lede">
              Key figures for this template — placeholder figures, replace
              with your own.
            </p>
          </BlurReveal>
          <div className="dst-stat-grid">
            {STATS.map((st) => (
              <div key={st.label} className="dst-stat">
                <span className="dst-stat-label">{st.label}</span>
                <span className="dst-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="dst-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- camps: interactive rows, orange fill on select ---- */}
      <section className="dst-section" id="camps">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono">(02) CAMPS</span>
            <h2>Five tents, one desert.</h2>
            <p className="dst-lede">
              From a solo tent to a family tent — every stay includes dinner,
              a camel trek and a Berber evening. Select a camp to see the
              detail.
            </p>
          </BlurReveal>
          <div className="dst-stays">
            <div className="dst-stay-list" role="tablist" aria-label="Camps">
              {CAMPS.map((sv, i) => (
                <button
                  key={sv.n}
                  role="tab"
                  aria-selected={camp === i}
                  className={`dst-stay-row${camp === i ? " on" : ""}`}
                  onClick={() => setCamp(i)}
                  onMouseEnter={() => setCamp(i)}
                >
                  <span className="dst-stay-n">{sv.n}</span>
                  <span className="dst-stay-name">{sv.title}</span>
                  <span className="dst-stay-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <div className="dst-stay-detail">
              <span className="dst-mono">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <p className="dst-stay-price">{s.price}</p>
              <a className="dst-btn dst-btn-dark" href="#book">
                Check dates for this camp →
              </a>
            </div>
          </div>
          <div className="dst-stay-photos">
            <Image src={CAMP_IMG} alt="A desert camp among the dunes" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={DUNES_IMG} alt="Rippled sand dunes" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- the desert (dark) ---- */}
      <section className="dst-section dst-dark dst-speckle" id="setting">
        <div className="dst-wrap">
          <div className="dst-setting">
            <BlurReveal>
              <div>
                <span className="dst-mono dst-mono-light">(03) THE DESERT</span>
                <h2>
                  Nothing but sand, <em>sky and silence.</em>
                </h2>
                <p>
                  Dune &amp; Star sits deep in the Erg Chebbi dunes, an hour
                  from the nearest road. There is no wifi, no traffic and no
                  light pollution. The sand is fine, the sky is wide and the
                  nights are the clearest you will ever see.
                </p>
                <p>
                  The camp is not a hotel. There is no reception desk and no
                  minibar. There is a fire, a tea tent, a sky full of stars
                  and a silence you can hear.
                </p>
                <a className="dst-btn dst-btn-accent" href="#book">
                  See the season
                </a>
              </div>
            </BlurReveal>
            <Reveal delay={0.1}>
              <aside className="dst-highlight">
                <span className="dst-highlight-tag">THE STARGAZING HOUR</span>
                <h3>The sky, after dark</h3>
                <p>
                  Every clear night, the camp gathers on the big dune with
                  blankets and tea. No telescopes, no talks — just the Milky
                  Way, from horizon to horizon.
                </p>
                <ul>
                  <li>✓ Every clear night, 9pm</li>
                  <li>✓ Blankets and mint tea</li>
                  <li>✓ Shooting stars, most nights</li>
                  <li>✓ No lights after 10pm</li>
                </ul>
                <a className="dst-btn dst-btn-dark" href="#book">
                  Book a night under the stars →
                </a>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- activities ---- */}
      <section className="dst-section" id="activities">
        <div className="dst-wrap">
          <BlurReveal>
            <span className="dst-mono">(04) ACTIVITIES</span>
            <h2>What a day looks like.</h2>
            <p className="dst-lede">
              Camels, sand, fire and sky — the camp runs on a short list of
              good things, done well.
            </p>
          </BlurReveal>
          <div className="dst-activities">
            {ACTIVITIES.map((ac, i) => (
              <Reveal key={ac.n} delay={i * 0.04}>
                <article className="dst-activity">
                  <span className="dst-activity-n">{ac.n}</span>
                  <div className="dst-activity-tags">
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
          <div className="dst-activity-photos">
            <Image src={ROAD_IMG} alt="A van on a desert road" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={NIGHT_IMG} alt="The desert under a night sky" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- your stay (sticky intro + steps) ---- */}
      <section className="dst-section dst-how-sec" id="stay">
        <div className="dst-wrap">
          <div className="dst-how">
            <div className="dst-how-sticky">
              <BlurReveal>
                <span className="dst-mono">(05) YOUR STAY</span>
                <h2>From arrival to departure in four steps.</h2>
                <p>
                  A short, honest process — so you know exactly what a stay
                  here feels like before you book.
                </p>
                <a className="dst-btn dst-btn-accent" href="#book">
                  Check availability
                </a>
              </BlurReveal>
            </div>
            <div className="dst-steps">
              {STEPS.map((st, i) => (
                <Reveal key={st.n} delay={i * 0.06}>
                  <article className="dst-step">
                    <span className="dst-step-n">{st.n}</span>
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
            <div className="dst-why">
              <h3>Why guests return</h3>
              <div className="dst-why-grid">
                {WHY.map((w) => (
                  <article key={w.title} className="dst-why-item">
                    <h4>{w.title}</h4>
                    <p>{w.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="dst-fullbleed dst-bw">
          <Image
            src={FEATURE_IMG}
            alt="A wide desert landscape"
            width={2000}
            height={700}
            sizes="100vw"
          />
        </div>
      </section>

      {/* ---- guest voices (dark, tabbed) ---- */}
      <section className="dst-section dst-dark dst-speckle" id="voices">
        <div className="dst-wrap">
          <BlurReveal>
            <div className="dst-testi-head">
              <span className="dst-mono dst-mono-light">(06) GUEST VOICES</span>
              <h2>What a stay feels like.</h2>
            </div>
          </BlurReveal>
          <div className="dst-testi">
            <div className="dst-testi-tabs" role="tablist" aria-label="Guests">
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
            <div className="dst-testi-quote">
              <blockquote>“{t.quote}”</blockquote>
              <span className="dst-testi-org">{t.org}</span>
            </div>
            <div className="dst-testi-img">
              <Image
                src={SAND_IMG}
                alt="Fine desert sand in the late light"
                width={800}
                height={1000}
                sizes="(max-width: 900px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="dst-section" id="faq">
        <div className="dst-wrap dst-faq-wrap">
          <BlurReveal>
            <span className="dst-mono">(07) FAQ</span>
            <h2>Before you book.</h2>
            <p className="dst-lede">
              The questions every guest asks us. Anything else — call {PHONE}.
            </p>
          </BlurReveal>
          <div className="dst-faq">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className={`dst-faq-item${openFaq === i ? " open" : ""}`}
              >
                <button
                  className="dst-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className="dst-faq-plus" aria-hidden="true">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && <p className="dst-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- book (dark CTA + form + photo strip) ---- */}
      <section className="dst-section dst-dark dst-speckle" id="book">
        <div className="dst-wrap">
          <BlurReveal>
            <div className="dst-cta-head">
              <span className="dst-mono dst-mono-light">(08) BOOK YOUR STAY</span>
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
                    <option>5 nights</option>
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
                  Camp
                  <select name="camp" defaultValue="The Standard Tent">
                    <option>The Standard Tent</option>
                    <option>The Deluxe Tent</option>
                    <option>The Family Tent</option>
                    <option>The Star Tent</option>
                    <option>The Solo Tent</option>
                  </select>
                </label>
                <label>
                  Camel trek
                  <select name="trek" defaultValue="Sunset trek">
                    <option>Sunset trek</option>
                    <option>Sunrise trek</option>
                    <option>Full-day trek</option>
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
            {[SAND_IMG, CAMP_IMG, DUNES_IMG, NIGHT_IMG, ROAD_IMG].map(
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
      <footer className="dst-footer">
        <div className="dst-wrap">
          <BlurReveal>
            <p className="dst-footer-statement">
              Desert camps, camel treks and a sky full of stars — silence,
              stars and sand.
            </p>
          </BlurReveal>
          <div className="dst-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#camps">Camps</a></li>
                <li><a href="#setting">The desert</a></li>
                <li><a href="#activities">Activities</a></li>
                <li><a href="#stay">Your stay</a></li>
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
              <p className="dst-reg">
                Dune &amp; Star Camp · Merzouga, Morocco
              </p>
            </div>
            <div className="dst-footer-status">
              <h3>STATUS</h3>
              <p>● CAMP OPEN</p>
              <p>
                GUESTS BOOKED THIS SEASON{" "}
                <LiveTick start={860} step={2} intervalMs={3400} />
              </p>
            </div>
          </div>
          <span className="dst-footer-word">DUNE &amp; STAR</span>
          <span className="dst-footer-copy">
            © 2026 Dune &amp; Star Camp · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
