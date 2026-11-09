import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, TwoColumnHero, Stagger } from "@/components/Motion";
import { metaFor } from "@/data/site";
import { TEMPLATES } from "@/data/templates";
import TemplateCard from "@/components/TemplateCard";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function TemplatesPage() {
  const retreats = TEMPLATES.filter((t) => t.niche === "retreats");
  const lev = TEMPLATES.filter((t) => t.niche === "lev");
  return (
    <>
      <TwoColumnHero
        kicker="Templates"
        title="Website templates, ready to make yours"
        graphic={
          <Image
            src={TEMPLATES[0].image}
            alt="Tegalalang rice terraces, Ubud, Bali — the Bali retreat template preview"
            width={1200}
            height={800}
            sizes="(max-width: 1100px) 100vw, 45vw"
            style={{ width: "100%", height: "auto", borderRadius: 18, display: "block" }}
            priority
          />
        }
      >
        <p className="lede">
          <strong>Start from a finished design, not a blank page.</strong>
        </p>
        <p className="plain-p">
          Every template below is a complete website — design, copy structure,
          imagery and booking flow — built to a premium standard. Pick one,
          preview it live, and we tailor the words, photos and colours to your
          business.
        </p>
        <p>
          <Link className="btn" href="/contact">
            Ask about a template
          </Link>{" "}
          <Link className="btn ghost" href="/work">
            See our work
          </Link>
        </p>
      </TwoColumnHero>

      <section className="tight">
        <div className="wrap">
          <Reveal>
            <h2>Available templates</h2>
            <p className="plain-p">
              Two niches live today — Retreats and LEV Testing &amp; Compliance —
              with more niches on the way. Each template is a complete, working
              site you can walk through before you commit.
            </p>
          </Reveal>
          <div className="cat-block">
            <Reveal>
              <h2>Retreats</h2>
              <p className="plain-p">
                Retreat, wellness and hospitality templates — from a Bali retreat
                to a yoga studio, a restaurant, a gym and a salon.
              </p>
            </Reveal>
            <Stagger className="card-grid">
              {retreats.map((t) => (
                <TemplateCard key={t.slug} t={t} />
              ))}
            </Stagger>
            <Reveal>
              <p className="plain-p" style={{ marginTop: 20 }}>
                <Link href="/templates-retreats">See all retreat templates →</Link>
              </p>
            </Reveal>
          </div>
          <div className="cat-block">
            <Reveal>
              <h2>LEV Testing &amp; Compliance</h2>
              <p className="plain-p">
                A clean, serious industrial template for a LEV testing company —
                statutory 14-month testing, services, sectors and a quote form.
              </p>
            </Reveal>
            <Stagger className="card-grid">
              {lev.map((t) => (
                <TemplateCard key={t.slug} t={t} />
              ))}
            </Stagger>
            <Reveal>
              <p className="plain-p" style={{ marginTop: 20 }}>
                <Link href="/templates-lev">See the LEV template →</Link>
              </p>
            </Reveal>
          </div>
          <Reveal>
            <p className="plain-p" style={{ marginTop: 28 }}>
              Want a template for a different kind of business — a restaurant, a
              salon, a clinic, a hotel? Tell us the business and we will build
              the next one around it.
            </p>
            <p>
              <Link className="btn" href="/contact">
                Request a template
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
