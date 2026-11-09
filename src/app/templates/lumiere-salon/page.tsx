import type { Metadata } from "next";
import LumiereSalon from "./LumiereSalon";
import { metaFor } from "@/data/site";

export const metadata: Metadata = (() => {
  const m = metaFor("/templates/lumiere-salon");
  return { title: m?.seo_title, description: m?.meta_description, alternates: { canonical: m?.canonical } };
})();

export default function LumiereSalonPage() {
  return <LumiereSalon />;
}
