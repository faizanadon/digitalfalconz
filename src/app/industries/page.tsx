import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import Reveal from "@/components/Reveal";
import { TwoColumnHero, Stagger, StaggerItem } from "@/components/Motion";
import { Flame, ShieldCheck, Leaf, Droplets, Bug, Briefcase, Cloud, ShoppingBag, HeartPulse, KeyRound, Factory, Rocket, Building2 } from "lucide-react";
import { PageHeroGraphic } from "@/components/Graphics";
import { pages } from "@/data/pages";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/industries");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const INDUSTRY_HEADINGS = [
  "Commercial HVAC & building services",
  "Fire, Security & Access Control",
  "Commercial Waste, Facilities & Environmental Services",
  "Water Hygiene, Compliance & Specialist Technical Services",
  "Commercial Pest Control & Field Services",
  "B2B & Professional Services",
  "SaaS & Technology Companies",
  "E-commerce & Consumer Brands",
  "Healthcare, Wellness & Appointment-Led Businesses",
  "Real Estate, Property & Construction",
  "Manufacturing, Distribution & Industrial B2B",
  "Startups & Emerging Brands",
];

const INDUSTRY_ICONS: Record<string, typeof Building2> = {
  "Commercial HVAC & building services": Flame,
  "Fire, Security & Access Control": ShieldCheck,
  "Commercial Waste, Facilities & Environmental Services": Leaf,
  "Water Hygiene, Compliance & Specialist Technical Services": Droplets,
  "Commercial Pest Control & Field Services": Bug,
  "B2B & Professional Services": Briefcase,
  "SaaS & Technology Companies": Cloud,
  "E-commerce & Consumer Brands": ShoppingBag,
  "Healthcare, Wellness & Appointment-Led Businesses": HeartPulse,
  "Real Estate, Property & Construction": KeyRound,
  "Manufacturing, Distribution & Industrial B2B": Factory,
  "Startups & Emerging Brands": Rocket,
};
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function IndustriesPage() {
  const p = pages.industries;
  return (
    <>
      <TwoColumnHero kicker={p.kicker} title={p.h1} icon="building" graphic={<PageHeroGraphic page="industries" />}>
        <p className="lede"><strong>Different buying decisions require different digital systems.</strong></p>
        <p className="plain-p">A service-survey enquiry, a SaaS trial and an e-commerce purchase do not follow the same journey. We adapt acquisition channels, digital experiences, data flows and automation to the way your customers make decisions — and to the operating constraints of your business.</p>
        <p className="plain-p">The industries below represent relevant use cases, not claims of sector certifications or published case studies. We assess each engagement on its requirements, access to appropriate expertise and practical delivery fit.</p>
        <p><Link className="btn" href="/contact">Discuss your industry</Link> <Link className="btn ghost" href="/services">View our services</Link></p>
      </TwoColumnHero>
      <div className="wrap">
        <Stagger className="card-grid industry-grid" aria-label="Industries">
          {INDUSTRY_HEADINGS.map((h) => { const Ico = INDUSTRY_ICONS[h] ?? Building2; return (
            <StaggerItem key={h}><a className="card industry-card" href={`#${slugify(h)}`}><span className="svc-icon" aria-hidden="true"><Ico size={20} strokeWidth={1.9} /></span><strong>{h}</strong></a></StaggerItem>
          ); })}
        </Stagger>
      </div>
      <section className="tight">
        <div className="wrap">
          <Reveal>
            <Markdown text={p.body} />
          </Reveal>
        </div>
      </section>
      <section style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Build around the way your customers buy.</h2>
              <p>If you&rsquo;re facing a challenge involving customer acquisition, digital experience, software or automation, let&rsquo;s explore whether we&rsquo;re the right fit.</p>
            </div>
            <div className="side">
              <Link className="btn big" href="/contact" style={{ width: "100%", justifyContent: "center" }}>Discuss your industry requirements</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
