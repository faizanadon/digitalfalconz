"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WORK_FILTERS, WORK_PROJECTS, type WorkProject } from "@/data/work";
import { CASE_STUDIES } from "@/data/caseStudies";

/** The first dashboard screenshot of a case study, used as the large
    image on its editorial feature card. */
function caseStudyImage(slug: string | undefined) {
  if (!slug) return null;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  return cs?.campaigns?.[0]?.image ?? null;
}

/** Uniform work cards: every image (photo or placeholder tile) is exactly
    16/10 via aspect-ratio + object-fit:cover, same size on every card. */
function WorkCard({ project }: { project: WorkProject }) {
  const isPortfolioLink = project.liveUrl?.includes("faizannawaz.vercel.app") ?? false;
  // WorkGrid is a client component, so a missing logo file is caught here:
  // the card falls back to the placeholder tile instead of a broken image.
  const [logoFailed, setLogoFailed] = useState(false);
  const logo = project.logo;
  const showLogo = !!logo && !logoFailed;
  return (
    <motion.article
      className="card work-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.21, 1] }}
    >
      <div className="work-card-media">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.description}`}
            width={800}
            height={500}
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        ) : showLogo && logo ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#fff",
              display: "grid",
              placeItems: "center",
              padding: 28,
            }}
          >
            <Image
              src={logo.src}
              alt={`${project.title} logo`}
              width={logo.width}
              height={logo.height}
              onError={() => setLogoFailed(true)}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "72%",
                maxHeight: "72%",
                objectFit: "contain",
              }}
            />
          </div>
        ) : (
          <div className="work-card-placeholder" aria-label={`${project.title} — no screenshot supplied`}>
            <div>
              <Image src="/logo-mark-hires.png" alt="" width={96} height={96} />
              <span>{project.title}</span>
              <small>{project.category} — {project.platform}</small>
            </div>
          </div>
        )}
      </div>
      <div className="work-card-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="work-tags">
          <span className="pill">{project.category}</span>
          <span className="pill">{project.platform}</span>
        </div>
        <p className="work-role">
          <strong>Role:</strong> {project.role}
        </p>
        {project.caseStudy && (
          <p className="work-live">
            <Link href={`/work/${project.caseStudy}`}>
              Read the case study
              <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </p>
        )}
        {project.liveUrl && (
          <p className="work-live">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {isPortfolioLink ? "View on Faizan's portfolio" : `Visit live site — ${project.liveLabel}`}
              <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </a>
          </p>
        )}
      </div>
    </motion.article>
  );
}

/** Editorial feature card (the Jonathan Whitfield reference): one large
    rounded white card per case study — number, serif title, italic
    platform line, description, case-study link — with a large dashboard
    image on the other side. Image and text alternate sides. */
function FeatureCard({ project, index }: { project: WorkProject; index: number }) {
  const img = caseStudyImage(project.caseStudy);
  const [logoFailed, setLogoFailed] = useState(false);
  const logo = project.logo;
  const showLogo = !!logo && !logoFailed;
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.article
      className={`work-ed-card${index % 2 === 1 ? " work-ed-flip" : ""}`}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.21, 1] }}
    >
      <div className="work-ed-copy">
        <span className="work-ed-num">{num}</span>
        <h3 className="work-ed-name">{project.title}</h3>
        <p className="work-ed-sub">
          <em>{project.platform}</em>
        </p>
        <p className="work-ed-desc">{project.description}</p>
        <div className="work-tags">
          <span className="pill">{project.category}</span>
          <span className="pill">{project.platform}</span>
        </div>
        <p className="work-role">
          <strong>Role:</strong> {project.role}
        </p>
        <p className="work-ed-links">
          {project.caseStudy && (
            <Link href={`/work/${project.caseStudy}`} className="work-ed-case">
              Read the case study
              <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="work-ed-live">
              Visit live site — {project.liveLabel}
              <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
            </a>
          )}
        </p>
      </div>
      <div className="work-ed-media">
        {img ? (
          <Image
            src={img.src}
            alt={`${project.title} — campaign dashboard`}
            width={img.width}
            height={img.height}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        ) : showLogo && logo ? (
          <div className="work-ed-logo">
            <Image
              src={logo.src}
              alt={`${project.title} logo`}
              width={logo.width}
              height={logo.height}
              onError={() => setLogoFailed(true)}
              style={{ width: "auto", height: "auto", maxWidth: "70%", maxHeight: "70%", objectFit: "contain" }}
            />
          </div>
        ) : (
          <div className="work-card-placeholder" aria-label={`${project.title} — no screenshot supplied`}>
            <div>
              <Image src="/logo-mark-hires.png" alt="" width={96} height={96} />
              <span>{project.title}</span>
              <small>{project.category} — {project.platform}</small>
            </div>
          </div>
        )}
        <Link
          href={project.caseStudy ? `/work/${project.caseStudy}` : "#"}
          className="work-ed-arrow"
          aria-label={`Open the ${project.title} case study`}
        >
          <ArrowUpRight size={20} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function WorkGrid() {
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? WORK_PROJECTS : WORK_PROJECTS.filter((p) => p.filter === filter);
  // Case studies lead as large editorial cards; everything else follows
  // in the compact grid. A filter with no case studies shows the grid only.
  const featured = shown.filter((p) => p.caseStudy);
  const rest = shown.filter((p) => !p.caseStudy);
  return (
    <>
      <div className="work-filters" role="group" aria-label="Filter projects by category">
        {WORK_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className="work-filter"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="work-count">
        Showing {shown.length} of {WORK_PROJECTS.length} projects
      </p>
      {featured.length > 0 && (
        <div className="work-ed-list">
          {featured.map((p, i) => (
            <FeatureCard key={p.title} project={p} index={i} />
          ))}
        </div>
      )}
      {rest.length > 0 && (
        <>
          {featured.length > 0 && (
            <h3 className="work-ed-more">More work</h3>
          )}
          <div className="work-grid">
            {rest.map((p) => (
              <WorkCard key={p.title} project={p} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
