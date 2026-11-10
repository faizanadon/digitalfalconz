"use client";
import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

const PHONE = "+44 1608 000 000";
const PHONE_HREF = "+441608000000";
const EMAIL = "stay@emberandoak.co.uk";
const PLACE = "The Cotswolds, England";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Real woodland photography (all verified 200). The hero tent and the
   stargazing feature image are B&W for the editorial look; the tents,
   fire and setting stay in full colour so the place shows through. */
const HERO_IMG = U("1504280390367-361c6d9f38f4", 1800); // tent under night sky
const TENT_IMG = U("1523987355523-c7b5b0dd90a7", 1000); // camping tent
const FIRE_IMG = U("1470240731273-7821a6eeb6bd", 1000); // campfire
const CAMP_IMG = U("1510312305653-8ed496efae75", 1000); // campsite
const STARS_IMG = U("1517821362941-f7f753200fef", 1800); // tent under stars
const GLAMP_IMG = U("1537225228614-56cc3556d7ed", 1200); // glamping tent

const TENTS = [
  {
    n: "01",
    title: "The Bell Tent",
    text: "Two guests, a real bed and a lantern. The classic camp — simple, warm and quiet, with a fire pit outside.",
    tag: "2 GUESTS",
    price: "From £95 / night",
    img: TENT_IMG,
    alt: "A camping tent in the woods",
  },
  {
    n: "02",
    title: "The Safari Tent",
    text: "Four guests, a proper bed, a wood stove and a deck. The most comfort in the camp, with room to spread out.",
    tag: "4 GUESTS",
    price: "From £160 / night",
    img: CAMP_IMG,
    alt: "A campsite in the woods",
  },
  {
    n: "03",
    title: "The Stargazer",
    text: "Two guests and a clear roof panel, so the sky is above your bed. The best sleep in the field.",
    tag: "2 GUESTS",
    price: "From £140 / night",
    img: STARS_IMG,
    alt: "A tent under the stars",
    bw: true,
  },
  {
    n: "04",
    title: "The Family Tent",
    text: "Six guests, two sleeping areas and a kitchen corner. Built for families who want the woods and a place to cook together.",
    tag: "6 GUESTS",
    price: "From £220 / night",
    img: GLAMP_IMG,
    alt: "A glamping tent",
  },
  {
    n: "05",
    title: "The Solo Tent",
    text: "One guest, a reading chair and a path straight into the woods. For the ones who came to be alone with the trees.",
    tag: "1 GUEST",
    price: "From £75 / night",
    img: FIRE_IMG,
    alt: "A campfire at dusk",
  },
];

const STATS = [
  { n: 14, suffix: "", label: "TENTS IN THE FIELD", caption: "Fourteen tents, no crowds." },
  { n: 40, suffix: "", label: "ACRES OF WOODLAND", caption: "Woods in every direction." },
  { n: 48, suffix: "h", label: "BOOKING REPLY", caption: "At most — usually sooner." },
  { n: 99, suffix: "%", label: "WOULD RETURN", caption: "Guests who would come back." },
];

const ACTIVITIES = [
  { n: "01", name: "Campfire evenings", text: "Wood smoke, stories, no screens after dark.", tags: "EVENINGS · FIRE" },
  { n: "02", name: "Woodland walks", text: "Marked trails from the field, with a guide who knows them.", tags: "DAILY · ALL LEVELS" },
  { n: "03", name: "Outdoor cooking", text: "Fire, cast iron and whatever is in season.", tags: "EVENINGS · FOOD" },
  { n: "04", name: "Dawn chorus", text: "Up early for the birdsong, coffee in hand.", tags: "DAWN · GUIDED" },
  { n: "05", name: "Foraging walk", text: "Mushrooms, herbs and berries with a local guide.", tags: "SEASONAL · GUIDED" },
  { n: "06", name: "Stargazing", text: "No light pollution. The Milky Way, every clear night.", tags: "NIGHT · CLEAR SKIES" },
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
    role: "Guest, Oxford — The Safari Tent",
    quote:
      "We arrived tired and left rested in a way I did not think was possible in three days. The tent was warm, the fire was lit and nobody hurried us at any point.",
  },
  {
    name: "David Okafor",
    role: "Guest, London — The Family Tent",
    quote:
      "The kids still talk about the campfire and the foraging walk. It is the first holiday where the whole family actually slowed down.",
  },
  {
    name: "Grace Liu",
    role: "Guest, Manchester — The Solo Tent",
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

export default function GlampingRetreat() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [tent, setTent] = useState(0);

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const t = TENTS[tent];

  return (
    <div className="glp">
      {/* ---- header: minimal text header, no pill nav, no header CTA ---- */}
      <header className="glp-header">
        <div className="glp-wrap glp-header-inner">
          <a className="glp-brand" href="#top" aria-label="Ember and Oak home">
            <span className="glp-brand-text">EMBER &amp; OAK</span>
          </a>
          <nav className="glp-nav" aria-label="Main">
            <a href="#tents">Tents</a>
            <a href="#days">Days</a>
            <a href="#stay">Your stay</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="glp-header-link" href="#book">Book →</a>
        </div>
      </header>

      {/* ---- hero: spacious, headline first, B&W image below ---- */}
      <section className="glp-hero" id="top">
        <div className="glp-wrap">
          <BlurReveal>
            <span className="glp-mono">(00) EMBER &amp; OAK — GLAMPING RETREAT, THE COTSWOLDS</span>
            <h1>
              Sleep under <em>stars.</em>
            </h1>
            <p className="glp-hero-sub">
              A glamping field in the Cotswolds — canvas tents, wood stoves,
              campfire evenings and slow woodland mornings.
            </p>
            <a className="glp-hero-link" href="#tents">See the tents ↓</a>
          </BlurReveal>
        </div>
        <div className="glp-wrap">
          <div className="glp-hero-media">
            <Image src={HERO_IMG} alt="A tent under the night sky" fill priority sizes="100vw" />
          </div>
          <p className="glp-caption">The field at night — fourteen tents, forty acres of woodland, no light pollution.</p>
        </div>
      </section>

      {/* ---- tents: minimal list drives a detail panel ---- */}
      <section className="glp-section" id="tents">
        <div className="glp-wrap">
          <BlurReveal>
            <span className="glp-mono">(01) THE TENTS</span>
            <h2>Five tents, one field.</h2>
            <p className="glp-lede">
              Every stay includes bedding, firewood and a fire pit. Select a
              tent to see it.
            </p>
          </BlurReveal>
          <div className="glp-tents">
            <div className="glp-tent-list" role="tablist" aria-label="Tents">
              {TENTS.map((tn, i) => (
                <button
                  key={tn.n}
                  role="tab"
                  aria-selected={tent === i}
                  className={`glp-tent-row${tent === i ? " on" : ""}`}
                  onClick={() => setTent(i)}
                  onMouseEnter={() => setTent(i)}
                >
                  <span className="glp-tent-n">{tn.n}</span>
                  <span className="glp-tent-name">{tn.title}</span>
                  <span className="glp-tent-tag">{tn.tag}</span>
                  <span className="glp-tent-price">{tn.price}</span>
                </button>
              ))}
            </div>
            <div className="glp-tent-detail">
              <div className={`glp-tent-img${t.bw ? " glp-bw" : ""}`}>
                <Image src={t.img} alt={t.alt} width={1000} height={700} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div className="glp-tent-body">
                <span className="glp-mono">{t.tag}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <p className="glp-tent-detail-price">{t.price}</p>
                <a className="glp-link" href="#book">Check dates for this tent →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- stats: one quiet row ---- */}
      <section className="glp-stats">
        <div className="glp-wrap">
          <div className="glp-stat-row">
            {STATS.map((st) => (
              <div key={st.label} className="glp-stat">
                <span className="glp-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="glp-stat-label">{st.label}</span>
                <span className="glp-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
          <p className="glp-note">Key figures for this template — placeholder figures, replace with your own.</p>
        </div>
      </section>

      {/* ---- days: simple two-column list ---- */}
      <section className="glp-section" id="days">
        <div className="glp-wrap">
          <BlurReveal>
            <span className="glp-mono">(02) DAYS IN THE WOODS</span>
            <h2>What a day looks like.</h2>
          </BlurReveal>
          <ol className="glp-act-list">
            {ACTIVITIES.map((ac) => (
              <li key={ac.n} className="glp-act">
                <span className="glp-act-n">{ac.n}</span>
                <div>
                  <h3>{ac.name}</h3>
                  <p>{ac.text}</p>
                  <span className="glp-act-tags">{ac.tags}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- setting: one B&W image, short caption, short paragraph ---- */}
      <section className="glp-setting">
        <div className="glp-wrap">
          <BlurReveal>
            <span className="glp-mono">(03) THE SETTING</span>
            <h2>Forty acres, fourteen tents.</h2>
          </BlurReveal>
          <div className="glp-feature glp-bw">
            <Image src={STARS_IMG} alt="A tent under the stars" width={2000} height={700} sizes="100vw" />
          </div>
          <p className="glp-caption">The field after dark — no light pollution, the Milky Way every clear night.</p>
          <div className="glp-setting-text">
            <p>
              Ember &amp; Oak is a field in the Cotswolds, forty acres of
              woodland with fourteen tents in it. There is no road through the
              field, no streetlight and no sound but birdsong and wind. The
              camp is a fire pit, a wood store and a sky full of stars.
            </p>
            <p>
              The camp is not a hotel. There is no reception desk, no minibar,
              no television. There is a stove, a lantern, a path into the
              woods and a fire that is lit every evening.
            </p>
          </div>
          <div className="glp-why">
            {WHY.map((w) => (
              <article key={w.title} className="glp-why-item">
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- your stay: simple numbered list ---- */}
      <section className="glp-section" id="stay">
        <div className="glp-wrap">
          <BlurReveal>
            <span className="glp-mono">(04) YOUR STAY</span>
            <h2>From arrival to departure.</h2>
          </BlurReveal>
          <ol className="glp-steps">
            {STEPS.map((st) => (
              <li key={st.n} className="glp-step">
                <span className="glp-step-n">{st.n}</span>
                <div>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- guest voices: one large centred quote ---- */}
      <section className="glp-section glp-voices-sec" id="voices">
        <div className="glp-wrap glp-voices-wrap">
          <BlurReveal>
            <span className="glp-mono">(05) GUEST VOICES</span>
            <blockquote className="glp-big-quote">
              “{TESTIMONIALS[0].quote}”
              <footer>
                <strong>{TESTIMONIALS[0].name}</strong>
                <span>{TESTIMONIALS[0].role}</span>
              </footer>
            </blockquote>
          </BlurReveal>
          <div className="glp-quote-row">
            {TESTIMONIALS.slice(1).map((tst) => (
              <Reveal key={tst.name}>
                <article className="glp-quote">
                  <p>“{tst.quote}”</p>
                  <span><strong>{tst.name}</strong> — {tst.role}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ: minimal, hairline dividers ---- */}
      <section className="glp-section glp-faq-sec" id="faq">
        <div className="glp-wrap glp-faq-wrap">
          <BlurReveal>
            <span className="glp-mono">(06) FAQ</span>
            <h2>Before you book.</h2>
            <p className="glp-lede">
              The questions every guest asks us. Anything else — call {PHONE}.
            </p>
          </BlurReveal>
          <div className="glp-faq">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`glp-faq-item${openFaq === i ? " open" : ""}`}>
                <button
                  className="glp-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className="glp-faq-plus" aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="glp-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- book: simple, quiet, single-column panel ---- */}
      <section className="glp-section glp-book-sec" id="book">
        <div className="glp-wrap glp-book-wrap">
          <BlurReveal>
            <span className="glp-mono">(07) BOOK YOUR STAY</span>
            <h2>Check availability.</h2>
            <p className="glp-lede">
              Tell us when you would like to come and we will come back within
              48 hours with availability and a price — usually much sooner. No
              obligation, no card taken. Prefer to talk? Call{" "}
              <a href={`tel:${PHONE_HREF}`}>{PHONE}</a> or email{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
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
                  <select
                    name="tent"
                    value={t.title}
                    onChange={(e) =>
                      setTent(TENTS.findIndex((tn) => tn.title === e.target.value))
                    }
                  >
                    <option>The Bell Tent</option>
                    <option>The Safari Tent</option>
                    <option>The Stargazer</option>
                    <option>The Family Tent</option>
                    <option>The Solo Tent</option>
                  </select>
                </label>
                <label>
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your trip, your group, or anything you need…"
                  />
                </label>
                <button className="glp-btn glp-btn-accent glp-btn-lg" type="submit">
                  Check availability
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---- footer: minimal, giant ochre wordmark ---- */}
      <footer className="glp-footer">
        <div className="glp-wrap">
          <span className="glp-footer-word">EMBER &amp; OAK</span>
          <p className="glp-footer-statement">
            A glamping field in the Cotswolds — canvas tents, wood stoves and
            slow woodland mornings.
          </p>
          <div className="glp-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#tents">Tents</a></li>
                <li><a href="#days">Days</a></li>
                <li><a href="#stay">Your stay</a></li>
                <li><a href="#faq">FAQ</a></li>
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
            </div>
          </div>
          <span className="glp-footer-copy">
            © 2026 Ember &amp; Oak Glamping · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
