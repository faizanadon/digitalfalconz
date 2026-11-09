import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { CASE_STUDIES, caseStudyBySlug } from "@/data/caseStudies";
import { site } from "@/data/site";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = caseStudyBySlug(params.slug);
  if (!cs) return {};
  const title = `${cs.brand} — Paid Media Case Study | DigitalFalconz`;
  const description = `${cs.brand} (${cs.industry}): paid media campaigns across ${cs.channels.join(", ")} — the challenge and what we achieved.`;
  const canonical = `${site.domain}/work/${cs.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudyBySlug(params.slug);
  if (!cs) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${cs.brand} — Paid Media Case Study`,
    description: cs.overview,
    author: { "@type": "Organization", name: "DigitalFalconz", url: site.domain },
    url: `${site.domain}/work/${cs.slug}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap page-hero">
        <Reveal>
          <p className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/work">Work</Link> / {cs.brand}
          </p>
          <span className="mono kicker">Case Study — Paid Media</span>
          <h1>{cs.brand}</h1>
          <div className="pill-row">
            <span className="pill">{cs.industry}</span>
            {cs.location && <span className="pill">{cs.location}</span>}
            {cs.channels.map((ch) => (
              <span className="pill" key={ch}>{ch}</span>
            ))}
          </div>
          <p className="lede">{cs.overview}</p>
          <p style={{ marginTop: 20 }}>
            <Link className="btn" href="/contact">Discuss a project</Link>{" "}
            <Link className="btn ghost" href="/work">View all work</Link>
          </p>
          {cs.liveUrl && (
            <p style={{ marginTop: 16 }}>
              <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit live site — {cs.liveLabel}
                <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
              </a>
            </p>
          )}
        </Reveal>
      </div>

      <section className="tight">
        <div className="wrap">
          <Reveal>
            <h2>The campaigns</h2>
            <p className="plain-p">
              {cs.campaigns.length} campaign{cs.campaigns.length === 1 ? "" : "s"} across {cs.channels.join(", ")} — each with the challenge we faced and what we achieved.
            </p>
          </Reveal>
          <div style={{ display: "grid", gap: 18, marginTop: 28 }}>
            {cs.campaigns.map((c, i) => (
              <Reveal key={`${c.channel}-${c.period}-${i}`}>
                <article className="card">
                  <span className="tag">{c.channel} · {c.period}</span>
                  <h3>{c.headline}</h3>
                  <p><strong>The challenge.</strong> {c.challenge}</p>
                  <p style={{ marginTop: 12 }}><strong>What we achieved.</strong> {c.achievement}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Want results like these?</h2>
                <p>Tell us the challenge and we&rsquo;ll discuss an approach matched to your business.</p>
              </div>
              <div className="side">
                <Link className="btn big" href="/contact" style={{ width: "100%", justifyContent: "center" }}>Discuss your project</Link>
                <small>Or email <a href={`mailto:${site.email}`} style={{ color: "var(--gold-light)" }}>{site.email}</a></small>
              </div>
            </div>
            <p style={{ marginTop: 28 }}>
              <Link href="/work">&larr; Back to all work</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
