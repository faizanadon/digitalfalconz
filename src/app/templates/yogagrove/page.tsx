import type { Metadata } from "next";
import Yogagrove from "./Yogagrove";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/yogagrove");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const HEALTH_AND_BEAUTY_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": "https://digitalfalconz.com/templates/yogagrove#business",
  name: "Yogagrove — Yoga & Mindful Movement",
  description:
    "Small-group yoga, breathwork and mindful movement for every body, in-studio or at home in Melbourne.",
  url: "https://digitalfalconz.com/templates/yogagrove",
  telephone: "+61394170432",
  email: "hello@yogagrove.studio",
  priceRange: "$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "41 Gertrude Street, Fitzroy",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  areaServed: { "@type": "City", name: "Melbourne" },
};

export default function YogagrovePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HEALTH_AND_BEAUTY_BUSINESS) }}
      />
      <Yogagrove />
    </>
  );
}
