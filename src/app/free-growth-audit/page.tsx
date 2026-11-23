import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { metaFor } from "@/data/site";

// Dedicated audit landing page (Faizan-approved copy + SEO, 2026-11-24).
// The header "Free growth audit" CTAs point here instead of /contact.
// Social tags use Faizan's copy; the image is the existing site-wide one.
export const metadata: Metadata = (() => {
  const m = metaFor("/free-growth-audit");
  return {
    title: m?.seo_title,
    description: m?.meta_description,
    alternates: { canonical: m?.canonical },
    openGraph: {
      title: "Where are you losing leads?",
      description: "Get a free growth audit and see which fixes to prioritise across your website, funnel and follow-up.",
      url: m?.canonical,
      type: "website",
      images: [{ url: "/logo-mark-hires.png", width: 2400, height: 2400, alt: "DigitalFalconz" }],
    },
  };
})();

const COVERAGE = [
  { num: "01", title: "Traffic", text: "Where visitors come from and which channels drive enquiries." },
  { num: "02", title: "Sales funnel", text: "Where people drop off before contacting you." },
  { num: "03", title: "CRM", text: "Which enquiries go untracked or get missed." },
  { num: "04", title: "Follow-up", text: "How quickly leads get a reply and where follow-up stalls." },
];

export default function FreeGrowthAuditPage() {
  return (
    <>
      {/* Hero — single column on purpose: this is a focused landing page,
          and the H1 stays a plain element so it paints with the first
          render (the speed-pass standard for inner-page headings). */}
      <div className="wrap page-hero">
        <span className="mono kicker">DigitalFalconz / Free growth audit</span>
        <h1>Free growth audit</h1>
        <span className="hero-rule" aria-hidden="true" />
        <Reveal delay={0.05}>
          <p className="lede">See where you&rsquo;re losing leads.</p>
          <p className="plain-p">
            We&rsquo;ll review your website traffic, sales funnel, CRM and follow-up.
            You&rsquo;ll see where enquiries drop off and what to fix first.
          </p>
          <p>
            <a className="btn" href="#request-audit">Request my free audit &rarr;</a>{" "}
            <Link className="btn ghost" href="/services">Explore services</Link>
          </p>
          <p className="plain-p" style={{ marginTop: 18 }}>
            The findings are yours to keep. No obligation.
          </p>
        </Reveal>
      </div>

      <section className="tight">
        <div className="wrap">
          <Reveal>
            <span className="mono kicker">What we review</span>
            <h2>What does the audit cover?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="sol-grid">
              {COVERAGE.map((c) => (
                <div className="card" key={c.num}>
                  <span className="tag">{c.num}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="tight" id="request-audit">
        <div className="wrap">
          <div className="contact-layout">
            <Reveal>
              <span className="mono kicker">What happens next</span>
              <h2>What happens after I request an audit?</h2>
              <p className="plain-p">
                A DigitalFalconz strategist will review your request and email you
                with the next steps.
              </p>
              <p className="plain-p" style={{ marginTop: 16 }}>
                Your information is used to respond to your audit request and manage
                the related conversation. Review our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="contact-form-panel">
                <span className="mono kicker">Free growth audit</span>
                <h2>Request my free audit</h2>
                <p>Tell us where to send the findings — a senior strategist, never a salesperson.</p>
                <ContactForm audit />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
