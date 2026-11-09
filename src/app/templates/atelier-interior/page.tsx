import type { Metadata } from "next";
import AtelierInterior from "./AtelierInterior";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/atelier-interior");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function AtelierInteriorPage() {
  return <AtelierInterior />;
}
