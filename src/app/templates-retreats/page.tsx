import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, TwoColumnHero, Stagger } from "@/components/Motion";
import { metaFor } from "@/data/site";
import { TEMPLATES } from "@/data/templates";
import TemplateCard from "@/components/TemplateCard";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates-retreats");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const INCLUDED = [
  { title: "Real photography", text: "Every template is built around verified, real photography — not stock placeholders." },
  { title: "Booking & enquiry flows", text: "Packages, availability and booking or enquiry forms that match how guests actually decide." },
  { title: "Galleries & experiences", text: "Image-led sections that show the place, the people and the day, not just describe it." },
  { title: "Testimonials & trust", text: "Guest voices, stats and the details that make a first-time visitor feel safe to book." },
  { title: "Tailored to your business", text: "We swap in your words, photos and colours — the structure is proven, the identity is yours." },
  { title: "Mobile-first & fast", text: "Built to load quickly and read beautifully on a phone, where most guests will find you." },
];

export default function TemplatesRetreatsPage() {
  const retreats = TEMPLATES.filter((t) => t.niche === "retreats");
  return (
    <>
      <TwoColumnHero
        kicker="Templates · Retreats"
        title="Retreat & hospitality templates"
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
          <strong>Thirteen finished designs for retreats, wellness and hospitality.</strong>
        </p>
        <p className="plain-p">
          From a Bali retreat to a yoga studio, a restaurant, a gym, a salon,
          a mountain lodge, a desert retreat, a surf retreat, a glamping
          retreat and a vineyard retreat — each template is a complete website
          with real photography, a booking flow and the sections guests
          actually look for. Pick one, preview it live, and we tailor the
          words, photos and colours to your business.
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
            <h2>Retreat templates</h2>
            <p className="plain-p">
              Thirteen templates live in this niche today — a Bali retreat, a
              yoga studio, a Melbourne yoga &amp; breathwork studio, a fine-dining restaurant, a real-estate agency, a
              gym, an interior-design studio, a beauty salon &amp; spa, a
              mountain lodge, a desert retreat, a surf retreat, a glamping
              retreat and a vineyard retreat. Each one is a complete, working
              site you can walk through before you commit.
            </p>
          </Reveal>
          <Stagger className="card-grid">
            {retreats.map((t) => (
              <TemplateCard key={t.slug} t={t} />
            ))}
          </Stagger>

          <Reveal>
            <h2 style={{ marginTop: 56 }}>What&apos;s inside every retreat template</h2>
            <p className="plain-p">
              The details differ by business, but the standard is the same
              across all thirteen.
            </p>
          </Reveal>
          <Stagger className="card-grid">
            {INCLUDED.map((f) => (
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
              Want a template for a different kind of retreat or hospitality
              business? Tell us the business and we will build the next one
              around it.
            </p>
            <p>
              <Link className="btn" href="/contact">
                Request a template
              </Link>{" "}
              <Link className="btn ghost" href="/templates-lev">
                See the LEV template →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
