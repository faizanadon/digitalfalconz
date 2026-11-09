import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, TwoColumnHero, Stagger } from "@/components/Motion";
import { metaFor } from "@/data/site";
import { TEMPLATES } from "@/data/templates";
import TemplateCard from "@/components/TemplateCard";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates-lev");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const INSIDE = [
  { title: "Statutory 14-month testing", text: "The 14-month rule explained in plain UK English, with the COSHH Regulation 9 duty and the automatic retest reminder." },
  { title: "Six services", text: "Thorough examination & testing, design & installation, repair & maintenance, air monitoring, duct cleaning and commissioning." },
  { title: "Eight sectors", text: "Manufacturing, woodworking, welding, automotive, food production, education, healthcare and pharmaceuticals." },
  { title: "Four-step process", text: "Book, on-site test, digital report in 48 hours, automatic reminder — a clear path from enquiry to compliance." },
  { title: "Trust & proof", text: "Count-up stats, client testimonials, the ILEVE / BOHS P601 / fully insured trust strip and a live ticking counter." },
  { title: "FAQ & quote form", text: "The five questions every facilities manager asks, plus a quote form with systems count, postcode and message." },
];

export default function TemplatesLevPage() {
  const lev = TEMPLATES.filter((t) => t.niche === "lev");
  const vent = lev[0];
  return (
    <>
      <TwoColumnHero
        kicker="Templates · LEV Testing & Compliance"
        title="LEV testing templates"
        graphic={
          <Image
            src={vent.image}
            alt="A woman engineer at industrial machinery — the VentSure LEV template preview"
            width={1200}
            height={800}
            sizes="(max-width: 1100px) 100vw, 45vw"
            style={{ width: "100%", height: "auto", borderRadius: 18, display: "block" }}
            priority
          />
        }
      >
        <p className="lede">
          <strong>One serious industrial template for LEV testing companies.</strong>
        </p>
        <p className="plain-p">
          VentSure is a complete website for a local exhaust ventilation
          testing company: statutory 14-month testing under COSHH Regulation
          9, services, sectors, a 4-step process, testimonials, FAQ and a
          quote form. Built in the Framer design language — huge grotesque
          headlines, mono labels, a scrolling ticker and black-and-white
          industrial photography — with LocalBusiness and FAQ schema built in.
        </p>
        <p>
          <Link className="btn" href="/contact">
            Ask about a template
          </Link>{" "}
          <Link className="btn ghost" href="/templates">
            ← All templates
          </Link>
        </p>
      </TwoColumnHero>

      <section className="tight">
        <div className="wrap">
          <Reveal>
            <h2>LEV templates</h2>
            <p className="plain-p">
              One template live in this niche today — VentSure. A complete,
              working site you can walk through before you commit.
            </p>
          </Reveal>
          <Stagger className="card-grid">
            {lev.map((t) => (
              <TemplateCard key={t.slug} t={t} />
            ))}
          </Stagger>

          <Reveal>
            <h2 style={{ marginTop: 56 }}>What&apos;s inside the VentSure template</h2>
            <p className="plain-p">
              Everything a LEV testing company needs to turn a visit into an
              enquiry.
            </p>
          </Reveal>
          <Stagger className="card-grid">
            {INSIDE.map((f) => (
              <article className="card" key={f.title}>
                <div className="work-card-body">
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </article>
            ))}
          </Stagger>

          <Reveal>
            <p className="plain-p" style={{ marginTop: 28 }}>
              Need a template for another industrial or compliance business?
              Tell us the trade and we will build the next one around it.
            </p>
            <p>
              <Link className="btn" href="/contact">
                Request a template
              </Link>{" "}
              <Link className="btn ghost" href="/templates-retreats">
                See the retreat templates →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
