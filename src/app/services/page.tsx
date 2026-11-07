import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import { Reveal, TwoColumnHero, Stagger, StaggerItem, ServiceIconTile, CtaArrow } from "@/components/Motion";
import { PageHeroGraphic } from "@/components/Graphics";
import { pages } from "@/data/pages";
import { metaFor } from "@/data/site";
import { servicesByCategory, serviceIcon, serviceShortLabel } from "@/data/serviceIcons";

export const metadata: Metadata = (() => {
  const m = metaFor("/services");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function ServicesPage() {
  const p = pages.servicesIndex;
  const groups = servicesByCategory();
  return (
    <>
      <TwoColumnHero kicker={p.kicker} title={p.h1} icon="grid" graphic={<PageHeroGraphic page="services" />}>
        <p className="lede"><strong>Specialist expertise. Connected when it matters.</strong></p>
        <p className="plain-p">Choose the capabilities your business needs now — and connect them when a wider challenge requires more than one discipline. DigitalFalconz brings customer acquisition, websites and software, AI-enabled operations, branding and creative, analytics and optimisation under one approach.</p>
        <p className="plain-p">Our services are organised around how they contribute to the customer journey, not simply the tools used to deliver them.</p>
        <p><Link className="btn" href="/contact">Discuss your requirements</Link> <Link className="btn ghost" href="/work">See our work</Link></p>
      </TwoColumnHero>
      <div className="wrap" style={{ paddingBottom: 16 }}>
        <div className="pill-row" aria-label="Service categories">
          {groups.map((g) => (
            <a className="pill" key={g.category} href={`#${g.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{g.category} ({g.services.length})</a>
          ))}
        </div>
      </div>
      {groups.map((g) => (
        <section key={g.category} id={g.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="tight">
          <div className="wrap cat-block">
            <Reveal>
              <h2>{g.category}</h2>
              <p className="plain-p">{g.services.length} services.</p>
            </Reveal>
            <Stagger className="card-grid">
              {g.services.map((s) => {
                const item = (p.categories ?? []).flatMap((c) => c.items).find((it) => it.href === `/services/${s.slug}`);
                return (
                  <StaggerItem key={s.slug}>
                    <article className="card svc-card">
                      <ServiceIconTile slug={s.slug} />
                      <span className="tag">{g.category}</span>
                      <h3><Link href={`/services/${s.slug}`}>{serviceShortLabel(s.slug)}</Link></h3>
                      <p>{item?.desc ?? s.description}</p>
                      <p style={{ marginTop: 14 }}><Link href={`/services/${s.slug}`}>Learn more <CtaArrow /></Link></p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      ))}
      {(p.extraSections ?? []).map((s) => (
        <section key={s.heading} className="tight">
          <div className="wrap">
            <Reveal>
              <h2>{s.heading}</h2>
              <Markdown text={s.body} />
            </Reveal>
          </div>
        </section>
      ))}
      <section className="tight">
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Not sure which capability you need first?</h2>
                <p>Start with the business challenge. We&rsquo;ll recommend the capabilities that will make the greatest practical difference — not every service at once.</p>
              </div>
              <div className="side">
                <Link className="btn big" href="/contact" style={{ width: "100%", justifyContent: "center" }}>Discuss your project</Link>
                <small>Or start with a <Link href="/contact#enquiry-form">free growth audit</Link>.</small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
