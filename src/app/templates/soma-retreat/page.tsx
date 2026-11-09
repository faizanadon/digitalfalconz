import type { Metadata } from "next";
import SomaRetreat from "./SomaRetreat";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/soma-retreat");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function SomaRetreatPage() {
  return <SomaRetreat />;
}
