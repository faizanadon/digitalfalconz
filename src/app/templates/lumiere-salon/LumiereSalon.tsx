"use client";
import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Motion";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const HERO = U("1487412947147-5cebf100ffc2", 1400); // makeup application close-up
const BOOK_IMG = U("1512496015851-a90fb38ba796", 1200); // makeup flat lay

const SERVICES = [
  {
    name: "Signature Haircut",
    text: "A slow consultation, a precise cut, and a finish that grows out beautifully.",
    price: "$48",
    time: "60 min",
  },
  {
    name: "Colour & Balayage",
    text: "Soft dimension, lived-in blonde or rich gloss — colour that looks like you, only better.",
    price: "from $85",
    time: "120 min",
  },
  {
    name: "Skin & Facials",
    text: "A deeply relaxing facial, tailored to your skin — cleanse, mask, massage, glow.",
    price: "$65",
    time: "75 min",
  },
  {
    name: "Manicure & Pedicure",
    text: "Careful shaping, cuticle care and a flawless polish — classic, gel or bare and buffed.",
    price: "$38",
    time: "60 min",
  },
  {
    name: "Massage & Rituals",
    text: "Warm oil, slow strokes and an hour that belongs entirely to you.",
    price: "$70",
    time: "60 min",
  },
  {
    name: "Bridal",
    text: "Hair, makeup and calm — a full morning of being looked after, from trial to the day itself.",
    price: "from $240",
    time: "By appointment",
  },
];

const GALLERY = [
  {
    img: U("1521590832167-7bcbfaa6381f", 1600),
    caption: "The salon — three chairs, soft light, nowhere to rush.",
  },
  {
    img: U("1562322140-8baeececf3df", 1600),
    caption: "A blow-dry that holds, styled by hand.",
  },
  {
    img: U("1570172619644-dfd03ed5d881", 1600),
    caption: "A facial, applied slowly, one brushstroke at a time.",
  },
  {
    img: U("1604654894610-df63bc536371", 1600),
    caption: "Tortoiseshell and black — a manicure with intent.",
  },
  {
    img: U("1523263685509-57c1d050d19b", 1600),
    caption: "Bridal — hair, makeup and a calm morning.",
  },
];

const STYLISTS = [
  {
    img: U("1595476108010-b4d1f102b1b1", 900),
    name: "Amara",
    role: "Hair · Founder",
    text: "Twelve years behind the chair. Amara cuts for the way your hair actually falls — and washes it like a ritual.",
  },
  {
    img: U("1580618672591-eb180b1a973f", 900),
    name: "Sofia",
    role: "Colour & Styling",
    text: "Balayage, lived-in blonde and blow-dries that last the week. Sofia's chair is the one everyone asks for.",
  },
  {
    img: U("1544161515-4ab6ce6db874", 900),
    name: "Elena",
    role: "Skin & Spa",
    text: "Facials and massage with warm oil and unhurried hands. Elena's treatments are the reason people come back.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I walked in frazzled and walked out feeling like myself again. The hour with Elena is the best money I spend all month.",
    name: "Maya R.",
    detail: "Regular since 2023",
  },
  {
    quote:
      "Sofia understood my hair better in ten minutes than anyone has in years. I have never had so many compliments on a cut.",
    name: "Hannah L.",
    detail: "Colour & cut",
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

export default function LumiereSalon() {
  const [paused, setPaused] = useState(false);
  const [slide, setSlide] = useAutoAdvance(GALLERY.length, 5000, paused);
  const [booked, setBooked] = useState(false);

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBooked(true);
  };

  const now = GALLERY[slide];

  return (
    <div className="lum">
      {/* ---- nav ---- */}
      <header className="lum-nav">
        <div className="lum-nav-inner">
          <a className="lum-brand" href="#top">
            LUMIÈRE
          </a>
          <nav className="lum-nav-links" aria-label="Salon">
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#stylists">Stylists</a>
            <a href="#book">Book</a>
          </nav>
          <a className="lum-btn" href="#book">
            Book now
          </a>
        </div>
      </header>

      {/* ---- hero ---- */}
      <section className="lum-hero" id="top">
        <div className="lum-hero-copy">
          <Reveal>
            <span className="lum-kicker">Beauty salon &amp; spa</span>
            <h1>
              Beauty, <em>unhurried.</em>
            </h1>
            <p className="lum-hero-sub">
              A quiet salon where nothing is rushed — hair, skin, nails and
              stillness, in soft light, with people who take their time.
            </p>
            <div className="lum-hero-cta">
              <a className="lum-btn" href="#book">
                Book an appointment →
              </a>
              <a className="lum-btn ghost" href="#services">
                Explore services
              </a>
            </div>
            <p className="lum-hero-note">
              Tue–Sat · 9:00–19:00 — 12 Rosewater Lane
            </p>
          </Reveal>
        </div>
        <div className="lum-hero-media">
          <Image
            src={HERO}
            alt="A makeup artist applying lipstick in soft light"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ---- services ---- */}
      <section className="lum-section" id="services">
        <div className="lum-wrap">
          <Reveal>
            <span className="lum-kicker">What we do</span>
            <h2 className="lum-h2">
              Slow beauty, <em>done well.</em>
            </h2>
            <p className="lum-lede">
              Six services, each given the time it deserves. Every appointment
              begins with a consultation and a cup of tea.
            </p>
          </Reveal>
          <div className="lum-services">
            {SERVICES.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <article className="lum-service">
                  <span className="lum-service-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                  <div className="lum-service-foot">
                    <span className="lum-service-price">{s.price}</span>
                    <span className="lum-service-time">{s.time}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- gallery carousel ---- */}
      <section className="lum-section" id="gallery" style={{ paddingTop: 0 }}>
        <div className="lum-wrap">
          <Reveal>
            <span className="lum-kicker">Inside the salon</span>
            <h2 className="lum-h2">
              A look <em>around.</em>
            </h2>
          </Reveal>
          <div
            style={{ marginTop: 40 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="lum-gallery">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                >
                  <div className="lum-gallery-media">
                    <Image
                      src={now.img}
                      alt={now.caption}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 900px) 100vw, 90vw"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              <button
                className="lum-arrow prev"
                aria-label="Previous photo"
                onClick={() =>
                  setSlide((slide - 1 + GALLERY.length) % GALLERY.length)
                }
              >
                ←
              </button>
              <button
                className="lum-arrow next"
                aria-label="Next photo"
                onClick={() => setSlide((slide + 1) % GALLERY.length)}
              >
                →
              </button>
              <p className="lum-gallery-cap">{now.caption}</p>
            </div>
            <div className="lum-dots" role="tablist" aria-label="Gallery">
              {GALLERY.map((g, i) => (
                <button
                  key={g.caption}
                  className={i === slide ? "on" : ""}
                  aria-label={g.caption}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- stylists ---- */}
      <section className="lum-section" id="stylists" style={{ paddingTop: 0 }}>
        <div className="lum-wrap">
          <Reveal>
            <span className="lum-kicker">Your stylists</span>
            <h2 className="lum-h2">
              In <em>good hands.</em>
            </h2>
            <p className="lum-lede">
              Three people, three crafts — and a shared belief that nobody
              should ever feel rushed in the chair.
            </p>
          </Reveal>
          <div className="lum-stylists">
            {STYLISTS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <article className="lum-stylist">
                  <div className="lum-stylist-media">
                    <Image
                      src={s.img}
                      alt={`${s.name} — ${s.role}`}
                      width={900}
                      height={1100}
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  </div>
                  <div className="lum-stylist-body">
                    <h3>{s.name}</h3>
                    <div className="lum-stylist-role">{s.role}</div>
                    <p>{s.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- testimonials ---- */}
      <section className="lum-testimonials lum-section" style={{ paddingTop: 0 }}>
        <div className="lum-wrap">
          <Reveal>
            <span className="lum-kicker">Kind words</span>
            <h2 className="lum-h2">
              What our guests <em>say.</em>
            </h2>
          </Reveal>
          <div className="lum-quotes">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <blockquote className="lum-quote">
                  <p>“{t.quote}”</p>
                  <footer>
                    <strong>{t.name}</strong>
                    <span>{t.detail}</span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- booking ---- */}
      <section className="lum-section" id="book" style={{ paddingTop: 0 }}>
        <div className="lum-wrap">
          <div className="lum-book">
            <div className="lum-book-media">
              <Image
                src={BOOK_IMG}
                alt="Makeup, brushes and a candle on a vanity table"
                width={1200}
                height={1400}
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
            <div className="lum-book-body">
              <Reveal>
                <span className="lum-kicker">Reserve your chair</span>
                <h2>Book an appointment</h2>
                <p>
                  Choose a service, a stylist and a time — we confirm every
                  booking personally within a few hours.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                {booked ? (
                  <div className="lum-form-ok">
                    <strong>Thank you — your request is in.</strong>
                    <br />
                    We will write back shortly to confirm your time. If you
                    need to change anything, just reply to our message.
                  </div>
                ) : (
                  <form className="lum-form" onSubmit={onBook}>
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
                      Service
                      <select name="service" defaultValue="Signature Haircut">
                        <option>Signature Haircut</option>
                        <option>Colour &amp; Balayage</option>
                        <option>Skin &amp; Facials</option>
                        <option>Manicure &amp; Pedicure</option>
                        <option>Massage &amp; Rituals</option>
                        <option>Bridal</option>
                      </select>
                    </label>
                    <label>
                      Stylist
                      <select name="stylist" defaultValue="No preference">
                        <option>No preference</option>
                        <option>Amara</option>
                        <option>Sofia</option>
                        <option>Elena</option>
                      </select>
                    </label>
                    <label>
                      Date
                      <input name="date" type="date" required />
                    </label>
                    <label>
                      Time
                      <select name="time" defaultValue="10:00">
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                      </select>
                    </label>
                    <button className="lum-btn" type="submit">
                      Request my appointment →
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- hours + location ---- */}
      <section className="lum-hours">
        <div className="lum-wrap">
          <p>
            <strong>Tue–Sat</strong> 9:00–19:00 &nbsp;·&nbsp;{" "}
            <strong>Sun</strong> 10:00–16:00 &nbsp;·&nbsp;{" "}
            <strong>Mon</strong> closed &nbsp;·&nbsp; 12 Rosewater Lane,
            Mayfair &nbsp;·&nbsp; hello@lumiere-salon.com &nbsp;·&nbsp; +44 20
            7946 0000
          </p>
        </div>
      </section>

      {/* ---- footer ---- */}
      <footer className="lum-footer">
        <div className="lum-wrap">
          <div className="lum-footer-top">
            <a className="lum-brand" href="#top">
              LUMIÈRE
            </a>
            <nav className="lum-footer-links" aria-label="Footer">
              <a href="#services">Services</a>
              <a href="#gallery">Gallery</a>
              <a href="#stylists">Stylists</a>
              <a href="#book">Book</a>
            </nav>
          </div>
          <div className="lum-footer-bottom">
            <span>Lumière Salon &amp; Spa · 12 Rosewater Lane, Mayfair</span>
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
