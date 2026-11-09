"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Motion";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const HERO = U("1517836357463-d25dfeac3438", 2400); // man deadlifting a barbell, dark gym floor
const STRENGTH = U("1583454110551-21f2fa2afe61"); // man picking up dumbbells, close-up
const CONDITIONING = U("1599058917212-d750089bc07e"); // man with battle ropes
const BOXING = U("1549719386-74dfcbf7dbed"); // black boxing gloves on a mat
const MOBILITY = U("1594381898411-846e7d193883"); // woman doing core work on a mat
const COACH_MARA = U("1541534741688-6078c6bfb5c5", 1000); // woman overhead press, dark brick wall
const COACH_DANE = U("1581009146145-b5ef050c2e1e", 1000); // bearded man curling an EZ bar
const COACH_LENA = U("1574680096145-d05b474e2155", 1000); // woman back squat, black & white
const CHALK = U("1595078475328-1ab05d0a6a0e", 2000); // woman chalking hands before a barbell
const GYM_FLOOR = U("1534438327276-14e5300c3a48", 1400); // dumbbell racks, gym interior

const PROGRAMMES = [
  {
    img: STRENGTH,
    num: "01",
    title: "Strength",
    text: "Barbell-first coaching. Squat, press, pull — and a programme that actually progresses.",
    meta: "60 min · All levels",
  },
  {
    img: CONDITIONING,
    num: "02",
    title: "Conditioning",
    text: "Ropes, sleds and intervals that build an engine you can use outside the gym.",
    meta: "45 min · Intermediate",
  },
  {
    img: BOXING,
    num: "03",
    title: "Boxing",
    text: "Bag work, pads and footwork. Learn to move, hit hard, and leave lighter.",
    meta: "60 min · All levels",
  },
  {
    img: MOBILITY,
    num: "04",
    title: "Mobility & Yoga",
    text: "Slow, deliberate work for hips, shoulders and spine — so the heavy days keep coming.",
    meta: "50 min · All levels",
  },
];

const COACHES = [
  {
    img: COACH_MARA,
    name: "Mara Voss",
    role: "Strength & Powerlifting",
    text: "Ten years under the bar. Mara has coached 40+ lifters to their first competition.",
  },
  {
    img: COACH_DANE,
    name: "Dane Cole",
    role: "Conditioning & Boxing",
    text: "Ex-pro boxer, now the loudest voice in the conditioning room. In a good way.",
  },
  {
    img: COACH_LENA,
    name: "Lena Marsh",
    role: "Mobility & Recovery",
    text: "A physio by trade. Lena keeps the whole gym moving well and injury-free.",
  },
];

const PLANS = [
  {
    name: "Off-peak",
    price: "$29",
    per: "/month",
    note: "Train 06:00–16:00, weekdays",
    feats: [
      "Full gym floor access",
      "Off-peak hours only",
      "1 group class per week",
      "Locker room & showers",
    ],
    featured: false,
  },
  {
    name: "Unlimited",
    price: "$49",
    per: "/month",
    note: "Our most popular plan",
    feats: [
      "24/7 gym floor access",
      "Unlimited group classes",
      "All four programmes",
      "Monthly progress check-in",
      "Locker room & showers",
    ],
    featured: true,
  },
  {
    name: "All-in",
    price: "$79",
    per: "/month",
    note: "Everything, plus coaching",
    feats: [
      "Everything in Unlimited",
      "2 small-group PT sessions / month",
      "Personal programme, updated monthly",
      "Nutrition starter plan",
      "Guest pass, once a month",
    ],
    featured: false,
  },
];

const SCHEDULE = [
  { day: "Monday", time: "06:30", cls: "Strength — Foundations", coach: "Mara Voss" },
  { day: "Monday", time: "18:00", cls: "Boxing — Bag Work", coach: "Dane Cole" },
  { day: "Tuesday", time: "07:00", cls: "Conditioning — Engine", coach: "Dane Cole" },
  { day: "Tuesday", time: "18:30", cls: "Mobility & Yoga", coach: "Lena Marsh" },
  { day: "Wednesday", time: "06:30", cls: "Strength — Squat Focus", coach: "Mara Voss" },
  { day: "Wednesday", time: "18:00", cls: "Boxing — Pads & Footwork", coach: "Dane Cole" },
  { day: "Thursday", time: "07:00", cls: "Conditioning — Sled & Ropes", coach: "Dane Cole" },
  { day: "Thursday", time: "18:30", cls: "Mobility & Yoga", coach: "Lena Marsh" },
  { day: "Friday", time: "06:30", cls: "Strength — Press & Pull", coach: "Mara Voss" },
  { day: "Friday", time: "17:30", cls: "Boxing — Sparring (members)", coach: "Dane Cole" },
  { day: "Saturday", time: "09:00", cls: "Forge Saturday — Team WOD", coach: "All coaches" },
  { day: "Saturday", time: "11:00", cls: "Mobility & Recovery", coach: "Lena Marsh" },
];

export default function ForgeFitness() {
  const [joined, setJoined] = useState(false);
  const onJoin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <div className="for">
      {/* ---- nav ---- */}
      <header className="for-nav">
        <div className="for-nav-inner">
          <a className="for-brand" href="#top">
            FORGE<span>.</span>
          </a>
          <nav className="for-nav-links" aria-label="Gym">
            <a href="#programmes">Programmes</a>
            <a href="#coaches">Coaches</a>
            <a href="#pricing">Pricing</a>
            <a href="#schedule">Schedule</a>
          </nav>
          <a className="for-btn for-btn-sm" href="#join">
            Join now
          </a>
        </div>
      </header>

      {/* ---- hero ---- */}
      <section className="for-hero" id="top">
        <div className="for-hero-media">
          <Image
            src={HERO}
            alt="An athlete deadlifting a barbell on a dark gym floor"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="for-hero-shade" aria-hidden="true" />
        <div className="for-wrap for-hero-copy">
          <Reveal>
            <span className="for-kicker">Forge Fitness Club — Est. 2016</span>
            <h1>
              Stronger
              <br />
              <em>every day.</em>
            </h1>
            <p className="for-hero-sub">
              A no-nonsense gym with real coaching, real equipment and a room
              full of people who show up. No mirrors for posing — just work.
            </p>
            <div className="for-hero-cta">
              <a className="for-btn" href="#join">
                Start training →
              </a>
              <a className="for-btn ghost" href="#programmes">
                View programmes
              </a>
            </div>
            <div className="for-stats">
              <div>
                <strong>24/7</strong>
                <span>Access</span>
              </div>
              <div>
                <strong>40+</strong>
                <span>Classes / week</span>
              </div>
              <div>
                <strong>12</strong>
                <span>Coaches</span>
              </div>
              <div>
                <strong>900+</strong>
                <span>Members</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- programmes ---- */}
      <section className="for-section" id="programmes">
        <div className="for-wrap">
          <Reveal>
            <span className="for-kicker">Programmes</span>
            <h2 className="for-h2">
              Pick your <em>fight.</em>
            </h2>
            <p className="for-lede">
              Four programmes, one floor. Every class is coached, every
              session has a plan, and every member starts with a free
              intro session.
            </p>
          </Reveal>
          <div className="for-programmes">
            {PROGRAMMES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="for-programme">
                  <div className="for-programme-media">
                    <Image
                      src={p.img}
                      alt={p.title}
                      width={800}
                      height={1000}
                      sizes="(max-width: 900px) 100vw, 25vw"
                    />
                    <span className="for-programme-num">{p.num}</span>
                  </div>
                  <div className="for-programme-body">
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <span className="for-programme-meta">{p.meta}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- coaches ---- */}
      <section className="for-section for-section-dark" id="coaches">
        <div className="for-wrap">
          <Reveal>
            <span className="for-kicker">Coaches</span>
            <h2 className="for-h2">
              Coached by people <em>who lift.</em>
            </h2>
            <p className="for-lede">
              No clipboards, no guesswork. Our coaches train here too — and
              they know your name by week two.
            </p>
          </Reveal>
          <div className="for-coaches">
            {COACHES.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <article className="for-coach">
                  <div className="for-coach-media">
                    <Image
                      src={c.img}
                      alt={c.name}
                      width={1000}
                      height={1200}
                      sizes="(max-width: 860px) 100vw, 33vw"
                    />
                  </div>
                  <div className="for-coach-body">
                    <h3>{c.name}</h3>
                    <span className="for-coach-role">{c.role}</span>
                    <p>{c.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- pricing ---- */}
      <section className="for-section" id="pricing">
        <div className="for-wrap">
          <Reveal>
            <span className="for-kicker">Membership</span>
            <h2 className="for-h2">
              Simple pricing. <em>No lock-in.</em>
            </h2>
            <p className="for-lede">
              Month to month, cancel anytime. First week free on every plan —
              come and see if the room fits.
            </p>
          </Reveal>
          <div className="for-plans">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article className={`for-plan${p.featured ? " featured" : ""}`}>
                  {p.featured && (
                    <span className="for-plan-badge">Most popular</span>
                  )}
                  <h3>{p.name}</h3>
                  <span className="for-plan-note">{p.note}</span>
                  <div className="for-plan-price">
                    {p.price}
                    <span>{p.per}</span>
                  </div>
                  <ul>
                    {p.feats.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a
                    className={`for-btn${p.featured ? "" : " ghost"}`}
                    href="#join"
                  >
                    Choose {p.name}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- schedule ---- */}
      <section className="for-section for-section-dark" id="schedule">
        <div className="for-wrap">
          <Reveal>
            <span className="for-kicker">Class schedule</span>
            <h2 className="for-h2">
              This week <em>on the floor.</em>
            </h2>
            <p className="for-lede">
              Book in the app or just show up — members can drop into any
              class on their plan.
            </p>
          </Reveal>
          <div className="for-schedule">
            <div className="for-schedule-head" aria-hidden="true">
              <span>Day</span>
              <span>Time</span>
              <span>Class</span>
              <span>Coach</span>
            </div>
            {SCHEDULE.map((s, i) => (
              <div className="for-schedule-row" key={`${s.day}-${s.time}`}>
                <span className="for-schedule-day">{s.day}</span>
                <span className="for-schedule-time">{s.time}</span>
                <span className="for-schedule-class">{s.cls}</span>
                <span className="for-schedule-coach">{s.coach}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- testimonial ---- */}
      <section className="for-quote">
        <div className="for-quote-media">
          <Image
            src={CHALK}
            alt="An athlete chalking her hands before a barbell lift"
            fill
            sizes="100vw"
          />
        </div>
        <div className="for-quote-shade" aria-hidden="true" />
        <div className="for-wrap for-quote-inner">
          <Reveal>
            <span className="for-quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote>
              I joined for a month and stayed for three years. The coaching is
              the difference — someone actually watches your lifts and tells
              you the truth.
            </blockquote>
            <cite>
              <strong>Sana R.</strong> — Member since 2023, Strength programme
            </cite>
          </Reveal>
        </div>
      </section>

      {/* ---- join ---- */}
      <section className="for-section" id="join">
        <div className="for-wrap">
          <div className="for-join">
            <Reveal>
              <span className="for-kicker">Join Forge</span>
              <h2 className="for-h2">
                Your first week <em>is free.</em>
              </h2>
              <p className="for-lede">
                Tell us where you want to start. We will book your free intro
                session, show you the floor, and set up your first week —
                no card required.
              </p>
              <div className="for-join-img">
                <Image
                  src={GYM_FLOOR}
                  alt="Dumbbell racks on the Forge gym floor"
                  width={1400}
                  height={900}
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {joined ? (
                <div className="for-form-ok">
                  <strong>You&apos;re in.</strong>
                  <br />
                  Thanks — we&apos;ve got your details. A coach will be in
                  touch within one working day to book your free intro
                  session and your first week.
                </div>
              ) : (
                <form className="for-form" onSubmit={onJoin}>
                  <label>
                    Full name
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                    />
                  </label>
                  <label>
                    Email
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                  <label>
                    Your goal
                    <select name="goal" defaultValue="Build strength">
                      <option>Build strength</option>
                      <option>Get fit &amp; lose weight</option>
                      <option>Learn boxing</option>
                      <option>Move better &amp; recover</option>
                      <option>Just getting started</option>
                    </select>
                  </label>
                  <label>
                    Preferred start
                    <input name="start" type="date" required />
                  </label>
                  <button className="for-btn" type="submit">
                    Claim my free week →
                  </button>
                  <p className="for-form-fine">
                    No card required. No spam — one email to book your intro.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- footer ---- */}
      <footer className="for-footer">
        <div className="for-wrap">
          <div className="for-footer-top">
            <div>
              <a className="for-brand" href="#top">
                FORGE<span>.</span>
              </a>
              <p>
                Forge Fitness Club · 14 Ironworks Lane
                <br />
                Open 24/7 for members · hello@forge-fitness.com
              </p>
            </div>
            <nav className="for-footer-links" aria-label="Footer">
              <a href="#programmes">Programmes</a>
              <a href="#coaches">Coaches</a>
              <a href="#pricing">Pricing</a>
              <a href="#schedule">Schedule</a>
              <a href="#join">Join now</a>
            </nav>
          </div>
          <div className="for-footer-bottom">
            <span>© 2026 Forge Fitness Club. Train hard, recover harder.</span>
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
