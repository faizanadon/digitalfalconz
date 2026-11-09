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
];
