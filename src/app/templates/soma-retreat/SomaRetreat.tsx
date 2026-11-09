"use client";
import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Motion";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const HERO = U("1499209974431-9dddcece7f88", 2400); // arms open at sunrise
const YOGA = U("1575052814086-f385e2e2ad1b"); // indoor yoga, soft
const PILATES = U("1518611012118-696072aa579a"); // pilates class
const MEDITATION = U("1552196563-55cd4e45efb3"); // minimal meditation
const MUDRA = U("1591228127791-8e2eaef098d3"); // mudra by the sea
const FOREST = U("1441974231531-c6227db76b6e"); // sunlit forest path
const LAKE = U("1508672019048-805c876b67e2"); // meditation on a mountain lake
const BEACH_YOGA = U("1545205597-3d9d02c29597"); // group yoga on the beach
const SPA = U("1600334129128-685c5582fd35"); // hot stone massage

const PATHS = [
  {
    img: YOGA,
    num: "Path 01",
    title: "Yoga",
    text: "Gentle rhythms, stillness, and a deeper kind of strength. Breath-led, unhurried, and always yours.",
    meta: "60–75 min · All levels",
  },
  {
    img: PILATES,
    num: "Path 02",
    title: "Pilates Mat",
    text: "Low to the ground. High focus. Full-body tone, balance and the quiet confidence of a strong centre.",
    meta: "50 min · All levels",
  },
  {
    img: MEDITATION,
    num: "Path 03",
    title: "Meditation",
    text: "Stillness, practised gently. Breathwork, body scans and sitting in good company — no experience needed.",
    meta: "30–45 min · Beginners welcome",
  },
];

const RETREATS = [
  {
    img: FOREST,
    tag: "Autumn · 4 days",
    title: "Autumn Forest Retreat",
    text: "Four days in a quiet forest house, surrounded by water and silence. Morning flows, evening meditations, shared meals and sacred rest — the season turning, and you with it.",
    when: ["October 9–12", "Forest house · Lakeside", "8 places left"],
  },
  {
    img: LAKE,
    tag: "Winter · 3 days",
    title: "Winter Stillness Retreat",
    text: "Three days of doing less, on purpose. Long sits by the lake, slow yoga, hot stone rituals and early nights. Come tired; leave rested in a way sleep alone never manages.",
    when: ["January 16–18", "Mountain lake house", "10 places left"],
  },
  {
    img: BEACH_YOGA,
    tag: "Spring · 5 days",
    title: "Spring Awakening Retreat",
    text: "Five days to shake off the winter. Sunrise practice on the sand, breathwork, cold water, and long lunches in the sun. A gentle return to energy.",
    when: ["April 10–14", "Coastal retreat centre", "12 places left"],
  },
];

const TEACHERS = [
  {
    initials: "EM",
    bg: "#7d8b6a",
    name: "Elena Marsh",
    role: "Yoga · Founder",
    text: "Fifteen years of teaching, and still a student. Elena holds the room the way a forest holds light — quietly, and completely.",
  },
  {
    initials: "JK",
    bg: "#a87b5f",
    name: "Jonas Keller",
    role: "Pilates · Breathwork",
    text: "A former dancer who found stillness slower than speed. Jonas teaches precision with a soft voice and a lighter touch.",
  },
  {
    initials: "AR",
    bg: "#8a7a5f",
    name: "Aya Rahman",
    role: "Meditation · Sound",
    text: "Aya guides the sits and the sound baths. Her rule is simple: nothing to achieve, everything to notice.",
  },
];

const PLANS = [
  {
    name: "A Weekend",
    nights: "3 days · 2 nights",
    price: "$420",
    per: "per person",
    feats: ["Forest house stay", "Daily yoga & meditation", "One spa ritual", "All shared meals", "Guided forest walk"],
    featured: false,
  },
  {
    name: "The Retreat",
    nights: "4 days · 3 nights",
    price: "$680",
    per: "per person",
    feats: ["Forest house stay", "Daily yoga, Pilates & meditation", "Two spa rituals", "All meals included", "Lake & forest excursions", "Sound bath evening"],
    featured: true,
  },
  {
    name: "A Full Week",
    nights: "7 days · 6 nights",
    price: "$1,150",
    per: "per person",
    feats: ["Forest house stay", "Full daily programme", "Four spa rituals", "All meals included", "Two excursions", "Private session with a teacher"],
    featured: false,
  },
];

function useAutoAdvance(length: number, ms: number, paused: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => clearInterval(t);
  }, [length, ms, paused]);
  return [index, setIndex] as const;
}

export default function SomaRetreat() {
  const [paused, setPaused] = useState(false);
  const [retreat, setRetreat] = useAutoAdvance(RETREATS.length, 6000, paused);
  const [booked, setBooked] = useState(false);

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBooked(true);
  };

  const now = RETREATS[retreat];

  return (
    <div className="sm">
      {/* ---- announcement ---- */}
      <div className="sm-announce">
        <strong>A small change in the air</strong> — Autumn retreat dates are
        live. <a href="#retreats">See what&apos;s new →</a>
      </div>

      {/* ---- nav ---- */}
      <header className="sm-nav">
        <div className="sm-nav-inner">
          <a className="sm-brand" href="#top">
            SOMA
          </a>
          <nav className="sm-nav-links" aria-label="Retreat">
            <a href="#paths">Paths</a>
            <a href="#retreats">Retreats</a>
            <a href="#teachers">Teachers</a>
            <a href="#first-time">First time</a>
          </nav>
          <a className="sm-btn" href="#reserve">
            Book a retreat
          </a>
        </div>
      </header>

      {/* ---- hero ---- */}
      <section className="sm-hero" id="top">
        <div className="sm-hero-copy">
          <Reveal>
            <span className="sm-kicker">A yoga &amp; retreat studio</span>
            <h1>
              Come home to <em>your body.</em>
            </h1>
            <p className="sm-hero-sub">
              A quiet studio and a forest house for retreats — where practice
              is gentle, breath is the teacher, and you are allowed to arrive
              exactly as you are.
            </p>
            <div className="sm-hero-cta">
              <a className="sm-btn" href="#reserve">
                Book a retreat →
              </a>
              <a className="sm-btn ghost" href="#paths">
                Explore the paths
              </a>
            </div>
          </Reveal>
        </div>
        <div className="sm-hero-media">
          <Image
            src={HERO}
            alt="A person with arms open at sunrise over misty mountains"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <figcaption>Sunrise practice, first light</figcaption>
        </div>
      </section>

      {/* ---- belief ---- */}
      <section className="sm-section">
        <div className="sm-wrap">
          <div className="sm-belief">
            <Reveal>
              <span className="sm-kicker">What we believe</span>
              <p className="sm-big">
                We believe in embodied practice that nourishes every part of
                you — <em>body, mind and spirit.</em> Our classes aren&apos;t
                about perfect shapes. They&apos;re about real presence, deep
                listening and joyful strength.
              </p>
            </Reveal>
            <div className="sm-values">
              <Reveal delay={0}>
                <div className="sm-value">
                  <span className="sm-num">01</span>
                  <h3>Rooted in softness</h3>
                  <p>
                    Nothing here is forced. We move the way the body wants to
                    move — slowly, kindly, and without apology.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="sm-value">
                  <span className="sm-num">02</span>
                  <h3>Designed for presence</h3>
                  <p>
                    Small rooms, quiet mornings, no mirrors shouting at you.
                    The space is built so you can actually arrive in it.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="sm-value">
                  <span className="sm-num">03</span>
                  <h3>Real energy</h3>
                  <p>
                    Not hype, not hustle. The steady energy that comes from
                    breath, rest and being honestly looked after.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.1}>
            <div
              style={{
                marginTop: 56,
                borderRadius: 24,
                overflow: "hidden",
              }}
            >
              <Image
                src={MUDRA}
                alt="A hand in meditation mudra by the sea"
                width={1600}
                height={700}
                sizes="(max-width: 900px) 100vw, 90vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- three paths ---- */}
      <section className="sm-section" id="paths" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <Reveal>
            <span className="sm-kicker">Classes</span>
            <h2 className="sm-h2">
              Three paths. <em>One intention.</em>
            </h2>
            <p className="sm-lede">
              Each session is a different way to return — to your body, to
              presence, to breath.
            </p>
          </Reveal>
          <div className="sm-paths">
            {PATHS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="sm-path">
                  <div className="sm-path-media">
                    <Image
                      src={p.img}
                      alt={p.title}
                      width={800}
                      height={1000}
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                    <span className="sm-path-num">{p.num}</span>
                  </div>
                  <div className="sm-path-body">
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <div className="sm-path-meta">{p.meta}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- upcoming retreats carousel ---- */}
      <section className="sm-section" id="retreats" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <Reveal>
            <span className="sm-kicker">Events</span>
            <h2 className="sm-h2">
              Upcoming <em>retreats.</em>
            </h2>
            <p className="sm-lede">
              Step away from the noise. Join us for a few days of stillness,
              movement and deep connection in nature.
            </p>
          </Reveal>
          <div
            style={{ marginTop: 48 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="sm-retreat">
              <AnimatePresence mode="wait">
                <motion.div
                  key={retreat}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                >
                  <div className="sm-retreat-grid">
                    <div className="sm-retreat-media">
                      <Image
                        src={now.img}
                        alt={now.title}
                        width={1400}
                        height={1000}
                        sizes="(max-width: 860px) 100vw, 50vw"
                      />
                    </div>
                    <div className="sm-retreat-body">
                      <span className="sm-kicker">{now.tag}</span>
                      <h3>{now.title}</h3>
                      <p>{now.text}</p>
                      <div className="sm-retreat-when">
                        {now.when.map((w) => (
                          <span key={w}>{w}</span>
                        ))}
                      </div>
                      <a className="sm-btn" href="#reserve">
                        Reserve a place →
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <button
                className="sm-arrow prev"
                aria-label="Previous retreat"
                onClick={() =>
                  setRetreat((retreat - 1 + RETREATS.length) % RETREATS.length)
                }
              >
                ←
              </button>
              <button
                className="sm-arrow next"
                aria-label="Next retreat"
                onClick={() => setRetreat((retreat + 1) % RETREATS.length)}
              >
                →
              </button>
            </div>
            <div className="sm-dots" role="tablist" aria-label="Retreats">
              {RETREATS.map((r, i) => (
                <button
                  key={r.title}
                  className={i === retreat ? "on" : ""}
                  aria-label={r.title}
                  onClick={() => setRetreat(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- teachers ---- */}
      <section className="sm-section" id="teachers" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <Reveal>
            <span className="sm-kicker">Teachers</span>
            <h2 className="sm-h2">
              Held by <em>good hands.</em>
            </h2>
            <p className="sm-lede">
              We guide you with care, not pressure. Every class meets you
              where you are.
            </p>
          </Reveal>
          <div className="sm-teachers">
            {TEACHERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <article className="sm-teacher">
                  <div className="sm-avatar" style={{ background: t.bg }}>
                    {t.initials}
                  </div>
                  <h3>{t.name}</h3>
                  <div className="sm-role">{t.role}</div>
                  <p>{t.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- first time ---- */}
      <section className="sm-section" id="first-time" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <div className="sm-first">
            <Reveal>
              <span className="sm-kicker">First time with us?</span>
              <h2 className="sm-h2">
                Start your journey <em>gently.</em>
              </h2>
              <p className="sm-lede">
                Everything you need to know — how to prepare, what to bring,
                and what to expect from your first visit.
              </p>
              <div className="sm-first-list">
                <div className="sm-first-item">
                  <span className="sm-ico">◐</span>
                  <div>
                    <h3>Supportive teachers</h3>
                    <p>
                      We guide you with care, not pressure. Every class meets
                      you where you are.
                    </p>
                  </div>
                </div>
                <div className="sm-first-item">
                  <span className="sm-ico">◔</span>
                  <div>
                    <h3>Slow pace</h3>
                    <p>
                      No rush. No noise. Just time to land in your body.
                    </p>
                  </div>
                </div>
                <div className="sm-first-item">
                  <span className="sm-ico">✦</span>
                  <div>
                    <h3>Bring almost nothing</h3>
                    <p>
                      Mats, props, blankets and tea are all here. Bring water,
                      comfortable clothes, and an open morning.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="sm-first-img">
                <Image
                  src={SPA}
                  alt="Hot stone massage with orchids"
                  width={1200}
                  height={1020}
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- packages ---- */}
      <section className="sm-section" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <Reveal>
            <span className="sm-kicker">Retreats</span>
            <h2 className="sm-h2">
              Choose how long <em>to stay.</em>
            </h2>
            <p className="sm-lede">
              A 20% deposit holds your place. The rest is due thirty days
              before arrival, and life happens — you can move your dates once,
              free.
            </p>
          </Reveal>
          <div className="sm-plans">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article className={`sm-plan${p.featured ? " featured" : ""}`}>
                  {p.featured && <span className="sm-plan-badge">Most booked</span>}
                  <h3>{p.name}</h3>
                  <span className="sm-plan-nights">{p.nights}</span>
                  <div className="sm-plan-price">
                    {p.price} <span>{p.per}</span>
                  </div>
                  <ul>
                    {p.feats.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a className="sm-btn" href="#reserve">
                    Reserve {p.name}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- reserve / booking ---- */}
      <section className="sm-section" id="reserve" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <div className="sm-book">
            <Reveal>
              <span className="sm-kicker" style={{ color: "#c9a25c" }}>
                Reserve
              </span>
              <h2>Your mat is waiting.</h2>
              <p>
                Tell us which retreat calls to you and when you would like to
                come. We reply personally within a day, and hold your place
                for 48 hours while you decide.
              </p>
              <p style={{ marginTop: 18 }}>
                Prefer to talk first?{" "}
                <a href="mailto:hello@soma-retreat.com" style={{ color: "#c9a25c" }}>
                  hello@soma-retreat.com
                </a>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              {booked ? (
                <div className="sm-form-ok">
                  <strong>Thank you — your request is in.</strong>
                  <br />
                  We have your details and will write back personally within
                  a day to confirm your place and hold it for 48 hours.
                </div>
              ) : (
                <form className="sm-form" onSubmit={onBook}>
                  <label>
                    Full name
                    <input name="name" type="text" placeholder="Your name" required />
                  </label>
                  <label>
                    Email
                    <input name="email" type="email" placeholder="you@example.com" required />
                  </label>
                  <label>
                    Retreat
                    <select name="retreat" defaultValue="The Retreat — 4 days">
                      <option>The Retreat — 4 days</option>
                      <option>A Weekend — 3 days</option>
                      <option>A Full Week — 7 days</option>
                    </select>
                  </label>
                  <label>
                    Guests
                    <select name="guests" defaultValue="1 guest">
                      <option>1 guest</option>
                      <option>2 guests</option>
                    </select>
                  </label>
                  <label>
                    Arrival date
                    <input name="arrival" type="date" required />
                  </label>
                  <label>
                    Anything we should know?
                    <input name="notes" type="text" placeholder="Experience, injuries, wishes" />
                  </label>
                  <button className="sm-btn light" type="submit">
                    Request my place →
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- footer ---- */}
      <footer className="sm-footer">
        <div className="sm-wrap">
          <div className="sm-footer-top">
            <a className="sm-brand" href="#top">
              SOMA
            </a>
            <nav className="sm-footer-links" aria-label="Footer">
              <a href="#paths">Paths</a>
              <a href="#retreats">Retreats</a>
              <a href="#teachers">Teachers</a>
              <a href="#first-time">First time</a>
              <a href="#reserve">Reserve</a>
            </nav>
          </div>
          <div className="sm-footer-bottom">
            <span>Soma Retreat · hello@soma-retreat.com</span>
            <span>
              Website template by{" "}
              <a href="https://digitalfalconz.com">DigitalFalconz</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
