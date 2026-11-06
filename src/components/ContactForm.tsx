"use client";
import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

const HELP_OPTIONS = [
  "Lead generation & paid media", "SEO & AI search visibility", "Websites & e-commerce",
  "Custom software or SaaS", "AI agents & workflow automation", "CRM integration",
  "Branding & design", "Video editing & motion", "Analytics & CRO",
  "Multiple services", "Not sure yet",
];
const INVESTMENT_OPTIONS = [
  "Under US$2,500", "US$2,500–5,000", "US$5,000–10,000", "US$10,000–25,000", "US$25,000+", "Prefer to discuss",
];
const START_OPTIONS = ["As soon as feasible", "Within 30 days", "1–3 months", "Exploring options"];

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const goals = String(fd.get("goals") ?? "").trim();
    const privacy = fd.get("privacy") === "on";
    const hp = String(fd.get("_hp") ?? "");

    if (!name || !email || !goals) {
      setIsError(true);
      setStatus("Please fill in your name, work email and what you are trying to achieve so we can reply with something specific.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsError(true);
      setStatus("That email address doesn't look complete — check it and try again.");
      return;
    }
    if (!privacy) {
      setIsError(true);
      setStatus("Please confirm the privacy acknowledgement before sending your enquiry.");
      return;
    }

    setIsError(false);
    setStatus("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: String(fd.get("company") ?? "").trim(),
          website: String(fd.get("website") ?? "").trim(),
          country: String(fd.get("country") ?? "").trim(),
          help: String(fd.get("help") ?? ""),
          investment: String(fd.get("investment") ?? ""),
          start: String(fd.get("start") ?? ""),
          goals,
          brief: String(fd.get("brief") ?? "").trim(),
          privacy: true,
          _hp: hp,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setIsError(true);
        setStatus(data.error || "Unable to send your enquiry right now. Please try again or email us directly.");
        return;
      }

      setSent(true);
      setStatus(data.message || "Thank you. Your enquiry has been received.");
      form.reset();
    } catch {
      setIsError(true);
      setStatus("Network error: Could not submit your enquiry. Please check your connection or email contact@digitalfalconz.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div>
        <div className="form-status show" role="status" style={{ display: "block", gridColumn: "1 / -1" }}>
          Thank you. Your enquiry has been received. We&apos;ll review the details and respond through the contact information you provided.
        </div>
        <p className="form-note" style={{ marginTop: 16 }}>
          A confirmation and copy has been delivered to our team at {site.email}. If you need immediate assistance, you can also email us directly at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="audit-form form-dark" onSubmit={onSubmit} noValidate>
      {/* Honeypot field for spam bots */}
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

      <div>
        <label htmlFor="c-name">Full name *</label>
        <input id="c-name" name="name" type="text" autoComplete="name" required placeholder="Your name" disabled={isSubmitting} />
      </div>
      <div>
        <label htmlFor="c-email">Work email *</label>
        <input id="c-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" disabled={isSubmitting} />
      </div>
      <div>
        <label htmlFor="c-company">Company or organisation</label>
        <input id="c-company" name="company" type="text" autoComplete="organization" placeholder="Company name" disabled={isSubmitting} />
      </div>
      <div>
        <label htmlFor="c-website">Website or product URL</label>
        <input id="c-website" name="website" type="text" inputMode="url" placeholder="yourwebsite.com (optional)" disabled={isSubmitting} />
      </div>
      <div>
        <label htmlFor="c-country">Country and time zone</label>
        <input id="c-country" name="country" type="text" placeholder="e.g. United Kingdom (GMT)" disabled={isSubmitting} />
      </div>
      <div>
        <label htmlFor="c-help">What would you like help with? *</label>
        <select id="c-help" name="help" disabled={isSubmitting}>{HELP_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>
      </div>
      <div>
        <label htmlFor="c-investment">Approximate project investment</label>
        <select id="c-investment" name="investment" disabled={isSubmitting}>{INVESTMENT_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>
      </div>
      <div>
        <label htmlFor="c-start">Desired start</label>
        <select id="c-start" name="start" disabled={isSubmitting}>{START_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>
      </div>
      <div className="full">
        <label htmlFor="c-goals">What are you trying to achieve? *</label>
        <textarea id="c-goals" name="goals" required placeholder="Tell us about the current challenge, desired outcome and any existing systems or campaigns." disabled={isSubmitting} />
      </div>
      <div className="full">
        <label htmlFor="c-brief">Link to a brief or supporting document</label>
        <input id="c-brief" name="brief" type="text" inputMode="url" placeholder="https://… (optional)" disabled={isSubmitting} />
      </div>
      <div className="check-row">
        <input id="c-privacy" name="privacy" type="checkbox" disabled={isSubmitting} />
        <label htmlFor="c-privacy">I understand DigitalFalconz will use my details to respond to this enquiry, as described in its <a href="/privacy-policy">Privacy Policy</a>. *</label>
      </div>
      <button className="btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending enquiry..." : "Send project enquiry"}
      </button>
      <p className="form-note">
        Your enquiry is delivered directly to our senior team and CRM. We respect your privacy and will never share your information.
      </p>
      {status && <div className={`form-status show${isError ? " error" : ""}`} role="status">{status}</div>}
    </form>
  );
}
