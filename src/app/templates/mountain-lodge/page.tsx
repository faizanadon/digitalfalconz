import type { Metadata } from "next";
import MountainLodge from "./MountainLodge";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/mountain-lodge");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const LODGING_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://digitalfalconz.com/templates/mountain-lodge#business",
  name: "Alder & Pine — Mountain Lodge",
  description:
    "Alpine cabins above Zermatt with guided hikes, lake swims, fireside evenings and slow mornings.",
  url: "https://digitalfalconz.com/templates/mountain-lodge",
  telephone: "+41 27 000 00 00",
  email: "stay@alderandpine.ch",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zermatt",
    addressRegion: "Valais",
    addressCountry: "CH",
  },
  areaServed: { "@type": "Country", name: "Switzerland" },
};

export default function MountainLodgePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LODGING_BUSINESS) }}
      />
      <MountainLodge />
    </>
  );
}
