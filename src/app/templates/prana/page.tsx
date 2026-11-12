import type { Metadata } from "next";
import Prana from "./Prana";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/prana");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const RESORT_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "Resort",
  "@id": "https://digitalfalconz.com/templates/prana#business",
  name: "Prana — Yoga & Wellness Retreat",
  description:
    "A small yoga and wellness retreat on the banks of the Ganges in Rishikesh: sunrise practice, workshops, slow food, river evenings and stays in the garden.",
  url: "https://digitalfalconz.com/templates/prana",
  telephone: "+91 135 000 0000",
  email: "hello@prana-rishikesh.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rishikesh",
    addressRegion: "Uttarakhand",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
};

export default function PranaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RESORT_BUSINESS) }}
      />
      <Prana />
    </>
  );
}
