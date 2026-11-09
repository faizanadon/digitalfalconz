// Website templates DigitalFalconz can show a client — a complete,
// ready-made design they can preview, then have tailored to their business.
// Images are real photography hotlinked from Unsplash (verified live); the
// template pages themselves are standalone and carry their own branding,
// not DigitalFalconz's.

export interface TemplateEntry {
  slug: string;
  name: string;
  category: string;
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
    tagline: "Come home to your body",
    description:
      "A soft, minimal yoga and retreat template in the Hollow style: three paths, upcoming retreats, teachers, first-time guidance and booking — built around calm, real photography.",
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/soma-retreat",
  },
  {
    slug: "ember-restaurant",
    name: "Ember — Fine Dining",
    category: "Food & Dining",
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
    tagline: "Beauty, unhurried",
    description:
      "A soft, elegant salon and spa template: services with prices, a gallery, stylists, testimonials and booking — built around warm, graceful beauty photography.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/lumiere-salon",
  },
  {
    slug: "ventsure-lev-testing",
    name: "VentSure — LEV Testing & COSHH Compliance",
    category: "Industrial & Compliance",
    tagline: "LEV Testing & COSHH Compliance, Handled.",
    description:
      "A clean, serious industrial template for a LEV testing company: statutory 14-month testing, services, sectors, a 4-step process, testimonials, FAQ and a quote form — built for trust and compliance, with LocalBusiness and FAQ schema.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
    href: "/templates/ventsure-lev-testing",
  },
];
