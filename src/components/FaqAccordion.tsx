"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "./Markdown";
import type { FaqGroup } from "@/data/faqs";

export default function FaqAccordion({ groups, searchable = false }: { groups: FaqGroup[]; searchable?: boolean }) {
  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((it) => (it.q + " " + it.a).toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [groups, query]);
  const total = filtered.reduce((n, g) => n + g.items.length, 0);
  return (
    <div>
      {searchable && (
        <div>
          <label htmlFor="faq-search" className="mono" style={{ display: "block", marginBottom: 8 }}>Search the FAQs</label>
          <input
            id="faq-search"
            className="faq-search"
            type="search"
            placeholder="Try “pricing”, “AI agents”, “SEO”…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p className="plain-p" style={{ marginTop: 12 }}>
            {query ? `${total} answer${total === 1 ? "" : "s"} matching “${query}”.` : "40 answers, grouped by topic."}
          </p>
        </div>
      )}
      {filtered.length === 0 && <p className="plain-p">No answers match that search. Try a different word, or <a href="/contact">ask us directly</a>.</p>}
      {filtered.map((g) => (
        <div key={g.group}>
          <motion.h3 className="faq-group-title" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{g.group}</motion.h3>
          <div className="faq-list motion-faq">
            {g.items.map((it, i) => {
              const key = `${g.group}-${i}`;
              const isOpen = openKey === key || (!query && openKey === null && i === 0 && g.group === groups[0]?.group);
              return (
                <div className="faq" key={key}>
                  <button className="faq-btn" type="button" aria-expanded={isOpen} onClick={() => setOpenKey(isOpen ? `closed-${key}` : key)}>
                    <span>{it.q}</span>
                    <motion.span className="faq-plus" animate={{ rotate: isOpen ? 45 : 0 }} aria-hidden="true">+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 0.61, 0.21, 1] }} style={{ overflow: "hidden" }}>
                        <div className="a"><Markdown text={it.a} /></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
