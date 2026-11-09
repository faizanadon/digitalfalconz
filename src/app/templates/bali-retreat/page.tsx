import type { Metadata } from "next";
import BaliRetreat from "./BaliRetreat";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/bali-retreat");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function BaliRetreatPage() {
  return <BaliRetreat />;
}
