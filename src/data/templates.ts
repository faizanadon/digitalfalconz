// Website templates DigitalFalconz can show a client — a complete,
// ready-made design they can preview, then have tailored to their business.
// Images are real photography hotlinked from Unsplash (verified live); the
// template pages themselves are standalone and carry their own branding,
// not DigitalFalconz's.

export interface TemplateEntry {
  slug: string;
  name: string;
  category: string;
  /** Niche this template belongs to (used to group the index page). */
  niche: "retreats" | "lev";
  tagline: string;
  description: string;
  /** Hero/preview image (Unsplash). */
  image: string;
  /** Where the live template preview lives. */
  href: string;
}

export const TEMPLATES: TemplateEntry[] = [
  {
    slug: "bali-retreat",
    name: "Amara — Bali Retreat",
    category: "Hospitality & Wellness",
    niche: "retreats",
    tagline: "A premium retreat in the Ubud jungle",
    description:
      "A full retreat website: sunrise yoga, spa rituals, jungle villas, a gallery, daily rhythm, packages and booking — built around real photography from Bali.",
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/bali-retreat",
  },
  {
    slug: "soma-retreat",
    name: "Soma — Yoga & Retreat",
    category: "Wellness & Retreats",
    niche: "retreats",
    tagline: "Come home to your body",
    description:
      "A soft, minimal yoga and retreat template in the Hollow style: three paths, upcoming retreats, teachers and first-time guidance — built around calm, real photography.",
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/soma-retreat",
  },
  {
    slug: "ember-restaurant",
    name: "Ember — Fine Dining",
    category: "Food & Dining",
    niche: "retreats",
    tagline: "Fire, smoke & season",
    description:
      "A dark, moody fine-dining template: signature dishes, the chef, a gallery and table reservations — built around warm, cinematic food photography.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/ember-restaurant",
  },
  {
    slug: "keystone-real-estate",
    name: "Keystone — Real Estate",
    category: "Real Estate",
    niche: "retreats",
    tagline: "Find where you belong",
    description:
      "A clean, modern property template: featured listings with prices and specs, neighbourhoods, agents and a viewing request form — built around bright, real home photography.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/keystone-real-estate",
  },
  {
    slug: "forge-fitness",
    name: "Forge — Fitness & Gym",
    category: "Fitness & Wellness",
    niche: "retreats",
    tagline: "Stronger every day",
    description:
      "A bold, high-energy gym template: training programmes, coaches, membership pricing, a class schedule and a join form — built around powerful, dark training photography.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/forge-fitness",
  },
  {
    slug: "atelier-interior",
    name: "Atelier — Interior Design",
    category: "Design & Architecture",
    niche: "retreats",
    tagline: "Spaces that speak softly",
    description:
      "A minimal, editorial interior-design template: a project portfolio, services, the design process and the studio — built around calm, architectural photography.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/atelier-interior",
  },
  {
    slug: "lumiere-salon",
    name: "Lumière — Beauty Salon & Spa",
    category: "Beauty & Wellness",
    niche: "retreats",
    tagline: "Beauty, unhurried",
    description:
      "A soft, elegant salon and spa template: services with prices, a gallery, stylists, testimonials and booking — built around warm, graceful beauty photography.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/lumiere-salon",
  },
  {
    slug: "mountain-lodge",
    name: "Alder & Pine — Mountain Lodge",
    category: "Hospitality & Wellness",
    niche: "retreats",
    tagline: "Alpine cabins, slow mornings, big mountains",
    description:
      "A bold, editorial mountain-lodge template in the Framer language: huge grotesque headlines, an orange ticker, rooms you can browse, guided hikes and a booking form — built around real alpine photography.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/mountain-lodge",
  },
  {
    slug: "desert-retreat",
    name: "Dune & Star — Desert Retreat",
    category: "Hospitality & Wellness",
    niche: "retreats",
    tagline: "Silence, stars and sand",
    description:
      "A stark, editorial desert-retreat template: huge grotesque headlines, an orange ticker, desert camps and stargazing, activities and a booking form — built around real desert photography.",
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/desert-retreat",
  },
  {
    slug: "surf-retreat",
    name: "Salt & Swell — Surf Retreat",
    category: "Hospitality & Wellness",
    niche: "retreats",
    tagline: "Salt air, long waves, slow days",
    description:
      "A bold, editorial surf-retreat template: huge grotesque headlines, an orange ticker, surf packages and lessons, coastal activities and a booking form — built around real surf photography.",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/surf-retreat",
  },
  {
    slug: "glamping-retreat",
    name: "Ember & Oak — Glamping Retreat",
    category: "Hospitality & Wellness",
    niche: "retreats",
    tagline: "Comfort in the wild",
    description:
      "A bold, editorial glamping template: huge grotesque headlines, an orange ticker, safari tents and campfire evenings, outdoor activities and a booking form — built around real camp photography.",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/glamping-retreat",
  },
  {
    slug: "vineyard-retreat",
    name: "Vine & Stone — Vineyard Retreat",
    category: "Food, Wine & Hospitality",
    niche: "retreats",
    tagline: "Slow days among the vines",
    description:
      "A bold, editorial vineyard-retreat template: huge grotesque headlines, an orange ticker, wine tastings and vineyard stays, seasonal food and a booking form — built around real vineyard photography.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/vineyard-retreat",
  },
  {
    slug: "ventsure-lev-testing",
    name: "VentSure — LEV Testing & COSHH Compliance",
    category: "Industrial & Compliance",
    niche: "lev",
    tagline: "LEV Testing & COSHH Compliance, Handled.",
    description:
      "A clean, serious industrial template for a LEV testing company: statutory 14-month testing, services, sectors, a 4-step process, testimonials, FAQ and a quote form — built for trust and compliance, with LocalBusiness and FAQ schema.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/ventsure-lev-testing",
  },
];
