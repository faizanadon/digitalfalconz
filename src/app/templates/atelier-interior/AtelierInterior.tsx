"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Motion";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const HERO = U("1618221195710-dd6b41faaea6", 2400); // warm modern living room, brass arc lamp
const STUDIO_MAIN = U("1631679706909-1844bbd07221", 1400); // calm cream living room, rattan mirrors
const STUDIO_SMALL = U("1615873968403-89e068629265", 1000); // deep green wall, tan leather sofa

const PROJECTS = [
  {
    img: U("1600607687939-ce8a6c25118c"),
    name: "Hillside House",
    loc: "Hampstead, London",
    cat: "Full home · Living & kitchen",
  },
  {
    img: U("1600210492486-724fe5c67fb0"),
    name: "The Gallery House",
    loc: "Copenhagen, Denmark",
    cat: "Full home · Living room",
  },
  {
    img: U("1556912167-f556f1f39fdf"),
    name: "Marble & Oak Kitchen",
    loc: "Bath, England",
    cat: "Kitchen",
  },
  {
    img: U("1595526114035-0d45ed16cfbf"),
    name: "The Quiet Bedroom",
    loc: "Edinburgh, Scotland",
    cat: "Bedroom",
  },
  {
    img: U("1617806118233-18e1de247200"),
    name: "The Green Dining Room",
    loc: "Brighton, England",
    cat: "Dining room",
  },
  {
    img: U("1519710164239-da123dc03ef4"),
    name: "The Morning Nook",
    loc: "Oxford, England",
    cat: "Styling · A quiet corner",
  },
];

const SERVICES = [
  {
    num: "01",
    title: "Full interior design",
    text: "From first sketch to the last cushion. We design whole homes — layout, joinery, lighting, materials and furniture — and stay with the build until it is finished.",
    points: ["Concept & layout", "Joinery & lighting design", "Furniture & art sourcing", "On-site supervision"],
  },
  {
    num: "02",
    title: "Styling & sourcing",
    text: "For rooms that are nearly there. We edit what you have, find the pieces you are missing, and layer texture, art and light until the room feels finished.",
    points: ["Room-by-room edit", "Furniture & vintage sourcing", "Art & object styling", "One-day transformations"],
  },
  {
    num: "03",
    title: "Design consultation",
    text: "Two hours with a designer, in your home or on a call. Honest advice on layout, colour, light and what to keep — and what to let go of.",
    points: ["In-home or video call", "Layout & colour advice", "A written action plan", "Follow-up by email"],
  },
];

const STEPS = [
  {
    num: "01",
    title: "Discover",
    text: "We listen first. A long conversation about how you live, what you love, and what has never quite worked.",
  },
  {
    num: "02",
    title: "Design",
    text: "Layouts, materials and light — drawn, sampled and shown to you in the room itself, not just on paper.",
  },
  {
    num: "03",
    title: "Deliver",
    text: "Makers, builders and painters we trust. We are on site through the messy middle, so you don't have to be.",
  },
  {
    num: "04",
    title: "Dwell",
    text: "We style the last shelf, hang the last picture, and leave you to the quiet part: living in it.",
  },
];

const TEAM = [
  { name: "Mara Ellison", role: "Founder & Creative Director" },
  { name: "Jonas Beck", role: "Senior Designer" },
  { name: "Aya Lindqvist", role: "Stylist & Sourcing" },
];

export default function AtelierInterior() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="atl">
      {/* ---- nav ---- */}
      <header className="atl-nav">
        <div className="atl-nav-inner">
          <a className="atl-brand" href="#top">
            ATELIER
          </a>
          <nav className="atl-nav-links" aria-label="Studio">
            <a href="#projects">Projects</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#studio">Studio</a>
          </nav>
          <a className="atl-btn" href="#contact">
            Start a project
          </a>
        </div>
      </header>

      {/* ---- hero ---- */}
      <section className="atl-hero" id="top">
        <div className="atl-hero-media">
          <Image
            src={HERO}
            alt="A warm, calm living room with a grey sofa, brass arc lamp and large windows"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="atl-hero-content">
          <Reveal>
            <span className="atl-label">Interior design studio</span>
            <h1>
              Spaces that <em>speak softly.</em>
            </h1>
            <p className="atl-hero-sub">
              We design calm, considered homes — rooms that hold you quietly,
              and age gracefully with the people who live in them.
            </p>
            <div className="atl-hero-meta">
              <span>Est. 2016</span>
              <span>London · Copenhagen</span>
              <span>Residential &amp; boutique</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- philosophy ---- */}
      <section className="atl-section">
        <div className="atl-wrap">
          <div className="atl-phil">
            <Reveal>
              <span className="atl-label">Our philosophy</span>
              <p className="atl-state">
                We believe a room should hold you — quietly, without asking
                for attention. <em>Good design is felt before it is seen:</em>{" "}
                in the light at four in the afternoon, in a chair that fits,
                in a shelf that is exactly where your hand expects it.
              </p>
              <div className="atl-rule" aria-hidden="true" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- projects ---- */}
      <section className="atl-section" id="projects" style={{ paddingTop: 0 }}>
        <div className="atl-wrap">
          <div className="atl-proj-head">
            <Reveal>
              <span className="atl-label">Selected work</span>
              <h2 className="atl-h2">
                Recent <em>projects.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Six homes, six different lives. Every project begins with the
                people who will live in it — and ends with a room that feels
                like it was always theirs.
              </p>
            </Reveal>
          </div>
          <div className="atl-proj-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.08}>
                <article className="atl-proj">
                  <div className="atl-proj-media">
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={1200}
                      height={900}
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  </div>
                  <div className="atl-proj-body">
                    <h3>{p.name}</h3>
                    <span className="atl-loc">{p.loc}</span>
                  </div>
                  <div className="atl-proj-cat">{p.cat}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- services ---- */}
      <section className="atl-section" id="services" style={{ paddingTop: 0 }}>
        <div className="atl-wrap">
          <Reveal>
            <span className="atl-label">What we do</span>
            <h2 className="atl-h2">
              Three ways <em>to work together.</em>
            </h2>
          </Reveal>
          <div className="atl-serv-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <article className="atl-serv">
                  <span className="atl-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- process ---- */}
      <section className="atl-process atl-section" id="process">
        <div className="atl-wrap">
          <Reveal>
            <span className="atl-label">How it works</span>
            <h2 className="atl-h2">
              From first conversation <em>to first morning in.</em>
            </h2>
          </Reveal>
          <div className="atl-steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <article className="atl-step">
                  <span className="atl-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- studio ---- */}
      <section className="atl-section" id="studio">
        <div className="atl-wrap">
          <div className="atl-studio">
            <Reveal>
              <div className="atl-studio-photos">
                <Image
                  className="atl-main"
                  src={STUDIO_MAIN}
                  alt="The Atelier studio — a calm cream living room with rattan mirrors"
                  width={1400}
                  height={1610}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <Image
                  className="atl-small"
                  src={STUDIO_SMALL}
                  alt="A living room with a deep green wall and a tan leather sofa"
                  width={1000}
                  height={750}
                  sizes="(max-width: 900px) 50vw, 26vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <span className="atl-label">The studio</span>
                <h2>
                  A small studio, <em>on purpose.</em>
                </h2>
                <p>
                  We are nine people, two dogs, and one long oak table in a
                  converted print works. Small means every project is led by
                  a partner, every detail is argued over, and nothing leaves
                  the studio that we would not live with ourselves.
                </p>
                <p>
                  We take on a handful of homes each year — never more than
                  we can give our full attention to.
                </p>
                <div className="atl-team">
                  {TEAM.map((t) => (
                    <div className="atl-member" key={t.name}>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- testimonial ---- */}
      <section className="atl-section" style={{ paddingTop: 0 }}>
        <div className="atl-wrap">
          <div className="atl-quote">
            <Reveal>
              <span className="atl-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>
                Atelier didn&apos;t just redesign our home — they gave us
                back the quiet we&apos;d been missing.{" "}
                <em>Every room feels considered, and nothing shouts.</em>
              </blockquote>
              <cite>Sarah &amp; Tom Whitfield — Hillside House, London</cite>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- contact ---- */}
      <section className="atl-section" id="contact" style={{ paddingTop: 0 }}>
        <div className="atl-wrap">
          <div className="atl-contact">
            <Reveal>
              <div>
                <span className="atl-label">Start a project</span>
                <h2>
                  Tell us about <em>your home.</em>
                </h2>
                <p>
                  A room, a flat, a whole house — tell us what you are
                  dreaming of and when you would like to begin. We read every
                  enquiry ourselves and reply within two working days.
                </p>
                <div className="atl-contact-list">
                  <div>
                    <strong>Studio</strong> — 14 Print Works, Clerkenwell,
                    London
                  </div>
                  <div>
                    <strong>Email</strong> — hello@atelier-studio.com
                  </div>
                  <div>
                    <strong>Phone</strong> — +44 20 7946 0000
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {sent ? (
                <div className="atl-form-ok">
                  <strong>Thank you — your message is in.</strong>
                  <br />
                  We have your details and will write back personally within
                  two working days to arrange a first conversation.
                </div>
              ) : (
                <form className="atl-form" onSubmit={onSubmit}>
                  <label>
                    Full name
                    <input name="name" type="text" placeholder="Your name" required />
                  </label>
                  <label>
                    Email
                    <input name="email" type="email" placeholder="you@example.com" required />
                  </label>
                  <label>
                    Project type
                    <select name="projectType" defaultValue="Full home">
                      <option>Full home</option>
                      <option>Single room</option>
                      <option>Kitchen / bathroom</option>
                      <option>Styling &amp; sourcing</option>
                      <option>Design consultation</option>
                    </select>
                  </label>
                  <label>
                    Budget range
                    <select name="budget" defaultValue="£25k – £50k">
                      <option>Under £10k</option>
                      <option>£10k – £25k</option>
                      <option>£25k – £50k</option>
                      <option>£50k – £100k</option>
                      <option>£100k+</option>
                    </select>
                  </label>
                  <label className="full">
                    Tell us about your project
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="The home, the rooms, the feeling you want — as much or as little as you like."
                      required
                    />
                  </label>
                  <button className="atl-btn" type="submit">
                    Send enquiry →
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- footer ---- */}
      <footer className="atl-footer">
        <div className="atl-wrap">
          <div className="atl-footer-top">
            <div>
              <a className="atl-brand" href="#top">
                ATELIER
              </a>
              <p className="atl-footer-tag">
                A small interior design studio for calm, considered homes —
                in London, Copenhagen, and wherever a good room is wanted.
              </p>
            </div>
            <nav className="atl-footer-links" aria-label="Footer">
              <ul>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#process">Process</a></li>
                <li><a href="#studio">Studio</a></li>
              </ul>
              <ul>
                <li><a href="#contact">Start a project</a></li>
                <li><a href="#top">Journal</a></li>
                <li><a href="#top">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className="atl-footer-bottom">
            <span>© 2026 Atelier — Interior Design Studio</span>
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
