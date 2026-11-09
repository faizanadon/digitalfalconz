"use client";
import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Motion";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const HERO = U("1600565193348-f74bd3c7ccdf", 2400); // chef flambéing, huge flames
const CHEF = U("1577219491135-ce391730fb2c", 1200); // chef plating under copper lamps

const DISHES = [
  {
    img: U("1467003909585-2f8a72700288"),
    name: "Cedar-Smoked Salmon",
    text: "Line-caught salmon, smoked over cedar, cucumber & dill salsa, wilted spinach, burnt lemon.",
    price: "$38",
    tag: "From the fire",
  },
  {
    img: U("1544025162-d76694265947"),
    name: "Ember-Glazed Short Rib",
    text: "Twelve-hour short rib, lacquered in ember glaze, smoked fries, charred tomato, pickles.",
    price: "$46",
    tag: "From the fire",
  },
  {
    img: U("1600891964092-4316c288032e"),
    name: "Dry-Aged Ribeye",
    text: "Forty-five-day dry-aged ribeye, finished over open flame, ember fries, herb butter.",
    price: "$58",
    tag: "From the grill",
  },
  {
    img: U("1555939594-58d7cb561ad1"),
    name: "Fire Mixed Grill",
    text: "Lamb chops, chicken skewers and wings off the coals, charred pepper and aubergine, four sauces.",
    price: "$42",
    tag: "To share",
  },
];

const GALLERY = [
  {
    img: U("1414235077428-338989a2e8c0"),
    title: "The dining room, by candlelight",
    tag: "The room",
  },
  {
    img: U("1517248135467-4c7edcad34c4"),
    title: "The room, after dark",
    tag: "The room",
  },
  {
    img: U("1552566626-52f8b828add9"),
    title: "The open kitchen",
    tag: "The kitchen",
  },
  {
    img: U("1551218808-94e220e084d2"),
    title: "Prep, before service",
    tag: "The kitchen",
  },
  {
    img: U("1504674900247-0877df9cc836"),
    title: "From the pass",
    tag: "The food",
  },
];

export default function EmberRestaurant() {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % GALLERY.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBooked(true);
  };

  const now = GALLERY[index];

  return (
    <div className="emb">
      {/* ---- nav ---- */}
      <header className="emb-nav">
        <div className="emb-nav-inner">
          <a className="emb-brand" href="#top">
            EMBER<span>.</span>
          </a>
          <nav className="emb-nav-links" aria-label="Restaurant">
            <a href="#menu">Menu</a>
            <a href="#story">Our story</a>
            <a href="#gallery">Gallery</a>
            <a href="#reserve">Reserve</a>
          </nav>
          <a className="emb-btn" href="#reserve">
            Book a table
          </a>
        </div>
      </header>

      {/* ---- hero ---- */}
      <section className="emb-hero" id="top">
        <div className="emb-hero-img">
          <Image
            src={HERO}
            alt="A chef flambéing a pan over open fire in a dark kitchen"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="emb-hero-copy">
          <Reveal>
            <span className="emb-kicker">Fine dining · Wood-fired</span>
            <h1>
              Fire, smoke <em>&amp; season.</em>
            </h1>
            <p className="emb-hero-sub">
              A small, dark room where everything is cooked over live fire.
              No gas, no shortcuts — just ember, patience, and the season&apos;s
              best.
            </p>
            <div className="emb-hero-cta">
              <a className="emb-btn" href="#reserve">
                Book a table →
              </a>
              <a className="emb-btn ghost" href="#menu">
                Explore the menu
              </a>
            </div>
            <div className="emb-hero-meta">
              Tue – Sun · 6pm – 11pm · 14 tables only
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- philosophy ---- */}
      <section className="emb-section">
        <div className="emb-wrap">
          <div className="emb-phil">
            <Reveal>
              <span className="emb-kicker">Our philosophy</span>
              <p className="emb-big">
                We cook the way people always have — <em>over fire.</em> One
                grill, one oven, one menu that changes with the season, and a
                room small enough that every table feels like the best one.
              </p>
              <div className="emb-rule" aria-hidden="true" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- signature dishes ---- */}
      <section className="emb-section" id="menu" style={{ paddingTop: 0 }}>
        <div className="emb-wrap">
          <Reveal>
            <span className="emb-kicker">The menu</span>
            <h2 className="emb-h2">
              Signature <em>dishes.</em>
            </h2>
            <p className="emb-lede">
              Four plates that never leave the menu — the rest follows the
              market, the fire and the season.
            </p>
          </Reveal>
          <div className="emb-dishes">
            {DISHES.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08}>
                <article className="emb-dish">
                  <div className="emb-dish-media">
                    <Image
                      src={d.img}
                      alt={d.name}
                      width={1200}
                      height={750}
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                  </div>
                  <div className="emb-dish-body">
                    <div className="emb-dish-top">
                      <h3>{d.name}</h3>
                      <span className="emb-dish-price">{d.price}</span>
                    </div>
                    <p>{d.text}</p>
                    <div className="emb-dish-tag">{d.tag}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- chef ---- */}
      <section className="emb-section" id="story" style={{ paddingTop: 0 }}>
        <div className="emb-wrap">
          <div className="emb-chef">
            <Reveal>
              <div className="emb-chef-img">
                <Image
                  src={CHEF}
                  alt="The chef plating dishes under warm copper heat lamps"
                  width={1200}
                  height={1480}
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <span className="emb-kicker">Our story</span>
                <h2>
                  One chef. One fire. <em>No shortcuts.</em>
                </h2>
                <p>
                  Ember began with a single wood-fired oven and a stubborn
                  idea: that the best cooking is the oldest cooking. Chef
                  Mara Ellison trained in three-star kitchens and then walked
                  away from them — to a fourteen-table room where the grill
                  is the only heat source and the menu is written each
                  morning, after the market.
                </p>
                <p>
                  Everything here is touched by fire at least once. Even the
                  desserts see the coals. It is slower, it is harder, and it
                  is the only way she will cook.
                </p>
                <div className="emb-sig">Mara Ellison</div>
                <div className="emb-role">Chef &amp; Founder</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- gallery carousel ---- */}
      <section className="emb-section" id="gallery" style={{ paddingTop: 0 }}>
        <div className="emb-wrap">
          <Reveal>
            <span className="emb-kicker">Gallery</span>
            <h2 className="emb-h2">
              The room, <em>the fire,</em> the food.
            </h2>
          </Reveal>
          <div
            style={{ marginTop: 48 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="emb-gallery">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                >
                  <div className="emb-gallery-media">
                    <Image
                      src={now.img}
                      alt={now.title}
                      width={1600}
                      height={950}
                      sizes="(max-width: 900px) 100vw, 90vw"
                    />
                    <div className="emb-gallery-cap">
                      <h3>{now.title}</h3>
                      <span>{now.tag}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <button
                className="emb-arrow prev"
                aria-label="Previous photo"
                onClick={() =>
                  setIndex((index - 1 + GALLERY.length) % GALLERY.length)
                }
              >
                ←
              </button>
              <button
                className="emb-arrow next"
                aria-label="Next photo"
                onClick={() => setIndex((index + 1) % GALLERY.length)}
              >
                →
              </button>
            </div>
            <div className="emb-dots" role="tablist" aria-label="Gallery">
              {GALLERY.map((g, i) => (
                <button
                  key={g.title}
                  className={i === index ? "on" : ""}
                  aria-label={g.title}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- testimonial ---- */}
      <section className="emb-section" style={{ paddingTop: 0 }}>
        <div className="emb-wrap">
          <div className="emb-quote">
            <Reveal>
              <div className="emb-stars" aria-label="Five stars">
                ★ ★ ★ ★ ★
              </div>
              <blockquote>
                “The ribeye alone is worth the booking, but it is the room —
                dark, warm, <em>alive with fire</em> — that makes you stay
                for dessert.”
              </blockquote>
              <cite>The Table Review · Best New Restaurant</cite>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- reservations ---- */}
      <section className="emb-section" id="reserve" style={{ paddingTop: 0 }}>
        <div className="emb-wrap">
          <div className="emb-book">
            <Reveal>
              <span className="emb-kicker">Reservations</span>
              <h2>Book a table.</h2>
              <p>
                Fourteen tables, two seatings a night. Book ahead — weekends
                go first, and the counter seats are gone within days.
              </p>
              <p className="emb-note">
                Prefer to talk? Call +1 (212) 555-0184, or write to
                hello@ember-restaurant.com. Parties of seven or more, please
                call — we will build the evening around you.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              {booked ? (
                <div className="emb-form-ok">
                  <strong>Thank you — your request is in.</strong>
                  <br />
                  We have your details and will confirm your table by email
                  within a few hours. We hold every booking for 24 hours
                  while you decide.
                </div>
              ) : (
                <form className="emb-form" onSubmit={onBook}>
                  <label>
                    Full name
                    <input name="name" type="text" placeholder="Your name" required />
                  </label>
                  <label>
                    Email
                    <input name="email" type="email" placeholder="you@example.com" required />
                  </label>
                  <label>
                    Date
                    <input name="date" type="date" required />
                  </label>
                  <label>
                    Time
                    <select name="time" defaultValue="7:00 PM">
                      <option>6:00 PM</option>
                      <option>7:00 PM</option>
                      <option>8:00 PM</option>
                      <option>9:00 PM</option>
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
                    Occasion
                    <select name="occasion" defaultValue="Just dinner">
                      <option>Just dinner</option>
                      <option>Birthday</option>
                      <option>Anniversary</option>
                      <option>Business</option>
                    </select>
                  </label>
                  <label className="full">
                    Notes
                    <input
                      name="notes"
                      type="text"
                      placeholder="Allergies, window seat, a quiet corner…"
                    />
                  </label>
                  <button className="emb-btn" type="submit">
                    Request my table →
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- hours + location ---- */}
      <section className="emb-section" style={{ paddingTop: 0 }}>
        <div className="emb-wrap">
          <div className="emb-visit">
            <div className="emb-visit-item">
              <span className="emb-kicker">Hours</span>
              <h3>When we cook</h3>
              <p>
                Tuesday – Sunday
                <br />
                6:00 PM – 11:00 PM
                <br />
                Closed Mondays
              </p>
            </div>
            <div className="emb-visit-item">
              <span className="emb-kicker">Find us</span>
              <h3>Where we are</h3>
              <p>
                14 Ember Lane, Old Town
                <br />
                New York, NY 10012
                <br />
                +1 (212) 555-0184
              </p>
            </div>
            <div className="emb-visit-item">
              <span className="emb-kicker">Good to know</span>
              <h3>Before you come</h3>
              <p>
                Smart dress, no rush.
                <br />
                Tasting menu for the whole table.
                <br />
                Corkage $40 per bottle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- footer ---- */}
      <footer className="emb-footer">
        <div className="emb-wrap">
          <div className="emb-footer-top">
            <div>
              <a className="emb-brand" href="#top">
                EMBER<span>.</span>
              </a>
              <p>
                Fine dining, cooked over live fire. Fourteen tables, one
                grill, and a menu that follows the season.
              </p>
            </div>
            <nav className="emb-footer-links" aria-label="Footer">
              <a href="#menu">Menu</a>
              <a href="#story">Our story</a>
              <a href="#gallery">Gallery</a>
              <a href="#reserve">Reserve</a>
            </nav>
          </div>
          <div className="emb-footer-bottom">
            <span>© 2026 Ember Restaurant · 14 Ember Lane, New York</span>
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
