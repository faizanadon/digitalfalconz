import type { LucideIcon } from "lucide-react";
import {
  BarChart3, Bot, Clapperboard, Code2, Film, Gauge, Globe, Layers, LayoutTemplate,
  Magnet, Mail, Megaphone, Mic, MousePointerClick, Palette, PenTool, Plug, Repeat,
  Rocket, Search, Share2, ShoppingBag, Smartphone, Sparkles, Store, Target,
  TrendingUp, Users, Workflow, Wrench,
} from "lucide-react";
import { services } from "./services";

/** One specific, matching icon for every service slug. No generic reuse. */
export const serviceIconMap: Record<string, LucideIcon> = {
  "ai-chatbots": Bot,
  "ai-search-visibility": Sparkles,
  "ai-voice-agents": Mic,
  "ai-workflow-automation": Workflow,
  "analytics-attribution": BarChart3,
  "api-integrations": Plug,
  "app-store-optimisation": Store,
  "branding-identity": Palette,
  "conversion-rate-optimisation": Gauge,
  "crm-implementation": Users,
  "custom-software-development": Code2,
  "email-lifecycle-marketing": Mail,
  "google-ads-ppc": Target,
  "graphic-design": PenTool,
  "landing-page-design": MousePointerClick,
  "lead-generation": Magnet,
  "mobile-app-development": Smartphone,
  "paid-social-advertising": Megaphone,
  "performance-creative": Clapperboard,
  "performance-marketing": TrendingUp,
  "saas-mvp-development": Rocket,
  "sales-marketing-automation": Repeat,
  "seo-local-seo": Search,
  "shopify-ecommerce-development": ShoppingBag,
  "social-media-management": Share2,
  "ui-ux-design": LayoutTemplate,
  "video-editing-motion-graphics": Film,
  "website-design-development": Globe,
  "website-maintenance": Wrench,
  "wordpress-cms-development": Layers,
};

/** Short display label for menus / cards — derived from the service H1, trimmed. */
const SHORT_LABELS: Record<string, string> = {
  "ai-chatbots": "AI Chatbots",
  "ai-search-visibility": "AI Search Visibility",
  "ai-voice-agents": "AI Voice Agents",
  "ai-workflow-automation": "AI Workflow Automation",
  "analytics-attribution": "Analytics & Attribution",
  "api-integrations": "API Integrations",
  "app-store-optimisation": "App Store Optimisation",
  "branding-identity": "Branding & Identity",
  "conversion-rate-optimisation": "Conversion Rate Optimisation",
  "crm-implementation": "CRM Implementation",
  "custom-software-development": "Custom Software Development",
  "email-lifecycle-marketing": "Email & Lifecycle Marketing",
  "google-ads-ppc": "Google Ads & PPC",
  "graphic-design": "Graphic Design",
  "landing-page-design": "Landing Page Design",
  "lead-generation": "Lead Generation",
  "mobile-app-development": "Mobile App Development",
  "paid-social-advertising": "Paid Social Advertising",
  "performance-creative": "Performance Creative",
  "performance-marketing": "Performance Marketing",
  "saas-mvp-development": "SaaS & MVP Development",
  "sales-marketing-automation": "Sales & Marketing Automation",
  "seo-local-seo": "SEO & Local SEO",
  "shopify-ecommerce-development": "Shopify & E-commerce",
  "social-media-management": "Social Media Management",
  "ui-ux-design": "UI/UX Design",
  "video-editing-motion-graphics": "Video Editing & Motion",
  "website-design-development": "Website Design & Development",
  "website-maintenance": "Website Maintenance",
  "wordpress-cms-development": "WordPress & CMS",
};

/** Menu-only labels: short enough to fit on ONE line in the full-width
    mega-menu (~260px columns at 13.5px). Full names stay on service pages,
    cards and the footer — only the menu uses these. */
const MENU_LABELS: Record<string, string> = {
  "ai-chatbots": "AI Chatbots",
  "ai-search-visibility": "AI Search Visibility",
  "ai-voice-agents": "AI Voice Agents",
  "ai-workflow-automation": "AI Automation",
  "analytics-attribution": "Analytics",
  "api-integrations": "API Integrations",
  "app-store-optimisation": "App Store",
  "branding-identity": "Branding",
  "conversion-rate-optimisation": "Conversion Rate",
  "crm-implementation": "CRM",
  "custom-software-development": "Custom Software",
  "email-lifecycle-marketing": "Email Marketing",
  "google-ads-ppc": "Google Ads",
  "graphic-design": "Graphic Design",
  "landing-page-design": "Landing Pages",
  "lead-generation": "Lead Generation",
  "mobile-app-development": "Mobile Apps",
  "paid-social-advertising": "Paid Social",
  "performance-creative": "Performance Creative",
  "performance-marketing": "Performance Marketing",
  "saas-mvp-development": "SaaS & MVPs",
  "sales-marketing-automation": "Sales Automation",
  "seo-local-seo": "SEO & Local SEO",
  "shopify-ecommerce-development": "Shopify",
  "social-media-management": "Social Media",
  "ui-ux-design": "UI/UX Design",
  "video-editing-motion-graphics": "Video & Motion",
  "website-design-development": "Website Design",
  "website-maintenance": "Website Maintenance",
  "wordpress-cms-development": "WordPress & CMS",
};
export function serviceMenuLabel(slug: string): string {
  return MENU_LABELS[slug] ?? serviceShortLabel(slug);
}
export const MENU_LABEL_COUNT = Object.keys(MENU_LABELS).length;

export function serviceIcon(slug: string): LucideIcon {
  return serviceIconMap[slug] ?? Globe;
}
export function serviceShortLabel(slug: string): string {
  return SHORT_LABELS[slug] ?? slug.replace(/-/g, " ");
}

/** Services grouped by their real category, in a stable display order. */
export const CATEGORY_ORDER = [
  "Growth & Demand Generation",
  "Web & Software Engineering",
  "AI, CRM & Automation",
  "Brand, Design & Video",
  "Analytics & Conversion",
];
export const CATEGORY_SHORT: Record<string, string> = {
  "Growth & Demand Generation": "Growth",
  "Web & Software Engineering": "Web & Software",
  "AI, CRM & Automation": "AI & Automation",
  "Brand, Design & Video": "Brand & Creative",
  "Analytics & Conversion": "Analytics",
};
export function servicesByCategory() {
  return CATEGORY_ORDER.map((cat) => ({
    category: cat,
    short: CATEGORY_SHORT[cat] ?? cat,
    services: services.filter((s) => s.category === cat),
  })).filter((g) => g.services.length > 0);
}

// Build-time guard: every service must have an icon.
export const MISSING_ICONS = services.filter((s) => !serviceIconMap[s.slug]).map((s) => s.slug);
