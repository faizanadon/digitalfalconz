"use client";
import { useState } from "react";

const TABS = [
  {
    id: "found",
    label: "Getting found",
    items: [
      { tag: "Google", kind: "g", text: "best lead generation agency near me" },
      { tag: "AI", kind: "ai", text: "Which agency should I hire to grow my business?" },
      { tag: "AI", kind: "ai", text: "Why does my competitor show up on Google and I don’t?" },
      { tag: "Google", kind: "g", text: "how to get my business recommended by ChatGPT" },
      { tag: "AI", kind: "ai", text: "How do people find businesses like mine now?" },
      { tag: "Google", kind: "g", text: "paid ads vs SEO which is better for leads" },
    ],
  },
  {
    id: "leads",
    label: "Getting leads",
    items: [
      { tag: "AI", kind: "ai", text: "Why do my ads get clicks but no customers?" },
      { tag: "Google", kind: "g", text: "landing page not converting what to fix" },
      { tag: "AI", kind: "ai", text: "How do I get more enquiries from my website?" },
      { tag: "Google", kind: "g", text: "how much should a landing page convert" },
      { tag: "AI", kind: "ai", text: "What should my website say to turn visitors into leads?" },
      { tag: "Google", kind: "g", text: "best way to generate B2B leads online" },
    ],
  },
  {
    id: "followup",
    label: "Following up",
    items: [
      { tag: "AI", kind: "ai", text: "How fast should I reply to a new lead?" },
      { tag: "Google", kind: "g", text: "leads going cold how to follow up automatically" },
      { tag: "AI", kind: "ai", text: "Can AI answer my website chat and book calls for me?" },
      { tag: "Google", kind: "g", text: "how to connect my ads to my CRM" },
      { tag: "AI", kind: "ai", text: "How do I know which ads actually make money?" },
      { tag: "Google", kind: "g", text: "best CRM setup for a small sales team" },
    ],
  },
];

export default function QuestionsTabs() {
  const [active, setActive] = useState("found");
  const tab = TABS.find((t) => t.id === active)!;
  return (
    <div>
      <div className="q-tabs" role="tablist" aria-label="Buyer question stages">
        {TABS.map((t) => (
          <button key={t.id} className="q-tab" role="tab" aria-selected={active === t.id} onClick={() => setActive(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <ul className="q-list" key={tab.id}>
        {tab.items.map((it) => (
          <li key={it.text}><span className={`q-tag ${it.kind}`}>{it.tag}</span>{it.text}</li>
        ))}
      </ul>
    </div>
  );
}
