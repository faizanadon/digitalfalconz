"use client";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Motion";

const PHONE = "0161 000 0000";
const EMAIL = "info@ventsure.co.uk";

const SERVICES = [
  {
    icon: "◉",
    title: "LEV Thorough Examination & Testing (TExT)",
    text: "The statutory 14-month test, carried out to HSG258 and COSHH Regulation 9. A full examination of every system, with a clear pass or fail and a digital report.",
  },
  {
    icon: "⬡",
    title: "LEV Design & Installation",
    text: "New systems designed to HSG258, sized to your process and installed by qualified engineers — so the system works properly from day one.",
  },
  {
    icon: "⚙",
    title: "LEV Repair & Maintenance",
    text: "Repairs, replacement parts and planned maintenance to keep systems effective between tests, and to put failed systems right.",
  },
  {
    icon: "≋",
    title: "Air Monitoring & Workplace Exposure Testing",
    text: "Personal and static air monitoring to measure actual exposure, confirm your controls are working, and support your COSHH assessments.",
  },
  {
    icon: "▤",
    title: "Duct Cleaning",
    text: "Internal duct and hood cleaning to restore airflow, reduce contamination and lower fire risk in dust and fume systems.",
  },
  {
    icon: "✓",
    title: "Commissioning",
    text: "Thorough examination and testing of new and modified systems before they enter service, with a commissioning report for your records.",
  },
];

const SECTORS = [
  { name: "Manufacturing", text: "Dust, fume and vapour control across production lines." },
  { name: "Woodworking", text: "Wood dust extraction, from single machines to full shops." },
  { name: "Welding & Fabrication", text: "Welding fume extraction and on-torch systems." },
  { name: "Automotive", text: "Spray booths, exhaust extraction and body shops." },
  { name: "Food Production", text: "Flour dust, steam and process fume control." },
  { name: "Education", text: "School and college workshops, labs and art rooms." },
  { name: "Healthcare", text: "Theatres, labs and pharmacy preparation areas." },
  { name: "Pharmaceuticals", text: "Potent compound handling and cleanroom extraction." },
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
    text: "A clear pass or fail for every system, with airflow readings, photographs and any remedial actions, prioritised.",
  },
  {
    n: "04",
    title: "Automatic reminder",
    text: "We diarise your next test and remind you before it falls due — so you never miss the 14-month deadline.",
  },
];

const WHY = [
  {
    title: "BOHS P601 / P602-qualified engineers",
    text: "Every test is carried out by an engineer qualified in LEV examination and testing — not a general contractor.",
  },
  {
    title: "Digital reports within 48 hours",
    text: "Clear, searchable reports you can forward to your insurer, your client or the HSE without a phone call.",
  },
  {
    title: "UK-wide coverage",
    text: "Engineers based across the UK, so a site in Scotland gets the same service as one in London.",
  },
  {
    title: "Minimal downtime",
    text: "We work around your production schedule, including out-of-hours and shutdown visits where needed.",
  },
  {
    title: "Fixed, transparent pricing",
    text: "One fixed price per system, agreed before we attend. No hourly billing, no surprises on the invoice.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "VentSure took LEV testing off our plate entirely. The report was clear, the engineer was thorough, and the reminder came before we even thought about the next test.",
    name: "Facilities Manager",
    org: "Food manufacturing, Yorkshire",
  },
  {
    quote:
      "We had three systems fail at our last test with another firm and no idea what to do. VentSure explained exactly what was wrong, fixed it, and retested within a week.",
    name: "Operations Director",
    org: "Metal fabrication, West Midlands",
  },
  {
    quote:
      "The digital report is exactly what our auditors want. Pass, fail, readings, photos — all in one document, within two days.",
    name: "Health & Safety Manager",
    org: "Further education college, North West",
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

export default function VentSureLev() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const onQuote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="lv">
      {/* ---- header (sticky, phone + Request a Quote always visible) ---- */}
      <header className="lv-header">
        <div className="lv-wrap lv-header-inner">
          <a className="lv-brand" href="#top">
            <span className="lv-brand-mark">V</span>
            <span className="lv-brand-text">
              VentSure
              <small>LEV Testing &amp; COSHH Compliance</small>
            </span>
          </a>
          <nav className="lv-nav" aria-label="Main">
            <a href="#services">Services</a>
            <a href="#rule">The 14-Month Rule</a>
            <a href="#sectors">Sectors</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="lv-header-cta">
            <a className="lv-phone" href={`tel:${PHONE.replace(/\s/g, "")}`}>
              ☎ {PHONE}
            </a>
            <a className="lv-btn lv-btn-orange" href="#quote">
              Request a Quote →
            </a>
          </div>
        </div>
      </header>

      {/* ---- 1. hero ---- */}
      <section className="lv-hero" id="top">
        <div className="lv-wrap">
          <Reveal>
            <span className="lv-eyebrow">
              Thorough Examination &amp; Testing (TExT) · COSHH Regulation 9
            </span>
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
              <a className="lv-btn lv-btn-orange lv-btn-lg" href="#quote">
                Request a Quote →
              </a>
              <a className="lv-btn lv-btn-outline-light lv-btn-lg" href="#quote">
                Book a Retest
              </a>
            </div>
            <div className="lv-trust">
              <span>✓ ILEVE member</span>
              <span>✓ BOHS P601-qualified engineers</span>
              <span>✓ Fully insured</span>
              <span>✓ UK-wide coverage</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- 2. services ---- */}
      <section className="lv-section" id="services">
        <div className="lv-wrap">
          <Reveal>
            <span className="lv-kicker">What we do</span>
            <h2>
              Every LEV service, <em>under one roof.</em>
            </h2>
            <p className="lv-lede">
              From the statutory test to design, repair and cleaning — one
              team, one record, one point of contact.
            </p>
          </Reveal>
          <div className="lv-services">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <article className="lv-service">
                  <span className="lv-service-ico" aria-hidden="true">
                    {s.icon}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 3. the 14-month rule ---- */}
      <section className="lv-section lv-band" id="rule">
        <div className="lv-wrap">
          <div className="lv-rule">
            <Reveal>
              <div>
                <span className="lv-kicker">The 14-Month Rule</span>
                <h2>
                  Every LEV system must be tested <em>at least every 14
                  months.</em>
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
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <aside className="lv-reminder">
                <span className="lv-reminder-tag">Never miss a deadline</span>
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
                <a className="lv-btn lv-btn-orange" href="#quote">
                  Set up my reminder →
                </a>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- 4. sectors ---- */}
      <section className="lv-section" id="sectors">
        <div className="lv-wrap">
          <Reveal>
            <span className="lv-kicker">Who we work with</span>
            <h2>
              Sectors <em>we serve.</em>
            </h2>
            <p className="lv-lede">
              Factories, workshops, schools, hospitals and facilities teams —
              anywhere people work with dust, fume or vapour.
            </p>
          </Reveal>
          <div className="lv-sectors">
            {SECTORS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.04}>
                <article className="lv-sector">
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 5. how it works ---- */}
      <section className="lv-section lv-band" id="how">
        <div className="lv-wrap">
          <Reveal>
            <span className="lv-kicker">How it works</span>
            <h2>
              From booking to report <em>in four steps.</em>
            </h2>
          </Reveal>
          <div className="lv-steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <article className="lv-step">
                  <span className="lv-step-n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="lv-steps-cta">
              <a className="lv-btn lv-btn-orange lv-btn-lg" href="#quote">
                Book your test →
              </a>
              <span>
                or call <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- 6. why choose us ---- */}
      <section className="lv-section" id="why">
        <div className="lv-wrap">
          <Reveal>
            <span className="lv-kicker">Why VentSure</span>
            <h2>
              Why clients <em>stay with us.</em>
            </h2>
          </Reveal>
          <div className="lv-why">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <article className="lv-why-item">
                  <span className="lv-why-tick" aria-hidden="true">✓</span>
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 7. testimonials + logos ---- */}
      <section className="lv-section lv-band" id="testimonials">
        <div className="lv-wrap">
          <Reveal>
            <span className="lv-kicker">What clients say</span>
            <h2>
              Trusted on <em>shop floors and in boardrooms.</em>
            </h2>
          </Reveal>
          <div className="lv-testis">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.07}>
                <figure className="lv-testi">
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span>{t.org}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="lv-logos" aria-label="Client logos">
              {["ACME Manufacturing", "Northwood Foods", "City College", "General Hospital", "Precision Engineering", "Harbour Pharma"].map(
                (name) => (
                  <span key={name} className="lv-logo">
                    {name}
                  </span>
                )
              )}
            </div>
            <p className="lv-logos-note">
              Client logos shown as placeholders — replace with your own.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- 8. FAQ ---- */}
      <section className="lv-section" id="faq">
        <div className="lv-wrap lv-faq-wrap">
          <Reveal>
            <span className="lv-kicker">Frequently asked questions</span>
            <h2>
              LEV testing, <em>answered.</em>
            </h2>
            <p className="lv-lede">
              The questions every facilities manager asks us. Anything else —
              call {PHONE}.
            </p>
          </Reveal>
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

      {/* ---- 9. quote form ---- */}
      <section className="lv-section lv-quote-section" id="quote">
        <div className="lv-wrap">
          <div className="lv-quote">
            <Reveal>
              <div>
                <span className="lv-kicker lv-kicker-light">
                  Request a quote
                </span>
                <h2>
                  Get a fixed price <em>for your LEV testing.</em>
                </h2>
                <p>
                  Tell us about your site and we will come back with a fixed
                  price — usually within one working day. No obligation, no
                  hourly billing.
                </p>
                <p className="lv-quote-contact">
                  Prefer to talk? Call{" "}
                  <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
                  {" "}or email{" "}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {sent ? (
                <div className="lv-form-ok">
                  <strong>Thank you — your request is in.</strong>
                  <p>
                    We have your details and will come back with a fixed
                    price, usually within one working day. If it is urgent,
                    call {PHONE}.
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
                  <button className="lv-btn lv-btn-orange lv-btn-lg lv-full" type="submit">
                    Request my quote →
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- 10. footer ---- */}
      <footer className="lv-footer">
        <div className="lv-wrap">
          <div className="lv-footer-grid">
            <div>
              <a className="lv-brand" href="#top">
                <span className="lv-brand-mark">V</span>
                <span className="lv-brand-text">
                  VentSure
                  <small>LEV Testing &amp; COSHH Compliance</small>
                </span>
              </a>
              <p className="lv-footer-about">
                Thorough examination and testing of local exhaust ventilation
                systems, carried out by BOHS-qualified engineers — UK-wide.
              </p>
              <p>
                <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
                <br />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <br />
                Manchester, United Kingdom
              </p>
            </div>
            <nav aria-label="Services">
              <h3>Services</h3>
              <ul>
                <li><a href="#services">LEV Thorough Examination &amp; Testing</a></li>
                <li><a href="#services">LEV Design &amp; Installation</a></li>
                <li><a href="#services">LEV Repair &amp; Maintenance</a></li>
                <li><a href="#services">Air Monitoring</a></li>
                <li><a href="#services">Duct Cleaning</a></li>
                <li><a href="#services">Commissioning</a></li>
              </ul>
            </nav>
            <nav aria-label="Service areas">
              <h3>Service areas</h3>
              <ul>
                <li>North West</li>
                <li>Yorkshire &amp; Humber</li>
                <li>East &amp; West Midlands</li>
                <li>London &amp; South East</li>
                <li>South West</li>
                <li>Scotland &amp; Wales</li>
              </ul>
            </nav>
            <div>
              <h3>Accreditations</h3>
              <ul className="lv-accred">
                <li>✓ ILEVE member</li>
                <li>✓ BOHS P601 / P602 qualified</li>
                <li>✓ Fully insured</li>
                <li>✓ ISO 9001 (placeholder)</li>
              </ul>
              <p className="lv-reg">
                Registered in England &amp; Wales
                <br />
                Company No. 00000000 (placeholder)
                <br />
                VAT No. 000 0000 00 (placeholder)
              </p>
            </div>
          </div>
          <div className="lv-footer-bottom">
            <span>© 2026 VentSure Ltd. All rights reserved.</span>
            <span>
              <a href="#top">Privacy</a> · <a href="#top">Terms</a> ·{" "}
              <a href="https://digitalfalconz.com">Website template by DigitalFalconz</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
