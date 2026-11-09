// Selected projects by Faizan Nawaz (founder), sourced from his portfolio
// at https://faizannawaz.vercel.app/work — titles, descriptions, roles and
// live-site URLs are verbatim from that page. Do NOT invent or embellish.
// Images: 20 screenshots downloaded from faizannawaz.vercel.app/media/projects/
// into public/work/. Two projects had no screenshot on the portfolio page
// (Nitro Muscle, UK Compounding) — they use a designed placeholder tile.
// Sovereign Brotherhood's file on the portfolio site is
// sovereign-brotherhood.webp (thesovereignbrotherhood.webp returns 404).
// Nitro Muscle has no live-site URL on the portfolio work page — its card
// links to the portfolio work page instead; never invent a URL for it.
//
// Paid-media portfolio (6 entries at the end): the company's SEM/SMM
// portfolio, presented as DigitalFalconz work with no personal attribution.
// Descriptions are drawn from the portfolio deck only — no hard metrics are
// claimed, because the deck text contains none. A live-site link is included
// only where the brand's site was verified live (Technoor.me, Wise Market
// Pakistan, Mawa Group). Skyphonez and Wise Market Australia have no live
// link because their sites no longer resolve; Vitastrong has none because
// the deck gives no country and several regional Vitastrong stores exist.
// These six use the placeholder tile — no dashboard screenshots were added,
// because binary files cannot be pushed with the current tooling.
export interface WorkProject {
  title: string;
  description: string;
  category: string;
  platform: string;
  role: string;
  liveUrl: string | null;
  liveLabel: string | null;
  image: string | null;
  filter: string;
  /** Slug of the /work/[slug] case study page, if this project has one. */
  caseStudy?: string;
}

export const PORTFOLIO_URL = "https://faizannawaz.vercel.app/work";

export const WORK_PROJECTS: WorkProject[] = [
  {
    title: "Calibrate",
    description: "A considered digital presence for an ecommerce growth agency.",
    category: "React",
    platform: "Frontend / CRO",
    role: "Frontend development for the agency website.",
    liveUrl: "https://calibrate.so",
    liveLabel: "calibrate.so",
    image: "/work/calibrate.webp",
    filter: "Web Development",
  },
  {
    title: "Artem Straps",
    description: "A refined storefront for premium watch straps and accessories.",
    category: "Shopify",
    platform: "Shopify / Ecommerce",
    role: "Shopify storefront setup and customization.",
    liveUrl: "https://artemstraps.com",
    liveLabel: "artemstraps.com",
    image: "/work/artem-straps.webp",
    filter: "Shopify",
  },
  {
    title: "Premium Supps",
    description: "A direct, catalog-first shopping experience for sports nutrition.",
    category: "Shopify",
    platform: "Shopify / Ecommerce",
    role: "Shopify storefront implementation.",
    liveUrl: "https://premiumsupps.net",
    liveLabel: "premiumsupps.net",
    image: "/work/premium-supps.webp",
    filter: "Shopify",
  },
  {
    title: "7 Figure MSP",
    description: "A high-contrast sales experience for MSP business growth.",
    category: "Funnels",
    platform: "GoHighLevel / Funnel",
    role: "GoHighLevel funnel build.",
    liveUrl: "https://7figuremsp.com",
    liveLabel: "7figuremsp.com",
    image: "/work/7-figure-msp.webp",
    filter: "Funnels",
  },
  {
    title: "SportsForce Masterclass",
    description: "A masterclass landing experience for college recruiting.",
    category: "Funnels",
    platform: "WordPress / Elementor",
    role: "WordPress and Elementor funnel implementation.",
    liveUrl: "https://masterclass.sportsforce.io",
    liveLabel: "masterclass.sportsforce.io",
    image: "/work/sportsforce.webp",
    filter: "Funnels",
  },
  {
    title: "Cloud Campaign",
    description: "A clear product story for social media agencies at scale.",
    category: "Webflow",
    platform: "Webflow / B2B SaaS",
    role: "Webflow build delivered alongside designers and marketers.",
    liveUrl: "https://get.cloudcampaign.com",
    liveLabel: "get.cloudcampaign.com",
    image: "/work/cloud-campaign.webp",
    filter: "Webflow",
  },
  {
    title: "HBH Management",
    description: "A land-focused website connecting sellers and buyers.",
    category: "WordPress",
    platform: "WordPress / Elementor",
    role: "WordPress and Elementor implementation.",
    liveUrl: "https://hbhmanagement.com",
    liveLabel: "hbhmanagement.com",
    image: "/work/hbh-management.webp",
    filter: "WordPress",
  },
  {
    title: "J. Friedman CPA",
    description: "A composed digital presence for proactive accounting.",
    category: "Web Development",
    platform: "Professional Services",
    role: "Website development.",
    liveUrl: "https://jfriedman.cpa",
    liveLabel: "jfriedman.cpa",
    image: "/work/j-friedman.webp",
    filter: "Web Development",
  },
  {
    title: "BME Bookkeeping",
    description: "An approachable service website for bookkeeping.",
    category: "WordPress",
    platform: "WordPress / Elementor",
    role: "WordPress and Elementor implementation.",
    liveUrl: "https://bmebookkeeping.com",
    liveLabel: "bmebookkeeping.com",
    image: "/work/bme-bookkeeping.webp",
    filter: "WordPress",
  },
  {
    title: "True Cut Grass",
    description: "A local-service website grounded in real outdoor work.",
    category: "WordPress",
    platform: "WordPress / Elementor",
    role: "WordPress and Elementor implementation.",
    liveUrl: "https://truecutgrass.com",
    liveLabel: "truecutgrass.com",
    image: "/work/true-cut-grass.webp",
    filter: "WordPress",
  },
  {
    title: "River Gate Auto",
    description: "An inventory-led website for vehicle discovery.",
    category: "WordPress",
    platform: "WordPress / Automotive",
    role: "Data-driven WordPress website implementation.",
    liveUrl: "https://rivergateauto.com",
    liveLabel: "rivergateauto.com",
    image: "/work/river-gate-auto.webp",
    filter: "WordPress",
  },
  {
    title: "Pixly",
    description: "An in-browser toolkit for image and video work.",
    category: "Products",
    platform: "React / Product",
    role: "Independently planned, designed, built and shipped the product, including SEO setup and ongoing iteration.",
    liveUrl: "https://pixel-studio1.vercel.app",
    liveLabel: "pixel-studio1.vercel.app",
    image: "/work/pixly.webp",
    filter: "Products",
  },
  {
    title: "Nitro Muscle",
    description: "An AI-assisted fitness product built across platforms.",
    category: "Products",
    platform: "Web / iOS / Android",
    role: "Product planning and cross-platform implementation, including a CMS/admin panel and backend integration.",
    liveUrl: PORTFOLIO_URL,
    liveLabel: "View on Faizan's portfolio",
    image: null,
    filter: "Products",
  },
  {
    title: "Cohorts",
    description: "Marketing site for a retreat operating system.",
    category: "Web Development",
    platform: "SaaS Marketing Site",
    role: "Website development for the product marketing site.",
    liveUrl: "https://cohorts.us",
    liveLabel: "cohorts.us",
    image: "/work/cohorts.webp",
    filter: "Web Development",
  },
  {
    title: "Palm Bee",
    description: "A ready-to-wear fashion storefront from Australia.",
    category: "Shopify",
    platform: "Shopify / Fashion",
    role: "Shopify storefront development.",
    liveUrl: "https://palmbee.shop",
    liveLabel: "palmbee.shop",
    image: "/work/palm-bee.webp",
    filter: "Shopify",
  },
  {
    title: "Boss Bodies",
    description: "A coaching sales page for an online fitness membership.",
    category: "WordPress",
    platform: "WordPress / Membership",
    role: "WordPress page development.",
    liveUrl: "https://bossbodies.co",
    liveLabel: "bossbodies.co",
    image: "/work/boss-bodies.webp",
    filter: "WordPress",
  },
  {
    title: "Kettlebell Lifestyle",
    description: "A members-only portal for a kettlebell fitness programme.",
    category: "WordPress",
    platform: "WordPress / Member Portal",
    role: "WordPress member portal work.",
    liveUrl: "https://app.kettlebelllifestyle.com",
    liveLabel: "app.kettlebelllifestyle.com",
    image: "/work/kettlebell-lifestyle.webp",
    filter: "WordPress",
  },
  {
    title: "UK Compounding",
    description: "A WordPress website for a UK-based business.",
    category: "WordPress",
    platform: "WordPress",
    role: "WordPress website development.",
    liveUrl: "https://ukcompounding.com",
    liveLabel: "ukcompounding.com",
    image: null,
    filter: "WordPress",
  },
  {
    title: "Dental Marketing Australia",
    description: "A lead-generation funnel for a dental marketing agency.",
    category: "Funnels",
    platform: "GoHighLevel / Lead Gen",
    role: "GoHighLevel funnel build.",
    liveUrl: "https://dentalmarketingaustralia.com.au",
    liveLabel: "dentalmarketingaustralia.com.au",
    image: "/work/dental-marketing-australia.webp",
    filter: "Funnels",
  },
  {
    title: "Real Gold Quiz",
    description: "A 60-second quiz funnel about retirement savings risk.",
    category: "Funnels",
    platform: "GoHighLevel / Quiz Funnel",
    role: "GoHighLevel quiz funnel build.",
    liveUrl: "https://realgoldquiz.com",
    liveLabel: "realgoldquiz.com",
    image: "/work/real-gold-quiz.webp",
    filter: "Funnels",
  },
  {
    title: "Better Balance Blueprint",
    description: "A quiz funnel exploring intro-APR credit card options.",
    category: "Funnels",
    platform: "GoHighLevel / Quiz Funnel",
    role: "GoHighLevel quiz funnel build.",
    liveUrl: "https://betterbalanceblueprint.com",
    liveLabel: "betterbalanceblueprint.com",
    image: "/work/better-balance-blueprint.webp",
    filter: "Funnels",
  },
  {
    title: "Sovereign Brotherhood",
    description: "A registration page for a men's leadership retreat.",
    category: "Funnels",
    platform: "GoHighLevel / Event",
    role: "GoHighLevel event page build.",
    liveUrl: "https://thesovereignbrotherhood.com",
    liveLabel: "thesovereignbrotherhood.com",
    image: "/work/sovereign-brotherhood.webp",
    filter: "Funnels",
  },
  {
    title: "Skyphonez",
    description:
      "An established Australian retailer of smartphones and tech gadgets. Facebook Ads, Google Ads and GA4 — driving sales growth, website traffic and return on ad spend.",
    category: "Paid Media",
    platform: "Google Ads · Meta Ads · GA4",
    role: "Paid media strategy, campaign management and GA4 analytics.",
    liveUrl: null,
    liveLabel: null,
    image: null,
    filter: "Paid Media",
    caseStudy: "skyphonez",
  },
  {
    title: "Technoor.me",
    description:
      "An online platform for new mobile phones and technology products across the GCC. Facebook and Google Ads built around audience targeting and conversion, growing sales in a competitive market.",
    category: "Paid Media",
    platform: "Google Ads · Meta Ads",
    role: "Paid media strategy and campaign management.",
    liveUrl: "https://technoor.me",
    liveLabel: "technoor.me",
    image: null,
    filter: "Paid Media",
    caseStudy: "technoor",
  },
  {
    title: "Vitastrong",
    description:
      "A health and wellness company offering premium supplements. Facebook lead and sales campaigns, Google Ads and GA4 — sustained lead generation and sales growth.",
    category: "Paid Media",
    platform: "Google Ads · Meta Ads · GA4",
    role: "Paid media strategy, lead generation and campaign optimisation.",
    liveUrl: null,
    liveLabel: null,
    image: null,
    filter: "Paid Media",
    caseStudy: "vitastrong",
  },
  {
    title: "Wise Market Australia",
    description:
      "An online marketplace helping Australian consumers compare products and prices. Facebook and Google Ads campaigns focused on conversions and consistent sales growth.",
    category: "Paid Media",
    platform: "Google Ads · Meta Ads",
    role: "Paid media strategy and conversion-focused campaign management.",
    liveUrl: null,
    liveLabel: null,
    image: null,
    filter: "Paid Media",
    caseStudy: "wise-market-australia",
  },
  {
    title: "Wise Market Pakistan",
    description:
      "An e-commerce marketplace connecting buyers and sellers across Pakistan. Facebook Ads across four ad accounts, GA4 and Google Ads — sales growth with an efficient cost-to-revenue ratio.",
    category: "Paid Media",
    platform: "Google Ads · Meta Ads · GA4",
    role: "Paid media strategy across multiple ad accounts, GA4 and Google Ads.",
    liveUrl: "https://wisemarket.com.pk",
    liveLabel: "wisemarket.com.pk",
    image: null,
    filter: "Paid Media",
    caseStudy: "wise-market-pakistan",
  },
  {
    title: "Mawa Group",
    description:
      "A real estate developer building residential and commercial spaces. Facebook Ads lead generation — high-quality leads and strong conversion rates.",
    category: "Paid Media",
    platform: "Meta Ads",
    role: "Facebook Ads lead generation strategy and campaign management.",
    liveUrl: "https://mawagroups.com",
    liveLabel: "mawagroups.com",
    image: null,
    filter: "Paid Media",
    caseStudy: "mawa-group",
  },
];

export const WORK_FILTERS = [
  "All",
  "Shopify",
  "WordPress",
  "Funnels",
  "Webflow",
  "Products",
  "Web Development",
  "Paid Media",
] as const;
