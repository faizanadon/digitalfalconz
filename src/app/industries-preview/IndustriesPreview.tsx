"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const MEET = "https://meet.digitalfalconz.com/";
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Verified Unsplash imagery (all return HTTP 200). Illustrative only — never
   presented as DigitalFalconz client photography. */
const IMG = {
  heroRetreat: u("1540541338287-41700207dee6", 1600),
  heroCorp: u("1552664730-d307ca884978", 1600),
  cardRetreat: u("1544367567-0f2fcb009e0b", 1200),
  cardCorp: u("1522071820081-009f0129c71c", 1200),
  storyRetreat: u("1602216056096-3b40cc0c9944", 1400),
  storyCorp: u("1556761175-b413da4baf72", 1400),
  demoRetreat: u("1571896349842-33c89424de2d", 1200),
  demoCorp: u("1553877522-43269d4ea984", 1200),
  ctaBg: u("1506905925346-21bda4d32df4", 1800),
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

/* ---------------- Data (copy verbatim from the developer brief) ---------------- */

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
      "Distinct pages for individual retreats and programmes.",
      "Accommodation options, itineraries and pricing presentation.",
      "Mobile-first booking and enquiry journeys.",
      "Integrated registration or booking functionality.",
      "Search-friendly content structure and analytics.",
    ],
    outcome:
      "Make it easier for prospective guests to discover, understand and enquire about your retreats.",
    href: "/services/website-design-development",
    linkLabel: "Website design & development",
  },
  {
    n: "02",
    title: "Custom Retreat Booking & Reservation Systems",
    intro: "The right booking experience, built around your actual availability rules.",
    bullets: [
      "Retreat-specific booking dates and capacity.",
      "Single, twin and shared accommodation options.",
      "Room availability and occupancy rules.",
      "Deposits, instalments and balance reminders.",
      "Waitlists, cancellations and approved overflow arrangements.",
      "Booking confirmations and administrative controls.",
    ],
    outcome:
      "A booking process designed to reduce manual coordination and avoid preventable booking errors.",
    href: "/services/custom-software-development",
    linkLabel: "Custom software development",
  },
  {
    n: "03",
    title: "Retreat Marketing & Guest Acquisition",
    intro: "Reach the people most likely to value your experience.",
    bullets: [
      "Google and Meta advertising.",
      "Retreat-specific landing pages.",
      "SEO and AI search discoverability.",
      "Campaign strategy for upcoming retreat dates.",
      "Retargeting and enquiry follow-up.",
      "Performance tracking and optimisation.",
    ],
    outcome:
      "Build a more structured path from discovering a retreat to making an enquiry or booking.",
    href: "/services/lead-generation",
    linkLabel: "Lead generation",
  },
  {
    n: "04",
    title: "Guest CRM & Communication Automation",
    intro: "Keep the personal touch. Reduce repetitive work.",
    bullets: [
      "Enquiry and booking records.",
      "Confirmation and preparation emails.",
      "Payment and balance reminders.",
      "Guest information and preference collection.",
      "Post-retreat feedback and follow-up.",
      "Past-guest re-engagement campaigns.",
    ],
    outcome:
      "Support a more consistent guest journey while preserving genuine human relationships.",
    href: "/services/crm-implementation",
    linkLabel: "CRM implementation",
  },
  {
    n: "05",
    title: "AI Assistants & Workflow Integrations",
    intro: "Give routine questions a faster path to answers.",
    bullets: [
      "Assist with common enquiries about retreat dates, accommodation, programme details and booking steps.",
      "Connect structured enquiries to approved booking and CRM workflows.",
      "Escalate sensitive, unusual or decision-dependent questions to a person.",
      "Use human-reviewed knowledge sources and privacy-appropriate handling.",
    ],
    outcome:
      "Improve responsiveness without replacing the human care behind the retreat experience.",
    href: "/services/ai-chatbots",
    linkLabel: "AI chatbots",
  },
  {
    n: "06",
    title: "Retreat Branding, Content & Creative",
    intro: "Make the experience compelling before the guest arrives.",
    bullets: [
      "Brand direction and graphic design.",
      "Promotional video editing and motion content.",
      "Social media creative and digital brochures.",
      "Advertising creative, email visuals and campaign assets.",
    ],
    outcome:
      "Present a distinctive and consistent experience across the guest journey.",
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
      "Google Search and LinkedIn advertising.",
      "B2B landing pages and enquiry forms.",
      "Corporate retreat and team-offsite SEO.",
      "Audience and campaign strategy.",
      "Lead qualification and CRM integration.",
      "Marketing attribution and reporting.",
    ],
    outcome: "Build a more measurable pipeline of relevant corporate enquiries.",
    href: "/services/lead-generation",
    linkLabel: "Lead generation",
  },
  {
    n: "02",
    title: "Premium Corporate Websites & Proposal Experiences",
    intro: "Make a stronger impression before the first sales conversation.",
    bullets: [
      "Corporate offsite service pages.",
      "Destination and experience showcases.",
      "Case-study and portfolio experiences.",
      "Conversion-focused enquiry forms.",
      "Personalised proposal landing pages.",
      "Interactive presentations and client-facing resources.",
    ],
    outcome: "Give prospective corporate clients a clear reason to start a conversation.",
    href: "/services/website-design-development",
    linkLabel: "Website design & development",
  },
  {
    n: "03",
    title: "CRM & Corporate Sales Pipeline Automation",
    intro: "Keep every opportunity moving with greater clarity.",
    bullets: [
      "Enquiry capture and lead routing.",
      "Qualification by headcount, budget, dates and location.",
      "Opportunity stages and pipeline visibility.",
      "Follow-up tasks and reminders.",
      "Proposal status tracking.",
      "Reporting across enquiries and closed engagements.",
    ],
    outcome: "Support more organised and consistent sales execution.",
    href: "/services/crm-implementation",
    linkLabel: "CRM implementation",
  },
  {
    n: "04",
    title: "Proposal & Quotation Workflow Automation",
    intro: "Spend less time assembling documents. More time winning the right projects.",
    bullets: [
      "Standardised discovery forms.",
      "Reusable proposal sections.",
      "Draft itinerary and budget templates.",
      "Internal review and approval stages.",
      "Client-facing proposal documents or pages.",
      "Follow-up and status notifications.",
    ],
    outcome:
      "A more efficient, professional process from brief to proposal. All commercial details remain subject to human review and approval before being sent.",
    href: "/services/sales-marketing-automation",
    linkLabel: "Sales & marketing automation",
  },
  {
    n: "05",
    title: "Event Operations & Client Portals",
    intro: "Connect planning information in one place.",
    bullets: [
      "Project timelines and task ownership.",
      "Venue and supplier information.",
      "Client document sharing.",
      "Attendee and preference collection.",
      "Budget and milestone tracking.",
      "Event updates and communication workflows.",
    ],
    outcome: "Improve visibility across active events and reduce avoidable coordination gaps.",
    href: "/services/custom-software-development",
    linkLabel: "Custom software development",
  },
  {
    n: "06",
    title: "Branding, Design & Corporate Event Creative",
    intro: "Make every client interaction feel considered.",
    bullets: [
      "Pitch presentations and proposal design.",
      "Event identity and marketing collateral.",
      "Event landing pages and video production.",
      "Motion graphics and professional creative assets.",
    ],
    outcome: "Support polished and consistent event communication.",
    href: "/services/branding-identity",
    linkLabel: "Branding & identity",
  },
];

type Challenge = { title: string; body: string; solution: string; solutionHref: string };

const RETREAT_CHALLENGES: Challenge[] = [
  {
    title: "Your Website Inspires Interest, but Booking Feels Difficult",
    body: "Visitors explore your retreats, but programme details, accommodation choices or booking steps may not be clear enough to help them confidently reserve a place.",
    solution: "01 — Retreat Website Design & Development",
    solutionHref: "#retreat-solutions",
  },
  {
    title: "Room Availability Lives in Spreadsheets",
    body: "Single and shared rooms, changing occupancy, capacity limits and last-minute changes can make availability difficult to manage.",
    solution: "02 — Custom Retreat Booking & Reservation Systems",
    solutionHref: "#retreat-solutions",
  },
  {
    title: "Deposits and Guest Records Need Manual Attention",
    body: "Payments, retreat selection, remaining balances and guest information may be tracked across several tools.",
    solution: "04 — Guest CRM & Communication Automation",
    solutionHref: "#retreat-solutions",
  },
  {
    title: "Enquiries Don’t Always Become Bookings",
    body: "Potential guests ask questions, consider their options and sometimes disappear without a structured follow-up process.",
    solution: "03 — Retreat Marketing & Guest Acquisition",
    solutionHref: "#retreat-solutions",
  },
  {
    title: "Every Retreat Launch Starts From Scratch",
    body: "Promotional campaigns, guest communications and operational preparation can consume more time than they should.",
    solution: "03 — Retreat Marketing & Guest Acquisition",
    solutionHref: "#retreat-solutions",
  },
];

const CORP_CHALLENGES: Challenge[] = [
  {
    title: "Qualified Corporate Enquiries Are Difficult to Generate Consistently",
    body: "Finding companies actively planning leadership retreats, team offsites or employee experiences requires a focused B2B acquisition strategy.",
    solution: "01 — Corporate Lead Generation & Demand Creation",
    solutionHref: "#corporate-solutions",
  },
  {
    title: "Every Client Brief Comes With Different Requirements",
    body: "Team size, objectives, destinations, dates, budgets and venue preferences all influence the proposal.",
    solution: "04 — Proposal & Quotation Workflow Automation",
    solutionHref: "#corporate-solutions",
  },
  {
    title: "Proposals Take Time to Prepare",
    body: "When information is scattered across documents and suppliers, creating accurate, tailored proposals becomes unnecessarily labour-intensive.",
    solution: "04 — Proposal & Quotation Workflow Automation",
    solutionHref: "#corporate-solutions",
  },
  {
    title: "Opportunities Can Stall Between Enquiry and Approval",
    body: "Corporate purchasing may involve HR, executive assistants, procurement teams and senior decision-makers. Without an organised follow-up process, valuable opportunities can lose momentum.",
    solution: "03 — CRM & Corporate Sales Pipeline Automation",
    solutionHref: "#corporate-solutions",
  },
  {
    title: "Operations Become More Complex as Projects Increase",
    body: "Guest lists, venue information, timelines, supplier details and client updates need to remain coordinated as the business grows.",
    solution: "05 — Event Operations & Client Portals",
    solutionHref: "#corporate-solutions",
  },
];

const WHY = [
  {
    title: "Industry-Relevant Thinking",
    body: "We start by understanding how your business sells, books and delivers its experiences.",
  },
  {
    title: "Connected Capabilities",
    body: "Our approach brings together growth marketing, websites, CRM, software and AI where they genuinely add value.",
  },
  {
    title: "Practical Technology Decisions",
    body: "We evaluate whether to optimise your existing platforms, integrate appropriate tools or build custom functionality.",
  },
  {
    title: "Human-Centred Automation",
    body: "Automation should support your team and your customers—not create unnecessary friction or remove important human oversight.",
  },
  {
    title: "Designed for Long-Term Use",
    body: "We consider usability, maintainability, integrations and future improvements as part of the project planning process.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Discover",
    body: "We map the current customer journey, operational workflow, technology and key challenges.",
  },
  {
    n: "02",
    title: "Define",
    body: "We identify the highest-priority improvements and recommend the appropriate implementation approach.",
  },
  {
    n: "03",
    title: "Design & Build",
    body: "We create the agreed digital experience, marketing system, integration or software solution.",
  },
  {
    n: "04",
    title: "Connect & Validate",
    body: "We test relevant workflows, customer interactions, data flows and business rules before launch.",
  },
  {
    n: "05",
    title: "Support & Improve",
    body: "Where ongoing support is agreed, we monitor performance, resolve issues and identify opportunities for improvement.",
  },
];

const FAQS = [
  {
    q: "Do you work with independent retreat organisers or only established centres?",
    a: "We can support both independent organisers and established retreat businesses. The approach depends on your booking requirements, budget, current technology and operational complexity.",
  },
  {
    q: "Can you improve our existing retreat booking system instead of replacing it?",
    a: "Yes, where the platform supports the required improvements. We first assess the existing system and its integration options before recommending custom development.",
  },
  {
    q: "Can you build booking workflows for different room types and deposit rules?",
    a: "These requirements can be considered during technical discovery. We would define and test the specific room allocation, pricing, availability and payment rules before implementation.",
  },
  {
    q: "Do you provide marketing as well as booking or CRM technology?",
    a: "Yes. Depending on your requirements, we can combine marketing, websites, lead generation, CRM and automation into a connected project.",
  },
  {
    q: "Can you help our corporate offsite company attract more B2B clients?",
    a: "We can develop acquisition strategies using appropriate channels such as Google Search, LinkedIn, SEO, landing pages and CRM-connected lead generation. Performance depends on your market, offer, budget and sales process.",
  },
  {
    q: "Can you integrate our existing event planning and sales tools?",
    a: "Many systems support integrations through APIs, webhooks or approved automation platforms. Feasibility depends on your current software and required workflows.",
  },
  {
    q: "Do we need a custom application?",
    a: "Not necessarily. We may recommend improving existing tools or using established software if that offers a better balance of capability, cost and maintenance.",
  },
  {
    q: "What happens after an initial consultation?",
    a: "We review your requirements and, where appropriate, recommend a discovery assessment, scoped proposal or implementation roadmap. There’s no obligation to proceed.",
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
  },
  {
    name: "Coastal Breathwork Weekend",
    days: 3,
    nights: 2,
    price: 350,
    dates: ["19–21 Mar 2027", "16–18 Apr 2027"],
  },
  {
    name: "Mountain Mindfulness Week",
    days: 7,
    nights: 6,
    price: 890,
    dates: ["3–9 May 2027", "14–20 Jun 2027"],
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
            A sample booking flow. Every selection below updates the sample availability, deposit and
            summary in real time. All programmes, rooms and prices are fictional samples.
          </p>
        </div>
        <div className="indx-demo-img">
          <Image src={IMG.demoRetreat} alt="A retreat pool at golden hour — illustrative imagery" fill sizes="(max-width: 900px) 100vw, 340px" />
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
                  <p className="indx-demo-note">Room choices for {programme.name} on {date}. Availability is sample data.</p>
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
                  <p className="indx-demo-note">Check the sample selection, total price, deposit requirements and policies.</p>
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
                    In a live system this step would record the booking and payment status, update availability and
                    trigger the confirmation workflow. This is a sample — no payment is taken and nothing is booked.
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
      ["Contact", "Alex Morgan — Head of People (sample)"],
      ["Group size", "24 people (sample)"],
      ["Destination", "Lake District (sample)"],
      ["Dates", "12–14 March 2027 (sample)"],
      ["Budget", "£18,000–£24,000, indicative (sample)"],
    ],
    tasks: [
      "Log the enquiry in the CRM (sample)",
      "Send an acknowledgement within the hour (sample)",
      "Assign an owner and a follow-up date (sample)",
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
      "Map the decision process and approvers (sample)",
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
      "Track approval and send the contract (sample)",
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
      "Collect attendee details and preferences (sample)",
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
            A sample enquiry moving through a structured sales process. Click a stage to see the brief data,
            tasks, output and next actions. All company details are fictional.
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

function SolutionList({ items }: { items: Solution[] }) {
  return (
    <div className="indx-solutions">
      {items.map((s, i) => (
        <BlurReveal key={s.title} delay={Math.min(i * 0.05, 0.2)}>
          <article className="indx-solution">
            <div className="indx-solution-head">
              <span className="indx-solution-n">{s.n}</span>
              <h3>{s.title}</h3>
            </div>
            <p className="indx-solution-intro">{s.intro}</p>
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
          </article>
        </BlurReveal>
      ))}
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
  };

  return (
    <section className="indx-section" id="find-your-solution" aria-labelledby="indx-selector-h">
      <div className="indx-wrap">
        <BlurReveal>
          <Kicker>Where to start</Kicker>
          <h2 id="indx-selector-h">Where is your business losing momentum?</h2>
          <p className="indx-lede">
            Pick the problem that sounds most familiar. We’ll point you to the relevant solution — a starting
            point for a conversation, not a diagnosis or a guaranteed outcome.
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
                  For: {active.problem}. This points to the relevant service area — the right next step is a
                  short conversation about your business.
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
  return (
    <ol className="indx-process">
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
              Behind every successful retreat or corporate offsite is a business that needs to attract the right
              people, manage complex details and deliver an experience worth remembering. We bring growth
              marketing, websites, booking technology, CRM and intelligent automation together to help retreat
              operators and corporate offsite planners build more connected, efficient businesses. Your expertise
              creates the experience. Our technology helps power the business behind it.
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
            <figure className="indx-hero-fig">
              <Image src={IMG.heroRetreat} alt="A retreat resort pool at golden hour — illustrative imagery, not a DigitalFalconz client" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
              <figcaption>Retreat landscape — illustrative imagery</figcaption>
            </figure>
            <figure className="indx-hero-fig indx-hero-fig-b">
              <Image src={IMG.heroCorp} alt="A corporate team in a workshop session — illustrative imagery, not a DigitalFalconz client" fill sizes="(max-width: 900px) 100vw, 46vw" />
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
              A wellness retreat selling individual places and a corporate offsite company pitching an executive
              retreat operate differently. Their audiences, purchasing decisions, booking processes and
              operational requirements are not the same. That’s why our approach starts with the business
              model—not a predefined package.
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
                    <strong>Focus</strong> Guest acquisition, programme bookings, room availability, deposits,
                    guest communications and repeat bookings.
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
                    <strong>Focus</strong> Corporate enquiries, lead qualification, proposals, client
                    relationships and event-planning workflows.
                  </span>
                  <span className="indx-card-cta">Explore Corporate Offsite Solutions →</span>
                </span>
              </a>
            </BlurReveal>
          </div>
        </div>
      </section>

      {/* 03 — Retreat intro */}
      <section className="indx-section indx-section-alt" id="retreat-operators" aria-labelledby="indx-retreat-h">
        <div className="indx-wrap indx-split">
          <BlurReveal className="indx-split-copy">
            <Kicker>For Retreat Owners, Hosts &amp; Wellness Operators</Kicker>
            <h2 id="indx-retreat-h">Create Transformative Experiences. Simplify Everything Behind Them.</h2>
            <p>
              Your attention belongs with your guests and the experiences you create—not endless booking emails,
              disconnected spreadsheets or manual payment follow-ups. DigitalFalconz helps retreat businesses
              build a smoother journey from the first website visit to the final booking confirmation. Whether
              you run a boutique wellness retreat, an established retreat centre or programmes across multiple
              destinations, we can help connect your digital presence, guest acquisition and booking operations.
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
              Click a challenge to see the solution it connects to. The answer isn’t always a completely new
              system. Sometimes it’s a better website, a smarter integration or a more connected workflow.
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
          <SolutionList items={RETREAT_SOLUTIONS} />
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
              Explore an illustrative retreat booking flow, from selecting a programme to choosing accommodation
              and confirming a deposit.
            </p>
          </BlurReveal>
          <ol className="indx-flow">
            {[
              ["1. Choose a Retreat", "Select the programme, preferred dates and available options."],
              ["2. Select Accommodation", "Display suitable room choices based on the selected programme and booking rules."],
              ["3. Review Booking Details", "Show the guest’s selection, total price, deposit requirements and relevant policies."],
              ["4. Confirm the Reservation", "Record the booking and payment status, update availability and trigger the appropriate confirmation workflow."],
              ["5. Manage the Guest Journey", "Keep booking details, remaining balances and guest communications organised."],
            ].map(([t, d]) => (
              <li key={t}>
                <strong>{t}</strong>
                <span>{d}</span>
              </li>
            ))}
          </ol>
          <RetreatDemo />
        </div>
      </section>

      {/* 07 — Corporate intro */}
      <section className="indx-section indx-section-alt" id="corporate-offsites" aria-labelledby="indx-corp-h">
        <div className="indx-wrap indx-split indx-split-rev">
          <BlurReveal className="indx-split-copy">
            <Kicker>For Corporate Retreat &amp; Offsite Planning Companies</Kicker>
            <h2 id="indx-corp-h">Win the Brief. Simplify the Planning. Deliver the Experience.</h2>
            <p>
              Planning exceptional company retreats requires more than finding an impressive venue. Behind every
              successful offsite are client requirements, proposals, budget conversations, suppliers, attendees
              and countless moving parts. DigitalFalconz helps corporate retreat and offsite planning businesses
              connect lead generation, sales workflows, websites and intelligent automation—so teams can spend
              more time building exceptional events and less time coordinating disconnected systems.
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
              Click a challenge to see the solution it connects to. We connect the marketing and operational
              systems that support your sales process—from the first qualified enquiry to event delivery.
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
          <SolutionList items={CORP_SOLUTIONS} />
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
              See how a corporate retreat enquiry could move through a structured sales process.
            </p>
          </BlurReveal>
          <ol className="indx-flow">
            {[
              ["1. Capture the Brief", "Collect company name, group size, destination preferences, expected dates and budget range."],
              ["2. Qualify the Opportunity", "Organise client requirements, decision-makers and next actions in a CRM pipeline."],
              ["3. Prepare the Proposal", "Bring selected venue options, approved pricing, service inclusions and itinerary details into a tailored proposal."],
              ["4. Manage the Decision", "Track client responses, revisions, approvals and follow-up activities."],
              ["5. Coordinate Delivery", "Connect confirmed project details with the relevant event-planning workflows."],
            ].map(([t, d]) => (
              <li key={t}>
                <strong>{t}</strong>
                <span>{d}</span>
              </li>
            ))}
          </ol>
          <CorporateDemo />
        </div>
      </section>

      {/* Problem-to-solution selector */}
      <ProblemSelector />

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
            <p className="indx-lede">Five steps, from first conversation to ongoing improvement. Click a step to read it.</p>
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
              Whether you’re filling your next retreat or planning your next corporate offsite, the right
              digital systems can help make growth and operations more connected. Tell us where your business is
              today and what you’re working towards.
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
