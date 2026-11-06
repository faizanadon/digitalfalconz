// Per-service motion graphics registry — ONE distinct graphic per service slug.
// Each entry differs in primary animated element (kind), layout/content (lines)
// and entrance motion (motion). No two slugs share the same kind.
// Kinds are rendered by SlugHeroGraphic in src/components/Graphics.tsx.
// No invented stats or results anywhere — labels are the service's own concepts.
export type GraphicMotion = "rise" | "slide-left" | "slide-right" | "scale" | "orbit";
export type GraphicKind =
  | "search-rank" | "chat" | "waveform" | "nodes" | "chart" | "plug" | "stars"
  | "palette" | "gauge" | "pipeline" | "code" | "mail" | "target" | "layout"
  | "landing" | "funnel" | "phone" | "feed" | "frames" | "trend" | "rocket"
  | "loop" | "cart" | "calendar" | "wireframe" | "playhead" | "browser"
  | "checklist" | "layers" | "sparkle";

export interface SlugGraphic {
  slug: string;
  kind: GraphicKind;
  title: string;
  lines: string[];
  motion: GraphicMotion;
}

export const SLUG_GRAPHICS: SlugGraphic[] = [
  { slug: "seo-local-seo", kind: "search-rank", title: "Search, found, called", lines: ["best agency near me", "Your listing", "Call now"], motion: "rise" },
  { slug: "ai-search-visibility", kind: "sparkle", title: "Named by AI answers", lines: ["AI answers", "Your brand", "Cited & trusted"], motion: "orbit" },
  { slug: "ai-chatbots", kind: "chat", title: "Answered in seconds", lines: ["Hi — can you help?", "Right away — booked", "Tomorrow 10am works"], motion: "slide-right" },
  { slug: "ai-voice-agents", kind: "waveform", title: "Heard, understood, booked", lines: ["Listening…", "Understanding", "Booking your call"], motion: "rise" },
  { slug: "ai-workflow-automation", kind: "nodes", title: "Work that routes itself", lines: ["Trigger", "Route", "Approve", "Done"], motion: "slide-left" },
  { slug: "analytics-attribution", kind: "chart", title: "Every step measured", lines: ["Clicks", "Enquiries", "Revenue"], motion: "rise" },
  { slug: "api-integrations", kind: "plug", title: "Systems that talk", lines: ["CRM", "Website", "Payments"], motion: "slide-right" },
  { slug: "app-store-optimisation", kind: "stars", title: "Found in the store", lines: ["Your app", "Rated & reviewed", "Installed"], motion: "scale" },
  { slug: "branding-identity", kind: "palette", title: "One recognisable system", lines: ["#fcc04c", "#feda6b", "#000000"], motion: "orbit" },
  { slug: "conversion-rate-optimisation", kind: "gauge", title: "Test, learn, improve", lines: ["Baseline", "Test A / B", "Winner"], motion: "scale" },
  { slug: "crm-implementation", kind: "pipeline", title: "Nothing falls through", lines: ["New lead", "Qualified", "Won"], motion: "slide-left" },
  { slug: "custom-software-development", kind: "code", title: "Built, tested, shipped", lines: ["npm run dev", "Build passed", "Ship it"], motion: "rise" },
  { slug: "email-lifecycle-marketing", kind: "mail", title: "The right message, on time", lines: ["Welcome", "Nurture", "Re-engage"], motion: "slide-right" },
  { slug: "google-ads-ppc", kind: "target", title: "Aimed at high intent", lines: ["High intent", "Exact match", "Enquiry"], motion: "scale" },
  { slug: "graphic-design", kind: "layout", title: "One idea, every format", lines: ["Poster", "Social", "Deck"], motion: "slide-left" },
  { slug: "landing-page-design", kind: "landing", title: "One page, one decision", lines: ["Headline", "Proof", "Enquire →"], motion: "rise" },
  { slug: "lead-generation", kind: "funnel", title: "Attention becomes pipeline", lines: ["Attention", "Interest", "Enquiry"], motion: "slide-right" },
  { slug: "mobile-app-development", kind: "phone", title: "In your customer's pocket", lines: ["Home", "Book", "Done"], motion: "scale" },
  { slug: "paid-social-advertising", kind: "feed", title: "Scroll. Stop. Tap.", lines: ["Scroll", "Stop", "Tap"], motion: "slide-left" },
  { slug: "performance-creative", kind: "frames", title: "Angles worth testing", lines: ["Hook", "Angle B", "Winner"], motion: "orbit" },
  { slug: "performance-marketing", kind: "trend", title: "Spend tied to pipeline", lines: ["Spend", "Pipeline", "Revenue"], motion: "rise" },
  { slug: "saas-mvp-development", kind: "rocket", title: "Idea to first release", lines: ["Idea", "MVP", "Launch"], motion: "slide-right" },
  { slug: "sales-marketing-automation", kind: "loop", title: "Follow-up that never sleeps", lines: ["Capture", "Follow up", "Close", "Repeat"], motion: "orbit" },
  { slug: "shopify-ecommerce-development", kind: "cart", title: "Browse to checkout", lines: ["Browse", "Add to cart", "Checkout"], motion: "slide-left" },
  { slug: "social-media-management", kind: "calendar", title: "A presence with a plan", lines: ["Mon — Reel", "Wed — Post", "Fri — Story"], motion: "rise" },
  { slug: "ui-ux-design", kind: "wireframe", title: "Journeys before pixels", lines: ["Wireframe", "Prototype", "Test"], motion: "scale" },
  { slug: "video-editing-motion-graphics", kind: "playhead", title: "Cut to the point", lines: ["Cut", "Grade", "Publish"], motion: "slide-right" },
  { slug: "website-design-development", kind: "browser", title: "Built to convert", lines: ["Hero", "Services", "Enquire →"], motion: "slide-left" },
  { slug: "website-maintenance", kind: "checklist", title: "Kept fast and safe", lines: ["Updates", "Backups", "Monitoring"], motion: "rise" },
  { slug: "wordpress-cms-development", kind: "layers", title: "Editable, structured, yours", lines: ["Pages", "Posts", "Plugins"], motion: "scale" },
];

export function graphicForSlug(slug: string): SlugGraphic {
  return SLUG_GRAPHICS.find((g) => g.slug === slug) ?? SLUG_GRAPHICS[0];
}
export const SLUG_GRAPHIC_COUNT = SLUG_GRAPHICS.length;
export const SLUG_GRAPHIC_KINDS = new Set(SLUG_GRAPHICS.map((g) => g.kind)).size;

/** Per-page hero graphics — one distinct composition + entrance per main page. */
export type MainPageKey = "services" | "work" | "industries" | "contact" | "faq" | "privacy";
export const PAGE_GRAPHICS: Record<MainPageKey, { title: string; enter: "scale" | "left" | "rotate" | "right" | "up" | "tilt" }> = {
  services: { title: "Thirty capabilities, one system", enter: "scale" },
  work: { title: "Judged by the thinking", enter: "left" },
  industries: { title: "Every industry buys differently", enter: "rotate" },
  contact: { title: "Enquiry → reply → next step", enter: "right" },
  faq: { title: "Asked, answered", enter: "up" },
  privacy: { title: "Your details, protected", enter: "tilt" },
};
