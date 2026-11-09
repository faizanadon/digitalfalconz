import Image from "next/image";
import Link from "next/link";
import { StaggerItem } from "@/components/Motion";
import type { TemplateEntry } from "@/data/templates";

/** One template card, as used on /templates and the niche pages. */
export default function TemplateCard({ t }: { t: TemplateEntry }) {
  return (
    <StaggerItem key={t.slug}>
      <article className="card work-card">
        <div className="work-card-media">
          <Image
            src={t.image}
            alt={`${t.name} — ${t.tagline}`}
            width={800}
            height={500}
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        </div>
        <div className="work-card-body">
          <h3>{t.name}</h3>
          <p>{t.description}</p>
          <div className="work-tags">
            <span className="pill">{t.category}</span>
          </div>
          <p className="work-live">
            <Link href={t.href}>View the live template →</Link>
          </p>
        </div>
      </article>
    </StaggerItem>
  );
}
