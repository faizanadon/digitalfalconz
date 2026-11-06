import type { LucideIcon } from "lucide-react";
import {
  Activity, BarChart3, Bot, CheckCircle2, Code2, Compass, FileText, FlaskConical,
  Globe, Layers, LayoutTemplate, Link2, Mail, Map, MapPin, Megaphone, MessageSquare,
  MousePointerClick, Palette, PenLine, Phone, Plug, Rocket, Search, Settings,
  Share2, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Store, Target, TrendingUp,
  Users, Video, Workflow, Wrench, Zap, Gauge, Clapperboard, Repeat, Magnet,
} from "lucide-react";

/**
 * Distinct icon per capability label — keyword-matched, with a rotating
 * fallback so two rows never share an icon by accident.
 * Plain data module (NOT a client component): server components may import
 * it. Importing a plain function out of a "use client" file breaks the
 * production prerender, so this lives here.
 */
const CAP_KEYWORDS: [RegExp, LucideIcon][] = [
  [/audit|review|assess/i, Search],
  [/keyword|intent|map/i, Map],
  [/local|profile|area/i, MapPin],
  [/content|copy|messag/i, PenLine],
  [/report|dashboard|attribution|metric|track/i, BarChart3],
  [/on-page|title|heading|metadata|structure/i, FileText],
  [/structured|schema|markup/i, Code2],
  [/test|experiment|validat/i, FlaskConical],
  [/monitor|log|feedback/i, Activity],
  [/design|visual|creative|brand/i, Palette],
  [/video|motion|edit/i, Video],
  [/email|sms|whatsapp|messag/i, Mail],
  [/call|voice|phone/i, Phone],
  [/crm|pipeline|contact|lead/i, Users],
  [/automat|workflow|trigger|rout/i, Workflow],
  [/integrat|api|webhook|connect/i, Plug],
  [/chat|convers|bot/i, Bot],
  [/schedul|book|appointment/i, MessageSquare],
  [/search|seo|rank|discover/i, Search],
  [/ad|campaign|paid|media/i, Megaphone],
  [/social|community/i, Share2],
  [/shop|store|e-?commerce|checkout/i, ShoppingBag],
  [/app|mobile|store listing/i, Smartphone],
  [/landing|page|funnel|conversion/i, MousePointerClick],
  [/analytic|data|insight/i, BarChart3],
  [/secur|privacy|consent|compliance/i, ShieldCheck],
  [/support|mainten|update/i, Wrench],
  [/discover|research|strategy|plan/i, Compass],
  [/build|develop|engineer|software/i, Code2],
  [/ux|ui|interface|journey/i, LayoutTemplate],
  [/sale|revenue|growth|pipeline/i, TrendingUp],
  [/target|audience|segment/i, Target],
  [/speed|perform|optim/i, Gauge],
  [/launch|go-live|deploy/i, Rocket],
  [/template|asset|present/i, Layers],
  [/link|internal/i, Link2],
  [/onboard|nurtur|lifecycle/i, Repeat],
  [/qualif|lead gen/i, Magnet],
  [/creative|ad variant/i, Clapperboard],
  [/setting|config|setup/i, Settings],
  [/ai|assist/i, Sparkles],
  [/check|approv|quality/i, CheckCircle2],
  [/goal|objective/i, Target],
  [/storefront|listing/i, Store],
  [/zap|quick/i, Zap],
];
const CAP_FALLBACK: LucideIcon[] = [Compass, Layers, Zap, Globe, Settings, CheckCircle2];
export function capabilityIcon(label: string, index: number): LucideIcon {
  const hit = CAP_KEYWORDS.find(([re]) => re.test(label));
  return hit ? hit[1] : CAP_FALLBACK[index % CAP_FALLBACK.length];
}
