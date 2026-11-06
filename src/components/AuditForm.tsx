"use client";
import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

const NEEDS = [
  "Free growth audit", "Performance Marketing", "Lead Generation Systems", "AI Automation",
  "AI Agents, Chatbots & Voice", "CRM Integration & Automation", "Sales Funnels & Landing Pages",
  "Web Development & Web Apps", "Conversion Rate Optimization", "The full system — not sure yet",
];

/** Front-end only (no backend yet): validates, then opens the visitor's email
    app with a pre-filled message to contact@digitalfalconz.com. */
export default function AuditForm() {
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const goals = String(fd.get("goals") ?? "").trim();
    if (!name || !email || !goals) {
      setIsError(true);
      setStatus("Please fill in your name, work email and goals so we can reply with something specific.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsError(true);
      setStatus("That email address doesn’t look complete — check it and try again.");
      return;
    }
    const company = String(fd.get("company") ?? "").trim();
    const website = String(fd.get("website") ?? "").trim();
    const need = String(fd.get("need") ?? "Free growth audit");
    const budget = String(fd.get("budget") ?? "").trim();
    const lines = [
      `Name: ${name}`, `Work email: ${email}`,
      company ? `Company: ${company}` : null,
      website ? `Website: ${website}` : null,
      `What I need: ${need}`,
      budget ? `Monthly growth budget: ${budget}` : null,
      "", "My goals:", goals,
    ].filter((l) => l !== null).join("\n");
    const subject = encodeURIComponent(`Free growth audit — ${name}${company ? ` (${company})` : ""}`);
    setIsError(false);
    setSent(true);
    setStatus(`Opening your email app with your audit request addressed to ${site.email}. If nothing opens, write to us directly at that address.`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(lines)}`;
  }

  return (
    <form className="audit-form" onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="f-name">Full name *</label>
        <input id="f-name" name="name" type="text" autoComplete="name" required placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="f-email">Work email *</label>
        <input id="f-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
      </div>
      <div>
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" type="text" autoComplete="organization" placeholder="Company name" />
      </div>
      <div>
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" inputMode="url" placeholder="yourwebsite.com" />
      </div>
      <div>
        <label htmlFor="f-need">What do you need?</label>
        <select id="f-need" name="need">{NEEDS.map((n) => <option key={n}>{n}</option>)}</select>
      </div>
      <div>
        <label htmlFor="f-budget">Monthly growth budget</label>
        <input id="f-budget" name="budget" type="text" placeholder="Optional — a rough idea helps us prioritise" />
      </div>
      <div className="full">
        <label htmlFor="f-goals">Your goals *</label>
        <textarea id="f-goals" name="goals" required placeholder="Where are you now, and where do you need to be?" />
      </div>
      <button className="btn" type="submit">{sent ? "Audit request ready — check your email app" : "Request my free audit"}</button>
      <p className="form-note">
        This opens your email app with everything pre-filled to {site.email}. No spam, no retainers-by-pressure — your details stay with our strategy team.
      </p>
      {status && <div className={`form-status show${isError ? " error" : ""}`} role="status">{status}</div>}
    </form>
  );
}
