import type { Metadata } from "next";
import VineyardRetreat from "./VineyardRetreat";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/vineyard-retreat");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const LODGING_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://digitalfalconz.com/templates/vineyard-retreat#business",
  name: "Vine & Stone — Vineyard Retreat",
  description:
    "A vineyard stay in the Douro Valley with tastings in the cellar, terrace dinners, river walks and slow evenings.",
  url: "https://digitalfalconz.com/templates/vineyard-retreat",
  telephone: "+351 254 000 000",
  email: "stay@vineandstone.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Peso da Régua",
    addressRegion: "Vila Real",
    addressCountry: "PT",
  },
  areaServed: { "@type": "Country", name: "Portugal" },
};

export default function VineyardRetreatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LODGING_BUSINESS) }}
      />
      <VineyardRetreat />
    </>
  );
}
