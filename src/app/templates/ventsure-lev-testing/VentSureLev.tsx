"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter, Reveal } from "@/components/Motion";

const PHONE = "0161 000 0000";
const EMAIL = "info@ventsure.co.uk";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Verified industrial photography (all viewed). Rendered in black &
   white via CSS, as on the Framer reference sites. */
const HERO_IMG = U("1504328345606-18bbc8c9d7d1", 1800); // welder, sparks
const DRAWINGS_IMG = U("1581092160562-40aa08e78837", 800); // engineer, drawings
const WAREHOUSE_IMG = U("1587293852726-70cdb56c2866", 1000); // warehouse
const REFINERY_IMG = U("1516937941344-00b4e0337589", 1200); // refinery plant
const REBAR_IMG = U("1531834685032-c34bf0d84c77", 1200); // construction

const TICKER = [
  "LEV TESTING",
  "COSHH REGULATION 9",
  "14-MONTH RULE",
  "BOHS P601",
  "DIGITAL REPORT IN 48H",
  "UK-WIDE",
];

const SERVICES = [
  {
    n: "01",
    title: "LEV Thorough Examination & Testing",
    text: "The statutory 14-month test to HSG258 and COSHH Regulation 9. A full examination of every system, with a clear pass or fail.",
    tag: "TExT",
  },
  {
    n: "02",
    title: "LEV Design & Installation",
    text: "New systems designed to HSG258, sized to your process and installed by qualified engineers.",
    tag: "DESIGN",
  },
  {
    n: "03",
    title: "LEV Repair & Maintenance",
    text: "Repairs, parts and planned maintenance to keep systems effective between tests.",
    tag: "REPAIR",
  },
  {
    n: "04",
    title: "Air Monitoring & Exposure Testing",
    text: "Personal and static air monitoring to measure actual exposure and confirm controls work.",
    tag: "MONITORING",
  },
  {
    n: "05",
    title: "Duct Cleaning",
    text: "Internal duct and hood cleaning to restore airflow and lower fire and contamination risk.",
    tag: "CLEANING",
  },
  {
    n: "06",
    title: "Commissioning",
    text: "Examination and testing of new and modified systems before they enter service.",
    tag: "COMMISSION",
  },
];

const STATS = [
  { n: 2400, suffix: "+", label: "KEY STAT · 001", caption: "LEV systems tested" },
  { n: 98, suffix: "%", label: "KEY STAT · 002", caption: "First-time pass rate" },
  { n: 48, suffix: "h", label: "KEY STAT · 003", caption: "Digital report turnaround" },
  { n: 100, suffix: "%", label: "KEY STAT · 004", caption: "UK coverage" },
];

const SECTORS = [
  { n: "01", name: "Manufacturing", text: "Dust, fume and vapour control across production lines.", tags: ["LEV", "COSHH"] },
  { n: "02", name: "Woodworking", text: "Wood dust extraction, from single machines to full shops.", tags: ["DUST", "EXTRACTION"] },
  { n: "03", name: "Welding & Fabrication", text: "Welding fume extraction and on-torch systems.", tags: ["FUME", "WELDING"] },
  { n: "04", name: "Automotive", text: "Spray booths, exhaust extraction and body shops.", tags: ["BOOTHS", "EXHAUST"] },
  { n: "05", name: "Food Production", text: "Flour dust, steam and process fume control.", tags: ["DUST", "HYGIENE"] },
  { n: "06", name: "Education", text: "School and college workshops, labs and art rooms.", tags: ["SCHOOLS", "LABS"] },
  { n: "07", name: "Healthcare", text: "Theatres, labs and pharmacy preparation areas.", tags: ["THEATRES", "LABS"] },
  { n: "08", name: "Pharmaceuticals", text: "Potent compound handling and cleanroom extraction.", tags: ["CLEANROOM", "POTENT"] },
];

const STEPS = [
  {
    n: "01",
    title: "Book",
    text: "Tell us how many systems you have and where you are. We confirm a fixed price and a date that suits your operation.",
  },
  {
    n: "02",
    title: "On-site test",
    text: "A BOHS-qualified engineer examines and tests every system, with minimal disruption to your working day.",
  },
  {
    n: "03",
    title: "Digital report in 48 hours",
    text: "A clear pass or fail for every system, with airflow readings, photographs and remedial actions, prioritised.",
  },
  {
    n: "04",
    title: "Automatic reminder",
    text: "We diarise your next test and remind you before it falls due — so you never miss the 14-month deadline.",
  },
];

const WHY = [
  { title: "Stable, planned testing", text: "Your tests are diarised a year ahead, so nothing slips and nothing is rushed." },
  { title: "Quality checks embedded in process", text: "Every reading is checked twice and every report is reviewed before it reaches you." },
  { title: "Realistic lead times", text: "We tell you honestly when we can attend, and we keep the date we give you." },
  { title: "Technical problem-solving mindset", text: "A failed system is a problem to solve, not a report to file. We fix what we find." },
];

const TESTIMONIALS = [
  {
    name: "Daniel Morris",
    role: "Facilities Manager",
    org: "Food manufacturing, Yorkshire",
    quote:
      "VentSure took LEV testing off our plate entirely. The report was clear, the engineer was thorough, and the reminder came before we even thought about the next test.",
  },
  {
    name: "Helen Carter",
    role: "Operations Director",
    org: "Metal fabrication, West Midlands",
    quote:
      "We had three systems fail at our last test with another firm and no idea what to do. VentSure explained exactly what was wrong, fixed it, and retested within a week.",
  },
  {
    name: "James Whitfield",
    role: "Health & Safety Manager",
    org: "Further education college, North West",
    quote:
      "The digital report is exactly what our auditors want. Pass, fail, readings, photos — all in one document, within two days.",
  },
];

const FAQS = [
  {
    q: "Is LEV testing a legal requirement?",
    a: "Yes. Under COSHH Regulation 9, every employer must ensure that local exhaust ventilation is thoroughly examined and tested at least every 14 months by a competent person. It is a legal duty, not a recommendation — and the HSE can ask to see your test records at any time.",
  },
  {
    q: "How often must LEV be tested?",
    a: "At least every 14 months. Some higher-risk processes are tested more often — for example, where the substance is particularly hazardous. Your report confirms the correct interval for each of your systems.",
  },
  {
    q: "How long does a test take?",
    a: "A single straightforward system typically takes one to two hours. Larger sites with several systems are usually completed in a day. We agree the scope and timing with you before we attend, and we work around your production where we can.",
  },
  {
    q: "What does the report include?",
    a: "A pass or fail for every system, airflow and velocity readings, photographs, a list of any defects, and clear remedial actions with priorities. It is delivered digitally within 48 hours, and kept on file so you always have a record.",
  },
  {
    q: "What if my system fails?",
    a: "A fail does not always mean the system is unsafe to use — it means it does not meet the required standard. Your report explains exactly what is wrong, what must be done and how urgently. We can quote for the repair and retest the system once it is fixed.",
  },
];

const LOGOS = [
  "ACME Manufacturing",
  "Northwood Foods",
  "City College",
  "General Hospital",
  "Precision Engineering",
  "Harbour Pharma",
  "Unity Fabrication",
  "Sustainova",
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

export default function VentSureLev() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState(0);
  const [service, setService] = useState(0);
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

  const onQuote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const t = TESTIMONIALS[tab];
  const s = SERVICES[service];

  return (
    <div className="lv">
      {/* ---- header: floating pill nav ---- */}
      <header className={`lv-header${navHidden ? " lv-hidden" : ""}`}>
        <div className="lv-wrap lv-header-inner">
          <a className="lv-brand" href="#top" aria-label="VentSure home">
            <span className="lv-logo-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="lv-brand-text">VENTSURE</span>
          </a>
          <nav className="lv-pillnav" aria-label="Main">
            <a href="#services" className="on">Services</a>
            <a href="#rule">14-Month Rule</a>
            <a href="#sectors">Sectors</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="lv-header-cta">
            <a className="lv-phone" href={`tel:${PHONE.replace(/\s/g, "")}`}>
              {PHONE}
            </a>
            <a className="lv-btn lv-btn-accent" href="#quote">
              Request a Quote
            </a>
          </div>
        </div>
      </header>

      {/* ---- hero: huge grotesque headline, mono spec strip, B&W photo ---- */}
      <section className="lv-hero" id="top">
        <div className="lv-wrap lv-hero-inner">
          <BlurReveal>
            <span className="lv-mono">(00) VENTSURE — LEV TESTING &amp; COSHH COMPLIANCE</span>
            <h1>
              LEV Testing &amp; COSHH Compliance, <em>Handled.</em>
            </h1>
            <p className="lv-hero-sub">
              Statutory thorough examination and testing of local exhaust
              ventilation systems — carried out by BOHS-qualified engineers,
              with a clear digital report in 48 hours and an automatic
              reminder before your next test is due.
            </p>
            <div className="lv-hero-cta">
              <a className="lv-btn lv-btn-accent lv-btn-lg" href="#quote">
                Request a Quote →
              </a>
              <a className="lv-btn lv-btn-ghost lv-btn-lg" href="#quote">
                Book a Retest
              </a>
            </div>
          </BlurReveal>
          <div className="lv-specstrip" aria-label="Key facts">
            <span><b>COSHH REG 9</b> Statutory duty</span>
            <span><b>14-MONTH RULE</b> Minimum interval</span>
            <span><b>BOHS P601</b> Qualified engineers</span>
            <span><b>48H</b> Digital report</span>
            <span><b>UK-WIDE</b> Coverage</span>
          </div>
        </div>
        <div className="lv-hero-media">
          <Image
            src={HERO_IMG}
            alt="A welder at work, with sparks and fume"
            fill
            priority
            sizes="100vw"
          />
          <div className="lv-hero-chip" aria-hidden="true">
            <span>● LIVE — WELDING FUME · FACE VELOCITY 0.52 M/S</span>
            <span>SYSTEMS TESTED TODAY <LiveTick start={14} /></span>
          </div>
        </div>
      </section>

      {/* ---- marquee ticker ---- */}
      <div className="lv-ticker" aria-hidden="true">
        <div className="lv-ticker-track">
          {[...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i}>{item} <i>◆</i></span>
          ))}
        </div>
      </div>

      {/* ---- trust strip ---- */}
      <div className="lv-trustbar">
        <div className="lv-wrap lv-trustbar-inner">
          <span>✓ ILEVE member</span>
          <span>✓ BOHS P601-qualified engineers</span>
          <span>✓ Fully insured</span>
          <span>✓ UK-wide coverage</span>
        </div>
      </div>

      {/* ---- count-up stats ---- */}
      <section className="lv-section lv-stats">
        <div className="lv-wrap">
          <BlurReveal>
            <span className="lv-mono">(01) OUTPUT AT SCALE</span>
            <h2>Measured compliance, not promises.</h2>
            <p className="lv-lede">
              Key figures from our testing work. Placeholder figures for this
              template — replace with your own.
            </p>
          </BlurReveal>
          <div className="lv-stat-grid">
            {STATS.map((st) => (
              <div key={st.label} className="lv-stat">
                <span className="lv-stat-label">{st.label}</span>
                <span className="lv-stat-num">
                  <AnimatedCounter value={st.n} suffix={st.suffix} />
                </span>
                <span className="lv-stat-cap">{st.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- services: interactive rows, orange fill on select ---- */}
      <section className="lv-section" id="services">
        <div className="lv-wrap">
          <BlurReveal>
            <span className="lv-mono">(02) SERVICES</span>
            <h2>Every LEV service, under one roof.</h2>
            <p className="lv-lede">
              From the statutory test to design, repair and cleaning — one
              team, one record, one point of contact. Select a service to see
              the detail.
            </p>
          </BlurReveal>
          <div className="lv-services">
            <div className="lv-service-list" role="tablist" aria-label="Services">
              {SERVICES.map((sv, i) => (
                <button
                  key={sv.n}
                  role="tab"
                  aria-selected={service === i}
                  className={`lv-service-row${service === i ? " on" : ""}`}
                  onClick={() => setService(i)}
                  onMouseEnter={() => setService(i)}
                >
                  <span className="lv-service-n">{sv.n}</span>
                  <span className="lv-service-name">{sv.title}</span>
                  <span className="lv-service-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <div className="lv-service-detail">
              <span className="lv-mono">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a className="lv-btn lv-btn-dark" href="#quote">
                Get a price for this →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- 14-month rule (dark) ---- */}
      <section className="lv-section lv-dark lv-speckle" id="rule">
        <div className="lv-wrap">
          <div className="lv-rule">
            <BlurReveal>
              <div>
                <span className="lv-mono lv-mono-light">(03) THE 14-MONTH RULE</span>
                <h2>
                  Every LEV system must be tested at least every <em>14 months.</em>
                </h2>
                <p>
                  Under COSHH Regulation 9, every local exhaust ventilation
                  system must be thoroughly examined and tested at least once
                  every 14 months. The duty sits with the employer — and the
                  HSE can ask for your test records at any time.
                </p>
                <p>
                  Missing a test is a breach of COSHH. The HSE can serve an
                  improvement notice, a prohibition notice, or prosecute. And
                  in the event of an incident, an untested system leaves you
                  exposed — legally and financially.
                </p>
                <a className="lv-btn lv-btn-accent" href="#quote">
                  Check my test date
                </a>
              </div>
            </BlurReveal>
            <Reveal delay={0.1}>
              <aside className="lv-reminder">
                <span className="lv-reminder-tag">NEVER MISS A DEADLINE</span>
                <h3>Our automatic retest reminder</h3>
                <p>
                  We log your test date and remind you automatically — 8
                  weeks, 4 weeks and 1 week before your next test is due.
                </p>
                <ul>
                  <li>✓ Reminder 8 weeks before</li>
                  <li>✓ Reminder 4 weeks before</li>
                  <li>✓ Reminder 1 week before</li>
                  <li>✓ We book the retest for you</li>
                </ul>
                <a className="lv-btn lv-btn-dark" href="#quote">
                  Set up my reminder →
                </a>
              </aside>
            </Reveal>
          </div>
          <div className="lv-marquee-wrap">
            <p className="lv-marquee-label">Trusted by industry partners</p>
            <div className="lv-marquee" aria-hidden="true">
              {[...LOGOS, ...LOGOS].map((name, i) => (
                <span key={i}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- sectors ---- */}
      <section className="lv-section" id="sectors">
        <div className="lv-wrap">
          <BlurReveal>
            <span className="lv-mono">(04) SECTORS</span>
            <h2>Where our work is used.</h2>
            <p className="lv-lede">
              Factories, workshops, schools, hospitals and facilities teams —
              anywhere people work with dust, fume or vapour.
            </p>
          </BlurReveal>
          <div className="lv-sectors">
            {SECTORS.map((sec, i) => (
              <Reveal key={sec.n} delay={i * 0.04}>
                <article className="lv-sector">
                  <span className="lv-sector-n">{sec.n}</span>
                  <div className="lv-sector-tags">
                    {sec.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h3>{sec.name}</h3>
                  <p>{sec.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- how it works (sticky intro + steps) ---- */}
      <section className="lv-section lv-how-sec" id="how">
        <div className="lv-wrap">
          <div className="lv-how">
            <div className="lv-how-sticky">
              <BlurReveal>
                <span className="lv-mono">(05) HOW IT WORKS</span>
                <h2>From booking to report in four steps.</h2>
                <p>
                  A structured process, run the same way on every site — so
                  nothing is missed and nothing is left to chance.
                </p>
                <a className="lv-btn lv-btn-accent" href="#quote">
                  Book your test
                </a>
              </BlurReveal>
            </div>
            <div className="lv-steps">
              {STEPS.map((st, i) => (
                <Reveal key={st.n} delay={i * 0.06}>
                  <article className="lv-step">
                    <span className="lv-step-n">{st.n}</span>
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
            <div className="lv-why">
              <h3>Why clients stay</h3>
              <div className="lv-why-grid">
                {WHY.map((w) => (
                  <article key={w.title} className="lv-why-item">
                    <h4>{w.title}</h4>
                    <p>{w.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lv-fullbleed">
          <Image
            src={REFINERY_IMG}
            alt="An industrial plant with extraction stacks under a grey sky"
            width={2000}
            height={700}
            sizes="100vw"
          />
        </div>
      </section>

      {/* ---- testimonials (dark, tabbed) ---- */}
      <section className="lv-section lv-dark lv-speckle" id="testimonials">
        <div className="lv-wrap">
          <BlurReveal>
            <div className="lv-testi-head">
              <span className="lv-mono lv-mono-light">(06) CLIENT FEEDBACK</span>
              <h2>Trusted in production.</h2>
            </div>
          </BlurReveal>
          <div className="lv-testi">
            <div className="lv-testi-tabs" role="tablist" aria-label="Clients">
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
            <div className="lv-testi-quote">
              <blockquote>“{t.quote}”</blockquote>
              <span className="lv-testi-org">{t.org}</span>
            </div>
            <div className="lv-testi-img">
              <Image
                src={WAREHOUSE_IMG}
                alt="A warehouse with tall racking"
                width={800}
                height={1000}
                sizes="(max-width: 900px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="lv-section" id="faq">
        <div className="lv-wrap lv-faq-wrap">
          <BlurReveal>
            <span className="lv-mono">(07) FAQ</span>
            <h2>LEV testing, answered.</h2>
            <p className="lv-lede">
              The questions every facilities manager asks us. Anything else
              — call {PHONE}.
            </p>
          </BlurReveal>
          <div className="lv-faq">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className={`lv-faq-item${openFaq === i ? " open" : ""}`}
              >
                <button
                  className="lv-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className="lv-faq-plus" aria-hidden="true">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && <p className="lv-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- quote (dark CTA + form + photo strip) ---- */}
      <section className="lv-section lv-dark lv-speckle" id="quote">
        <div className="lv-wrap">
          <BlurReveal>
            <div className="lv-cta-head">
              <span className="lv-mono lv-mono-light">(08) START A DISCUSSION</span>
              <h2>Get a fixed price for your LEV testing.</h2>
              <p>
                Tell us about your site and we will come back with a fixed
                price — usually within one working day. No obligation, no
                hourly billing.
              </p>
            </div>
          </BlurReveal>
          <Reveal>
            {sent ? (
              <div className="lv-form-ok">
                <strong>Thank you — your request is in.</strong>
                <p>
                  We have your details and will come back with a fixed price,
                  usually within one working day. If it is urgent, call{" "}
                  {PHONE}.
                </p>
              </div>
            ) : (
              <form className="lv-form" onSubmit={onQuote}>
                <label>
                  Full name
                  <input name="name" type="text" placeholder="Your name" required />
                </label>
                <label>
                  Company
                  <input name="company" type="text" placeholder="Company name" required />
                </label>
                <label>
                  Phone
                  <input name="phone" type="tel" placeholder="Your phone number" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" placeholder="you@company.co.uk" required />
                </label>
                <label>
                  Number of LEV systems
                  <select name="systems" defaultValue="1–5 systems">
                    <option>1–5 systems</option>
                    <option>6–20 systems</option>
                    <option>21–50 systems</option>
                    <option>50+ systems</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label>
                  Postcode
                  <input name="postcode" type="text" placeholder="e.g. M1 1AA" required />
                </label>
                <label className="lv-full">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your site, your systems, or your last test date…"
                  />
                </label>
                <button className="lv-btn lv-btn-accent lv-btn-lg lv-full" type="submit">
                  Request my quote
                </button>
                <p className="lv-form-note lv-full">
                  Prefer to talk? Call{" "}
                  <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a> or
                  email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </form>
            )}
          </Reveal>
          <div className="lv-strip" aria-hidden="true">
            {[REFINERY_IMG, HERO_IMG, REBAR_IMG, WAREHOUSE_IMG, DRAWINGS_IMG].map(
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
      <footer className="lv-footer">
        <div className="lv-wrap">
          <BlurReveal>
            <p className="lv-footer-statement">
              LEV testing and COSHH compliance, focused on controlled output
              and dependable delivery.
            </p>
          </BlurReveal>
          <div className="lv-footer-cols">
            <nav aria-label="Explore">
              <h3>EXPLORE</h3>
              <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#rule">14-Month Rule</a></li>
                <li><a href="#sectors">Sectors</a></li>
                <li><a href="#how">How it works</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </nav>
            <nav aria-label="Services">
              <h3>SERVICES</h3>
              <ul>
                <li><a href="#services">LEV Testing (TExT)</a></li>
                <li><a href="#services">Design &amp; Installation</a></li>
                <li><a href="#services">Repair &amp; Maintenance</a></li>
                <li><a href="#services">Air Monitoring</a></li>
                <li><a href="#services">Duct Cleaning</a></li>
              </ul>
            </nav>
            <div className="lv-footer-contact">
              <h3>CONTACT</h3>
              <p>
                <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
                <br />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <br />
                Manchester, United Kingdom
              </p>
              <p className="lv-reg">
                Registered in England &amp; Wales · Company No. 00000000
                (placeholder)
              </p>
            </div>
            <div className="lv-footer-status">
              <h3>STATUS</h3>
              <p>● LINK NOMINAL</p>
              <p>
                SYSTEMS TESTED WHILE YOU READ{" "}
                <LiveTick start={1200} step={3} intervalMs={3400} />
              </p>
            </div>
          </div>
          <span className="lv-footer-word">VENTSURE</span>
          <span className="lv-footer-copy">
            © 2026 VentSure Ltd · Website template by{" "}
            <a href="https://digitalfalconz.com">DigitalFalconz</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
