# DigitalFalconz — Next.js Website

Marketing, software and AI agency website for **DigitalFalconz** (https://digitalfalconz.com), rebuilt in Next.js (App Router, TypeScript) from the supplied HTML design reference and the premium SEO copy pack.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Requires Node.js 18+.

## Round 6 fix (2026-11-06) — journey / process discs REALLY redesigned

- The user was right: round 6 only made the same black circles slightly bigger (48→56px, pale gold numbers), so the /contact journey (Review / Clarify / Next step) read as unchanged. This is a real redesign, not a size bump: the numbers are now **gold discs with big black numbers** — `linear-gradient(180deg,#feda6b,#fcc04c)`, `#000`, 22px, weight 800, Space Mono, 72×72px, soft gold shadow + 4px surface ring. Same treatment for `.process-node` (72px, 22px, line re-centred: node `left:-84px`, line `left:26px`, both centres at 28px).
- **Track:** now clearly visible — 4px, gold-tinted gradient (`rgba(252,192,76,.55)` → beige), `top:36px` = exactly through the disc centres. Travelling dot is 18px solid gold with a glow ring (`0 0 0 6px rgba(252,192,76,.35)`), riding the same line through the disc centres. Even in a static screenshot the line + discs look finished.
- **Grid:** `.journey-nodes` now uses `repeat(var(--cols,4),minmax(0,1fr))` and `JourneyDiagram` sets `--cols` to the step count, so 3 steps spread across the full width (last node at the right end) instead of the hardcoded 4 columns that left the 3rd node mid-page. The ≤640px media query still overrides to 2 columns (it comes later in the file, same specificity) and hides the track.
- **Dark theme:** the old dark override turned the discs `#1a1a18` with pale numbers — removed for `.journey-num`/`.process-node`; an explicit guard rule keeps the gold disc + black number in both themes.
- **Verification:** build passes, 43/43 static pages; smoke test 200 on `/`, `/contact`, `/work`, `/services`; contact HTML renders `journey-nodes` with `--cols:3` and nodes 01/02/03. **Not visually verified in a real browser** — Faizan should screenshot /contact again in both themes.

## Round 6 (2026-11-06) — small icons fixed site-wide, footer services restored, real work added

- **Small icons, fixed everywhere:** the FlowDiagram's tiny unicode glyphs (◉ ▣ ▤ ◆) are now Lucide icons — Megaphone / MousePointerClick / Users / TrendingUp — gold on black, 24px, centred in 60px circles, with the dashed line and travelling arrow re-aligned to the circle centres. JourneyDiagram / ProcessTimeline keep their numbers, now large and legible (16px bold gold in 56px circles), and the travelling gold dot runs exactly on the track line, through the node centres (track is now absolutely positioned at node-centre height; hidden on ≤640px where nodes wrap to 2 columns). Every other unicode glyph used as an icon across `Motion.tsx` / `Graphics.tsx` / `pageGraphics.ts` was replaced with a Lucide icon or a real CSS dot (✓ → Check, ✕ → X, ★ → Star, ⚡ → Zap, ▶ → Play, ↻ → RotateCw, ◎ → Target, ● → CSS dot, etc.). No icon smaller than 18px inside a tile; mega-menu icons are now 18px in 24px tiles. **No unicode-glyph icons remain in `src/` (verified by exact-character grep).**
- **Dark-theme tile fixes (screenshot 3):** every tile that used `var(--ink)` as a background rendered white-on-black in dark mode. Added `[data-theme="dark"]` overrides so flow/journey/process tiles, contact journey tiles (`.phg-contact-ico` now #1a1a18 with gold icon, not white), orbit cores, frame plays, search bars, capability bubbles and all other icon tiles are dark surfaces (#1a1a18 / #141412) with gold borders/icons in dark mode, and gold-on-black / black-on-gold contrast is kept in both themes.
- **Footer — full 30-service list restored, design kept:** the round-5 screenshot footer is unchanged, with an "All services" band added between the middle columns and the giant wordmark: all 30 services grouped by the 5 categories, plain text links, **no icons** (footer stays icon-free), 14px, 1.6 line-height, columns min 160px. The What we do category links stay.
- **Work page — Faizan's real work:** 22 projects from `https://faizannawaz.vercel.app/work`, titles/descriptions/roles/live URLs verbatim (see `src/data/work.ts`). All 20 supplied screenshots downloaded to `public/work/` (valid WebP, 1280×800 or 1280×1800, 1.8 MB total) — note: the Sovereign Brotherhood file is `sovereign-brotherhood.webp`, not `thesovereignbrotherhood.webp` (that URL 404s). Nitro Muscle and UK Compounding have no screenshot on the portfolio page, so they use designed placeholder tiles (gold DF mark on black) at the same size. Every card image is exactly the same size: fixed `aspect-ratio: 16/10`, `object-fit: cover`, uniform grid (3 desktop / 2 tablet / 1 mobile). Each card names the project (title, description, category/platform tags, verbatim "Role: …" line) and links to the live site (`target _blank`, `rel noopener`) with "Visit live site ↗" — Nitro Muscle links to the portfolio work page instead (no live-site URL exists). Category filter (All / Shopify / WordPress / Funnels / Webflow / Products / Web Development) via client `WorkGrid` (`src/components/WorkGrid.tsx`). The old "Verified projects are being added" notice is replaced by an attribution line: selected projects by Faizan Nawaz (founder), delivered across client engagements and independent products, sourced from his portfolio, documented by challenge/decisions/delivery/evidence/role. The home "Explore selected work" duo card now points at the real 22-project grid. **Form integration was NOT done in this round** — forms stay front-end mailto, per the client.
- **Verification:** build passes, 43/43 static pages; production smoke test on a fresh port: 200 on `/`, `/services`, 6 service slugs, `/work`, `/industries`, `/contact`, `/faq`, `/privacy-policy`, `/terms`, `/sitemap.xml`, `/robots.txt`. On `/work`: all 22 titles in built HTML, 20 local images referenced, 2 placeholder tiles, 22 role lines, 30 service links in the footer band. **Not visually verified in a real browser** — the icons in both themes and the work grid need a human spot-check (Faizan's screenshots are the visual check).

## What changed — November 2026 (round 3)

- **Dependencies:** added `lenis@1` for smooth scrolling (see `src/components/SmoothScroll.tsx`, mounted in `src/app/layout.tsx`; skipped when the user prefers reduced motion, and in-page anchors scroll through Lenis with a sticky-header offset).
- **Home, rebuilt after the "biggest leak" CTA:** the plain Markdown dump is gone. Every section after the leak CTA band is now a designed, animated section with the same copy: "Your next stage" (leak-pieces-into-one-system graphic), "Five capabilities" (5 large cards + CTA card, each with its own icon + mini motion graphic), "Connected solutions" (4-node flow diagram + 4 solution cards), "What makes the approach different" (5 numbered principle cards), "Industry-aware work" (5 industry cards), "A deliberate process" (scroll-fill timeline 01 Understand → 05 Evolve), and "Explore selected work" + "Build what your business needs next" as two designed CTA cards. Home now ends: FAQ preview → final black CTA band → footer.
- **Markdown bug fixed:** `src/components/Markdown.tsx` now parses nested `**[label](href)**` correctly — no raw `[text](url)` or `**` syntax is visible anywhere (verified in the built HTML of every main page).
- **Mega-menu redesigned:** full-width panel, intro column + 5 fixed equal-width category columns with gold-underlined headings, icon tiles, labels capped at 2 lines, hover gold pill, plus a bottom strip ("Not sure where to start? Start with a free growth audit →" to `/contact`). Same grouped list in the mobile accordion. Esc / outside-click / navigation still close it. *(Superseded in round 4: truly full-width, intro moved to a top strip, single-line menu labels.)*
- **Footer, icon-free:** removed every Lucide icon from the footer (plain text links only, "Back to top ↑" as text). Restructured so nothing is squeezed: top row (brand / Company / Contact), then ALL 30 services in their own full-width row grouped by category (columns min 160px, 14px links, 1.6 line-height), then the bottom bar.
- **Service subpages have motion graphics:** each `/services/[slug]` page has an animated hero graphic, capabilities each with their OWN distinct icon (`src/data/capabilityIcons.ts` — keyword-matched), approach as a scroll-fill timeline, and a journey diagram (Discover → Decide → Enquire → Grow). All copy, FAQs, SEO and JSON-LD unchanged. *(Superseded in round 4: graphics are now unique per service slug, not per category — see `src/data/pageGraphics.ts`.)*
- **Audit form removed from home:** the form section is deleted from `src/app/page.tsx` (the `AuditForm.tsx` file is kept in the repo, unused). Every `#audit` link site-wide now points to `/contact` or `/contact#enquiry-form`. The form lives ONLY on `/contact` (all 11 fields, success copy verbatim).
- **Sleek motion, site-wide:** shared easing `[0.22, 0.61, 0.21, 1]`, staggered reveals, hover lift on cards, button arrow-slide, scroll progress bar, and a motion graphic on every page (Work = documentation-lens flow, Contact = Review → Clarify → Next step flow, FAQ / Privacy = animated divider). `prefers-reduced-motion` is respected throughout.

## What changed — November 2026 (round 2)

- **Dependencies:** added `framer-motion@11` and `lucide-react` (see `package.json`).
- **Home, tighter + animated:** section padding cut (~104px → 68px, tight sections 52px), hero tightened, Framer Motion `whileInView` reveals, staggered hero entrance, gold scroll-progress bar, floating HeroPhone, animated Traffic-in → Landing → CRM → Revenue-out flow diagram, animated counters for the real numbers only (8 disciplines, 1 source of truth, 4 audit checks, 24/7 AI — no invented stats), animated audit bars, and the 8 disciplines rebuilt as compact icon cards with hover lift. All copy kept; `prefers-reduced-motion` is respected.
- **Services mega-menu:** desktop header "Services" opens a full-width mega-menu with all 30 services grouped by the 5 real categories, each with its icon; Esc / outside-click / navigation closes it, `aria-expanded` set. Mobile menu has an expandable Services accordion with the same 30.
- **Icons everywhere:** `src/data/serviceIcons.ts` maps all 30 slugs to a specific Lucide icon (30/30, no generic reuse). Used in the mega-menu, `/services` index, service detail heroes/capabilities/related cards, and the footer. Every other page has an animated `PageHero` (see `src/components/Motion.tsx`); Industries has an icon per industry; FAQ keeps all 40 Q&As with a motion accordion + search.
- **Agency footer:** rebuilt black footer with a CTA strip ("Traffic in. Revenue out." + free audit button), brand + contact column, and every page under related headings — all 30 services grouped by category, plus Company (Home, All Services, Work, Industries, FAQ, Contact, Privacy Policy, Sitemap) and a bottom bar with © 2026, the US/UK/Canada note, and back-to-top.
- **Forms unchanged:** still front-end mailto to `contact@digitalfalconz.com`. No client work, stats or testimonials invented.

## Deploy to Vercel

1. Push this folder to a Git repository (GitHub / GitLab / Bitbucket).
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset: **Next.js**. No build settings to change (`npm run build`).
4. Deploy. Set the production domain to `digitalfalconz.com` in Vercel → Settings → Domains.

## Round 4 changes — 2026-11-06

- **Mega-menu is truly full-width**: the panel spans the whole viewport (`width: 100%` against the full-width sticky header), inner content max 1520px, intro moved to a top strip so the 5 category columns each get ~260px. Menu labels are short single-line labels from `serviceMenuLabel()` in `src/data/serviceIcons.ts` (e.g. "Email Marketing", "Custom Software", "Google Ads") — full names stay on service pages, cards and the footer. `white-space: nowrap` on menu links, no truncation.
- **Home duo cards rebuilt**: padding 44px, min-height 380px, equal heights, one button per card, small motion graphic per card. The duplicated contact line is gone — the copy's trailing link paragraph is stripped in code (copy file untouched) and contact appears once as three stacked rows (Email / UK / US).
- **Contact form is a distinct dark panel**: black rounded panel with gold labels, dark inputs and a gold submit button, clearly separated from the light page content. All 11 fields, labels, options and success copy unchanged. The form lives ONLY on `/contact` — there is no form on the home page and no `#audit` links anywhere.
- **Unique motion graphics per page/service**: `src/data/pageGraphics.ts` maps all 30 service slugs to 30 distinct graphic kinds (search-rank, chat, waveform, nodes, chart, plug, stars, palette, gauge, pipeline, code, mail, target, layout, landing, funnel, phone, feed, frames, trend, rocket, loop, cart, calendar, wireframe, playhead, browser, checklist, layers, sparkle), rendered by `SlugHeroGraphic` in `src/components/Graphics.tsx`. Main pages each have their own hero graphic + entrance (`PageHeroGraphic`, `PageHero enter` prop): Services = orbiting capability grid (scale), Work = lens scan (slide left), Industries = rotating wheel (tilt in), Contact = enquiry → call → next-step (slide right), FAQ = question bubbles (rise), Privacy = shield draw (zoom+tilt). Lenis smooth scroll is site-wide (`lenis@1.3.27`, `src/components/SmoothScroll.tsx`).

## Pages

| Route | Source |
| --- | --- |
| `/` | HTML landing (hero, interactive phone, ticker, problem, question tabs, 8 disciplines, proof, 4 steps, CTA, FAQ preview, audit form) + real copy from `01-home.md` |
| `/services` | All 30 services grouped into 5 categories, from `02-services.md` |
| `/services/[slug]` | One page per service (30 static routes), from `pages/services/*.md` + `SEO_PAGE_METADATA.json` |
| `/work` | `03-our-work.md` + 22 real projects by Faizan Nawaz from `faizannawaz.vercel.app/work` (`src/data/work.ts`, images in `public/work/`) |
| `/industries` | `04-industries.md` (12 industries) |
| `/contact` | `05-contact.md` + full enquiry form |
| `/faq` | `06-faq.md` — all 40 Q&As, grouped, with search/filter |
| `/privacy-policy` | Short policy (no copy was supplied for this page) |

SEO: per-page title / description / canonical from `SEO_PAGE_METADATA.json`, Organization JSON-LD, FAQPage JSON-LD on `/faq`, Service JSON-LD on service pages, `sitemap.xml` (`/sitemap.xml`) and `robots.txt` (`/robots.txt`).

## Where the copy lives

All page and service copy is generated data in `src/data/` (`services.ts`, `pages.ts`, `faqs.ts`, `site.ts`), generated programmatically from the copy pack — regenerate with:

```bash
python3 /tmp/gen_data.py   # reads /tmp/df (the unzipped DigitalFalconz_Premium_SEO_Website_Copy_2026.zip)
```

Do not hand-edit the generated files; edit the source `.md` files and regenerate.

## Contact form

The project enquiry form on `/contact` (`src/components/ContactForm.tsx`, all 11 fields) submits to a Next.js Route Handler, `src/app/api/contact/route.ts`. The handler validates the submission (name, work email, goals, privacy acknowledgement, plus a honeypot spam check) and then delivers it to **GoHighLevel** (`src/lib/ghl.ts`) and to the team by email (`src/lib/email.ts`, Resend first if `RESEND_API_KEY` is set, otherwise SMTP via nodemailer). If **neither** delivery works, the API returns `502` with an error instead of a false success, so a lead is never silently lost. Success is only shown after the server confirms receipt.

### GoHighLevel — REST API only

The form sends each enquiry to GoHighLevel via the v2 REST API (`src/lib/ghl.ts`): `POST https://services.leadconnectorhq.com/contacts/upsert` with the `Version: 2021-07-28` header, creating or updating the contact by email. Every contact is tagged with the single tag `siteform`. Note the upsert replaces a contact's tags, so a repeat enquiry refreshes them to `siteform`. The form fields are also stored in HighLevel custom fields on the contact: Help Needed, Investment Range, Desired Start, Country / Time Zone, Project Goals and Brief Link (field IDs in `CUSTOM_FIELD_IDS` in `src/lib/ghl.ts`); name, email, company and website use HighLevel's standard contact fields. It needs `GHL_API_KEY` (a Private Integration token with the `contacts.write` scope) and `GHL_LOCATION_ID` (`dcts1IzmzaWnBUYWaPws`, the "Digital Falconz" sub-account). No webhook is used. Until both values are configured, enquiries are **not** delivered to HighLevel (the API returns `502`).

### Required env vars

Copy `.env.example` to `.env.local` and fill in the values (never commit `.env.local` or paste real keys into chat):

- GHL: `GHL_API_KEY` + `GHL_LOCATION_ID` (`dcts1IzmzaWnBUYWaPws`)
- Email fallback: `NOTIFICATION_EMAIL` (default `contact@digitalfalconz.com`), plus either SMTP (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, …) or `RESEND_API_KEY` (+ `RESEND_FROM` to send from `@digitalfalconz.com` — without a verified domain Resend only sends from `onboarding@resend.dev` to the account owner).

### Audit form

There is no audit form on the home page any more — every audit CTA links to `/contact#enquiry-form`. `src/components/AuditForm.tsx` is kept in the repo but unused.

## Brand

- Primary: `#feda6b` / `#fcc04c` (gold). Secondary: `#000000` / `#ffffff`.
- Fonts: Inter Tight (headings), Inter (body), Space Mono (kickers/labels) via `next/font/google`.
- Logos in `public/`: `logo-light.jpg` (horizontal, header), `logo-dark.jpg` (gold on black, footer), `logo-mark.jpg` (square mark, favicon).

## Notes / deliberate limits

- No client names, testimonials, case-study results, percentages or revenue claims are invented anywhere. The Work page shows Faizan Nawaz's 22 real portfolio projects, verbatim from faizannawaz.vercel.app/work, with attribution.
- The HTML reference's `hello@digitalfalconz.com` was replaced with the copy pack's `contact@digitalfalconz.com` everywhere.
- The per-discipline animated SVG illustrations from the HTML reference were simplified to the numbered-chip treatment (layout and copy unchanged) to keep the React build reliable.

## Round 5 (2026-11-06)
- **Logos, high-res:** the supplied JPGs were upscaled with Lanczos + sharpening and background-removed to transparent PNGs — `public/logo-mark-hires.png` (2400×2400, square DF mark), `public/logo-light-hires.png` (3200×680, horizontal logo, for light backgrounds), `public/logo-dark-hires.png` (2400×2400, DF mark from the black-background version, for dark backgrounds). All logo uses (header, footer, metadata icons, favicon) now use the PNGs; the old JPGs remain in `public/` as fallback only.
- **Footer rebuilt** to the client's reference: "Good things start with a conversation." + huge "Let's make your next move." + gold circle "Discuss your project" link to /contact; Explore / What we do / Let's talk columns; giant gold DigitalFalconz wordmark; "© 2026 DigitalFalconz · Independent thinking. Connected delivery. · Back to top ↑". No icons in the footer. New page: `/terms` (Website Terms, factual only).
- **Spec data removed:** the contact page no longer renders the form-field spec list (01–11, submit/success/error strings) — that block was also scrubbed from the copy data. The real form already contains all 11 fields. AuditBars' percentage bars were replaced with a checklist (no scores). A full-site sweep found no other dummy/spec data.
- **Animated arrows on every CTA:** all `.btn` buttons (link or `<button>`, small or big) now have an arrow disc that slides and rotates to ↗ on hover; text CTAs use an inline arrow that slides right on hover. CTA audit: every internal route returns 200, all 30 service slugs are real, mailto is only contact@digitalfalconz.com, tel is only the UK/US numbers, and all in-page anchors resolve (including `#top`, now on `<body>` so Back to top works on every page).
- **Dark / light toggle** in the header (desktop + mobile menu): Sun/Moon button, `data-theme` on `<html>`, persisted in localStorage (`digitalfalconz-theme`), OS preference as fallback, pre-paint inline script so there is no flash, and a mounted-state guard against hydration mismatch.
