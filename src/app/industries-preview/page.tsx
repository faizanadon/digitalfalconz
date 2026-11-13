import type { Metadata } from "next";
import IndustriesPreview from "./IndustriesPreview";

/**
 * STAGING PREVIEW ONLY — the new Industries page (Retreat Operators &
 * Corporate Offsite Planners) per the developer master document.
 * noindex/nofollow so it is never indexed. The live /industries page is
 * untouched; the swap happens only on the owner's approval.
 */
export const metadata: Metadata = {
  title: "Retreat & Corporate Offsite Solutions | DigitalFalconz",
  description:
    "Websites, lead generation, booking systems and CRM automation for retreat operators and corporate offsite planners. Explore DigitalFalconz solutions.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Retreat & Corporate Offsite Solutions | DigitalFalconz",
    description:
      "Websites, lead generation, booking systems and CRM automation for retreat operators and corporate offsite planners. Explore DigitalFalconz solutions.",
  },
};

export default function IndustriesPreviewPage() {
  return <IndustriesPreview />;
}
