"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Motion";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const HERO = U("1600596542815-ffad4c1539a9", 2200); // modern white villa with pool

const LISTINGS = [
  {
    img: U("1600585154340-be6161a56a0c"),
    tag: "For Sale",
    tagGold: false,
    price: "$1,285,000",
    title: "The Glasshouse on Ferntree Lane",
    loc: "Maplewood · 12 Ferntree Lane",
    beds: 4,
    baths: 3,
    sqft: "3,240",
  },
  {
    img: U("1512917774080-9991f1c4c750"),
    tag: "New",
    tagGold: true,
    price: "$975,000",
    title: "Palm Court Villa",
    loc: "Harbourview · 8 Palm Court",
    beds: 3,
    baths: 2,
    sqft: "2,180",
  },
  {
    img: U("1580587771525-78b9dba3b914"),
    tag: "For Sale",
    tagGold: false,
    price: "$1,640,000",
    title: "Stone & Light Residence",
    loc: "Old Palm Grove · 45 Hibiscus Way",
    beds: 5,
    baths: 4,
    sqft: "4,120",
  },
  {
    img: U("1568605114967-8130f3a36994"),
    tag: "For Sale",
    tagGold: false,
    price: "$890,000",
    title: "The A-Frame at Dusk",
    loc: "Cedar Hills · 3 Pinecrest Road",
    beds: 3,
    baths: 2,
    sqft: "1,860",
  },
  {
    img: U("1564013799919-ab600027ffc6"),
    tag: "For Rent",
    tagGold: true,
    price: "$4,800",
    per: "/mo",
    title: "The Queenslander",
    loc: "Harbourview · 21 Veranda Street",
    beds: 4,
    baths: 2,
    sqft: "2,640",
  },
  {
    img: U("1613490493576-7fde63acd811"),
    tag: "New",
    tagGold: true,
    price: "$2,150,000",
    title: "The Pool House",
    loc: "Maplewood · 7 Timberline Avenue",
    beds: 5,
    baths: 4,
    sqft: "4,580",
  },
];

const HOODS = [
  {
    img: U("1600047509807-ba8f99d2cdde"),
    name: "Maplewood",
    count: "24 homes",
    text: "Tree-lined streets, top-rated schools and a ten-minute walk to the village green.",
  },
  {
    img: U("1583608205776-bfd35f0d9f83"),
    name: "Old Palm Grove",
    count: "18 homes",
    text: "Established character homes on generous plots, minutes from the coast road.",
  },
  {
    img: U("1570129477492-45c003edd2be"),
    name: "Harbourview",
    count: "31 homes",
    text: "Wraparound porches and sea breezes — the neighbourhood everyone asks about.",
  },
];

const SERVICES = [
  {
    icon: "⌂",
    title: "Buy",
    text: "Tell us what home means to you and we will bring you the shortlist — pre-vetted, honestly priced, and shown on your schedule.",
    link: "Browse listings →",
  },
  {
    icon: "◆",
    title: "Sell",
    text: "A valuation grounded in real comparables, staging that photographs beautifully, and a launch plan that creates competition.",
    link: "Get a valuation →",
  },
  {
    icon: "⚿",
    title: "Rent",
    text: "From first viewing to signed lease in days, not weeks — with clear terms and a team that answers the phone.",
    link: "See rentals →",
  },
];

const AGENTS = [
  {
    initials: "AM",
    bg: "#1e2a3a",
    name: "Amelia Marsh",
    role: "Principal · Buyers",
    text: "Twelve years, 400+ homes placed. Amelia knows which street is quiet at 6pm — and which one is not.",
    contact: "amelia@keystone.estate",
  },
  {
    initials: "JO",
    bg: "#b08d4f",
    name: "James Okafor",
    role: "Sales · Maplewood",
    text: "A former architect who reads a floor plan the way other people read a novel.",
    contact: "james@keystone.estate",
  },
  {
    initials: "SR",
    bg: "#33465e",
    name: "Sofia Reyes",
    role: "Rentals · Harbourview",
    text: "Sofia places tenants in days, not weeks — and landlords keep coming back for her.",
    contact: "sofia@keystone.estate",
  },
];

export default function KeystoneRealEstate() {
  const [searchNote, setSearchNote] = useState("");
  const [booked, setBooked] = useState(false);

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const loc = (data.get("location") as string) || "your area";
    setSearchNote(`6 homes found near ${loc} — scroll down to browse the featured listings.`);
  };

  const onBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="key">
      {/* ---- nav ---- */}
      <header className="key-nav">
        <div className="key-nav-inner">
          <a className="key-brand" href="#top">
            KEYSTONE<span>.</span>
          </a>
          <nav className="key-nav-links" aria-label="Real estate">
            <a href="#listings">Listings</a>
            <a href="#neighbourhoods">Neighbourhoods</a>
            <a href="#agents">Agents</a>
            <a href="#viewing">Contact</a>
          </nav>
          <a className="key-btn" href="#viewing">
            Book a viewing
          </a>
        </div>
      </header>

      {/* ---- hero ---- */}
      <section className="key-hero" id="top">
        <div className="key-hero-media">
          <Image
            src={HERO}
            alt="A modern white villa with a swimming pool under a bright blue sky"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="key-hero-inner">
          <span className="key-kicker">Keystone Realty · Est. 2012</span>
          <h1>
            Find where <em>you belong.</em>
          </h1>
          <p>
            Honest advice, beautiful homes and a team that treats your move
            like their own — across Maplewood, Harbourview and beyond.
          </p>
        </div>
        <div className="key-search">
          <form className="key-search-bar" onSubmit={onSearch}>
            <label>
              Location
              <input name="location" type="text" placeholder="City, neighbourhood or postcode" />
            </label>
            <label>
              Max price
              <select name="price" defaultValue="Any price">
                <option>Any price</option>
                <option>$500,000</option>
                <option>$1,000,000</option>
                <option>$1,500,000</option>
                <option>$2,000,000+</option>
              </select>
            </label>
            <label>
              Property type
              <select name="type" defaultValue="Any type">
                <option>Any type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Townhouse</option>
              </select>
            </label>
            <button className="key-btn gold" type="submit">
              Search →
            </button>
          </form>
          {searchNote ? <p className="key-search-note">{searchNote}</p> : null}
        </div>
      </section>

      {/* ---- featured listings ---- */}
      <section className="key-section" id="listings">
        <div className="key-wrap">
          <Reveal>
            <span className="key-kicker">Featured listings</span>
            <h2 className="key-h2">
              Homes we would <em>live in ourselves.</em>
            </h2>
            <p className="key-lede">
              Every listing is visited, photographed and priced by one of our
              own agents — no stock photos, no guesswork.
            </p>
          </Reveal>
          <div className="key-listings">
            {LISTINGS.map((l, i) => (
              <Reveal key={l.title} delay={(i % 3) * 0.08}>
                <article className="key-card">
                  <div className="key-card-media">
                    <span className={`key-tag${l.tagGold ? " gold" : ""}`}>{l.tag}</span>
                    <Image
                      src={l.img}
                      alt={l.title}
                      width={1200}
                      height={790}
                      sizes="(max-width: 960px) 100vw, 33vw"
                    />
                  </div>
                  <div className="key-card-body">
                    <div className="key-card-price">
                      {l.price}
                      {l.per ? <span> {l.per}</span> : null}
                    </div>
                    <h3>{l.title}</h3>
                    <p className="key-card-loc">{l.loc}</p>
                    <div className="key-card-specs">
                      <span>
                        <b>{l.beds}</b> beds
                      </span>
                      <span>
                        <b>{l.baths}</b> baths
                      </span>
                      <span>
                        <b>{l.sqft}</b> sq ft
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- neighbourhoods ---- */}
      <section className="key-section off" id="neighbourhoods">
        <div className="key-wrap">
          <Reveal>
            <span className="key-kicker">Neighbourhoods</span>
            <h2 className="key-h2">
              Know the street <em>before you move.</em>
            </h2>
            <p className="key-lede">
              We live in the areas we sell. Ask us about schools, commutes,
              coffee — and which streets stay quiet on a Saturday night.
            </p>
          </Reveal>
          <div className="key-hoods">
            {HOODS.map((h, i) => (
              <Reveal key={h.name} delay={i * 0.08}>
                <article className="key-hood">
                  <Image
                    src={h.img}
                    alt={h.name}
                    width={1200}
                    height={1140}
                    sizes="(max-width: 860px) 100vw, 33vw"
                  />
                  <div className="key-hood-body">
                    <span className="key-hood-count">{h.count}</span>
                    <h3>{h.name}</h3>
                    <p>{h.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- services ---- */}
      <section className="key-section" id="services">
        <div className="key-wrap">
          <Reveal>
            <span className="key-kicker">What we do</span>
            <h2 className="key-h2">
              Buy, sell or rent — <em>one team, start to finish.</em>
            </h2>
          </Reveal>
          <div className="key-services">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <article className="key-service">
                  <span className="key-ico" aria-hidden="true">
                    {s.icon}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <a href="#viewing">{s.link}</a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- agents ---- */}
      <section className="key-section off" id="agents">
        <div className="key-wrap">
          <Reveal>
            <span className="key-kicker">Meet the team</span>
            <h2 className="key-h2">
              People who pick up <em>the phone.</em>
            </h2>
            <p className="key-lede">
              No call centres, no hand-offs. You deal with the agent who
              knows your home — from first viewing to handover day.
            </p>
          </Reveal>
          <div className="key-agents">
            {AGENTS.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.08}>
                <article className="key-agent">
                  <div className="key-avatar" style={{ background: a.bg }}>
                    {a.initials}
                  </div>
                  <h3>{a.name}</h3>
                  <div className="key-role">{a.role}</div>
                  <p>{a.text}</p>
                  <div className="key-agent-contact">{a.contact}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- testimonial ---- */}
      <section className="key-section">
        <div className="key-wrap">
          <div className="key-quote">
            <Reveal>
              <div className="key-stars" aria-label="Five stars">
                ★★★★★
              </div>
              <blockquote>
                “They told us not to buy the first house we loved — and they
                were right. Three weeks later we found the one, under budget,
                and Amelia was there at every single step.”
              </blockquote>
              <cite>
                Daniel &amp; Priya Thompson
                <span>Bought in Maplewood, March 2026</span>
              </cite>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- viewing request ---- */}
      <section className="key-section" id="viewing" style={{ paddingTop: 0 }}>
        <div className="key-wrap">
          <div className="key-view">
            <Reveal>
              <div>
                <span className="key-kicker">Book a viewing</span>
                <h2>See it in person.</h2>
                <p>
                  Tell us which home caught your eye and when works for you.
                  We confirm every viewing personally within one working day —
                  and we will never rush you through the door.
                </p>
                <p style={{ marginTop: 18 }}>
                  Prefer to talk first? Call{" "}
                  <strong style={{ color: "#c9a25c" }}>+1 (555) 014-2900</strong>{" "}
                  or write to{" "}
                  <strong style={{ color: "#c9a25c" }}>
                    hello@keystone.estate
                  </strong>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {booked ? (
                <div className="key-form-ok">
                  <strong>Thank you — your viewing request is in.</strong>
                  <br />
                  One of our agents will call or email you within one working
                  day to confirm your time.
                </div>
              ) : (
                <form className="key-form" onSubmit={onBook}>
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
                    <input name="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                  </label>
                  <label>
                    Preferred date
                    <input name="date" type="date" required />
                  </label>
                  <label className="full">
                    Property you are interested in
                    <select name="property" defaultValue="The Glasshouse on Ferntree Lane — $1,285,000">
                      {LISTINGS.map((l) => (
                        <option key={l.title}>
                          {l.title} — {l.price}
                        </option>
                      ))}
                      <option>Something else — tell us in the viewing</option>
                    </select>
                  </label>
                  <button className="key-btn" type="submit">
                    Request my viewing →
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- footer ---- */}
      <footer className="key-footer">
        <div className="key-wrap">
          <div className="key-footer-top">
            <div>
              <a className="key-brand" href="#top">
                KEYSTONE<span>.</span>
              </a>
              <p style={{ marginTop: 16 }}>
                A modern real estate agency for people who want honest advice
                and homes worth coming back to.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="#listings">Listings</a></li>
                <li><a href="#neighbourhoods">Neighbourhoods</a></li>
                <li><a href="#agents">Agents</a></li>
                <li><a href="#viewing">Book a viewing</a></li>
              </ul>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Buying</a></li>
                <li><a href="#services">Selling</a></li>
                <li><a href="#services">Renting</a></li>
                <li><a href="#services">Valuations</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href="tel:+15550142900">+1 (555) 014-2900</a></li>
                <li><a href="mailto:hello@keystone.estate">hello@keystone.estate</a></li>
                <li><a href="#top">14 Maplewood Avenue</a></li>
              </ul>
            </div>
          </div>
          <div className="key-footer-bottom">
            <span>© 2026 Keystone Realty — a real estate template</span>
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
