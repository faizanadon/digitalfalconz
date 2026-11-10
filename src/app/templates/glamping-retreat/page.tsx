import type { Metadata } from "next";
import GlampingRetreat from "./GlampingRetreat";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/glamping-retreat");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const LODGING_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://digitalfalconz.com/templates/glamping-retreat#business",
  name: "Ember & Oak — Glamping Retreat",
  description:
    "Safari tents in forty acres of Cotswold woodland with campfire evenings, woodland walks, outdoor cooking and slow mornings.",
  url: "https://digitalfalconz.com/templates/glamping-retreat",
  telephone: "+44 1608 000 000",
  email: "stay@emberandoak.co.uk",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Moreton-in-Marsh",
    addressRegion: "Gloucestershire",
    addressCountry: "GB",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
};

export default function GlampingRetreatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LODGING_BUSINESS) }}
      />
      <GlampingRetreat />
    </>
  );
}
