import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/Motion";
import { MotionDivider, WorkDocGraphic, PageHeroGraphic } from "@/components/Graphics";
import WorkGrid from "@/components/WorkGrid";
import { PORTFOLIO_URL } from "@/data/work";
import { pages } from "@/data/pages";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/work");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function WorkPage() {
  const p = pages.work;
  return (
    <>
      <PageHero kicker={p.kicker} title={p.h1} icon="briefcase" enter="left"
        lede={<><p className="lede">A finished website, campaign or application is only part of the story. The more important questions are why it was created, who it serves and how it supports the business behind it.</p><p><Link className="btn" href="/contact">Discuss a project</Link> <Link className="btn ghost" href="/services">Explore services</Link></p></>}
      />
      <div className="wrap">
        <Reveal>
          <div className="notice">
            <p><strong>Selected work by Faizan Nawaz (founder).</strong> These 22 projects were delivered across client engagements and independent products, and are sourced from his portfolio at <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">faizannawaz.vercel.app/work</a>. DigitalFalconz documents work by challenge, decisions, delivery, evidence and role — the five lenses below.</p>
          </div>
        </Reveal>
      </div>
      <div className="wrap">
        <Reveal>
          <h2 style={{ marginTop: 8 }}>Selected projects</h2>
          <p className="plain-p">Twenty-two projects, each named, with the live site and the role Faizan played. Every image is shown at the same size.</p>
          <WorkGrid />
        </Reveal>
      </div>
      <div className="wrap">
        <Reveal><PageHeroGraphic page="work" /></Reveal>
      </div>
      <div className="wrap">
        <Reveal>
          <MotionDivider />
          <h2 style={{ marginTop: 8 }}>How every project is documented</h2>
          <p className="plain-p">Five lenses, applied to every engagement — so you can judge the thinking, not just the finished piece.</p>
          <WorkDocGraphic />
        </Reveal>
      </div>
      <section className="tight">
        <div className="wrap">
          <Reveal>
            <Markdown text={p.body} />
          </Reveal>
          <p style={{ marginTop: 28 }}><Link className="btn" href="/contact">Tell us what you&rsquo;re building</Link></p>
        </div>
      </section>
    </>
  );
}
