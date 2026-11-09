"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Motion";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Hollow's own demo videos (publicly served on framerusercontent.com) —
   used here so the hero and class cards move like the reference. Swap for
   stock video any time; the layout does not depend on them. */
const HERO_VIDEO =
  "https://framerusercontent.com/assets/PZXDlESkejc7HzJ14V8qRSWoXFE.mp4";
const YOGA_VIDEO =
  "https://framerusercontent.com/assets/YgF6U7ohT0jDSA7rRoqeXIoh9VY.mp4";
const PILATES_VIDEO =
  "https://framerusercontent.com/assets/sbuxtDIPvFOAcWoDh0v5nKFPIQ.mp4";
const MEDITATION_VIDEO =
  "https://framerusercontent.com/assets/ErO0BFzv8kHWcump8GVZ7oJs8Sk.mp4";

const STUDIO_IMG = U("1575052814086-f385e2e2ad1b", 1200); // indoor yoga, soft
const LAKE_IMG = U("1508672019048-805c876b67e2", 1200); // meditation on a mountain lake
const FOREST_IMG = U("1441974231531-c6227db76b6e", 1600); // sunlit forest path
const MEDITATION_IMG = U("1552196563-55cd4e45efb3", 1200); // minimal meditation
const SPA_IMG = U("1600334129128-685c5582fd35", 1400); // hot stone massage
const BEACH_YOGA_IMG = U("1545205597-3d9d02c29597", 1400); // group yoga on the beach

const CLASSES = [
  {
    video: YOGA_VIDEO,
    title: "Yoga",
    text: "Gentle rhythms, stillness, and a deeper kind of strength.",
  },
  {
    video: PILATES_VIDEO,
    title: "Pilates Mat",
    text: "Low to the ground. High focus. Full body tone and balance.",
  },
  {
    video: MEDITATION_VIDEO,
    title: "Meditation",
    text: "Spring-loaded strength, deeper control, moving with precision.",
  },
];

const FLOATS = [
  { img: U("1499209974431-9dddcece7f88", 500), x: "6%", y: "14%", w: 150, r: "-6deg", d: "0s" },
  { img: U("1544367567-0f2fcb009e0b", 500), x: "14%", y: "62%", w: 120, r: "4deg", d: "1.2s" },
  { img: U("1441974231531-c6227db76b6e", 500), x: "80%", y: "10%", w: 140, r: "5deg", d: "0.6s" },
  { img: U("1476231682828-37e571bc172f", 500), x: "86%", y: "60%", w: 130, r: "-4deg", d: "1.8s" },
  { img: U("1518611012118-696072aa579a", 500), x: "30%", y: "78%", w: 110, r: "3deg", d: "0.9s" },
  { img: U("1502082553048-f009c37129b9", 500), x: "64%", y: "80%", w: 120, r: "-5deg", d: "1.5s" },
];

export default function SomaRetreat() {
  const [subscribed, setSubscribed] = useState(false);
  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="sm">
      {/* ---- floating pill nav ---- */}
      <header className="sm-nav">
        <div className="sm-nav-inner">
          <a className="sm-brand" href="#top">
            SOMA
          </a>
          <nav className="sm-nav-links" aria-label="Retreat">
            <a href="#classes">Classes</a>
            <a href="#retreat">Retreat</a>
            <a href="#studio">Studio</a>
            <a href="#first-time">First time</a>
            <a href="#journal">Journal</a>
          </nav>
          <a className="sm-btn" href="#retreat">
            Book a retreat
          </a>
        </div>
      </header>

      {/* ---- hero: full-viewport video ---- */}
      <section className="sm-hero" id="top">
        <div className="sm-hero-frame">
          <video
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            poster={U("1499209974431-9dddcece7f88", 2000)}
          />
          <svg
            className="sm-squiggle"
            viewBox="0 0 280 110"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 66 C 30 22, 50 22, 66 58 C 82 94, 102 94, 118 58 C 134 22, 154 22, 170 58 C 186 94, 206 94, 222 58 C 238 22, 258 22, 272 56"
              stroke="#e6f6ba"
              strokeWidth="11"
              strokeLinecap="round"
            />
          </svg>
          <h1 className="sm-hero-h1">
            Come home
            <br />
            <em>to your body.</em>
          </h1>
          <a className="sm-news" href="#retreat">
            <span className="sm-lime-pill">News</span>
            <p>
              A Small Change in the Air — Updated Schedule Starting September
              <span className="sm-news-arrow">↗</span>
            </p>
          </a>
        </div>
      </section>

      {/* ---- manifesto ---- */}
      <section className="sm-section">
        <div className="sm-wrap">
          <div className="sm-manifesto">
            <Reveal>
              <p className="sm-state">
                We believe in embodied practice that nourishes every part of
                you — body, mind and spirit. Our classes aren&apos;t about
                perfect shapes. They&apos;re about real presence, deep
                listening, and joyful strength.
              </p>
            </Reveal>
            <div className="sm-divider" aria-hidden="true" />
            <div className="sm-values">
              <Reveal delay={0}>
                <div className="sm-value">
                  <span className="sm-ico">✦</span>
                  <span className="sm-label">Rooted in softness</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="sm-value">
                  <span className="sm-ico">❋</span>
                  <span className="sm-label">Designed for presence</span>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="sm-value">
                  <span className="sm-ico">☀</span>
                  <span className="sm-label">Real energy</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- classes ---- */}
      <section className="sm-section" id="classes" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <div className="sm-sec-head">
            <Reveal>
              <span className="sm-label">Classes</span>
              <h2 className="sm-h2">
                Three <em>paths.</em>
                <br />
                One <em>intention.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p>
                  Each session is a different way to return — to your body,
                  to presence, to breath.
                </p>
                <a className="sm-btn" href="#retreat" style={{ marginTop: 18 }}>
                  All classes →
                </a>
              </div>
            </Reveal>
          </div>
          <div className="sm-classes-grid">
            {CLASSES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <article className="sm-class">
                  <div className="sm-class-media">
                    <video src={c.video} autoPlay muted loop playsInline />
                    <div className="sm-class-eye" aria-hidden="true">
                      <span>◉</span>
                    </div>
                  </div>
                  <div className="sm-class-body">
                    <p>{c.text}</p>
                    <h3>{c.title}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- studio / about teaser ---- */}
      <section className="sm-section" id="studio" style={{ paddingTop: 0 }}>
        <div className="sm-wrap">
          <div className="sm-studio">
            <Reveal>
              <div className="sm-studio-img">
                <Image
                  src={STUDIO_IMG}
                  alt="A teacher practising yoga in a bright, pale studio"
                  width={1200}
                  height={1440}
                  sizes="(max-width: 860px) 100vw, 45vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <span className="sm-byline">Elena Marsh</span>
                <div style={{ marginTop: 14 }}>
                  <span className="sm-label">Our studio</span>
                </div>
                <h2>
                  More than a studio. <em>It&apos;s a way of coming home.</em>
                </h2>
                <p>
                  Soma was born from the need for softness. For a space that
                  doesn&apos;t ask you to perform — just to be. A quiet room,
                  a forest house, and teachers who meet you exactly where you
                  are.
                </p>
                <a className="sm-btn" href="#first-time">
                  About →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- events / featured retreat ---- */}
      <section className="sm-events" id="retreat">
        <div
          className="sm-events-bg"
          style={{ backgroundImage: `url(${FOREST_IMG})` }}
          aria-hidden="true"
        />
        <div className="sm-wrap">
          <Reveal>
            <div className="sm-events-card">
              <div className="sm-events-body">
                <span className="sm-label">Events</span>
                <h2>
                  Upcoming <em>Retreat</em>
                </h2>
                <p>
                  Step away from the noise. Join us for a weekend of
                  stillness, movement and deep connection in nature.
                </p>
                <a className="sm-btn" href="#first-time">
                  See all events →
                </a>
                <div style={{ marginTop: 28 }}>
                  <span className="sm-lime-pill">September 12–15</span>
                </div>
                <p style={{ margin: "14px 0 0", fontWeight: 700, color: "#594a3c" }}>
                  Late Summer Yoga Retreat · Kaszuby, Poland
                </p>
                <p style={{ margin: "6px 0 0" }}>
                  A 4-day escape into nature. Morning flows, evening
                  meditations, shared meals and sacred rest.
                </p>
                <a className="sm-btn lime" href="#first-time" style={{ marginTop: 22 }}>
                  View details →
                </a>
              </div>
              <div className="sm-events-media">
                <span className="sm-events-when">
                  <span className="sm-lime-pill">Sept 12–15</span>
                </span>
                <Image
                  src={LAKE_IMG}
                  alt="A person meditating on a wooden deck over a mountain lake"
                  width={1200}
                  height={1400}
                  sizes="(max-width: 860px) 100vw, 40vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- first time ---- */}
      <section className="sm-first sm-section" id="first-time">
        <div className="sm-wrap">
          <div className="sm-first-grid">
            <Reveal>
              <div>
                <span className="sm-lime-pill">First time with us?</span>
                <h2>
                  Start your journey <em>gently.</em>
                </h2>
                <p>
                  Everything you need to know — how to prepare, what to
                  bring, and what to expect from your first visit.
                </p>
                <a className="sm-btn white" href="#journal">
                  Learn how to prepare →
                </a>
                <div className="sm-first-cards">
                  <div className="sm-first-card">
                    <span className="sm-ico">◐</span>
                    <h3>Supportive teachers</h3>
                    <p>
                      We guide you with care, not pressure. Every class meets
                      you where you are.
                    </p>
                  </div>
                  <div className="sm-first-card">
                    <span className="sm-ico">◔</span>
                    <h3>Slow pace</h3>
                    <p>
                      No rush. No noise. Just time to land in your body.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="sm-first-img">
                <Image
                  src={MEDITATION_IMG}
                  alt="A woman meditating with eyes closed in a bright, minimal studio"
                  width={1200}
                  height={1320}
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- journal / blog ---- */}
      <section className="sm-section" id="journal">
        <div className="sm-wrap">
          <div className="sm-sec-head">
            <Reveal>
              <span className="sm-label">Blog &amp; News</span>
              <h2 className="sm-h2">
                Reflections from <em>our practice</em> — simple, slow, and
                embodied.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p>
                  Notes on listening, breathing and moving — written the way
                  we teach: gently, and without hurry.
                </p>
                <a className="sm-btn" href="#journal" style={{ marginTop: 18 }}>
                  All articles →
                </a>
              </div>
            </Reveal>
          </div>
          <div className="sm-journal-grid">
            <Reveal>
              <article className="sm-post">
                <div className="sm-post-media">
                  <span className="sm-lime-pill">Body</span>
                  <Image
                    src={SPA_IMG}
                    alt="A hot stone massage with white orchids"
                    width={1400}
                    height={920}
                    sizes="(max-width: 760px) 100vw, 45vw"
                  />
                </div>
                <div className="sm-post-body">
                  <h3>
                    Listening to Your Body: A Gentle Guide to Practicing with
                    Awareness
                  </h3>
                  <span className="sm-date">May 23, 2025</span>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className="sm-post">
                <div className="sm-post-media">
                  <span className="sm-lime-pill">Body</span>
                  <Image
                    src={BEACH_YOGA_IMG}
                    alt="A group practising yoga together on a beach"
                    width={1400}
                    height={920}
                    sizes="(max-width: 760px) 100vw, 45vw"
                  />
                </div>
                <div className="sm-post-body">
                  <h3>
                    Finding Your Balance: Navigating Daily Transitions
                  </h3>
                  <span className="sm-date">Jun 20, 2026</span>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- final CTA ---- */}
      <section className="sm-cta">
        <div
          className="sm-cta-bg"
          style={{ backgroundImage: `url(${LAKE_IMG})` }}
          aria-hidden="true"
        />
        {FLOATS.map((f) => (
          <div
            key={f.img}
            className="sm-float"
            style={{
              left: f.x,
              top: f.y,
              width: f.w,
              height: f.w * 1.25,
              ["--r" as string]: f.r,
              animationDelay: f.d,
            }}
          >
            <Image src={f.img} alt="" width={500} height={625} sizes="200px" />
          </div>
        ))}
        <div className="sm-wrap sm-cta-inner">
          <h2>Find what moves you</h2>
          <div className="sm-cta-btns">
            <a className="sm-btn light" href="#classes">
              Explore classes →
            </a>
            <a className="sm-btn outline" href="#top">
              Visit Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* ---- footer ---- */}
      <footer className="sm-footer">
        <div
          className="sm-footer-bg"
          style={{ backgroundImage: `url(${FOREST_IMG})` }}
          aria-hidden="true"
        />
        <div className="sm-wrap sm-footer-inner">
          <div className="sm-footer-top">
            <div className="sm-footer-news">
              <h3>Join our healing newsletter</h3>
              {subscribed ? (
                <p style={{ color: "#e6f6ba", margin: 0 }}>
                  Thank you — you&apos;re in. A gentle note, once a month.
                </p>
              ) : (
                <form className="sm-news-form" onSubmit={onSubscribe}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    aria-label="Email address"
                    required
                  />
                  <button className="sm-btn light" type="submit">
                    Subscribe →
                  </button>
                </form>
              )}
            </div>
            <nav className="sm-footer-links" aria-label="Footer">
              <ul>
                <li><a href="#classes">Classes</a></li>
                <li><a href="#retreat">Events</a></li>
                <li><a href="#studio">About</a></li>
                <li><a href="#first-time">Your first time</a></li>
              </ul>
              <ul>
                <li><a href="#journal">Blogs &amp; news</a></li>
                <li><a href="#retreat">Retreats</a></li>
                <li><a href="#top">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className="sm-footer-mid">
            <small>© 2026 Soma Retreat — a yoga &amp; retreat template</small>
            <a className="sm-brand" href="#top">
              SOMA
            </a>
            <small>Legal · Style Guide · Licenses</small>
          </div>
          <div className="sm-footer-bottom">
            <em>Peace comes from within. Do not seek it without.</em>
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
