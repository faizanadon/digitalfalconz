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

/** Editorial feature card (the Jonathan Whitfield reference): one large
    rounded card per project — number + category label, bold title,
    description, outlined pills, case-study / live-site links — with a
    large image on the other side. Image and text alternate sides.
    Media priority: case-study dashboard screenshot → project screenshot
    → brand logo on a white tile → placeholder tile. */
function FeatureCard({ project, index }: { project: WorkProject; index: number }) {
  const img = caseStudyImage(project.caseStudy);
  const cs = CASE_STUDIES.find((c) => c.slug === project.caseStudy);
  const campaignCount = cs?.campaigns?.length ?? 0;
  const [logoFailed, setLogoFailed] = useState(false);
  const logo = project.logo;
  const showLogo = !!logo && !logoFailed;
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.article
      className={`work-ed-card${index % 2 === 0 ? " work-ed-flip" : ""}`}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.21, 1] }}
    >
      <div className="work-ed-copy">
        <span className="work-ed-num">
          {num} — {project.category}
        </span>
        <h3 className="work-ed-name">{project.title}</h3>
        <p className="work-ed-desc">{project.description}</p>
        <div className="work-tags">
          <span className="pill">{project.category}</span>
          <span className="pill">{project.platform}</span>
          {campaignCount > 0 && (
            <span className="pill">
              {campaignCount} campaign{campaignCount === 1 ? "" : "s"}
            </span>
          )}
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
        ) : project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.description}`}
            width={800}
            height={500}
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
          href={project.caseStudy ? `/work/${project.caseStudy}` : project.liveUrl ?? "#"}
          className="work-ed-arrow"
          aria-label={`Open ${project.title}`}
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
      <div className="work-ed-list">
        {shown.map((p, i) => (
          <FeatureCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </>
  );
}
