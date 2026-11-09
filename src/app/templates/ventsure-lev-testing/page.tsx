import type { Metadata } from "next";
import VentSureLev from "./VentSureLev";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/ventsure-lev-testing");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://digitalfalconz.com/templates/ventsure-lev-testing#business",
  name: "VentSure",
  description:
    "Thorough Examination and Testing (TExT) of local exhaust ventilation (LEV) systems under COSHH Regulation 9, plus LEV design, installation, repair, maintenance, air monitoring, duct cleaning and commissioning.",
  url: "https://digitalfalconz.com/templates/ventsure-lev-testing",
  telephone: "+44 161 000 0000",
  email: "info@ventsure.co.uk",
  priceRange: "££",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Manchester",
    addressRegion: "Greater Manchester",
    addressCountry: "GB",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:30",
    },
  ],
};

const FAQ_PAGE = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is LEV testing a legal requirement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Under COSHH Regulation 9, every employer must ensure that local exhaust ventilation is thoroughly examined and tested at least every 14 months by a competent person. It is a legal duty, not a recommendation — and the HSE can ask to see your test records at any time.",
      },
    },
    {
      "@type": "Question",
      name: "How often must LEV be tested?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At least every 14 months. Some higher-risk processes are tested more often — for example, where the substance is particularly hazardous. Your report confirms the correct interval for each of your systems.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a test take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A single straightforward system typically takes one to two hours. Larger sites with several systems are usually completed in a day. We agree the scope and timing with you before we attend, and we work around your production where we can.",
      },
    },
    {
      "@type": "Question",
      name: "What does the report include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A pass or fail for every system, airflow and velocity readings, photographs, a list of any defects, and clear remedial actions with priorities. It is delivered digitally within 48 hours, and kept on file so you always have a record.",
      },
    },
    {
      "@type": "Question",
      name: "What if my system fails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A fail does not always mean the system is unsafe to use — it means it does not meet the required standard. Your report explains exactly what is wrong, what must be done and how urgently. We can quote for the repair and retest the system once it is fixed.",
      },
    },
  ],
};

export default function VentSureLevPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_PAGE) }}
      />
      <VentSureLev />
    </>
  );
}
