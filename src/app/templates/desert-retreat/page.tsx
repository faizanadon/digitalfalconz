import type { Metadata } from "next";
import DesertRetreat from "./DesertRetreat";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/desert-retreat");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const LODGING_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://digitalfalconz.com/templates/desert-retreat#business",
  name: "Dune & Star — Desert Retreat",
  description:
    "A desert camp in the Merzouga dunes with camel treks, stargazing, Berber evenings and slow, sun-warmed days.",
  url: "https://digitalfalconz.com/templates/desert-retreat",
  telephone: "+212 600 000 000",
  email: "stay@duneandstar.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Merzouga",
    addressRegion: "Drâa-Tafilalet",
    addressCountry: "MA",
  },
  areaServed: { "@type": "Country", name: "Morocco" },
};

export default function DesertRetreatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LODGING_BUSINESS) }}
      />
      <DesertRetreat />
    </>
  );
}
