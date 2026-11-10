import type { Metadata } from "next";
import SurfRetreat from "./SurfRetreat";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/surf-retreat");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const LODGING_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://digitalfalconz.com/templates/surf-retreat#business",
  name: "Salt & Swell — Surf Retreat",
  description:
    "A surf retreat on the Ericeira coast with daily lessons, longboard mornings, cliff walks and slow evenings.",
  url: "https://digitalfalconz.com/templates/surf-retreat",
  telephone: "+351 261 000 000",
  email: "stay@saltandswell.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ericeira",
    addressRegion: "Lisbon",
    addressCountry: "PT",
  },
  areaServed: { "@type": "Country", name: "Portugal" },
};

export default function SurfRetreatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LODGING_BUSINESS) }}
      />
      <SurfRetreat />
    </>
  );
}
