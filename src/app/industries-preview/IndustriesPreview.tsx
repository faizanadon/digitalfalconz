"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useScroll } from "framer-motion";

const MEET = "https://meet.digitalfalconz.com/";
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Verified Unsplash imagery (all return HTTP 200 and were visually checked).
   Illustrative only — never presented as DigitalFalconz client photography. */
const IMG = {
  heroRetreat: u("1470071459604-3b5ec3a7fe05", 1600),
  heroCorp: u("1522202176988-66273c2fd55f", 1200),
  cardRetreat: u("1544367567-0f2fcb009e0b", 1200),
  cardCorp: u("1522071820081-009f0129c71c", 1200),
  storyRetreat: u("1602216056096-3b40cc0c9944", 1400),
  storyCorp: u("1556761175-b413da4baf72", 1400),
  demoRetreat: u("1544161515-4ab6ce6db874", 1200),
  demoCorp: u("1553877522-43269d4ea984", 1200),
  ctaBg: u("1506905925346-21bda4d32df4", 1800),
  bandLake: u("1476514525535-07fb3b4ae5f1", 2000),
  bandOffice: u("1497366216548-37526070297c", 2000),
  progYoga: u("1545205597-3d9d02c29597", 1200),
  progBreath: u("1506126613408-eca07ce68773", 1200),
  progMountain: u("1519681393784-d120267933ba", 1200),
  showRetreat: u("1507525428034-b723cf961d3e", 1400),
  showCorp: u("1521737711867-e3b97375f902", 1200),
  showSystems: u("1504384308090-c894fdcc538d", 1400),
};

/* Guarded GA4/GTM event. Never sends PII. */
function track(event: string, params?: Record<string, string>) {
  try {
    if (typeof window === "undefined") return;
    const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    if (Array.isArray(dl)) dl.push({ event, ...(params ?? {}) });
  } catch {
    /* analytics must never break the page */
  }
}

/* After an in-page interaction changes a section's height (Process accordion
   swap, selector audience switch), the section heading can end up with its
   first line tucked under the sticky header. The anchor offsets (Lenis −72px,
   scroll-margin 64px) only apply when a scroll happens — these interactions
   don't scroll, and scroll anchoring doesn't compensate for a height change
   inside the visible viewport. So, once the layout has settled, check the
   heading: if it straddles the header's bottom edge (top hidden under the
   header, bottom still visible), nudge it back to the same offset anchor
   landings use. If it's fully visible or already scrolled past, do nothing. */
function nudgeHeadingClear(headingId: string) {
  const el = document.getElementById(headingId);
  if (!el) return;
  const header = document.querySelector("header.site");
  const headerBottom = header ? header.getBoundingClientRect().bottom : 52;
  const r = el.getBoundingClientRect();
  if (r.top < headerBottom && r.bottom > headerBottom) {
    const lenis = (window as unknown as {
      __lenis?: { scrollTo: (t: HTMLElement, o: { offset: number; duration: number }) => void };
    }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -72, duration: 0.5 });
    else el.scrollIntoView(); // instant; scroll-margin-top: 64px applies
  }
}

/* Local BlurReveal (same pattern as the templates): subtle opacity + blur + rise. */
function BlurReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)", y: 18 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="indx-kicker">{children}</p>;
}

/* ---------------- Icons (inline stroke SVGs, gold via currentColor) ---------------- */

const ICON_PATHS: Record<string, React.ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  megaphone: (
    <>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  sparkle: <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4L12 2z" />,
  pen: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </>
  ),
  funnel: <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
  sliders: (
    <>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name] ?? ICON_PATHS.globe}
    </svg>
  );
}

/* ---------------- Connected-systems diagram ---------------- */

const FLOW_NODES = [
  { icon: "megaphone", label: "Marketing", sub: "Demand & acquisition" },
  { icon: "globe", label: "Website", sub: "Design & development" },
  { icon: "calendar", label: "Booking", sub: "Reservations & deposits" },
  { icon: "users", label: "CRM", sub: "Guest & client records" },
  { icon: "sparkle", label: "Automation", sub: "AI assistants & workflows" },
];

function ConnectedFlow() {
  return (
    <div className="indx-flow-diagram">
      <p className="indx-flow-diagram-title">One connected approach — not five separate tools</p>
      <div className="indx-flow-track">
        {FLOW_NODES.map((n, i) => (
          <Fragment key={n.label}>
            <BlurReveal className="indx-flow-node" delay={i * 0.1}>
              <span className="indx-icon indx-flow-icon" aria-hidden="true">
                <Icon name={n.icon} />
              </span>
              <span className="indx-flow-node-label">{n.label}</span>
              <span className="indx-flow-node-sub">{n.sub}</span>
            </BlurReveal>
            {i < FLOW_NODES.length - 1 && <span className="indx-flow-link" aria-hidden="true" />}
          </Fragment>
        ))}
      </div>
      <p className="indx-flow-caption">
        Marketing, website, booking, CRM and automation — connected, so the business behind the experience
        runs as one system.
      </p>
    </div>
  );
}

/* ---------------- Full-width image break ---------------- */

function Band({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="indx-band" aria-label={caption}>
      <div className="indx-band-img">
        <Image src={src} alt={alt} fill sizes="100vw" />
      </div>
      <figcaption className="indx-band-cap">{caption}</figcaption>
    </figure>
  );
}

/* ---------------- Visual showcase strip (three frames) ---------------- */

const SHOWCASE = [
  {
    src: "showRetreat" as const,
    alt: "A tropical beach at sunset — illustrative imagery",
    cap: "Retreats",
    sub: "The experience guests remember",
  },
  {
    src: "showCorp" as const,
    alt: "A team working together in a lodge — illustrative imagery",
    cap: "Corporate offsites",
    sub: "The planning that makes it happen",
  },
  {
    src: "showSystems" as const,
    alt: "A team working in an open-plan office — illustrative imagery",
    cap: "The system behind it",
    sub: "Connected, not scattered",
  },
];

function Showcase() {
  return (
    <section className="indx-section indx-showcase" aria-labelledby="indx-show-h">
      <div className="indx-wrap">
        <BlurReveal>
          <Kicker>In three frames</Kicker>
          <h2 id="indx-show-h">The Experience. The Planning. The System Behind It.</h2>
        </BlurReveal>
        <div className="indx-showcase-grid">
          {SHOWCASE.map((f, i) => (
            <BlurReveal key={f.cap} delay={i * 0.08}>
              <figure className="indx-show-fig">
                <span className="indx-show-img">
                  <Image src={IMG[f.src]} alt={f.alt} fill sizes="(max-width: 900px) 100vw, 33vw" />
                </span>
                <figcaption>
                  <strong>{f.cap}</strong>
                  <span>{f.sub}</span>
                </figcaption>
              </figure>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Data (tightened from the developer brief — same substance, fewer words) ---------------- */

type Solution = {
  n: string;
  title: string;
  intro: string;
  bullets: string[];
  outcome: string;
  href: string;
  linkLabel: string;
};

const RETREAT_SOLUTIONS: Solution[] = [
  {
    n: "01",
    title: "Retreat Website Design & Development",
    intro: "A digital experience that reflects the quality of your retreats.",
    bullets: [
      "Distinct pages per retreat & programme",
      "Accommodation, itineraries & pricing",
      "Mobile-first booking journeys",
      "Search-friendly structure & analytics",
    ],
    outcome: "Easier for guests to discover, understand and enquire.",
    href: "/services/website-design-development",
    linkLabel: "Website design & development",
  },
  {
    n: "02",
    title: "Custom Retreat Booking & Reservation Systems",
    intro: "The right booking experience, built around your actual availability rules.",
    bullets: [
      "Dates & capacity rules",
      "Single, twin & shared rooms",
      "Deposits, instalments & reminders",
      "Waitlists & cancellations",
    ],
    outcome: "Less manual coordination, fewer booking errors.",
    href: "/services/custom-software-development",
    linkLabel: "Custom software development",
  },
  {
    n: "03",
    title: "Retreat Marketing & Guest Acquisition",
    intro: "Reach the people most likely to value your experience.",
    bullets: [
      "Google & Meta advertising",
      "Retreat landing pages",
      "SEO & AI search",
      "Retargeting & follow-up",
    ],
    outcome: "A clearer path from discovery to booking.",
    href: "/services/lead-generation",
    linkLabel: "Lead generation",
  },
  {
    n: "04",
    title: "Guest CRM & Communication Automation",
    intro: "Keep the personal touch. Reduce repetitive work.",
    bullets: [
      "Enquiry & booking records",
      "Confirmations & reminders",
      "Guest preferences",
      "Re-engagement campaigns",
    ],
    outcome: "A consistent guest journey, with the human touch kept.",
    href: "/services/crm-implementation",
    linkLabel: "CRM implementation",
  },
  {
    n: "05",
    title: "AI Assistants & Workflow Integrations",
    intro: "Give routine questions a faster path to answers.",
    bullets: [
      "Answers on dates, rooms & booking steps",
      "Connects to approved booking & CRM flows",
      "Escalates sensitive questions to a person",
    ],
    outcome: "Faster answers, without losing the human care.",
    href: "/services/ai-chatbots",
    linkLabel: "AI chatbots",
  },
  {
    n: "06",
    title: "Retreat Branding, Content & Creative",
    intro: "Make the experience compelling before the guest arrives.",
    bullets: [
      "Brand direction & design",
      "Video editing & motion",
      "Social & campaign creative",
    ],
    outcome: "One distinctive experience, everywhere guests see you.",
    href: "/services/branding-identity",
    linkLabel: "Branding & identity",
  },
];

const CORP_SOLUTIONS: Solution[] = [
  {
    n: "01",
    title: "Corporate Lead Generation & Demand Creation",
    intro: "Get in front of companies planning their next team experience.",
    bullets: [
      "Google & LinkedIn advertising",
      "B2B landing pages & forms",
      "Corporate SEO",
      "Lead qualification & CRM",
    ],
    outcome: "A measurable pipeline of relevant enquiries.",
    href: "/services/lead-generation",
    linkLabel: "Lead generation",
  },
  {
    n: "02",
    title: "Premium Corporate Websites & Proposal Experiences",
    intro: "Make a stronger impression before the first sales conversation.",
    bullets: [
      "Service pages & destination showcases",
      "Case studies & portfolio",
      "Personalised proposal pages",
      "Conversion-focused enquiry forms",
    ],
    outcome: "A stronger first impression — before the first call.",
    href: "/services/website-design-development",
    linkLabel: "Website design & development",
  },
  {
    n: "03",
    title: "CRM & Corporate Sales Pipeline Automation",
    intro: "Keep every opportunity moving with greater clarity.",
    bullets: [
      "Enquiry capture & routing",
      "Qualification by headcount, budget & dates",
      "Pipeline visibility & follow-ups",
      "Proposal status tracking",
    ],
    outcome: "Every opportunity moving, with clarity.",
    href: "/services/crm-implementation",
    linkLabel: "CRM implementation",
  },
  {
    n: "04",
    title: "Proposal & Quotation Workflow Automation",
    intro: "Spend less time assembling documents. More time winning the right projects.",
    bullets: [
      "Standard discovery forms",
      "Reusable proposal sections",
      "Draft itineraries & budgets",
      "Review & approval stages",
    ],
    outcome: "Brief to proposal, faster — always human-approved.",
    href: "/services/sales-marketing-automation",
    linkLabel: "Sales & marketing automation",
  },
  {
    n: "05",
    title: "Event Operations & Client Portals",
    intro: "Connect planning information in one place.",
    bullets: [
      "Timelines & task ownership",
      "Venue & supplier details",
      "Attendee & budget tracking",
      "Client document sharing",
    ],
    outcome: "One place for every active event.",
    href: "/services/custom-software-development",
    linkLabel: "Custom software development",
  },
  {
    n: "06",
    title: "Branding, Design & Corporate Event Creative",
    intro: "Make every client interaction feel considered.",
    bullets: [
      "Pitch & proposal design",
      "Event identity & collateral",
      "Landing pages & video",
    ],
    outcome: "Polished, consistent client communication.",
    href: "/services/branding-identity",
    linkLabel: "Branding & identity",
  },
];

type Challenge = { title: string; body: string; solution: string; solutionHref: string };

const RETREAT_CHALLENGES: Challenge[] = [
  {
    title: "Your Website Inspires Interest, but Booking Feels Difficult",
    body: "Programme details, accommodation or booking steps aren't clear enough to book with confidence.",
    solution: "01 — Retreat Website Design & Development",
    solutionHref: "#retreat-solutions",
  },
  {
    title: "Room Availability Lives in Spreadsheets",
    body: "Single and shared rooms, changing occupancy and last-minute changes make availability hard to manage.",
    solution: "02 — Custom Retreat Booking & Reservation Systems",
    solutionHref: "#retreat-solutions",
  },
  {
    title: "Deposits and Guest Records Need Manual Attention",
    body: "Payments, balances and guest details tracked across several tools.",
    solution: "04 — Guest CRM & Communication Automation",
    solutionHref: "#retreat-solutions",
  },
  {
    title: "Enquiries Don’t Always Become Bookings",
    body: "Guests ask questions, consider their options — and disappear without structured follow-up.",
    solution: "03 — Retreat Marketing & Guest Acquisition",
    solutionHref: "#retreat-solutions",
  },
  {
    title: "Every Retreat Launch Starts From Scratch",
    body: "Campaigns, guest comms and prep consume more time than they should.",
    solution: "03 — Retreat Marketing & Guest Acquisition",
    solutionHref: "#retreat-solutions",
  },
];

const CORP_CHALLENGES: Challenge[] = [
  {
    title: "Qualified Corporate Enquiries Are Difficult to Generate Consistently",
    body: "Finding companies actively planning offsites takes a focused B2B acquisition strategy.",
    solution: "01 — Corporate Lead Generation & Demand Creation",
    solutionHref: "#corporate-solutions",
  },
  {
    title: "Every Client Brief Comes With Different Requirements",
    body: "Team size, objectives, destinations, dates, budgets and venues — every brief is different.",
    solution: "04 — Proposal & Quotation Workflow Automation",
    solutionHref: "#corporate-solutions",
  },
  {
    title: "Proposals Take Time to Prepare",
    body: "Information scattered across documents and suppliers makes tailored proposals slow to build.",
    solution: "04 — Proposal & Quotation Workflow Automation",
    solutionHref: "#corporate-solutions",
  },
  {
    title: "Opportunities Can Stall Between Enquiry and Approval",
    body: "HR, EAs, procurement, senior decision-makers — without organised follow-up, opportunities stall.",
    solution: "03 — CRM & Corporate Sales Pipeline Automation",
    solutionHref: "#corporate-solutions",
  },
  {
    title: "Operations Become More Complex as Projects Increase",
    body: "Guest lists, venues, timelines and suppliers — all needing to stay coordinated as you grow.",
    solution: "05 — Event Operations & Client Portals",
    solutionHref: "#corporate-solutions",
  },
];

const WHY = [
  {
    title: "Industry-Relevant Thinking",
    body: "We start with how you sell, book and deliver.",
  },
  {
    title: "Connected Capabilities",
    body: "Marketing, websites, CRM, software and AI — where they genuinely add value.",
  },
  {
    title: "Practical Technology Decisions",
    body: "Optimise what you have, integrate where it helps, build only when it should be custom.",
  },
  {
    title: "Human-Centred Automation",
    body: "Automation that supports your team — never friction, never removing human oversight.",
  },
  {
    title: "Designed for Long-Term Use",
    body: "Usability, maintainability and what's next — planned in from the start.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Discover",
    body: "We map your customer journey, workflows, technology and key challenges.",
  },
  {
    n: "02",
    title: "Define",
    body: "We find the highest-priority improvements and the right approach.",
  },
  {
    n: "03",
    title: "Design & Build",
    body: "We create the agreed experience, system or integration.",
  },
  {
    n: "04",
    title: "Connect & Validate",
    body: "We test workflows, data and rules before launch.",
  },
  {
    n: "05",
    title: "Support & Improve",
    body: "We monitor, resolve and keep improving — where support is agreed.",
  },
];

const FAQS = [
  {
    q: "Do you work with independent retreat organisers or only established centres?",
    a: "Both. The approach depends on your booking needs, budget, technology and complexity.",
  },
  {
    q: "Can you improve our existing retreat booking system instead of replacing it?",
    a: "Yes, where the platform allows it. We assess your system and its integrations before recommending custom work.",
  },
  {
    q: "Can you build booking workflows for different room types and deposit rules?",
    a: "Yes — during technical discovery we define and test your room, pricing, availability and payment rules before building.",
  },
  {
    q: "Do you provide marketing as well as booking or CRM technology?",
    a: "Yes — marketing, websites, lead generation, CRM and automation, combined into one connected project.",
  },
  {
    q: "Can you help our corporate offsite company attract more B2B clients?",
    a: "Yes — Google Search, LinkedIn, SEO, landing pages and CRM-connected lead generation. Results depend on your market, offer, budget and sales process.",
  },
  {
    q: "Can you integrate our existing event planning and sales tools?",
    a: "Many do — via APIs, webhooks or approved automation platforms. It depends on your current software and workflows.",
  },
  {
    q: "Do we need a custom application?",
    a: "Not necessarily. Improving your existing tools or using established software is often the better balance of capability, cost and maintenance.",
  },
  {
    q: "What happens after an initial consultation?",
    a: "We review your requirements and recommend a discovery assessment, scoped proposal or roadmap — with no obligation to proceed.",
  },
];

type Problem = {
  audience: "retreat" | "corporate";
  problem: string;
  solution: string;
  href: string;
};

const PROBLEMS: Problem[] = [
  {
    audience: "retreat",
    problem: "Bookings and deposits are too manual",
    solution: "Retreat Booking Systems & Guest Automation",
    href: "#retreat-demo",
  },
  {
    audience: "retreat",
    problem: "We need more bookings for upcoming retreats",
    solution: "Retreat Marketing & Guest Acquisition",
    href: "#retreat-solutions",
  },
  {
    audience: "retreat",
    problem: "Our website needs improvement",
    solution: "Retreat Website & Conversion Experience",
    href: "#retreat-solutions",
  },
  {
    audience: "corporate",
    problem: "We need more corporate clients",
    solution: "B2B Demand Generation",
    href: "#corporate-solutions",
  },
  {
    audience: "corporate",
    problem: "Our proposals take too much time",
    solution: "Proposal Workflow Automation",
    href: "#corporate-solutions",
  },
  {
    audience: "corporate",
    problem: "Our tools and planning workflows are disconnected",
    solution: "Corporate CRM & Event Operations",
    href: "#corporate-solutions",
  },
];

/* ---------------- Retreat booking simulation (fictional sample data) ---------------- */

const DEMO_PROGRAMMES = [
  {
    name: "Stillwater Yoga Retreat",
    days: 4,
    nights: 3,
    price: 420,
    dates: ["12–15 Mar 2027", "9–12 Apr 2027", "7–10 May 2027"],
    img: "progYoga" as const,
    imgAlt: "A group yoga session on a beach at sunrise — illustrative imagery",
  },
  {
    name: "Coastal Breathwork Weekend",
    days: 3,
    nights: 2,
    price: 350,
    dates: ["19–21 Mar 2027", "16–18 Apr 2027"],
    img: "progBreath" as const,
    imgAlt: "A woman meditating at sunrise — illustrative imagery",
  },
  {
    name: "Mountain Mindfulness Week",
    days: 7,
    nights: 6,
    price: 890,
    dates: ["3–9 May 2027", "14–20 Jun 2027"],
    img: "progMountain" as const,
    imgAlt: "Snowy mountains under a starry sky — illustrative imagery",
  },
];

const DEMO_ROOMS = [
  { name: "Single Room", supplement: 120, available: 4, maxGuests: 1, desc: "One guest, private room." },
  { name: "Twin Room", supplement: 60, available: 6, maxGuests: 2, desc: "Two guests, shared room." },
  { name: "Shared Dormitory · 4 bed", supplement: 0, available: 8, maxGuests: 2, desc: "Shared room, per person." },
  { name: "Private Suite", supplement: 260, available: 0, maxGuests: 2, desc: "Fully booked for these dates." },
];

const DEMO_STEPS = ["Programme", "Accommodation", "Booking Review", "Confirmation Example", "Guest Journey"];

const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

function RetreatDemo() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [prog, setProg] = useState(0);
  const [dateIdx, setDateIdx] = useState(0);
  const [roomIdx, setRoomIdx] = useState(0);
  const [guests, setGuests] = useState(1);
  const [deposit, setDeposit] = useState<"25" | "full">("25");
  const [confirmed, setConfirmed] = useState(false);
  const [waitlisted, setWaitlisted] = useState(false);

  const programme = DEMO_PROGRAMMES[prog];
  const room = DEMO_ROOMS[roomIdx];
  const perPerson = programme.price + room.supplement;
  const total = perPerson * guests;
  const depositAmt = deposit === "25" ? Math.round(total * 0.25) : total;
  const balance = total - depositAmt;
  const date = programme.dates[dateIdx] ?? programme.dates[0];

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      track("demo_start", { demo_type: "retreat_booking" });
    }
  };
  const goStep = (n: number) => {
    setStep(n);
    track("demo_step", { demo_type: "retreat_booking", step: String(n) });
  };
  const pickRoom = (i: number) => {
    markStarted();
    const r = DEMO_ROOMS[i];
    if (r.available === 0) return;
    setRoomIdx(i);
    setGuests((g) => Math.min(g, r.maxGuests));
    setWaitlisted(false);
  };
  const confirmBooking = () => {
    markStarted();
    setConfirmed(true);
    track("demo_step", { demo_type: "retreat_booking", step: "4" });
  };

  return (
    <div className="indx-demo" id="retreat-demo-inner">
      <div className="indx-demo-head">
        <div>
          <p className="indx-demo-label">Illustrative Demo — No Live Availability or Payments</p>
          <h3>Explore a Smarter Retreat Booking Journey</h3>
          <p className="indx-demo-intro">
            A sample flow — every choice updates availability, deposit and summary live. All fictional.
          </p>
        </div>
        <div className="indx-demo-img">
          <Image src={IMG.demoRetreat} alt="A spa treatment with warm oil — illustrative imagery" fill sizes="(max-width: 900px) 100vw, 340px" />
        </div>
      </div>

      <ol className="indx-demo-steps" aria-label="Booking steps">
        {DEMO_STEPS.map((s, i) => (
          <li key={s}>
            <button
              type="button"
              className={`indx-demo-step${step === i + 1 ? " on" : ""}${i + 1 < step || confirmed ? " done" : ""}`}
              onClick={() => goStep(i + 1)}
              aria-current={step === i + 1 ? "step" : undefined}
            >
              <span className="indx-demo-step-n">{i + 1}</span>
              <span>{s}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="indx-demo-grid">
        <div className="indx-demo-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <div>
                  <h4>1 · Choose a Retreat</h4>
                  <p className="indx-demo-note">Select the programme, preferred dates and available options.</p>
                  <figure className="indx-prog-img">
                    <Image key={programme.img} src={IMG[programme.img]} alt={programme.imgAlt} fill sizes="(max-width: 900px) 100vw, 620px" />
                  </figure>
                  <div className="indx-demo-progs" role="radiogroup" aria-label="Sample programmes">
                    {DEMO_PROGRAMMES.map((p, i) => (
                      <button
                        key={p.name}
                        type="button"
                        role="radio"
                        aria-checked={prog === i}
                        className={`indx-demo-prog${prog === i ? " on" : ""}`}
                        onClick={() => {
                          markStarted();
                          setProg(i);
                          setDateIdx(0);
                        }}
                      >
                        <span className="indx-demo-prog-name">{p.name}</span>
                        <span className="indx-demo-prog-meta">
                          {p.days} days · {p.nights} nights · From {gbp(p.price)} per person <em>(sample)</em>
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="indx-demo-sub">Preferred dates <em>(sample)</em></p>
                  <div className="indx-demo-chips" role="radiogroup" aria-label="Sample dates">
                    {programme.dates.map((d, i) => (
                      <button
                        key={d}
                        type="button"
                        role="radio"
                        aria-checked={dateIdx === i}
                        className={`indx-chip${dateIdx === i ? " on" : ""}`}
                        onClick={() => {
                          markStarted();
                          setDateIdx(i);
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <div className="indx-demo-nav">
                    <button type="button" className="indx-btn indx-btn-accent" onClick={() => goStep(2)}>
                      Continue to accommodation →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h4>2 · Select Accommodation</h4>
                  <p className="indx-demo-note">Rooms for {programme.name} on {date}. Availability is sample data.</p>
                  <div className="indx-demo-rooms" role="radiogroup" aria-label="Sample rooms">
                    {DEMO_ROOMS.map((r, i) => {
                      const full = r.available === 0;
                      return (
                        <button
                          key={r.name}
                          type="button"
                          role="radio"
                          aria-checked={roomIdx === i}
                          disabled={full}
                          className={`indx-demo-room${roomIdx === i ? " on" : ""}${full ? " full" : ""}`}
                          onClick={() => pickRoom(i)}
                        >
                          <span className="indx-demo-room-name">{r.name}</span>
                          <span className="indx-demo-room-desc">{r.desc}</span>
                          <span className="indx-demo-room-meta">
                            {full ? (
                              <>Fully booked — join waitlist <em>(sample)</em></>
                            ) : (
                              <>
                                {r.supplement === 0 ? "Included" : `+ ${gbp(r.supplement)} per person`} · {r.available} left <em>(sample)</em>
                              </>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {DEMO_ROOMS[roomIdx].available === 0 && (
                    <p className="indx-demo-note">The Private Suite is fully booked for these dates in this sample.</p>
                  )}
                  <button
                    type="button"
                    className="indx-btn indx-btn-ghost"
                    onClick={() => {
                      markStarted();
                      setWaitlisted(true);
                    }}
                  >
                    Join the waitlist for the Private Suite <em>(sample)</em>
                  </button>
                  {waitlisted && (
                    <p className="indx-demo-ok" role="status">You’re on the waitlist for the Private Suite <em>(sample)</em>. No payment taken.</p>
                  )}
                  <div className="indx-demo-field">
                    <label htmlFor="indx-guests">Guests</label>
                    <div className="indx-stepper">
                      <button
                        type="button"
                        aria-label="Fewer guests"
                        disabled={guests <= 1}
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      >
                        −
                      </button>
                      <span aria-live="polite">
                        {guests} guest{guests > 1 ? "s" : ""}
                      </span>
                      <button
                        type="button"
                        aria-label="More guests"
                        disabled={guests >= room.maxGuests}
                        onClick={() => setGuests((g) => Math.min(room.maxGuests, g + 1))}
                      >
                        +
                      </button>
                    </div>
                    <p className="indx-demo-note">
                      {room.name} fits up to {room.maxGuests} guest{room.maxGuests > 1 ? "s" : ""} in this sample.
                    </p>
                  </div>
                  <div className="indx-demo-field">
                    <span className="indx-demo-label-sm" id="indx-deposit-label">Deposit <em>(sample)</em></span>
                    <div className="indx-demo-chips" role="radiogroup" aria-labelledby="indx-deposit-label">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={deposit === "25"}
                        className={`indx-chip${deposit === "25" ? " on" : ""}`}
                        onClick={() => {
                          markStarted();
                          setDeposit("25");
                        }}
                      >
                        25% deposit — {gbp(depositAmt)}
                      </button>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={deposit === "full"}
                        className={`indx-chip${deposit === "full" ? " on" : ""}`}
                        onClick={() => {
                          markStarted();
                          setDeposit("full");
                        }}
                      >
                        Pay in full — {gbp(total)}
                      </button>
                    </div>
                  </div>
                  <div className="indx-demo-nav">
                    <button type="button" className="indx-btn indx-btn-ghost" onClick={() => goStep(1)}>
                      ← Back
                    </button>
                    <button type="button" className="indx-btn indx-btn-accent" onClick={() => goStep(3)}>
                      Review booking →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h4>3 · Review Booking Details</h4>
                  <p className="indx-demo-note">Check the sample selection, total and deposit.</p>
                  <dl className="indx-review">
                    <div><dt>Programme</dt><dd>{programme.name} <em>(sample)</em></dd></div>
                    <div><dt>Dates</dt><dd>{date} <em>(sample)</em></dd></div>
                    <div><dt>Accommodation</dt><dd>{room.name} <em>(sample)</em></dd></div>
                    <div><dt>Guests</dt><dd>{guests}</dd></div>
                    <div><dt>Per person</dt><dd>{gbp(perPerson)} <em>(sample)</em></dd></div>
                    <div><dt>Total</dt><dd>{gbp(total)} <em>(sample)</em></dd></div>
                    <div><dt>Deposit due now</dt><dd>{gbp(depositAmt)} <em>(sample)</em></dd></div>
                    <div><dt>Balance remaining</dt><dd>{gbp(balance)} — due 30 days before arrival <em>(sample policy)</em></dd></div>
                  </dl>
                  <p className="indx-demo-note">
                    Sample policy: free date change up to 45 days before arrival; deposits are illustrative only.
                  </p>
                  <div className="indx-demo-nav">
                    <button type="button" className="indx-btn indx-btn-ghost" onClick={() => goStep(2)}>
                      ← Back
                    </button>
                    <button type="button" className="indx-btn indx-btn-accent" onClick={() => goStep(4)}>
                      Continue to confirmation →
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h4>4 · Confirm the Reservation</h4>
                  <p className="indx-demo-note">
                    In a live system this would record the booking, update availability and trigger
                    confirmation. Sample only — no payment taken, nothing booked.
                  </p>
                  {!confirmed ? (
                    <button type="button" className="indx-btn indx-btn-accent" onClick={confirmBooking}>
                      Confirm sample booking
                    </button>
                  ) : (
                    <div className="indx-confirm" role="status">
                      <p className="indx-confirm-title">Sample booking confirmed</p>
                      <dl className="indx-review">
                        <div><dt>Booking reference</dt><dd>SAMPLE-RT-2026-014</dd></div>
                        <div><dt>Status</dt><dd>Deposit paid <em>(sample)</em> — {gbp(depositAmt)}</dd></div>
                        <div><dt>Availability</dt><dd>{room.name}: {Math.max(0, room.available - guests)} left after this booking <em>(sample)</em></dd></div>
                        <div><dt>Confirmation</dt><dd>Sample confirmation email triggered <em>(sample workflow)</em></dd></div>
                      </dl>
                    </div>
                  )}
                  <div className="indx-demo-nav">
                    <button type="button" className="indx-btn indx-btn-ghost" onClick={() => goStep(3)}>
                      ← Back
                    </button>
                    <button type="button" className="indx-btn indx-btn-accent" onClick={() => goStep(5)}>
                      See the guest journey →
                    </button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h4>5 · Manage the Guest Journey</h4>
                  <p className="indx-demo-note">
                    Booking details, remaining balances and guest communications, organised in one place <em>(sample)</em>.
                  </p>
                  <ol className="indx-journey">
                    <li><strong>Confirmation email</strong><span>Sent — booking reference, dates, room and deposit receipt <em>(sample)</em></span></li>
                    <li><strong>Preparation email</strong><span>Scheduled — what to bring, arrival details, programme outline <em>(sample)</em></span></li>
                    <li><strong>Balance reminder</strong><span>Scheduled — {gbp(balance)} due 30 days before arrival <em>(sample)</em></span></li>
                    <li><strong>Post-retreat follow-up</strong><span>Scheduled — feedback request and repeat-booking invitation <em>(sample)</em></span></li>
                  </ol>
                  <div className="indx-demo-nav">
                    <button type="button" className="indx-btn indx-btn-ghost" onClick={() => goStep(4)}>
                      ← Back
                    </button>
                    <a
                      className="indx-btn indx-btn-accent"
                      href={MEET}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("consultation_click", { industry: "retreat", section: "retreat_demo", cta_label: "Request a Personalised Booking System Walkthrough" })}
                    >
                      Request a Personalised Booking System Walkthrough →
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <aside className="indx-summary" aria-label="Sample booking summary">
          <p className="indx-summary-label">Sample booking summary</p>
          <dl className="indx-review indx-review-tight">
            <div><dt>Programme</dt><dd>{programme.name}</dd></div>
            <div><dt>Dates</dt><dd>{date}</dd></div>
            <div><dt>Room</dt><dd>{room.name}</dd></div>
            <div><dt>Guests</dt><dd>{guests}</dd></div>
            <div><dt>Per person</dt><dd>{gbp(perPerson)}</dd></div>
            <div><dt>Total</dt><dd>{gbp(total)}</dd></div>
            <div><dt>Deposit due</dt><dd>{gbp(depositAmt)}</dd></div>
            <div><dt>Balance</dt><dd>{gbp(balance)}</dd></div>
          </dl>
          <p className="indx-summary-note">All figures are fictional samples. No live availability or payments.</p>
          {confirmed && <p className="indx-demo-ok" role="status">Sample booking SAMPLE-RT-2026-014 confirmed.</p>}
        </aside>
      </div>
      <p className="indx-demo-disclaimer">
        Illustrative workflow. Features, integrations and payment arrangements are tailored to each project and
        subject to technical validation.
      </p>
    </div>
  );
}

/* ---------------- Corporate enquiry-to-proposal simulation (fictional) ---------------- */

const CORP_STAGES = [
  {
    label: "Enquiry",
    title: "Capture the Brief",
    desc: "Collect company name, group size, destination preferences, expected dates and budget range.",
    brief: [
      ["Company", "Northgate Consulting (sample)"],
      ["Group size", "24 people (sample)"],
      ["Destination", "Lake District (sample)"],
      ["Dates", "12–14 March 2027 (sample)"],
      ["Budget", "£18,000–£24,000, indicative (sample)"],
    ],
    tasks: [
      "Log the enquiry in the CRM (sample)",
      "Send an acknowledgement within the hour (sample)",
    ],
    output: "Enquiry logged — status: New (sample)",
    next: "Qualify the brief within one working day (sample)",
  },
  {
    label: "Qualification",
    title: "Qualify the Opportunity",
    desc: "Organise client requirements, decision-makers and next actions in a CRM pipeline.",
    brief: [
      ["Decision-makers", "Alex Morgan + CFO (sample)"],
      ["Budget", "Confirmed in range (sample)"],
      ["Decision date", "By 30 January 2027 (sample)"],
      ["Fit", "Leadership retreat, 24 people (sample)"],
    ],
    tasks: [
      "Discovery call with Alex Morgan (sample)",
      "Confirm venue availability for the dates (sample)",
    ],
    output: "Qualified opportunity — stage: Discovery (sample)",
    next: "Prepare a tailored proposal (sample)",
  },
  {
    label: "Proposal",
    title: "Prepare the Proposal",
    desc: "Bring selected venue options, approved pricing, service inclusions and itinerary details into a tailored proposal.",
    brief: [
      ["Venue options", "2 sample venues, indicative pricing only (sample)"],
      ["Inclusions", "Venue, catering, activities, transfers (sample)"],
      ["Itinerary", "Draft 3-day agenda (sample)"],
      ["Indicative total", "£21,400 (sample)"],
    ],
    tasks: [
      "Draft the proposal from approved sections (sample)",
      "Internal review — pricing and itinerary (sample)",
      "Human approval before sending (sample)",
    ],
    output: "Proposal draft v1 — awaiting human approval (sample)",
    next: "Send to the client after approval (sample)",
    gate: "Human-approval gate — this draft is illustrative. All commercial details require human review and approval before being sent to the client.",
  },
  {
    label: "Decision",
    title: "Manage the Decision",
    desc: "Track client responses, revisions, approvals and follow-up activities.",
    brief: [
      ["Client response", "Positive — two questions on transfers (sample)"],
      ["Revisions", "1 revision: airport transfers added (sample)"],
      ["Approval", "Approved by CFO (sample)"],
      ["Follow-up", "Contract sent (sample)"],
    ],
    tasks: [
      "Answer the client's questions (sample)",
      "Revise the proposal and re-issue (sample)",
    ],
    output: "Proposal approved — contract sent (sample)",
    next: "Coordinate delivery (sample)",
  },
  {
    label: "Coordination",
    title: "Coordinate Delivery",
    desc: "Connect confirmed project details with the relevant event-planning workflows.",
    brief: [
      ["Timeline", "8 weeks to the offsite (sample)"],
      ["Venue", "Confirmed — Lake District (sample)"],
      ["Attendees", "24 confirmed, 2 dietary requirements (sample)"],
      ["Budget", "£21,400 — on track (sample)"],
    ],
    tasks: [
      "Share the project timeline with the client (sample)",
      "Confirm suppliers and transfers (sample)",
    ],
    output: "Event plan live — all workstreams on track (sample)",
    next: "Deliver the offsite (sample)",
  },
];

function CorporateDemo() {
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState(0);
  const current = CORP_STAGES[stage];
  const pickStage = (i: number) => {
    if (!started) {
      setStarted(true);
      track("demo_start", { demo_type: "corporate_pipeline" });
    }
    setStage(i);
    track("demo_step", { demo_type: "corporate_pipeline", step: CORP_STAGES[i].label });
  };

  return (
    <div className="indx-demo" id="corporate-demo-inner">
      <div className="indx-demo-head">
        <div>
          <p className="indx-demo-label">Illustrative Workflow — No Live CRM Data</p>
          <h3>Explore the Corporate Client Journey</h3>
          <p className="indx-demo-intro">
            A sample enquiry through a structured sales process. Click a stage. All fictional.
          </p>
        </div>
        <div className="indx-demo-img">
          <Image src={IMG.demoCorp} alt="A team planning at a whiteboard — illustrative imagery" fill sizes="(max-width: 900px) 100vw, 340px" />
        </div>
      </div>

      <div className="indx-pipe">
        <ol className="indx-pipe-stages" aria-label="Sales pipeline stages">
          {CORP_STAGES.map((s, i) => (
            <li key={s.label}>
              <button
                type="button"
                className={`indx-pipe-stage${stage === i ? " on" : ""}${i < stage ? " done" : ""}`}
                onClick={() => pickStage(i)}
                aria-current={stage === i ? "step" : undefined}
              >
                <span className="indx-pipe-n">{i + 1}</span>
                <span className="indx-pipe-label">{s.label}</span>
                <span className="indx-pipe-status">
                  {i < stage ? "Done (sample)" : stage === i ? "Current (sample)" : "Upcoming (sample)"}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="indx-pipe-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="indx-pipe-kicker">Stage {stage + 1} of 5 — {current.label}</p>
              <h4>{current.title}</h4>
              <p className="indx-demo-note">{current.desc}</p>
              <dl className="indx-review">
                {current.brief.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="indx-pipe-sub">Tasks</p>
              <ul className="indx-tasks">
                {current.tasks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="indx-pipe-sub">Output</p>
              <p className="indx-pipe-out">{current.output}</p>
              <p className="indx-pipe-sub">Next action</p>
              <p className="indx-pipe-out">{current.next}</p>
              {current.gate && <p className="indx-gate" role="note">{current.gate}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="indx-demo-disclaimer">
        Illustrative workflow. Actual automation, proposal logic and integrations depend on the agreed project scope.
      </p>
      <a
        className="indx-btn indx-btn-accent"
        href={MEET}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("consultation_click", { industry: "corporate", section: "corporate_demo", cta_label: "Request a Personalised Workflow Demo" })}
      >
        Request a Personalised Workflow Demo →
      </a>
    </div>
  );
}

/* ---------------- Shared section pieces ---------------- */

function ChallengeGrid({ items, id }: { items: Challenge[]; id: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="indx-challenges" id={id}>
      {items.map((c, i) => {
        const isOpen = open === i;
        return (
          <div key={c.title} className={`indx-challenge${isOpen ? " on" : ""}`}>
            <button
              type="button"
              className="indx-challenge-btn"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="indx-challenge-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="indx-challenge-title">{c.title}</span>
              <span className="indx-challenge-plus" aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="indx-challenge-body">
                    <p>{c.body}</p>
                    <p className="indx-challenge-solution">
                      Related solution:{" "}
                      <a href={c.solutionHref} onClick={() => track("solution_select", { industry: c.solutionHref.includes("retreat") ? "retreat" : "corporate", problem: c.title, solution: c.solution })}>
                        {c.solution} →
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const RETREAT_SOLUTION_ICONS = ["globe", "calendar", "megaphone", "users", "sparkle", "pen"];
const CORP_SOLUTION_ICONS = ["target", "doc", "funnel", "sliders", "grid", "pen"];
const WHY_ICONS = ["compass", "link", "sliders", "heart", "clock"];

function SolutionList({ items, icons }: { items: Solution[]; icons: string[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="indx-solutions">
      {items.map((s, i) => {
        const isOpen = open === i;
        return (
          <BlurReveal key={s.title} delay={Math.min(i * 0.05, 0.2)}>
            <article className={`indx-solution${isOpen ? " on" : ""}`}>
              <div className="indx-solution-head">
                <span className="indx-icon" aria-hidden="true">
                  <Icon name={icons[i] ?? "globe"} />
                </span>
                <div className="indx-solution-head-text">
                  <span className="indx-solution-n">{s.n}</span>
                  <h3>{s.title}</h3>
                </div>
              </div>
              <p className="indx-solution-intro">{s.intro}</p>
              <button
                type="button"
                className="indx-solution-more"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {isOpen ? "Show less −" : "See what’s included +"}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="indx-solution-detail">
                      <ul className="indx-solution-bullets">
                        {s.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      <p className="indx-solution-outcome">
                        <span>Intended outcome</span> {s.outcome}
                      </p>
                      <Link className="indx-solution-link" href={s.href}>
                        {s.linkLabel} →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          </BlurReveal>
        );
      })}
    </div>
  );
}

function ProblemSelector() {
  const [audience, setAudience] = useState<"retreat" | "corporate">("retreat");
  const [selected, setSelected] = useState<number | null>(null);
  const list = PROBLEMS.filter((p) => p.audience === audience);
  const active = selected !== null ? list[selected] : null;
  const pick = (i: number) => {
    setSelected(i);
    const p = list[i];
    track("solution_select", { industry: p.audience, problem: p.problem, solution: p.solution });
  };
  const switchAudience = (a: "retreat" | "corporate") => {
    setAudience(a);
    setSelected(null);
    // Panel drops to the shorter empty state instantly; check after React commits.
    window.setTimeout(() => nudgeHeadingClear("indx-selector-h"), 80);
  };

  return (
    <section className="indx-section" id="find-your-solution" aria-labelledby="indx-selector-h">
      <div className="indx-wrap">
        <BlurReveal>
          <Kicker>Where to start</Kicker>
          <h2 id="indx-selector-h">Where is your business losing momentum?</h2>
          <p className="indx-lede">
            Pick the problem that sounds most familiar. We’ll point you to the right solution — a starting
            point, not a diagnosis.
          </p>
        </BlurReveal>
        <div className="indx-toggle" role="tablist" aria-label="Choose your business type">
          <button
            type="button"
            role="tab"
            aria-selected={audience === "retreat"}
            className={audience === "retreat" ? "on" : ""}
            onClick={() => switchAudience("retreat")}
          >
            Retreats
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={audience === "corporate"}
            className={audience === "corporate" ? "on" : ""}
            onClick={() => switchAudience("corporate")}
          >
            Corporate Offsites
          </button>
        </div>
        <div className="indx-selector-grid">
          <div className="indx-selector-list" role="listbox" aria-label="Problems">
            {list.map((p, i) => (
              <button
                key={p.problem}
                type="button"
                role="option"
                aria-selected={selected === i}
                className={`indx-selector-item${selected === i ? " on" : ""}`}
                onClick={() => pick(i)}
              >
                {p.problem}
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          <div className="indx-selector-panel" aria-live="polite">
            {active ? (
              <>
                <p className="indx-selector-kicker">Suggested direction</p>
                <h3>{active.solution}</h3>
                <p className="indx-selector-note">
                  For: {active.problem}. The right next step is a short conversation about your business.
                </p>
                <div className="indx-selector-actions">
                  <a className="indx-btn indx-btn-accent" href={active.href}>
                    See the solution →
                  </a>
                  <a
                    className="indx-btn indx-btn-ghost"
                    href={MEET}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("consultation_click", { industry: active.audience, section: "problem_selector", cta_label: "Discuss This Solution" })}
                  >
                    Discuss This Solution →
                  </a>
                </div>
              </>
            ) : (
              <>
                <p className="indx-selector-kicker">Suggested direction</p>
                <h3>Pick a problem to see where to look first</h3>
                <p className="indx-selector-note">
                  Choose one of the {audience === "retreat" ? "retreat" : "corporate offsite"} problems on the
                  left and we’ll show the matching solution area.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="indx-faq">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`indx-faq-item${isOpen ? " on" : ""}`}>
            <h3>
              <button
                type="button"
                className="indx-faq-btn"
                aria-expanded={isOpen}
                aria-controls={`indx-faq-a-${i}`}
                id={`indx-faq-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="indx-faq-n">{String(i + 1).padStart(2, "0")}</span>
                <span>{f.q}</span>
                <span className="indx-faq-plus" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`indx-faq-a-${i}`}
                  role="region"
                  aria-labelledby={`indx-faq-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="indx-faq-a">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function ProcessTimeline() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.85", "end 0.6"] });
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // Height animation is 280ms; check once the layout has settled.
    const t = window.setTimeout(() => nudgeHeadingClear("indx-process-h"), 320);
    return () => window.clearTimeout(t);
  }, [open ]);
  return (
    <div className="indx-process-wrap">
      <div className="indx-process-rail" aria-hidden="true">
        <motion.div className="indx-process-progress" style={{ scaleY: reduce ? 1 : scrollYProgress }} />
      </div>
      <ol className="indx-process" ref={listRef}>
        {PROCESS.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.title} className={`indx-process-step${isOpen ? " on" : ""}`}>
              <button
                type="button"
                className="indx-process-btn"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="indx-process-n">{s.n}</span>
                <span className="indx-process-title">{s.title}</span>
                <span className="indx-process-plus" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="indx-process-body">{s.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------------- Main page ---------------- */

export default function IndustriesPreview() {
  const [audience, setAudience] = useState<"retreat" | "corporate" | null>(null);

  useEffect(() => {
    track("industries_view", { page_path: "/industries-preview" });
  }, []);

  const selectAudience = (a: "retreat" | "corporate") => {
    setAudience(a);
    track("industry_select", { industry: a });
  };

  return (
    <div className="indx">
      {/* 01 — Hero */}
      <section className="indx-hero" aria-labelledby="indx-h1">
        <div className="indx-wrap indx-hero-grid">
          <BlurReveal className="indx-hero-copy">
            <Kicker>Industry Solutions / Retreats &amp; Corporate Offsites</Kicker>
            <h1 id="indx-h1">
              Exceptional Experiences. <em>Better Business Systems.</em>
            </h1>
            <p className="indx-lede">
              Behind every great retreat or offsite is a business that has to attract the right people and
              manage the details. We bring marketing, websites, booking, CRM and automation together — so the
              business behind the experience runs as one system.
            </p>
            <div className="indx-hero-ctas">
              <a
                className="indx-btn indx-btn-accent"
                href="#specialisations"
                onClick={() => track("consultation_click", { industry: "all", section: "hero", cta_label: "Explore Solutions for Your Business" })}
              >
                Explore Solutions for Your Business ↓
              </a>
              <a
                className="indx-btn indx-btn-ghost"
                href={MEET}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("consultation_click", { industry: "all", section: "hero", cta_label: "Book a Free Strategy Consultation" })}
              >
                Book a Free Strategy Consultation →
              </a>
            </div>
            <p className="indx-hero-prompt">What kind of experience business do you run?</p>
            <div className="indx-hero-selector" role="group" aria-label="Choose your business type">
              <a
                className={`indx-hero-choice${audience === "retreat" ? " on" : ""}`}
                href="#retreat-operators"
                onClick={() => selectAudience("retreat")}
              >
                <span className="indx-hero-choice-k">01</span>
                <span className="indx-hero-choice-t">Retreats &amp; Wellness Experiences</span>
                <span className="indx-hero-choice-a" aria-hidden="true">↓</span>
              </a>
              <a
                className={`indx-hero-choice${audience === "corporate" ? " on" : ""}`}
                href="#corporate-offsites"
                onClick={() => selectAudience("corporate")}
              >
                <span className="indx-hero-choice-k">02</span>
                <span className="indx-hero-choice-t">Corporate Offsites &amp; Team Retreats</span>
                <span className="indx-hero-choice-a" aria-hidden="true">↓</span>
              </a>
            </div>
          </BlurReveal>
          <BlurReveal className="indx-hero-media" delay={0.1}>
            <span className="indx-hero-ring" aria-hidden="true" />
            <figure className="indx-hero-fig indx-hero-fig-main">
              <Image src={IMG.heroRetreat} alt="A misty mountain valley at sunrise — illustrative imagery, not a DigitalFalconz client" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
              <figcaption>Retreat landscape — illustrative imagery</figcaption>
            </figure>
            <figure className="indx-hero-fig indx-hero-fig-over">
              <Image src={IMG.heroCorp} alt="A corporate team laughing over laptops — illustrative imagery, not a DigitalFalconz client" fill sizes="(max-width: 900px) 60vw, 22vw" />
              <figcaption>Corporate team offsite — illustrative imagery</figcaption>
            </figure>
          </BlurReveal>
        </div>
      </section>

      {/* 02 — Two specialisations */}
      <section className="indx-section" id="specialisations" aria-labelledby="indx-spec-h">
        <div className="indx-wrap">
          <BlurReveal>
            <Kicker>Two Specialisations. One Connected Approach.</Kicker>
            <h2 id="indx-spec-h">Built Around How Your Business Actually Works.</h2>
            <p className="indx-lede">
              A retreat selling individual places and a corporate company pitching an executive offsite work
              differently. Their audiences, decisions and booking processes aren’t the same — so our approach
              starts with the business model, not a package.
            </p>
          </BlurReveal>
          <div className="indx-cards">
            <BlurReveal>
              <a
                className="indx-card"
                href="#retreat-operators"
                onClick={() => selectAudience("retreat")}
              >
                <span className="indx-card-img">
                  <Image src={IMG.cardRetreat} alt="A yoga session at sunrise — illustrative imagery of the retreat industry" fill sizes="(max-width: 900px) 100vw, 50vw" />
                </span>
                <span className="indx-card-body">
                  <span className="indx-card-k">01 · Retreats</span>
                  <span className="indx-card-t">Retreat Operators &amp; Organisers</span>
                  <span className="indx-card-p">
                    For yoga, wellness, meditation, fitness, transformational and destination retreat businesses.
                  </span>
                  <span className="indx-card-f">
                    <strong>Focus</strong> Guest acquisition, bookings, rooms, deposits — and repeat guests.
                  </span>
                  <span className="indx-card-cta">Explore Retreat Solutions →</span>
                </span>
              </a>
            </BlurReveal>
            <BlurReveal delay={0.08}>
              <a
                className="indx-card"
                href="#corporate-offsites"
                onClick={() => selectAudience("corporate")}
              >
                <span className="indx-card-img">
                  <Image src={IMG.cardCorp} alt="A corporate team working together — illustrative imagery of the corporate offsite industry" fill sizes="(max-width: 900px) 100vw, 50vw" />
                </span>
                <span className="indx-card-body">
                  <span className="indx-card-k">02 · Corporate</span>
                  <span className="indx-card-t">Corporate Offsite Planners</span>
                  <span className="indx-card-p">
                    For companies organising leadership retreats, employee offsites, team-building experiences
                    and company gatherings.
                  </span>
                  <span className="indx-card-f">
                    <strong>Focus</strong> Enquiries, qualification, proposals and event workflows.
                  </span>
                  <span className="indx-card-cta">Explore Corporate Offsite Solutions →</span>
                </span>
              </a>
            </BlurReveal>
          </div>
          <ConnectedFlow />
        </div>
      </section>

      {/* 03 — Retreat intro */}
      <section className="indx-section indx-section-alt" id="retreat-operators" aria-labelledby="indx-retreat-h">
        <div className="indx-wrap indx-split">
          <BlurReveal className="indx-split-copy">
            <Kicker>For Retreat Owners, Hosts &amp; Wellness Operators</Kicker>
            <h2 id="indx-retreat-h">Create Transformative Experiences. Simplify Everything Behind Them.</h2>
            <p>
              Your attention belongs with your guests — not booking emails, spreadsheets or payment chases. We
              connect your website, guest acquisition and booking operations, from first visit to final
              confirmation.
            </p>
            <div className="indx-ctas">
              <a
                className="indx-btn indx-btn-accent"
                href={MEET}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("consultation_click", { industry: "retreat", section: "retreat_intro", cta_label: "Discuss Your Retreat Business" })}
              >
                Discuss Your Retreat Business →
              </a>
              <a className="indx-btn indx-btn-ghost" href="#retreat-demo">
                Explore Booking Solutions ↓
              </a>
            </div>
          </BlurReveal>
          <BlurReveal className="indx-split-media" delay={0.08}>
            <figure className="indx-fig">
              <Image src={IMG.storyRetreat} alt="A houseboat on the Kerala backwaters at golden hour — illustrative imagery of a retreat destination" fill sizes="(max-width: 900px) 100vw, 46vw" />
              <figcaption>Retreat destination — illustrative imagery</figcaption>
            </figure>
          </BlurReveal>
        </div>
      </section>

      {/* 04 — Retreat challenges */}
      <section className="indx-section" aria-labelledby="indx-rchal-h">
        <div className="indx-wrap">
          <BlurReveal>
            <Kicker>Understanding the Business Behind the Experience</Kicker>
            <h2 id="indx-rchal-h">When the Booking Process Gets Complicated, Growth Gets Harder.</h2>
            <p className="indx-lede">
              Click a challenge to see its solution. The answer isn’t always a new system — sometimes it’s a
              better website, a smarter integration, or a more connected workflow.
            </p>
          </BlurReveal>
          <ChallengeGrid items={RETREAT_CHALLENGES} id="retreat-challenges" />
        </div>
      </section>

      {/* 05 — Retreat solutions */}
      <section className="indx-section indx-section-alt" id="retreat-solutions" aria-labelledby="indx-rsol-h">
        <div className="indx-wrap">
          <BlurReveal>
            <Kicker>Connected Retreat Growth &amp; Operations</Kicker>
            <h2 id="indx-rsol-h">From First Discovery to a Confident Booking.</h2>
          </BlurReveal>
          <SolutionList items={RETREAT_SOLUTIONS} icons={RETREAT_SOLUTION_ICONS} />
          <BlurReveal className="indx-section-cta">
            <a className="indx-btn indx-btn-accent" href="#retreat-demo">
              Explore a Connected Retreat Solution ↓
            </a>
          </BlurReveal>
        </div>
      </section>

      {/* 06 — Retreat demo */}
      <section className="indx-section" id="retreat-demo" aria-labelledby="indx-rdemo-h">
        <div className="indx-wrap">
          <BlurReveal>
            <Kicker>Experience the Difference</Kicker>
            <h2 id="indx-rdemo-h">See How a More Connected Retreat Journey Could Work.</h2>
            <p className="indx-lede">
              An illustrative booking flow — programme to deposit. All sample data.
            </p>
          </BlurReveal>
          <ol className="indx-flow">
            {[
              "1. Choose a Retreat",
              "2. Select Accommodation",
              "3. Review Booking Details",
              "4. Confirm the Reservation",
              "5. Manage the Guest Journey",
            ].map((t) => (
              <li key={t}>
                <strong>{t}</strong>
              </li>
            ))}
          </ol>
          <RetreatDemo />
        </div>
      </section>

      <Band
        src={IMG.bandLake}
        alt="A wooden boat on a turquoise mountain lake — illustrative imagery"
        caption="The journey from first enquiry to confirmed booking — illustrative imagery"
      />

      {/* 07 — Corporate intro */}
      <section className="indx-section indx-section-alt" id="corporate-offsites" aria-labelledby="indx-corp-h">
        <div className="indx-wrap indx-split indx-split-rev">
          <BlurReveal className="indx-split-copy">
            <Kicker>For Corporate Retreat &amp; Offsite Planning Companies</Kicker>
            <h2 id="indx-corp-h">Win the Brief. Simplify the Planning. Deliver the Experience.</h2>
            <p>
              Great offsites need more than a good venue — client requirements, proposals, budgets, suppliers,
              attendees. We connect lead generation, sales, websites and automation, so your team plans events
              instead of chasing systems.
            </p>
            <div className="indx-ctas">
              <a
                className="indx-btn indx-btn-accent"
                href={MEET}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("consultation_click", { industry: "corporate", section: "corporate_intro", cta_label: "Discuss Your Corporate Growth Strategy" })}
              >
                Discuss Your Corporate Growth Strategy →
              </a>
              <a className="indx-btn indx-btn-ghost" href="#corporate-demo">
                Explore Sales &amp; Planning Automation ↓
              </a>
            </div>
          </BlurReveal>
          <BlurReveal className="indx-split-media" delay={0.08}>
            <figure className="indx-fig">
              <Image src={IMG.storyCorp} alt="A corporate team in a meeting — illustrative imagery of a B2B planning session" fill sizes="(max-width: 900px) 100vw, 46vw" />
              <figcaption>Corporate planning — illustrative imagery</figcaption>
            </figure>
          </BlurReveal>
        </div>
      </section>

      {/* 08 — Corporate challenges */}
      <section className="indx-section" aria-labelledby="indx-cchal-h">
        <div className="indx-wrap">
          <BlurReveal>
            <Kicker>The Complexity Behind Every Corporate Event</Kicker>
            <h2 id="indx-cchal-h">More Than Event Planning. A Complex B2B Sales Journey.</h2>
            <p className="indx-lede">
              Click a challenge to see its solution. We connect the systems behind your sales process — first
              enquiry to event delivery.
            </p>
          </BlurReveal>
          <ChallengeGrid items={CORP_CHALLENGES} id="corporate-challenges" />
        </div>
      </section>

      {/* 09 — Corporate solutions */}
      <section className="indx-section indx-section-alt" id="corporate-solutions" aria-labelledby="indx-csol-h">
        <div className="indx-wrap">
          <BlurReveal>
            <Kicker>Technology for a More Connected Event Business</Kicker>
            <h2 id="indx-csol-h">From Corporate Enquiry to Confirmed Engagement.</h2>
          </BlurReveal>
          <SolutionList items={CORP_SOLUTIONS} icons={CORP_SOLUTION_ICONS} />
          <BlurReveal className="indx-section-cta">
            <a className="indx-btn indx-btn-accent" href="#corporate-demo">
              Explore Corporate Offsite Solutions ↓
            </a>
          </BlurReveal>
        </div>
      </section>

      {/* 10 — Corporate demo */}
      <section className="indx-section" id="corporate-demo" aria-labelledby="indx-cdemo-h">
        <div className="indx-wrap">
          <BlurReveal>
            <Kicker>From Brief to Business</Kicker>
            <h2 id="indx-cdemo-h">Explore a More Connected Corporate Sales Workflow.</h2>
            <p className="indx-lede">
              How a corporate enquiry moves through a structured sales process.
            </p>
          </BlurReveal>
          <ol className="indx-flow">
            {[
              "1. Capture the Brief",
              "2. Qualify the Opportunity",
              "3. Prepare the Proposal",
              "4. Manage the Decision",
              "5. Coordinate Delivery",
            ].map((t) => (
              <li key={t}>
                <strong>{t}</strong>
              </li>
            ))}
          </ol>
          <CorporateDemo />
        </div>
      </section>

      {/* Problem-to-solution selector */}
      <ProblemSelector />

      {/* Visual showcase strip */}
      <Showcase />

      {/* 11 — Why DigitalFalconz */}
      <section className="indx-section" id="why" aria-labelledby="indx-why-h">
        <div className="indx-wrap">
          <BlurReveal>
            <Kicker>Strategy. Technology. Execution.</Kicker>
            <h2 id="indx-why-h">One Partner for the Systems Behind Better Experiences.</h2>
          </BlurReveal>
          <div className="indx-why-grid">
            {WHY.map((w, i) => (
              <BlurReveal key={w.title} delay={Math.min(i * 0.05, 0.2)}>
                <article className="indx-why-card">
                  <span className="indx-icon indx-why-icon" aria-hidden="true">
                    <Icon name={WHY_ICONS[i] ?? "compass"} />
                  </span>
                  <span className="indx-why-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </article>
              </BlurReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — Process */}
      <section className="indx-section indx-section-alt" id="process" aria-labelledby="indx-process-h">
        <div className="indx-wrap">
          <BlurReveal>
            <Kicker>How We Work</Kicker>
            <h2 id="indx-process-h">Understand the Business. Connect the Right Solutions.</h2>
            <p className="indx-lede">Five steps, first conversation to ongoing improvement.</p>
          </BlurReveal>
          <ProcessTimeline />
        </div>
      </section>

      {/* 13 — FAQ */}
      <section className="indx-section" id="faq" aria-labelledby="indx-faq-h">
        <div className="indx-wrap indx-faq-wrap">
          <BlurReveal>
            <h2 id="indx-faq-h">Frequently Asked Questions</h2>
          </BlurReveal>
          <FaqAccordion />
        </div>
      </section>

      <Band
        src={IMG.bandOffice}
        alt="A modern office interior — illustrative imagery"
        caption="Where the planning happens — illustrative imagery"
      />

      {/* 14 — Final consultation CTA */}
      <section className="indx-cta" id="consultation" aria-labelledby="indx-cta-h">
        <div className="indx-cta-bg" aria-hidden="true">
          <Image src={IMG.ctaBg} alt="" fill sizes="100vw" />
        </div>
        <div className="indx-wrap indx-cta-inner">
          <BlurReveal>
            <Kicker>Built Around Your Business</Kicker>
            <h2 id="indx-cta-h">You Create the Experience. Let’s Build What Supports It.</h2>
            <p className="indx-lede">
              Whether you’re filling your next retreat or planning your next offsite, the right systems make
              growth and operations more connected. Tell us where you are — and where you’re heading.
            </p>
            <div className="indx-ctas">
              <a
                className="indx-btn indx-btn-accent"
                href={MEET}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("consultation_click", { industry: "all", section: "consultation", cta_label: "Book a Free 30-Minute Strategy Consultation" })}
              >
                Book a Free 30-Minute Strategy Consultation →
              </a>
              <Link
                className="indx-btn indx-btn-ghost"
                href="/contact"
                onClick={() => track("contact_click", { section: "consultation" })}
              >
                Tell Us About Your Project →
              </Link>
            </div>
            <p className="indx-contact">
              <a href="mailto:contact@digitalfalconz.com">contact@digitalfalconz.com</a>
              <span aria-hidden="true">·</span>
              <a href="tel:+447988594240">UK +44 7988 594240</a>
              <span aria-hidden="true">·</span>
              <a href="tel:+19296524894">US +1 929 652 4894</a>
            </p>
            <p className="indx-signoff">DigitalFalconz — Growth, engineered.</p>
          </BlurReveal>
        </div>
      </section>
    </div>
  );
}
