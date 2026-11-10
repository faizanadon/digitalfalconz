"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

const PHONE = "+44 1608 000 000";
const PHONE_HREF = "+441608000000";
const EMAIL = "stay@emberandoak.co.uk";
const PLACE = "The Cotswolds, England";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Real camp photography (all verified 200). The hero and the night
   feature image are B&W for the editorial LEV look; the tents,
   activities and setting stay in full colour so the camp shows
   through. */
const HERO_IMG = U("1504280390367-361c6d9f38f4", 1800); // tent under night sky
const TENT_IMG = U("1523987355523-c7b5b0dd90a7", 1000); // camping tent
const FIRE_IMG = U("1470240731273-7821a6eeb6bd", 1000); // campfire
const CAMP_IMG = U("1510312305653-8ed496efae75", 1000); // campsite
const STARS_IMG = U("1517821362941-f7f753200fef", 1000); // tent under stars
const GLAMP_IMG = U("1537225228614-56cc3556d7ed", 1200); // glamping tent

const TICKER = [
  "SAFARI TENTS",
  "CAMPFIRE EVENINGS",
  "WOODLAND WALKS",
  "OUTDOOR COOKING",
  "SLOW MORNINGS",
  "BOOK DIRECT",
];

const TENTS = [
  {
    n: "01",
    title: "The Bell Tent",
    text: "Two guests, a real bed and a lantern. The classic camp — simple, warm and quiet, with a fire pit outside.",
    tag: "2 GUESTS",
    price: "From £95 / night",
  },
  {
    n: "02",
    title: "The Safari Tent",
    text: "Four guests, a proper bed, a wood stove and a deck. The most comfort in the camp, with room to spread out.",
    tag: "4 GUESTS",
    price: "From £160 / night",
  },
  {
    n: "03",
    title: "The Stargazer",
    text: "Two guests and a clear roof panel, so the sky is above your bed. The best sleep in the field.",
    tag: "2 GUESTS",
    price: "From £140 / night",
  },
  {
    n: "04",
    title: "The Family Tent",
    text: "Six guests, two sleeping areas and a kitchen corner. Built for families who want the woods and a place to cook together.",
    tag: "6 GUESTS",
    price: "From £220 / night",
  },
  {
    n: "05",
    title: "The Solo Tent",
    text: "One guest, a reading chair and a path straight into the woods. For the ones who came to be alone with the trees.",
    tag: "1 GUEST",
    price: "From £75 / night",
  },
];

const STATS = [
  { n: 14, suffix: "", label: "KEY STAT · 001", caption: "Tents in the field" },
  { n: 40, suffix: "", label: "KEY STAT · 002", caption: "Acres of woodland" },
  { n: 48, suffix: "h", label: "KEY STAT · 003", caption: "Booking reply, at most" },
  { n: 99, suffix: "%", label: "KEY STAT · 004", caption: "Guests who would return" },
];

const ACTIVITIES = [
  { n: "01", name: "Campfire evenings", text: "Wood smoke, stories, no screens after dark.", tags: ["EVENINGS", "FIRE"] },
  { n: "02", name: "Woodland walks", text: "Marked trails from the field, with a guide who knows them.", tags: ["DAILY", "ALL LEVELS"] },
  { n: "03", name: "Outdoor cooking", text: "Fire, cast iron and whatever is in season.", tags: ["EVENINGS", "FOOD"] },
  { n: "04", name: "Dawn chorus", text: "Up early for the birdsong, coffee in hand.", tags: ["DAWN", "GUIDED"] },
  { n: "05", name: "Foraging walk", text: "Mushrooms, herbs and berries with a local guide.", tags: ["SEASONAL", "GUIDED"] },
  { n: "06", name: "Stargazing", text: "No light pollution. The Milky Way, every clear night.", tags: ["NIGHT", "CLEAR SKIES"] },
];

const STEPS = [
  {
    n: "01",
    title: "Arrive",
    text: "Check in from 3pm. Tea by the fire, boots off, shoulders down. The woods do the rest.",
  },
  {
    n: "02",
    title: "Settle",
    text: "Your tent is ready, the stove is lit and dinner is at 7. Nothing is asked of you tonight.",
  },
  {
    n: "03",
    title: "Explore",
    text: "Pick a woodland walk, a cooking session or a doing-nothing day. Guides are on hand, and the trails start at the field.",
  },
  {
    n: "04",
    title: "Depart",
    text: "Check out at 11am. Leave the woods a little lighter than you arrived.",
  },
];

const WHY = [
  { title: "Family-run, not a chain", text: "The same family has run the camp since 2018. They know the woods, the weather and your name by day two." },
  { title: "Small on purpose", text: "Fourteen tents only. No crowds, no queues, no noise — just the woods and the people who came for them." },
  { title: "Fire included", text: "Every stay includes firewood, a fire pit and someone to light it. You do not need experience, only a willingness to sit." },
  { title: "Honest pricing", text: "The price you see is the price you pay. No resort fees, no surprises at checkout." },
];

const TESTIMONIALS = [
  {
    name: "Emma Collins",
    role: "Guest, Oxford",
    org: "Stayed in The Safari Tent",
    quote:
      "We arrived tired and left rested in a way I did not think was possible in three days. The tent was warm, the fire was lit and nobody hurried us at any point.",
  },
  {
    name: "David Okafor",
    role: "Guest, London",
    org: "Stayed in The Family Tent",
    quote:
      "The kids still talk about the campfire and the foraging walk. It is the first holiday where the whole family actually slowed down.",
  },
  {
    name: "Grace Liu",
    role: "Guest, Manchester",
    org: "Stayed in The Solo Tent",
    quote:
      "I came alone, walked every day and read by the fire every night. The Solo Tent is exactly as described — small, quiet and perfect.",
  },
];

const FAQS = [
  {
    q: "When is the best time to visit?",
    a: "April to October, when the woods are green and the nights are mild. The camp is closed in winter, when the field rests.",
  },
  {
    q: "How do I get there?",
    a: "Drive to the farm gate — there is parking on site — or take the train to Moreton-in-Marsh and we will collect you. The camp is a ten-minute walk from the car park.",
  },
  {
    q: "Is the camp suitable for children?",
    a: "Yes. The Family Tent sleeps six and the woodland walks include short, flat trails for younger legs. Children under 6 stay free.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 14 days before arrival. Inside 14 days we keep the first night, and the rest is refunded.",
  },
  {
    q: "What should I pack?",
    a: "Warm layers for the evening, sturdy shoes, a torch and a good book. We provide bedding, towels, firewood and drinking water.",
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

export default function GlampingRetreat() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState(0);
  const [tent, setTent] = useState(0);
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
  const s = TENTS[tent];

  return (
    <div className="glp">
      {/* ---- header: floating pill nav ---- */}
      <header className={`glp-header${navHidden ? " glp-hidden" : ""}`}>
        <div className="glp-wrap glp-header-inner">
          <a className="glp-brand" href="#top" aria-label="Ember and Oak home">
            <span className="glp-logo-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="glp-brand-text">EMBER &amp; OAK</span>
          </a>
          <nav className="glp-pillnav" aria-label="Main">
            <a href="#tents" className="on">Tents</a>
            <a href="#setting">The woods</a>
            <a href="#activities">Activities</a>
            <a href="#stay">Your stay</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="glp-header-cta">
            <a className="glp-phone" href={`tel:${PHONE_HREF}`}>
              {PHONE}
            </a>
            <a className="glp-btn glp-btn-accent" href="#book">
              Check availability
            </a>
          </div>
        </div>
      </header>

      {/* ---- hero: huge grotesque headline, mono spec strip, B&W photo ---- */}
      <section className="glp-hero" id="top">
        <div className="glp-wrap glp-hero-inner">
          <BlurReveal>
            <span className="glp-mono">(00) EMBER &amp; OAK — GLAMPING RETREAT, THE COTSWOLDS</span>
            <h1>
              Comfort, <em>in the wild.</em>
            </h1>
            <p className="glp-hero-sub">
              Safari tents in forty acres of Cotswold woodland — campfire
              evenings, woodland walks, outdoor cooking and slow mornings.
              Book direct for the best rate.
            </p>
            <div className="glp-hero-cta">
              <a className="glp-btn glp-btn-accent glp-btn-lg" href="#book">
                Check availability →
              </a>
              <a className="glp-btn glp-btn-ghost glp-btn-lg" href="#tents">
                Explore the tents
              </a>
            </div>
          </BlurReveal>
          <div className="glp-specstrip" aria-label="Key facts">
            <span><b>40 ACRES</b> Woodland</span>
            <span><b>14</b> Tents</span>
            <span><b>APR–OCT</b> Season</span>
            <span><b>DAILY</b> Campfire</span>
            <span><b>48H</b> Booking reply</span>
          </div>
        </div>
        <div className="glp-hero-media">
          <Image
            src={HERO_IMG}
            alt="A tent under the night sky"
            fill
            priority
            sizes="100vw"
          />
          <div className="glp-hero-chip" aria-hidden="true">
            <span>● LIVE — WOODS 12°C, CLEAR SKY</span>
            <span>GUESTS IN CAMP NOW <LiveTick start={38} /></span>
          </div>
        </div>
      </section>

      {/* ---- marquee ticker ---- */}
      <div className="glp-ticker" aria-hidden="true">
        <div className="glp-ticker-track">
          {[...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i}>{item} <i>◆</i></span>
          ))}
        </div>
      </div>

      {/* ---- trust strip ---- */}
      <div className="glp-trustbar">
        <div className="glp-wrap glp-trustbar-inner">
          <span>✓ Book direct, best rate</span>
          <span>✓ Free cancellation to 14 days</span>
          <span>✓ Firewood included</span>
          <span>✓ Family-run since 2018</span>
        </div>
      </div>

      {/* ---- count-up stats ---- */}
      <section className="glp-section glp-stats">
        <div className="glp-wrap">
          <BlurReveal>
            <span className="glp-mono">(01) THE CAMP IN NUMBERS</span>
            <h2>Small on purpose.</h2>
            <p className="glp-lede">
              Key figures for this template — placeholder figures, replace
              with your own.
            </p>
          </BlurReveal>
          <div className="glp-stat-grid">
            {STATS.map((st) => (
              <div key={st.label} className="glp-stat">
                <span className="glp-stat-label">{st.label}</span>
                <span className="glp-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="glp-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- tents: interactive rows, orange fill on select ---- */}
      <section className="glp-section" id="tents">
        <div className="glp-wrap">
          <BlurReveal>
            <span className="glp-mono">(02) TENTS</span>
            <h2>Five tents, one field.</h2>
            <p className="glp-lede">
              From a solo tent to a family tent — every stay includes
              firewood, breakfast and a campfire every evening. Select a tent
              to see the detail.
            </p>
          </BlurReveal>
          <div className="glp-stays">
            <div className="glp-stay-list" role="tablist" aria-label="Tents">
              {TENTS.map((sv, i) => (
                <button
                  key={sv.n}
                  role="tab"
                  aria-selected={tent === i}
                  className={`glp-stay-row${tent === i ? " on" : ""}`}
                  onClick={() => setTent(i)}
                  onMouseEnter={() => setTent(i)}
                >
                  <span className="glp-stay-n">{sv.n}</span>
                  <span className="glp-stay-name">{sv.title}</span>
                  <span className="glp-stay-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <div className="glp-stay-detail">
              <span className="glp-mono">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <p className="glp-stay-price">{s.price}</p>
              <a className="glp-btn glp-btn-dark" href="#book">
                Check dates for this tent →
              </a>
            </div>
          </div>
          <div className="glp-stay-photos">
            <Image src={TENT_IMG} alt="A canvas tent in the woods" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={GLAMP_IMG} alt="A furnished glamping tent" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- the woods (dark) ---- */}
      <section className="glp-section glp-dark glp-speckle" id="setting">
        <div className="glp-wrap">
          <div className="glp-setting">
            <BlurReveal>
              <div>
                <span className="glp-mono glp-mono-light">(03) THE WOODS</span>
                <h2>
                  Forty acres, <em>no signal.</em>
                </h2>
                <p>
                  Ember &amp; Oak sits in forty acres of Cotswold woodland,
                  a ten-minute walk from the nearest road. There is no phone
                  signal, no traffic and no light pollution. The trees are
                  old, the air is clean and the nights are properly dark.
                </p>
                <p>
                  The camp is not a hotel. There is no reception desk and
                  no minibar. There is a fire, a kettle, a sky full of
                  stars and a quiet you can hear.
                </p>
                <a className="glp-btn glp-btn-accent" href="#book">
                  See the season
                </a>
              </div>
            </BlurReveal>
            <Reveal delay={0.1}>
              <aside className="glp-highlight">
                <span className="glp-highlight-tag">THE CAMPFIRE HOUR</span>
                <h3>Every evening, 7pm</h3>
                <p>
                  Every evening, the camp gathers at the big fire with
                  marshmallows, stories and whatever is in the pot. No
                  agenda, no phones — just the fire and whoever is there.
                </p>
                <ul>
                  <li>✓ Every evening, 7pm</li>
                  <li>✓ Firewood and marshmallows</li>
                  <li>✓ Stories welcome, phones not</li>
                  <li>✓ Rain or shine, under cover</li>
                </ul>
                <a className="glp-btn glp-btn-dark" href="#book">
                  Book a night by the fire →
                </a>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- activities ---- */}
      <section className="glp-section" id="activities">
        <div className="glp-wrap">
          <BlurReveal>
            <span className="glp-mono">(04) ACTIVITIES</span>
            <h2>What a day looks like.</h2>
            <p className="glp-lede">
              Fire, trees, food and sky — the camp runs on a short list of
              good things, done well.
            </p>
          </BlurReveal>
          <div className="glp-activities">
            {ACTIVITIES.map((ac, i) => (
              <Reveal key={ac.n} delay={i * 0.04}>
                <article className="glp-activity">
                  <span className="glp-activity-n">{ac.n}</span>
                  <div className="glp-activity-tags">
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
          <div className="glp-activity-photos">
            <Image src={FIRE_IMG} alt="A campfire at dusk" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
            <Image src={CAMP_IMG} alt="The campsite in the morning" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---- your stay (sticky intro + steps) ---- */}
      <section className="glp-section glp-how-sec" id="stay">
        <div className="glp-wrap">
          <div className="glp-how">
            <div className="glp-how-sticky">
              <BlurReveal>
                <span className="glp-mono">(05) YOUR STAY</span>
                <h2>From arrival to departure in four steps.</h2>
                <p>
                  A short, honest process — so you know exactly what a stay
                  here feels like before you book.
                </p>
                <a className="glp-btn glp-btn-accent" href="#book">
                  Check availability
                </a>
              </BlurReveal>
            </div>
            <div className="glp-steps">
              {STEPS.map((st, i) => (
                <Reveal key={st.n} delay={i * 0.06}>
                  <article className="glp-step">
                    <span className="glp-step-n">{st.n}</span>
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
            <div className="glp-why">
              <h3>Why guests return</h3>
              <div className="glp-why-grid">
                {WHY.map((w) => (
                  <article key={w.title} className="glp-why-item">
                    <h4>{w.title}</h4>
                    <p>{w.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="glp-fullbleed glp-bw">
          <Image
            src={STARS_IMG}
            alt="A tent under a starry sky"
            width={2000}
            height={700}
            sizes="100vw"
          />
        </div>
      </section>

      {/* ---- guest voices (dark, tabbed) ---- */}
      <section className="glp-section glp-dark glp-speckle" id="voices">
        <div className="glp-wrap">
          <BlurReveal>
            <div className="glp-testi-head">
              <span className="glp-mono glp-mono-light">(06) GUEST VOICES</span>
              <h2>What a stay feels like.</h2>
            </div>
          </BlurReveal>
          <div className="glp-testi">
            <div className="glp-testi-tabs" role="tablist" aria-label="Guests">
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
            <div className="glp-testi-quote">
              <blockquote>“{t.quote}”</blockquote>
              <span className="glp-testi-org">{t.org}</span>
            </div>
            <div className="glp-testi-img">
              <Image
                src={GLAMP_IMG}
                alt="A furnished glamping tent"
                width={800}
                height={1000}
                sizes="(max-width: 900px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="glp-section" id="faq">
        <div className="glp-wrap glp-faq-wrap">
          <BlurReveal>
            <span className="glp-mono">(07) FAQ</span>
            <h2>Before you book.</h2>
            <p className="glp-lede">
              The questions every guest asks us. Anything else — call {PHONE}.
            </p>
          </BlurReveal>
          <div className="glp-faq">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className={`glp-faq-item${openFaq === i ? " open" : ""}`}
              >
                <button
                  className="glp-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className="glp-faq-plus" aria-hidden="true">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && <p className="glp-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- book (dark CTA + form + photo strip) ---- */}
      <section className="glp-section glp-dark glp-speckle" id="book">
        <div className="glp-wrap">
          <BlurReveal>
            <div className="glp-cta-head">
              <span className="glp-mono glp-mono-light">(08) BOOK YOUR STAY</span>
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
              <div className="glp-form-ok">
                <strong>Thank you — your request is in.</strong>
                <p>
                  We have your details and will come back with availability
                  and a price, usually within one working day. If it is
                  urgent, call {PHONE}.
                </p>
              </div>
            ) : (
              <form className="glp-form" onSubmit={onBook}>
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
                  Tent
                  <select name="tent" defaultValue="The Bell Tent">
                    <option>The Bell Tent</option>
                    <option>The Safari Tent</option>
                    <option>The Stargazer</option>
                    <option>The Family Tent</option>
                    <option>The Solo Tent</option>
                  </select>
                </label>
                <label>
                  Firewood
                  <select name="firewood" defaultValue="Included">
                    <option>Included</option>
                    <option>Extra bundle</option>
                    <option>Not needed</option>
                  </select>
                </label>
                <label className="glp-full">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your trip, your group, or anything you need…"
                  />
                </label>
                <button className="glp-btn glp-btn-accent glp-btn-lg glp-full" type="submit">
                  Check availability
                </button>
                <p className="glp-form-note glp-full">
                  Prefer to talk? Call{" "}
                  <a href={`tel:${PHONE_HREF}`}>{PHONE}</a> or email{" "}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </form>
            )}
          </Reveal>
          <div className="glp-strip" aria-hidden="true">
            {[GLAMP_IMG, TENT_IMG, FIRE_IMG, CAMP_IMG, STARS_IMG].map(
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
      <footer className="glp-footer">
        <div className="glp-wrap">
          <BlurReveal>
            <p className="glp-footer-statement">
              Safari tents, campfire evenings and slow mornings — comfort, in
              the wild.
            </p>
          </BlurReveal>
          <div className="glp-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#tents">Tents</a></li>
                <li><a href="#setting">The woods</a></li>
                <li><a href="#activities">Activities</a></li>
                <li><a href="#stay">Your stay</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </nav>
            <nav aria-label="Tents">
              <h3>TENTS</h3>
              <ul>
                <li><a href="#tents">The Bell Tent</a></li>
                <li><a href="#tents">The Safari Tent</a></li>
                <li><a href="#tents">The Stargazer</a></li>
                <li><a href="#tents">The Family Tent</a></li>
                <li><a href="#tents">The Solo Tent</a></li>
              </ul>
            </nav>
            <div className="glp-footer-contact">
              <h3>CONTACT</h3>
              <p>
                <a href={`tel:${PHONE_HREF}`}>{PHONE}</a>
                <br />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <br />
                {PLACE}
              </p>
              <p className="glp-reg">
                Ember &amp; Oak Camp · The Cotswolds, England
              </p>
            </div>
            <div className="glp-footer-status">
              <h3>STATUS</h3>
              <p>● CAMP OPEN</p>
              <p>
                GUESTS BOOKED THIS SEASON{" "}
                <LiveTick start={720} step={2} intervalMs={3400} />
              </p>
            </div>
          </div>
          <span className="glp-footer-word">EMBER &amp; OAK</span>
          <span className="glp-footer-copy">
            © 2026 Ember &amp; Oak Camp · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
