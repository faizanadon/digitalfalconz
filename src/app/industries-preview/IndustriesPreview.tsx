"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const MEET = "https://meet.digitalfalconz.com/";
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* Verified Unsplash imagery (all return HTTP 200; all were visually checked
   on the live preview). Illustrative only — never presented as
   DigitalFalconz client photography. */
const IMG = {
  heroRetreat: u("1470071459604-3b5ec3a7fe05", 1600),
  heroCorp: u("1522202176988-66273c2fd55f", 1200),
  beach: u("1507525428034-b723cf961d3e", 1400),
  spa: u("1544161515-4ab6ce6db874", 1200),
  lodge: u("1521737711867-e3b97375f902", 1200),
  office: u("1504384308090-c894fdcc538d", 1400),
  boat: u("1476514525535-07fb3b4ae5f1", 1600),
};

/* After an in-page interaction changes a section's height (audience tab
   swap, demo step change), the section heading can end up with its first
   line — or its eyebrow — tucked under the sticky header. The anchor offsets
   only apply when a scroll happens; these interactions don't scroll, and
   scroll anchoring doesn't compensate for a height change inside the visible
   viewport. So, once the layout has settled, check the heading wrapper: if
   it straddles the header's bottom edge, or sits just above it (fully hidden
   but nearby), nudge it back clear. The offset is a generous -120px: the
   previous -72px offset proved ~20px short on the retreat demo and ~35–40px
   short on the corporate demo in live checks, so the heading AND its eyebrow
   now land well clear of the header. If the heading is fully visible or
   already scrolled well past, do nothing. */
function nudgeHeadingClear(headingId: string) {
  const el = document.getElementById(headingId);
  if (!el) return;
  const header = document.querySelector("header.site");
  const headerBottom = header ? header.getBoundingClientRect().bottom : 52;
  const r = el.getBoundingClientRect();
  const straddles = r.top < headerBottom && r.bottom > headerBottom;
  const justAbove = r.bottom <= headerBottom && r.bottom > -400;
  if (!straddles && !justAbove) return;
  const lenis = (window as unknown as {
    __lenis?: { scrollTo: (t: HTMLElement, o: { offset: number; duration: number }) => void };
  }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -120, duration: 0.5 });
  else el.scrollIntoView(); // instant; scroll-margin-top: 120px applies
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
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  fileText: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
};

function Icon({ name, className = "indx-icon" }: { name: string; className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICON_PATHS[name]}
      </svg>
    </span>
  );
}

/* ---------------- Brief copy — verbatim ---------------- */

type AudienceKey = "retreat" | "corporate";

const RETREAT_PROBLEMS = [
  "Hard-to-book websites and manual enquiries.",
  "Room availability, deposits and guest information spread across different tools.",
  "Unfilled places and inconsistent follow-up with interested guests.",
];

const RETREAT_SOLUTIONS = [
  {
    icon: "globe",
    title: "Retreat Websites & Booking Pages",
    desc: "Showcase programmes, accommodation, pricing and mobile-friendly booking journeys.",
  },
  {
    icon: "calendar",
    title: "Booking & Deposit Workflows",
    desc: "Set up retreat-specific availability, room rules, payment status and confirmations.",
  },
  {
    icon: "megaphone",
    title: "Marketing & Guest Acquisition",
    desc: "Connect Google/Meta campaigns, SEO, landing pages and enquiry tracking.",
  },
  {
    icon: "users",
    title: "Guest CRM & Automation",
    desc: "Organise enquiries, pre-arrival messages, reminders and past-guest follow-up.",
  },
];

const CORP_PROBLEMS = [
  "Unpredictable enquiries from companies planning team experiences.",
  "Lengthy proposals built manually from scattered client and venue information.",
  "Sales follow-ups and planning updates spread across inboxes and spreadsheets.",
];

const CORP_SOLUTIONS = [
  {
    icon: "target",
    title: "B2B Lead Generation",
    desc: "Reach HR teams, executive assistants and business decision-makers through suitable search, LinkedIn and conversion campaigns.",
  },
  {
    icon: "globe",
    title: "Corporate Websites & Enquiry Pages",
    desc: "Present destinations, services and case studies with brief-capture forms.",
  },
  {
    icon: "fileText",
    title: "CRM & Proposal Automation",
    desc: "Organise leads, client requirements, approvals, follow-ups and proposal stages.",
  },
  {
    icon: "layers",
    title: "Event Workflow Integrations",
    desc: "Connect planning tasks, venue information, client records and project updates.",
  },
];

/* ---------------- Retreat demo — 4-step sample booking journey ----------------
   Sample data only: no prices, no deposit amounts, no availability counts,
   no "fully booked" room. Every option is selectable. */

const RETREAT_OPTIONS = [
  { name: "Stillwater Yoga Retreat", meta: "Sample programme · Yoga & breathwork" },
  { name: "Coastal Breathwork Weekend", meta: "Sample programme · Breathwork & rest" },
  { name: "Mountain Mindfulness Week", meta: "Sample programme · Mindfulness & walking" },
];

const ROOM_OPTIONS = [
  { name: "Single Room", meta: "Private room · Sleeps 1" },
  { name: "Twin Room", meta: "Shared room · Sleeps 2" },
  { name: "Private Suite", meta: "Private suite · Sleeps 2" },
];

const RETREAT_STEPS = [
  { label: "Select retreat", title: "Select a retreat", intro: "Choose a sample programme to begin." },
  { label: "Choose accommodation", title: "Choose accommodation", intro: "Pick a sample room type for the stay." },
  { label: "Review deposit", title: "Review deposit", intro: "Check the sample booking before confirming." },
  { label: "Confirm booking", title: "Confirm booking", intro: "A sample confirmation — no booking is made." },
];

function RetreatDemo() {
  const [step, setStep] = useState(0);
  const [retreat, setRetreat] = useState(0);
  const [room, setRoom] = useState(0);
  const reduce = useReducedMotion();
  const first = useRef(true);

  /* Demo step swaps use AnimatePresence mode="wait" (0.25s exit + 0.25s
     enter), so the layout settles at ~500ms. Nudge the demo heading clear
     of the sticky header once it has settled. */
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = window.setTimeout(() => nudgeHeadingClear("indx-rdemo-h"), 560);
    return () => window.clearTimeout(t);
  }, [step]);

  const reset = () => {
    setRetreat(0);
    setRoom(0);
    setStep(0);
  };

  const panel = (
    <>
      {step === 0 && (
        <div>
          <div className="indx-opts">
            {RETREAT_OPTIONS.map((r, i) => (
              <button
                key={r.name}
                type="button"
                className={`indx-opt${retreat === i ? " on" : ""}`}
                aria-pressed={retreat === i}
                onClick={() => setRetreat(i)}
              >
                <span className="indx-opt-name">{r.name}</span>
                <span className="indx-opt-meta">
                  {r.meta} <em>Sample</em>
                </span>
              </button>
            ))}
          </div>
          <p className="indx-note">Sample programmes shown for illustration.</p>
        </div>
      )}
      {step === 1 && (
        <div>
          <div className="indx-opts">
            {ROOM_OPTIONS.map((r, i) => (
              <button
                key={r.name}
                type="button"
                className={`indx-opt${room === i ? " on" : ""}`}
                aria-pressed={room === i}
                onClick={() => setRoom(i)}
              >
                <span className="indx-opt-name">{r.name}</span>
                <span className="indx-opt-meta">
                  {r.meta} <em>Sample</em>
                </span>
              </button>
            ))}
          </div>
          <p className="indx-note">
            Sample room types. Availability and pricing are confirmed during scoping.
          </p>
        </div>
      )}
      {step === 2 && (
        <div>
          <dl className="indx-review">
            <div>
              <dt>Retreat</dt>
              <dd>{RETREAT_OPTIONS[retreat].name}</dd>
            </div>
            <div>
              <dt>Accommodation</dt>
              <dd>{ROOM_OPTIONS[room].name}</dd>
            </div>
            <div>
              <dt>Deposit</dt>
              <dd>
                A deposit secures the booking. The amount and payment options are agreed
                during scoping — no payment is taken in this demo.
              </dd>
            </div>
          </dl>
          <p className="indx-note">
            Check the sample booking above, then continue to confirm.
          </p>
        </div>
      )}
      {step === 3 && (
        <div className="indx-confirm">
          <p className="indx-confirm-title">Sample booking confirmed</p>
          <dl className="indx-review">
            <div>
              <dt>Sample reference</dt>
              <dd>SAMPLE-RT-2026-014</dd>
            </div>
            <div>
              <dt>Retreat</dt>
              <dd>{RETREAT_OPTIONS[retreat].name}</dd>
            </div>
            <div>
              <dt>Accommodation</dt>
              <dd>{ROOM_OPTIONS[room].name}</dd>
            </div>
          </dl>
          <p className="indx-note">
            This is a simulated confirmation. No booking was made and no payment was taken.
          </p>
          <div className="indx-demo-nav">
            <button type="button" className="indx-btn indx-btn-ghost" onClick={reset}>
              Start over
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="indx-demo">
      <div className="indx-demo-head" id="indx-rdemo-h">
        <div>
          <p className="indx-demo-label">See the guest booking journey</p>
          <h3>{RETREAT_STEPS[step].title}</h3>
          <p className="indx-demo-intro">{RETREAT_STEPS[step].intro}</p>
        </div>
        <figure className="indx-demo-img">
          <Image
            src={IMG.spa}
            alt="A spa treatment with warm oil being poured on a guest's back"
            fill
            sizes="(max-width: 1100px) 520px, 340px"
            loading="lazy"
          />
          <figcaption>Illustrative imagery</figcaption>
        </figure>
      </div>

      <div
        className="indx-demo-steps"
        role="group"
        aria-label="Booking journey steps"
      >
        {RETREAT_STEPS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={`indx-demo-step${step === i ? " on" : ""}${step > i ? " done" : ""}`}
            aria-current={step === i ? "step" : undefined}
            onClick={() => setStep(i)}
          >
            <span className="indx-demo-step-n" aria-hidden="true">
              {step > i ? "✓" : `0${i + 1}`}
            </span>
            {s.label}
          </button>
        ))}
      </div>

      {reduce ? (
        <div className="indx-demo-panel">{panel}</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="indx-demo-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {panel}
          </motion.div>
        </AnimatePresence>
      )}

      {step < 3 && (
        <div className="indx-demo-nav">
          {step > 0 && (
            <button
              type="button"
              className="indx-btn indx-btn-ghost"
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            className="indx-btn indx-btn-accent"
            onClick={() => setStep(step + 1)}
          >
            Continue →
          </button>
        </div>
      )}

      <p className="indx-demo-disclaimer">
        This is a simulated experience using sample data. Actual booking logic,
        integrations and payment options are scoped to each client.
      </p>
      <div className="indx-demo-cta">
        <a className="indx-btn indx-btn-accent" href={MEET} target="_blank" rel="noreferrer">
          Discuss My Retreat Booking Process
        </a>
      </div>
    </div>
  );
}

/* ---------------- Corporate demo — 4-step sample enquiry workflow ----------------
   Sample data only: a clearly fictional company/brief, no budgets, no prices,
   no client results. The human-review gate is explicit. */

const CORP_STEPS = [
  { label: "Capture brief", title: "Capture the brief", intro: "A sample enquiry, captured in one place." },
  { label: "Qualify enquiry", title: "Qualify the enquiry", intro: "Check the enquiry is a fit before a proposal." },
  { label: "Prepare proposal", title: "Prepare the proposal", intro: "A tailored proposal, drafted from the brief." },
  { label: "Coordinate handover", title: "Coordinate handover", intro: "Move the confirmed event into delivery." },
];

const CORP_QUALIFY = [
  "Group size and dates confirmed",
  "Location and format noted",
  "Decision-maker identified",
  "Requirements captured",
];

const CORP_PROPOSAL = [
  "Programme outline",
  "Venue options",
  "What's included",
  "Next steps",
];

const CORP_HANDOVER = [
  "Venue confirmed",
  "Guest list shared",
  "Run-of-show prepared",
  "Client point of contact assigned",
];

function CorporateDemo() {
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = window.setTimeout(() => nudgeHeadingClear("indx-cdemo-h"), 560);
    return () => window.clearTimeout(t);
  }, [step]);

  const checklist = (items: string[]) => (
    <ul className="indx-checklist">
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" className="indx-check" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  const panel = (
    <>
      {step === 0 && (
        <div>
          <dl className="indx-review">
            <div>
              <dt>Company</dt>
              <dd>
                Northgate Consulting <em>Sample enquiry</em>
              </dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>Alex Morgan, Head of People</dd>
            </div>
            <div>
              <dt>Group</dt>
              <dd>24 people</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Lake District</dd>
            </div>
            <div>
              <dt>Dates</dt>
              <dd>12–14 March 2027</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>2-day offsite</dd>
            </div>
          </dl>
          <p className="indx-note">
            Sample enquiry. All details are fictional and shown for illustration.
          </p>
        </div>
      )}
      {step === 1 && (
        <div>
          {checklist(CORP_QUALIFY)}
          <p className="indx-note">
            Qualification confirms the enquiry is worth a tailored proposal.
          </p>
        </div>
      )}
      {step === 2 && (
        <div>
          {checklist(CORP_PROPOSAL)}
          <p className="indx-gate">
            Human review required before client delivery.
          </p>
        </div>
      )}
      {step === 3 && (
        <div>
          {checklist(CORP_HANDOVER)}
          <p className="indx-note">
            Handover moves the confirmed event into delivery, with one shared plan.
          </p>
          <div className="indx-demo-nav">
            <button
              type="button"
              className="indx-btn indx-btn-ghost"
              onClick={() => setStep(0)}
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="indx-demo">
      <div className="indx-demo-head" id="indx-cdemo-h">
        <div>
          <p className="indx-demo-label">From corporate enquiry to confirmed event</p>
          <h3>{CORP_STEPS[step].title}</h3>
          <p className="indx-demo-intro">{CORP_STEPS[step].intro}</p>
        </div>
        <figure className="indx-demo-img">
          <Image
            src={IMG.lodge}
            alt="A team working together in a wooden lodge"
            fill
            sizes="(max-width: 1100px) 520px, 340px"
            loading="lazy"
          />
          <figcaption>Illustrative imagery</figcaption>
        </figure>
      </div>

      <div
        className="indx-demo-steps"
        role="group"
        aria-label="Enquiry workflow steps"
      >
        {CORP_STEPS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={`indx-demo-step${step === i ? " on" : ""}${step > i ? " done" : ""}`}
            aria-current={step === i ? "step" : undefined}
            onClick={() => setStep(i)}
          >
            <span className="indx-demo-step-n" aria-hidden="true">
              {step > i ? "✓" : `0${i + 1}`}
            </span>
            {s.label}
          </button>
        ))}
      </div>

      {reduce ? (
        <div className="indx-demo-panel">{panel}</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="indx-demo-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {panel}
          </motion.div>
        </AnimatePresence>
      )}

      {step < 3 && (
        <div className="indx-demo-nav">
          {step > 0 && (
            <button
              type="button"
              className="indx-btn indx-btn-ghost"
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            className="indx-btn indx-btn-accent"
            onClick={() => setStep(step + 1)}
          >
            Continue →
          </button>
        </div>
      )}

      <p className="indx-demo-disclaimer">
        Illustrative workflow. All budgets, prices and proposals require human review
        before client delivery.
      </p>
      <div className="indx-demo-cta">
        <a className="indx-btn indx-btn-accent" href={MEET} target="_blank" rel="noreferrer">
          Discuss My Corporate Sales Process
        </a>
      </div>
    </div>
  );
}

/* ---------------- Audience block (problems + solutions + demo) ---------------- */

function AudienceBlock({
  audienceKey,
  active,
  kicker,
  heading,
  headingId,
  intro,
  problems,
  solutions,
  image,
  imageAlt,
  demo,
}: {
  audienceKey: AudienceKey;
  active: boolean;
  kicker: string;
  heading: string;
  headingId: string;
  intro: string;
  problems: string[];
  solutions: { icon: string; title: string; desc: string }[];
  image: string;
  imageAlt: string;
  demo: React.ReactNode;
}) {
  return (
    <div
      id={`indx-aud-${audienceKey}`}
      role="tabpanel"
      aria-labelledby={`indx-tab-${audienceKey}`}
      hidden={!active}
    >
      <div className="indx-sec-head" id={headingId}>
        <Kicker>{kicker}</Kicker>
        <h2>{heading}</h2>
        <p className="indx-lede">{intro}</p>
      </div>

      <div className="indx-split">
        <BlurReveal>
          <h3 className="indx-sub">The three problems we solve</h3>
          <ul className="indx-problems">
            {problems.map((p, i) => (
              <li key={p} className="indx-problem">
                <span className="indx-problem-n" aria-hidden="true">
                  0{i + 1}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </BlurReveal>
        <BlurReveal delay={0.1}>
          <figure className="indx-fig">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1100px) 100vw, 50vw"
              loading="lazy"
            />
            <figcaption>Illustrative imagery</figcaption>
          </figure>
        </BlurReveal>
      </div>

      <h3 className="indx-sub indx-sub-gap">Four connected solutions</h3>
      <div className="indx-solutions">
        {solutions.map((s, i) => (
          <BlurReveal key={s.title} delay={i * 0.06}>
            <article className="indx-solution">
              <div className="indx-solution-head">
                <Icon name={s.icon} />
                <div className="indx-solution-head-text">
                  <span className="indx-solution-n" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3>{s.title}</h3>
                </div>
              </div>
              <p>{s.desc}</p>
            </article>
          </BlurReveal>
        ))}
      </div>

      {demo}
    </div>
  );
}

/* ---------------- Page ---------------- */

const TABS: { key: AudienceKey; num: string; title: string; desc: string }[] = [
  {
    key: "retreat",
    num: "01",
    title: "Retreat Operators",
    desc: "Fill places, simplify reservations and manage guest journeys.",
  },
  {
    key: "corporate",
    num: "02",
    title: "Corporate Offsite Planners",
    desc: "Win corporate enquiries, streamline proposals and coordinate delivery.",
  },
];

export default function IndustriesPreview() {
  const [audience, setAudience] = useState<AudienceKey>("retreat");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectAudience = (key: AudienceKey) => {
    setAudience(key);
    /* The audience swap changes the section height instantly; nudge the
       newly visible block's heading clear once the layout has settled. */
    window.setTimeout(
      () => nudgeHeadingClear(key === "retreat" ? "indx-aud-r-h" : "indx-aud-c-h"),
      120,
    );
  };

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % TABS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    if (next !== null) {
      e.preventDefault();
      selectAudience(TABS[next].key);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="indx">
      {/* 01 — Hero */}
      <section className="indx-hero" aria-labelledby="indx-h1">
        <div className="indx-wrap indx-hero-grid">
          <BlurReveal className="indx-hero-copy">
            <Kicker>DigitalFalconz / Industry Solutions</Kicker>
            <h1 id="indx-h1">
              Better bookings. <em>Smoother operations.</em>
            </h1>
            <p className="indx-lede">
              We help retreat operators and corporate offsite planners connect
              marketing, websites, CRM and automation—so more time goes into
              delivering remarkable experiences, not managing disconnected systems.
            </p>
            <div className="indx-hero-ctas">
              <a className="indx-btn indx-btn-accent" href="#indx-selector">
                Explore Solutions
              </a>
              <a
                className="indx-btn indx-btn-ghost"
                href={MEET}
                target="_blank"
                rel="noreferrer"
              >
                Book a Free Consultation
              </a>
            </div>
          </BlurReveal>
          <BlurReveal className="indx-hero-media" delay={0.1}>
            <span className="indx-hero-ring" aria-hidden="true" />
            <figure className="indx-hero-fig indx-hero-fig-main">
              <Image
                src={IMG.heroRetreat}
                alt="Misty green mountain valley at sunrise"
                fill
                sizes="(max-width: 1100px) 100vw, 50vw"
                priority
              />
              <figcaption>Illustrative imagery</figcaption>
            </figure>
            <figure className="indx-hero-fig indx-hero-fig-over">
              <Image
                src={IMG.heroCorp}
                alt="A team laughing together over laptops"
                fill
                sizes="(max-width: 1100px) 60vw, 30vw"
              />
              <figcaption>Illustrative imagery</figcaption>
            </figure>
          </BlurReveal>
        </div>
      </section>

      {/* 02 — Audience selector */}
      <section
        className="indx-section"
        id="indx-selector"
        aria-labelledby="indx-selector-h"
      >
        <div className="indx-wrap">
          <BlurReveal>
            <h2 id="indx-selector-h">WHICH BUSINESS DO YOU RUN?</h2>
          </BlurReveal>
          <div
            className="indx-tabs"
            role="tablist"
            aria-label="Choose your business type"
          >
            {TABS.map((t, i) => (
              <button
                key={t.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`indx-tab-${t.key}`}
                aria-selected={audience === t.key}
                aria-controls={`indx-aud-${t.key}`}
                tabIndex={audience === t.key ? 0 : -1}
                className={`indx-tab${audience === t.key ? " on" : ""}`}
                onClick={() => selectAudience(t.key)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
              >
                <span className="indx-tab-k" aria-hidden="true">
                  {t.num}
                </span>
                <span className="indx-tab-t">{t.title}</span>
                <span className="indx-tab-d">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Audience-specific solutions (both versions in the crawlable HTML;
          the inactive one is hidden, not removed from the DOM) */}
      <section
        className="indx-section indx-section-alt"
        id="indx-audience"
        aria-label="Solutions for your business"
      >
        <div className="indx-wrap">
          <AudienceBlock
            audienceKey="retreat"
            active={audience === "retreat"}
            kicker="Retreat Operators"
            heading="Focus on your guests. We’ll help simplify everything around them."
            headingId="indx-aud-r-h"
            intro="From an inspiring first visit to a confirmed retreat booking, we design the digital journey around your programmes, accommodation rules and guest experience."
            problems={RETREAT_PROBLEMS}
            solutions={RETREAT_SOLUTIONS}
            image={IMG.beach}
            imageAlt="A tropical beach at sunset with turquoise sea"
            demo={<RetreatDemo />}
          />
          <AudienceBlock
            audienceKey="corporate"
            active={audience === "corporate"}
            kicker="Corporate Offsite Planners"
            heading="Win the brief. Simplify the planning."
            headingId="indx-aud-c-h"
            intro="We help corporate retreat and offsite planning companies turn enquiries into organised opportunities, tailored proposals and smoother client workflows."
            problems={CORP_PROBLEMS}
            solutions={CORP_SOLUTIONS}
            image={IMG.office}
            imageAlt="A team working in an open-plan office"
            demo={<CorporateDemo />}
          />
        </div>
      </section>

      {/* 04 — Shared reassurance */}
      <section
        className="indx-section"
        id="indx-reassurance"
        aria-labelledby="indx-reassure-h"
      >
        <div className="indx-wrap indx-split">
          <BlurReveal>
            <figure className="indx-fig">
              <Image
                src={IMG.boat}
                alt="A wooden boat on a turquoise mountain lake"
                fill
                sizes="(max-width: 1100px) 100vw, 50vw"
                loading="lazy"
              />
              <figcaption>Illustrative imagery</figcaption>
            </figure>
          </BlurReveal>
          <BlurReveal delay={0.1}>
            <h2 id="indx-reassure-h">One partner. The right combination of expertise.</h2>
            <p className="indx-split-p">
              We start with the problem, not the technology. Whether you need a
              better booking experience, a stronger acquisition strategy or
              connected operations, DigitalFalconz helps define and implement the
              right approach.
            </p>
            <p className="indx-support">
              Marketing × Software × AI <span aria-hidden="true">|</span> Growth,
              engineered.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* 05 — Final CTA */}
      <section className="indx-cta" id="indx-cta" aria-labelledby="indx-cta-h">
        <div className="indx-wrap indx-cta-inner">
          <BlurReveal>
            <h2 id="indx-cta-h">
              Let’s make your next experience easier to sell—and simpler to run.
            </h2>
            <p className="indx-lede">
              Tell us what slows your business down. We’ll explore the next step
              in a complimentary 30-minute consultation.
            </p>
            <div className="indx-ctas">
              <a
                className="indx-btn indx-btn-accent"
                href={MEET}
                target="_blank"
                rel="noreferrer"
              >
                Book a Free Consultation
              </a>
              <a
                className="indx-btn indx-btn-ghost"
                href="mailto:contact@digitalfalconz.com"
              >
                Email Us
              </a>
            </div>
            <p className="indx-contact">
              <a href="mailto:contact@digitalfalconz.com">contact@digitalfalconz.com</a>
              <span aria-hidden="true"> | </span>
              <a href="tel:+447988594240">UK +44 7988594240</a>
              <span aria-hidden="true"> | </span>
              <a href="tel:+19296524894">US +1 9296524894</a>
            </p>
          </BlurReveal>
        </div>
      </section>
    </div>
  );
}
