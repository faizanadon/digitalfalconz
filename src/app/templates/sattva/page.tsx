import type { Metadata } from "next";
import Sattva from "./Sattva";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/sattva");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const RESORT_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "Resort",
  "@id": "https://digitalfalconz.com/templates/sattva#business",
  name: "Sattva — Ayurveda & Detox Retreat",
  description:
    "A slow Ayurveda and detox retreat on the Alleppey backwaters in Kerala: dosha consultation, daily treatments, a seven-day ritual, stays by the water and a booking form.",
  url: "https://digitalfalconz.com/templates/sattva",
  telephone: "+91 477 000 0000",
  email: "hello@sattva-kerala.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Alleppey",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
};

export default function SattvaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RESORT_BUSINESS) }}
      />
      <Sattva />
    </>
  );
}
