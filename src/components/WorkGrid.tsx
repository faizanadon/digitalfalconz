"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WORK_FILTERS, WORK_PROJECTS, type WorkProject } from "@/data/work";

/** Uniform work cards: every image (photo or placeholder tile) is exactly
    16/10 via aspect-ratio + object-fit:cover, same size on every card. */
function WorkCard({ project }: { project: WorkProject }) {
  const isPortfolioLink = project.liveUrl.includes("faizannawaz.vercel.app");
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
        <p className="work-live">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            {isPortfolioLink ? "View on Faizan's portfolio" : `Visit live site — ${project.liveLabel}`}
            <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
          </a>
        </p>
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
      <div className="work-grid">
        {shown.map((p) => (
          <WorkCard key={p.title} project={p} />
        ))}
      </div>
    </>
  );
}
