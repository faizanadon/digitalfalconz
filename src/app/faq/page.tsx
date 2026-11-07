import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import Reveal from "@/components/Reveal";
import { TwoColumnHero } from "@/components/Motion";
import FaqAccordion from "@/components/FaqAccordion";
import { PageHeroGraphic } from "@/components/Graphics";
import { faqGroups, allFaqs } from "@/data/faqs";
import { pages } from "@/data/pages";
import { metaFor, site } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/faq");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function FaqPage() {
  const p = pages.faq;
  const intro = p.body.split(/^## /m)[0];
  const closing = p.body.split("## Still have a question?")[1] ?? "";
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1").replace(/\*\*/g, "") },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <TwoColumnHero kicker={p.kicker} title={p.h1} icon="help" graphic={<PageHeroGraphic page="faq" />}>
        <Markdown text={intro} />
        <p><Link className="btn" href="/contact">Ask a question</Link> <Link className="btn ghost" href="/services">Explore services</Link></p>
      </TwoColumnHero>
      <section className="tight">
        <div className="wrap">
          <Reveal>
            <FaqAccordion groups={faqGroups} searchable />
          </Reveal>
        </div>
      </section>
      <section style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Still have a question?</h2>
              <p>You don&rsquo;t need to decide which service fits before reaching out. Share the challenge, current setup and desired outcome — we can help clarify the options.</p>
            </div>
            <div className="side">
              <Link className="btn big" href="/contact" style={{ width: "100%", justifyContent: "center" }}>Contact DigitalFalconz</Link>
              <small>Email: <a href={`mailto:${site.email}`} style={{ color: "var(--gold-light)" }}>{site.email}</a><br />UK: {site.phoneUK} · US: {site.phoneUS}</small>
            </div>
          </div>
          {closing && <div style={{ marginTop: 28 }}><Markdown text={closing} /></div>}
        </div>
      </section>
    </>
  );
}
