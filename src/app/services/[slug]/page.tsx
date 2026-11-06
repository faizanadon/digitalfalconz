import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import Reveal from "@/components/Reveal";
import { MotionFaq, ServiceIconTile, Stagger, StaggerItem } from "@/components/Motion";
import {
  ServiceHeroGraphic, JourneyDiagram, ProcessTimeline,
} from "@/components/Graphics";
import { capabilityIcon } from "@/data/capabilityIcons";
import { services, serviceBySlug } from "@/data/services";
import { serviceIcon, serviceShortLabel } from "@/data/serviceIcons";
import { site } from "@/data/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = serviceBySlug(params.slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: s.canonical },
    openGraph: { title: s.title, description: s.description, url: s.canonical, type: "website" },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = serviceBySlug(params.slug);
  if (!s) notFound();
  const Icon = serviceIcon(s.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.h1,
    description: s.description,
    provider: { "@type": "Organization", name: "DigitalFalconz", url: site.domain },
    areaServed: ["GB", "US", "CA"],
    url: s.canonical,
  };
  // Approach as a scroll-fill timeline (same shape as the home process).
  const approachSteps = s.approach.map((a, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: a.label ? a.label.replace(/\.$/, "") : `Step ${i + 1}`,
    text: a.text || a.label,
  }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* HERO — copy left, per-service animated graphic right */}
      <div className="wrap page-hero svc-hero">
        <Reveal>
          <p className="breadcrumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / {s.category}</p>
          <div className="svc-hero-grid">
            <div>
              <div className="svc-hero-top">
                <span className="svc-hero-tile" aria-hidden="true"><Icon size={38} strokeWidth={1.8} /></span>
                <div>
                  <span className="mono kicker">{s.kicker || `${s.category} / DigitalFalconz`}</span>
                  <h1>{s.h1}</h1>
                </div>
              </div>
              <span className="hero-rule" aria-hidden="true" />
              <div className="service-meta"><span className="pill">{s.category}</span><span className="pill">{serviceShortLabel(s.slug)}</span></div>
              <Markdown text={s.intro} />
              <p style={{ marginTop: 20 }}>
                <Link className="btn" href="/contact">Discuss this service</Link>{" "}
                <Link className="btn ghost" href="/services">View all services</Link>
              </p>
            </div>
            <ServiceHeroGraphic slug={s.slug} />
          </div>
        </Reveal>
      </div>

      <section className="tight">
        <div className="wrap">
          <Reveal>
            <h2>The business challenge</h2>
            <Markdown text={s.challenge} />
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES — every row gets its OWN distinct icon */}
      <section className="tight">
        <div className="wrap">
          <Reveal>
            <h2>Capabilities and deliverables</h2>
          </Reveal>
          <Stagger className="cap-grid">
            {s.capabilities.map((c, i) => {
              const CapIcon = capabilityIcon(c.label || c.text, i);
              return (
                <StaggerItem key={c.label + c.text}>
                  <div className="cap-item">
                    <span className="svc-icon cap-item-icon" aria-hidden="true"><CapIcon size={18} strokeWidth={1.9} /></span>
                    <div>{c.label ? <><strong>{c.label}:</strong> {c.text}</> : c.text}</div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* APPROACH — animated scroll-fill timeline */}
      <section className="tight">
        <div className="wrap">
          <Reveal>
            <h2>Approach and delivery</h2>
          </Reveal>
          {approachSteps.length > 0 && <ProcessTimeline steps={approachSteps} />}
          {s.approachExtra && <Reveal><Markdown text={s.approachExtra} /></Reveal>}
        </div>
      </section>

      {/* CONNECTED JOURNEY — animated diagram + evaluation */}
      <section className="tight">
        <div className="wrap">
          <Reveal>
            <h2>Connected to the wider customer journey</h2>
            <JourneyDiagram steps={[
              { label: "Discover", sub: "found via search & AI" },
              { label: "Decide", sub: "clear next step" },
              { label: "Enquire", sub: "captured in the CRM" },
              { label: "Grow", sub: "follow-up & measurement" },
            ]} />
            <Markdown text={s.connected} />
            <h2 style={{ marginTop: 40 }}>How we evaluate progress</h2>
            <Markdown text={s.evaluation} />
          </Reveal>
        </div>
      </section>

      {s.faqs.length > 0 && (
        <section className="tight">
          <div className="wrap">
            <Reveal>
              <h2>Frequently asked questions</h2>
              <MotionFaq items={s.faqs.map((f) => ({ q: f.q, a: <Markdown text={f.a} /> }))} />
            </Reveal>
          </div>
        </section>
      )}

      {s.extra.map((e) => (
        <section key={e.heading} className="tight">
          <div className="wrap">
            <Reveal>
              <h2>{e.heading}</h2>
              <Markdown text={e.body} />
            </Reveal>
          </div>
        </section>
      ))}

      {s.related.length > 0 && (
        <section className="tight">
          <div className="wrap">
            <Reveal>
              <h2>Related capabilities</h2>
              <div className="pill-row">
                {s.related.map((r) => <Link className="pill" key={r.href} href={r.href}>{r.label}</Link>)}
              </div>
              <div className="card-grid" style={{ marginTop: 24 }}>
                {s.related.map((r) => {
                  const slug = r.href.replace("/services/", "");
                  const rel = serviceBySlug(slug);
                  if (!rel) return null;
                  return (
                    <article className="card svc-card" key={r.href}>
                      <ServiceIconTile slug={slug} />
                      <h3><Link href={r.href}>{serviceShortLabel(slug)}</Link></h3>
                      <p>{rel.description}</p>
                    </article>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="tight">
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Review your {s.category.toLowerCase()} opportunities.</h2>
                <p>Start a scoped conversation — tell us the challenge and we&rsquo;ll discuss an approach matched to your business.</p>
              </div>
              <div className="side">
                <Link className="btn big" href="/contact" style={{ width: "100%", justifyContent: "center" }}>Start a scoped conversation</Link>
                <small>Or email <a href={`mailto:${site.email}`} style={{ color: "var(--gold-light)" }}>{site.email}</a></small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
