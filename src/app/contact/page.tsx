import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import Reveal from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Motion";
import { Mail, MessageSquare, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { JourneyDiagram, PageHeroGraphic } from "@/components/Graphics";
import { pages } from "@/data/pages";
import { metaFor, site } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/contact");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

function splitSections(body: string) {
  const parts = body.split(/^## /m);
  const out: { heading: string; body: string }[] = [];
  parts.forEach((part, i) => {
    if (i === 0) { if (part.trim()) out.push({ heading: "", body: part }); return; }
    const nl = part.indexOf("\n");
    out.push({ heading: part.slice(0, nl).replace(/\s*\{#.*\}\s*$/, "").trim(), body: part.slice(nl + 1) });
  });
  return out;
}

export default function ContactPage() {
  const p = pages.contact;
  const secs = splitSections(p.body);
  const intro = secs.find((s) => s.heading === "")?.body ?? "";
  // NOTE: the "Tell us about your project" section in the copy pack is a
  // form-field SPEC (numbered field list, submit/success/error strings),
  // not visible content. It is deliberately never rendered — the real
  // ContactForm below already contains all 11 fields.
  const rest = secs.filter((s) => s.heading && !s.heading.startsWith("Tell us about your project") && !s.heading.startsWith("Get in touch"));
  return (
    <>
      {/* HERO — content left, graphic right (like the home hero) */}
      <div className="wrap page-hero contact-hero">
        <Reveal>
          <div className="contact-hero-grid">
            <div className="contact-hero-copy">
              <span className="hero-icon-tile" aria-hidden="true"><MessageSquare size={30} strokeWidth={1.9} /></span>
              <span className="mono kicker">{p.kicker}</span>
              <h1>{p.h1}</h1>
              <span className="hero-rule" aria-hidden="true" />
              <Markdown text={intro} />
              <p><a className="btn" href="#enquiry-form">Send a project enquiry</a> <Link className="btn ghost" href="/services">Explore services</Link></p>
            </div>
            <div className="contact-hero-gfx">
              <PageHeroGraphic page="contact" />
            </div>
          </div>
        </Reveal>
      </div>
      <div className="wrap">
        <Reveal>
          <JourneyDiagram steps={[
            { label: "Review", sub: "we read your brief" },
            { label: "Clarify", sub: "a call or a few questions" },
            { label: "Next step", sub: "proposal, audit or discovery" },
          ]} />
        </Reveal>
        <div className="contact-cards">
          <div className="card">
            <span className="svc-icon" aria-hidden="true"><Mail size={20} strokeWidth={1.9} /></span><span className="tag">Email</span>
            <h3><a href={`mailto:${site.email}`}>{site.email}</a></h3>
            <p>Best for project briefs, documents and detailed enquiries.</p>
          </div>
          <div className="card">
            <span className="svc-icon" aria-hidden="true"><Phone size={20} strokeWidth={1.9} /></span><span className="tag">United Kingdom</span>
            <h3><a href={site.phoneUKHref}>{site.phoneUK}</a></h3>
            <p>Contact number — not a statement that DigitalFalconz maintains a physical office in the UK.</p>
          </div>
          <div className="card">
            <span className="svc-icon" aria-hidden="true"><Phone size={20} strokeWidth={1.9} /></span><span className="tag">United States</span>
            <h3><a href={site.phoneUSHref}>{site.phoneUS}</a></h3>
            <p>Contact number — not a statement that DigitalFalconz maintains a physical office in the USA. If calls are unanswered, please email your enquiry.</p>
          </div>
        </div>
      </div>

      <section className="tight">
        <div className="wrap">
          <div className="contact-layout">
            <Reveal>
              <span className="mono kicker">What to send</span>
              <h2>Tell us about your project</h2>
              <p className="plain-p">A short outline is enough to begin. More context helps us identify an appropriate next step; a finished specification is not required.</p>
              <p className="plain-p" style={{ marginTop: 16 }}>
                Your information is used to respond to your enquiry and manage the related conversation. Review our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="contact-form-panel" id="enquiry-form">
                <span className="mono kicker">Project enquiry</span>
                <h2>Send your enquiry</h2>
                <p>Fill in the form and we&apos;ll reply through the contact details you provide — a senior strategist, never a salesperson.</p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {rest.map((s) => (
        <section key={s.heading} style={{ paddingTop: 24, paddingBottom: 24 }}>
          <div className="wrap">
            <Reveal>
              <h2>{s.heading}</h2>
              <Markdown text={s.body} />
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
