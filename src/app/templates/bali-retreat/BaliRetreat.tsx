"use client";
import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Motion";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const HERO = U("1555400038-63f5ba517a47", 2400); // Tegalalang rice terraces
const TEMPLE_MIST = U("1537996194471-e657df975ab4"); // Ulun Danu Beratan, misty
const TEMPLE_DAY = U("1544644181-1484b3fdfc62"); // Ulun Danu Beratan, daytime
const GATE = U("1537953773345-d172ccf13cf1"); // Handara Gate
const PENIDA = U("1577717903315-1691ae25ab3f"); // Nusa Penida cliffs
const YOGA = U("1506126613408-eca07ce68773"); // sunrise meditation
const SPA = U("1544161515-4ab6ce6db874"); // spa massage
const SPA_STILL = U("1540555700478-4be289fbecef"); // spa still life
const POOL_JUNGLE = U("1520250497591-112f2f40a3f4"); // resort pool, jungle
const POOL_DUSK = U("1571896349842-33c89424de2d"); // resort pool at dusk
const POOL_OCEAN = U("1582719508461-905c673771fd"); // infinity pool, ocean
const POOL_AFRAME = U("1566073771259-6a8506099945"); // resort pool, A-frame
const POOL_BEACH = U("1584132967334-10e028bd69f7"); // infinity pool, beach
const VILLA_ROOM = U("1611892440504-42a792e24d32"); // villa bedroom
const POOL_SUNSET = U("1571003123894-1f0594d2b5d9"); // sunset pool cabanas

const EXPERIENCES = [
  {
    img: YOGA,
    title: "Sunrise Yoga",
    text: "Salutations as the mist lifts off the valley, on a bamboo deck above the rice fields.",
    time: "Daily · 06:00",
  },
  {
    img: SPA,
    title: "Spa & Healing",
    text: "Balinese massage, flower baths and sound healing in an open-air jungle spa.",
    time: "Daily · 10:00 – 20:00",
  },
  {
    img: TEMPLE_DAY,
    title: "Temple & Culture",
    text: "Water temples, blessing ceremonies and a guided walk through Ubud's living traditions.",
    time: "Wed & Sat",
  },
  {
    img: PENIDA,
    title: "Island Day",
    text: "A boat to Nusa Penida — cliff beaches, turquoise water and lunch above the bay.",
    time: "Fridays",
  },
];

const VILLAS = [
  {
    img: POOL_JUNGLE,
    tag: "Most loved",
    name: "Garden Pool Villa",
    text: "A private plunge pool wrapped in banana palms and frangipani, with an outdoor rain shower and a daybed for slow afternoons.",
    size: "68 m²",
    sleeps: "Sleeps 2",
    price: "$320",
    feats: ["Private plunge pool", "Outdoor shower", "Garden terrace", "Daily breakfast"],
  },
  {
    img: POOL_OCEAN,
    tag: "Ocean view",
    name: "Valley Infinity Villa",
    text: "An infinity edge that melts into the jungle valley, a sun deck for golden hour, and a bedroom that opens fully to the trees.",
    size: "94 m²",
    sleeps: "Sleeps 2",
    price: "$480",
    feats: ["Infinity pool", "Valley view", "Sun deck", "Daily breakfast"],
  },
  {
    img: VILLA_ROOM,
    tag: "For two",
    name: "Jungle Suite",
    text: "Warm teak, linen and lamplight, with a garden courtyard and a deep soaking tub. Quiet, grounded, and made for long sleep.",
    size: "54 m²",
    sleeps: "Sleeps 2",
    price: "$260",
    feats: ["Garden courtyard", "Soaking tub", "King bed", "Daily breakfast"],
  },
];

const GALLERY = [
  { img: TEMPLE_MIST, caption: "Ulun Danu Beratan at first light", place: "Bedugul" },
  { img: GATE, caption: "Handara Gate — the doorway to the highlands", place: "Buleleng" },
  { img: POOL_SUNSET, caption: "Golden hour at the main pool", place: "Amara" },
  { img: PENIDA, caption: "Diamond Beach, Nusa Penida", place: "Island day" },
  { img: POOL_DUSK, caption: "The pool house after dark", place: "Amara" },
  { img: SPA_STILL, caption: "Stillness, prepared daily", place: "The spa" },
];

const DAY = [
  { time: "06:00", title: "Sunrise yoga", text: "Ninety minutes on the bamboo deck as the valley wakes." },
  { time: "07:30", title: "Jungle breakfast", text: "Tropical fruit, Balinese coffee and slow conversation." },
  { time: "10:00", title: "Spa & stillness", text: "A treatment of your choosing, then the pool and a book." },
  { time: "13:00", title: "Lunch in the garden", text: "Garden-to-table, shared at one long table." },
  { time: "15:30", title: "Rice terrace walk", text: "A guided wander through Tegalalang with a local farmer." },
  { time: "18:30", title: "Sunset dinner", text: "Five courses by lamplight, with gamelan in the distance." },
  { time: "20:30", title: "Sound healing", text: "Bowls and breathwork under the stars, then sleep." },
];

const PLANS = [
  {
    name: "Taste of Amara",
    nights: "3 nights",
    price: "$1,480",
    per: "per person",
    feats: ["Garden Pool Villa", "Daily sunrise yoga", "One spa treatment", "All breakfasts & dinners", "Airport transfer"],
    featured: false,
  },
  {
    name: "The Full Retreat",
    nights: "5 nights",
    price: "$2,380",
    per: "per person",
    feats: ["Valley Infinity Villa", "Daily yoga & meditation", "Three spa treatments", "Temple & island day", "All meals included", "Airport transfer"],
    featured: true,
  },
  {
    name: "Deep Immersion",
    nights: "7 nights",
    price: "$3,280",
    per: "per person",
    feats: ["Valley Infinity Villa", "Daily yoga, breathwork & sound healing", "Five spa treatments", "Two island days", "Private guide", "All meals included"],
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

export default function BaliRetreatTemplate() {
  const [scrolled, setScrolled] = useState(false);
  const [villaPaused, setVillaPaused] = useState(false);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [villa, setVilla] = useAutoAdvance(VILLAS.length, 6000, villaPaused);
  const [slide, setSlide] = useAutoAdvance(GALLERY.length, 5000, galleryPaused);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBooked(true);
  };

  const villaNow = VILLAS[villa];
  const slideNow = GALLERY[slide];

  return (
    <div className="rt">
      {/* ---- template nav ---- */}
      <header className={`rt-nav${scrolled ? " scrolled" : ""}`}>
        <div className="rt-nav-inner">
          <a className="rt-brand" href="#top">
            AMARA<small>UBUD · BALI</small>
          </a>
          <nav className="rt-nav-links" aria-label="Retreat">
            <a href="#retreat">Retreat</a>
            <a href="#stay">Stay</a>
            <a href="#experiences">Experiences</a>
            <a href="#gallery">Gallery</a>
            <a href="#packages">Packages</a>
          </nav>
          <a className="rt-btn" href="#reserve">
            Reserve
          </a>
        </div>
      </header>

      {/* ---- hero ---- */}
      <section className="rt-hero" id="top">
        <div className="rt-hero-media">
          <Image
            src={HERO}
            alt="Tegalalang rice terraces at golden hour, Ubud, Bali"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="rt-hero-content">
          <Reveal>
            <span className="rt-kicker" style={{ color: "#e8ddc9" }}>
              Ubud · Bali · A five-night retreat
            </span>
            <h1>
              Slow down. Breathe in. <em>Come home to yourself.</em>
            </h1>
            <p className="rt-hero-sub">
              Five nights in a jungle valley above Ubud — sunrise yoga, spa
              rituals, temple mornings and long, unhurried days. Twelve guests
              at a time. Nothing to do, and everything to feel.
            </p>
            <div className="rt-hero-cta">
              <a className="rt-btn light" href="#reserve">
                Reserve your retreat →
              </a>
              <a className="rt-btn ghost" href="#retreat">
                Explore the retreat
              </a>
            </div>
            <div className="rt-hero-meta">
              <div>
                Nights<strong>5 nights</strong>
              </div>
              <div>
                Guests<strong>Max 12</strong>
              </div>
              <div>
                Villas<strong>3 private</strong>
              </div>
              <div>
                Next retreat<strong>14 March</strong>
              </div>
            </div>
          </Reveal>
        </div>
        <span className="rt-scroll-cue">Scroll</span>
      </section>

      {/* ---- intro ---- */}
      <section className="rt-section" id="retreat">
        <div className="rt-wrap">
          <div className="rt-split">
            <Reveal>
              <span className="rt-kicker">The retreat</span>
              <h2 className="rt-h2">A sanctuary above the jungle</h2>
              <p className="rt-lede">
                Amara sits on a ridge above the Ayung valley, twenty minutes
                from Ubud and a world away from it. Three villas, one pool, a
                bamboo yoga deck and a spa that opens to the trees — built so
                the jungle does most of the talking.
              </p>
              <p>
                Mornings begin before the heat, with yoga as the mist lifts.
                Afternoons are yours: the pool, a treatment, a walk through
                the terraces. Evenings gather around one long table, by
                lamplight, with gamelan drifting up from the valley.
              </p>
              <div className="rt-stats">
                <div>
                  <strong>5</strong>
                  <span>nights</span>
                </div>
                <div>
                  <strong>12</strong>
                  <span>guests max</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>private villas</span>
                </div>
                <div>
                  <strong>1</strong>
                  <span>jungle valley</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <figure className="rt-split-img">
                <Image
                  src={TEMPLE_MIST}
                  alt="Ulun Danu Beratan temple on the lake at dawn"
                  width={1200}
                  height={1500}
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
                <figcaption>Ulun Danu Beratan, at first light</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- experiences ---- */}
      <section className="rt-section rt-dark" id="experiences">
        <div className="rt-wrap">
          <Reveal>
            <span className="rt-kicker">Experiences</span>
            <h2 className="rt-h2">Days shaped by the island</h2>
            <p className="rt-lede">
              Everything is included and nothing is compulsory. Choose what
              calls to you; the rest of the day stays gloriously empty.
            </p>
          </Reveal>
          <div className="rt-exp-grid">
            {EXPERIENCES.map((x, i) => (
              <Reveal key={x.title} delay={i * 0.08}>
                <article className="rt-exp">
                  <div className="rt-exp-media">
                    <Image
                      src={x.img}
                      alt={x.title}
                      width={800}
                      height={600}
                      sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw"
                    />
                  </div>
                  <div className="rt-exp-body">
                    <h3>{x.title}</h3>
                    <p>{x.text}</p>
                    <div className="rt-exp-time">{x.time}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- stay / villa carousel ---- */}
      <section className="rt-section" id="stay">
        <div className="rt-wrap">
          <Reveal>
            <span className="rt-kicker">Stay</span>
            <h2 className="rt-h2">Three villas, one valley</h2>
            <p className="rt-lede">
              Each villa is private, open to the trees, and sleeps two. Pick
              your corner of the jungle.
            </p>
          </Reveal>
          <div
            style={{ marginTop: 44 }}
            onMouseEnter={() => setVillaPaused(true)}
            onMouseLeave={() => setVillaPaused(false)}
          >
            <div className="rt-villa">
              <AnimatePresence mode="wait">
                <motion.div
                  key={villa}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                >
                  <div className="rt-villa-media">
                    <Image
                      src={villaNow.img}
                      alt={villaNow.name}
                      width={1600}
                      height={900}
                      sizes="(max-width: 900px) 100vw, 90vw"
                    />
                    <span className="rt-villa-tag">{villaNow.tag}</span>
                  </div>
                  <div className="rt-villa-body">
                    <div>
                      <h3>{villaNow.name}</h3>
                      <p>{villaNow.text}</p>
                      <div className="rt-villa-feats">
                        <span>{villaNow.size}</span>
                        <span>{villaNow.sleeps}</span>
                        {villaNow.feats.map((f) => (
                          <span key={f}>{f}</span>
                        ))}
                      </div>
                    </div>
                    <div className="rt-villa-price">
                      <strong>{villaNow.price}</strong>
                      <span>per night</span>
                      <br />
                      <a className="rt-btn" href="#reserve">
                        Reserve this villa
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <button
                className="rt-arrow prev"
                aria-label="Previous villa"
                onClick={() => setVilla((villa - 1 + VILLAS.length) % VILLAS.length)}
              >
                ←
              </button>
              <button
                className="rt-arrow next"
                aria-label="Next villa"
                onClick={() => setVilla((villa + 1) % VILLAS.length)}
              >
                →
              </button>
            </div>
            <div className="rt-dots" role="tablist" aria-label="Villas">
              {VILLAS.map((v, i) => (
                <button
                  key={v.name}
                  className={i === villa ? "on" : ""}
                  aria-label={v.name}
                  onClick={() => setVilla(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- gallery carousel ---- */}
      <section className="rt-section" id="gallery" style={{ paddingTop: 0 }}>
        <div className="rt-wrap">
          <Reveal>
            <span className="rt-kicker">Gallery</span>
            <h2 className="rt-h2">The island, in frames</h2>
            <p className="rt-lede">
              Real mornings, real light. Every photograph here was taken in
              Bali, on the days we describe.
            </p>
          </Reveal>
          <div
            style={{ marginTop: 44 }}
            onMouseEnter={() => setGalleryPaused(true)}
            onMouseLeave={() => setGalleryPaused(false)}
          >
            <div className="rt-gallery">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="rt-gallery-media">
                    <Image
                      src={slideNow.img}
                      alt={slideNow.caption}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 900px) 100vw, 90vw"
                    />
                    <div className="rt-gallery-cap">
                      <h3>{slideNow.caption}</h3>
                      <span>{slideNow.place}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <button
                className="rt-arrow prev"
                aria-label="Previous photo"
                onClick={() => setSlide((slide - 1 + GALLERY.length) % GALLERY.length)}
              >
                ←
              </button>
              <button
                className="rt-arrow next"
                aria-label="Next photo"
                onClick={() => setSlide((slide + 1) % GALLERY.length)}
              >
                →
              </button>
            </div>
            <div className="rt-dots" role="tablist" aria-label="Gallery">
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

      {/* ---- a day at Amara ---- */}
      <section className="rt-section" style={{ paddingTop: 0 }}>
        <div className="rt-wrap">
          <Reveal>
            <span className="rt-kicker">The rhythm</span>
            <h2 className="rt-h2" style={{ textAlign: "center" }}>
              A day at Amara
            </h2>
            <p className="rt-lede" style={{ textAlign: "center", margin: "0 auto" }}>
              A loose shape, never a schedule. This is how a typical day
              unfolds — yours may wander.
            </p>
          </Reveal>
          <div className="rt-day">
            {DAY.map((d, i) => (
              <Reveal key={d.time} delay={i * 0.05}>
                <div className="rt-day-row">
                  <span className="rt-day-time">{d.time}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- testimonials ---- */}
      <section className="rt-section rt-dark">
        <div className="rt-wrap">
          <Reveal>
            <span className="rt-kicker">Guests</span>
            <h2 className="rt-h2">What stays with them</h2>
          </Reveal>
          <div className="rt-quotes">
            <Reveal delay={0}>
              <blockquote className="rt-quote">
                <div className="rt-stars">★★★★★</div>
                <p>
                  “I arrived exhausted and left feeling like myself again.
                  The mornings on that deck are something I still think about.”
                </p>
                <footer>
                  Sarah M.<span>London · 5-night retreat</span>
                </footer>
              </blockquote>
            </Reveal>
            <Reveal delay={0.08}>
              <blockquote className="rt-quote">
                <div className="rt-stars">★★★★★</div>
                <p>
                  “Nothing felt staged. The temple morning, the long table at
                  dinner — it was the first holiday that actually rested me.”
                </p>
                <footer>
                  Daniel &amp; Priya<span>Singapore · 7-night retreat</span>
                </footer>
              </blockquote>
            </Reveal>
            <Reveal delay={0.16}>
              <blockquote className="rt-quote">
                <div className="rt-stars">★★★★★</div>
                <p>
                  “I came for the yoga and stayed for the quiet. I have
                  already booked to come back with my sister.”
                </p>
                <footer>
                  Hannah K.<span>Sydney · 3-night retreat</span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- packages ---- */}
      <section className="rt-section" id="packages">
        <div className="rt-wrap">
          <Reveal>
            <span className="rt-kicker">Packages</span>
            <h2 className="rt-h2">Choose your retreat</h2>
            <p className="rt-lede">
              Everything below is included. Flights are not — we will help you
              plan them. A 20% deposit holds your place; the rest is due
              thirty days before arrival.
            </p>
          </Reveal>
          <div className="rt-plans">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article className={`rt-plan${p.featured ? " featured" : ""}`}>
                  {p.featured && <span className="rt-plan-badge">Most booked</span>}
                  <h3>{p.name}</h3>
                  <span className="rt-plan-nights">{p.nights}</span>
                  <div className="rt-plan-price">
                    {p.price} <span>{p.per}</span>
                  </div>
                  <ul>
                    {p.feats.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a className="rt-btn" href="#reserve">
                    Reserve {p.name}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- reserve / booking ---- */}
      <section className="rt-section" id="reserve" style={{ paddingTop: 0 }}>
        <div className="rt-wrap">
          <div className="rt-book">
            <Reveal>
              <span className="rt-kicker" style={{ color: "#c9a25c" }}>
                Reserve
              </span>
              <h2>Your villa is waiting.</h2>
              <p>
                Tell us when you would like to come and which retreat calls to
                you. We reply personally within a day — no bots, no pressure —
                and hold your villa for 48 hours while you decide.
              </p>
              <p style={{ marginTop: 18 }}>
                Prefer to talk first?{" "}
                <a href="mailto:hello@amara-bali.com" style={{ color: "#c9a25c" }}>
                  hello@amara-bali.com
                </a>{" "}
                · +62 361 000 000
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              {booked ? (
                <div className="rt-form-ok">
                  <strong>Thank you — your request is in.</strong>
                  <br />
                  We have your details and will write back personally within
                  a day to confirm your villa and hold it for 48 hours.
                </div>
              ) : (
                <form className="rt-form" onSubmit={onBook}>
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
                    <select name="package" defaultValue="The Full Retreat — 5 nights">
                      <option>The Full Retreat — 5 nights</option>
                      <option>Taste of Amara — 3 nights</option>
                      <option>Deep Immersion — 7 nights</option>
                    </select>
                  </label>
                  <label>
                    Guests
                    <select name="guests" defaultValue="2 guests">
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
                    <input name="notes" type="text" placeholder="Occasions, dietary needs, wishes" />
                  </label>
                  <button className="rt-btn light" type="submit">
                    Request my retreat →
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- template footer ---- */}
      <footer className="rt-footer">
        <div className="rt-wrap">
          <div className="rt-footer-top">
            <a className="rt-brand" href="#top">
              AMARA
            </a>
            <nav className="rt-footer-links" aria-label="Footer">
              <a href="#retreat">Retreat</a>
              <a href="#stay">Stay</a>
              <a href="#experiences">Experiences</a>
              <a href="#gallery">Gallery</a>
              <a href="#packages">Packages</a>
              <a href="#reserve">Reserve</a>
            </nav>
          </div>
          <div className="rt-footer-bottom">
            <span>Amara Retreat · Ubud, Bali · hello@amara-bali.com</span>
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
