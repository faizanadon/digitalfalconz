"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroPhone from "@/components/HeroPhone";
import QuestionsTabs from "@/components/QuestionsTabs";
import Markdown from "@/components/Markdown";
import { Reveal, FlowDiagram, AuditBars, AnimatedCounter, ScrollProgress, Stagger, StaggerItem, CtaArrow } from "@/components/Motion";
import {
  LeakToSystemGraphic, CapGraphic, JourneyDiagram, ProcessTimeline,
  DuoWorkGraphic, DuoBuildGraphic,
} from "@/components/Graphics";
import {
  BarChart3, Bot, Briefcase, CalendarCheck, Compass, Globe, Layers, Magnet,
  MessageSquare, MousePointerClick, Palette, Rocket, ShieldCheck, ShoppingBag,
  Sparkles, TrendingUp, Users, Workflow, Wrench,
} from "lucide-react";
import { pages } from "@/data/pages";
import { site } from "@/data/site";

const TICKER_A = [
  { tag: "Google", kind: "g", text: "best lead generation agency near me", hl: false },
  { tag: "AI", kind: "ai", text: "Which agency should I hire to grow my business?", hl: true },
  { tag: "AI", kind: "ai", text: "Why does my competitor show up on Google and I don’t?", hl: false },
  { tag: "Google", kind: "g", text: "how to get my business recommended by ChatGPT", hl: false },
  { tag: "AI", kind: "ai", text: "How do people find businesses like mine now?", hl: false },
  { tag: "Google", kind: "g", text: "paid ads vs SEO which is better for leads", hl: false },
];
const TICKER_B = [
  { tag: "AI", kind: "ai", text: "Why do my ads get clicks but no customers?", hl: false },
  { tag: "Google", kind: "g", text: "landing page not converting what to fix", hl: false },
  { tag: "AI", kind: "ai", text: "How do I get more enquiries from my website?", hl: true },
  { tag: "Google", kind: "g", text: "how much should a landing page convert", hl: false },
  { tag: "AI", kind: "ai", text: "What should my website say to turn visitors into leads?", hl: false },
  { tag: "Google", kind: "g", text: "best way to generate B2B leads online", hl: false },
];

const DISCIPLINES = [
  { n: "01", title: "Performance Marketing", stage: "Acquire", icon: TrendingUp, text: "Paid media engineered for pipeline, not vanity metrics. Your ads are judged on the enquiries and revenue they produce — nothing else." },
  { n: "02", title: "Lead Generation Systems", stage: "Acquire", icon: Magnet, text: "Predictable pipeline built on systems, not one-off campaigns. A campaign ends. A system keeps producing — month after month." },
  { n: "03", title: "AI Automation", stage: "Automate", icon: Workflow, text: "Operations that run themselves while your team sells. Sorting, routing, reminding, updating — automatically, so nothing waits on a busy human." },
  { n: "04", title: "AI Agents, Chatbots & Voice", stage: "Automate", icon: Bot, text: "AI that qualifies, books and answers — around the clock. A question at 11 pm gets a real answer at 11 pm." },
  { n: "05", title: "CRM Integration & Automation", stage: "Automate", icon: Users, text: "One source of truth from first click to closed-won. Every lead, every conversation, every outcome — in one place." },
  { n: "06", title: "Sales Funnels & Landing Pages", stage: "Convert", icon: MousePointerClick, text: "Conversion assets engineered around one job: the next step. One page, one decision — measured on whether it moves visitors to enquire." },
  { n: "07", title: "Web Development & Web Apps", stage: "Convert", icon: Globe, text: "Websites and web apps built as revenue infrastructure. Where ads land, AI tools read about you, and buyers decide." },
  { n: "08", title: "Conversion Rate Optimization", stage: "Scale", icon: BarChart3, text: "More revenue from the traffic you already pay for. Fix the pages traffic lands on before spending another pound or dollar on ads." },
];

const HOME_FAQS = [
  { q: "What does the growth audit actually cost?", a: "Nothing. We analyse your traffic, funnel, CRM and follow-up speed, then rank the fixes by revenue impact. The findings are yours to keep either way — act on them with us, with someone else, or yourself.", open: true },
  { q: "Do I have to buy all eight services?", a: "No. Deploy a single discipline or run the full stack. Most businesses have one or two big leaks; the audit shows you which ones they are, so you fix what matters first instead of buying everything." },
  { q: "Can you guarantee more revenue?", a: "No — and be careful with anyone who does. What we can guarantee is visibility: every step attributed, reporting on pipeline, CAC and closed revenue, and work sequenced by expected impact. If it isn’t working, you’ll see it in the same numbers we do." },
  { q: "I already run ads and have a website. Do I need this?", a: "Maybe not a rebuild. Most of the businesses we audit don’t have a traffic problem — they have leaks between the traffic and the sale. The audit tells you which one you’ve got before you spend on either." },
  { q: "Who actually works on my account?", a: "Senior operators, organised in three pods: strategy, media & creative, and systems & AI. The people who pitch your strategy are the people who build and run it. No account-manager handoffs." },
  { q: "What happens after I request the audit?", a: "A senior strategist — never a salesperson — replies within one business day with a point of view, not a pitch deck. If we’re not the right fit, we’ll say so, and the audit findings are still yours." },
  { q: "Where are you based?", a: "Our strategy and delivery teams work follow-the-sun across the United Kingdom, United States, Canada, UAE, Australia and Europe — so campaigns, funnels and AI systems are watched around the clock." },
];

function TickerRow({ items, rev }: { items: typeof TICKER_A; rev?: boolean }) {
  const set = (key: string) => (
    <div className="tick-set" key={key}>
      {items.map((t) => (
        <span key={t.text} className={`tick${t.hl ? " hl" : ""}`}><span className={`q-tag ${t.kind}`}>{t.tag}</span>{t.text}</span>
      ))}
    </div>
  );
  return <div className={`ticker-row${rev ? " rev" : ""}`}>{set("a")}{set("b")}</div>;
}

/** Split a home section body on its ### sub-headings. */
function splitSubsections(body: string): { title: string; body: string }[] {
  const parts = body.split(/^### /m);
  return parts.slice(1).map((p) => {
    const nl = p.indexOf("\n");
    return { title: p.slice(0, nl).trim(), body: p.slice(nl + 1).trim() };
  });
}

/** Pull the trailing "[Explore …](…)" line out of a capability body so it can be a button. */
function stripExplore(body: string): { body: string; link?: { label: string; href: string } } {
  const m = /\[([^\]]+)\]\(([^)]+)\)\s*$/.exec(body.trim());
  if (!m) return { body };
  return { body: body.slice(0, m.index).trim(), link: { label: m[1], href: m[2] } };
}

const CAP_ICONS = [TrendingUp, Globe, Bot, Palette, BarChart3];
const CAP_ANCHORS: Record<number, string> = {
  0: "/services#growth-demand-generation",
  1: "/services#web-software-engineering",
  2: "/services#ai-crm-automation",
  3: "/services#brand-design-video",
  4: "/services#analytics-conversion",
};
const SOLUTION_ICONS = [Magnet, Globe, Workflow, Rocket];
const APPROACH_ICONS = [Compass, Layers, Sparkles, ShieldCheck, TrendingUp];
const INDUSTRY_ICONS = [Wrench, Briefcase, Rocket, ShoppingBag, CalendarCheck];

export default function HomePage() {
  const home = pages.home;
  const sections = home.sections ?? [];
  const sec = (prefix: string) => sections.find((s) => s.heading.startsWith(prefix));
  const nextStage = sec("Your next stage");
  const fiveCaps = sec("Five capabilities");
  const solutions = sec("Connected solutions");
  const approach = sec("What makes the approach");
  const industries = sec("Industry-aware");
  const process = sec("A deliberate process");
  const work = sec("Explore selected work");
  const buildNext = sec("Build what your business");

  const capItems = fiveCaps ? splitSubsections(fiveCaps.body) : [];
  const solItems = solutions ? splitSubsections(solutions.body) : [];
  const approachItems = approach ? splitSubsections(approach.body) : [];

  // Process steps: "**01 — Understand.** Clarify …" lines.
  const processSteps = process
    ? process.body.split("\n").map((line) => {
        const m = /^\*\*(\d+) — ([^*]+)\.\*\*\s*(.*)$/.exec(line.trim());
        return m ? { num: m[1], title: m[2].trim(), text: m[3].trim() } : null;
      }).filter((x): x is { num: string; title: string; text: string } => x !== null)
    : [];

  // Industry bullets: "- **[Title](/industries):** description"
  const industryItems = industries
    ? industries.body.split("\n").map((line) => {
        const m = /^- \*\*\[([^\]]+)\]\(([^)]+)\):\*\*\s*(.*)$/.exec(line.trim());
        return m ? { title: m[1], href: m[2], text: m[3] } : null;
      }).filter((x): x is { title: string; href: string; text: string } => x !== null)
    : [];
  const industryIntro = industries ? industries.body.split("\n\n")[0] : "";

  // Duo cards: the copy bodies end with a bold link paragraph ("View our work"
  // / "Start a project conversation" + contact line). Render only the intro
  // text here — the button and the single stacked contact list below replace it.
  // The Work page now shows 22 real projects, so the duo card says so
  // instead of the old "authorised projects and demonstrations" wording.
  const workIntro =
    "The best way to judge an agency is to understand how it approaches the problem. See 22 selected projects by Faizan Nawaz — Shopify storefronts, WordPress builds, GoHighLevel funnels, Webflow sites and independent products — each with its live site and the role played.";
  const buildIntro = buildNext ? buildNext.body.split("**[Start a project")[0].trim() : "";

  return (
    <>
      <ScrollProgress />
      {/* HERO — tighter, staggered entrance, floating phone */}
      <div className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            >
              <motion.p className="label" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>Growth systems for the AI era</motion.p>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}>Traffic in. <span className="hl">Revenue out.</span><br /><span className="dim">Every step attributed.</span></motion.h1>
              <motion.p className="lede" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>That is the whole deal. DigitalFalconz builds one connected system — ads, website, CRM and AI working together — that turns attention into pipeline, and shows you exactly where every enquiry came from.</motion.p>
              <motion.p className="plain" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>No disconnected services. No reports full of numbers that don&rsquo;t tie to money. If a metric can&rsquo;t be tied to revenue, it doesn&rsquo;t make the dashboard.</motion.p>
              <motion.div className="hero-ctas" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
                <a className="btn big" href="/contact#enquiry-form">Get a free growth audit</a>
                <span className="note">Free. Specific. Yours to keep either way.</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <HeroPhone />
              </motion.div>
            </motion.div>
          </div>
          <Reveal delay={0.1}><FlowDiagram /></Reveal>
        </div>
      </div>

      {/* QUESTION TICKER */}
      <div className="ticker" aria-hidden="true">
        <TickerRow items={TICKER_A} />
        <TickerRow items={TICKER_B} rev />
      </div>

      {/* PROBLEM — tighter, two-column */}
      <section id="problem" className="tight">
        <div className="wrap">
          <Reveal><span className="mono kicker">The problem</span>
          <h2>You don&rsquo;t have a traffic problem.<br />You have a systems problem.</h2></Reveal>
          <div className="two-col">
            <Reveal delay={0.05}>
              <p className="big-p">Your customers don&rsquo;t browse like they used to. <strong>They ask Google and AI tools who to buy from.</strong> ChatGPT, Gemini and AI answers name a few businesses. If you&rsquo;re not one of them, you never hear about it.</p>
              <p className="big-p closer"><strong>We close the leaks.</strong> That is what the eight disciplines below are for.</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="plain-p">And when someone does find you, the lead leaks. The ad promises one thing, the page says another. The enquiry lands in an inbox and waits hours for a reply. The conversation never reaches the CRM. By the time anyone follows up, the buyer has picked someone faster.</p>
              <p className="plain-p">Not your fault. Nobody told you the rules changed. But a system with holes in it will keep leaking, no matter how much traffic you pour in the top.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* QUESTIONS */}
      <section id="questions" className="tight">
        <div className="wrap">
          <Reveal><span className="mono kicker">How buyers search now</span>
          <h2>This is what your buyers type — and ask.</h2>
          <p className="plain-p">Before anyone hires, signs or buys, they ask questions like these. Some go to Google. More and more go straight to an AI tool. Pick a stage:</p></Reveal>
          <QuestionsTabs />
          <p className="q-foot">Every one of these questions is a job for one of the eight disciplines below. If your system can&rsquo;t answer them, a competitor&rsquo;s will.</p>
          <p style={{ marginTop: 18 }}><a className="btn" href="/contact#enquiry-form">Find out where your system leaks</a></p>
        </div>
      </section>

      <hr className="rule" />

      {/* TEARDOWN — compact icon cards, staggered */}
      <section id="services" className="tight">
        <div className="wrap">
          <Reveal><span className="mono kicker">Teardown</span>
          <h2>Eight disciplines. <span className="hl">One system.</span></h2>
          <p className="plain-p">Pretty isn&rsquo;t the job. Pipeline is. Deploy a single discipline or run the full stack — either way, everything plugs into the same engine.</p></Reveal>
          <Stagger className="disc-grid">
            {DISCIPLINES.map((d) => (
              <StaggerItem key={d.n}>
                <motion.article className="disc-card" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <span className="disc-icon" aria-hidden="true"><d.icon size={22} strokeWidth={1.9} /></span>
                  <span className="disc-num">{d.n} · {d.stage}</span>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </motion.article>
              </StaggerItem>
            ))}
          </Stagger>
          <p style={{ marginTop: 28 }}><a className="btn" href="/contact#enquiry-form">Not sure which one you need? Start with the audit</a> <Link className="btn ghost" href="/services">See all 30 services</Link></p>
        </div>
      </section>

      <hr className="rule" />

      {/* PROOF — animated counters, real numbers only */}
      <section id="proof" className="tight">
        <div className="wrap">
          <Reveal><span className="mono kicker">One system</span>
          <h2>Traffic in. <span className="hl">Revenue out.</span><br />Every step attributed.</h2>
          <p className="plain-p">That is the whole deal, counted. Eight disciplines working as one connected system — and a free audit that checks the four places the system usually leaks.</p></Reveal>
          <Stagger className="stats">
            <StaggerItem><div className="stat"><div className="num"><AnimatedCounter value={8} /></div><div className="sbar" /><h3>Disciplines, one system</h3><p>From Performance Marketing to Conversion Rate Optimization. Deploy a single discipline or run the full stack.</p></div></StaggerItem>
            <StaggerItem><div className="stat"><div className="num"><AnimatedCounter value={1} /></div><div className="sbar" /><h3>Source of truth</h3><p>Every lead, every conversation, every outcome — in one place, from first click to closed-won.</p></div></StaggerItem>
            <StaggerItem><div className="stat"><div className="num"><AnimatedCounter value={4} /></div><div className="sbar" /><h3>Checks in the free audit</h3><p>Your traffic, funnel, CRM and follow-up speed — analysed, then ranked by revenue impact.</p></div></StaggerItem>
            <StaggerItem><div className="stat"><div className="num"><AnimatedCounter value={24} suffix="/7" /></div><div className="sbar" /><h3>AI on the clock</h3><p>AI that qualifies, books and answers around the clock. A question at 11&nbsp;pm gets a real answer at 11&nbsp;pm.</p></div></StaggerItem>
          </Stagger>
          <Reveal delay={0.1}><AuditBars /></Reveal>
        </div>
      </section>

      <hr className="rule" />

      {/* HOW IT WORKS */}
      <section id="how" className="tight">
        <div className="wrap">
          <Reveal><span className="mono kicker">How it works</span>
          <h2>Four steps. No tech talk.</h2>
          <p className="plain-p">Acquire. Convert. Automate. Scale. Four verbs describe every engagement we run — and this is the order they happen in.</p></Reveal>
          <Stagger className="steps">
            <StaggerItem><div className="step"><span className="n">Step 01</span><h3>Get the free growth audit</h3><p>We analyse your traffic, funnel, CRM and follow-up speed, then rank the fixes by revenue impact. You see exactly which lever to pull first — before you spend anything.</p></div></StaggerItem>
            <StaggerItem><div className="step"><span className="n">Step 02</span><h3>We plan the system</h3><p>Our strategy pod sequences the work: which disciplines, in which order, aimed at which number. You approve the plan before anything gets built.</p></div></StaggerItem>
            <StaggerItem><div className="step"><span className="n">Step 03</span><h3>Senior operators build it</h3><p>The people who planned it build it — media, creative, systems and AI pods working as one team. No account-manager handoffs, no junior relay races.</p></div></StaggerItem>
            <StaggerItem><div className="step final"><span className="n">Step 04</span><h3>It runs. You see the revenue.</h3><p>The system runs and gets optimised against one thing: money. We report on pipeline, CAC and closed revenue — every step attributed, nothing hidden.</p></div></StaggerItem>
          </Stagger>
          <p style={{ marginTop: 28 }}><a className="btn big" href="/contact#enquiry-form">Start with step 1 — it&rsquo;s free</a></p>
        </div>
      </section>

      {/* CTA BAND — Find your biggest leak */}
      <section className="tight" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Find your biggest leak before you spend another penny on traffic.</h2>
                <p>The audit looks at your traffic, funnel, CRM and follow-up speed — then ranks every fix by revenue impact.</p>
              </div>
              <div className="side">
                <a className="btn big" href="/contact#enquiry-form" style={{ width: "100%", justifyContent: "center" }}>Get my free growth audit</a>
                <small>Free, specific, and yours to keep either way. A senior strategist replies — never a salesperson.</small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="rule" />

      {/* ===== EVERYTHING AFTER THE LEAK CTA — designed, animated sections ===== */}

      {/* NEXT STAGE — intro + leak-into-system graphic */}
      {nextStage && (
        <section className="tight post-leak">
          <div className="wrap">
            <div className="two-col post-leak-grid">
              <Reveal>
                <span className="mono kicker">Beyond the deliverable</span>
                <h2>Your next stage of growth needs more than disconnected services</h2>
                <Markdown text={nextStage.body} />
              </Reveal>
              <Reveal delay={0.12}>
                <LeakToSystemGraphic />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <hr className="rule" />

      {/* FIVE CAPABILITIES — 5 large cards + 1 CTA card */}
      {fiveCaps && (
        <section className="tight post-leak">
          <div className="wrap">
            <Reveal>
              <span className="mono kicker">Our capabilities</span>
              <h2>Five capabilities. <span className="hl">One connected digital partner.</span></h2>
              <p className="plain-p">Pick one discipline or run the full system — everything plugs into the same engine.</p>
            </Reveal>
            <Stagger className="cap-cards">
              {capItems.map((c, i) => {
                const Icon = CAP_ICONS[i % CAP_ICONS.length];
                const { body, link } = stripExplore(c.body);
                return (
                  <StaggerItem key={c.title}>
                    <motion.article className="card cap-card" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                      <CapGraphic variant={i % 5} />
                      <span className="cap-card-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.9} /></span>
                      <h3>{c.title}</h3>
                      <Markdown text={body} />
                      <p className="cap-card-link">
                        <Link href={link ? CAP_ANCHORS[i] ?? "/services" : "/services"}>
                          {link ? link.label : "Explore services"} <CtaArrow />
                        </Link>
                      </p>
                    </motion.article>
                  </StaggerItem>
                );
              })}
              <StaggerItem>
                <motion.article className="card cap-card cap-cta" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                  <span className="cap-card-icon" aria-hidden="true"><Sparkles size={22} strokeWidth={1.9} /></span>
                  <h3>Not sure which one fits?</h3>
                  <p>Start with the business challenge. We&rsquo;ll recommend the capabilities that will make the greatest practical difference — not every service at once.</p>
                  <p className="cap-card-link"><Link className="btn" href="/services">View all services</Link></p>
                </motion.article>
              </StaggerItem>
            </Stagger>
          </div>
        </section>
      )}

      <hr className="rule" />

      {/* CONNECTED SOLUTIONS — flow diagram + 4 solution cards */}
      {solutions && (
        <section className="tight post-leak">
          <div className="wrap">
            <Reveal>
              <span className="mono kicker">Integrated solutions</span>
              <h2>Connected solutions for real business challenges</h2>
              <p className="plain-p">Four ways the capabilities combine into one journey — from first click to a working product.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <JourneyDiagram steps={[
                { label: "Acquire", sub: "demand in" },
                { label: "Convert", sub: "experience" },
                { label: "Automate", sub: "operations" },
                { label: "Build", sub: "product" },
              ]} />
            </Reveal>
            <Stagger className="sol-grid">
              {solItems.map((s, i) => {
                const Icon = SOLUTION_ICONS[i % SOLUTION_ICONS.length];
                const colon = s.title.indexOf(":");
                const stage = colon > -1 ? s.title.slice(0, colon).trim() : "";
                const name = colon > -1 ? s.title.slice(colon + 1).trim() : s.title;
                return (
                  <StaggerItem key={s.title}>
                    <motion.article className="card sol-card" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                      <span className="sol-stage">{stage}</span>
                      <span className="cap-card-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.9} /></span>
                      <h3>{name}</h3>
                      <Markdown text={s.body} />
                    </motion.article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      <hr className="rule" />

      {/* WHAT MAKES THE APPROACH DIFFERENT — 5 principle cards */}
      {approach && (
        <section className="tight post-leak">
          <div className="wrap">
            <Reveal>
              <span className="mono kicker">The difference</span>
              <h2>What makes the approach different</h2>
            </Reveal>
            <Stagger className="approach-grid">
              {approachItems.map((a, i) => {
                const Icon = APPROACH_ICONS[i % APPROACH_ICONS.length];
                return (
                  <StaggerItem key={a.title}>
                    <motion.article className="card approach-card" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                      <span className="approach-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="cap-card-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.9} /></span>
                      <h3>{a.title}</h3>
                      <Markdown text={a.body} />
                    </motion.article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      <hr className="rule" />

      {/* INDUSTRY-AWARE — industry cards */}
      {industries && (
        <section className="tight post-leak">
          <div className="wrap">
            <Reveal>
              <span className="mono kicker">Industries</span>
              <h2>Industry-aware work, not one-size-fits-all packages</h2>
              <Markdown text={industryIntro} />
            </Reveal>
            <Stagger className="industry-home-grid">
              {industryItems.map((it, i) => {
                const Icon = INDUSTRY_ICONS[i % INDUSTRY_ICONS.length];
                return (
                  <StaggerItem key={it.title}>
                    <motion.article className="card industry-home-card" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                      <span className="cap-card-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.9} /></span>
                      <h3><Link href={it.href}>{it.title}</Link></h3>
                      <p>{it.text}</p>
                    </motion.article>
                  </StaggerItem>
                );
              })}
            </Stagger>
            <p style={{ marginTop: 28 }}><Link className="btn" href="/industries">Explore the industries we serve</Link></p>
          </div>
        </section>
      )}

      <hr className="rule" />

      {/* A DELIBERATE PROCESS — animated scroll-fill timeline */}
      {process && processSteps.length > 0 && (
        <section className="tight post-leak">
          <div className="wrap">
            <Reveal>
              <span className="mono kicker">How engagements work</span>
              <h2>A deliberate process, from first conversation to implementation</h2>
              <p className="plain-p">Five steps, in order — nothing starts until the step before it is clear.</p>
            </Reveal>
            <ProcessTimeline steps={processSteps} />
          </div>
        </section>
      )}

      <hr className="rule" />

      {/* WORK + BUILD NEXT — two designed CTA cards */}
      <section className="tight post-leak">
        <div className="wrap">
          <Stagger className="duo-cta">
            {work && (
              <StaggerItem>
                <motion.article className="card duo-card" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                  <span className="cap-card-icon" aria-hidden="true"><Briefcase size={22} strokeWidth={1.9} /></span>
                  <h3>Explore selected work</h3>
                  <Markdown text={workIntro} />
                  <DuoWorkGraphic />
                  <Link className="btn duo-btn" href="/work">View our work</Link>
                </motion.article>
              </StaggerItem>
            )}
            {buildNext && (
              <StaggerItem>
                <motion.article className="card duo-card duo-dark" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                  <span className="cap-card-icon" aria-hidden="true"><MessageSquare size={22} strokeWidth={1.9} /></span>
                  <h3>Build what your business needs next</h3>
                  <Markdown text={buildIntro} />
                  <DuoBuildGraphic />
                  <Link className="btn duo-btn" href="/contact">Start a project conversation</Link>
                  <div className="duo-contact">
                    <div className="duo-contact-row"><span className="duo-contact-label">Email</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
                    <div className="duo-contact-row"><span className="duo-contact-label">UK</span><a href={site.phoneUKHref}>{site.phoneUK}</a></div>
                    <div className="duo-contact-row"><span className="duo-contact-label">US</span><a href={site.phoneUSHref}>{site.phoneUS}</a></div>
                  </div>
                </motion.article>
              </StaggerItem>
            )}
          </Stagger>
        </div>
      </section>

      <hr className="rule" />

      {/* FAQ preview */}
      <section id="faq" className="tight">
        <div className="wrap">
          <Reveal><span className="mono kicker">FAQ</span>
          <h2>Questions people ask us</h2></Reveal>
          <Stagger className="faq-list">
            {HOME_FAQS.map((f) => (
              <StaggerItem key={f.q}>
                <details className="faq" open={f.open}>
                  <summary>{f.q}</summary>
                  <div className="a"><p>{f.a}</p></div>
                </details>
              </StaggerItem>
            ))}
          </Stagger>
          <p style={{ marginTop: 24 }}><Link className="btn ghost" href="/faq">See all 40 FAQs</Link></p>
        </div>
      </section>

      {/* FINAL CTA — home ends here, then the footer. No form on this page. */}
      <section className="tight" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Traffic in. <span className="hl">Revenue out.</span><br />Every step attributed.</h2>
                <p>Start with a free growth audit — traffic, funnel, CRM and follow-up speed, ranked by revenue impact.</p>
              </div>
              <div className="side">
                <a className="btn big" href="/contact#enquiry-form" style={{ width: "100%", justifyContent: "center" }}>Start with a free growth audit</a>
                <small>Free, specific, and yours to keep either way. A senior strategist replies — never a salesperson.</small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
